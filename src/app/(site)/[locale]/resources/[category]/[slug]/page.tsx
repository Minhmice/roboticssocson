import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isSupportedLocale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { RESOURCE_ARTICLES, getCategoryById, getArticleBySlug, getArticlesByCategory } from "@/data/resources";
import { ArticlePlaceholder } from "@/components/resources/ArticlePlaceholder";
import { RESOURCE_MANIFEST } from "@/lib/resources/manifest.generated";

type Params = { params: Promise<{ locale: string; category: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => RESOURCE_ARTICLES.map((article) => ({ locale, category: article.categoryId, slug: article.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, category, slug } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const article = getArticleBySlug(category, slug);
  if (!article) notFound();
  const metadata = buildMetadata({ title: `${localize(article.title, locale)} | Robotics Sóc Sơn`, description: localize(article.summary, locale), canonicalPath: `/resources/${category}/${slug}`, keywords: [...article.tags] }, locale);
  return article.status === "soon" || category === "programming" ? { ...metadata, robots: { index: false, follow: true } } : metadata;
}

export default async function ArticlePage({ params }: Params) {
  const { locale, category: categoryId, slug } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const article = getArticleBySlug(categoryId, slug);
  const category = getCategoryById(categoryId);
  if (!article || !category) notFound();
  if (article.status === "soon") return <ArticlePlaceholder article={article} category={category} locale={locale} siblingArticles={getArticlesByCategory(categoryId)} />;
  const Content = RESOURCE_MANIFEST[`${categoryId}/${slug}`]?.[locale];
  if (!Content) throw new Error(`Published resource is missing compiled MDX: ${categoryId}/${slug}.${locale}`);
  const vi = locale === "vi";
  return (
    <article className="bg-background px-4 pb-20 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <nav aria-label={vi ? "Đường dẫn" : "Breadcrumb"} className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link href={localizedHref("/resources", locale)} className="inline-flex min-h-11 items-center rounded-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Tài nguyên" : "Resources"}</Link><span aria-hidden>/</span>
          <Link href={localizedHref(`/resources/${categoryId}`, locale)} className="inline-flex min-h-11 items-center rounded-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{localize(category.title, locale)}</Link>
        </nav>
        <header className="mb-8 border-b border-border pb-7">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{localize(article.title, locale)}</h1>
          <p className="mt-4 max-w-[70ch] text-base leading-relaxed">{localize(article.summary, locale)}</p>
          <p className="mt-5 text-sm text-muted-foreground">{vi ? "Cập nhật: " : "Updated: "}<time dateTime={article.lastUpdated}>{new Intl.DateTimeFormat(vi ? "vi-VN" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${article.lastUpdated}T00:00:00Z`))}</time></p>
        </header>
        <Content />
      </div>
    </article>
  );
}
