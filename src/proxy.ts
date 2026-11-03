import { NextResponse, type NextRequest } from "next/server";

/**
 * Public routes always include locale prefix (`/vi/...` or `/en/...`).
 * API, assets and internal surfaces remain excluded by matcher.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/vi" ||
    pathname.startsWith("/vi/") ||
    pathname === "/en" ||
    pathname.startsWith("/en/")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internals, API, analytics proxy, the internal deck/analytics surfaces and anything with a file extension.
    "/((?!_next/|api/|ingest/|analytics|course/arduino-mblock-deck|Images/|Logo/|.*\\..*).*)",
  ],
};
