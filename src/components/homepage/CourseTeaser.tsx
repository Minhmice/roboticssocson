"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseHeroData } from "@/data/courseHero";
import { courseTeaserCopy, courseTeaserSteps } from "@/data/courseTeaser";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_QUART,
      delay: index * 0.08,
    },
  }),
};

function highlightPhrase(text: string, phrase: string) {
  const index = text.indexOf(phrase);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-primary">{phrase}</span>
      {text.slice(index + phrase.length)}
    </>
  );
}

export default function CourseTeaser() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  const title = getLocalized(courseTeaserCopy.title, locale);
  const titleHighlight = getLocalized(courseTeaserCopy.titleHighlight, locale);
  const heroImage = courseHeroData.heroImage;

  return (
    <section
      id="course-teaser"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-accent/60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_90%_70%_at_20%_-20%,rgba(37,99,235,0.18),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <header className="min-w-0">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              {getLocalized(courseTeaserCopy.badge, locale)}
            </span>

            <h2 className="text-balance text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-foreground">
              {highlightPhrase(title, titleHighlight)}
            </h2>

            <p className="mt-5 max-w-[36rem] text-pretty text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-[1.55] text-foreground/80">
              {getLocalized(courseTeaserCopy.subtitle, locale)}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
              <span className="inline-flex w-full sm:flex-1 items-center justify-center rounded-xl border border-primary/20 bg-card px-6 sm:px-8 py-3 text-base font-medium text-primary shadow-sm min-h-[48px] text-center">
                {getLocalized(courseTeaserCopy.stat, locale)}
              </span>
              <CTAButton
                label={getLocalized(courseTeaserCopy.cta, locale)}
                variant="primary"
                href="/course"
                className="w-full sm:flex-1 min-h-[48px] px-6 sm:px-8 text-base shadow-[0_4px_14px_rgba(37,99,235,0.28)]"
              />
            </div>
          </header>

          <figure className="relative min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_16px_48px_rgba(37,99,235,0.12)]">
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <MediaPlaceholder
                  type="image"
                  src={heroImage.src}
                  alt={getLocalized(heroImage.alt, locale)}
                  flush
                  className="absolute inset-0 m-0"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
              <figcaption className="border-t border-border bg-card px-4 py-3 text-sm font-medium text-foreground/85">
                {getLocalized(heroImage.caption, locale)}
              </figcaption>
            </div>
          </figure>
        </div>

        <div className="mt-14 md:mt-16">
          <p className="mb-6 text-base font-semibold text-foreground">
            {getLocalized(courseTeaserCopy.journeyLabel, locale)}
          </p>

          <ol className="grid gap-5 md:grid-cols-3 md:gap-4">
            {courseTeaserSteps.map((step, index) => {
              const stepNumber = String(index + 1).padStart(2, "0");
              const isLast = index === courseTeaserSteps.length - 1;

              const content = (
                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-2xl border bg-card p-5 sm:p-6",
                    index === 1
                      ? "border-primary/35 shadow-[0_8px_28px_rgba(37,99,235,0.1)]"
                      : "border-border shadow-sm",
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-3 select-none text-[4.5rem] font-black leading-none text-primary/[0.08] sm:text-[5.5rem]"
                  >
                    {stepNumber}
                  </span>

                  <div className="relative">
                    <p className="text-sm font-bold tabular-nums text-primary">
                      {stepNumber}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-foreground">
                      {getLocalized(step.title, locale)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80 text-pretty">
                      {getLocalized(step.description, locale)}
                    </p>
                  </div>

                  {!isLast && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/40 md:block"
                      aria-hidden
                    />
                  )}
                </div>
              );

              if (!animated) {
                return (
                  <li key={step.id} className="relative min-w-0">
                    {content}
                  </li>
                );
              }

              return (
                <motion.li
                  key={step.id}
                  className="relative min-w-0"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={stepVariants}
                >
                  {content}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
