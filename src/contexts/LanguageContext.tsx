"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "vi" | "en";
type Messages = Record<string, any>;

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");
  const [messages, setMessages] = useState<Messages>({});
  const [isChanging, setIsChanging] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "vi" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  // Load messages dynamically
  useEffect(() => {
    import(`../../messages/${locale}.json`)
      .then((m) => setMessages(m.default))
      .catch((err) => console.error(`Failed to load messages for ${locale}:`, err));
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    setIsChanging(true);
    
    // Fade out animation
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.3s ease-out";

    setTimeout(() => {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);
      
      // Fade in animation
      setTimeout(() => {
        document.body.style.opacity = "1";
        setIsChanging(false);
      }, 50);
    }, 300);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, messages, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
