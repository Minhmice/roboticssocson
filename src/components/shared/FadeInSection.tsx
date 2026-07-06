"use client";

import { motion, useReducedMotion } from "framer-motion";
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.section>
  );
}
