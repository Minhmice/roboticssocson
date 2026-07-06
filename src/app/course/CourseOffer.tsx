"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseOfferConfig } from "@/data/courseOffer";
import { getLocalized } from "@/lib/course/getLocalized";

export default function CourseOffer() {
  const { locale } = useLanguage();

  if (!courseOfferConfig.enabled) {
    return null;
  }

  return (
    <div className="bg-card border-y border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <p className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
          {getLocalized(courseOfferConfig.headline, locale)}
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          {getLocalized(courseOfferConfig.body, locale)}
        </p>
        <CTAButton
          label={getLocalized(courseOfferConfig.ctaLabel, locale)}
          variant="primary"
          href="#course-register"
          className="min-h-[44px]"
        />
      </div>
    </div>
  );
}
