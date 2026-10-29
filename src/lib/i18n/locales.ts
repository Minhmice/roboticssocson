export type Locale = "vi" | "en";

export const LOCALES: readonly Locale[] = ["vi", "en"] as const;

export const DEFAULT_LOCALE: Locale = "vi";

export function isSupportedLocale(locale: string | undefined | null): locale is Locale {
  return locale === "vi" || locale === "en";
}
