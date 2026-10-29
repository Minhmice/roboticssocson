import type { Locale } from "./locales";

export type Localized<T> = {
  vi: T;
  en: T;
};

export type LocalizedText = Localized<string>;

export type LocalizedStringList = Localized<string[]>;

export function localize<T>(field: Localized<T>, locale: Locale): T {
  return field[locale] ?? field.vi;
}
