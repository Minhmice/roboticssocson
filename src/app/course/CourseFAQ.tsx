"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseFaq, courseFaqSectionCopy } from "@/data/courseFaq";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const FAQ_STAGGER_MS = 40;
const FAQ_STAGGER_CAP = 9;

const motionEase = [0.25, 1, 0.5, 1] as const;

function CourseFaqToggle() {
  return (
    <span className="course-faq-toggle" aria-hidden>
      <span className="course-faq-toggle-icon">
        <span className="course-faq-toggle-bar course-faq-toggle-bar-h" />
        <span className="course-faq-toggle-bar course-faq-toggle-bar-v" />
      </span>
    </span>
  );
}

export default function CourseFAQ() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    const current = detailsRefs.current[index];
    if (!current) return;

    if (current.open) {
      detailsRefs.current.forEach((el, i) => {
        if (i !== index && el?.open) {
          el.open = false;
        }
      });
      setOpenIndex(index);
    } else {
      setOpenIndex((prev) => (prev === index ? null : prev));
    }
  };

  return (
    <section id="course-faq" className="py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: motionEase }}
        >
          <SectionHeader
            title={getLocalized(courseFaqSectionCopy.title, locale)}
            subtitle={getLocalized(courseFaqSectionCopy.subtitle, locale)}
          />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {courseFaq.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion
                    ? 0
                    : Math.min(index, FAQ_STAGGER_CAP) *
                      (FAQ_STAGGER_MS / 1000),
                  ease: motionEase,
                }}
              >
                <details
                  ref={(el) => {
                    detailsRefs.current[index] = el;
                  }}
                  onToggle={() => handleToggle(index)}
                  className={cn(
                    "course-faq-item group rounded-xl border border-border bg-muted/50 overflow-hidden",
                    "transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    "open:border-primary/30 open:bg-card open:shadow-[0_4px_20px_rgba(37,99,235,0.08)]"
                  )}
                >
                  <summary
                    aria-expanded={isOpen}
                    className={cn(
                      "course-faq-summary flex cursor-pointer list-none items-start justify-between gap-3 sm:gap-4",
                      "p-4 sm:p-5 min-h-[44px] font-medium text-foreground",
                      "marker:content-none focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "[&::-webkit-details-marker]:hidden",
                      "transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      "hover:bg-primary/[0.04] motion-safe:active:scale-[0.998]"
                    )}
                  >
                    <span className="min-w-0 flex-1 text-pretty leading-snug pt-1.5 sm:pt-1">
                      {getLocalized(item.question, locale)}
                    </span>
                    <CourseFaqToggle />
                  </summary>

                  <div className="course-faq-answer-panel">
                    <div className="course-faq-answer-inner">
                      <div className="course-faq-answer-content px-4 sm:px-5 pb-5 text-sm text-foreground/85 leading-relaxed text-center mx-auto max-w-prose">
                        {getLocalized(item.answer, locale)}
                      </div>
                    </div>
                  </div>
                </details>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
