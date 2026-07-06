"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseProblemCards, courseProblemProse, courseSectionCopy } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";

export default function CourseProblem() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.problem;

  return (
    <FadeInSection
      id="course-problem"
      className="py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(copy.title, locale)}
          subtitle={getLocalized(copy.subtitle, locale)}
          badge={copy.badge ? getLocalized(copy.badge, locale) : undefined}
        />
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courseProblemCards.map((card) => {
            const Icon = getLucideIcon(card.icon ?? "Circle");
            return (
              <div
                key={card.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition-colors hover:border-primary/30"
              >
                <Icon className="h-8 w-8 text-primary mb-4" aria-hidden />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {getLocalized(card.title, locale)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {getLocalized(card.description, locale)}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-8 max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {getLocalized(courseProblemProse, locale)}
        </p>
      </div>
    </FadeInSection>
  );
}
