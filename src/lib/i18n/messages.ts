import type { Locale } from "./locales";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Messages = Record<string, any>;

/**
 * Server-side loader. Only the requested locale is imported, so the other
 * dictionary never reaches the client bundle. Do not import this from a client component.
 */
const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  vi: () => import("../../../messages/vi.json"),
  en: () => import("../../../messages/en.json"),
};

export async function loadMessages(locale: Locale): Promise<Messages> {
  return (await loaders[locale]()).default;
}
