export type Locale = "vi" | "en";

export const LOCALES: readonly Locale[] = ["vi", "en"] as const;

export const DEFAULT_LOCALE: Locale = "vi";

/** Remembers the language a visitor picked with the VI/EN toggle. Read by the proxy. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const PATH_HEADER = "x-rbs-path";

export function isSupportedLocale(locale: string | undefined | null): locale is Locale {
  return locale === "vi" || locale === "en";
}
