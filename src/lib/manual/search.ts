import { useSyncExternalStore } from "react";

export type SearchKind = "h" | "r" | "p";

export interface SearchItem {
  chunk: string;
  anchor: string;
  head: number;
  vi: string;
  en: string;
  kind: SearchKind;
  /** diacritic-free lowercase, same UTF-16 length as `vi` / `en` so match ranges map back 1:1 */
  nv: string;
  ne: string;
}

export interface SearchData {
  heads: string[];
  items: SearchItem[];
}

export interface Hit {
  item: SearchItem;
  field: "vi" | "en";
  /** merged [start, end) ranges inside item[field] */
  ranges: [number, number][];
  score: number;
}

type Tuple = [string, string, number, string, string, SearchKind];

function foldChar(ch: string): string {
  if (ch === "đ" || ch === "Đ") return "d";
  const out = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (out.length === ch.length) return out;
  const lower = ch.toLowerCase();
  return lower.length === ch.length ? lower : ch;
}

/** Lowercase + strip Vietnamese diacritics, keeping length (so "Thẻ vàng" matches "the vang"). */
export function fold(s: string): string {
  let out = "";
  for (const ch of s) out += foldChar(ch);
  return out;
}

function parseSearchIndex(raw: { heads: string[]; items: Tuple[] }): SearchData {
  return {
    heads: raw.heads,
    items: raw.items.map(([chunk, anchor, head, vi, en, kind]) => {
      const v = vi.normalize("NFC");
      const e = en.normalize("NFC");
      return { chunk, anchor, head, vi: v, en: e, kind, nv: fold(v), ne: fold(e) };
    }),
  };
}

export interface SearchStore {
  status: "idle" | "loading" | "ready" | "error";
  data: SearchData | null;
}

const IDLE: SearchStore = { status: "idle", data: null };
let store: SearchStore = IDLE;
const subs = new Set<() => void>();

function setStore(next: SearchStore) {
  store = next;
  for (const fn of subs) fn();
}

/** Lazy: ~230 KB gzip, fetched on first focus of a search box, shared by every panel. */
export function ensureSearchData(): void {
  if (store.status === "loading" || store.status === "ready") return;
  setStore({ status: "loading", data: null });
  fetch("/manual/search-index.json")
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then((raw) => setStore({ status: "ready", data: parseSearchIndex(raw) }))
    .catch(() => setStore({ status: "error", data: null }));
}

export function useSearchData(): SearchStore {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => {
        subs.delete(cb);
      };
    },
    () => store,
    () => IDLE,
  );
}

const KIND_BONUS: Record<SearchKind, number> = { r: 30, h: 25, p: 0 };

function mergeRanges(r: [number, number][]): [number, number][] {
  const s = [...r].sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const cur of s) {
    const last = out[out.length - 1];
    if (last && cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
    else out.push([cur[0], cur[1]]);
  }
  return out;
}

/** AND over whitespace-separated terms, diacritic-insensitive, searches both languages. */
export function search(data: SearchData, query: string, lang: "vi" | "en", limit = 40): Hit[] {
  const terms = fold(query).split(/\s+/).filter(Boolean).slice(0, 6);
  if (terms.length === 0) return [];
  const hits: Hit[] = [];
  for (const item of data.items) {
    const fields: ("vi" | "en")[] = lang === "vi" ? ["vi", "en"] : ["en", "vi"];
    for (const field of fields) {
      const hay = field === "vi" ? item.nv : item.ne;
      const ranges: [number, number][] = [];
      let score = KIND_BONUS[item.kind];
      let all = true;
      for (const t of terms) {
        const pos = hay.indexOf(t);
        if (pos < 0) {
          all = false;
          break;
        }
        ranges.push([pos, pos + t.length]);
        if (pos === 0 || !/[a-z0-9]/.test(hay[pos - 1])) score += 3;
        if (pos === 0) score += 6;
      }
      if (!all) continue;
      if (item.kind === "r" && terms.length === 1 && item.anchor.toLowerCase() === terms[0]) score += 200;
      if (field !== lang) score -= 2;
      hits.push({ item, field, ranges: mergeRanges(ranges), score });
      break; // first matching language wins for this item
    }
  }
  // stable: Array#sort is stable, items already in reading order
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

export interface Snippet {
  text: string;
  /** [start, end) ranges inside `text` to highlight */
  marks: [number, number][];
}

export function snippet(text: string, ranges: [number, number][], before = 48, after = 120): Snippet {
  const first = ranges[0]?.[0] ?? 0;
  const start = Math.max(0, first - before);
  const end = Math.min(text.length, first + after);
  const cut = text.slice(start, end);
  const lead = start > 0 ? "… " : "";
  const trail = end < text.length ? " …" : "";
  const shift = start - lead.length;
  const marks = ranges
    .filter(([a, b]) => b > start && a < end)
    .map(([a, b]) => [Math.max(a, start) - shift, Math.min(b, end) - shift] as [number, number]);
  return { text: lead + cut + trail, marks };
}
