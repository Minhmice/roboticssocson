"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { deckRevealStagger } from "@/components/course/deck/deck-motion";
import { deckType } from "@/components/course/deck/deck-typography";

type DeckSectionSlideProps = {
  section?: string;
  title: string;
  subtitle?: string;
  sectionIndex?: number;
  imageSrc?: string;
  imageAlt?: string;
};

export function DeckSectionSlide({
  section,
  title,
  subtitle,
  sectionIndex,
  imageSrc,
  imageAlt,
}: DeckSectionSlideProps) {
  const { locale } = useLanguage();
  const reduced = Boolean(useReducedMotion());
  const ghostNum =
    sectionIndex !== undefined
      ? String(sectionIndex).padStart(2, "0")
      : null;

  return (
    <div
      className="relative grid h-full min-h-0 w-full grid-rows-[minmax(0,1fr)_minmax(0,0.55fr)] overflow-hidden bg-accent/40 md:grid-cols-[1fr_1.05fr] md:grid-rows-1"
      data-deck-fm-scope
    >
      <div className="relative flex flex-col items-center justify-center px-8 py-8 text-center sm:px-12 md:items-start md:text-left">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_30%_45%,rgba(37,99,235,0.12),transparent_70%)]"
          aria-hidden
        />

        {ghostNum ? (
          <span
            className="pointer-events-none absolute left-4 top-4 select-none text-[clamp(5rem,18vw,10rem)] font-bold leading-none text-primary/[0.07] md:left-8"
            aria-hidden
          >
            {ghostNum}
          </span>
        ) : null}

        <div className="relative flex max-w-xl flex-col items-center gap-2.5 sm:gap-3 md:items-start">
          {section ? (
            <motion.span
              className={deckType.chip}
              custom={0}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {section}
            </motion.span>
          ) : null}

          <motion.h2
            className={cn("max-w-[14ch]", deckType.display)}
            custom={1}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {title}
          </motion.h2>

          {subtitle ? (
            <motion.p
              className={cn(
                "max-w-[28ch]",
                deckType.subhead,
                "leading-snug md:leading-snug",
              )}
              custom={2}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {subtitle}
            </motion.p>
          ) : null}

          <motion.p
            className={cn(deckType.caption, "text-foreground/80")}
            custom={3}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {getLocalized(
              {
                vi: "Góc nhìn đội Robotics Sóc Sơn",
                en: "Robotics Sóc Sơn team perspective",
              },
              locale,
            )}
          </motion.p>
        </div>
      </div>

      {imageSrc ? (
        <div className="relative min-h-[140px] overflow-hidden border-t border-border md:border-l md:border-t-0">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent md:bg-gradient-to-l md:from-background/25 md:via-transparent md:to-transparent" />
        </div>
      ) : null}
    </div>
  );
}
