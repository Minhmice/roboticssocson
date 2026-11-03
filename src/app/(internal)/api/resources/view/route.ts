import { NextResponse } from "next/server";
import { fail, limited, readJson, visitorId } from "@/lib/resources/api";
import { isThread, recordView } from "@/lib/resources/db";

export async function POST(request: Request) {
  const body = await readJson(request);
  const key = typeof body?.key === "string" ? body.key : "";
  if (!isThread(key)) return fail("Unknown article", 404);
  const visitor = await visitorId();
  if (limited("view", visitor, 60, 60_000)) return fail("Too many requests", 429);
  return NextResponse.json({ views: recordView(key, visitor) });
}
