import { createHmac, timingSafeEqual } from "crypto";

export const DECK_COOKIE = "rbs_deck_session";
export const DECK_COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours (presentation day)

function getAuthSecret(): string {
  return (
    process.env.DECK_AUTH_SECRET ??
    process.env.DECK_PRESENTATION_PASSWORD ??
    process.env.ANALYTICS_DASHBOARD_PASSWORD ??
    "rbs-deck-dev-secret"
  );
}

export function createDeckSessionToken(): string {
  return createHmac("sha256", getAuthSecret())
    .update("rbs-deck-authenticated")
    .digest("hex");
}

export function verifyDeckSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = createDeckSessionToken();
  try {
    const a = Buffer.from(token, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyDeckPassword(password: string): boolean {
  const expected =
    process.env.DECK_PRESENTATION_PASSWORD ??
    process.env.ANALYTICS_DASHBOARD_PASSWORD ??
    "rbs2026@";
  if (!password || !expected) return false;
  try {
    const a = Buffer.from(password, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
