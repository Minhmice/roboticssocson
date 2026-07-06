"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseMidPageCta } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const headingId = "course-mid-cta-heading";

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

const ctaButtonBase =
  "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d4ed8] sm:text-lg";

export default function CourseMidPageCTA() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const headline = getLocalized(courseMidPageCta.headline, locale);
  const subtitle = getLocalized(courseMidPageCta.subtitle, locale);
  const primaryLabel = getLocalized(courseMidPageCta.primaryCta, locale);
  const secondaryLabel = getLocalized(courseMidPageCta.secondaryCta, locale);

  const MotionTag = prefersReducedMotion ? "div" : motion.div;
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45, ease: easeOutQuart },
      };

  const stagger = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay, ease: easeOutQuart },
        };

  return (
    <FadeInSection
      id="course-mid-cta"
      className="py-12 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <MotionTag
          {...motionProps}
          className={cn(
            "course-mid-cta grid-pattern animate-gradient-shift animate-pulse-glow rounded-2xl",
            !prefersReducedMotion && "will-change-transform",
          )}
        >
          <div
            className="course-mid-cta-orb -left-16 -top-20 h-56 w-56 bg-white/20"
            aria-hidden
          />
          <div
            className="course-mid-cta-orb -bottom-24 -right-12 h-72 w-72 bg-sky-300/25"
            aria-hidden
          />
          <div className="course-mid-cta-shimmer" aria-hidden />

          <div className="relative flex flex-col gap-8 p-6 sm:p-10 md:p-12 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] xl:items-center xl:gap-x-12">
            <header className="min-w-0 text-center xl:text-left">
              {prefersReducedMotion ? (
                <>
                  <h2
                    id={headingId}
                    className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl"
                  >
                    {headline}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[42ch] text-pretty text-base leading-relaxed text-blue-50/90 md:text-lg">
                    {subtitle}
                  </p>
                </>
              ) : (
                <>
                  <motion.h2
                    id={headingId}
                    {...stagger(0.08)}
                    className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl"
                  >
                    {headline}
                  </motion.h2>
                  <motion.p
                    {...stagger(0.16)}
                    className="mx-auto mt-4 max-w-[42ch] text-pretty text-base leading-relaxed text-blue-50/90 md:text-lg"
                  >
                    {subtitle}
                  </motion.p>
                </>
              )}
            </header>

            <div className="flex min-w-0 w-full flex-col gap-3 sm:mx-auto sm:max-w-md xl:mx-0 xl:max-w-none">
              {prefersReducedMotion ? (
                <>
                  <Link
                    href="#course-register"
                    className={cn(
                      ctaButtonBase,
                      "bg-white text-primary shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:bg-blue-50 hover:shadow-[0_8px_28px_rgba(0,0,0,0.16)] active:scale-[0.98]",
                    )}
                  >
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                    {primaryLabel}
                  </Link>
                  <Link
                    href="#course-curriculum"
                    className={cn(
                      ctaButtonBase,
                      "border-2 border-white/75 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20 active:scale-[0.98]",
                    )}
                  >
                    {secondaryLabel}
                  </Link>
                </>
              ) : (
                <>
                  <motion.div {...stagger(0.24)}>
                    <Link
                      href="#course-register"
                      className={cn(
                        ctaButtonBase,
                        "group bg-white text-primary shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_8px_28px_rgba(0,0,0,0.16)] active:translate-y-0 active:scale-[0.98]",
                      )}
                    >
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                      {primaryLabel}
                    </Link>
                  </motion.div>
                  <motion.div {...stagger(0.32)}>
                    <Link
                      href="#course-curriculum"
                      className={cn(
                        ctaButtonBase,
                        "border-2 border-white/75 bg-white/10 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-white hover:bg-white/20 active:translate-y-0 active:scale-[0.98]",
                      )}
                    >
                      {secondaryLabel}
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </MotionTag>
      </div>
    </FadeInSection>
  );
}
