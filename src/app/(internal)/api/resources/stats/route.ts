import { NextResponse } from "next/server";
import { visitorId } from "@/lib/resources/api";
import { allStats, likedKeys } from "@/lib/resources/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const visitor = await visitorId();
  return NextResponse.json({ stats: allStats(), liked: likedKeys(visitor) }, { headers: { "Cache-Control": "no-store" } });
}
