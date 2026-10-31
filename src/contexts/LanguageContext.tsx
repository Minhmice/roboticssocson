"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { Messages } from "@/lib/i18n/messages";

interface LanguageContextType {
  locale: Locale;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function createTranslator(messages: Messages) {
  return (key: string): string => {
    if (!key || typeof key !== "string") return "";

    let value: unknown = messages;
    for (const k of key.split(".")) {
      if (typeof value !== "object" || value === null) {
        value = undefined;
        break;
      }
      value = (value as Record<string, unknown>)[k];
    }
    return typeof value === "string" ? value : key;
  };
}

/**
 * Locale comes from the URL and is resolved on the server, so server render and
 * hydration always agree. Switching language is a navigation, not client state.
 */
export function LanguageProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo<LanguageContextType>(
    () => ({ locale, t: createTranslator(messages) }),
    [locale, messages],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
