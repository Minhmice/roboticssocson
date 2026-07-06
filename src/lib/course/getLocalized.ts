export type LocalizedText = { vi: string; en: string };

export type CourseLocale = "vi" | "en";

export function getLocalized(
  text: LocalizedText,
  locale: CourseLocale
): string {
  return text[locale] ?? text.vi;
}

export type LocalizedStringList = { vi: string[]; en: string[] };

export function getLocalizedList(
  list: LocalizedStringList,
  locale: CourseLocale
): string[] {
  return list[locale] ?? list.vi;
}
