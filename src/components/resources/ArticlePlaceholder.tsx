import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ResourceArticle, ResourceCategory } from "@/data/resources";
import type { Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";

export function ArticlePlaceholder({ article, category, locale, siblingArticles = [] }: {
  article: ResourceArticle;
  category: ResourceCategory;
  locale: Locale;
  siblingArticles?: readonly ResourceArticle[];
}) {
  const vi = locale === "vi";
  const siblings = siblingArticles.filter((other) => other.slug !== article.slug);
  return (
    <article className="bg-background px-4 pb-20 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <nav aria-label={vi ? "Đường dẫn" : "Breadcrumb"} className="mb-6 flex flex-wrap items-center gap-x-2 text-sm">
          <Link href={localizedHref("/resources", locale)} className="inline-flex min-h-11 items-center rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Tài nguyên" : "Resources"}</Link>
          <span aria-hidden>/</span>
          <Link href={localizedHref(`/resources/${category.id}`, locale)} className="inline-flex min-h-11 items-center rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{localize(category.title, locale)}</Link>
        </nav>
        <header className="border-b border-border pb-7">
          <p className="mb-3 text-sm font-medium text-muted-foreground">{vi ? "Đề cương · Đang cập nhật" : "Outline · Coming soon"}</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">{localize(article.title, locale)}</h1>
          <p className="mt-4 max-w-[70ch] text-base leading-relaxed">{localize(article.summary, locale)}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>{vi ? "Cập nhật đề cương: " : "Outline updated: "}<time dateTime={article.lastUpdated}>{new Intl.DateTimeFormat(vi ? "vi-VN" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${article.lastUpdated}T00:00:00Z`))}</time></span>
            <span>{article.previewTopics?.[locale].length ?? 0} {vi ? "chủ đề dự kiến" : "planned topics"}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>)}</div>
        </header>
        <section aria-labelledby="outline-status" className="my-8 rounded-xl border border-border bg-muted p-5">
          <h2 id="outline-status" className="text-lg font-semibold">{vi ? "Bài hướng dẫn chưa được xuất bản" : "This guide is not published yet"}</h2>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed">{vi ? "Đây là đề cương dự kiến, chưa phải hướng dẫn để đấu nối, chế tạo hoặc thi đấu. Trong lúc chờ nội dung hoàn chỉnh, bạn có thể tra cứu sổ tay Rules." : "This is a planned outline, not instructions for wiring, fabrication or competition. While the guide is being prepared, you can consult the Rules manual."}</p>
          <Link href={localizedHref("/ftc-rules", locale)} className="mt-3 inline-flex min-h-11 items-center rounded-sm font-semibold text-primary underline-offset-4 hover:underline">{vi ? "Mở Rules" : "Open Rules"}</Link>
        </section>
        {article.previewTopics && <section aria-labelledby="planned-topics"><h2 id="planned-topics" className="text-xl font-semibold">{vi ? "Nội dung dự kiến" : "Planned topics"}</h2><ol className="mt-4 divide-y divide-border border-y border-border">{localize(article.previewTopics, locale).map((topic, index) => <li key={topic} className="flex gap-4 py-4"><span className="shrink-0 text-sm tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><span className="leading-relaxed">{topic}</span></li>)}</ol></section>}
        {siblings.length > 0 && <section aria-labelledby="related-outlines" className="mt-10 border-t border-border pt-6"><h2 id="related-outlines" className="text-xl font-semibold">{vi ? "Cùng chuyên mục" : "In this category"}</h2><ul className="mt-3 divide-y divide-border border-y border-border">{siblings.map((other) => <li key={other.slug}><Link href={localizedHref(`/resources/${other.categoryId}/${other.slug}`, locale)} className="flex min-h-11 items-center rounded-sm py-3 text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{localize(other.title, locale)}</Link></li>)}</ul></section>}
        <Link href={localizedHref(`/resources/${category.id}`, locale)} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden className="size-4" />{vi ? "Về mục lục chuyên đề" : "Back to topic directory"}</Link>
      </div>
    </article>
  );
}
