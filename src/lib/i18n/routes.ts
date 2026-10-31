import type { Locale } from "./locales";

/** URL prefix per locale. The default locale has no prefix (proxy rewrites it to `/vi`). */
const PREFIX: Record<Locale, string> = { vi: "", en: "/en" };
/**
 * Remove a leading locale segment. `usePathname()` reports the rewritten URL, so
 * Vietnamese pages arrive as `/vi/...` even though the address bar shows `/...`.
 * `/en` and `/vi` become `/`, `/en/x` and `/vi/x` become `/x`.
 */
export function stripLocale(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  const match = /^\/(?:en|vi)(?=\/|$)/.exec(pathname);
  if (!match) return pathname;
  return pathname.slice(match[0].length) || "/";
}

/**
 * Localise an in-app path. External URLs, `mailto:`, `tel:` and `#hash` links pass through.
 * Idempotent: an already-prefixed path is returned unchanged.
 */
export function localizedHref(href: string, locale: Locale): string {
  const prefix = PREFIX[locale];
  if (!prefix || !href.startsWith("/") || href.startsWith("//")) return href;

  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  if (path === prefix || path.startsWith(`${prefix}/`)) return href;
  return `${prefix}${path === "/" ? "" : path}${rest}`;
}

/** Same page in another locale. */
export function switchLocalePath(pathname: string | null | undefined, target: Locale): string {
  return localizedHref(stripLocale(pathname), target);
}
