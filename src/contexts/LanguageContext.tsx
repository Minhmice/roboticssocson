"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import enMessages from "../../messages/en.json";
import viMessages from "../../messages/vi.json";

type Locale = "vi" | "en";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

const MESSAGE_CATALOG: Record<Locale, Messages> = {
  vi: viMessages,
  en: enMessages,
};

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "vi";
  const saved = localStorage.getItem("locale");
  if (saved === "vi" || saved === "en") return saved;
  return "vi";
}

function createTranslator(messages: Messages) {
  return (key: string): string => {
    if (!key || typeof key !== "string") return "";

    const keys = key.split(".");
    let value: Record<string, unknown> | string = messages;
    for (const k of keys) {
      if (typeof value === "object" && value !== null) {
        value = value[k] as Record<string, unknown> | string;
      }
      if (value === undefined) break;
    }
    return typeof value === "string" ? value : key;
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    captureEvent(AnalyticsEvents.LANGUAGE_SWITCHED, {
      from: locale,
      to: newLocale,
    });

    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease-out";

    setTimeout(() => {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);

      setTimeout(() => {
        document.body.style.opacity = "1";
      }, 50);
    }, 300);
  };

  const messages = MESSAGE_CATALOG[locale] ?? MESSAGE_CATALOG.vi;

  const t = createTranslator(messages);

  return (
    <LanguageContext.Provider value={{ locale, messages, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function VietnameseOnlyLanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useMemo<LanguageContextType>(
    () => ({
      locale: "vi",
      messages: MESSAGE_CATALOG.vi,
      setLocale: () => {},
      t: createTranslator(MESSAGE_CATALOG.vi),
    }),
    [],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
