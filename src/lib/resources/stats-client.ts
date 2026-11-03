"use client";

import { useEffect, useSyncExternalStore } from "react";
import { READ_KEY, setLocalMember } from "@/lib/resources/local-set";
import type { Stat } from "@/lib/resources/db";

type Snapshot = { ready: boolean; failed: boolean; stats: Readonly<Record<string, Stat>>; liked: ReadonlySet<string> };

const EMPTY: Snapshot = { ready: false, failed: false, stats: {}, liked: new Set() };
const NONE: Stat = { v: 0, l: 0, c: 0 };

let snap = EMPTY;
let loading: Promise<void> | null = null;
const subs = new Set<() => void>();

function publish(next: Snapshot) {
  snap = next;
  subs.forEach((fn) => fn());
}

function patch(key: string, change: Partial<Stat>, liked?: boolean) {
  const stats = { ...snap.stats, [key]: { ...(snap.stats[key] ?? NONE), ...change } };
  const set = new Set(snap.liked);
  if (liked === true) set.add(key);
  if (liked === false) set.delete(key);
  publish({ ready: true, failed: false, stats, liked: set });
}

/** Fetch every counter once per page load; later callers share the same promise. */
function loadStats(): Promise<void> {
  loading ??= fetch("/api/resources/stats", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d: { stats: Record<string, Stat>; liked: string[] }) => publish({ ready: true, failed: false, stats: d.stats, liked: new Set(d.liked) }))
    .catch(() => publish({ ready: true, failed: true, stats: {}, liked: new Set() }));
  return loading;
}

function subscribe(fn: () => void) {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

export function useResourceStats(): Snapshot {
  useEffect(() => {
    void loadStats();
  }, []);
  return useSyncExternalStore(subscribe, () => snap, () => EMPTY);
}

export function statOf(snapshot: Snapshot, key: string): Stat {
  return snapshot.stats[key] ?? NONE;
}

/** Optimistic like toggle; rolls back when the server rejects it. */
export async function toggleLike(key: string): Promise<void> {
  const was = snap.liked.has(key);
  const before = statOf(snap, key).l;
  patch(key, { l: Math.max(0, before + (was ? -1 : 1)) }, !was);
  try {
    const res = await fetch("/api/resources/like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) });
    if (!res.ok) throw new Error(String(res.status));
    const d: { liked: boolean; likes: number } = await res.json();
    patch(key, { l: d.likes }, d.liked);
  } catch {
    patch(key, { l: before }, was);
  }
}

/** Register a view (server de-duplicates per visitor and day) and remember the article as read on this device. */
export async function recordView(key: string): Promise<void> {
  setLocalMember(READ_KEY, key, true);
  try {
    const res = await fetch("/api/resources/view", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) });
    if (!res.ok) return;
    const d: { views: number } = await res.json();
    patch(key, { v: d.views });
  } catch {
    /* counters are best-effort */
  }
}

export function setCommentCount(key: string, count: number) {
  patch(key, { c: count });
}
