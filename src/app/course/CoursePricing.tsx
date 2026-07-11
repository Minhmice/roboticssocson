"use client";

import { useCallback, useEffect, useRef } from "react";
import { CTAButton } from "@/components/shared/CTAButton";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  coursePricingBenefits,
  coursePricingConfig,
  coursePricingCopy,
} from "@/data/coursePricing";
import { getLocalized } from "@/lib/course/getLocalized";
import {
  COURSE_SCROLL_VIEWPORT,
  EASE_OUT_QUART,
  ENTER_DURATION,
  EXIT_DURATION,
} from "@/lib/course/scrollReveal";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const HEADING_ID = "course-pricing-heading";
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

const benefitStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const benefitItem: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
    transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: ENTER_DURATION, ease: EASE_OUT_QUART },
  },
};

const CARD_SHELL_CLASS = cn(
  "relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-card p-6 sm:p-8 md:p-10",
  "shadow-[0_24px_64px_rgba(15,23,42,0.1),0_0_40px_rgba(37,99,235,0.08)]",
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
  "before:bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.12),transparent)]",
);

function trackPricingCta(href: string, label: string) {
  captureEvent(AnalyticsEvents.COURSE_PRICING_CTA_CLICKED, {
    price: coursePricingConfig.fullPriceVnd,
    session_count: coursePricingConfig.sessionCount,
    surface: "/course",
    href,
    label,
  });
  captureEvent(AnalyticsEvents.CTA_CLICKED, {
    label,
    href,
    variant: href.startsWith("#") ? "secondary" : "primary",
    surface: "/course",
  });
}

type PricingCardProps = {
  locale: "vi" | "en";
  reduced: boolean;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
};

function PricingCard({
  locale,
  reduced,
  onPrimaryClick,
  onSecondaryClick,
}: PricingCardProps) {
  const body = (
    <div className="relative">
      <p className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
        <Sparkles className="size-3.5 shrink-0" aria-hidden />
        {getLocalized(coursePricingCopy.eyebrow, locale)}
      </p>

      <h2
        id={HEADING_ID}
        className="mt-5 text-balance text-[clamp(1.75rem,4.2vw,2.5rem)] font-black leading-[1.1] tracking-tight text-foreground"
      >
        {getLocalized(coursePricingCopy.title, locale)}
      </h2>

      {reduced ? (
        <div className="mt-8">
          <PriceDisplay locale={locale} />
        </div>
      ) : (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={COURSE_SCROLL_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.08 }}
        >
          <PriceDisplay locale={locale} />
        </motion.div>
      )}

      <p className="mt-4 max-w-[52ch] text-pretty text-sm leading-relaxed text-foreground/85 sm:text-base">
        {getLocalized(coursePricingCopy.transparency, locale)}
      </p>

      <BenefitChecklist locale={locale} reduced={reduced} />

      {reduced ? (
        <div className="mt-9 space-y-3">
          <CtaPanel
            locale={locale}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
          />
        </div>
      ) : (
        <motion.div
          className="mt-9 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={COURSE_SCROLL_VIEWPORT}
          transition={{ duration: 0.45, ease: EASE_OUT_QUART, delay: 0.2 }}
        >
          <CtaPanel
            locale={locale}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
          />
        </motion.div>
      )}
    </div>
  );

  if (reduced) {
    return (
      <article aria-labelledby={HEADING_ID} className={CARD_SHELL_CLASS}>
        {body}
      </article>
    );
  }

  return (
    <motion.article
      aria-labelledby={HEADING_ID}
      className={CARD_SHELL_CLASS}
      initial="hidden"
      whileInView="visible"
      viewport={COURSE_SCROLL_VIEWPORT}
      variants={cardReveal}
    >
      {body}
    </motion.article>
  );
}

