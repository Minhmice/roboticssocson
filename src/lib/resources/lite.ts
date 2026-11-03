import { readFileSync } from "node:fs";
import path from "node:path";
import { RESOURCE_ARTICLES, getCategoryById, type ResourceArticle } from "@/data/resources";
import { localize } from "@/lib/i18n/localized";
import type { Locale } from "@/lib/i18n/locales";
import { articleKey } from "@/lib/resources/keys";

/** Serializable, locale-resolved article for client components. */
export interface ArticleLite {
  key: string;
  href: string;
  categoryId: string;
  category: string;
  title: string;
  summary: string;
  tags: readonly string[];
  soon: boolean;
  /** First web image of the article body (null for outlines or text-only articles). */
  cover: string | null;
}

const coverCache = new Map<string, string | null>();

/** First remote image in the article MDX; build/SSR only. */
export function articleCover(article: ResourceArticle): string | null {
  const id = `${article.categoryId}/${article.slug}`;
  if (coverCache.has(id)) return coverCache.get(id)!;
  let cover: string | null = null;
  if (article.status === "ready") {
    try {
      const file = path.join(process.cwd(), "src", "content", "resources", article.categoryId, `${article.slug}.en.mdx`);
      cover = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/.exec(readFileSync(file, "utf8"))?.[1] ?? null;
    } catch {
      cover = null;
    }
  }
  coverCache.set(id, cover);
  return cover;
}

export function toLite(article: ResourceArticle, locale: Locale): ArticleLite {
  const category = getCategoryById(article.categoryId);
  return {
    key: articleKey(article.categoryId, article.slug),
    href: `/resources/${article.categoryId}/${article.slug}`,
    categoryId: article.categoryId,
    category: category ? localize(category.title, locale) : article.categoryId,
    title: localize(article.title, locale),
    summary: localize(article.summary, locale),
    tags: article.tags,
    soon: article.status === "soon",
    cover: articleCover(article),
  };
}

export const allLite = (locale: Locale): ArticleLite[] => RESOURCE_ARTICLES.map((a) => toLite(a, locale));

/** Minutes to read a published article, from the MDX source. Build/SSR only. */
export function readingMinutes(article: ResourceArticle, locale: Locale): number {
  try {
    const file = path.join(process.cwd(), "src", "content", "resources", article.categoryId, `${article.slug}.${locale}.mdx`);
    const words = readFileSync(file, "utf8").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  } catch {
    return 1;
  }
}

/** Up to `limit` other published articles, ranked by shared tags then same category. */
export function relatedArticles(article: ResourceArticle, limit = 3): ResourceArticle[] {
  const tags = new Set(article.tags.map((t) => t.toLowerCase()));
  return RESOURCE_ARTICLES.filter((a) => a.status === "ready" && !(a.slug === article.slug && a.categoryId === article.categoryId))
    .map((a) => ({ a, score: a.tags.filter((t) => tags.has(t.toLowerCase())).length * 2 + (a.categoryId === article.categoryId ? 1 : 0) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}
