import type { MetadataRoute } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { RESOURCE_CATEGORIES, RESOURCE_ARTICLES } from "@/data/resources";
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
      path: "/profile",
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
    {
      path: "/resources",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      path: "/ftc-rules",
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Data-driven category routes:
  // Include non-rules category only if it has at least one ready article and is not programming
  for (const category of RESOURCE_CATEGORIES) {
    if (category.id === "rules" || category.id === "programming") continue;
    const hasReady = RESOURCE_ARTICLES.some(
      (a) => a.categoryId === category.id && a.status === "ready",
    );
    if (hasReady) {
      routes.push({
        path: `/resources/${category.id}`,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  // Data-driven article routes:
  // Include article only if status is ready and not programming
  for (const article of RESOURCE_ARTICLES) {
    if (article.categoryId === "programming") continue;
    if (article.status === "ready") {
      routes.push({
        path: `/resources/${article.categoryId}/${article.slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

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
