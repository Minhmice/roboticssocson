"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { GlowCard } from "@/components/shared/GlowCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  courseAiClosingLine,
  courseAiUsageCards,
  courseSectionCopy,
} from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";

export default function CourseAIUsage() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.ai;

  return (
    <FadeInSection
      id="course-ai"
      className="py-12 sm:py-16 md:py-24 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(copy.title, locale)}
          subtitle={getLocalized(copy.subtitle, locale)}
        />
        <GlowCard hover={false} className="max-w-4xl mx-auto">
          <ul className="grid gap-4 sm:grid-cols-2">
            {courseAiUsageCards.map((item) => {
              const Icon = getLucideIcon(item.icon ?? "Bot");
              return (
                <li key={item.id} className="flex gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <h3 className="font-medium text-foreground text-sm">
                      {getLocalized(item.title, locale)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {getLocalized(item.description, locale)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 pt-6 border-t border-border text-sm font-medium text-foreground">
            {getLocalized(courseAiClosingLine, locale)}
          </p>
        </GlowCard>
      </div>
    </FadeInSection>
  );
}
