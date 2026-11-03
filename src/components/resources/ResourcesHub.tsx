import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";
import { RESOURCE_CATEGORIES, getArticlesByCategory } from "@/data/resources";
import { ResourceSearch } from "./ResourceSearch";
import { ArticleCard } from "./ArticleCard";

export function ResourcesHub({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const categories = RESOURCE_CATEGORIES.filter((category) => category.id !== "rules");
  const count = categories.reduce((total, category) => total + getArticlesByCategory(category.id).length, 0);
  return (
    <div className="bg-background px-4 pb-20 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{vi ? "Tài nguyên" : "Resources"}</h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed sm:text-lg">{vi ? "Mục lục kiến thức FTC và robotics từ Robotics Sóc Sơn. Tra cứu Rules, đọc bài đã xuất bản hoặc xem các đề cương đang được cập nhật." : "FTC and robotics knowledge from Robotics Sóc Sơn. Look up Rules, read published guides, or browse outlines still being developed."}</p>
          <p className="mt-4 text-sm font-medium">{vi ? `Sổ tay Rules · ${count} tài liệu trong mục lục` : `Rules manual · ${count} guides in the directory`}</p>
        </header>
        <ResourceSearch locale={locale} />
        <section aria-labelledby="available-resources" className="mt-12 border-t border-border pt-7">
          <h2 id="available-resources" className="mb-4 text-xl font-semibold">{vi ? "Đọc được ngay" : "Available now"}</h2>
          <Link href={localizedHref("/ftc-rules", locale)} className="group flex min-h-11 items-start gap-4 rounded-2xl border border-border bg-muted p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6">
            <BookOpen aria-hidden className="mt-1 size-6 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-semibold group-hover:text-primary">Rules</h3>
              <p className="mt-2 max-w-[70ch] leading-relaxed">{localize(RESOURCE_CATEGORIES[0].description, locale)}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">{vi ? "Mở sổ tay" : "Open manual"}<ArrowUpRight aria-hidden className="size-4" /></span>
            </div>
          </Link>
        </section>
        <section aria-labelledby="resource-directory" className="mt-12">
          <h2 id="resource-directory" className="text-2xl font-semibold">{vi ? "Mục lục chuyên đề" : "Topic directory"}</h2>
          {categories.map((category, index) => {
            const articles = getArticlesByCategory(category.id);
            return <section key={category.id} aria-labelledby={`category-${category.id}`} className="mt-9 border-t border-border pt-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 id={`category-${category.id}`} className="text-xl font-semibold"><span className="mr-3 text-sm tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{localize(category.title, locale)}</h3>
                  <p className="mt-2 max-w-[65ch] leading-relaxed">{localize(category.description, locale)}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{vi ? `${articles.length} tài liệu` : `${articles.length} guides`}</p>
                </div>
                {articles.length > 0 && <Link href={localizedHref(`/resources/${category.id}`, locale)} className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Xem chuyên mục" : "View category"}<ArrowUpRight aria-hidden className="size-4" /></Link>}
              </div>
              {articles.length > 0 ? <ul className="mt-4 divide-y divide-border border-y border-border">{articles.map((article) => <li key={article.slug}><ArticleCard article={article} locale={locale} /></li>)}</ul> : <Link href={localizedHref("/ftc-rules", locale)} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">{vi ? "Trong lúc chờ, mở sổ tay Rules" : "Explore the Rules manual while you wait"}</Link>}
            </section>;
          })}
        </section>
      </div>
    </div>
  );
}
