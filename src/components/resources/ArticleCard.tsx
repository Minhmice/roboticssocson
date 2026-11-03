import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ResourceArticle } from "@/data/resources";
import type { Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";

export function ArticleCard({ article, locale }: { article: ResourceArticle; locale: Locale }) {
  const soon = article.status === "soon";
  const vi = locale === "vi";
  const topicCount = article.previewTopics?.[locale].length;
  return (
    <Link href={localizedHref(`/resources/${article.categoryId}/${article.slug}`, locale)} className="group flex min-h-11 items-start gap-4 rounded-lg border border-transparent px-3 py-5 transition-colors hover:border-border hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{soon ? (vi ? "Đề cương · Đang cập nhật" : "Outline · Coming soon") : (vi ? "Đã xuất bản" : "Published")}</span>
          {topicCount !== undefined && <span>{vi ? `${topicCount} chủ đề` : `${topicCount} topics`}</span>}
        </div>
        <h3 className="mt-1 text-lg font-semibold group-hover:text-primary">{localize(article.title, locale)}</h3>
        <p className="mt-2 max-w-[70ch] text-sm leading-relaxed">{localize(article.summary, locale)}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.slice(0, 4).map((tag) => <span key={tag} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">{tag}</span>)}
        </div>
        <span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary">{soon ? (vi ? "Xem đề cương" : "View outline") : (vi ? "Đọc bài viết" : "Read guide")}</span>
      </div>
      <ArrowUpRight aria-hidden className="mt-7 size-4 shrink-0 text-primary" />
    </Link>
  );
}
