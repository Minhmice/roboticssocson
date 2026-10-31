import type { Metadata } from "next";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import {
  DEFAULT_OG_HEIGHT,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_WIDTH,
  getSiteUrl,
} from "./site-url";

export type { Locale } from "@/lib/i18n/locales";

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

function toAbsoluteUrl(canonicalPath: string, locale: Locale): string {
  const site = getSiteUrl();
  const path = localizedHref(canonicalPath, locale);
  if (path === "/") {
    return site;
  }
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(
  seo: RouteSeo,
  locale: Locale = DEFAULT_LOCALE,
): Metadata {
  const ogImage = seo.ogImage ?? DEFAULT_OG_IMAGE;
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;

  const canonicalUrl = toAbsoluteUrl(seo.canonicalPath, locale);
  const viUrl = toAbsoluteUrl(seo.canonicalPath, "vi");
  const enUrl = toAbsoluteUrl(seo.canonicalPath, "en");

  const ogLocale = locale === "vi" ? "vi_VN" : "en_US";
  const alternateLocale = locale === "vi" ? "en_US" : "vi_VN";

  return {
    title: seo.title,
    description: seo.description,
    ...(seo.keywords?.length ? { keywords: seo.keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: viUrl,
        en: enUrl,
        "x-default": viUrl,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      url: canonicalUrl,
      siteName: "Robotics Sóc Sơn",
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_WIDTH,
          height: DEFAULT_OG_HEIGHT,
          alt: "Robotics Sóc Sơn",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}
