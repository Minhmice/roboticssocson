"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedText } from "@/components/shared/AnimatedComponents";
import { heroData } from "@/data/hero";
import { sponsorEmail } from "@/data/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedData } from "@/hooks/useTranslatedData";
import {
  Award,
  Bot,
  Cpu,
  Mail,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WORD_DISPLAY_MS = 3000;
const WORD_FADE_MS = 280;
const MAX_PHRASE_CYCLES = 1;
const EASE_OUT = [0.25, 1, 0.5, 1] as const;

type FloatChip = {
  id: string;
  Icon: LucideIcon;
  className: string;
  delay: number;
  drift: "hero-float-drift" | "hero-float-drift-alt" | "hero-float-orbit";
  size?: "xs" | "sm";
};

type FloatSpeck = {
  id: string;
  className: string;
  delay: string;
};

type FloatRing = {
  id: string;
  className: string;
  delay: string;
};

const FLOAT_CHIPS: FloatChip[] = [
  {
    id: "cpu",
    Icon: Cpu,
    className: "left-[14%] top-[22%] md:left-[18%]",
    delay: 0,
    drift: "hero-float-drift",
    size: "xs",
  },
  {
    id: "wrench",
    Icon: Wrench,
    className: "right-[13%] top-[26%] md:right-[17%]",
    delay: 0.25,
    drift: "hero-float-drift-alt",
    size: "xs",
  },
  {
    id: "bot",
    Icon: Bot,
    className: "left-[16%] bottom-[28%] md:left-[20%]",
    delay: 0.5,
    drift: "hero-float-orbit",
    size: "sm",
  },
  {
    id: "sparkles",
    Icon: Sparkles,
    className: "right-[15%] bottom-[30%] md:right-[19%]",
    delay: 0.15,
    drift: "hero-float-drift",
    size: "xs",
  },
  {
    id: "zap",
    Icon: Zap,
    className: "left-[42%] top-[16%] hidden md:flex",
    delay: 0.7,
    drift: "hero-float-orbit",
    size: "xs",
  },
  {
    id: "sparkles-2",
    Icon: Sparkles,
    className: "right-[38%] bottom-[18%] hidden lg:flex",
    delay: 0.4,
    drift: "hero-float-drift-alt",
    size: "xs",
  },
];

const FLOAT_SPECKS: FloatSpeck[] = [
  { id: "s1", className: "left-[22%] top-[34%]", delay: "0s" },
  { id: "s2", className: "right-[24%] top-[38%]", delay: "1.1s" },
  { id: "s3", className: "left-[30%] bottom-[36%]", delay: "0.6s" },
  { id: "s4", className: "right-[28%] bottom-[40%]", delay: "1.8s" },
  { id: "s5", className: "left-[48%] top-[28%] hidden sm:block", delay: "0.3s" },
  { id: "s6", className: "right-[46%] top-[52%] hidden sm:block", delay: "2.2s" },
];

const FLOAT_RINGS: FloatRing[] = [
  { id: "r1", className: "left-[10%] top-[30%] h-14 w-14", delay: "0s" },
  { id: "r2", className: "right-[9%] top-[34%] h-10 w-10", delay: "1.4s" },
  { id: "r3", className: "left-[12%] bottom-[32%] h-12 w-12", delay: "0.8s" },
  { id: "r4", className: "right-[11%] bottom-[36%] h-16 w-16", delay: "2s" },
];

function HeroAmbientLayer({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          "absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/6 blur-3xl",
          !reduced && "hero-orb-pulse",
        )}
      />
      <div
        className={cn(
          "absolute left-[18%] top-[24%] h-24 w-24 rounded-full bg-primary/5 blur-2xl",
          !reduced && "hero-orb-pulse",
        )}
        style={reduced ? undefined : { animationDelay: "1.5s" }}
      />
      <div
        className={cn(
          "absolute right-[16%] bottom-[26%] h-28 w-28 rounded-full bg-primary/4 blur-2xl",
          !reduced && "hero-orb-pulse",
        )}
        style={reduced ? undefined : { animationDelay: "2.4s" }}
      />

      {FLOAT_RINGS.map(({ id, className, delay }) => (
        <div
          key={id}
          className={cn(
            "absolute rounded-full border border-primary/15",
            className,
            !reduced && "hero-ring-breathe",
          )}
          style={reduced ? { opacity: 0.15 } : { animationDelay: delay }}
        />
      ))}

      {FLOAT_SPECKS.map(({ id, className, delay }) => (
        <span
          key={id}
          className={cn(
            "absolute h-1 w-1 rounded-full bg-primary/50 shadow-[0_0_8px_rgba(37,99,235,0.45)]",
            className,
            !reduced && "hero-twinkle",
          )}
          style={reduced ? { opacity: 0.25 } : { animationDelay: delay }}
        />
      ))}

      {FLOAT_CHIPS.map(({ id, Icon, className, delay, drift, size }) => (
        <motion.div
          key={id}
          className={cn(
            "absolute flex items-center justify-center rounded-xl border border-primary/12 bg-primary/[0.03] text-primary/55 shadow-[0_0_20px_rgba(37,99,235,0.08)] backdrop-blur-md",
            size === "sm" ? "h-8 w-8" : "h-7 w-7",
            className,
            !reduced && drift,
          )}
          initial={reduced ? false : { opacity: 0, scale: 0.7 }}
          animate={
            reduced ? { opacity: 0.35, scale: 1 } : { opacity: 0.55, scale: 1 }
          }
          transition={{
            duration: 0.6,
            delay,
            ease: EASE_OUT,
          }}
        >
          <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-3 w-3"} />
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedTextWithChars({ text }: { text: string }) {
  if (!text || typeof text !== "string") return null;
  const chars = text.split("");

  return (
    <span
      className="inline-flex flex-wrap items-center justify-center font-black text-primary tracking-[-0.02em] drop-shadow-[0_2px_12px_rgba(37,99,235,0.15)]"
      key={text}
      style={{ perspective: 1000 }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          className="inline-block origin-bottom"
          initial={{ opacity: 0, y: -50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.85,
            delay: index * 0.04,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function useIsNarrowViewport(maxWidth = 767) {
  // Default true so ATF mobile stays quiet until matchMedia confirms width.
  const [narrow, setNarrow] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [maxWidth]);

  return narrow;
}

export default function Hero() {
  const { locale } = useLanguage();
  const { getField } = useTranslatedData();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsNarrowViewport();
  // Above-the-fold on mobile: skip ambient/chip animation and phrase cycling cost.
  const reduced = Boolean(prefersReducedMotion) || isMobile;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const animatedWordsRaw = getField(heroData, "animatedWords");
  const animatedWords = useMemo(
    () =>
      Array.isArray(animatedWordsRaw)
        ? animatedWordsRaw
        : locale === "vi"
          ? heroData.animatedWords_vi
          : heroData.animatedWords_en,
    [animatedWordsRaw, locale],
  );

  const contactMailto = useMemo(() => {
    const subject =
      locale === "vi"
        ? "Liên hệ — Robotics Sóc Sơn"
        : "Contact — Robotics Soc Son";
    return `mailto:${sponsorEmail}?subject=${encodeURIComponent(subject)}`;
  }, [locale]);

  const cyclingComplete =
    reduced ||
    cycleCount >= MAX_PHRASE_CYCLES ||
    animatedWords.length <= 1;

  useEffect(() => {
    if (cyclingComplete || !animatedWords.length) return;

    const timeoutId = setTimeout(() => {
      setIsTransitioning(true);

      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentWordIndex((prev) => {
          const next = (prev + 1) % animatedWords.length;
          if (next === 0) {
            setCycleCount((c) => c + 1);
          }
          return next;
        });
        setIsTransitioning(false);
      }, WORD_FADE_MS);
    }, WORD_DISPLAY_MS);

    return () => {
      clearTimeout(timeoutId);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [animatedWords.length, currentWordIndex, cyclingComplete]);

  const headlineLead = getField(heroData, "headline");
  const activePhrase = animatedWords[currentWordIndex] ?? "";

  return (
    <AuroraBackground className="bg-background text-foreground">
      <HeroAmbientLayer reduced={reduced} />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-2 sm:space-y-4 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <AnimatedText className="inline-flex justify-center" once>
          <p className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-[0_4px_16px_rgba(37,99,235,0.1)]">
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
            {getField(heroData, "badge")}
          </p>
        </AnimatedText>

        <AnimatedText direction="left" delay={0.1} once>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-extrabold tracking-[-0.02em] text-foreground leading-[1.08] sm:leading-[1.1] text-balance max-w-[65ch] mx-auto">
            <span className="block text-foreground">{headlineLead}</span>
            <span className="relative mt-3 flex min-h-[2.75rem] sm:min-h-[3.25rem] md:min-h-[3.75rem] lg:min-h-[4.25rem] items-center justify-center [perspective:1000px]">
              <span
                className="pointer-events-none absolute inset-x-6 inset-y-1 -z-10 rounded-2xl bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-sm"
                aria-hidden
              />
              {reduced ? (
                <span className="font-black text-primary text-balance">
                  {activePhrase}
                </span>
              ) : (
                <motion.span
                  key={currentWordIndex}
                  className="inline-flex items-center justify-center"
                  animate={{
                    opacity: isTransitioning ? 0 : 1,
                    y: isTransitioning ? -6 : 0,
                  }}
                  transition={{
                    duration: WORD_FADE_MS / 1000,
                    ease: EASE_OUT,
                  }}
                >
                  <AnimatedTextWithChars text={activePhrase} />
                </motion.span>
              )}
            </span>
          </h1>
        </AnimatedText>

        <AnimatedText direction="right" delay={0.2} once>
          <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed px-2 sm:px-0 max-w-[65ch] mx-auto text-pretty font-normal">
            {getField(heroData, "sub")}
          </p>
        </AnimatedText>

        <AnimatedText delay={0.35} once>
          <div className="mt-6 sm:mt-8 flex justify-center w-full max-w-md mx-auto">
            <CTAButton
              label={getField(heroData, "cta_primary")}
              variant="primary"
              href={contactMailto}
              icon={Mail}
              className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 min-h-[48px] shadow-[0_8px_28px_rgba(37,99,235,0.22)] hover:shadow-[0_10px_32px_rgba(37,99,235,0.28)]"
            />
          </div>
        </AnimatedText>
      </div>
    </AuroraBackground>
  );
}
