"use client";

import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseFaq, courseFaqSectionCopy } from "@/data/courseFaq";
import { getLocalized } from "@/lib/course/getLocalized";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function CourseFAQ() {
  const { locale } = useLanguage();
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const current = detailsRefs.current[index];
    if (!current?.open) return;

    detailsRefs.current.forEach((el, i) => {
      if (i !== index && el) {
        el.open = false;
      }
    });
  };

  return (
    <FadeInSection id="course-faq" className="py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={getLocalized(courseFaqSectionCopy.title, locale)}
          subtitle={getLocalized(courseFaqSectionCopy.subtitle, locale)}
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {courseFaq.map((item, index) => (
            <details
              key={item.id}
              ref={(el) => {
                detailsRefs.current[index] = el;
              }}
              onToggle={() => handleToggle(index)}
              className={cn(
                "group rounded-xl border border-border bg-muted/50 overflow-hidden",
                "open:border-primary/30 transition-colors"
              )}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 sm:p-5 min-h-[44px] font-medium text-foreground marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                <span>{getLocalized(item.question, locale)}</span>
                <span
                  className="text-primary text-lg shrink-0 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div className="px-4 sm:px-5 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/0 group-open:border-border group-open:pt-4">
                {getLocalized(item.answer, locale)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
