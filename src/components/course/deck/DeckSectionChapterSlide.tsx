"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  deckChapterBandReveal,
  deckChapterRuleReveal,
  deckRevealStagger,
} from "@/components/course/deck/deck-motion";
import { deckType } from "@/components/course/deck/deck-typography";
import { cn } from "@/lib/utils";

type DeckSectionChapterSlideProps = {
  section?: string;
  title: string;
  subtitle?: string;
  slideNumber: number;
  imageSrc?: string;
  imageAlt?: string;
};

function QuotedAccentTitle({ title }: { title: string }) {
  const segments = title.split(/("[^"]+")/);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.startsWith('"') && segment.endsWith('"')) {
          const word = segment.slice(1, -1);
          return (
            <span
              key={index}
              className="relative mx-1 inline-block rounded-xl bg-primary/14 px-3 py-1 font-extrabold tracking-[-0.02em] text-primary"
            >
              {word}
            </span>
          );
        }
        return (
          <span key={index} className="font-bold">
            {segment}
          </span>
        );
      })}
    </>
  );
}

export function DeckSectionChapterSlide({
  section,
  title,
  subtitle,
  slideNumber,
  imageSrc,
  imageAlt,
}: DeckSectionChapterSlideProps) {
  const reduced = Boolean(useReducedMotion());
  const ghostNum = String(slideNumber).padStart(2, "0");

  return (
    <div className="relative grid h-full min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,0.58fr)] overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_28%,rgba(37,99,235,0.1),transparent_68%)]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2 select-none text-[clamp(6rem,22vw,12rem)] font-bold leading-none text-primary/6"
        aria-hidden
      >
        {ghostNum}
      </span>

      <div className="relative flex flex-col items-center justify-center px-12 py-10 text-center">
        <div className="flex max-w-4xl flex-col items-center gap-5">
          {section ? (
            <motion.span
              className={cn(deckType.chip, "px-4 py-1.5 text-lg")}
              custom={0}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {section}
            </motion.span>
          ) : null}

          <motion.h2
            className={cn(
              deckType.display,
              "max-w-[18ch] text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.02]",
            )}
            custom={section ? 1 : 0}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            <QuotedAccentTitle title={title} />
          </motion.h2>

          {subtitle ? (
            <motion.p
              className={cn(
                deckType.subhead,
                "max-w-[32ch] text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium text-foreground/78",
              )}
              custom={section ? 2 : 1}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {subtitle}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-2 h-0.5 w-[min(12rem,40vw)] origin-center rounded-full bg-primary/35"
            custom={section ? 3 : 2}
            variants={deckChapterRuleReveal}
            initial={reduced ? false : "hidden"}
            animate="show"
            aria-hidden
          />
        </div>
      </div>

      {imageSrc ? (
        <motion.div
          className="relative min-h-[240px] overflow-hidden border-t-2 border-primary/25 shadow-[0_-12px_40px_rgba(15,23,42,0.08)]"
          custom={0}
          variants={deckChapterBandReveal}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10"
            aria-hidden
          />
        </motion.div>
      ) : null}
    </div>
  );
}
