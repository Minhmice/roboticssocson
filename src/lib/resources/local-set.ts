"use client";

import { useSyncExternalStore } from "react";

const EMPTY: ReadonlySet<string> = new Set();
const cache = new Map<string, { raw: string | null; set: ReadonlySet<string> }>();
const subs = new Set<() => void>();

function read(key: string): ReadonlySet<string> {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return EMPTY;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.set;
  let list: unknown = [];
  try {
    list = raw ? JSON.parse(raw) : [];
  } catch {
    list = [];
  }
  const set = new Set<string>(Array.isArray(list) ? list.filter((x): x is string => typeof x === "string") : []);
  cache.set(key, { raw, set });
  return set;
}

function subscribe(fn: () => void) {
  subs.add(fn);
  window.addEventListener("storage", fn);
  return () => {
    subs.delete(fn);
    window.removeEventListener("storage", fn);
  };
}

/** A string set persisted in localStorage, shared by every component that reads the same key. */
export function useLocalSet(key: string): ReadonlySet<string> {
  return useSyncExternalStore(subscribe, () => read(key), () => EMPTY);
}

export function setLocalMember(key: string, id: string, on: boolean) {
  const next = new Set(read(key));
  if (on) next.add(id);
  else next.delete(id);
  try {
    localStorage.setItem(key, JSON.stringify([...next]));
  } catch {
    /* private mode or full storage: state simply does not persist */
  }
  subs.forEach((fn) => fn());
}

export function clearLocalSet(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
  subs.forEach((fn) => fn());
}

export const READ_KEY = "rbs:read";
export const CHECKLIST_KEY = "rbs:checklist";
