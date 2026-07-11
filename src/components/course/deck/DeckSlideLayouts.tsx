"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeftRight, ArrowRight, Blocks, Bot, Bug, Cable, Code2, Cog, Cpu, LockOpen, Mic, Monitor, ScanEye, Sparkles, Trophy, Zap } from "lucide-react";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { DeckEditorialSlide } from "@/components/course/deck/DeckEditorialSlide";
import { DeckSectionChapterSlide } from "@/components/course/deck/DeckSectionChapterSlide";
import { DeckSectionSlide } from "@/components/course/deck/DeckSectionSlide";
import { DeckTitleSlide } from "@/components/course/deck/DeckTitleSlide";
import {
  deckCompareConnectorVariants,
  deckCompareImageVariants,
  deckComparePanelVariants,
  deckDualStackImageVariants,
  deckEditorialImageLeftVariants,
  deckImageReveal,
  deckLogicBlockVariants,
  deckLoopStepVariants,
  deckOutcomeChipVariants,
  deckOverdriveConnectorPulseTransition,
  deckOverdriveHeroDriftTransition,
  deckPartIntroImageVariants,
  deckRevealStagger,
  deckRevealTransform,
  deckShowcaseBandVariants,
  deckTeachingImageReveal,
  deckTeachingIntroReveal,
  deckTeachingPillReveal,
  deckTeachingRuleReveal,
} from "@/components/course/deck/deck-motion";
import { deckBulletList, deckType } from "@/components/course/deck/deck-typography";
import type { DeckSlide, DeckSlideLayout } from "@/data/arduinoMblockDeck";
import { domain } from "@/data/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getLocalized,
  type CourseLocale,
  type LocalizedText,
} from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";

export type LayoutRenderContext = {
  slide: DeckSlide;
  layout: DeckSlideLayout;
  title: string;
  subtitle?: string;
  section?: string;
  sectionPartIndex?: number;
  locale: CourseLocale;
  mediaSources: string[];
};

const INSET = "px-5 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8";

function Shell({
  children,
  className,
  accentSide = "right",
}: {
  children: React.ReactNode;
  className?: string;
  accentSide?: "left" | "right";
}) {
  return (
    <div className={cn("relative h-full min-h-0 w-full overflow-hidden bg-background text-foreground", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          accentSide === "right"
            ? "bg-[radial-gradient(ellipse_90%_80%_at_100%_0%,rgba(37,99,235,0.06),transparent_55%)]"
            : "bg-[radial-gradient(ellipse_90%_80%_at_0%_0%,rgba(37,99,235,0.06),transparent_55%)]",
        )}
        aria-hidden
      />
      <div className={cn("relative flex h-full min-h-0 flex-col", INSET)}>{children}</div>
    </div>
  );
}

function Chip({ text }: { text: string }) {
  return <span className={deckType.chip}>{text}</span>;
}

function Header({ section, title, subtitle, size = "heading" }: { section?: string; title: string; subtitle?: string; size?: "title" | "heading" }) {
  return (
    <>
      {section ? (
        <div className="mb-2" data-deck-enter="chip">
          <Chip text={section} />
        </div>
      ) : null}
      <h2 className={size === "title" ? deckType.title : deckType.heading} data-deck-enter="headline">
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-2", deckType.subhead)} data-deck-enter="subhead">
          {subtitle}
        </p>
      ) : null}
    </>
  );
}

