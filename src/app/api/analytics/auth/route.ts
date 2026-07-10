import { NextResponse } from "next/server";
import {
  ANALYTICS_COOKIE,
  ANALYTICS_COOKIE_MAX_AGE,
  createAnalyticsSessionToken,
  verifyDashboardPassword,
} from "@/lib/analytics-auth";

export async function POST(request: Request) {
  let password = "";

  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!verifyDashboardPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ANALYTICS_COOKIE,
    value: createAnalyticsSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ANALYTICS_COOKIE_MAX_AGE,
  });
  return response;
}
