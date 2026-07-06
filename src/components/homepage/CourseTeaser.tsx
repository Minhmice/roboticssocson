"use client";

import { CTAButton } from "@/components/shared/CTAButton";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseTeaserCopy, courseTeaserSteps } from "@/data/courseTeaser";
import { getLocalized } from "@/lib/course/getLocalized";
import { Blocks, Cpu, Target } from "lucide-react";

const stepIcons = [Blocks, Cpu, Target];

export default function CourseTeaser() {
  const { locale } = useLanguage();

  return (
    <FadeInSection
      id="course-teaser"
      className="py-12 sm:py-16 md:py-24 bg-muted/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(courseTeaserCopy.title, locale)}
          subtitle={getLocalized(courseTeaserCopy.subtitle, locale)}
          badge={getLocalized(courseTeaserCopy.badge, locale)}
        />

        <ol className="relative max-w-3xl mx-auto mb-10">
          {courseTeaserSteps.map((step, index) => {
            const Icon = stepIcons[index] ?? Blocks;
            return (
              <li
                key={step.id}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {index < courseTeaserSteps.length - 1 && (
                  <span
                    className="absolute left-5 top-10 bottom-0 w-px bg-muted hidden md:block"
                    aria-hidden
                  />
                )}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/50">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <div className="rounded-xl border border-border bg-muted/50 p-4 flex-1 transition-colors hover:border-primary/30">
                  <h3 className="font-semibold text-foreground">
                    {getLocalized(step.title, locale)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {getLocalized(step.description, locale)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="text-center">
          <CTAButton
            label={getLocalized(courseTeaserCopy.cta, locale)}
            variant="primary"
            href="/course"
            className="min-h-[44px] px-8"
          />
        </div>
      </div>
    </FadeInSection>
  );
}
