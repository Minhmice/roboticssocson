import type { Locale } from "./locales";

/** Prefix every public URL with its locale. */
const PREFIX: Record<Locale, string> = { vi: "/vi", en: "/en" };
/** Remove a leading locale segment for route comparisons. */
export function stripLocale(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  const match = /^\/(?:en|vi)(?=\/|$)/.exec(pathname);
  if (!match) return pathname;
  return pathname.slice(match[0].length) || "/";
}

/**
 * Localise an in-app path. External URLs, `mailto:`, `tel:` and `#hash` links pass through.
 * Already-prefixed paths are normalized to the requested locale.
 */
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? "" : href.slice(cut);
  const suffix = stripLocale(path);
  return `${PREFIX[locale]}${suffix === "/" ? "" : suffix}${rest}`;
}

/** Same page in another locale. */
export function switchLocalePath(pathname: string | null | undefined, target: Locale): string {
  return localizedHref(stripLocale(pathname), target);
}
