import type { MetadataRoute } from "next";
import type { Locale } from "@/lib/i18n/locales";
import { LOCALES } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { sitemapRoutes } from "@/lib/routes/public-routes";
import { getSiteUrl } from "@/lib/seo/site-url";

function toAbsoluteUrl(canonicalPath: string, locale: Locale): string {
  const origin = getSiteUrl();
  const path = localizedHref(canonicalPath, locale);
  if (path === "/") {
    return origin;
  }
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapRoutes().flatMap((route) => {
    const viUrl = toAbsoluteUrl(route.path, "vi");
    const enUrl = toAbsoluteUrl(route.path, "en");
    const languages = { vi: viUrl, en: enUrl };

    return LOCALES.map((locale) => ({
      url: locale === "vi" ? viUrl : enUrl,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages,
      },
    }));
  });
}
