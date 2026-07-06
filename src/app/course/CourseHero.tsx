"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlassButton } from "@/components/ui/glass-button";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseHeroData } from "@/data/courseHero";
import { getLocalized } from "@/lib/course/getLocalized";
import { Sparkles } from "lucide-react";

export default function CourseHero() {
  const { locale } = useLanguage();

  return (
    <AuroraBackground className="bg-background text-foreground">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <GlassButton
              type="button"
              size="sm"
              contentClassName="inline-flex items-center gap-2"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm">
                {getLocalized(courseHeroData.badge, locale)}
              </span>
            </GlassButton>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight text-balance">
              {getLocalized(courseHeroData.headline, locale)}
            </h1>

            <p className="text-lg sm:text-xl text-foreground/90 max-w-[65ch] mx-auto lg:mx-0">
              {getLocalized(courseHeroData.parentHook, locale)}
            </p>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-[65ch] mx-auto lg:mx-0">
              {getLocalized(courseHeroData.subtitle, locale)}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {courseHeroData.badges.map((badge) => (
                <span
                  key={badge.vi}
                  className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs sm:text-sm text-cyan-300"
                >
                  {getLocalized(badge, locale)}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center pt-2">
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

          <div className="min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
            <MediaPlaceholder
              type="image"
              className="h-full min-h-[280px] sm:min-h-[320px]"
              caption={
                locale === "vi"
                  ? "Scratch, mBlock và Arduino — minh hoạ khóa học"
                  : "Scratch, mBlock and Arduino — course visual"
              }
            />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
