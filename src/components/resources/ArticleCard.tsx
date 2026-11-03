import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ResourceArticle } from "@/data/resources";
import type { Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";
import { articleKey } from "@/lib/resources/keys";
import { fallbackCover } from "@/lib/resources/covers";
import { articleCover } from "@/lib/resources/lite";
import { CoverImage } from "./CoverImage";
import { StatLine } from "./ResourceStats";

export function ArticleCard({ article, locale }: { article: ResourceArticle; locale: Locale }) {
  const soon = article.status === "soon";
  const vi = locale === "vi";
  const title = localize(article.title, locale);

  return (
    <Link
      href={localizedHref(`/resources/${article.categoryId}/${article.slug}`, locale)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
        <CoverImage src={articleCover(article)} fallback={fallbackCover(article.categoryId)} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        <div className="absolute left-3 top-3">
          <span className="rounded-md bg-background/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-xs">
            {soon ? (vi ? "Đề cương" : "Outline") : (vi ? "Bài viết" : "Guide")}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{localize(article.summary, locale)}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">#{tag}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
          {!soon ? <StatLine k={articleKey(article.categoryId, article.slug)} locale={locale} /> : <span>{vi ? "Đang cập nhật" : "Coming soon"}</span>}
          <span className="inline-flex items-center gap-1 font-semibold text-primary transition-transform group-hover:translate-x-0.5">
            {soon ? (vi ? "Chi tiết" : "Outline") : (vi ? "Đọc" : "Read")}
            <ArrowUpRight aria-hidden className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
