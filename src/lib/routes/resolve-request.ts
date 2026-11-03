import { DEFAULT_LOCALE, type Locale } from "../i18n/locales.ts";
import { isPublicRoute, resolveLegacy } from "./public-routes.ts";

export type Resolution =
  | { kind: "next" }
  | { kind: "redirect"; location: string; status: 307 | 308 }
  | { kind: "notFound"; rewrite: string };

/** First path segments accepted as a locale. `vn` is a common typo for `vi`. */
const LOCALE_SEGMENTS: ReadonlyMap<string, Locale> = new Map([
  ["vi", "vi"],
  ["en", "en"],
  ["vn", "vi"],
]);

/** Highest q-value for `lang` or any `lang-*` tag; 0 when absent, 1 when q is omitted. */
function languageQuality(header: string, lang: string): number {
  let best = 0;
  for (const part of header.split(",")) {
    const [rawTag, ...params] = part.trim().toLowerCase().split(";");
    const tag = rawTag.trim();
    if (tag !== lang && !tag.startsWith(`${lang}-`)) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const value = q ? Number(q.slice(2)) : 1;
    if (Number.isFinite(value) && value > best) best = value;
  }
  return best;
}

/** Cookie, then browser preference (English only when strictly preferred), then vi. */
export function pickLocale(cookieLocale: string | undefined, acceptLanguage: string | null): Locale {
  if (cookieLocale === "vi" || cookieLocale === "en") return cookieLocale;
  if (acceptLanguage && languageQuality(acceptLanguage, "en") > languageQuality(acceptLanguage, "vi")) {
    return "en";
  }
  return DEFAULT_LOCALE;
}

/**
 * Decides what the proxy does with a request, in one step:
 * normalise → locale → legacy alias → unknown (404 rewrite) → redirect if not canonical.
 */
export function resolveRequest(input: {
  pathname: string;
  search: string;
  cookieLocale: string | undefined;
  acceptLanguage: string | null;
}): Resolution {
  const normalized = input.pathname
    .replace(/\/{2,}/g, "/")
    .toLowerCase()
    .replace(/(.)\/$/, "$1");
  const segments = normalized.split("/");
  const segmentLocale = LOCALE_SEGMENTS.get(segments[1] ?? "");
  const localeMissing = segmentLocale === undefined;
  const locale = segmentLocale ?? pickLocale(input.cookieLocale, input.acceptLanguage);
  const rawSuffix = localeMissing ? normalized : `/${segments.slice(2).join("/")}`;
  const suffix = resolveLegacy(rawSuffix) ?? rawSuffix;
  const canonical = `/${locale}${suffix === "/" ? "" : suffix}`;

  if (!isPublicRoute(suffix)) return { kind: "notFound", rewrite: canonical };
  if (canonical === input.pathname) return { kind: "next" };
  return {
    kind: "redirect",
    location: `${canonical}${input.search}`,
    status: localeMissing ? 307 : 308,
  };
}
