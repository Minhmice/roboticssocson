import type { CourseLocale } from "@/lib/course/getLocalized";

export function isRegistrationUrlAvailable(url?: string): boolean {
  return Boolean(url?.trim());
}

export function getGoogleFormUrl(
  links: { vi: string; en: string },
  locale: CourseLocale
): string | undefined {
  const url = links[locale]?.trim();
  return url || undefined;
}

export function getMessengerUrl(
  messengerUrl?: string,
  locale?: CourseLocale
): string | undefined {
  void locale;
  const url = messengerUrl?.trim();
  return url || undefined;
}
