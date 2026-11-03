import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_LOCALE = "vi";

/**
 * Public routes always include locale prefix (`/vi/...` or `/en/...`).
 * A URL without one (`/`, `/fundraising`) redirects to the default locale, query kept.
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

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip internals, API, analytics proxy, the internal deck/analytics surfaces and anything with a file extension.
    "/((?!_next/|api/|ingest/|analytics|course/arduino-mblock-deck|Images/|Logo/|.*\\..*).*)",
  ],
};
