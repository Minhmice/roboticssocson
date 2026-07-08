"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseHeroData } from "@/data/courseHero";
import { getLocalized } from "@/lib/course/getLocalized";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Navbar offset on main (`pt-16`) — hero fills remaining viewport */
const HERO_MIN_H = "min-h-[calc(100dvh-4rem)]";

const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};

const headlineReveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const leadReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_QUART },
  },
};

const copyStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const chipStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const chipItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT_QUART },
  },
};

const ctaStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
};

const ctaItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT_QUART },
  },
};

const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, x: 36, scale: 0.94, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 },
  },
};

const proofCard: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: 0.5, ease: EASE_OUT_QUART },
  },
};

const staticVariants: Variants = {};

export default function CourseHero() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const v = reduced
    ? {
        badgeReveal: staticVariants,
        headlineReveal: staticVariants,
        leadReveal: staticVariants,
        copyStagger: staticVariants,
        chipStagger: staticVariants,
        chipItem: staticVariants,
        ctaStagger: staticVariants,
        ctaItem: staticVariants,
        gridStagger: staticVariants,
        imageReveal: staticVariants,
        proofCard: staticVariants,
      }
    : {
        badgeReveal,
        headlineReveal,
        leadReveal,
        copyStagger,
        chipStagger,
        chipItem,
        ctaStagger,
        ctaItem,
        gridStagger,
        imageReveal,
        proofCard,
      };

  return (
    <AuroraBackground
      fillViewport={false}
      className={`${HERO_MIN_H} bg-background text-foreground`}
    >
      <motion.div
        className="relative z-10 grid w-full max-w-7xl flex-1 gap-8 sm:gap-10 mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16"
        initial={reduced ? false : "hidden"}
        animate="visible"
        variants={v.gridStagger}
      >
        <motion.div
          className="space-y-5 text-center lg:text-left"
          variants={v.copyStagger}
        >
            <motion.p
              variants={v.badgeReveal}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary mx-auto lg:mx-0"
            >
              <Sparkles
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0"
                aria-hidden
              />
              {getLocalized(courseHeroData.badge, locale)}
            </motion.p>

            <motion.h1
              variants={v.headlineReveal}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.12] text-balance"
            >
              {getLocalized(courseHeroData.headline, locale)}
            </motion.h1>

            <motion.p
              variants={v.leadReveal}
              className="text-base sm:text-lg text-foreground max-w-[65ch] mx-auto lg:mx-0 leading-relaxed text-pretty"
            >
              {getLocalized(courseHeroData.lead, locale)}
            </motion.p>

            <motion.div
              variants={v.chipStagger}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {courseHeroData.chips.map((chip) => (
                <motion.span
                  key={chip.vi}
                  variants={v.chipItem}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs sm:text-sm text-foreground"
                >
                  {getLocalized(chip, locale)}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              variants={v.ctaStagger}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center pt-1"
            >
              <motion.div variants={v.ctaItem} className="flex-1 sm:flex-none">
                <CTAButton
                  label={getLocalized(courseHeroData.ctaPrimary, locale)}
                  variant="primary"
                  href="/course-register-form"
                  className="w-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
                />
              </motion.div>
              <motion.div variants={v.ctaItem} className="flex-1 sm:flex-none">
                <CTAButton
                  label={getLocalized(courseHeroData.ctaSecondary, locale)}
                  variant="secondary"
                  href="#course-curriculum"
                  className="w-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
                />
              </motion.div>
            </motion.div>
        </motion.div>

        <motion.div
          variants={v.imageReveal}
          className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
        >
            <MediaPlaceholder
              type="image"
              src={courseHeroData.heroImage.src}
              alt={getLocalized(courseHeroData.heroImage.alt, locale)}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full min-h-[260px] sm:min-h-[300px] shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
              priority
            />
            <motion.div
              variants={v.proofCard}
              className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl border border-border/80 bg-card/95 backdrop-blur-sm px-4 py-3 shadow-md"
              aria-label={getLocalized(courseHeroData.proofLine, locale)}
            >
              <p className="flex items-start gap-2 text-sm font-medium text-foreground leading-snug">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{getLocalized(courseHeroData.proofLine, locale)}</span>
              </p>
            </motion.div>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}