function Bullets({ items, locale, large = true }: { items: LocalizedText[]; locale: CourseLocale; large?: boolean }) {
  return (
    <ul className={deckBulletList(large)}>
      {items.map((item) => {
        const text = getLocalized(item, locale);
        return (
          <li key={text} className="flex gap-3" data-deck-enter="item">
            <span className="mt-3 size-2 shrink-0 rounded-full bg-primary" />
            <span className="text-pretty">{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function SlideImage({
  src,
  alt,
  className,
  bleed,
  sizes = "(max-width: 768px) 90vw, 42vw",
}: {
  src?: string;
  alt: LocalizedText;
  className?: string;
  bleed?: boolean;
  sizes?: string;
}) {
  const { locale } = useLanguage();
  const label = getLocalized(alt, locale);
  if (!src) {
    return (
      <div className={cn("flex min-h-[120px] items-center justify-center rounded-xl border border-border bg-muted/40", className)}>
        <span className={deckType.caption}>{label}</span>
      </div>
    );
  }
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border border-border shadow-sm", bleed ? "h-full min-h-0" : "aspect-[4/3] min-h-[140px] md:min-h-[180px]", className)}
      data-deck-enter="media"
    >
      <MediaPlaceholder type="image" src={src} alt={label} className="h-full min-h-full bg-muted" sizes={sizes} />
    </div>
  );
}

function localizeColumn(col: NonNullable<DeckSlide["left"]>, locale: CourseLocale) {
  return {
    label: getLocalized(col.label, locale),
    items: col.items.map((i) => getLocalized(i, locale)),
  };
}

function altOf(slide: DeckSlide, i = 0): LocalizedText {
  return slide.mediaAlt?.[i] ?? { vi: "Hình minh họa", en: "Illustration" };
}

function BridgeCompareLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  if (!slide.left || !slide.right) return null;
  const left = localizeColumn(slide.left, locale);
  const right = localizeColumn(slide.right, locale);
  const notes = slide.notes ? getLocalized(slide.notes, locale) : undefined;
  const imgA = mediaSources[0];
  const imgB = mediaSources[1] ?? mediaSources[0];

  return (
    <Shell>
      <div className="flex h-full min-h-0 flex-col gap-4 md:gap-5">
        <div>
          <Header section={section} title={title} size="title" />
          {notes ? (
            <p className={cn("mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3", deckType.bodyLg)}>
              {notes}
            </p>
          ) : null}
        </div>

        <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <div
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5"
            data-deck-enter="card"
          >
            <div className="flex items-center gap-2">
              <Blocks className="size-6 text-primary md:size-7" strokeWidth={1.75} />
              <p className={deckType.label}>{left.label}</p>
            </div>
            <SlideImage src={imgA} alt={altOf(slide, 0)} className="min-h-[100px] flex-1 md:min-h-[120px]" bleed />
            <ul className={deckBulletList(true)}>
              {left.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="size-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span className="font-semibold text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 px-1 py-2 md:px-3"
            data-deck-enter="connector"
          >
            <div className="flex size-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary md:size-[4.5rem]">
              <ArrowRight className="size-8 md:size-9" strokeWidth={2} />
            </div>
            <p className="text-center font-mono text-base font-semibold text-primary md:text-lg">mBlock → C++</p>
          </div>

          <div
            className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-accent/30 p-4 shadow-sm md:p-5"
            data-deck-enter="card"
          >
            <div className="flex items-center gap-2">
              <Code2 className="size-7 text-primary md:size-8" strokeWidth={1.75} />
              <p className={deckType.label}>{right.label}</p>
            </div>
            <SlideImage src={imgB} alt={altOf(slide, 1)} className="min-h-[100px] flex-1 md:min-h-[120px]" bleed />
            <ul className={deckBulletList(true)}>
              {right.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="size-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span className="font-semibold text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function highlightCppBridgeTitle(title: string, locale: CourseLocale): React.ReactNode {
  const cppNeedle = "C++";
  const cppIdx = title.indexOf(cppNeedle);
  if (locale === "vi") {
    const leadNeedle = "Cầu nối lên";
    if (title.startsWith(leadNeedle) && cppIdx !== -1) {
      const tail = title.slice(cppIdx + cppNeedle.length).trim();
      return (
        <span className="flex flex-col gap-0.5 md:gap-1">
          <span className="block text-[0.68em] font-bold leading-[1.1] tracking-[-0.03em] text-foreground/88">
            {leadNeedle}
          </span>
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-mono text-[1.08em] font-extrabold tracking-[-0.04em] text-primary">{cppNeedle}</span>
            {tail ? (
              <span className="text-[0.92em] font-extrabold tracking-[-0.03em] text-foreground">{tail}</span>
            ) : null}
          </span>
        </span>
      );
    }
  }
  if (cppIdx !== -1) {
    return (
      <>
        {title.slice(0, cppIdx)}
        <span className="font-mono text-primary">{cppNeedle}</span>
        {title.slice(cppIdx + cppNeedle.length)}
      </>
    );
  }
  if (locale === "vi") {
    const needle = "chuyên nghiệp";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  return title;
}

/** Slide 18 — mBlock → C++ bridge: dual panels, pulsing connector, hero C++ side */
function BridgeToCppLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  if (!slide.left || !slide.right) return null;
  const left = localizeColumn(slide.left, locale);
  const right = localizeColumn(slide.right, locale);
  const notes = slide.notes ? getLocalized(slide.notes, locale) : undefined;
  const imgA = mediaSources[0];
  const imgB = mediaSources[1] ?? mediaSources[0];
  const headerOffset = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const bandVariants = reduced ? deckRevealTransform : deckShowcaseBandVariants;

  const panels = [
    {
      col: left,
      side: "left" as const,
      icon: Blocks,
      tone: "border-primary/38 bg-primary/[0.07]",
      iconTone: "border-primary/35 bg-primary/14 text-primary",
      img: imgA,
      imgIndex: 0,
      hero: false,
    },
    {
      col: right,
      side: "right" as const,
      icon: Code2,
      tone: "border-primary/52 bg-primary/[0.12] shadow-[0_14px_44px_rgba(37,99,235,0.16)] ring-2 ring-primary/28",
      iconTone: "border-primary/45 bg-primary/18 text-primary",
      img: imgB,
      imgIndex: 1,
      hero: true,
    },
  ];

  return (
    <Shell>
      <div className="flex h-full min-h-0 flex-col gap-2.5 md:gap-3">
        <div className="shrink-0">
          {section ? (
            <motion.div
              className="mb-1.5 md:mb-2"
              custom={0}
              variants={introVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <Chip text={section} />
            </motion.div>
          ) : null}
          <motion.h2
            className={cn(
              deckType.heading,
              "max-w-[16ch] text-balance text-[clamp(1.875rem,4.4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]",
            )}
            custom={section ? 1 : 0}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {highlightCppBridgeTitle(title, locale)}
          </motion.h2>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[1fr_auto] gap-2.5 md:gap-3">
          <div className="grid min-h-0 gap-2.5 md:grid-cols-[minmax(0,0.94fr)_auto_minmax(0,1.06fr)] md:items-stretch md:gap-3.5">
            {panels.map(({ col, side, icon: Icon, tone, iconTone, img, imgIndex, hero }, panelIndex) => {
              const panel = (
                <motion.div
                  key={col.label}
                  className={cn(
                    "flex min-h-0 flex-col gap-2.5 rounded-2xl border-2 p-3.5 shadow-lg md:gap-3 md:p-4",
                    tone,
                    panelIndex === 1 && "md:order-3",
                  )}
                  custom={panelIndex}
                  variants={deckComparePanelVariants(side, reduced)}
                  initial={reduced ? false : "hidden"}
                  animate="show"
                >
                  <div className="flex items-center gap-2.5 border-b border-border/55 pb-2.5 md:gap-3 md:pb-3">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl border-2 md:size-11",
                        iconTone,
                      )}
                    >
                      <Icon className="size-5 md:size-6" strokeWidth={2.15} />
                    </span>
                    <p
                      className={cn(
                        "text-pretty text-[clamp(1.125rem,2.2vw,1.625rem)] font-extrabold leading-tight tracking-[-0.03em]",
                        hero ? "text-primary" : "text-foreground",
                      )}
                    >
                      {col.label}
                    </p>
                  </div>

                  {img ? (
                    <motion.div
                      className="min-h-[88px] flex-1 md:min-h-[100px]"
                      custom={headerOffset + panelIndex}
                      variants={deckCompareImageVariants}
                      initial={reduced ? false : "hidden"}
                      animate="show"
                    >
                      <SlideImage
                        src={img}
                        alt={altOf(slide, imgIndex)}
                        bleed
                        className="h-full min-h-[88px] md:min-h-[100px]"
                        sizes="(max-width: 768px) 44vw, 22vw"
                      />
                    </motion.div>
                  ) : null}

                  <ul className={cn(deckBulletList(true), "mt-0 shrink-0 space-y-1.5 md:space-y-2")}>
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 shrink-0 rounded-full",
                            hero ? "bg-primary" : "bg-primary/70",
                          )}
                          aria-hidden
                        />
                        <span className={cn("text-pretty", hero ? "font-bold" : "font-semibold")}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );

              if (panelIndex === 0) {
                return (
                  <div key={col.label} className="contents">
                    {panel}
                    <motion.div
                      className="order-2 flex flex-row items-center justify-center gap-2 py-0.5 md:flex-col md:gap-2 md:px-1.5 md:py-0"
                      custom={headerOffset}
                      variants={deckCompareConnectorVariants}
                      initial={reduced ? false : "hidden"}
                      animate="show"
                    >
                      <span className="hidden h-12 w-px bg-border/80 md:block" aria-hidden />
                      <div className="relative flex size-12 shrink-0 items-center justify-center md:size-14">
                        {!reduced ? (
                          <motion.span
                            className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/35"
                            animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
                            transition={deckOverdriveConnectorPulseTransition}
                            aria-hidden
                          />
                        ) : null}
                        <motion.div
                          className="relative flex size-12 items-center justify-center rounded-full border-2 border-primary/60 bg-background shadow-[0_8px_28px_rgba(37,99,235,0.18)] md:size-14"
                          animate={reduced ? undefined : { scale: [1, 1.07, 1] }}
                          transition={deckOverdriveConnectorPulseTransition}
                        >
                          <ArrowRight className="size-6 text-primary md:size-7" strokeWidth={2.4} />
                        </motion.div>
                      </div>
                      <p className="text-center font-mono text-sm font-extrabold tracking-[0.06em] text-primary md:text-base">
                        mBlock → C++
                      </p>
                      <span className="hidden h-12 w-px bg-border/80 md:block" aria-hidden />
                    </motion.div>
                  </div>
                );
              }

              return panel;
            })}
          </div>

          {notes ? (
            <motion.div
              className={cn(
                "shrink-0 rounded-xl border-2 border-primary/42 bg-primary/12 px-4 py-2.5 text-center md:px-5 md:py-3",
                "shadow-[0_8px_28px_rgba(37,99,235,0.12)]",
              )}
              custom={section ? 3 : 2}
              variants={bandVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <p className={cn(deckType.bodyLg, "font-extrabold text-balance leading-snug text-foreground")}>
                {notes}
              </p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}

function EditorialLayout({ ctx, imageSide }: { ctx: LayoutRenderContext; imageSide: "left" | "right" }) {
  const isSlide3 = ctx.slide.id === 3;
  const isSlide4 = ctx.slide.id === 4;
  return (
    <Shell
      className={
        isSlide3
          ? "[&>div]:md:px-11 [&>div]:lg:px-14"
          : isSlide4
            ? "[&>div]:px-14 [&>div]:py-14 md:[&>div]:px-16 md:[&>div]:py-16"
            : undefined
      }
    >
      <DeckEditorialSlide ctx={ctx} imageSide={imageSide} />
    </Shell>
  );
}

function sectionImageAlt(ctx: LayoutRenderContext, index = 0): LocalizedText {
  return (
    ctx.slide.mediaAlt?.[index] ?? {
      vi: "Hình minh họa trình chiếu",
      en: "Presentation illustration",
    }
  );
}

function SectionImageBottom({ ctx, variant }: { ctx: LayoutRenderContext; variant: "split" | "band" | "wide" | "compact" | "emotive" }) {
  const { slide, title, subtitle, section, sectionPartIndex, mediaSources, locale } = ctx;
  const imageAlt = getLocalized(sectionImageAlt(ctx), locale);
  if (slide.id === 8 && variant === "wide") {
    return (
      <DeckSectionChapterSlide
        section={section}
        title={title}
        subtitle={subtitle}
        slideNumber={slide.id}
        imageSrc={mediaSources[0]}
        imageAlt={imageAlt}
      />
    );
  }
  if (variant === "split") {
    return (
      <DeckSectionSlide
        section={section}
        title={title}
        subtitle={subtitle}
        sectionIndex={sectionPartIndex}
        imageSrc={mediaSources[0]}
        imageAlt={imageAlt}
      />
    );
  }
  if (variant === "emotive") {
    return (
      <div className="relative grid h-full min-h-0 grid-rows-[1fr_auto] overflow-hidden bg-background">
        {mediaSources[0] ? (
          <>
            <Image src={mediaSources[0]} alt={imageAlt} fill className="object-cover object-center opacity-25" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </>
        ) : null}
        <div className="relative flex flex-col items-center justify-center px-8 text-center">
          {section ? <Chip text={section} /> : null}
          <h2 className={cn("mt-4 max-w-[14ch]", deckType.display)}>{title}</h2>
          {subtitle ? <p className={cn("mt-4 max-w-[28ch]", deckType.subhead)}>{subtitle}</p> : null}
        </div>
        <div className="relative h-[28%] min-h-[100px] border-t border-border">
          {mediaSources[0] ? <Image src={mediaSources[0]} alt={imageAlt} fill className="object-cover" sizes="100vw" /> : null}
        </div>
      </div>
    );
  }
  const imageH = variant === "wide" ? "h-[52%]" : variant === "band" ? "h-[32%]" : "h-[38%]";
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-accent/30">
      <div className={cn("flex flex-1 flex-col justify-center px-8 py-6 text-center md:px-12", variant === "compact" && "py-4")}>
        {section ? <Chip text={section} /> : null}
        <h2 className={cn("mx-auto mt-3 max-w-[14ch]", variant === "compact" ? deckType.heading : deckType.display)}>{title}</h2>
        {subtitle ? <p className={cn("mx-auto mt-3 max-w-[28ch]", deckType.subhead)}>{subtitle}</p> : null}
      </div>
      {mediaSources[0] ? (
        <div className={cn("relative shrink-0 border-t border-border", imageH)}>
          <Image src={mediaSources[0]} alt={imageAlt} fill className="object-cover" sizes="100vw" />
        </div>
      ) : null}
    </div>
  );
}

function splitDeckBullet(text: string): { label: string; detail: string } {
  const dash = text.includes(" — ") ? " — " : " - ";
  const idx = text.indexOf(dash);
  if (idx === -1) return { label: text, detail: "" };
  return { label: text.slice(0, idx), detail: text.slice(idx + dash.length) };
}

function MosaicSlideHeader({
  section,
  title,
  titleIndex,
  reduced,
}: {
  section?: string;
  title: string;
  titleIndex: number;
  reduced: boolean;
}) {
  return (
    <div className="relative z-10 shrink-0 overflow-visible pb-1">
      {section ? (
        <motion.div
          className="mb-2"
          custom={0}
          variants={deckRevealStagger}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <Chip text={section} />
        </motion.div>
      ) : null}
      <motion.h2
        className={cn(deckType.heading, "text-pretty leading-[1.14]")}
        custom={titleIndex}
        variants={deckRevealStagger}
        initial={reduced ? false : "hidden"}
        animate="show"
      >
        {title}
      </motion.h2>
    </div>
  );
}

/** Slide 6 — four sensor images with projector-readable captions below */
function MosaicFourUpLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const cells = slide.mediaAlt ?? [];
  const bullets = slide.bullets ?? [];
  const reduced = Boolean(useReducedMotion());
  const mosaicStart = section ? 2 : 1;

  return (
    <Shell>
      <div className="flex h-full min-h-0 flex-col">
        <MosaicSlideHeader
          section={section}
          title={title}
          titleIndex={section ? 1 : 0}
          reduced={reduced}
        />

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-4 items-end gap-4 overflow-hidden">
          {cells.map((alt, i) => (
            <motion.div
              key={alt.vi}
              className="min-h-0 overflow-hidden"
              custom={mosaicStart + i}
              variants={deckCompareImageVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <SlideImage
                src={mediaSources[i]}
                alt={alt}
                sizes="22vw"
                className={cn(
                  "min-h-0 w-full shadow-md",
                  i % 2 === 0 ? "aspect-[5/4]" : "aspect-[4/5]",
                )}
              />
            </motion.div>
          ))}
        </div>

        {bullets.length > 0 ? (
          <div className="mt-5 shrink-0 border-t border-border/70 pt-5">
            <ul className="grid grid-cols-4 gap-x-5">
              {bullets.map((b, i) => {
                const { label, detail } = splitDeckBullet(getLocalized(b, locale));
                return (
                  <motion.li
                    key={b.vi}
                    className="flex flex-col gap-1.5"
                    custom={mosaicStart + cells.length + i}
                    variants={deckRevealStagger}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="size-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span className={cn(deckType.label, "text-pretty leading-snug")}>{label}</span>
                    </span>
                    {detail ? (
                      <span className={cn("pl-5 text-pretty", deckType.body)}>{detail}</span>
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

/** Slide 7 — three actuator photos, labels under images, detail strip below */
function MosaicThreeRowLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const cells = slide.mediaAlt ?? [];
  const bullets = slide.bullets ?? [];
  const reduced = Boolean(useReducedMotion());
  const mosaicStart = section ? 2 : 1;

  return (
    <Shell>
      <div className="flex h-full min-h-0 flex-col">
        <MosaicSlideHeader
          section={section}
          title={title}
          titleIndex={section ? 1 : 0}
          reduced={reduced}
        />

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-3 items-end gap-5 overflow-hidden md:gap-6">
          {cells.map((alt, i) => {
            const bulletText = bullets[i] ? getLocalized(bullets[i], locale) : "";
            const { label } = splitDeckBullet(bulletText);
            return (
              <motion.div
                key={alt.vi}
                className="flex min-h-0 flex-col justify-end overflow-hidden"
                custom={mosaicStart + i}
                variants={deckCompareImageVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <SlideImage
                  src={mediaSources[i]}
                  alt={alt}
                  sizes="28vw"
                  className={cn(
                    "min-h-0 w-full shadow-md",
                    i === 1 ? "aspect-[4/5]" : "aspect-[5/4]",
                  )}
                />
                {label ? (
                  <p className={cn("mt-3 text-center text-pretty", deckType.label)}>{label}</p>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        {bullets.length > 0 ? (
          <div className="mt-5 shrink-0 border-t border-border/70 pt-5">
            <ul className="grid grid-cols-3 gap-x-6">
              {bullets.map((b, i) => {
                const { label, detail } = splitDeckBullet(getLocalized(b, locale));
                const stripText = detail || label;
                return (
                  <motion.li
                    key={b.vi}
                    className="flex items-start gap-2.5"
                    custom={mosaicStart + cells.length + i}
                    variants={deckRevealStagger}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <span className="mt-2.5 size-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span className={cn("text-pretty", deckType.body)}>{stripText}</span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function isFlowArrowLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed === "↓" || /^↓+$/.test(trimmed);
}

function extractLogicQuote(text: string): { prefix?: string; quote: string } {
  const quoted = text.match(/^(.+?:\s*)?"([^"]+)"/);
  if (quoted) {
    const prefix = quoted[1]?.replace(/:\s*$/, "").trim();
    return { prefix: prefix || undefined, quote: quoted[2] };
  }
  if (text.startsWith('"') && text.endsWith('"')) {
    return { quote: text.slice(1, -1) };
  }
  return { quote: text };
}

/** Slide 9 — software role: intro + logic rules beside mBlock workspace */
function SoftwareRoleLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets?.map((b) => getLocalized(b, locale)) ?? [];
  const [intro, ...logicBullets] = bullets;
  const headerOffset = section ? 2 : 1;
  const logicStart = headerOffset + (intro ? 1 : 0);

  return (
    <Shell accentSide="left">
      <div className="grid h-full min-h-0 gap-4 md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:gap-5">
        <div className="flex min-h-0 flex-col justify-center gap-4 md:gap-5">
          {section ? (
            <motion.div
              className="mb-0.5"
              custom={0}
              variants={deckRevealTransform}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <Chip text={section} />
            </motion.div>
          ) : null}

          <motion.h2
            className={cn(
              deckType.heading,
              "max-w-[14ch] text-pretty text-[clamp(2.125rem,4.8vw,3.75rem)] leading-[1.06]",
            )}
            custom={section ? 1 : 0}
            variants={deckRevealTransform}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {title}
          </motion.h2>

          {intro ? (
            <motion.p
              className={cn(
                deckType.bodyLg,
                "max-w-[28ch] text-pretty font-semibold text-foreground/92",
              )}
              custom={headerOffset}
              variants={deckRevealTransform}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {intro}
            </motion.p>
          ) : null}

          {logicBullets.length > 0 ? (
            <div className="space-y-3 md:space-y-3.5">
              {logicBullets.map((line, i) => {
                const { prefix, quote } = extractLogicQuote(line);
                return (
                  <motion.div
                    key={line}
                    className="rounded-2xl border-2 border-primary/35 bg-gradient-to-br from-primary/[0.1] via-background to-accent/35 p-4 shadow-md md:p-5"
                    custom={logicStart + i}
                    variants={deckRevealTransform}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-primary/40 bg-background font-mono text-lg font-extrabold text-primary shadow-sm md:size-12 md:text-xl">
                        {i + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        {prefix ? (
                          <p className="mb-1.5 text-pretty text-lg font-bold text-foreground/80 md:text-xl">
                            {prefix}
                          </p>
                        ) : null}
                        <p className="text-pretty text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold leading-snug tracking-[-0.02em] text-primary">
                          &ldquo;{quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : null}
        </div>

        <motion.div
          className="relative min-h-[220px] md:min-h-0"
          custom={logicStart + logicBullets.length}
          variants={deckImageReveal("right", logicStart + logicBullets.length)}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border-2 border-primary/30 shadow-lg ring-1 ring-primary/15 md:min-h-0">
            <SlideImage
              src={mediaSources[0]}
              alt={altOf(slide)}
              bleed
              className="h-full min-h-[220px] rounded-none border-0 md:min-h-0"
              sizes="(max-width: 768px) 90vw, 48vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end gap-2.5 bg-gradient-to-t from-background/90 via-background/55 to-transparent px-4 pb-4 pt-16 md:px-5 md:pb-5"
              aria-hidden
            >
              <span className="flex size-10 items-center justify-center rounded-xl border-2 border-primary/35 bg-background/95 text-primary shadow-sm md:size-11">
                <Code2 className="size-5 md:size-6" strokeWidth={2} />
              </span>
              <p className={cn(deckType.label, "text-pretty leading-snug")}>
                mBlock workspace
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}

function FlowBehaviorDiagramLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const lines = slide.diagram?.map((l) => getLocalized(l, locale)) ?? [];
  const headerOffset = section ? 2 : 1;
  const flowItems = lines.reduce<
    Array<
      | { kind: "arrow"; line: string; i: number }
      | { kind: "step"; line: string; i: number; step: number }
    >
  >((acc, line, i) => {
    if (isFlowArrowLine(line)) {
      acc.push({ kind: "arrow", line, i });
      return acc;
    }
    const step = acc.filter((item) => item.kind === "step").length + 1;
    acc.push({ kind: "step", line, i, step });
    return acc;
  }, []);

  return (
    <Shell accentSide="left">
      <div className="grid h-full min-h-0 gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-5">
        <div className="flex min-h-0 flex-col">
          {section ? (
            <motion.div
              className="mb-2"
              custom={0}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <Chip text={section} />
            </motion.div>
          ) : null}
          <motion.h2
            className={cn("max-w-[16ch] text-pretty", deckType.heading)}
            custom={section ? 1 : 0}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {title}
          </motion.h2>

          {flowItems.length > 0 ? (
            <div className="mt-3 flex-none rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/[0.09] via-background to-accent/45 p-3 shadow-md md:mt-4 md:p-4">
              <div className="space-y-0.5">
                {flowItems.map((item) => {
                  const animIndex = headerOffset + item.i;
                  if (item.kind === "arrow") {
                    return (
                      <motion.div
                        key={`flow-arrow-${item.i}`}
                        className="flex justify-center py-0"
                        custom={animIndex}
                        variants={deckRevealStagger}
                        initial={reduced ? false : "hidden"}
                        animate="show"
                      >
                        <ArrowDown className="size-6 text-primary md:size-7" strokeWidth={2.75} aria-hidden />
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={`flow-step-${item.i}`}
                      className="flex items-start gap-2.5 md:gap-3"
                      custom={animIndex}
                      variants={deckRevealStagger}
                      initial={reduced ? false : "hidden"}
                      animate="show"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-primary/45 bg-background font-mono text-base font-bold tabular-nums text-primary shadow-sm md:size-9 md:text-lg">
                        {item.step}
                      </span>
                      <p className="pt-0.5 text-pretty text-[clamp(1rem,1.85vw,1.375rem)] font-bold leading-snug tracking-[-0.02em] text-foreground">
                        {item.line}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {mediaSources[0] ? (
            <motion.div
              className="mt-3 min-h-0 flex-1"
              custom={headerOffset + flowItems.length}
              variants={deckCompareImageVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <SlideImage
                src={mediaSources[0]}
                alt={altOf(slide, 0)}
                bleed
                className="h-full min-h-[96px] md:min-h-[112px]"
                sizes="(max-width: 768px) 90vw, 48vw"
              />
            </motion.div>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-col gap-3 md:gap-3.5">
          {mediaSources.slice(1, 2).map((src, imgIndex) => (
            <motion.div
              key={src}
              className="min-h-0 flex-1"
              custom={headerOffset + flowItems.length + 1 + imgIndex}
              variants={deckCompareImageVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <SlideImage
                src={src}
                alt={altOf(slide, imgIndex + 1)}
                bleed
                className="h-full min-h-[108px] md:min-h-[128px]"
                sizes="(max-width: 768px) 90vw, 44vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function DiagramLayout({ ctx, variant }: { ctx: LayoutRenderContext; variant: "side" | "card" | "loop" | "pillars" }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const lines = slide.diagram?.map((l) => getLocalized(l, locale)) ?? [];

  if (variant === "pillars" && lines.length >= 3) {
    return (
      <Shell>
        <Header section={section} title={title} size="title" />
        <div className="mt-5 grid flex-1 gap-4 md:grid-cols-3">
          {lines.slice(0, 3).map((line, i) => (
            <div key={line} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <SlideImage src={mediaSources[i]} alt={altOf(slide, i)} className="min-h-[100px]" />
              <p className={deckType.bodyLg}>{line}</p>
            </div>
          ))}
        </div>
      </Shell>
    );
  }

  if (variant === "loop") {
    return (
      <Shell>
        <div className="grid h-full gap-4 md:grid-cols-[1fr_1.05fr]">
          <div>
            <Header section={section} title={title} />
            <div className="mt-4 space-y-2 rounded-2xl border border-border bg-muted/40 p-5">
              {lines.map((line, i) => (
                <div key={line} className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <p className={deckType.body}>{line}</p>
                </div>
              ))}
            </div>
          </div>
          <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed className="min-h-[200px]" />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className={cn("grid h-full gap-4", variant === "card" ? "md:grid-rows-[auto_1fr]" : "md:grid-cols-[1fr_1.05fr]")}>
        <div>
          <Header section={section} title={title} />
          {lines.length > 0 ? (
            <pre className={cn("mt-4 whitespace-pre-wrap rounded-xl border border-border bg-muted/50 p-5 md:p-6", deckType.mono)}>
              {lines.join("\n")}
            </pre>
          ) : null}
        </div>
        <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed className="min-h-[160px]" />
      </div>
    </Shell>
  );
}

function splitPanelLabel(label: string): { title: string; subtitle: string } {
  const dash = label.includes(" — ") ? " — " : " - ";
  const idx = label.indexOf(dash);
  if (idx === -1) return { title: label, subtitle: "" };
  return { title: label.slice(0, idx), subtitle: label.slice(idx + dash.length) };
}

function ComparePanelsSide({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  if (!slide.left || !slide.right) return null;
  const left = localizeColumn(slide.left, locale);
  const right = localizeColumn(slide.right, locale);
  const leftLabel = splitPanelLabel(left.label);
  const rightLabel = splitPanelLabel(right.label);
  const headerOffset = section ? 2 : 1;
  const panels = [
    {
      col: left,
      labelParts: leftLabel,
      side: "left" as const,
      icon: ScanEye,
      tone: "border-primary/35 bg-primary/[0.07]",
      iconTone: "border-primary/30 bg-primary/12 text-primary",
      bulletTone: "bg-primary",
    },
    {
      col: right,
      labelParts: rightLabel,
      side: "right" as const,
      icon: Zap,
      tone: "border-primary/25 bg-accent/40",
      iconTone: "border-primary/25 bg-background/90 text-primary",
      bulletTone: "bg-primary/80",
    },
  ];

  return (
    <Shell>
      <div className="flex h-full min-h-0 flex-col gap-3 md:gap-4">
        <div className="shrink-0">
          {section ? (
            <motion.div
              className="mb-1.5"
              custom={0}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <Chip text={section} />
            </motion.div>
          ) : null}
          <motion.h2
            className={cn("max-w-[22ch] text-pretty", deckType.heading)}
            custom={section ? 1 : 0}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {title}
          </motion.h2>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(220px,42%)] gap-2.5 md:grid-rows-[minmax(0,1fr)_minmax(260px,44%)] md:gap-3 lg:grid-rows-[minmax(0,1fr)_minmax(300px,46%)]">
          <div className="grid min-h-0 gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch md:gap-4">
            {panels.map(({ col, labelParts, side, icon: Icon, tone, iconTone, bulletTone }, panelIndex) => {
              const panel = (
                <motion.div
                  key={col.label}
                  className={cn(
                    "flex min-h-0 flex-col rounded-2xl border-2 p-4 shadow-lg md:p-5",
                    tone,
                    panelIndex === 1 && "md:order-3",
                  )}
                  custom={panelIndex}
                  variants={deckComparePanelVariants(side, reduced)}
                  initial={reduced ? false : "hidden"}
                  animate="show"
                >
                  <div className="flex items-start gap-3 border-b border-border/55 pb-3 md:pb-4">
                    <span
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 md:size-14",
                        iconTone,
                      )}
                    >
                      <Icon className="size-6 md:size-7" strokeWidth={1.85} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-pretty text-[clamp(1.375rem,2.8vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">
                        {labelParts.title}
                      </p>
                      {labelParts.subtitle ? (
                        <p className="mt-1 text-pretty text-lg font-semibold text-primary md:text-xl">
                          {labelParts.subtitle}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <ul className={cn(deckBulletList(true), "mt-3 flex-1 !space-y-1 md:!space-y-1.5")}>
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className={cn("size-2.5 shrink-0 rounded-full", bulletTone)} aria-hidden />
                        <span className="font-semibold text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );

              if (panelIndex === 0) {
                return (
                  <div key={col.label} className="contents">
                    {panel}
                    <motion.div
                      className="order-2 flex flex-row items-center justify-center gap-3 py-1 md:flex-col md:gap-2.5 md:px-2 md:py-0"
                      custom={headerOffset}
                      variants={deckCompareConnectorVariants}
                      initial={reduced ? false : "hidden"}
                      animate="show"
                    >
                      <span className="hidden h-12 w-px bg-border/80 md:block" aria-hidden />
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/50 bg-background shadow-md md:size-16">
                        <ArrowLeftRight className="size-7 text-primary md:size-8" strokeWidth={2.25} />
                      </div>
                      <p className="text-center font-mono text-base font-extrabold tracking-wide text-primary md:text-lg">
                        MCU
                      </p>
                      <span className="hidden h-12 w-px bg-border/80 md:block" aria-hidden />
                    </motion.div>
                  </div>
                );
              }

              return panel;
            })}
          </div>

          <motion.div
            className="relative min-h-[220px] shrink-0 md:min-h-[260px] lg:min-h-[300px]"
            custom={headerOffset + 2}
            variants={deckCompareImageVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <SlideImage
              src={mediaSources[0]}
              alt={altOf(slide)}
              bleed
              className="h-full min-h-[220px] rounded-2xl shadow-lg ring-1 ring-primary/15 md:min-h-[260px] lg:min-h-[300px]"
              sizes="(max-width: 768px) 95vw, 88vw"
            />
          </motion.div>
        </div>
      </div>
    </Shell>
  );
}

const DEBUG_HW_ITEM_ICONS = [Cable, ScanEye] as const;
const DEBUG_SW_ITEM_ICONS = [Blocks, Code2] as const;

function highlightDebuggingTitle(title: string): React.ReactNode {
  const needle = "Debugging";
  const idx = title.indexOf(needle);
  if (idx !== -1) {
    return (
      <>
        {title.slice(0, idx)}
        <span className="text-primary">{title.slice(idx, idx + needle.length)}</span>
        {title.slice(idx + needle.length)}
      </>
    );
  }
  return title;
}

function renderDebugScenario(notes: string): React.ReactNode {
  const parts = notes.split(/\s*→\s*/);
  if (parts.length === 2) {
    return (
      <>
        <span>{parts[0].trim()}</span>
        <ArrowRight className="mx-2 inline size-5 shrink-0 text-primary md:size-6" strokeWidth={2.35} aria-hidden />
        <span className="font-extrabold text-primary">{parts[1].trim()}</span>
      </>
    );
  }
  return notes;
}

/** Slide 27 — hardware vs software diagnostic fork + central debug scene */
function RealWorldDebuggingLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  if (!slide.left || !slide.right) return null;

  const left = localizeColumn(slide.left, locale);
  const right = localizeColumn(slide.right, locale);
  const notes = slide.notes ? getLocalized(slide.notes, locale) : undefined;
  const headerOffset = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const bandVariants = reduced ? deckRevealTransform : deckShowcaseBandVariants;
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const imageVariants = reduced ? deckRevealTransform : deckCompareImageVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const debugBadge = locale === "vi" ? "Tự debug" : "Self-debug";

  const panels = [
    {
      col: left,
      side: "left" as const,
      headerIcon: Cable,
      itemIcons: DEBUG_HW_ITEM_ICONS,
      tone: "border-primary/40 bg-card/95",
      headerTone: "border-primary/40 bg-primary/14 text-primary",
    },
    {
      col: right,
      side: "right" as const,
      headerIcon: Blocks,
      itemIcons: DEBUG_SW_ITEM_ICONS,
      tone: "border-primary/45 bg-primary/[0.1] shadow-[0_8px_28px_rgba(37,99,235,0.12)]",
      headerTone: "border-primary/45 bg-primary/16 text-primary",
    },
  ];

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_38%,rgba(37,99,235,0.09),transparent_62%)]"
        aria-hidden
      />

      <div className={cn("relative shrink-0 pt-6 md:pt-7", INSET, "pb-3 md:pb-4")}>
        {section ? (
          <motion.div
            custom={0}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "mt-2 max-w-[16ch] text-balance text-[clamp(1.875rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]",
          )}
          custom={section ? 1 : 0}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightDebuggingTitle(title)}
        </motion.h2>

        {notes ? (
          <motion.p
            className={cn(
              "mt-3 flex max-w-[40ch] flex-wrap items-center rounded-2xl border-2 border-primary/35 bg-background/92 px-4 py-3 font-semibold shadow-md backdrop-blur-sm md:mt-4 md:px-5 md:py-3.5",
              deckType.bodyLg,
            )}
            custom={section ? 2 : 1}
            variants={bandVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {renderDebugScenario(notes)}
          </motion.p>
        ) : null}
      </div>

      <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-3 px-6 pb-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.16fr)_minmax(0,0.92fr)] md:items-stretch md:gap-4 md:px-8 md:pb-7 lg:px-10 lg:pb-8">
        {panels.map(({ col, side, headerIcon: HeaderIcon, itemIcons, tone, headerTone }, panelIndex) => (
          <motion.div
            key={col.label}
            className={cn(
              "flex min-h-0 flex-col gap-3 rounded-2xl border-2 p-4 shadow-lg md:gap-3.5 md:p-4.5",
              tone,
              panelIndex === 1 && "md:order-3",
            )}
            custom={panelIndex}
            variants={deckComparePanelVariants(side, reduced)}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <div className="flex items-center gap-3 border-b border-border/55 pb-3">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl border-2 md:size-11",
                  headerTone,
                )}
              >
                <HeaderIcon className="size-5 md:size-6" strokeWidth={2.15} />
              </span>
              <p className="text-pretty text-[clamp(1.125rem,2.2vw,1.5rem)] font-extrabold leading-tight tracking-[-0.02em]">
                {col.label}
              </p>
            </div>

            <ul className="flex flex-col gap-2 md:gap-2.5">
              {col.items.map((item, i) => {
                const ItemIcon = itemIcons[i] ?? Zap;
                return (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/88 px-3 py-2.5 md:px-3.5 md:py-3"
                    custom={headerOffset + panelIndex * 2 + i}
                    variants={stepVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary md:size-9">
                      <ItemIcon className="size-4 md:size-4.5" strokeWidth={2.1} aria-hidden />
                    </span>
                    <span className={cn(deckType.body, "min-w-0 flex-1 font-semibold text-pretty leading-snug")}>
                      {item}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}

        {mediaSources[0] ? (
          <motion.div
            className="relative order-first min-h-[168px] overflow-hidden rounded-2xl border-2 border-primary/35 shadow-[0_12px_40px_rgba(37,99,235,0.14)] md:order-none md:min-h-0"
            custom={0}
            variants={imageVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <SlideImage
              src={mediaSources[0]}
              alt={altOf(slide, 0)}
              bleed
              className="h-full min-h-[168px] rounded-none border-0 md:min-h-0"
              sizes="(max-width: 768px) 92vw, 34vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent"
              aria-hidden
            />
            <motion.span
              className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl border-2 border-primary/50 bg-background/92 px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm md:bottom-4 md:left-4 md:px-3.5 md:py-2 md:text-sm"
              custom={1}
              variants={introVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <Bug className="size-4 md:size-4.5" strokeWidth={2.25} aria-hidden />
              {debugBadge}
            </motion.span>
          </motion.div>
        ) : null}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[52%] z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
          custom={headerOffset + 3}
          variants={connectorVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
          aria-hidden
        >
          <span className="flex size-11 items-center justify-center rounded-full border-2 border-primary/45 bg-background/95 text-primary shadow-lg">
            <ArrowLeftRight className="size-5" strokeWidth={2.35} />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function DebugChecklist({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  if (!slide.left || !slide.right) return null;
  const cols = [localizeColumn(slide.left, locale), localizeColumn(slide.right, locale)];
  return (
    <Shell>
      <SlideImage src={mediaSources[0]} alt={altOf(slide)} className="mb-4 max-h-[38%] min-h-[120px] w-full" />
      <Header section={section} title={title} />
      {slide.notes ? <p className={cn("mt-2", deckType.bodyLg)}>{getLocalized(slide.notes, locale)}</p> : null}
      <div className="mt-4 grid flex-1 gap-4 md:grid-cols-2">
        {cols.map((col) => (
          <div key={col.label} className="rounded-xl border border-dashed border-primary/30 bg-accent/20 p-5">
            <p className={deckType.label}>{col.label}</p>
            <ul className={cn("mt-3 space-y-2", deckType.body)}>
              {col.items.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function RecapThreeCol({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, locale, mediaSources } = ctx;
  const bullets = slide.bullets ?? [];
  const alts = slide.mediaAlt ?? [];
  return (
    <Shell>
      <h2 className={deckType.title}>{title}</h2>
      <div className="mt-5 grid flex-1 gap-4 md:grid-cols-3">
        {bullets.map((b, i) => (
          <div key={b.vi} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
            <SlideImage src={mediaSources[i]} alt={alts[i] ?? b} className="min-h-[100px]" />
            <p className={deckType.bodyLg}>{getLocalized(b, locale)}</p>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function highlightTeachingTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "giảng dạy";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <span className="flex flex-col gap-1 md:gap-1.5">
          <span className="block text-[0.7em] font-bold leading-[1.12] tracking-[-0.03em] text-foreground/90">
            {title.slice(0, idx).trim()}
          </span>
          <span className="block w-fit rounded-xl bg-primary px-3 py-1 font-extrabold tracking-[-0.03em] text-primary-foreground md:px-3.5 md:py-1.5">
            {title.slice(idx)}
          </span>
        </span>
      );
    }
  }
  if (locale === "en") {
    const needle = "Teaching";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <span className="flex flex-col gap-1 md:gap-1.5">
          {idx > 0 ? (
            <span className="block text-[0.7em] font-bold leading-[1.12] text-foreground/90">{title.slice(0, idx).trim()}</span>
          ) : null}
          <span className="block w-fit rounded-xl bg-primary px-3 py-1 font-extrabold tracking-[-0.03em] text-primary-foreground md:px-3.5 md:py-1.5">
            {title.slice(idx)}
          </span>
        </span>
      );
    }
  }
  return title;
}

function TeachingSubtitlePills({ subtitle, reduced }: { subtitle: string; reduced: boolean }) {
  const parts = subtitle.split(/\s*\+\s*/).map((part) => part.trim()).filter(Boolean);
  const pillVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;

  if (parts.length < 2) {
    return (
      <p className={cn(deckType.subhead, "max-w-[28ch] text-pretty font-semibold text-foreground/85")}>
        {subtitle}
      </p>
    );
  }

  return (
    <div className="flex max-w-[34ch] flex-wrap gap-2.5 md:gap-3">
      {parts.map((part, i) => (
        <motion.span
          key={part}
          className={cn(
            "inline-flex items-center rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/[0.12] via-background to-accent/50",
            "px-3.5 py-2 text-[clamp(1.125rem,2vw,1.625rem)] font-bold leading-snug tracking-[-0.02em] text-foreground shadow-[0_6px_20px_rgba(37,99,235,0.12)] md:px-4 md:py-2.5",
          )}
          custom={i}
          variants={pillVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {part}
        </motion.span>
      ))}
    </div>
  );
}

const MECH_BULLET_ICONS = [Cable, Cpu, Cog] as const;

function highlightHandsOnTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "thực tế";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const needle = "Hands-on";
    if (title.startsWith(needle)) {
      return (
        <>
          <span className="text-primary">{needle}</span>
          {title.slice(needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 15 — hands-on mechatronics: hero image left, icon bullets right */
function MechatronicsHandsOnLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const titleIndex = section ? 1 : 0;
  const bulletStart = section ? 2 : 1;

  return (
    <div className="grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[200px] overflow-hidden border-b-2 border-primary/25 md:min-h-0 md:border-b-0 md:border-r-2"
          custom={0}
          variants={deckEditorialImageLeftVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <SlideImage
            src={mediaSources[0]}
            alt={altOf(slide, 0)}
            bleed
            sizes="(max-width: 768px) 100vw, 54vw"
            className="h-full min-h-[200px] rounded-none border-0 shadow-[0_8px_32px_rgba(15,23,42,0.12)] md:min-h-0"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/15 md:to-background/30"
            aria-hidden
          />
        </motion.div>
      ) : null}

      <div className={cn("flex min-h-0 flex-col justify-center gap-4 md:gap-5", INSET, "md:pl-8 lg:pl-10")}>
        {section ? (
          <motion.div
            custom={titleIndex - 1}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[14ch] text-pretty text-[clamp(1.875rem,4.2vw,3.25rem)] leading-[1.08]",
          )}
          custom={titleIndex}
          variants={deckRevealStagger}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightHandsOnTitle(title, locale)}
        </motion.h2>

        <div className="flex flex-col gap-2.5 md:gap-3">
          {bullets.map((item, i) => {
            const Icon = MECH_BULLET_ICONS[i] ?? Zap;
            return (
              <motion.div
                key={item.vi}
                className="flex items-start gap-3 rounded-xl border border-border/80 bg-card/90 px-3.5 py-3 md:gap-3.5 md:px-4 md:py-3.5"
                custom={bulletStart + i}
                variants={deckRevealStagger}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary md:size-10">
                  <Icon className="size-4 md:size-[1.125rem]" strokeWidth={2} aria-hidden />
                </span>
                <p className={cn(deckType.body, "min-w-0 flex-1 pt-0.5 font-semibold text-pretty leading-snug")}>
                  {getLocalized(item, locale)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function splitMblockSubtitle(subtitle: string, locale: CourseLocale): { lead: string; tail: string } | null {
  if (locale === "vi") {
    const needle = "không bị";
    const idx = subtitle.indexOf(needle);
    if (idx !== -1) {
      return { lead: subtitle.slice(0, idx).trim(), tail: subtitle.slice(idx) };
    }
  }
  if (locale === "en") {
    const needle = "without";
    const idx = subtitle.indexOf(needle);
    if (idx !== -1) {
      return { lead: subtitle.slice(0, idx).trim(), tail: subtitle.slice(idx) };
    }
  }
  return null;
}

function highlightMblockTitle(title: string, locale: CourseLocale): React.ReactNode {
  const needle = "mBlock";
  const idx = title.indexOf(needle);
  if (locale === "vi") {
    const simplify = "Đơn giản hóa";
    const sidx = title.indexOf(simplify);
    if (idx !== -1 && sidx !== -1) {
      return (
        <span className="flex flex-col gap-0.5 md:gap-1">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-mono text-[1.05em] font-extrabold tracking-[-0.04em] text-primary">{needle}</span>
            <span className="text-[0.72em] font-bold text-foreground/88">{title.slice(idx + needle.length, sidx).trim()}</span>
          </span>
          <span className="text-[0.95em] font-extrabold tracking-[-0.03em] text-foreground">{simplify}</span>
          <span className="text-[0.82em] font-bold leading-[1.1] text-foreground/90">{title.slice(sidx + simplify.length).trim()}</span>
        </span>
      );
    }
  }
  if (locale === "en") {
    const simpler = "simpler";
    const sidx = title.toLowerCase().indexOf(simpler);
    if (idx !== -1 && sidx !== -1) {
      return (
        <span className="flex flex-col gap-0.5 md:gap-1">
          <span className="font-mono text-[1.05em] font-extrabold tracking-[-0.04em] text-primary">{needle}</span>
          <span className="text-[0.95em] font-extrabold tracking-[-0.03em] text-foreground">{title.slice(idx + needle.length, sidx).trim()}</span>
          <span className="text-[0.82em] font-bold text-foreground/90">{title.slice(sidx)}</span>
        </span>
      );
    }
  }
  if (idx !== -1) {
    return (
      <>
        <span className="font-mono text-primary">{needle}</span>
        {title.slice(idx + needle.length)}
      </>
    );
  }
  return title;
}

/** Slide 16 — mBlock 2.2: typographic lockup + IDE hero + logic-without-syntax band */
function MblockSectionIntroLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { title, subtitle, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const imageAlt = getLocalized(sectionImageAlt(ctx), locale);
  const sectionGhost = section ?? "2.2";
  const titleIndex = section ? 1 : 0;
  const bandIndex = section ? 2 : 1;
  const ruleIndex = section ? 3 : 2;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const bandVariants = reduced ? deckRevealTransform : deckShowcaseBandVariants;
  const imageVariants = reduced ? deckRevealTransform : deckTeachingImageReveal;
  const pillVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;
  const ruleVariants = reduced ? deckRevealTransform : deckTeachingRuleReveal;
  const flowLabel = locale === "vi" ? "Logic · Khối lệnh · Robot" : "Logic · Blocks · Robot";
  const windowTitle = locale === "vi" ? "mBlock · chế độ lập trình khối" : "mBlock · block programming mode";
  const modeBadge = locale === "vi" ? "Chế độ khối" : "Block mode";
  const runLabel = locale === "vi" ? "Chạy" : "Run";
  const subtitleParts = subtitle ? splitMblockSubtitle(subtitle, locale) : null;
  const floatBlocks = locale === "vi"
    ? ["Forever", "If · Then", "Motor"]
    : ["Forever", "If · Then", "Motor"];

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_10%_40%,rgba(37,99,235,0.14),transparent_58%)]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute left-[2%] top-[3%] select-none font-mono text-[clamp(3.75rem,15vw,8rem)] font-extrabold leading-none tracking-[-0.04em] text-primary/[0.11] md:top-[4%]"
        aria-hidden
      >
        {sectionGhost}
      </span>

      <div className="relative flex min-h-0 flex-col justify-center overflow-hidden px-4 py-4 sm:px-6 md:px-8 md:py-5 lg:px-10">
        <div
          className={cn(
            "relative z-10 grid w-full max-w-[min(36ch,100%)] shrink-0 grid-rows-[auto_auto_1fr_auto] gap-2.5 md:gap-3",
            "rounded-2xl border-2 border-primary/32 bg-gradient-to-br from-background via-background to-primary/[0.1]",
            "px-4 py-4 shadow-[0_14px_48px_rgba(37,99,235,0.14)] md:px-6 md:py-5 lg:px-7",
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            {section ? (
              <motion.span
                className={cn(
                  deckType.chip,
                  "w-fit border-primary/50 bg-primary/16 px-3 py-1 text-xs font-extrabold md:text-sm",
                )}
                custom={0}
                variants={introVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                {section}
              </motion.span>
            ) : (
              <span />
            )}

            <motion.span
              className="rounded-lg border-2 border-primary/42 bg-primary/12 px-2.5 py-1 font-mono text-[0.6875rem] font-extrabold tracking-[0.04em] text-primary shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
              custom={titleIndex + 1}
              variants={pillVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {flowLabel}
            </motion.span>
          </div>

          <motion.h2
            className={cn(
              deckType.heading,
              "max-w-[14ch] text-balance text-[clamp(1.75rem,3.6vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.04em]",
            )}
            custom={titleIndex}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {highlightMblockTitle(title, locale)}
          </motion.h2>

          {subtitle ? (
            <motion.div
              className={cn(
                "flex items-start gap-3 rounded-xl border-2 border-primary/42 bg-primary/[0.1] px-3.5 py-2.5",
                "shadow-[0_10px_32px_rgba(37,99,235,0.15)] md:gap-3.5 md:px-4 md:py-3",
              )}
              custom={bandIndex}
              variants={bandVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border-2 border-primary/45 bg-primary/18 text-primary md:size-10"
                aria-hidden
              >
                <Blocks className="size-4 md:size-5" strokeWidth={2.25} />
              </span>
              {subtitleParts ? (
                <div className="min-w-0 flex-1">
                  <p className="text-pretty text-[clamp(0.9375rem,1.8vw,1.1875rem)] font-extrabold leading-snug tracking-[-0.02em] text-foreground">
                    {subtitleParts.lead}
                  </p>
                  <p className="mt-0.5 font-mono text-[clamp(0.8125rem,1.55vw,1.0625rem)] font-semibold leading-snug text-foreground/78">
                    {subtitleParts.tail}
                  </p>
                </div>
              ) : (
                <p className="min-w-0 flex-1 text-pretty text-[clamp(0.9375rem,1.85vw,1.1875rem)] font-extrabold leading-snug tracking-[-0.02em] text-foreground">
                  {subtitle}
                </p>
              )}
            </motion.div>
          ) : null}

          <motion.div
            className="h-1.5 w-[min(10rem,44vw)] origin-left rounded-full bg-primary/60"
            custom={ruleIndex}
            variants={ruleVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
            aria-hidden
          />
        </div>
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[200px] shrink-0 overflow-hidden border-t-[3px] border-primary/45 shadow-[0_-16px_52px_rgba(37,99,235,0.16)] ring-1 ring-primary/20 md:min-h-0 md:border-l-[3px] md:border-t-0"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <div
            className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-2 border-b border-border/70 bg-background/96 px-3 backdrop-blur-sm md:h-9 md:px-4"
            aria-hidden
          >
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-1 min-w-0 flex-1 truncate font-mono text-[0.625rem] font-semibold text-foreground/78 md:text-[0.6875rem]">
              {windowTitle}
            </span>
            <span className="shrink-0 rounded-md border border-primary/35 bg-primary/12 px-2 py-0.5 font-mono text-[0.5625rem] font-bold text-primary md:text-[0.625rem]">
              {runLabel}
            </span>
          </div>
          <div className="absolute inset-0 overflow-hidden pt-8 md:pt-9">
            <motion.div
              className="absolute inset-0"
              animate={reduced ? undefined : { scale: [1, 1.04, 1.015] }}
              transition={deckOverdriveHeroDriftTransition}
            >
              <Image
                src={mediaSources[0]}
                alt={imageAlt}
                fill
                className="object-cover object-left-top md:object-center"
                sizes="(max-width: 768px) 100vw, 48vw"
                priority
              />
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-0 pt-8 md:pt-9" aria-hidden>
            {floatBlocks.map((label, i) => (
              <motion.span
                key={label}
                className={cn(
                  "absolute rounded-lg border-2 px-2 py-1 font-mono text-[0.5625rem] font-bold shadow-md backdrop-blur-sm md:text-[0.625rem]",
                  i === 0 && "left-[8%] top-[22%] border-primary/45 bg-primary/16 text-primary",
                  i === 1 && "right-[10%] top-[38%] border-border/80 bg-background/88 text-foreground/85",
                  i === 2 && "bottom-[24%] left-[14%] border-primary/35 bg-primary/10 text-primary",
                )}
                custom={i}
                variants={pillVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                {label}
              </motion.span>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/28 via-transparent to-transparent md:from-background/38"
            aria-hidden
          />
          <motion.span
            className="absolute bottom-3 left-3 z-10 rounded-lg border-2 border-primary/55 bg-background/94 px-2.5 py-1 font-mono text-[0.6875rem] font-extrabold uppercase tracking-[0.06em] text-primary shadow-md backdrop-blur-sm md:bottom-4 md:left-4 md:px-3 md:py-1.5 md:text-xs"
            custom={1}
            variants={pillVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {modeBadge}
          </motion.span>
        </motion.div>
      ) : null}
    </div>
  );
}

type LogicBlockKind = "forever" | "if" | "else";

function classifyLogicBlock(text: string): { kind: LogicBlockKind; label: string } {
  const label = text.trim().replace(/^→\s*/, "");
  if (/^Forever/i.test(label)) return { kind: "forever", label };
  if (/^Else/i.test(label)) return { kind: "else", label };
  return { kind: "if", label };
}

function logicBlockTone(kind: LogicBlockKind): string {
  if (kind === "forever") {
    return "rounded-t-2xl rounded-b-lg border-2 border-primary/45 bg-primary/16 shadow-[0_6px_24px_rgba(37,99,235,0.12)]";
  }
  if (kind === "else") {
    return "ml-5 rounded-lg border border-primary/30 bg-card/90 shadow-sm md:ml-7";
  }
  return "ml-5 rounded-lg border border-border bg-accent/55 shadow-sm md:ml-7";
}

function highlightBlockTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "khối hình";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const needle = "Block-based";
    if (title.startsWith(needle)) {
      return (
        <>
          <span className="text-primary">{needle}</span>
          {title.slice(needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 17 — block stack diagram + UI screenshot */
function BlockProgrammingLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const lines = slide.diagram?.map((line) => getLocalized(line, locale)) ?? [];
  const codeLines = lines.slice(0, 3);
  const outcomes = (lines[3] ?? "")
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
  const headerOffset = section ? 2 : 1;
  const blockVariants = reduced ? deckRevealTransform : deckLogicBlockVariants;
  const chipVariants = reduced ? deckRevealTransform : deckOutcomeChipVariants;
  const imageVariants = reduced ? deckRevealTransform : deckTeachingImageReveal;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_72%_at_18%_58%,rgba(37,99,235,0.1),transparent_58%)]"
        aria-hidden
      />

      <div className="relative flex min-h-0 flex-col justify-center px-6 py-7 md:px-9 md:py-8 lg:px-11">
        {section ? (
          <motion.span
            className={cn(deckType.chip, "mb-3 w-fit border-primary/40 bg-primary/12 px-3.5 py-1 font-semibold")}
            custom={0}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {section}
          </motion.span>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[14ch] text-balance text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em]",
          )}
          custom={section ? 1 : 0}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightBlockTitle(title, locale)}
        </motion.h2>

        {codeLines.length > 0 ? (
          <div className="mt-5 space-y-1 md:mt-6" role="group" aria-label={locale === "vi" ? "Luồng khối lệnh" : "Block flow"}>
            {codeLines.map((line, i) => {
              const { kind, label } = classifyLogicBlock(line);
              return (
                <motion.div
                  key={`${kind}-${i}`}
                  className={cn("px-4 py-3 font-mono text-[clamp(0.875rem,1.65vw,1.125rem)] font-bold leading-snug tracking-[-0.01em] text-foreground md:px-5 md:py-3.5", logicBlockTone(kind))}
                  custom={headerOffset + i}
                  variants={blockVariants}
                  initial={reduced ? false : "hidden"}
                  animate="show"
                >
                  {label}
                </motion.div>
              );
            })}
          </div>
        ) : null}

        {outcomes.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2 md:mt-6 md:gap-2.5">
            {outcomes.map((outcome, i) => (
              <motion.span
                key={outcome}
                className={cn(
                  deckType.body,
                  "rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-semibold text-foreground md:px-4 md:py-2",
                )}
                custom={i}
                variants={chipVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                {outcome}
              </motion.span>
            ))}
          </div>
        ) : null}
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[220px] overflow-hidden border-t-2 border-primary/30 shadow-[0_-10px_36px_rgba(37,99,235,0.1)] ring-1 ring-primary/12 md:min-h-0 md:border-l-2 md:border-t-0"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <div
            className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-border/60 bg-background/92 px-3 backdrop-blur-sm md:h-8"
            aria-hidden
          >
            <span className="size-2 rounded-full bg-primary/45" />
            <span className="size-2 rounded-full bg-muted-foreground/35" />
            <span className="size-2 rounded-full bg-muted-foreground/35" />
            <Code2 className="ml-1 size-3.5 text-primary md:size-4" strokeWidth={2.25} />
            <span className="truncate text-[0.65rem] font-medium text-muted-foreground md:text-xs">
              {locale === "vi" ? "If / Else / Forever" : "If / Else / Forever blocks"}
            </span>
          </div>
          <div className="absolute inset-0 pt-7 md:pt-8">
            <Image
              src={mediaSources[0]}
              alt={getLocalized(altOf(slide), locale)}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 52vw"
            />
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

function highlightArduinoLead(title: string): React.ReactNode {
  const dash = title.includes(" — ") ? " — " : title.includes(" - ") ? " - " : null;
  if (!dash) return title;
  const idx = title.indexOf(dash);
  const lead = title.slice(0, idx + dash.length);
  const rest = title.slice(idx + dash.length);
  return (
    <>
      <span className="text-primary">{lead}</span>
      {rest}
    </>
  );
}

/** Slide 14 — mechanical freedom: copy + statement panels, stacked dual images */
function MechanicalFreedomLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const titleIndex = section ? 1 : 0;
  const bulletStart = section ? 2 : 1;

  return (
    <Shell accentSide="left">
      <div className="grid h-full min-h-0 gap-4 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-5 lg:gap-6">
        <div className="flex min-h-0 flex-col justify-center gap-4 md:gap-5">
          {section ? (
            <motion.div
              custom={0}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <Chip text={section} />
            </motion.div>
          ) : null}

          <motion.h2
            className={cn(
              deckType.heading,
              "max-w-[16ch] text-pretty text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.06]",
            )}
            custom={titleIndex}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {highlightArduinoLead(title)}
          </motion.h2>

          <div className="flex flex-col gap-3">
            {bullets.map((item, i) => (
              <motion.div
                key={item.vi}
                className="rounded-xl border border-primary/25 bg-primary/[0.07] px-4 py-3.5 md:px-5 md:py-4"
                custom={bulletStart + i}
                variants={deckRevealStagger}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <p className={cn(deckType.bodyLg, "font-semibold text-pretty leading-snug")}>
                  {getLocalized(item, locale)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[220px] flex-1 flex-col md:min-h-0">
          {mediaSources[0] ? (
            <motion.div
              className="relative min-h-0 flex-[1.2]"
              custom={0}
              variants={deckPartIntroImageVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <SlideImage
                src={mediaSources[0]}
                alt={altOf(slide, 0)}
                bleed
                sizes="(max-width: 768px) 92vw, 48vw"
                className="h-full min-h-[140px] shadow-[0_12px_40px_rgba(37,99,235,0.16)] ring-1 ring-primary/25 md:min-h-[180px]"
              />
            </motion.div>
          ) : null}

          {mediaSources[1] ? (
            <motion.div
              className="relative z-10 -mt-5 ml-8 min-h-0 flex-[0.82] md:-mt-8 md:ml-12"
              custom={1}
              variants={deckDualStackImageVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <SlideImage
                src={mediaSources[1]}
                alt={altOf(slide, 1)}
                bleed
                sizes="(max-width: 768px) 78vw, 40vw"
                className="h-full min-h-[120px] shadow-lg ring-2 ring-background md:min-h-[150px]"
              />
            </motion.div>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}

const TEACHING_ADVANTAGE_ICONS = [Cog, Blocks] as const;

function TeachingDualAdvantageBand({
  subtitle,
  reduced,
}: {
  subtitle: string;
  reduced: boolean;
}) {
  const parts = subtitle.split(/\s*\+\s*/).map((part) => part.trim()).filter(Boolean);
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;

  if (parts.length < 2) {
    return (
      <p className={cn(deckType.subhead, "w-full text-pretty font-bold leading-snug text-foreground")}>
        {subtitle}
      </p>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col">
      {parts.map((part, i) => {
        const Icon = TEACHING_ADVANTAGE_ICONS[i] ?? Zap;
        const isSoftware = i === 1;

        return (
          <div key={part} className="flex flex-col">
            {i > 0 ? (
              <motion.div
                className="flex justify-center py-1 md:py-1.5"
                custom={i}
                variants={connectorVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
                aria-hidden
              >
                <ArrowDown className="size-5 text-primary/75 md:size-6" strokeWidth={2.35} />
              </motion.div>
            ) : null}
            <motion.div
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 shadow-md md:gap-3.5 md:px-4 md:py-3",
                isSoftware
                  ? "border-primary/50 bg-primary/[0.14] shadow-[0_10px_32px_rgba(37,99,235,0.16)] ring-1 ring-primary/22"
                  : "border-border/85 bg-card/95",
              )}
              custom={i}
              variants={stepVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <span
                className="shrink-0 font-mono text-lg font-extrabold tabular-nums tracking-[-0.04em] text-primary/35 md:text-xl"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-xl border-2 text-primary",
                  isSoftware ? "size-10 border-primary/45 bg-primary/18" : "size-9 border-primary/34 bg-primary/12",
                )}
                aria-hidden
              >
                <Icon className={isSoftware ? "size-5" : "size-4.5"} strokeWidth={2.25} />
              </span>
              <p
                className={cn(
                  "min-w-0 flex-1 text-balance text-[clamp(0.9375rem,1.85vw,1.1875rem)] leading-snug tracking-[-0.02em]",
                  isSoftware ? "font-extrabold text-foreground" : "font-bold text-foreground",
                )}
              >
                {part}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** Slide 13 — Part 2 opener: typographic lockup + HW/SW ladder + classroom hero */
function TeachingPartIntroLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { title, subtitle, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const imageAlt = getLocalized(sectionImageAlt(ctx), locale);
  const partGhost = "02";
  const titleIndex = section ? 1 : 0;
  const bandIndex = section ? 2 : 1;
  const ruleIndex = section ? 3 : 2;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const imageVariants = reduced ? deckRevealTransform : deckTeachingImageReveal;
  const ruleVariants = reduced ? deckRevealTransform : deckTeachingRuleReveal;
  const pillVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;
  const flowLabel = locale === "vi" ? "Phần cứng · Phần mềm" : "Hardware · Software";
  const sceneBadge = locale === "vi" ? "Giảng dạy thực hành" : "Hands-on teaching";

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_76%_at_10%_42%,rgba(37,99,235,0.15),transparent_60%)]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute left-[2%] top-[3%] select-none font-mono text-[clamp(4.5rem,17vw,9rem)] font-extrabold leading-none tracking-[-0.04em] text-primary/[0.11] md:top-[5%]"
        aria-hidden
      >
        {partGhost}
      </span>

      <div className="relative flex min-h-0 flex-col justify-center overflow-hidden px-5 py-4 sm:px-7 md:px-9 md:py-6 lg:px-11">
        <div
          className={cn(
            "relative z-10 grid w-full max-w-[min(38ch,100%)] shrink-0 grid-rows-[auto_auto_1fr_auto] gap-3 md:gap-4",
            "rounded-2xl border-2 border-primary/32 bg-gradient-to-br from-background via-background to-primary/[0.1]",
            "px-5 py-5 shadow-[0_14px_48px_rgba(37,99,235,0.14)] md:px-7 md:py-6 lg:px-8",
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            {section ? (
              <motion.span
                className={cn(
                  deckType.chip,
                  "w-fit border-primary/50 bg-primary/16 px-3.5 py-1.5 text-sm font-extrabold md:text-base",
                )}
                custom={0}
                variants={introVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                {section}
              </motion.span>
            ) : (
              <span />
            )}

            <motion.span
              className="rounded-xl border-2 border-primary/42 bg-primary/12 px-2.5 py-1 font-mono text-[0.6875rem] font-extrabold tracking-[0.04em] text-primary shadow-sm sm:px-3 sm:py-1.5 sm:text-xs md:text-sm"
              custom={titleIndex + 1}
              variants={pillVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {flowLabel}
            </motion.span>
          </div>

          <motion.h2
            className={cn(
              deckType.display,
              "max-w-[14ch] text-balance text-[clamp(1.875rem,4.2vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]",
            )}
            custom={titleIndex}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {highlightTeachingTitle(title, locale)}
          </motion.h2>

          {subtitle ? (
            <motion.div
              className="min-h-0 pt-0.5"
              custom={bandIndex}
              variants={introVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <TeachingDualAdvantageBand subtitle={subtitle} reduced={reduced} />
            </motion.div>
          ) : null}

          <motion.div
            className="h-1.5 w-[min(11rem,46vw)] origin-left rounded-full bg-primary/60"
            custom={ruleIndex}
            variants={ruleVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
            aria-hidden
          />
        </div>
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[200px] shrink-0 overflow-hidden border-t-[3px] border-primary/45 shadow-[0_-16px_52px_rgba(37,99,235,0.16)] ring-1 ring-primary/20 md:min-h-0 md:border-l-[3px] md:border-t-0"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <motion.div
            className="absolute inset-0"
            animate={reduced ? undefined : { scale: [1, 1.045, 1.02] }}
            transition={deckOverdriveHeroDriftTransition}
          >
            <Image
              src={mediaSources[0]}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 48vw"
              className="object-cover object-[center_35%] md:object-center"
              priority
            />
          </motion.div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent md:from-background/48"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent"
            aria-hidden
          />
          <motion.span
            className="absolute bottom-4 left-4 z-10 rounded-xl border-2 border-primary/55 bg-background/94 px-3 py-1.5 font-mono text-xs font-extrabold uppercase tracking-[0.06em] text-primary shadow-md backdrop-blur-sm md:bottom-5 md:left-5 md:px-3.5 md:py-2 md:text-sm"
            custom={1}
            variants={pillVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {sceneBadge}
          </motion.span>
        </motion.div>
      ) : null}
    </div>
  );
}

const PART_THREE_DISCIPLINE_ICONS = [Cog, Cpu, Code2] as const;

function highlightPartThreeTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "Robotics";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const lower = title.toLowerCase();
    const needle = "robotics project";
    const idx = lower.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx, idx + needle.length)}</span>
          {title.slice(idx + needle.length)}
        </>
      );
    }
  }
  return title;
}

function DisciplineTriadRow({
  disciplines,
  reduced,
  startIndex,
}: {
  disciplines: string[];
  reduced: boolean;
  startIndex: number;
}) {
  const pillVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-center md:gap-2">
      {disciplines.map((label, i) => {
        const Icon = PART_THREE_DISCIPLINE_ICONS[i] ?? Cog;
        return (
          <div key={label} className="flex items-center gap-2 md:contents">
            {i > 0 ? (
              <span
                className="shrink-0 self-center px-0.5 font-mono text-lg font-extrabold text-primary/55 md:text-xl"
                aria-hidden
              >
                +
              </span>
            ) : null}
            <motion.div
              className={cn(
                "flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border-2 border-primary/30 bg-card/95 px-3.5 py-3 shadow-[0_6px_20px_rgba(37,99,235,0.08)] md:min-w-[9.5rem] md:flex-none md:px-4 md:py-3.5",
                i === 1 && "md:flex-1",
              )}
              custom={startIndex + i}
              variants={pillVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/35 bg-primary/12 text-primary md:size-10">
                <Icon className="size-[1.125rem] md:size-5" strokeWidth={2.25} />
              </span>
              <span className={cn(deckType.body, "min-w-0 font-bold text-pretty leading-snug")}>{label}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/** Slide 19 — Part 3 opener: discipline triad + wide hero image */
function RoboticsPartThreeIntroLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { title, subtitle, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const imageAlt = getLocalized(sectionImageAlt(ctx), locale);
  const partDigits = section?.replace(/\D/g, "") ?? "3";
  const partGhost = partDigits.padStart(2, "0");
  const disciplines =
    subtitle
      ?.split(/\s*\+\s*/)
      .map((part) => part.trim())
      .filter(Boolean) ?? [];
  const titleIndex = section ? 1 : 0;
  const triadIndex = section ? 2 : 1;
  const ruleIndex = section ? 2 + disciplines.length : 1 + disciplines.length;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const imageVariants = reduced ? deckRevealTransform : deckTeachingImageReveal;
  const ruleVariants = reduced ? deckRevealTransform : deckTeachingRuleReveal;

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_78%_at_12%_52%,rgba(37,99,235,0.13),transparent_58%)]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute right-[5%] top-[3%] select-none text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none text-primary/10 md:left-[3%] md:right-auto md:top-[6%]"
        aria-hidden
      >
        {partGhost}
      </span>

      <div className="relative flex min-h-0 flex-col justify-center px-6 py-7 md:px-10 md:py-9 lg:px-12">
        {section ? (
          <motion.span
            className={cn(
              deckType.chip,
              "relative z-10 mb-4 w-fit border-primary/45 bg-primary/14 px-4 py-1.5 text-base font-bold md:text-lg",
            )}
            custom={0}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {section}
          </motion.span>
        ) : null}

        <motion.h2
          className={cn(
            deckType.display,
            "relative z-10 max-w-[15ch] text-balance text-[clamp(2.35rem,5.4vw,4.75rem)] font-extrabold leading-[1.04] tracking-[-0.04em]",
          )}
          custom={titleIndex}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightPartThreeTitle(title, locale)}
        </motion.h2>

        {disciplines.length > 0 ? (
          <div className="relative z-10 mt-6 max-w-[38ch] md:mt-7">
            <DisciplineTriadRow disciplines={disciplines} reduced={reduced} startIndex={triadIndex} />
          </div>
        ) : null}

        <motion.div
          className="relative z-10 mt-7 h-1 w-[min(12rem,50vw)] origin-left rounded-full bg-primary/55 md:mt-8"
          custom={ruleIndex}
          variants={ruleVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
          aria-hidden
        />
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[240px] overflow-hidden border-t-[3px] border-primary/40 shadow-[0_-14px_48px_rgba(37,99,235,0.14)] ring-1 ring-primary/18 md:min-h-0 md:border-l-[3px] md:border-t-0"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <Image
            src={mediaSources[0]}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 52vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/35 via-transparent to-transparent md:from-background/45"
            aria-hidden
          />
        </motion.div>
      ) : null}
    </div>
  );
}

const PILLAR_ICONS = [Cog, Cpu, Code2] as const;

function parsePillarLine(line: string): { label: string; detail: string } {
  const cleaned = line.replace(/^↔\s*/, "").trim();
  const open = cleaned.indexOf("(");
  const close = cleaned.lastIndexOf(")");
  if (open !== -1 && close > open) {
    return {
      label: cleaned.slice(0, open).trim(),
      detail: cleaned.slice(open + 1, close).trim(),
    };
  }
  return { label: cleaned, detail: "" };
}

function highlightThreePillarsTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const lead = "Ba trụ cột";
    const tail = "một robot";
    if (title.startsWith(lead)) {
      const rest = title.slice(lead.length).trim();
      const tailIdx = rest.indexOf(tail);
      if (tailIdx !== -1) {
        const bridge = rest.slice(0, tailIdx).trim();
        return (
          <span className="flex flex-col gap-0.5 md:gap-1">
            <span className="block text-primary">{lead}</span>
            <span className="flex flex-wrap items-baseline gap-x-2">
              {bridge ? (
                <span className="text-[0.72em] font-bold tracking-[-0.02em] text-foreground/82">{bridge}</span>
              ) : null}
              <span className="text-[0.95em] font-extrabold tracking-[-0.03em] text-primary">{tail}</span>
            </span>
          </span>
        );
      }
      return (
        <span className="flex flex-col gap-0.5">
          <span className="text-primary">{lead}</span>
          <span className="text-[0.92em] font-extrabold text-foreground">{rest}</span>
        </span>
      );
    }
  }
  if (locale === "en") {
    const lead = "Three pillars";
    const tail = "robot";
    if (title.startsWith(lead)) {
      const rest = title.slice(lead.length).trim();
      const tailIdx = rest.toLowerCase().indexOf(tail);
      if (tailIdx !== -1) {
        const bridge = rest.slice(0, tailIdx).trim();
        return (
          <span className="flex flex-col gap-0.5 md:gap-1">
            <span className="block text-primary">{lead}</span>
            <span className="flex flex-wrap items-baseline gap-x-2">
              {bridge ? (
                <span className="text-[0.72em] font-bold text-foreground/82">{bridge}</span>
              ) : null}
              <span className="text-[0.95em] font-extrabold text-primary">{rest.slice(tailIdx)}</span>
            </span>
          </span>
        );
      }
      return (
        <span className="flex flex-col gap-0.5">
          <span className="text-primary">{lead}</span>
          <span className="text-[0.92em] font-extrabold text-foreground">{rest}</span>
        </span>
      );
    }
  }
  return title;
}

const PILLAR_ROLE_LABELS: LocalizedText[] = [
  { vi: "Cơ khí", en: "Mechanics" },
  { vi: "Điện tử", en: "Electronics" },
  { vi: "CNTT", en: "Computing" },
];

/** Slide 20 — tripod pillars + capstone hero (deck page 18/26) */
function ThreePillarsLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const lines = slide.diagram?.map((line) => getLocalized(line, locale)) ?? [];
  const pillars = lines.slice(0, 3).map(parsePillarLine);
  const titleIndex = section ? 1 : 0;
  const pillarStart = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const bandVariants = reduced ? deckRevealTransform : deckShowcaseBandVariants;
  const pillVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;
  const ruleVariants = reduced ? deckRevealTransform : deckTeachingRuleReveal;
  const flowLabel =
    locale === "vi" ? "Cơ khí ↔ Điện tử ↔ CNTT" : "Mechanics ↔ Electronics ↔ Computing";
  const capstoneBadge = locale === "vi" ? "Robot hoàn chỉnh" : "Complete robot";
  const sectionGhost = section ?? "3";

  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background"
      data-deck-fm-scope
      data-testid="deck-three-pillars"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_72%_at_50%_28%,rgba(37,99,235,0.13),transparent_58%)]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute right-[4%] top-[2%] select-none font-mono text-[clamp(3.5rem,14vw,7rem)] font-extrabold leading-none tracking-[-0.04em] text-primary/[0.09] md:top-[3%]"
        aria-hidden
        data-deck-enter="ghost"
      >
        {sectionGhost}
      </span>

      <div className={cn("relative shrink-0", INSET, "pb-0")}>
        <div className="flex flex-wrap items-end justify-between gap-2 md:gap-2.5">
          <div className="min-w-0 flex-1">
            {section ? (
              <motion.div
                className="mb-1.5 md:mb-2"
                custom={0}
                variants={introVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <Chip text={section} />
              </motion.div>
            ) : null}
            <motion.h2
              className={cn(
                deckType.display,
                "max-w-[14ch] text-balance text-[clamp(1.875rem,4vw,3.45rem)] font-extrabold leading-[1.02] tracking-[-0.04em]",
              )}
              custom={titleIndex}
              variants={introVariants}
              initial={reduced ? false : "hidden"}
              animate="show"
              data-testid="deck-three-pillars-title"
            >
              {highlightThreePillarsTitle(title, locale)}
            </motion.h2>
          </div>

          <motion.span
            className="rounded-xl border-2 border-primary/45 bg-primary/12 px-2.5 py-1 font-mono text-[0.6875rem] font-extrabold tracking-[0.04em] text-primary shadow-sm sm:px-3 sm:py-1.5 sm:text-xs md:text-sm"
            custom={titleIndex + 1}
            variants={pillVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {flowLabel}
          </motion.span>
        </div>

        <motion.div
          className="mt-1 h-1.5 w-[min(10rem,44vw)] origin-left rounded-full bg-primary/60"
          custom={titleIndex + 2}
          variants={ruleVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
          aria-hidden
        />
      </div>

      <div
        className={cn("relative z-10 shrink-0 px-3 pt-1 sm:px-5 md:px-7 md:pt-1.5 lg:px-9")}
        data-testid="deck-three-pillars-band"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-1 lg:gap-1.5">
          {pillars.flatMap((pillar, i) => {
            const Icon = PILLAR_ICONS[i] ?? Cog;
            const isCenter = i === 1;
            const roleLabel = getLocalized(PILLAR_ROLE_LABELS[i] ?? PILLAR_ROLE_LABELS[0], locale);
            const column = (
              <motion.div
                key={pillar.label}
                data-testid={`deck-three-pillars-card-${i}`}
                className={cn(
                  "relative flex min-h-0 flex-1 flex-col rounded-2xl border-2 shadow-lg",
                  isCenter
                    ? "border-primary/55 bg-primary/[0.15] shadow-[0_18px_52px_rgba(37,99,235,0.24)] ring-2 ring-primary/32 md:py-1"
                    : "border-primary/26 bg-card/95",
                )}
                custom={i}
                variants={stepVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <div
                  className={cn(
                    "flex flex-col gap-1.5 p-2.5 md:gap-2",
                    isCenter ? "md:p-3.5 lg:p-4" : "md:p-3",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-lg border-2 px-2 py-0.5 font-mono text-[0.6875rem] font-extrabold uppercase tracking-[0.05em] md:text-xs",
                      isCenter
                        ? "border-primary/50 bg-primary/18 text-primary"
                        : "border-primary/26 bg-background/92 text-foreground/80",
                    )}
                  >
                    {roleLabel}
                  </span>
                  <div className="flex items-start gap-2.5 md:gap-3">
                    <span
                      className={cn(
                        "flex shrink-0 items-center justify-center rounded-xl border-2 text-primary",
                        isCenter
                          ? "size-11 border-primary/50 bg-primary/20 md:size-12"
                          : "size-9 border-primary/34 bg-primary/12 md:size-10",
                      )}
                    >
                      <Icon className={isCenter ? "size-5 md:size-6" : "size-4.5 md:size-5"} strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p
                        className={cn(
                          "text-balance font-extrabold leading-tight tracking-[-0.03em] text-foreground",
                          isCenter
                            ? "text-[clamp(1.125rem,2.25vw,1.6875rem)]"
                            : "text-[clamp(0.9375rem,1.75vw,1.3125rem)] font-bold",
                        )}
                      >
                        {pillar.label}
                      </p>
                      {pillar.detail ? (
                        <p
                          className={cn(
                            "mt-0.5 text-pretty text-[clamp(0.8125rem,1.4vw,0.9875rem)] leading-snug text-foreground/90",
                            isCenter ? "font-bold" : "font-semibold",
                          )}
                        >
                          {pillar.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            );

            if (i === 0) return [column];

            const connector = (
              <motion.div
                key={`pillar-connector-${i}`}
                className="flex shrink-0 items-center justify-center py-0.5 md:py-1"
                custom={pillarStart + i - 1}
                variants={connectorVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <div className="relative flex size-9 items-center justify-center md:size-10">
                  {!reduced ? (
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/30"
                      data-deck-ambient="pulse"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative flex size-9 items-center justify-center rounded-full border-2 border-primary/48 bg-background/96 text-primary shadow-md md:size-10">
                    <ArrowLeftRight className="size-4 md:size-4.5" strokeWidth={2.35} aria-hidden />
                  </span>
                </div>
              </motion.div>
            );

            return [connector, column];
          })}
        </div>
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative z-0 min-h-0 flex-1 overflow-hidden border-t-2 border-primary/38 shadow-[0_-12px_40px_rgba(37,99,235,0.12)]"
          custom={pillarStart + pillars.length}
          variants={bandVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
          data-testid="deck-three-pillars-hero"
        >
          <div className="absolute inset-0" data-deck-ambient="drift">
            <SlideImage
              src={mediaSources[0]}
              alt={altOf(slide, 0)}
              bleed
              sizes="100vw"
              className="h-full rounded-none border-0 object-cover object-[center_58%] md:object-center"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-background/8 to-transparent"
            aria-hidden
          />
          <motion.span
            className="absolute bottom-2.5 left-3 z-10 rounded-xl border-2 border-primary/55 bg-background/94 px-2.5 py-1 font-mono text-[0.6875rem] font-extrabold uppercase tracking-[0.06em] text-primary shadow-md backdrop-blur-sm md:bottom-3 md:left-5 md:px-3 md:py-1.5 md:text-xs"
            custom={pillarStart + pillars.length + 1}
            variants={pillVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {capstoneBadge}
          </motion.span>
        </motion.div>
      ) : null}
    </div>
  );
}

const AI_IOT_FEATURE_ICONS = [Cpu, ScanEye, Mic] as const;

function highlightAiIotTitle(title: string): React.ReactNode {
  const needle = "AI & IoT";
  const idx = title.indexOf(needle);
  if (idx !== -1) {
    return (
      <>
        {title.slice(0, idx)}
        <span className="text-primary">{needle}</span>
        {title.slice(idx + needle.length)}
      </>
    );
  }
  return title;
}

/** Slide 22 — AI & IoT integration: split hero + capability ladder */
function AiIotIntegrationLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const titleIndex = section ? 1 : 0;
  const ladderStart = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const badgeVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;
  const imageVariants = reduced ? deckRevealTransform : deckEditorialImageLeftVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const ruleVariants = reduced ? deckRevealTransform : deckTeachingRuleReveal;

  const capabilityLabels: LocalizedText[] = [
    { vi: "Nền tảng", en: "Foundation" },
    { vi: "Nhận diện", en: "Vision" },
    { vi: "Giọng nói", en: "Voice" },
  ];

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_22%_48%,rgba(37,99,235,0.11),transparent_58%)]"
        aria-hidden
      />

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[200px] overflow-hidden border-b-2 border-primary/28 md:min-h-0 md:border-b-0 md:border-r-2"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <SlideImage
            src={mediaSources[0]}
            alt={altOf(slide, 0)}
            bleed
            sizes="(max-width: 768px) 100vw, 56vw"
            className="h-full min-h-[200px] rounded-none border-0 object-[center_40%] shadow-[0_10px_40px_rgba(15,23,42,0.14)] md:min-h-0 md:object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/25 md:to-background/40"
            aria-hidden
          />
          <div className="absolute left-4 top-4 flex gap-2 md:left-5 md:top-5">
            {(["AI", "IoT"] as const).map((badge, i) => (
              <motion.span
                key={badge}
                className="rounded-lg border-2 border-primary/50 bg-background/92 px-3 py-1 font-mono text-sm font-extrabold tracking-wide text-primary shadow-md backdrop-blur-sm md:px-3.5 md:py-1.5 md:text-base"
                custom={i}
                variants={badgeVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ) : null}

      <div className={cn("relative flex min-h-0 flex-col justify-center gap-3.5 md:gap-4", INSET, "md:pl-7 lg:pl-9")}>
        {section ? (
          <motion.div
            custom={titleIndex - 1}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[13ch] text-balance text-[clamp(1.875rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em]",
          )}
          custom={titleIndex}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightAiIotTitle(title)}
        </motion.h2>

        <motion.div
          className="h-1 w-[min(9rem,40vw)] origin-left rounded-full bg-primary/55"
          custom={titleIndex + 1}
          variants={ruleVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
          aria-hidden
        />

        <div className="flex flex-col gap-2 md:gap-2.5">
          {bullets.map((item, i) => {
            const Icon = AI_IOT_FEATURE_ICONS[i] ?? Zap;
            const isHero = i === 1;
            const capLabel = getLocalized(capabilityLabels[i] ?? capabilityLabels[0], locale);
            const panel = (
              <motion.div
                key={item.vi}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border-2 p-3.5 shadow-md md:gap-3.5 md:p-4",
                  isHero
                    ? "border-primary/45 bg-primary/[0.11] shadow-[0_8px_28px_rgba(37,99,235,0.16)]"
                    : "border-border/80 bg-card/95",
                )}
                custom={i}
                variants={stepVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-xl border-2 text-primary",
                    isHero ? "size-11 border-primary/45 bg-primary/16 md:size-12" : "size-10 border-primary/35 bg-primary/12",
                  )}
                >
                  <Icon className={isHero ? "size-5 md:size-6" : "size-4.5 md:size-5"} strokeWidth={2.15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs font-extrabold uppercase tracking-wide text-primary md:text-sm">
                    {capLabel}
                  </p>
                  <p
                    className={cn(
                      deckType.body,
                      "mt-1 text-pretty leading-snug",
                      isHero ? "font-extrabold" : "font-semibold",
                    )}
                  >
                    {getLocalized(item, locale)}
                  </p>
                </div>
              </motion.div>
            );

            if (i < bullets.length - 1) {
              return (
                <div key={`ai-iot-${item.vi}`} className="flex flex-col gap-2 md:gap-2.5">
                  {panel}
                  <motion.div
                    className="flex justify-center py-0.5"
                    custom={ladderStart + i}
                    variants={connectorVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                    aria-hidden
                  >
                    <ArrowDown className="size-5 text-primary/70 md:size-6" strokeWidth={2.3} />
                  </motion.div>
                </div>
              );
            }

            return panel;
          })}
        </div>
      </div>
    </div>
  );
}

const VOICE_FLOW_ICONS = [Mic, Code2, Bot] as const;

const VOICE_FLOW_PHASES: LocalizedText[] = [
  { vi: "Nghe", en: "Listen" },
  { vi: "Lệnh", en: "Command" },
  { vi: "Di chuyển", en: "Move" },
];

function highlightVoiceControlTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "giọng nói";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const needle = "Voice-controlled";
    if (title.startsWith(needle)) {
      return (
        <>
          <span className="text-primary">{needle}</span>
          {title.slice(needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 24 — voice control: hero image top + listen→command→move pipeline */
function VoiceControlledRobotLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const titleIndex = section ? 1 : 0;
  const pipelineStart = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const imageVariants = reduced ? deckRevealTransform : deckCompareImageVariants;
  const badgeVariants = reduced ? deckRevealTransform : deckTeachingPillReveal;
  const flowLabel = locale === "vi" ? "giọng nói → lệnh → di chuyển" : "voice → command → move";

  return (
    <div className="relative grid h-full min-h-0 grid-rows-[minmax(0,1.06fr)_minmax(0,0.94fr)] overflow-hidden bg-background">
      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[180px] overflow-hidden border-b-2 border-primary/25"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <SlideImage
            src={mediaSources[0]}
            alt={altOf(slide, 0)}
            bleed
            sizes="100vw"
            className="h-full min-h-[180px] rounded-none border-0 object-[center_42%] md:object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/15 to-transparent"
            aria-hidden
          />
          <motion.span
            className="absolute bottom-4 left-4 rounded-xl border-2 border-primary/50 bg-background/90 px-3.5 py-1.5 font-mono text-sm font-extrabold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm md:bottom-5 md:left-6 md:px-4 md:py-2 md:text-base"
            custom={1}
            variants={badgeVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {flowLabel}
          </motion.span>
        </motion.div>
      ) : null}

      <div className={cn("relative flex min-h-0 flex-col justify-center gap-3 md:gap-4", INSET, "pt-4 md:pt-5")}>
        {section ? (
          <motion.div
            custom={titleIndex - 1}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[14ch] text-balance text-[clamp(1.875rem,4.2vw,3.45rem)] font-extrabold leading-[1.05] tracking-[-0.04em]",
          )}
          custom={titleIndex}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightVoiceControlTitle(title, locale)}
        </motion.h2>

        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch md:gap-2.5">
          {bullets.map((item, i) => {
            const Icon = VOICE_FLOW_ICONS[i] ?? Zap;
            const phaseLabel = getLocalized(VOICE_FLOW_PHASES[i] ?? VOICE_FLOW_PHASES[0], locale);
            const isHero = i === 1;
            const panel = (
              <motion.div
                key={item.vi}
                className={cn(
                  "flex min-h-0 flex-col gap-2 rounded-2xl border-2 p-3 shadow-md md:gap-2.5 md:p-3.5",
                  isHero
                    ? "border-primary/45 bg-primary/[0.1] shadow-[0_8px_28px_rgba(37,99,235,0.14)]"
                    : "border-border/80 bg-card/95",
                )}
                custom={i}
                variants={stepVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-lg border-2 text-primary",
                      isHero ? "size-9 border-primary/45 bg-primary/16" : "size-8 border-primary/35 bg-primary/12",
                    )}
                  >
                    <Icon className={isHero ? "size-4.5" : "size-4"} strokeWidth={2.15} aria-hidden />
                  </span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wide text-primary md:text-sm">
                    {phaseLabel}
                  </span>
                </div>
                <p
                  className={cn(
                    deckType.body,
                    "text-pretty leading-snug",
                    isHero ? "font-extrabold" : "font-semibold",
                  )}
                >
                  {getLocalized(item, locale)}
                </p>
              </motion.div>
            );

            if (i < bullets.length - 1) {
              return (
                <div key={`voice-flow-${item.vi}`} className="contents">
                  {panel}
                  <motion.div
                    className="flex items-center justify-center self-center px-0.5 py-0.5 sm:py-0"
                    custom={pipelineStart + i}
                    variants={connectorVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                    aria-hidden
                  >
                    <ArrowRight className="hidden size-6 text-primary/75 sm:block md:size-7" strokeWidth={2.35} aria-hidden />
                    <ArrowDown className="size-6 text-primary/75 sm:hidden" strokeWidth={2.35} aria-hidden />
                  </motion.div>
                </div>
              );
            }

            return panel;
          })}
        </div>
      </div>
    </div>
  );
}

const FACE_EXAMPLE_ICONS = [ScanEye, LockOpen] as const;

function highlightFaceRecognitionTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "khuôn mặt";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const needle = "Face recognition";
    if (title.startsWith(needle)) {
      return (
        <>
          <span className="text-primary">{needle}</span>
          {title.slice(needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 23 — face recognition example: sense → act flow + hero image */
function FaceRecognitionExampleLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const headerOffset = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const stepVariants = reduced ? deckRevealTransform : deckComparePanelVariants("left", reduced);
  const stepRightVariants = reduced ? deckRevealTransform : deckComparePanelVariants("right", reduced);
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const imageVariants = reduced ? deckRevealTransform : deckTeachingImageReveal;
  const flowLabel = locale === "vi" ? "khuôn mặt → mở khóa" : "face → unlock";

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_14%_50%,rgba(37,99,235,0.11),transparent_58%)]"
        aria-hidden
      />

      <div className={cn("relative flex min-h-0 flex-col justify-center gap-4 md:gap-5", INSET, "md:pr-6 lg:pr-8")}>
        {section ? (
          <motion.div
            custom={0}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[14ch] text-balance text-[clamp(1.875rem,4.2vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.04em]",
          )}
          custom={section ? 1 : 0}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightFaceRecognitionTitle(title, locale)}
        </motion.h2>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-2 md:flex-col md:gap-2.5">
          {bullets.map((item, i) => {
            const Icon = FACE_EXAMPLE_ICONS[i] ?? Zap;
            const variants = i === 0 ? stepVariants : stepRightVariants;
            const panel = (
              <motion.div
                key={item.vi}
                className={cn(
                  "flex flex-1 items-start gap-3 rounded-2xl border-2 p-4 shadow-md md:p-4.5",
                  i === 0
                    ? "border-primary/35 bg-card/95"
                    : "border-primary/45 bg-primary/[0.09] shadow-[0_8px_28px_rgba(37,99,235,0.12)]",
                )}
                custom={i}
                variants={variants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-primary/40 bg-primary/12 text-primary md:size-12">
                  <Icon className="size-5 md:size-6" strokeWidth={2.15} />
                </span>
                <p className={cn(deckType.body, "min-w-0 flex-1 pt-1 font-bold text-pretty leading-snug")}>
                  {getLocalized(item, locale)}
                </p>
              </motion.div>
            );

            if (i === 0 && bullets.length > 1) {
              return (
                <div key={`flow-${item.vi}`} className="flex flex-col gap-2.5 sm:contents">
                  {panel}
                  <motion.div
                    className="flex shrink-0 items-center justify-center py-0.5 sm:flex-col sm:px-1 sm:py-0 md:py-0.5"
                    custom={headerOffset}
                    variants={connectorVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <ArrowRight className="size-7 text-primary md:size-8" strokeWidth={2.35} aria-hidden />
                  </motion.div>
                </div>
              );
            }

            return panel;
          })}
        </div>

        <motion.p
          className="w-fit rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 font-mono text-sm font-bold text-primary md:text-base"
          custom={headerOffset + 1}
          variants={connectorVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {flowLabel}
        </motion.p>
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[220px] overflow-hidden border-t-2 border-primary/35 shadow-[0_-12px_40px_rgba(37,99,235,0.12)] ring-1 ring-primary/15 md:min-h-0 md:border-l-2 md:border-t-0"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <SlideImage
            src={mediaSources[0]}
            alt={altOf(slide, 0)}
            bleed
            className="h-full min-h-[220px] rounded-none border-0 md:min-h-0"
            sizes="(max-width: 768px) 100vw, 52vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent md:from-background/40"
            aria-hidden
          />
        </motion.div>
      ) : null}
    </div>
  );
}

function highlightKidsRoboticsTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "trẻ em";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const lower = title.toLowerCase();
    const needle = "kids";
    const idx = lower.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx, idx + needle.length)}</span>
          {title.slice(idx + needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 25 — Part 4 emotive opener: full-bleed joy + anchored copy */
function KidsRoboticsPartFourLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { title, subtitle, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const imageAlt = getLocalized(sectionImageAlt(ctx), locale);
  const partDigits = section?.replace(/\D/g, "") ?? "4";
  const partGhost = partDigits.padStart(2, "0");
  const titleIndex = section ? 1 : 0;
  const subtitleIndex = section ? 2 : 1;
  const ruleIndex = section ? 3 : 2;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const bandVariants = reduced ? deckRevealTransform : deckShowcaseBandVariants;
  const ruleVariants = reduced ? deckRevealTransform : deckTeachingRuleReveal;
  const bgVariants = reduced ? deckRevealTransform : deckCompareImageVariants;

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-background">
      {mediaSources[0] ? (
        <motion.div
          className="absolute inset-0"
          custom={0}
          variants={bgVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <Image
            src={mediaSources[0]}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] scale-105 md:object-center"
          />
        </motion.div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-background/22 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/38 via-background/12 to-transparent md:max-w-[68%]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute right-[4%] top-[4%] select-none text-[clamp(5.5rem,20vw,11rem)] font-extrabold leading-none text-primary/12 md:right-[8%] md:top-[6%]"
        aria-hidden
      >
        {partGhost}
      </span>

      <div className="relative flex h-full min-h-0 flex-col justify-end px-6 pb-8 pt-16 md:px-12 md:pb-10 md:pt-20 lg:px-14 lg:pb-12">
        {section ? (
          <motion.span
            className={cn(
              deckType.chip,
              "mb-4 w-fit border-primary/50 bg-primary/16 px-4 py-1.5 text-base font-bold shadow-sm md:text-lg",
            )}
            custom={0}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {section}
          </motion.span>
        ) : null}

        <motion.h2
          className={cn(
            deckType.display,
            "max-w-[13ch] text-balance text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-foreground",
            "drop-shadow-[0_1px_0_rgba(255,255,255,0.75)] drop-shadow-[0_2px_14px_rgba(255,255,255,0.45)]",
          )}
          custom={titleIndex}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightKidsRoboticsTitle(title, locale)}
        </motion.h2>

        {subtitle ? (
          <motion.p
            className={cn(
              "mt-5 max-w-[32ch] rounded-2xl border-2 border-primary/40 bg-background/55 px-5 py-4 text-pretty font-bold shadow-[0_10px_36px_rgba(37,99,235,0.14)] backdrop-blur-sm md:mt-6 md:px-6 md:py-4.5",
              deckType.subhead,
            )}
            custom={subtitleIndex}
            variants={bandVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {subtitle}
          </motion.p>
        ) : null}

        <motion.div
          className="mt-6 h-1 w-[min(11rem,48vw)] origin-left rounded-full bg-primary/60 md:mt-7"
          custom={ruleIndex}
          variants={ruleVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
          aria-hidden
        />
      </div>
    </div>
  );
}

const LEARN_BY_DOING_ICONS = [Monitor, Bot, Sparkles] as const;

function highlightLearnByDoingTitle(title: string, locale: CourseLocale): React.ReactNode {
  const dash = title.indexOf("—");
  if (dash !== -1) {
    return (
      <>
        {title.slice(0, dash).trim()}
        {" — "}
        <span className="text-primary">{title.slice(dash + 1).trim()}</span>
      </>
    );
  }
  if (locale === "vi") {
    const needle = "hành động";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const lower = title.toLowerCase();
    const needle = "learn by doing";
    const idx = lower.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx, idx + needle.length)}</span>
          {title.slice(idx + needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 26 — major action hero + screen→real→curiosity arc */
function LearnByDoingActionLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const titleIndex = section ? 1 : 0;
  const bulletStart = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const imageVariants = reduced ? deckRevealTransform : deckEditorialImageLeftVariants;
  const actionBadge = locale === "vi" ? "Robot thật" : "Real robot";
  const flowLabel = locale === "vi" ? "Ảo → Thật" : "Screen → real";

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_18%_50%,rgba(37,99,235,0.1),transparent_58%)]"
        aria-hidden
      />

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[220px] overflow-hidden border-b-2 border-primary/30 md:min-h-0 md:border-b-0 md:border-r-2"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <SlideImage
            src={mediaSources[0]}
            alt={altOf(slide, 0)}
            bleed
            sizes="(max-width: 768px) 100vw, 58vw"
            className="h-full min-h-[220px] rounded-none border-0 object-[center_40%] shadow-[0_10px_40px_rgba(15,23,42,0.14)] md:min-h-0 md:object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20 md:to-background/45"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent md:from-background/35"
            aria-hidden
          />
          <motion.span
            className="absolute bottom-4 left-4 rounded-xl border-2 border-primary/50 bg-background/92 px-3.5 py-1.5 font-mono text-sm font-extrabold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm md:bottom-5 md:left-5 md:px-4 md:py-2 md:text-base"
            custom={1}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {actionBadge}
          </motion.span>
        </motion.div>
      ) : null}

      <div className={cn("relative flex min-h-0 flex-col justify-center gap-3.5 md:gap-4", INSET, "md:pl-7 lg:pl-9")}>
        {section ? (
          <motion.div
            custom={titleIndex - 1}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[13ch] text-balance text-[clamp(1.875rem,4vw,3.35rem)] font-extrabold leading-[1.06] tracking-[-0.04em]",
          )}
          custom={titleIndex}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightLearnByDoingTitle(title, locale)}
        </motion.h2>

        <div className="flex flex-col gap-2 md:gap-2.5">
          {bullets.map((item, i) => {
            const Icon = LEARN_BY_DOING_ICONS[i] ?? Zap;
            const isHero = i === 1;
            const panel = (
              <motion.div
                key={item.vi}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border-2 p-3.5 shadow-md md:gap-3.5 md:p-4",
                  isHero
                    ? "border-primary/45 bg-primary/[0.1] shadow-[0_8px_28px_rgba(37,99,235,0.14)]"
                    : i === 2
                      ? "border-primary/38 bg-card/95"
                      : "border-border/80 bg-card/90",
                )}
                custom={i}
                variants={stepVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-xl border-2 text-primary",
                    isHero ? "size-11 border-primary/45 bg-primary/16 md:size-12" : "size-10 border-primary/35 bg-primary/12 md:size-11",
                  )}
                >
                  <Icon className={isHero ? "size-5 md:size-6" : "size-4.5 md:size-5"} strokeWidth={2.15} />
                </span>
                <p
                  className={cn(
                    deckType.body,
                    "min-w-0 flex-1 pt-0.5 text-pretty leading-snug",
                    isHero ? "font-extrabold" : i === 2 ? "font-bold" : "font-semibold",
                  )}
                >
                  {getLocalized(item, locale)}
                </p>
              </motion.div>
            );

            if (i === 0 && bullets.length > 1) {
              return (
                <div key={`learn-flow-${item.vi}`} className="flex flex-col gap-2 md:gap-2.5">
                  {panel}
                  <motion.div
                    className="flex items-center gap-2 px-1 py-0.5"
                    custom={bulletStart}
                    variants={connectorVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <ArrowDown className="size-5 shrink-0 text-primary/75 md:size-6" strokeWidth={2.35} aria-hidden />
                    <span className="rounded-lg border border-primary/35 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-primary md:text-sm">
                      {flowLabel}
                    </span>
                  </motion.div>
                </div>
              );
            }

            if (i === 1 && bullets.length > 2) {
              return (
                <div key={`learn-hero-${item.vi}`} className="flex flex-col gap-2 md:gap-2.5">
                  {panel}
                  <motion.div
                    className="flex justify-center py-0.5"
                    custom={bulletStart + 1}
                    variants={connectorVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <ArrowDown className="size-5 text-primary/70 md:size-6" strokeWidth={2.25} aria-hidden />
                  </motion.div>
                </div>
              );
            }

            return panel;
          })}
        </div>
      </div>
    </div>
  );
}

const COMPETITION_PATH_ICONS = [Sparkles, Trophy, Cpu] as const;
const COMPETITION_BADGES = ["MakeX", "WRO", "FTC"] as const;

function highlightCompetitionTitle(title: string, locale: CourseLocale): React.ReactNode {
  if (locale === "vi") {
    const needle = "sân chơi công nghệ";
    const idx = title.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx)}</span>
        </>
      );
    }
  }
  if (locale === "en") {
    const lower = title.toLowerCase();
    const needle = "tech competitions";
    const idx = lower.indexOf(needle);
    if (idx !== -1) {
      return (
        <>
          {title.slice(0, idx)}
          <span className="text-primary">{title.slice(idx, idx + needle.length)}</span>
          {title.slice(idx + needle.length)}
        </>
      );
    }
  }
  return title;
}

/** Slide 28 — competition runway: pathway cards + achievement hero */
function TechCompetitionReadyLayout({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const reduced = Boolean(useReducedMotion());
  const bullets = slide.bullets ?? [];
  const titleIndex = section ? 1 : 0;
  const bulletStart = section ? 2 : 1;
  const introVariants = reduced ? deckRevealTransform : deckTeachingIntroReveal;
  const stepVariants = reduced ? deckRevealTransform : deckLoopStepVariants;
  const connectorVariants = reduced ? deckRevealTransform : deckCompareConnectorVariants;
  const imageVariants = reduced ? deckRevealTransform : deckCompareImageVariants;
  const readyBadge = locale === "vi" ? "Sẵn sàng thi" : "Competition-ready";

  return (
    <div className="relative grid h-full min-h-0 grid-cols-1 overflow-hidden bg-background md:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_82%_42%,rgba(37,99,235,0.11),transparent_58%)]"
        aria-hidden
      />

      <div className={cn("relative flex min-h-0 flex-col justify-center gap-3 md:gap-3.5", INSET, "md:pr-6 lg:pr-8")}>
        {section ? (
          <motion.div
            custom={titleIndex - 1}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Chip text={section} />
          </motion.div>
        ) : null}

        <motion.h2
          className={cn(
            deckType.heading,
            "max-w-[14ch] text-balance text-[clamp(1.875rem,4vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.04em]",
          )}
          custom={titleIndex}
          variants={introVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          {highlightCompetitionTitle(title, locale)}
        </motion.h2>

        <div className="flex flex-col gap-2 md:gap-2.5">
          {bullets.map((item, i) => {
            const Icon = COMPETITION_PATH_ICONS[i] ?? Zap;
            const isHero = i === 1;
            const isCapstone = i === bullets.length - 1 && bullets.length > 1;
            const panel = (
              <motion.div
                key={item.vi}
                className={cn(
                  "flex flex-col gap-2.5 rounded-2xl border-2 p-3.5 shadow-md md:gap-3 md:p-4",
                  isHero
                    ? "border-primary/45 bg-primary/[0.1] shadow-[0_8px_28px_rgba(37,99,235,0.14)]"
                    : isCapstone
                      ? "border-primary/38 bg-card/95"
                      : "border-border/80 bg-card/90",
                )}
                custom={i}
                variants={stepVariants}
                initial={reduced ? false : "hidden"}
                animate="show"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-xl border-2 text-primary",
                      isHero ? "size-11 border-primary/45 bg-primary/16 md:size-12" : "size-10 border-primary/35 bg-primary/12 md:size-11",
                    )}
                  >
                    <Icon className={isHero ? "size-5 md:size-6" : "size-4.5 md:size-5"} strokeWidth={2.15} />
                  </span>
                  <p
                    className={cn(
                      deckType.body,
                      "min-w-0 flex-1 pt-0.5 text-pretty leading-snug",
                      isHero ? "font-extrabold" : isCapstone ? "font-bold" : "font-semibold",
                    )}
                  >
                    {getLocalized(item, locale)}
                  </p>
                </div>

                {isHero ? (
                  <div className="flex flex-wrap gap-2 pl-[3.25rem] md:pl-14">
                    {COMPETITION_BADGES.map((badge, badgeIndex) => (
                      <motion.span
                        key={badge}
                        className="rounded-lg border-2 border-primary/40 bg-background/92 px-2.5 py-1 font-mono text-xs font-extrabold tracking-wide text-primary md:px-3 md:py-1.5 md:text-sm"
                        custom={badgeIndex}
                        variants={deckTeachingPillReveal}
                        initial={reduced ? false : "hidden"}
                        animate="show"
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            );

            if (i < bullets.length - 1) {
              return (
                <div key={`competition-path-${item.vi}`} className="flex flex-col gap-2 md:gap-2.5">
                  {panel}
                  <motion.div
                    className="flex justify-center py-0.5"
                    custom={bulletStart + i}
                    variants={connectorVariants}
                    initial={reduced ? false : "hidden"}
                    animate="show"
                  >
                    <ArrowDown className="size-5 text-primary/70 md:size-6" strokeWidth={2.25} aria-hidden />
                  </motion.div>
                </div>
              );
            }

            return panel;
          })}
        </div>
      </div>

      {mediaSources[0] ? (
        <motion.div
          className="relative min-h-[220px] overflow-hidden border-t-2 border-primary/30 md:min-h-0 md:border-l-2 md:border-t-0"
          custom={0}
          variants={imageVariants}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <SlideImage
            src={mediaSources[0]}
            alt={altOf(slide, 0)}
            bleed
            sizes="(max-width: 768px) 100vw, 54vw"
            className="h-full min-h-[220px] rounded-none border-0 object-[center_35%] shadow-[0_10px_40px_rgba(15,23,42,0.14)] md:min-h-0 md:object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20 md:to-background/40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent md:from-background/30"
            aria-hidden
          />
          <Trophy
            className="pointer-events-none absolute right-[6%] top-[8%] size-[clamp(3.5rem,12vw,6.5rem)] text-primary/14 md:right-[10%] md:top-[10%]"
            strokeWidth={1.5}
            aria-hidden
          />
          <motion.span
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border-2 border-primary/50 bg-background/92 px-3.5 py-1.5 font-mono text-sm font-extrabold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm md:bottom-5 md:right-5 md:px-4 md:py-2 md:text-base"
            custom={1}
            variants={introVariants}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <Trophy className="size-4 md:size-4.5" strokeWidth={2.25} aria-hidden />
            {readyBadge}
          </motion.span>
        </motion.div>
      ) : null}
    </div>
  );
}

function ShowcaseTrio({ ctx }: { ctx: LayoutRenderContext }) {
  const { slide, title, section, locale, mediaSources } = ctx;
  const cells = slide.mediaAlt ?? [];
  const labels = slide.bullets ?? [];
  return (
    <Shell>
      <Header section={section} title={title} />
      <div className="mt-4 grid flex-1 gap-4 sm:grid-cols-3">
        {cells.map((alt, i) => (
          <div key={alt.vi} className="flex flex-col gap-2">
            <SlideImage src={mediaSources[i]} alt={alt} />
            {labels[i] ? <p className={cn("text-center", deckType.body)}>{getLocalized(labels[i], locale)}</p> : null}
          </div>
        ))}
      </div>
      {slide.notes ? <p className={cn("mt-4", deckType.caption)}>{getLocalized(slide.notes, locale)}</p> : null}
    </Shell>
  );
}

export function renderDeckLayout(ctx: LayoutRenderContext): React.ReactNode {
  const { layout, title, subtitle, section, slide, locale, mediaSources } = ctx;

  switch (layout) {
    case "cover-hero":
      return <DeckTitleSlide title={title} subtitle={subtitle} />;

    case "section-split-right":
      return <SectionImageBottom ctx={ctx} variant="split" />;
    case "section-image-bottom":
      return <SectionImageBottom ctx={ctx} variant="wide" />;
    case "section-band-image":
      return ctx.slide.id === 13 ? (
        <TeachingPartIntroLayout ctx={ctx} />
      ) : (
        <SectionImageBottom ctx={ctx} variant="band" />
      );
    case "section-compact":
      return ctx.slide.id === 16 ? (
        <MblockSectionIntroLayout ctx={ctx} />
      ) : (
        <SectionImageBottom ctx={ctx} variant="compact" />
      );
    case "section-wide-image":
      return ctx.slide.id === 19 ? (
        <RoboticsPartThreeIntroLayout ctx={ctx} />
      ) : (
        <SectionImageBottom ctx={ctx} variant="wide" />
      );
    case "section-emotive-bg":
      return ctx.slide.id === 25 ? (
        <KidsRoboticsPartFourLayout ctx={ctx} />
      ) : (
        <SectionImageBottom ctx={ctx} variant="emotive" />
      );

    case "editorial-image-right":
      return <EditorialLayout ctx={ctx} imageSide="right" />;
    case "editorial-image-left":
      return <EditorialLayout ctx={ctx} imageSide="left" />;
    case "center-stack-image":
      return ctx.slide.id === 9 ? (
        <SoftwareRoleLayout ctx={ctx} />
      ) : (
        <Shell>
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Header section={section} title={title} subtitle={subtitle} size="title" />
            {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
            <div className="mt-5 w-full max-w-lg">
              <SlideImage src={mediaSources[0]} alt={altOf(slide)} />
            </div>
          </div>
        </Shell>
      );
    case "image-hero-top":
      return (
        <div className="grid h-full min-h-0 grid-rows-[minmax(0,1.05fr)_minmax(0,0.95fr)] overflow-hidden bg-background">
          <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed className="rounded-none border-0" sizes="100vw" />
          <div className={cn("flex flex-col justify-center", INSET)}>
            <Header section={section} title={title} />
            {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
          </div>
        </div>
      );
    case "caption-over-image":
      return ctx.slide.id === 15 ? (
        <MechatronicsHandsOnLayout ctx={ctx} />
      ) : (
        <div className="relative grid h-full min-h-0 grid-rows-[minmax(0,0.55fr)_minmax(0,1.45fr)] overflow-hidden bg-background">
          <div className={cn("flex flex-col justify-end", INSET)}>
            <Header section={section} title={title} />
            {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
          </div>
          <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed className="rounded-none border-0 border-t" sizes="100vw" />
        </div>
      );
    case "action-image-major":
      return ctx.slide.id === 26 ? (
        <LearnByDoingActionLayout ctx={ctx} />
      ) : (
        <div className="grid h-full min-h-0 overflow-hidden bg-background md:grid-cols-[1.15fr_1fr]">
          <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed className="min-h-[200px] rounded-none border-0" sizes="55vw" />
          <div className={cn("flex flex-col justify-center", INSET)}>
            <Header section={section} title={title} />
            {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
          </div>
        </div>
      );

    case "compare-panels-side":
      return <ComparePanelsSide ctx={ctx} />;
    case "bridge-compare":
      return ctx.slide.id === 18 ? (
        <BridgeToCppLayout ctx={ctx} />
      ) : (
        <BridgeCompareLayout ctx={ctx} />
      );
    case "debug-checklist":
      return ctx.slide.id === 27 ? (
        <RealWorldDebuggingLayout ctx={ctx} />
      ) : (
        <DebugChecklist ctx={ctx} />
      );

    case "mosaic-four-up":
      return <MosaicFourUpLayout ctx={ctx} />;
    case "mosaic-three-row":
      return <MosaicThreeRowLayout ctx={ctx} />;
    case "showcase-trio":
      return <ShowcaseTrio ctx={ctx} />;

    case "flow-diagram-side":
      return ctx.slide.id === 10 ? (
        <FlowBehaviorDiagramLayout ctx={ctx} />
      ) : (
        <DiagramLayout ctx={ctx} variant="side" />
      );
    case "diagram-card-image":
      return ctx.slide.id === 17 ? (
        <BlockProgrammingLayout ctx={ctx} />
      ) : (
        <DiagramLayout ctx={ctx} variant="card" />
      );
    case "loop-vertical":
      return <DiagramLayout ctx={ctx} variant="loop" />;
    case "pillars-horizontal":
      return ctx.slide.id === 20 ? (
        <ThreePillarsLayout ctx={ctx} />
      ) : (
        <DiagramLayout ctx={ctx} variant="pillars" />
      );

    case "split-dual-images":
      return ctx.slide.id === 14 ? (
        <MechanicalFreedomLayout ctx={ctx} />
      ) : (
        <Shell>
          <Header section={section} title={title} />
          {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
          <div className="mt-4 grid flex-1 gap-3 md:grid-cols-2">
            <SlideImage src={mediaSources[0]} alt={altOf(slide, 0)} bleed />
            <SlideImage src={mediaSources[1]} alt={altOf(slide, 1)} bleed />
          </div>
        </Shell>
      );
    case "feature-wide-image":
      return ctx.slide.id === 22 ? (
        <AiIotIntegrationLayout ctx={ctx} />
      ) : (
        <Shell>
          <Header section={section} title={title} />
          {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
          <SlideImage src={mediaSources[0]} alt={altOf(slide)} className="mt-4 w-full" />
        </Shell>
      );
    case "trophy-showcase":
      return ctx.slide.id === 28 ? (
        <TechCompetitionReadyLayout ctx={ctx} />
      ) : (
        <Shell>
          <div className="grid h-full gap-4 md:grid-cols-[1fr_1.1fr]">
            <div>
              <Header section={section} title={title} />
              {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
            </div>
            <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed />
          </div>
        </Shell>
      );

    case "example-card-side":
      return ctx.slide.id === 23 ? (
        <FaceRecognitionExampleLayout ctx={ctx} />
      ) : (
        <Shell>
          <div className="grid h-full items-center gap-5 md:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className={deckType.heading}>{title}</h2>
              {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
            </div>
            <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed />
          </div>
        </Shell>
      );
    case "example-image-top":
      return ctx.slide.id === 24 ? (
        <VoiceControlledRobotLayout ctx={ctx} />
      ) : (
        <div className="grid h-full min-h-0 grid-rows-[1.1fr_1fr] overflow-hidden bg-background">
          <SlideImage src={mediaSources[0]} alt={altOf(slide)} bleed className="rounded-none border-0" />
          <div className={cn("flex flex-col justify-center", INSET)}>
            <h2 className={deckType.heading}>{title}</h2>
            {slide.bullets ? <Bullets items={slide.bullets} locale={locale} /> : null}
          </div>
        </div>
      );

    case "recap-three-col":
      return <RecapThreeCol ctx={ctx} />;

    case "closing-qr": {
      const qrAlt = getLocalized(altOf(slide), locale);
      const qrSrc = mediaSources[0];
      const courseUrl = `https://${domain}/course`;
      const scanHint =
        locale === "vi"
          ? "Quét mã để xem khóa học và đăng ký"
          : "Scan to view the course and register";

      return (
        <Shell>
          <div className="grid h-full items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.85fr)] md:gap-10 lg:gap-14">
            <div className="min-w-0 text-center md:text-left">
              <h2 className={deckType.display}>{title}</h2>
              {subtitle ? (
                <p className={cn("mt-4", deckType.subhead)}>{subtitle}</p>
              ) : null}
              <p
                className={cn(
                  "mt-6 break-all font-mono text-xl font-semibold tracking-tight text-foreground md:text-2xl lg:text-[1.75rem]",
                )}
              >
                <span className="text-primary">{domain}</span>
                <span className="text-foreground/80">/course</span>
              </p>
              <p className={cn("mt-2", deckType.caption)}>{scanHint}</p>
            </div>
            <a
              href={courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto block w-full max-w-[280px] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:mx-0 md:max-w-[320px] md:justify-self-end"
              aria-label={qrAlt}
            >
              <div
                className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-sm ring-1 ring-primary/10 transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[var(--shadow-glow)] group-hover:ring-primary/25 motion-reduce:transition-none"
                data-deck-enter="media"
              >
                {qrSrc ? (
                  <Image
                    src={qrSrc}
                    alt={qrAlt}
                    fill
                    sizes="320px"
                    className="object-contain p-1"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-4 text-center">
                    <span className={deckType.caption}>{qrAlt}</span>
                  </div>
                )}
              </div>
            </a>
          </div>
        </Shell>
      );
    }

    default:
      return <EditorialLayout ctx={ctx} imageSide="right" />;
  }
}
