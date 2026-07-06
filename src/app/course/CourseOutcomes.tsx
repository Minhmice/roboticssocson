"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseOutcomeCards, courseSectionCopy } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";

export default function CourseOutcomes() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.outcomes;

  return (
    <FadeInSection
      id="course-outcomes"
      className="py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(copy.title, locale)}
          subtitle={getLocalized(copy.subtitle, locale)}
        />
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courseOutcomeCards.map((card) => {
            const Icon = getLucideIcon(card.icon ?? "Circle");
            return (
              <GlowCard key={card.id} className="h-full">
                <Icon className="h-7 w-7 text-primary mb-3" aria-hidden />
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {getLocalized(card.title, locale)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getLocalized(card.description, locale)}
                </p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </FadeInSection>
  );
}
