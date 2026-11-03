import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RESOURCE_CATEGORIES } from "@/data/resources";
import { isSupportedLocale, type Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { AskForm, QuestionList } from "@/components/resources/Community";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const vi = locale === "vi";
  return buildMetadata(
    {
      title: vi ? "Hỏi đáp Robotics & FTC | Robotics Sóc Sơn" : "Robotics & FTC Q&A | Robotics Sóc Sơn",
      description: vi ? "Đặt câu hỏi về chế tạo, điện, lập trình và thi đấu FTC. Đội Robotics Sóc Sơn và các bạn cùng trả lời." : "Ask about FTC building, electronics, programming and competition. The Robotics Sóc Sơn team and other students answer.",
      canonicalPath: "/resources/community",
    },
    locale as Locale,
  );
}

export default async function CommunityPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isSupportedLocale(raw)) notFound();
  const locale = raw as Locale;
  const vi = locale === "vi";
  const categories = [
    ...RESOURCE_CATEGORIES.filter((c) => c.id !== "rules").map((c) => ({ id: c.id, title: localize(c.title, locale) })),
    { id: "other", title: vi ? "Khác" : "Other" },
  ];
  return (
    <div className="bg-background px-4 pb-20 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <Link href={localizedHref("/resources", locale)} className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowLeft aria-hidden className="size-4" />{vi ? "Tất cả tài nguyên" : "All resources"}</Link>
        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{vi ? "Hỏi đáp robotics" : "Robotics Q&A"}</h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed">{vi ? "Vướng ở khâu chế tạo, đi dây hay code? Đặt câu hỏi, đọc lời giải của người khác và chia sẻ điều bạn đã học được." : "Stuck on a build, a wiring job or a bug? Ask, read other people's fixes and share what you have learned."}</p>
        </header>
        <div className="grid gap-12 lg:grid-cols-[1fr_26rem]">
          <section aria-labelledby="latest-q">
            <h2 id="latest-q" className="mb-4 text-xl font-semibold">{vi ? "Câu hỏi mới nhất" : "Latest questions"}</h2>
            <QuestionList locale={locale} limit={30} />
          </section>
          <section aria-labelledby="ask-q" className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="ask-q" className="mb-4 text-xl font-semibold">{vi ? "Đặt câu hỏi" : "Ask a question"}</h2>
            <AskForm locale={locale} categories={categories} />
          </section>
        </div>
      </div>
    </div>
  );
}
