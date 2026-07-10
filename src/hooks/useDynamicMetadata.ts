"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Routes that already ship complete SSR metadata.
 * Client locale changes must NOT overwrite title/description for these —
 * crawlers and view-source must keep the server title (esp. /course).
 */
const SSR_LOCKED_PATHS = new Set([
  "/",
  "/course",
  "/course-register-form",
  "/course-register-form/success",
  "/contact-us",
]);

/**
 * Updates `html[lang]` only. Title and meta tags stay as Next.js SSR output.
 */
export function useDynamicMetadata() {
  const { locale } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = locale;

    // Safety: never clobber SSR meta on known marketing routes
    if (pathname && SSR_LOCKED_PATHS.has(pathname)) {
      return;
    }
  }, [locale, pathname]);
}
