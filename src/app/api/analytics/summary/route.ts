import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ANALYTICS_COOKIE,
  verifyAnalyticsSessionToken,
} from "@/lib/analytics-auth";
import { fetchAnalyticsSummary } from "@/lib/posthog/query";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ANALYTICS_COOKIE)?.value;
  if (!verifyAnalyticsSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await fetchAnalyticsSummary();
  return NextResponse.json(summary);
}
