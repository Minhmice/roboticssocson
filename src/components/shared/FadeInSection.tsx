"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  COURSE_SCROLL_VIEWPORT,
  EASE_OUT_QUART,
  ENTER_DURATION,
} from "@/lib/course/scrollReveal";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function FadeInSection({ children, className, id }: FadeInSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={COURSE_SCROLL_VIEWPORT}
      transition={{
        duration: ENTER_DURATION,
        ease: EASE_OUT_QUART,
      }}
    >
      {children}
    </motion.section>
  );
}
