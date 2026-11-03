import { getCategoryById } from "@/data/resources";
import { localize } from "@/lib/i18n/localized";
import type { Locale } from "@/lib/i18n/locales";

export function formatCount(n: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", { notation: n >= 10_000 ? "compact" : "standard" }).format(n);
}

const UNITS: readonly [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
];

export function timeAgo(ts: number, locale: Locale): string {
  const diff = ts - Date.now();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  for (const [unit, ms] of UNITS) if (Math.abs(diff) >= ms) return rtf.format(Math.round(diff / ms), unit);
  return rtf.format(0, "second");
}

export function categoryLabel(id: string, locale: Locale): string {
  const category = getCategoryById(id);
  return category ? localize(category.title, locale) : locale === "vi" ? "Khác" : "Other";
}
