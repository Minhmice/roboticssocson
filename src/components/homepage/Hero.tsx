"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { LocaleLink as Link } from "@/components/shared/LocaleLink";
import { m, useReducedMotion } from "framer-motion";
import { CTAButton } from "@/components/shared/CTAButton";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { heroData } from "@/data/hero";
import { useLanguage } from "@/contexts/LanguageContext";
import { localize } from "@/lib/i18n/localized";
import { Award, ArrowRight, ShieldCheck, Wrench, Trophy } from "lucide-react";

const WORD_DISPLAY_MS = 3200;
const WORD_FADE_MS = 240;

export default function Hero() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  const animatedWords = localize(heroData.animatedWords, locale);

  useEffect(() => {
    if (reduced || animatedWords.length <= 1) return;

    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(true);
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setIsTransitioning(false);
      }, WORD_FADE_MS);
    }, WORD_DISPLAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [animatedWords.length, currentWordIndex, reduced]);

  const headlineLead = localize(heroData.headline, locale);
  const activePhrase = animatedWords[currentWordIndex] ?? "";

  const isVi = locale === "vi";

  const proofStats = [
    { value: "Top 4", label: isVi ? "VRC toàn quốc" : "VRC Nationwide" },
    { value: "Top 8", label: isVi ? "VORC toàn quốc" : "VORC Nationwide" },
    { value: isVi ? "Á quân" : "Runner-up", label: "Motions In Fire 2025" },
  ];

  const scrollToTeam = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = document.getElementById("team-carousel");
    if (target) {
      e?.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <AuroraBackground className="bg-background text-foreground py-10 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16">
          {/* Left Column — Briefing & Actions */}
          <div className="space-y-6 text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Award className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{localize(heroData.badge, locale)}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,4.5vw,3.5rem)] font-black tracking-[-0.025em] text-foreground leading-[1.08] text-balance">
              <span className="block">{headlineLead}</span>
              <span className="relative mt-2 block min-h-[2.5rem] sm:min-h-[3rem] text-primary">
                {reduced ? (
                  <span>{activePhrase}</span>
                ) : (
                  <m.span
                    key={currentWordIndex}
                    className="inline-block"
                    animate={{
                      opacity: isTransitioning ? 0 : 1,
                      y: isTransitioning ? -4 : 0,
                    }}
                    transition={{
                      duration: WORD_FADE_MS / 1000,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    {activePhrase}
                  </m.span>
                )}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-[58ch] text-pretty">
              {localize(heroData.sub, locale)}
            </p>

            {/* Primary Action & Status-Aware Recruitment Notice */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <CTAButton
                label={localize(heroData.ctaPrimary, locale)}
                variant="primary"
                href="#team-carousel"
                icon={ArrowRight}
                onClick={scrollToTeam}
                className="min-h-[48px] px-8 text-base shadow-sm justify-center"
              />
              <Link
                href="/recruitment"
                className="inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-xs sm:text-sm text-foreground hover:border-primary/40 hover:bg-muted/40 transition-colors min-h-[48px]"
              >
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground/85">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" aria-hidden />
                  {isVi ? "Đợt tuyển thành viên: Tạm đóng đơn" : "Recruitment: Round Closed"}
                </span>
                <span className="font-semibold text-primary shrink-0">
                  {isVi ? "Xem thông báo" : "View Notice"} →
                </span>
              </Link>
            </div>

            {/* Proof Metrics Strip */}
            <div className="pt-4 border-t border-border grid grid-cols-3 gap-3 max-w-lg">
              {proofStats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <p className="text-xl sm:text-2xl font-black text-primary tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Real Workshop & Competition Visual Proof */}
          <div className="relative">
            {/* Main Featured Photo Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src="/Images/Achievements/FTC 2024-2025/Image  (1).webp"
                  alt={
                    isVi
                      ? "Đội Robotics Sóc Sơn bên robot thi đấu FIRST Tech Challenge"
                      : "Robotics Sóc Sơn team with competition robot at FIRST Tech Challenge"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 text-xs">
                <div className="flex items-center gap-2 font-medium text-foreground/85">
                  <Trophy className="h-4 w-4 text-primary shrink-0" aria-hidden />
                  <span>
                    {isVi
                      ? "FIRST Tech Challenge Vietnam • Robot #33518"
                      : "FIRST Tech Challenge Vietnam • Robot #33518"}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  2024–2025
                </span>
              </div>
            </div>

            {/* Supporting Workshop Note Card (Desktop inset) */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 rounded-xl border border-border bg-card/95 backdrop-blur-md p-3 shadow-md max-w-xs">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                <Image
                  src="/Images/Mission/Image (2).webp"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-foreground inline-flex items-center gap-1.5">
                  <Wrench className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {isVi ? "Xưởng chế tạo cơ khí" : "Hardware Workshop"}
                </p>
                <p className="text-xs text-muted-foreground leading-tight truncate">
                  {isVi ? "THPT Sóc Sơn, Hà Nội" : "Soc Son High School, Hanoi"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
