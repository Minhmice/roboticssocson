import type { Localized } from "../i18n/localized";
import { courseSurfacesEnabled } from "../../data/courseRegistration.ts";
import { recruitmentSurfacesEnabled } from "../../data/recruitment.ts";
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES } from "../../data/resources.ts";

/**
 * Single source of truth for public routes. Paths are locale-less suffixes:
 * lower-case, starting with "/", no trailing slash except "/".
 * Used by the proxy, the sitemap and the 404 page. A new page under
 * src/app/(site)/[locale]/ must be added here (npm run check:routes enforces it).
 */

export type RouteLabel = Localized<string>;
export type SitemapMeta = { changeFrequency: "weekly" | "monthly"; priority: number };
type RouteEntry = { path: string; label: RouteLabel; sitemap?: SitemapMeta };

const HOME: RouteEntry = {
  path: "/",
  label: { vi: "Trang chủ", en: "Home" },
  sitemap: { changeFrequency: "weekly", priority: 1 },
};

const COURSE_ROUTES: readonly RouteEntry[] = [
  {
    path: "/course",
    label: { vi: "Khóa học", en: "Course" },
    sitemap: { changeFrequency: "weekly", priority: 0.9 },
  },
  {
    path: "/course-register-form",
    label: { vi: "Đăng ký khóa học", en: "Course registration" },
    sitemap: { changeFrequency: "weekly", priority: 0.85 },
  },
  {
    path: "/course-register-form/success",
    label: { vi: "Đăng ký thành công", en: "Registration complete" },
  },
];

const RECRUITMENT_ROUTES: readonly RouteEntry[] = [
  {
    path: "/recruitment",
    label: { vi: "Tuyển thành viên", en: "Recruitment" },
    sitemap: { changeFrequency: "monthly", priority: 0.85 },
  },
];

const STATIC_ROUTES: readonly RouteEntry[] = [
  {
    path: "/fundraising",
    label: { vi: "Gây quỹ", en: "Fundraising" },
    sitemap: { changeFrequency: "weekly", priority: 0.9 },
  },
  {
    path: "/profile",
    label: { vi: "Hồ sơ CLB", en: "Club profile" },
    sitemap: { changeFrequency: "weekly", priority: 0.9 },
  },
  {
    path: "/profile/print",
    label: { vi: "Hồ sơ CLB (bản in)", en: "Club profile (print)" },
  },
  {
    path: "/contact-us",
    label: { vi: "Liên hệ", en: "Contact" },
    sitemap: { changeFrequency: "monthly", priority: 0.8 },
  },
  {
    path: "/resources",
    label: { vi: "Tài nguyên", en: "Resources" },
    sitemap: { changeFrequency: "weekly", priority: 0.85 },
  },
  {
    path: "/resources/community",
    label: { vi: "Hỏi đáp", en: "Q&A" },
    sitemap: { changeFrequency: "weekly", priority: 0.6 },
  },
  {
    path: "/ftc-rules",
    label: { vi: "Luật FTC", en: "FTC rules" },
    sitemap: { changeFrequency: "weekly", priority: 0.85 },
  },
];

/** Same rules as the resources pages' generateStaticParams. */
function resourceRoutes(): RouteEntry[] {
  const routes: RouteEntry[] = [];
  for (const category of RESOURCE_CATEGORIES) {
    if (category.id === "rules") continue;
    const listed =
      category.id !== "programming" &&
      RESOURCE_ARTICLES.some((a) => a.categoryId === category.id && a.status === "ready");
    routes.push({
      path: `/resources/${category.id}`,
      label: category.title,
      sitemap: listed ? { changeFrequency: "monthly", priority: 0.75 } : undefined,
    });
  }
  for (const article of RESOURCE_ARTICLES) {
    const listed = article.status === "ready" && article.categoryId !== "programming";
    routes.push({
      path: `/resources/${article.categoryId}/${article.slug}`,
      label: article.title,
      sitemap: listed ? { changeFrequency: "monthly", priority: 0.7 } : undefined,
    });
  }
  return routes;
}

const ROUTES: readonly RouteEntry[] = [
  HOME,
  ...(courseSurfacesEnabled ? COURSE_ROUTES : []),
  ...(recruitmentSurfacesEnabled ? RECRUITMENT_ROUTES : []),
  ...STATIC_ROUTES,
  ...resourceRoutes(),
];
const ROUTE_PATHS = new Set(ROUTES.map((route) => route.path));

/** Runtime-created questions: valid shape only; the page 404s when the id is unknown. */
const COMMUNITY_QUESTION = /^\/resources\/community\/\d{1,9}$/;

export function isPublicRoute(suffix: string): boolean {
  return ROUTE_PATHS.has(suffix) || COMMUNITY_QUESTION.test(suffix);
}

/** Old public slugs. Matches the exact segment or any sub-path; the tail is dropped. */
const LEGACY_ALIASES: readonly (readonly [from: string, to: string])[] = [
  ["/ho-so", "/profile"],
  ["/luat-ftc", "/ftc-rules"],
  ["/resources/rules", "/ftc-rules"],
  ["/sponsor", "/fundraising"],
  ["/sponsorship", "/fundraising"],
];

export function resolveLegacy(suffix: string): string | null {
  for (const [from, to] of LEGACY_ALIASES) {
    if (suffix === from || suffix.startsWith(`${from}/`)) return to;
  }
  return null;
}

export function sitemapRoutes(): ({ path: string } & SitemapMeta)[] {
  return ROUTES.flatMap((route) => (route.sitemap ? [{ path: route.path, ...route.sitemap }] : []));
}

function lastSegment(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

function levenshtein(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
    }
    previous = current;
  }
  return previous[b.length];
}

/**
 * Close matches for a 404, ranked: prefix (0) < contained in slug (1) < typo (distance).
 * Compares last segments only; `/` and the request itself are never suggested.
 */
export function suggestRoutes(
  suffix: string,
  limit: number,
): { path: string; label: RouteLabel }[] {
  const needle = lastSegment(suffix);
  if (!needle) return [];
  const maxDistance = Math.max(2, Math.floor(needle.length * 0.3));
  const scored: { path: string; label: RouteLabel; score: number }[] = [];
  for (const route of ROUTES) {
    if (route.path === "/" || route.path === suffix) continue;
    const target = lastSegment(route.path);
    let score: number | null = null;
    if (needle.length >= 3 && target.startsWith(needle)) score = 0;
    else if (needle.length >= 5 && target.includes(needle)) score = 1;
    else {
      const distance = levenshtein(needle, target);
      if (distance <= maxDistance) score = distance;
    }
    if (score !== null) scored.push({ path: route.path, label: route.label, score });
  }
  scored.sort((a, b) => a.score - b.score || a.path.length - b.path.length);
  return scored.slice(0, limit).map(({ path, label }) => ({ path, label }));
}
