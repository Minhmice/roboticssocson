import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, PATH_HEADER } from "@/lib/i18n/locales";
import { resolveRequest } from "@/lib/routes/resolve-request";

/**
 * Public URLs always carry a locale (`/vi/...`, `/en/...`). Decisions live in
 * `resolveRequest`; this adapter only turns them into responses.
 */
export function proxy(request: NextRequest) {
  const result = resolveRequest({
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    cookieLocale: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });

  if (result.kind === "next") {
    const headers = new Headers(request.headers);
    headers.set(PATH_HEADER, request.nextUrl.pathname);
    return NextResponse.next({ request: { headers } });
  }

  if (result.kind === "notFound") {
    // Unknown path: render the 404 in place (no redirect). The rewritten path keeps the
    // locale and the original suffix so the 404 page can suggest close matches.
    const url = request.nextUrl.clone();
    url.pathname = result.rewrite;
    const headers = new Headers(request.headers);
    headers.set(PATH_HEADER, result.rewrite);
    return NextResponse.rewrite(url, { request: { headers } });
  }

  const response = NextResponse.redirect(new URL(result.location, request.url), result.status);
  if (result.status === 307) response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  matcher: [
    // Skip internals, API, the internal deck surface and anything with a file extension.
    "/((?!_next/|api/|course/arduino-mblock-deck|Images/|Logo/|.*\\..*).*)",
  ],
};
