import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LOCALES, isSupportedLocale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { RESOURCE_CATEGORIES, getCategoryById, getArticlesByCategory } from "@/data/resources";
import { ArticleCard } from "@/components/resources/ArticleCard";
import { ResourceSearch } from "@/components/resources/ResourceSearch";

type Params = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => RESOURCE_CATEGORIES.filter((category) => category.id !== "rules").map((category) => ({ locale, category: category.id })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, category: categoryId } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const category = getCategoryById(categoryId);
  if (!category || categoryId === "rules") notFound();
  const metadata = buildMetadata({
    title: `${localize(category.title, locale)} | ${locale === "vi" ? "Tài nguyên" : "Resources"} Robotics Sóc Sơn`,
    description: localize(category.description, locale),
    canonicalPath: `/resources/${categoryId}`,
  }, locale);
  return getArticlesByCategory(categoryId).some((article) => article.status === "ready") ? metadata : { ...metadata, robots: { index: false, follow: true } };
}

export default async function CategoryPage({ params }: Params) {
  const { locale, category: categoryId } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const category = getCategoryById(categoryId);
  if (!category || categoryId === "rules") notFound();
  const vi = locale === "vi";
  const articles = getArticlesByCategory(categoryId);
  const ready = articles.filter((article) => article.status === "ready");
  const outlines = articles.filter((article) => article.status === "soon");
  return (
    <div className="bg-background px-4 pb-20 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <Link href={localizedHref("/resources", locale)} className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden className="size-4" />{vi ? "Tất cả tài nguyên" : "All resources"}</Link>
        <header className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{localize(category.title, locale)}</h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed">{localize(category.description, locale)}</p>
        </header>
        <nav aria-label={vi ? "Chuyên mục tài nguyên" : "Resource categories"} className="mb-8 flex flex-wrap gap-2 border-y border-border py-3">
          {RESOURCE_CATEGORIES.filter((item) => item.id !== "rules").map((item) => <Link key={item.id} href={localizedHref(`/resources/${item.id}`, locale)} aria-current={item.id === categoryId ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${item.id === categoryId ? "border-primary bg-accent text-accent-foreground" : "border-border hover:bg-muted"}`}>{localize(item.title, locale)}</Link>)}
        </nav>
        {articles.length > 0 ? <>
          <ResourceSearch locale={locale} defaultCategory={categoryId} />
          {ready.length > 0 && <section className="mt-10" aria-labelledby="published-guides"><h2 id="published-guides" className="mb-3 text-xl font-semibold">{vi ? "Đọc được ngay" : "Published guides"}</h2><ul className="divide-y divide-border border-y border-border">{ready.map((article) => <li key={article.slug}><ArticleCard article={article} locale={locale} /></li>)}</ul></section>}
          {outlines.length > 0 && <section className="mt-10" aria-labelledby="guide-outlines"><h2 id="guide-outlines" className="text-xl font-semibold">{vi ? "Đang biên soạn" : "In development"}</h2><p className="mb-4 mt-2 text-sm">{vi ? "Các mục dưới đây là đề cương, chưa phải bài hướng dẫn hoàn chỉnh." : "These are outlines, not completed guides."}</p><ul className="divide-y divide-border border-y border-border">{outlines.map((article) => <li key={article.slug}><ArticleCard article={article} locale={locale} /></li>)}</ul></section>}
        </> : <section className="border-y border-border py-8"><h2 className="text-xl font-semibold">{vi ? "Đang chuẩn bị" : "Coming soon"}</h2><p className="mt-3 max-w-[65ch] leading-relaxed">{vi ? "Chuyên mục này chưa có bài viết. Bạn có thể quay lại mục lục để tra cứu Rules hoặc xem các đề cương khác." : "No guides are available here yet. Return to the directory to read Rules or explore other outlines."}</p></section>}
      </div>
    </div>
  );
}
