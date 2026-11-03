import { NextResponse } from "next/server";
import { cleanText, fail, limited, readJson, visitorId } from "@/lib/resources/api";
import { addComment, isThread, listComments } from "@/lib/resources/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const thread = new URL(request.url).searchParams.get("thread") ?? "";
  if (!isThread(thread)) return fail("Unknown thread", 404);
  return NextResponse.json({ comments: listComments(thread) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const body = await readJson(request);
  const thread = typeof body?.thread === "string" ? body.thread : "";
  if (!isThread(thread)) return fail("Unknown thread", 404);
  const author = cleanText(body?.author, 2, 40);
  const text = cleanText(body?.body, 2, 1000);
  if (!author || !text) return fail("Invalid input");
  const visitor = await visitorId();
  if (limited("comment", visitor, 5, 60_000)) return fail("Too many requests", 429);
  return NextResponse.json({ comment: addComment(thread, author, text, visitor) }, { status: 201 });
}
