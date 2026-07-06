"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseSectionCopy, courseSolutionCards, courseSolutionProse } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";
import { Check } from "lucide-react";

export default function CourseSolution() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.solution;

  return (
    <FadeInSection
      id="course-solution"
      className="py-12 sm:py-16 md:py-24 bg-slate-950/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(copy.title, locale)}
          subtitle={getLocalized(copy.subtitle, locale)}
        />
        <p className="mb-8 max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/30 p-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {getLocalized(courseSolutionProse, locale)}
        </p>
        <ul className="max-w-3xl mx-auto space-y-4">
          {courseSolutionCards.map((item) => {
            const Icon = getLucideIcon(item.icon ?? "Check");
            return (
              <li
                key={item.id}
                className="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4 sm:p-5 transition-colors hover:border-primary/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-950/50">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" aria-hidden />
                    {getLocalized(item.title, locale)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {getLocalized(item.description, locale)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </FadeInSection>
  );
}
