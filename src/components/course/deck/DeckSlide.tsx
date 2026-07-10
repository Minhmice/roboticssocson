"use client";

import Link from "next/link";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import type { DeckSlide } from "@/data/arduinoMblockDeck";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getLocalized,
  type CourseLocale,
  type LocalizedText,
} from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";

function SectionChip({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {text}
    </span>
  );
}

function SlideBullets({
  items,
  locale,
}: {
  items: LocalizedText[];
  locale: CourseLocale;
}) {
  return (
    <ul className="mt-4 max-w-3xl space-y-2 text-base leading-relaxed text-foreground md:text-lg">
      {items.map((item) => {
        const text = getLocalized(item, locale);
        return (
          <li key={text} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
            <span className="text-pretty">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function DeckMedia({
  alt,
  className,
}: {
  alt: LocalizedText;
  className?: string;
}) {
  const { locale } = useLanguage();
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border", className)}>
      <MediaPlaceholder
        type="image"
        alt={getLocalized(alt, locale)}
        className="min-h-[140px] bg-muted"
      />
    </div>
  );
}

function localizeColumn(
  col: NonNullable<DeckSlide["left"]>,
  locale: CourseLocale,
) {
  return {
    label: getLocalized(col.label, locale),
    items: col.items.map((item) => getLocalized(item, locale)),
  };
}

export function DeckSlideView({ slide }: { slide: DeckSlide }) {
  const { locale } = useLanguage();
  const title = getLocalized(slide.title, locale);
  const subtitle = slide.subtitle
    ? getLocalized(slide.subtitle, locale)
    : undefined;
  const section = slide.section
    ? getLocalized(slide.section, locale)
    : undefined;

  if (slide.layout === "title") {
    return (
      <div className="flex h-full flex-col justify-center gap-8 text-center">
        {slide.mediaAlt?.[0] ? (
          <DeckMedia alt={slide.mediaAlt[0]} className="mx-auto w-full max-w-2xl" />
        ) : null}
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (slide.layout === "section") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-accent/40 px-6 py-12 text-center md:px-12">
        {section ? <SectionChip text={section} /> : null}
        <h2 className="text-balance text-4xl font-bold text-foreground md:text-6xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-xl text-pretty text-xl text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
    );
  }

  if (slide.layout === "closing") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
        <h2 className="text-balance text-3xl font-bold text-foreground md:text-5xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-xl text-pretty text-lg text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
        {slide.mediaAlt?.[0] ? (
          <div className="w-full max-w-sm">
            <Link
              href="/course#course-register"
              className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              <DeckMedia alt={slide.mediaAlt[0]} />
            </Link>
          </div>
        ) : null}
      </div>
    );
  }

  if (slide.layout === "summary") {
    return (
      <div className="flex h-full flex-col justify-center">
        <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        {slide.bullets ? (
          <SlideBullets items={slide.bullets} locale={locale} />
        ) : null}
      </div>
    );
  }

  if (slide.layout === "two-column" && slide.left && slide.right) {
    const left = localizeColumn(slide.left, locale);
    const right = localizeColumn(slide.right, locale);
    return (
      <div className="flex h-full flex-col justify-center">
        {section ? (
          <div className="mb-3">
            <SectionChip text={section} />
          </div>
        ) : null}
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[left, right].map((col) => (
            <div
              key={col.label}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-primary">{col.label}</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground md:text-base">
                {col.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {slide.notes ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {getLocalized(slide.notes, locale)}
          </p>
        ) : null}
      </div>
    );
  }

  if (slide.layout === "grid-4" || slide.layout === "grid-3") {
    const cols = slide.layout === "grid-4" ? 4 : 3;
    const cells = slide.mediaAlt ?? [];
    return (
      <div className="flex h-full flex-col justify-center">
        {section ? (
          <div className="mb-3">
            <SectionChip text={section} />
          </div>
        ) : null}
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        <div
          className={cn(
            "mt-6 grid gap-3",
            cols === 4
              ? "grid-cols-2 md:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-3",
          )}
        >
          {cells.map((alt) => (
            <DeckMedia key={alt.vi} alt={alt} />
          ))}
        </div>
        {slide.bullets ? (
          <ul className="mt-4 grid gap-1 text-sm text-muted-foreground md:grid-cols-2">
            {slide.bullets.map((b) => (
              <li key={b.vi}>· {getLocalized(b, locale)}</li>
            ))}
          </ul>
        ) : null}
        {slide.notes ? (
          <p className="mt-4 text-sm text-muted-foreground">
            {getLocalized(slide.notes, locale)}
          </p>
        ) : null}
      </div>
    );
  }

  if (slide.layout === "diagram") {
    const lines = slide.diagram?.map((line) => getLocalized(line, locale)) ?? [];
    return (
      <div className="flex h-full flex-col justify-center">
        {section ? (
          <div className="mb-3">
            <SectionChip text={section} />
          </div>
        ) : null}
        <h2 className="text-balance text-2xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          {lines.length > 0 ? (
            <pre className="whitespace-pre-wrap rounded-xl border border-border bg-muted p-6 font-mono text-sm leading-relaxed text-foreground md:text-base">
              {lines.join("\n")}
            </pre>
          ) : null}
          {slide.mediaAlt?.[0] ? (
            <DeckMedia alt={slide.mediaAlt[0]} className="min-w-[200px]" />
          ) : null}
        </div>
      </div>
    );
  }

  if (slide.layout === "split-media") {
    return (
      <div className="flex h-full flex-col justify-center">
        {section ? (
          <div className="mb-3">
            <SectionChip text={section} />
          </div>
        ) : null}
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
              {title}
            </h2>
            {slide.bullets ? (
              <SlideBullets items={slide.bullets} locale={locale} />
            ) : null}
          </div>
          {slide.mediaAlt?.[0] ? <DeckMedia alt={slide.mediaAlt[0]} /> : null}
        </div>
      </div>
    );
  }

  if (slide.layout === "example") {
    return (
      <div className="flex h-full flex-col justify-center">
        {section ? (
          <div className="mb-3">
            <SectionChip text={section} />
          </div>
        ) : null}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
          {slide.bullets ? (
            <SlideBullets items={slide.bullets} locale={locale} />
          ) : null}
          {slide.mediaAlt?.[0] ? (
            <div className="mt-4">
              <DeckMedia alt={slide.mediaAlt[0]} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center">
      {section ? (
        <div className="mb-3">
          <SectionChip text={section} />
        </div>
      ) : null}
      <h2 className="text-balance text-2xl font-bold text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-pretty text-lg text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
      {slide.bullets ? (
        <SlideBullets items={slide.bullets} locale={locale} />
      ) : null}
      {slide.mediaAlt?.[0] ? (
        <div className="mt-6 max-w-md">
          <DeckMedia alt={slide.mediaAlt[0]} />
        </div>
      ) : null}
      {slide.notes ? (
        <p className="mt-4 text-sm text-muted-foreground">
          {getLocalized(slide.notes, locale)}
        </p>
      ) : null}
    </div>
  );
}
