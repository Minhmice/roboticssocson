/** Reading position persisted in localStorage. Anchors, never pixel offsets: lazy chunks change page height. */
export interface ResumeRecord {
  /** manual version, e.g. "TU06"; a new manual invalidates old positions */
  v: string;
  /** anchor DOM id (rule / heading / block) */
  a: string;
  /** chunk id that owns the anchor */
  c: string;
  /** PDF page of the anchor */
  p: number;
  /** saved at (ms epoch) */
  t: number;
}

function isResumeRecord(value: unknown): value is ResumeRecord {
  if (typeof value !== "object" || value === null) return false;
  const r: Record<string, unknown> = { ...value };
  return (
    typeof r.v === "string" &&
    typeof r.a === "string" &&
    typeof r.c === "string" &&
    typeof r.p === "number" &&
    typeof r.t === "number"
  );
}

const RESUME_KEY = "ftc-manual:resume:v1";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

// localStorage throws in private mode / when blocked / when full - reading position is a nicety, never fatal.
function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function readResume(version: string): ResumeRecord | null {
  return safe(() => {
    const raw = window.localStorage.getItem(RESUME_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (isResumeRecord(parsed) && parsed.v === version && Date.now() - parsed.t < MAX_AGE_MS) return parsed;
    window.localStorage.removeItem(RESUME_KEY); // wrong shape, other manual version, or stale
    return null;
  }, null);
}

export function writeResume(record: ResumeRecord): void {
  safe(() => window.localStorage.setItem(RESUME_KEY, JSON.stringify(record)), undefined);
}

export function clearResume(): void {
  safe(() => window.localStorage.removeItem(RESUME_KEY), undefined);
}

