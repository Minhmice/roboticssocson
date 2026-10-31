import type { MetadataRoute } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import type { Locale } from "@/lib/i18n/locales";
import { LOCALES } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

type RouteConfig = {
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

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

  const routes: RouteConfig[] = [
    {
      path: "/",
      changeFrequency: "weekly",
      priority: 1,
    },
    ...(courseSurfacesEnabled
      ? [
          {
            path: "/course",
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
          {
            path: "/course-register-form",
            changeFrequency: "weekly" as const,
            priority: 0.85,
          },
        ]
      : []),
    {
      path: "/fundraising",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/recruitment",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      path: "/contact-us",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return routes.flatMap((route) => {
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
