import { NextResponse } from "next/server";
import { cleanText, fail, limited, readJson, visitorId } from "@/lib/resources/api";
import { addQuestion, listQuestions, QUESTION_CATEGORIES } from "@/lib/resources/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const limit = Math.min(Math.max(Number(params.get("limit")) || 5, 1), 30);
  const categoryId = params.get("category") ?? undefined;
  return NextResponse.json({ questions: listQuestions(limit, categoryId) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const body = await readJson(request);
  const categoryId = typeof body?.categoryId === "string" ? body.categoryId : "";
  if (!QUESTION_CATEGORIES.includes(categoryId)) return fail("Unknown category");
  const author = cleanText(body?.author, 2, 40);
  const title = cleanText(body?.title, 8, 140);
  const text = cleanText(body?.body, 10, 2000);
  if (!author || !title || !text) return fail("Invalid input");
  const visitor = await visitorId();
  if (limited("question", visitor, 3, 10 * 60_000)) return fail("Too many requests", 429);
  return NextResponse.json({ question: addQuestion(categoryId, title, text, author, visitor) }, { status: 201 });
}
