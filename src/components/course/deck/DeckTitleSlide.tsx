"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Cpu, Blocks } from "lucide-react";
import type { LocalizedText } from "@/lib/course/getLocalized";
import { getLocalized } from "@/lib/course/getLocalized";
import { useLanguage } from "@/contexts/LanguageContext";
import { deckRevealStagger } from "@/components/course/deck/deck-motion";
import { deckType } from "@/components/course/deck/deck-typography";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/Images/Course/capstone-hero.webp";

type DeckTitleSlideProps = {
  title: string;
  subtitle?: string;
  kicker?: LocalizedText;
};

function DeckGridBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-50",
        className,
      )}
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 30% 50%, black 15%, transparent 75%)",
      }}
    />
  );
}

function FloatingBlocks({ reduced }: { reduced: boolean }) {
  const blocks = [
    { icon: Blocks, top: "18%", left: "12%", delay: 0 },
    { icon: Cpu, top: "62%", left: "78%", delay: 0.4 },
    { icon: Blocks, top: "72%", left: "22%", delay: 0.2 },
  ] as const;

  return (
    <>
      {blocks.map(({ icon: Icon, top, left, delay }, i) => (
        <motion.div
          key={i}
          className="absolute flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-white/90 text-primary shadow-md shadow-primary/10"
          style={{ top, left }}
          data-deck-ambient={reduced ? undefined : "float"}
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  opacity: { delay: 0.35 + delay, duration: 0.48 },
                  scale: { delay: 0.35 + delay, duration: 0.48, ease: [0.16, 1, 0.3, 1] },
                }
          }
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </motion.div>
      ))}
    </>
  );
}

export function DeckTitleSlide({
  title,
  subtitle,
  kicker,
}: DeckTitleSlideProps) {
  const { locale } = useLanguage();
  const reduced = Boolean(useReducedMotion());
  const kickerText = kicker
    ? getLocalized(kicker, locale)
    : getLocalized(
        {
          vi: "Robotics Sóc Sơn · Trình chiếu nội bộ",
          en: "Robotics Sóc Sơn · Internal deck",
        },
        locale,
      );

  return (
    <div
      className="relative h-full min-h-0 w-full overflow-hidden bg-background text-foreground"
      data-deck-fm-scope
    >
      <DeckGridBackdrop />

      <div
        className="pointer-events-none absolute -left-1/4 top-0 size-[70%] rounded-full bg-primary/[0.08] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 size-[55%] rounded-full bg-accent/60 blur-[90px]"
        aria-hidden
      />

      <div className="relative grid h-full min-h-0 grid-rows-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:grid-cols-[1.05fr_0.95fr] md:grid-rows-1">
        <div className="relative min-h-0 overflow-hidden md:order-2" data-deck-ambient={reduced ? undefined : "drift"}>
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent md:bg-gradient-to-l md:from-background md:via-background/30 md:to-transparent" />
          <FloatingBlocks reduced={reduced} />

          <div className="absolute bottom-4 right-4 hidden rounded-lg border border-border bg-white/90 px-3 py-2 text-xs text-foreground/80 shadow-sm backdrop-blur-sm md:block">
            <span className="font-mono font-medium text-primary">mBlock</span>
            <span className="text-muted-foreground"> → </span>
            <span className="font-mono">Arduino</span>
            <span className="text-muted-foreground"> → </span>
            <span>Robot</span>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-col justify-center gap-5 px-7 py-8 sm:px-10 md:order-1 md:px-12 lg:px-14">
          <motion.p
            className="text-sm font-medium tracking-wide text-primary"
            custom={0}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {kickerText}
          </motion.p>

          <motion.h1
            className={cn("max-w-[14ch]", deckType.display)}
            custom={1}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {title}
          </motion.h1>

          {subtitle ? (
            <motion.p
              className={cn("max-w-[30ch]", deckType.subhead)}
              custom={2}
              variants={deckRevealStagger}
              initial={reduced ? false : "hidden"}
              animate="show"
            >
              {subtitle}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-1 flex flex-wrap gap-2"
            custom={3}
            variants={deckRevealStagger}
            initial={reduced ? false : "hidden"}
            animate="show"
          >
            {[
              getLocalized({ vi: "Khối lệnh", en: "Blocks" }, locale),
              getLocalized({ vi: "Phần cứng", en: "Hardware" }, locale),
              getLocalized({ vi: "Robot thật", en: "Real robots" }, locale),
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-accent/50 px-2.5 py-1 text-xs font-medium text-foreground/90"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <Image
        src="/Logo/RBS Logo.svg"
        alt="Robotics Sóc Sơn"
        width={120}
        height={32}
        className="pointer-events-none absolute bottom-4 left-5 h-7 w-auto opacity-70 sm:left-7"
        style={{ height: "1.75rem", width: "auto" }}
      />
    </div>
  );
}
