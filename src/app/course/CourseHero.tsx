"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseHeroData } from "@/data/courseHero";
import { getLocalized } from "@/lib/course/getLocalized";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function CourseHero() {
  const { locale } = useLanguage();

  return (
    <AuroraBackground
      fillViewport={false}
      className="min-h-0 bg-background text-foreground"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-5 text-center lg:text-left">
            <p className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary mx-auto lg:mx-0">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
              {getLocalized(courseHeroData.badge, locale)}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.12] text-balance">
              {getLocalized(courseHeroData.headline, locale)}
            </h1>

            <p className="text-base sm:text-lg text-foreground max-w-[65ch] mx-auto lg:mx-0 leading-relaxed text-pretty">
              {getLocalized(courseHeroData.lead, locale)}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {courseHeroData.chips.map((chip) => (
                <span
                  key={chip.vi}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs sm:text-sm text-foreground"
                >
                  {getLocalized(chip, locale)}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center pt-1">
              <CTAButton
                label={getLocalized(courseHeroData.ctaPrimary, locale)}
                variant="primary"
                href="#course-curriculum"
                className="flex-1 sm:flex-none text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
              />
              <CTAButton
                label={getLocalized(courseHeroData.ctaSecondary, locale)}
                variant="secondary"
                href="#course-register"
                className="flex-1 sm:flex-none text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px]"
              />
            </div>
          </div>

          <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
            <MediaPlaceholder
              type="image"
              src={courseHeroData.heroImage.src}
              alt={getLocalized(courseHeroData.heroImage.alt, locale)}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full min-h-[280px] sm:min-h-[320px] shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            />
            <div
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
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
