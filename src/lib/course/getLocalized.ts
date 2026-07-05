export type LocalizedText = { vi: string; en: string };

export type CourseLocale = "vi" | "en";

export function getLocalized(
  text: LocalizedText,
  locale: CourseLocale
): string {
  return text[locale] ?? text.vi;
}
