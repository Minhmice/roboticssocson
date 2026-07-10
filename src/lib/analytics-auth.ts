import { createHmac, timingSafeEqual } from "crypto";

export const ANALYTICS_COOKIE = "rbs_analytics_session";
export const ANALYTICS_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function getAuthSecret(): string {
  return (
    process.env.ANALYTICS_AUTH_SECRET ??
    process.env.ANALYTICS_DASHBOARD_PASSWORD ??
    "rbs-analytics-dev-secret"
  );
}

export function createAnalyticsSessionToken(): string {
  return createHmac("sha256", getAuthSecret())
    .update("rbs-analytics-authenticated")
    .digest("hex");
}

export function verifyAnalyticsSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = createAnalyticsSessionToken();
  try {
    const a = Buffer.from(token, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyDashboardPassword(password: string): boolean {
  const expected = process.env.ANALYTICS_DASHBOARD_PASSWORD ?? "rbs2026@";
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
