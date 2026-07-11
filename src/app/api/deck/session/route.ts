import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DECK_COOKIE, verifyDeckSessionToken } from "@/lib/deck-auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(DECK_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifyDeckSessionToken(token) });
}
