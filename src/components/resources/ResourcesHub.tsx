import Link from "next/link";
import { ArrowUpRight, BookOpen, MessageCircleQuestion } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { localizedHref } from "@/lib/i18n/routes";
import { RESOURCE_ARTICLES, RESOURCE_CATEGORIES, getArticlesByCategory } from "@/data/resources";
import { GLOSSARY, LEARNING_PATHS, PREMATCH_CHECKLIST } from "@/data/resourcesHub";
import { allLite, toLite } from "@/lib/resources/lite";
import { ResourceSearch } from "./ResourceSearch";
import { ArticleLibrary, Glossary, LearningPaths, PrematchChecklist, TrendingRail } from "./HubSections";
import { Calculators } from "./Toolbox";
import { QuestionList } from "./Community";
import { HubReveal } from "./HubReveal";

const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} data-reveal className="mt-16 scroll-mt-24 border-t border-border pt-8">
      <h2 id={`${id}-h`} className="text-2xl font-bold tracking-tight">{title}</h2>
      {intro && <p className="mt-2 max-w-[65ch] leading-relaxed">{intro}</p>}
      {children}
    </section>
  );
}

export function ResourcesHub({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const categories = RESOURCE_CATEGORIES.filter((c) => c.id !== "rules");
  const ready = allLite(locale).filter((a) => !a.soon);
  const total = RESOURCE_ARTICLES.filter((a) => a.status === "ready" && a.categoryId !== "rules").length;
  const catLite = categories.map((c) => ({ id: c.id, title: localize(c.title, locale) }));
  const paths = LEARNING_PATHS.map((p) => ({
    id: p.id,
    title: localize(p.title, locale),
    blurb: localize(p.blurb, locale),
    articles: p.articles.map((a) => toLite(a, locale)),
  }));
  const checklist = PREMATCH_CHECKLIST.map((i) => ({ id: i.id, group: localize(i.group, locale), text: localize(i.text, locale) }));
  const terms = GLOSSARY.map((t) => ({ term: t.term, definition: localize(t.definition, locale) }));

  return (
    <div className="bg-background px-4 pb-24 pt-24 text-foreground selection:bg-primary/15 sm:px-6 sm:pt-28">
      <HubReveal className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{vi ? "Tài nguyên" : "Resources"}</h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed sm:text-lg">
            {vi ? `${total} bài hướng dẫn FTC và robotics do đội biên soạn, kèm lộ trình học, công cụ tính nhanh và nơi hỏi đáp với các bạn cùng mê robot.` : `${total} FTC and robotics guides written by the team, with learning paths, quick calculators and a Q&A board for fellow builders.`}
          </p>
        </header>

        <div className="mt-8">
          <ResourceSearch locale={locale} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href={localizedHref("/ftc-rules", locale)} className={`group flex min-h-11 items-start gap-4 rounded-2xl border border-border bg-muted p-5 transition-colors duration-150 hover:border-primary/40 sm:p-6 ${RING}`}>
            <BookOpen aria-hidden className="mt-1 size-6 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 className="text-xl font-semibold group-hover:text-primary">{vi ? "Sổ tay luật FTC" : "FTC Rules manual"}</h2>
              <p className="mt-2 text-sm leading-relaxed">{vi ? "Tra cứu từng điều luật, có bản dịch tiếng Việt cộng đồng." : "Look up any rule, with a Vietnamese community translation."}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{vi ? "Mở sổ tay" : "Open manual"}<ArrowUpRight aria-hidden className="size-4" /></span>
            </div>
          </Link>
          <Link href={localizedHref("/resources/community", locale)} className={`group flex min-h-11 items-start gap-4 rounded-2xl border border-border bg-muted p-5 transition-colors duration-150 hover:border-primary/40 sm:p-6 ${RING}`}>
            <MessageCircleQuestion aria-hidden className="mt-1 size-6 shrink-0 text-primary" />
            <div className="min-w-0">
              <h2 className="text-xl font-semibold group-hover:text-primary">{vi ? "Hỏi đáp robotics" : "Robotics Q&A"}</h2>
              <p className="mt-2 text-sm leading-relaxed">{vi ? "Vướng chỗ nào cứ hỏi. Đội và các bạn khác sẽ trả lời." : "Ask when you are stuck. The team and other students answer."}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">{vi ? "Vào hỏi đáp" : "Open Q&A"}<ArrowUpRight aria-hidden className="size-4" /></span>
            </div>
          </Link>
        </div>

        <Section id="trending" title={vi ? "Được đọc nhiều" : "Most read"}>
          <TrendingRail articles={ready} locale={locale} />
        </Section>

        <Section id="paths" title={vi ? "Lộ trình học" : "Learning paths"} intro={vi ? "Không biết bắt đầu từ đâu? Chọn một lộ trình, đọc theo thứ tự. Tiến độ được lưu trên thiết bị của bạn." : "Not sure where to start? Pick a path and read in order. Progress is saved on this device."}>
          <LearningPaths paths={paths} locale={locale} />
        </Section>

        <Section id="library" title={vi ? "Tất cả bài hướng dẫn" : "All guides"}>
          <ArticleLibrary articles={ready} categories={catLite} locale={locale} />
        </Section>

        <Section id="toolbox" title={vi ? "Hộp công cụ" : "Toolbox"} intro={vi ? "Hai công cụ đội dùng hằng tuần trong xưởng." : "Two tools the team uses every week in the shop."}>
          <div className="mt-6 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold">{vi ? "Tính nhanh cơ cấu" : "Mechanism calculators"}</h3>
              <Calculators locale={locale} />
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">{vi ? "Checklist trước trận" : "Pre-match checklist"}</h3>
              <PrematchChecklist items={checklist} locale={locale} />
            </div>
          </div>
        </Section>

        <Section id="community" title={vi ? "Hỏi đáp mới nhất" : "Latest from Q&A"}>
          <div className="mt-5">
            <QuestionList locale={locale} limit={5} />
            <Link href={localizedHref("/resources/community", locale)} className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary ${RING}`}>
              {vi ? "Xem tất cả và đặt câu hỏi" : "See all and ask a question"}
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Section>

        <Section id="glossary" title={vi ? "Thuật ngữ FTC" : "FTC glossary"} intro={vi ? "Nghe đàn anh nói mà chưa hiểu? Tra nhanh ở đây." : "Heard a term in the pit and missed it? Look it up here."}>
          <div className="mt-5">
            <Glossary terms={terms} locale={locale} />
          </div>
        </Section>

        <Section id="topics" title={vi ? "Theo chuyên mục" : "Browse by topic"}>
          <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.id} className="border-t border-border">
                <Link href={localizedHref(`/resources/${c.id}`, locale)} className={`group flex min-h-11 items-start justify-between gap-4 rounded-md py-4 ${RING}`}>
                  <span className="min-w-0">
                    <span className="block text-lg font-semibold group-hover:text-primary">{localize(c.title, locale)}</span>
                    <span className="mt-1 block max-w-[48ch] text-sm leading-relaxed">{localize(c.description, locale)}</span>
                    <span className="mt-2 block text-sm tabular-nums text-muted-foreground">{vi ? `${getArticlesByCategory(c.id).length} bài` : `${getArticlesByCategory(c.id).length} guides`}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="mt-1.5 size-4 shrink-0 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </HubReveal>
    </div>
  );
}
