"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseFaq, courseFaqSectionCopy } from "@/data/courseFaq";
import { getLocalized } from "@/lib/course/getLocalized";
import {
  COURSE_SCROLL_VIEWPORT,
  COURSE_SCROLL_VIEWPORT_DEEP,
} from "@/lib/course/scrollReveal";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const FAQ_STAGGER_MS = 40;
const FAQ_STAGGER_CAP = 9;

const motionEase = [0.25, 1, 0.5, 1] as const;

function CourseFaqToggle() {
  return (
    <span
      className={cn(
        "relative mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full",
        "border border-primary/20 bg-primary/[0.06] text-primary",
        "transition-[transform,background-color,border-color,box-shadow] duration-220 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "group-hover/faq:border-primary/40 group-hover/faq:bg-primary/[0.09]",
        "group-data-[state=open]/faq:scale-105 group-data-[state=open]/faq:border-primary/40",
        "group-data-[state=open]/faq:bg-primary/[0.14] group-data-[state=open]/faq:shadow-[0_0_0_3px_rgba(37,99,235,0.1),0_2px_8px_rgba(37,99,235,0.12)]",
      )}
      aria-hidden
    >
      <span className="relative block size-3.5">
        <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-current" />
        <span
          className={cn(
            "absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-sm bg-current",
            "transition-[transform,opacity] duration-280 ease-[cubic-bezier(0.25,1,0.5,1)]",
            "group-data-[state=open]/faq:scale-x-0 group-data-[state=open]/faq:opacity-0",
          )}
        />
      </span>
    </span>
  );
}

export default function CourseFAQ() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [openValue, setOpenValue] = useState<string>("");

  return (
    <section id="course-faq" className="py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={COURSE_SCROLL_VIEWPORT_DEEP}
          transition={{ duration: 0.4, ease: motionEase }}
        >
          <SectionHeader
            title={getLocalized(courseFaqSectionCopy.title, locale)}
            subtitle={getLocalized(courseFaqSectionCopy.subtitle, locale)}
          />
        </motion.div>

        <Accordion
          type="single"
          collapsible
          value={openValue}
          onValueChange={setOpenValue}
          className="mx-auto flex max-w-3xl flex-col gap-3"
        >
          {courseFaq.map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={COURSE_SCROLL_VIEWPORT}
              transition={{
                duration: 0.35,
                delay: prefersReducedMotion
                  ? 0
                  : Math.min(index, FAQ_STAGGER_CAP) * (FAQ_STAGGER_MS / 1000),
                ease: motionEase,
              }}
            >
              <AccordionItem
                value={item.id}
                className={cn(
                  "group/faq overflow-hidden rounded-xl border border-border bg-muted/50 border-b",
                  "transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  "data-[state=open]:border-primary/30 data-[state=open]:bg-card",
                  "data-[state=open]:shadow-[0_4px_20px_rgba(37,99,235,0.08)]",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "flex cursor-pointer items-start justify-between gap-3 p-4 font-medium text-foreground sm:gap-4 sm:p-5",
                    "min-h-11 hover:no-underline hover:bg-primary/[0.04]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "motion-safe:active:scale-[0.998] [&>svg]:hidden",
                  )}
                >
                  <span className="min-w-0 flex-1 pt-1.5 text-pretty leading-snug sm:pt-1">
                    {getLocalized(item.question, locale)}
                  </span>
                  <CourseFaqToggle />
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0 pt-0">
                  <div className="w-full px-4 pb-5 text-left text-sm leading-relaxed text-pretty text-foreground/85 sm:px-5">
                    {getLocalized(item.answer, locale)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
