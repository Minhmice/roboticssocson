import { NextResponse, type NextRequest } from "next/server";

/**
 * Vietnamese keeps the unprefixed URLs (`/`, `/fundraising`), English lives under `/en`.
 *
 * - `/x`        rewritten to `/vi/x` (URL in the browser stays `/x`)
 * - `/en/...`   passes through
 * - `/vi/...`   redirected to `/...` so each page has one canonical URL
 *
 * The decision depends on the URL only (no cookies, no Accept-Language), so pages stay
 * statically prerendered.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/vi${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip internals, API, analytics proxy, the internal deck/analytics surfaces and anything with a file extension.
    "/((?!_next/|api/|ingest/|analytics|course/arduino-mblock-deck|Images/|Logo/|.*\\..*).*)",
  ],
};