function PriceDisplay({ locale }: { locale: "vi" | "en" }) {
  return (
    <>
      <p className="font-mono text-[clamp(2.75rem,8vw,4rem)] font-black tabular-nums leading-none tracking-tight text-foreground">
        {getLocalized(coursePricingCopy.priceDisplay, locale)}
      </p>
      <p className="mt-3 text-base font-bold text-foreground sm:text-lg">
        {getLocalized(coursePricingCopy.supporting, locale)}
      </p>
    </>
  );
}

function BenefitChecklist({
  locale,
  reduced,
}: {
  locale: "vi" | "en";
  reduced: boolean;
}) {
  if (reduced) {
    return (
      <ul className="mt-8 space-y-3.5 border-t border-border/80 pt-8">
        {coursePricingBenefits.map((benefit) => (
          <li key={benefit.id} className="flex items-center gap-3">
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/35 bg-primary/10 shadow-[0_2px_8px_rgba(37,99,235,0.12)]"
              aria-hidden
            >
              <Check className="size-4 text-primary" strokeWidth={2.75} />
            </span>
            <span className="text-pretty text-sm font-semibold leading-snug text-foreground/90 sm:text-base">
              {getLocalized(benefit.text, locale)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className="mt-8 space-y-3.5 border-t border-border/80 pt-8"
      initial="hidden"
      whileInView="visible"
      viewport={COURSE_SCROLL_VIEWPORT}
      variants={benefitStagger}
    >
      {coursePricingBenefits.map((benefit) => (
        <motion.li
          key={benefit.id}
          variants={benefitItem}
          className="flex items-center gap-3"
        >
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/35 bg-primary/10 shadow-[0_2px_8px_rgba(37,99,235,0.12)]"
            aria-hidden
          >
            <Check className="size-4 text-primary" strokeWidth={2.75} />
          </span>
          <span className="text-pretty text-sm font-semibold leading-snug text-foreground/90 sm:text-base">
            {getLocalized(benefit.text, locale)}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function CtaPanel({
  locale,
  onPrimaryClick,
  onSecondaryClick,
}: {
  locale: "vi" | "en";
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <CTAButton
          label={getLocalized(coursePricingCopy.ctaPrimary, locale)}
          variant="primary"
          href="/course-register-form"
          onClick={onPrimaryClick}
          className="w-full min-h-[48px] flex-1 text-base font-bold shadow-[0_8px_24px_rgba(37,99,235,0.32)] sm:text-lg"
        />
        <CTAButton
          label={getLocalized(coursePricingCopy.ctaSecondary, locale)}
          variant="secondary"
          href="#course-curriculum"
          onClick={onSecondaryClick}
          className="w-full min-h-[48px] flex-1 text-base font-bold sm:text-lg"
        />
      </div>
      <p className="flex items-center justify-center gap-2 text-center text-xs font-medium text-foreground/75 sm:text-sm">
        <ArrowRight className="size-3.5 shrink-0 text-primary" aria-hidden />
        {getLocalized(coursePricingCopy.onboardHint, locale)}
      </p>
    </>
  );
}

export default function CoursePricing() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || viewedRef.current) return;
        viewedRef.current = true;
        captureEvent(AnalyticsEvents.COURSE_PRICING_VIEWED, {
          price: coursePricingConfig.fullPriceVnd,
          session_count: coursePricingConfig.sessionCount,
          surface: "/course",
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onPrimaryClick = useCallback(() => {
    trackPricingCta(
      "/course-register-form",
      getLocalized(coursePricingCopy.ctaPrimary, locale),
    );
  }, [locale]);

  const onSecondaryClick = useCallback(() => {
    trackPricingCta(
      "#course-curriculum",
      getLocalized(coursePricingCopy.ctaSecondary, locale),
    );
  }, [locale]);

  return (
    <FadeInSection
      id="course-pricing"
      className="relative overflow-hidden border-t border-border/60 bg-background pt-20 pb-14 sm:pt-24 sm:pb-16 md:pt-28 md:pb-24"
    >
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8"
      >
        <div className="mx-auto max-w-2xl">
          <PricingCard
            locale={locale}
            reduced={reduced}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
          />
        </div>
      </div>
    </FadeInSection>
  );
}
