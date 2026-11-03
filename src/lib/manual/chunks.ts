import { useSyncExternalStore } from "react";
import type { ManualChunkData } from "@/types/manual";

export type ChunkError = "network" | "server" | "data";

export interface ChunkState {
  status: "idle" | "loading" | "ready" | "error";
  data: ManualChunkData | null;
  error: ChunkError | null;
}

const IDLE: ChunkState = { status: "idle", data: null, error: null };
/** Browsers cap parallel connections; a fast scroll must not queue 30 fetches ahead of the chunk the reader stops on. */
const MAX_ACTIVE = 4;

const states = new Map<string, ChunkState>();
const listeners = new Set<() => void>();
const waiting: string[] = [];
const pinned = new Set<string>(); // requested by a jump: scroll-out must not cancel them
const inflight = new Map<string, PromiseWithResolvers<ManualChunkData | null>>();
let active = 0;

function set(id: string, state: ChunkState) {
  states.set(id, state);
  for (const l of listeners) l();
}

class ChunkFetchError extends Error {
  constructor(readonly kind: Exclude<ChunkError, "network">) {
    super(kind);
  }
}

async function run(id: string) {
  active++;
  try {
    const res = await fetch(`/manual/chunks/${id}.json`);
    if (!res.ok) throw new ChunkFetchError("server");
    const data: ManualChunkData = await res.json().catch(() => {
      throw new ChunkFetchError("data");
    });
    set(id, { status: "ready", data, error: null });
    inflight.get(id)?.resolve(data);
  } catch (e) {
    // fetch() rejects with a TypeError when offline / DNS / CORS: that is the only "network" case
    const kind: ChunkError = e instanceof ChunkFetchError ? e.kind : "network";
    set(id, { status: "error", data: null, error: kind });
    inflight.get(id)?.resolve(null);
  } finally {
    inflight.delete(id);
    active--;
    pump();
  }
}

function pump() {
  while (active < MAX_ACTIVE && waiting.length > 0) void run(waiting.shift()!);
}

/** Fetch a chunk once. `urgent` (jumps, retries) skips the queue and survives scroll-out cancellation. */
export function requestChunk(id: string, urgent = false): Promise<ManualChunkData | null> {
  const known = states.get(id);
  if (known?.data) return Promise.resolve(known.data);
  if (urgent) pinned.add(id);
  const pending = inflight.get(id);
  if (pending) {
    const queued = waiting.indexOf(id);
    if (urgent && queued >= 0) {
      waiting.splice(queued, 1);
      void run(id);
    }
    return pending.promise;
  }
  const entry = Promise.withResolvers<ManualChunkData | null>();
  inflight.set(id, entry);
  set(id, { status: "loading", data: null, error: null });
  if (urgent) void run(id);
  else {
    waiting.push(id);
    pump();
  }
  return entry.promise;
}

/** Reader scrolled past before the fetch started: drop it from the queue. */
export function cancelChunk(id: string) {
  const queued = waiting.indexOf(id);
  if (queued < 0 || pinned.has(id)) return;
  waiting.splice(queued, 1);
  set(id, IDLE);
  inflight.get(id)?.resolve(null);
  inflight.delete(id);
}

export function seedChunk(data: ManualChunkData) {
  if (!states.get(data.id)?.data) set(data.id, { status: "ready", data, error: null });
}

if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    for (const [id, st] of states) if (st.status === "error") void requestChunk(id);
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useChunk(id: string): ChunkState {
  return useSyncExternalStore(
    subscribe,
    () => states.get(id) ?? IDLE,
    () => IDLE,
  );
}
