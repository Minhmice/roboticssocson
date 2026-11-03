import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE = "rbs_vid";

/** Anonymous visitor id kept in an httpOnly cookie; set on first call. */
export async function visitorId(): Promise<string> {
  const jar = await cookies();
  const existing = jar.get(COOKIE)?.value;
  if (existing && /^[0-9a-f-]{36}$/.test(existing)) return existing;
  const id = randomUUID();
  jar.set(COOKIE, id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 365 });
  return id;
}

// ponytail: in-memory limiter, resets on restart and is per-process. Move to SQLite if the site runs several instances.
const hits = new Map<string, number[]>();

/** True when `visitor` has used `bucket` more than `max` times inside `windowMs`. */
export function limited(bucket: string, visitor: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const id = `${bucket}:${visitor}`;
  const recent = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > windowMs) hits.delete(k);
  return recent.length > max;
}

export const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Trim, strip control chars (keep newlines), enforce length. Returns null when out of range. */
export function cleanText(value: unknown, min: number, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim();
  return text.length >= min && text.length <= max ? text : null;
}
