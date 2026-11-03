import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProfileNavigation from "./ProfileNavigation";
import {
  PROFILE_EMAIL,
  PROFILE_UPDATED,
  profileMeta,
  profileSections,
  profileSeo,
  type ProfileBlock,
  type ProfileSection,
} from "@/data/profile";
import { isSupportedLocale, type Locale } from "@/lib/i18n/locales";
import { localize } from "@/lib/i18n/localized";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateProfileMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return buildMetadata(profileSeo[locale], locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return generateProfileMetadata({ params });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  const title = localize(profileMeta.title, locale);
  const lead = localize(profileMeta.lead, locale);
  const updatedLabel = localize(profileMeta.updated, locale);
  const tocLabel = localize(profileMeta.toc, locale);

  return (
    <main
      id="profile-top"
      className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 sm:py-10 lg:px-8 print:px-0 print:py-0"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-7 space-y-4 border-b border-border pb-6 print:mb-6 print:pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground sm:text-sm">
            <span>Robotics Sóc Sơn</span>
            <span>
              {updatedLabel}: {PROFILE_UPDATED}
            </span>
          </div>
          <h1 className="max-w-[22ch] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-[72ch] text-base leading-8 text-foreground/90 sm:text-lg">
            {lead}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground print:hidden">
            <a href={`mailto:${PROFILE_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {PROFILE_EMAIL}
            </a>
            <span aria-hidden="true">•</span>
            <span className="italic">
              {locale === "vi" ? "Ctrl+P để lưu thành PDF" : "Press Ctrl+P to save as PDF"}
            </span>
          </div>
        </header>

        <section
          aria-label={locale === "vi" ? "Tóm tắt hồ sơ" : "Profile summary"}
          className="mb-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 print:hidden"
        >
          {[
            {
              label: locale === "vi" ? "Mục tiêu mùa giải" : "Season target",
              value: "33.975.000 VNĐ",
            },
            {
              label: locale === "vi" ? "Nội dung" : "Contents",
              value: locale === "vi" ? "10 phần rõ ràng" : "10 clear sections",
            },
            {
              label: locale === "vi" ? "Liên hệ" : "Contact",
              value: PROFILE_EMAIL,
            },
          ].map((item) => (
            <div key={item.label} className="bg-card px-4 py-4 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p>
              <p className="mt-1 break-words text-sm font-semibold leading-snug text-foreground">{item.value}</p>
            </div>
          ))}
        </section>

        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <ProfileNavigation sections={profileSections} locale={locale} label={tocLabel} />

          <article className="min-w-0 space-y-8">
            {profileSections.map((section) => (
              <SectionView key={section.id} section={section} locale={locale} tocLabel={tocLabel} />
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}


function RenderBlock({ block, locale }: { block: ProfileBlock; locale: Locale }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
          {localize(block.text, locale)}
        </p>
      );
    case "h":
      return (
        <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight pt-2">
          {localize(block.text, locale)}
        </h3>
      );
    case "list":
      return (
        <ul className="list-disc list-outside pl-5 space-y-1.5 text-base sm:text-lg text-foreground/90 marker:text-muted-foreground">
          {localize(block.items, locale).map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div className="rounded-lg border border-border/80 bg-muted/40 px-4 py-3 text-sm sm:text-base text-foreground/80 leading-relaxed print:bg-transparent print:border-muted">
          <span className="font-medium text-foreground">
            {locale === "vi" ? "Ghi chú: " : "Note: "}
          </span>
          {localize(block.text, locale)}
        </div>
      );
    case "table": {
      const head = localize(block.head, locale);
      const rows = localize(block.rows, locale);
      return (
        <>
          <div className="space-y-3 md:hidden print:hidden">
            {rows.map((row, rIdx) => (
              <dl key={rIdx} className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                {row.map((cell, cIdx) => (
                  <div
                    key={cIdx}
                    className={`${cIdx > 0 ? "mt-3 border-t border-border pt-3" : ""} grid grid-cols-[minmax(7rem,38%)_1fr] gap-3 text-sm`}
                  >
                    <dt className="font-semibold leading-snug text-muted-foreground">{head[cIdx]}</dt>
                    <dd className="min-w-0 break-words leading-relaxed text-foreground">{cell || "—"}</dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block print:block">
            <table className="w-full min-w-[560px] text-left text-sm lg:text-base border-collapse border border-border">
              <thead className="bg-muted/60 print:bg-transparent">
                <tr>
                  {head.map((col, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="border border-border px-3 py-2 sm:px-4 sm:py-2.5 font-semibold text-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={rIdx % 2 === 1 ? "bg-muted/20 print:bg-transparent" : undefined}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="border border-border px-3 py-2 sm:px-4 sm:py-2.5 text-foreground/90 align-top leading-snug"
                      >
                        {cell || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
    case "image":
      return (
        <figure className="my-3 space-y-2 print:break-inside-avoid">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted/30">
            <Image
              src={block.src}
              alt={localize(block.alt, locale)}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="text-xs sm:text-sm text-muted-foreground italic">
            {localize(block.caption, locale)}
          </figcaption>
        </figure>
      );
  }
}

function SectionView({
  section,
  locale,
  tocLabel,
}: {
  section: ProfileSection;
  locale: Locale;
  tocLabel: string;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 space-y-4 border-t border-border/60 pt-8 first:border-t-0 first:pt-0 print:break-inside-avoid print:border-t print:pt-4"
    >
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {localize(section.title, locale)}
      </h2>
      <div className="max-w-[72ch] space-y-4">
        {section.blocks.map((block, idx) => (
          <RenderBlock key={idx} block={block} locale={locale} />
        ))}
      </div>
      <a
        href="#profile-top"
        className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 print:hidden"
      >
        {locale === "vi" ? `↑ Về ${tocLabel.toLowerCase()}` : `↑ Back to ${tocLabel.toLowerCase()}`}
      </a>
    </section>
  );
}

