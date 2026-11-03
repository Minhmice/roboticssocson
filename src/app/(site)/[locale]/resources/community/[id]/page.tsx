import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isSupportedLocale, type Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getQuestion } from "@/lib/resources/db";
import { categoryLabel } from "@/lib/resources/format";
import { Comments } from "@/components/resources/Comments";
import { LikeButton, ViewTracker, StatLine } from "@/components/resources/ResourceStats";

// Questions are created at runtime, so this page is rendered per request.
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ locale: string; id: string }> };

function load(id: string) {
  return /^\d{1,9}$/.test(id) ? getQuestion(Number(id)) : undefined;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const q = load(id);
  if (!q) notFound();
  return { ...buildMetadata({ title: `${q.title} | Robotics Sóc Sơn`, description: q.body.slice(0, 160), canonicalPath: `/resources/community/${id}` }, locale as Locale), robots: { index: false, follow: true } };
}

export default async function QuestionPage({ params }: Params) {
  const { locale: raw, id } = await params;
  if (!isSupportedLocale(raw)) notFound();
  const locale = raw as Locale;
  const q = load(id);
  if (!q) notFound();
  const vi = locale === "vi";
  const key = `q/${q.id}`;
  return (
    <article className="bg-background px-4 pb-20 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <ViewTracker k={key} />
      <div className="mx-auto max-w-3xl">
        <Link href={localizedHref("/resources/community", locale)} className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden className="size-4" />{vi ? "Tất cả câu hỏi" : "All questions"}</Link>
        <header className="border-b border-border pb-6">
          <p className="text-sm text-muted-foreground">{categoryLabel(q.categoryId, locale)}</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{q.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{q.author} · <time dateTime={new Date(q.createdAt).toISOString()}>{new Intl.DateTimeFormat(vi ? "vi-VN" : "en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(q.createdAt)}</time></p>
        </header>
        <p className="mt-6 max-w-[70ch] whitespace-pre-wrap break-words leading-relaxed">{q.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <LikeButton k={key} locale={locale} />
          <StatLine k={key} locale={locale} className="text-sm text-muted-foreground" />
        </div>
        <Comments thread={key} locale={locale} answers />
      </div>
    </article>
  );
}
