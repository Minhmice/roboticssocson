import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ANALYTICS_COOKIE,
  verifyAnalyticsSessionToken,
} from "@/lib/analytics-auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ANALYTICS_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifyAnalyticsSessionToken(token) });
}
