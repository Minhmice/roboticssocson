"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseHeroData } from "@/data/courseHero";
import { coursePricingCopy } from "@/data/coursePricing";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import {
  Blocks,
  CheckCircle2,
  CircuitBoard,
  Cpu,
  Layers,
  Package,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Navbar offset on main (`pt-16`) — hero fills remaining viewport */
const HERO_MIN_H = "min-h-[calc(100dvh-4rem)]";

const CHIP_ICONS: LucideIcon[] = [CircuitBoard, Blocks, Layers, Package];

/** One-by-one entrance timeline — base offsets; lead-dependent steps computed at runtime */
const SEQ = {
  badge: 0.08,
  headlineWord: 0.32,
  headlineWordStagger: 0.09,
  leadTail: 0.12,
  blockGap: 0.38,
  chipGap: 0.18,
  ctaGap: 0.26,
  imageTail: 0.44,
  proofTail: 0.44,
} as const;

function revealTransition(
  reduced: boolean,
  delay: number,
  duration = 0.55,
): Transition {
  if (reduced) return { duration: 0 };
  return { duration, delay, ease: EASE_OUT_QUART };
}

function AnimatedWords({
  text,
  reduced,
  startDelay,
  stagger,
  className,
  highlightPhrase,
  as: Tag = "span",
}: {
  text: string;
  reduced: boolean;
  startDelay: number;
  stagger: number;
  className?: string;
  highlightPhrase?: string;
  as?: "span" | "h1" | "p";
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const highlightWords = highlightPhrase
    ? new Set(highlightPhrase.split(/\s+/).filter(Boolean))
    : null;

  if (reduced) {
    if (!highlightPhrase || !text.includes(highlightPhrase)) {
      return <Tag className={className}>{text}</Tag>;
    }
    const idx = text.indexOf(highlightPhrase);
    return (
      <Tag className={className}>
        {text.slice(0, idx)}
        <span className="text-primary">{highlightPhrase}</span>
        {text.slice(idx + highlightPhrase.length)}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map((word, index) => {
        const isHighlight = highlightWords?.has(word) ?? false;
        return (
          <motion.span
            key={`${word}-${index}`}
            className={cn(
              "inline-block mr-[0.28em] last:mr-0",
              isHighlight && "text-primary",
            )}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.62,
              delay: startDelay + index * stagger,
              ease: EASE_OUT_EXPO,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </Tag>
  );
}

function CourseHeroImageWash({
  src,
  alt,
  reduced,
}: {
  src: string;
  alt: string;
  reduced: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className={cn(
          "absolute -right-[8%] top-[6%] h-[88%] w-[min(92vw,680px)]",
          !reduced && "course-hero-image-wash",
        )}
        initial={reduced ? false : { opacity: 0, scale: 1.14 }}
        animate={{ opacity: reduced ? 0.14 : 0.26, scale: 1.08 }}
        transition={revealTransition(reduced, 0.15, 1.1)}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="680px"
          className="object-cover object-center saturate-[1.35] contrast-[1.05]"
          style={{ filter: "blur(42px)" }}
          priority
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 72% 42%, color-mix(in srgb, var(--primary) 16%, transparent) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, transparent 28%, transparent 72%, var(--background) 100%)",
        }}
      />
    </div>
  );
}

function CourseHeroGridBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] opacity-35 motion-safe:opacity-40"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
        maskImage:
          "radial-gradient(ellipse 100% 80% at 50% 40%, black 15%, transparent 80%)",
      }}
    />
  );
}

function ImageAmbientSpecks({ reduced }: { reduced: boolean }) {
  const specks = [
    { className: "left-[8%] top-[12%]", delay: "0s" },
    { className: "right-[10%] top-[18%]", delay: "1.4s" },
    { className: "left-[14%] bottom-[22%]", delay: "0.7s" },
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      {specks.map(({ className, delay }) => (
        <span
          key={className}
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full bg-primary/50 shadow-[0_0_10px_rgba(37,99,235,0.5)]",
            className,
            !reduced && "hero-twinkle",
          )}
          style={reduced ? { opacity: 0.3 } : { animationDelay: delay }}
        />
      ))}
    </div>
  );
}

