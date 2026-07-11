import { NextResponse } from "next/server";
import {
  createDeckSessionToken,
  DECK_COOKIE,
  DECK_COOKIE_MAX_AGE,
  verifyDeckPassword,
} from "@/lib/deck-auth";

export async function POST(request: Request) {
  let password = "";

  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!verifyDeckPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: DECK_COOKIE,
    value: createDeckSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DECK_COOKIE_MAX_AGE,
  });
  return response;
}
