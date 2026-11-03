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
import { useBootAnimationReady } from "@/contexts/BootRevealContext";
import { Award, ArrowRight, HeartHandshake, Wrench, Trophy } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WORD_DISPLAY_MS = 3200;
const WORD_FADE_MS = 240;

export default function Hero() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const photoColumnRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const noteCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const animationReady = useBootAnimationReady();

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

  useGSAP(
    () => {
      if (!animationReady) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            badgeRef.current,
            headlineRef.current,
            subRef.current,
            ctaRowRef.current,
            statsRef.current,
            photoCardRef.current,
            noteCardRef.current,
          ],
          { autoAlpha: 1, y: 0, scale: 1, clearProps: "all" }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: -10, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }
        )
          .fromTo(
            headlineRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.65 },
            "-=0.35"
          )
          .fromTo(
            subRef.current,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
            "-=0.4"
          )
          .fromTo(
            ctaRowRef.current,
            { autoAlpha: 0, y: 12, scale: 0.98 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
            "-=0.35"
          )
          .fromTo(
            statsRef.current?.children ?? [],
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
            "-=0.3"
          )
          .fromTo(
            photoCardRef.current,
            { autoAlpha: 0, scale: 0.94, rotation: 1.2 },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            noteCardRef.current,
            { autoAlpha: 0, x: -20, y: 16 },
            { autoAlpha: 1, x: 0, y: 0, duration: 0.6, ease: "back.out(1.5)" },
            "-=0.4"
          );

        // Idle floating on note card
        if (noteCardRef.current) {
          gsap.to(noteCardRef.current, {
            y: -6,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // Parallax on scroll
        if (heroRef.current) {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            animation: gsap
              .timeline()
              .to(photoColumnRef.current, { yPercent: 10, ease: "none" }, 0)
              .to(noteCardRef.current, { yPercent: -14, ease: "none" }, 0)
              .to(textColumnRef.current, { yPercent: -4, opacity: 0.9, ease: "none" }, 0),
          });
        }
      });

      return () => mm.revert();
    },
    { dependencies: [animationReady], scope: heroRef }
  );

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = photoCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 8,
      rotationX: -y * 8,
      transformPerspective: 1000,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = () => {
    if (reduced) return;
    const card = photoCardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

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
    <AuroraBackground ref={heroRef} className="bg-background text-foreground py-10 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16">
          {/* Left Column — Briefing & Actions */}
          <div ref={textColumnRef} className="space-y-6 text-left">
            {/* Status Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm"
            >
              <Award className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{localize(heroData.badge, locale)}</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,4.5vw,3.5rem)] font-black tracking-[-0.025em] text-foreground leading-[1.08] text-balance"
            >
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
            <p ref={subRef} className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-[58ch] text-pretty">
              {localize(heroData.sub, locale)}
            </p>

            {/* Primary Action & Sponsor CTA */}
            <div ref={ctaRowRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <CTAButton
                label={localize(heroData.ctaPrimary, locale)}
                variant="primary"
                href="#team-carousel"
                icon={ArrowRight}
                onClick={scrollToTeam}
                className="min-h-[48px] px-8 text-base shadow-sm justify-center"
              />
              <Link
                href="/fundraising"
                className="group inline-flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-xs sm:text-sm text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 min-h-[48px] shadow-sm hover:shadow-glow-blue active:scale-[0.98]"
              >
                <span className="inline-flex items-center gap-2 font-semibold text-foreground/90">
                  <HeartHandshake className="h-4 w-4 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  {isVi ? "Tài trợ cho đội tuyển" : "Sponsor the Team"}
                </span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </div>

            {/* Proof Metrics Strip */}
            <div ref={statsRef} className="pt-4 border-t border-border grid grid-cols-3 gap-3 max-w-lg">
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
          <div ref={photoColumnRef} className="relative">
            {/* Main Featured Photo Card with Double-Bezel Architecture & 3D Tilt */}
            <div
              ref={photoCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative p-2 rounded-[2rem] border border-border/80 bg-muted/40 shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] border border-border bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
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
                      FIRST Tech Challenge Vietnam • Robot #33518
                    </span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    2024–2025
                  </span>
                </div>
              </div>
            </div>

            {/* Supporting Workshop Note Card (Desktop inset) */}
            <div
              ref={noteCardRef}
              className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-3 shadow-lg max-w-xs ring-1 ring-black/5"
            >
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
