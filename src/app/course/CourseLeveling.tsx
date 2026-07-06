"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseLevelingCards, courseSectionCopy } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";

export default function CourseLeveling() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.leveling;

  return (
    <FadeInSection
      id="course-leveling"
      className="py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(copy.title, locale)}
          subtitle={getLocalized(copy.subtitle, locale)}
        />
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {courseLevelingCards.map((level) => {
            const Icon = getLucideIcon(level.icon ?? "Circle");
            return (
              <div
                key={level.id}
                className="rounded-2xl border border-border bg-muted/50 p-6 sm:p-8 transition-colors hover:border-primary/30"
              >
                <Icon className="h-8 w-8 text-primary mb-4" aria-hidden />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {getLocalized(level.title, locale)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {getLocalized(level.description, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </FadeInSection>
  );
}
