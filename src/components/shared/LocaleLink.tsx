"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizedHref } from "@/lib/i18n/routes";

/** `next/link` that prefixes in-app paths with the current locale (`/en/...`). */
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useLanguage();
  return (
    <Link
      href={typeof href === "string" ? localizedHref(href, locale) : href}
      {...props}
    />
  );
}