export default function CourseHero() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const badge = getLocalized(courseHeroData.badge, locale);
  const headline = getLocalized(courseHeroData.headline, locale);
  const headlineHighlight = getLocalized(
    courseHeroData.headlineHighlight,
    locale,
  );
  const lead = getLocalized(courseHeroData.lead, locale);
  const teaser = getLocalized(coursePricingCopy.heroTeaser, locale);
  const proofLine = getLocalized(courseHeroData.proofLine, locale);
  const imageCaption = getLocalized(courseHeroData.heroImage.caption, locale);
  const imageAlt = getLocalized(courseHeroData.heroImage.alt, locale);

  const headlineWords = headline.split(/\s+/).filter(Boolean);

  const leadStart =
    SEQ.headlineWord +
    headlineWords.length * SEQ.headlineWordStagger +
    SEQ.leadTail;
  const leadEnd = leadStart + 0.58;
  const teaserDelay = leadEnd + 0.08;
  const chipDelay = teaserDelay + SEQ.blockGap;
  const ctaPrimaryDelay =
    chipDelay + courseHeroData.chips.length * SEQ.chipGap + 0.12;
  const ctaSecondaryDelay = ctaPrimaryDelay + SEQ.ctaGap;
  const imageDelay = ctaSecondaryDelay + SEQ.blockGap;
  const proofDelay = imageDelay + SEQ.proofTail;

  return (
    <AuroraBackground
      fillViewport={false}
      intensity="vivid"
      className={`${HERO_MIN_H} bg-background text-foreground`}
    >
      <CourseHeroImageWash
        src={courseHeroData.heroImage.src}
        alt={imageAlt}
        reduced={reduced}
      />
      <CourseHeroGridBackdrop />

      <div className="relative z-10 grid w-full max-w-7xl flex-1 gap-8 sm:gap-10 mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16">
        <div className="space-y-5 text-center lg:text-left">
          <motion.p
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary mx-auto lg:mx-0 shadow-[0_4px_18px_rgba(37,99,235,0.14)]"
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={revealTransition(reduced, SEQ.badge, 0.48)}
          >
            <motion.span
              className="inline-flex shrink-0"
              animate={
                reduced
                  ? undefined
                  : { rotate: [0, 10, -6, 0], scale: [1, 1.08, 1] }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            </motion.span>
            {badge}
          </motion.p>

          <AnimatedWords
            as="h1"
            text={headline}
            highlightPhrase={headlineHighlight}
            reduced={reduced}
            startDelay={SEQ.headlineWord}
            stagger={SEQ.headlineWordStagger}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.12] text-balance"
          />

          <motion.p
            className="text-base sm:text-lg text-foreground max-w-[65ch] mx-auto lg:mx-0 leading-relaxed text-pretty"
            initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={revealTransition(reduced, leadStart, 0.62)}
          >
            {lead}
          </motion.p>

          <motion.p
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/40 bg-primary/10 px-4 py-2.5 text-sm sm:text-base font-bold text-primary mx-auto lg:mx-0 shadow-[0_6px_24px_rgba(37,99,235,0.18)]"
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.94 }}
            animate={
              reduced
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    boxShadow: [
                      "0 6px 24px rgba(37, 99, 235, 0.18)",
                      "0 8px 32px rgba(37, 99, 235, 0.28)",
                      "0 6px 24px rgba(37, 99, 235, 0.18)",
                    ],
                  }
            }
            transition={
              reduced
                ? revealTransition(reduced, teaserDelay, 0.5)
                : {
                    opacity: {
                      duration: 0.5,
                      delay: teaserDelay,
                      ease: EASE_OUT_QUART,
                    },
                    y: {
                      duration: 0.5,
                      delay: teaserDelay,
                      ease: EASE_OUT_QUART,
                    },
                    scale: {
                      duration: 0.5,
                      delay: teaserDelay,
                      ease: EASE_OUT_QUART,
                    },
                    boxShadow: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: teaserDelay + 0.8,
                    },
                  }
            }
          >
            {teaser}
          </motion.p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {courseHeroData.chips.map((chip, index) => {
              const Icon = CHIP_ICONS[index] ?? Cpu;
              return (
                <motion.span
                  key={chip.vi}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs sm:text-sm text-foreground backdrop-blur-sm"
                  initial={reduced ? false : { opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={revealTransition(
                    reduced,
                    chipDelay + index * SEQ.chipGap,
                    0.42,
                  )}
                  whileHover={
                    reduced
                      ? undefined
                      : { y: -3, borderColor: "rgba(37, 99, 235, 0.35)" }
                  }
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-primary/70"
                    aria-hidden
                  />
                  {getLocalized(chip, locale)}
                </motion.span>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center pt-1">
            <motion.div
              className="flex-1 sm:flex-none"
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={revealTransition(reduced, ctaPrimaryDelay, 0.48)}
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <CTAButton
                label={getLocalized(courseHeroData.ctaPrimary, locale)}
                variant="primary"
                href="/course-register-form"
                className="w-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] shadow-[0_8px_28px_rgba(37,99,235,0.22)]"
              />
            </motion.div>
            <motion.div
              className="flex-1 sm:flex-none"
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={revealTransition(reduced, ctaSecondaryDelay, 0.48)}
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <CTAButton
                label={getLocalized(courseHeroData.ctaSecondary, locale)}
                variant="secondary"
                href="#course-curriculum"
                className="w-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
          initial={
            reduced
              ? false
              : { opacity: 0, x: 48, scale: 0.9, filter: "blur(12px)" }
          }
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={revealTransition(reduced, imageDelay, 0.85)}
        >
          <ImageAmbientSpecks reduced={reduced} />
          <div
            className="pointer-events-none absolute -inset-4 rounded-3xl bg-primary/12 blur-2xl"
            aria-hidden
          />
          <motion.div
            className="relative h-full overflow-hidden rounded-2xl"
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={
              reduced
                ? undefined
                : {
                    y: {
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: imageDelay + 1.2,
                    },
                  }
            }
          >
            <MediaPlaceholder
              type="image"
              src={courseHeroData.heroImage.src}
              alt={imageAlt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full min-h-[260px] sm:min-h-[300px] shadow-[0_12px_40px_rgba(37,99,235,0.16)] ring-1 ring-primary/15"
              priority
            />
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-slate-900/55 via-slate-900/20 to-transparent px-4 pt-3 pb-8"
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition(reduced, imageDelay + 0.35, 0.5)}
            >
              <p className="text-sm font-medium text-white/95 text-pretty leading-snug">
                {imageCaption}
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl border border-border/80 bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg shadow-primary/8"
            aria-label={proofLine}
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={revealTransition(reduced, proofDelay, 0.5)}
          >
            <p className="flex items-start gap-2 text-sm font-medium text-foreground leading-snug">
              <motion.span
                className="mt-0.5 inline-flex shrink-0"
                initial={reduced ? false : { scale: 0, rotate: -40 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 420,
                        damping: 16,
                        delay: proofDelay + 0.15,
                      }
                }
              >
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
              </motion.span>
              <span>{proofLine}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
