import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES } from "@/data/resources";

import { articleKey } from "@/lib/resources/keys";

const READY_KEYS = RESOURCE_ARTICLES.filter((a) => a.status === "ready").map((a) => articleKey(a.categoryId, a.slug));
export const QUESTION_CATEGORIES: readonly string[] = [...RESOURCE_CATEGORIES.map((c) => c.id), "other"];

const SCHEMA = `
CREATE TABLE IF NOT EXISTS views (key TEXT PRIMARY KEY, n INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS view_log (key TEXT NOT NULL, visitor TEXT NOT NULL, day INTEGER NOT NULL, PRIMARY KEY (key, visitor, day));
CREATE TABLE IF NOT EXISTS likes (key TEXT NOT NULL, visitor TEXT NOT NULL, created_at INTEGER NOT NULL, PRIMARY KEY (key, visitor));
CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author TEXT NOT NULL,
  visitor TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  thread TEXT NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  visitor TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS comments_thread ON comments (thread, created_at);
CREATE INDEX IF NOT EXISTS questions_created ON questions (created_at DESC);
`;

const DAY = 86_400_000;
const SEED_MIN = 50;
const SEED_MAX = 200;

function open(): DatabaseSync {
  const file = process.env.RESOURCES_DB_PATH ?? path.join(process.cwd(), "data", "resources.db");
  mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 3000; PRAGMA synchronous = NORMAL;");
  db.exec(SCHEMA);
  // Seed a starting view count for every published article that has none yet (50-200, once per article).
  const seed = db.prepare("INSERT OR IGNORE INTO views (key, n) VALUES (?, ?)");
  for (const key of READY_KEYS) seed.run(key, SEED_MIN + Math.floor(Math.random() * (SEED_MAX - SEED_MIN + 1)));
  db.prepare("DELETE FROM view_log WHERE day < ?").run(Math.floor(Date.now() / DAY) - 7);
  return db;
}

// Reuse one connection across dev HMR reloads.
const g = globalThis as unknown as { __resourcesDb?: DatabaseSync };
const db = () => (g.__resourcesDb ??= open());

export type Stat = { v: number; l: number; c: number };
export type QuestionRow = { id: number; categoryId: string; title: string; body: string; author: string; createdAt: number; answers: number };
export type CommentRow = { id: number; author: string; body: string; createdAt: number };

type Row = Record<string, unknown>;
const num = (v: unknown) => Number(v ?? 0);

/** True when `key` names a published article or an existing question. */
export function isThread(key: string): boolean {
  if (READY_KEYS.includes(key)) return true;
  const m = /^q\/(\d+)$/.exec(key);
  return !!m && !!db().prepare("SELECT 1 FROM questions WHERE id = ?").get(Number(m[1]));
}

export function allStats(): Record<string, Stat> {
  const out: Record<string, Stat> = {};
  const at = (k: string) => (out[k] ??= { v: 0, l: 0, c: 0 });
  for (const r of db().prepare("SELECT key, n FROM views").all() as Row[]) at(String(r.key)).v = num(r.n);
  for (const r of db().prepare("SELECT key, COUNT(*) AS n FROM likes GROUP BY key").all() as Row[]) at(String(r.key)).l = num(r.n);
  for (const r of db().prepare("SELECT thread AS key, COUNT(*) AS n FROM comments GROUP BY thread").all() as Row[]) at(String(r.key)).c = num(r.n);
  return out;
}

export function likedKeys(visitor: string): string[] {
  return (db().prepare("SELECT key FROM likes WHERE visitor = ?").all(visitor) as Row[]).map((r) => String(r.key));
}

/** Count one view per visitor, thread and day. Returns the current total. */
export function recordView(key: string, visitor: string): number {
  const d = db();
  const fresh = d.prepare("INSERT OR IGNORE INTO view_log (key, visitor, day) VALUES (?, ?, ?)").run(key, visitor, Math.floor(Date.now() / DAY));
  if (Number(fresh.changes) === 1) {
    d.prepare("INSERT INTO views (key, n) VALUES (?, 1) ON CONFLICT(key) DO UPDATE SET n = n + 1").run(key);
  }
  return num((d.prepare("SELECT n FROM views WHERE key = ?").get(key) as Row | undefined)?.n);
}

export function toggleLike(key: string, visitor: string): { liked: boolean; likes: number } {
  const d = db();
  const gone = d.prepare("DELETE FROM likes WHERE key = ? AND visitor = ?").run(key, visitor);
  const liked = Number(gone.changes) === 0;
  if (liked) d.prepare("INSERT INTO likes (key, visitor, created_at) VALUES (?, ?, ?)").run(key, visitor, Date.now());
  return { liked, likes: num((d.prepare("SELECT COUNT(*) AS n FROM likes WHERE key = ?").get(key) as Row).n) };
}

export function listComments(thread: string): CommentRow[] {
  return (db().prepare("SELECT id, author, body, created_at FROM comments WHERE thread = ? ORDER BY created_at ASC LIMIT 200").all(thread) as Row[])
    .map((r) => ({ id: num(r.id), author: String(r.author), body: String(r.body), createdAt: num(r.created_at) }));
}

export function addComment(thread: string, author: string, body: string, visitor: string): CommentRow {
  const createdAt = Date.now();
  const res = db().prepare("INSERT INTO comments (thread, author, body, visitor, created_at) VALUES (?, ?, ?, ?, ?)").run(thread, author, body, visitor, createdAt);
  return { id: Number(res.lastInsertRowid), author, body, createdAt };
}

const QUESTION_SQL = "SELECT q.*, (SELECT COUNT(*) FROM comments c WHERE c.thread = 'q/' || q.id) AS answers FROM questions q";
const toQuestion = (r: Row): QuestionRow => ({ id: num(r.id), categoryId: String(r.category_id), title: String(r.title), body: String(r.body), author: String(r.author), createdAt: num(r.created_at), answers: num(r.answers) });

export function listQuestions(limit: number, categoryId?: string): QuestionRow[] {
  const rows = categoryId
    ? db().prepare(`${QUESTION_SQL} WHERE q.category_id = ? ORDER BY q.created_at DESC LIMIT ?`).all(categoryId, limit)
    : db().prepare(`${QUESTION_SQL} ORDER BY q.created_at DESC LIMIT ?`).all(limit);
  return (rows as Row[]).map(toQuestion);
}

export function getQuestion(id: number): QuestionRow | undefined {
  const r = db().prepare(`${QUESTION_SQL} WHERE q.id = ?`).get(id) as Row | undefined;
  return r && toQuestion(r);
}

export function addQuestion(categoryId: string, title: string, body: string, author: string, visitor: string): QuestionRow {
  const createdAt = Date.now();
  const res = db().prepare("INSERT INTO questions (category_id, title, body, author, visitor, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(categoryId, title, body, author, visitor, createdAt);
  return { id: Number(res.lastInsertRowid), categoryId, title, body, author, createdAt, answers: 0 };
}
