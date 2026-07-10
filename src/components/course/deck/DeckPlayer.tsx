"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DeckSlideView } from "@/components/course/deck/DeckSlide";
import type { DeckSlide } from "@/data/arduinoMblockDeck";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";

const DECK_TITLE = {
  vi: "Arduino & mBlock — Trình chiếu Robotics",
  en: "Arduino & mBlock — Robotics Deck",
};

const LABELS = {
  exit: { vi: "Thoát", en: "Exit" },
  prev: { vi: "Slide trước", en: "Previous slide" },
  next: { vi: "Slide sau", en: "Next slide" },
  prevShort: { vi: "Trước", en: "Prev" },
  nextShort: { vi: "Sau", en: "Next" },
  hint: {
    vi: "Nhấn vùng trái / phải hoặc phím ← →",
    en: "Tap left / right or use ← → keys",
  },
  progress: { vi: "Tiến độ trình chiếu", en: "Presentation progress" },
};

interface DeckPlayerProps {
  slides: DeckSlide[];
  exitHref?: string;
}

export function DeckPlayer({ slides, exitHref = "/course" }: DeckPlayerProps) {
  const { locale } = useLanguage();
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (!slide) return null;

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 md:px-6">
        <span className="text-sm font-medium text-muted-foreground">
          {getLocalized(DECK_TITLE, locale)}
        </span>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm tabular-nums text-muted-foreground">
            {index + 1} / {total}
          </span>
          <Link
            href={exitHref}
            className="min-h-11 inline-flex items-center text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            {getLocalized(LABELS.exit, locale)}
          </Link>
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          aria-label={getLocalized(LABELS.prev, locale)}
          className={cn(
            "absolute inset-y-0 left-0 z-20 flex w-[18%] min-w-[56px] items-center justify-start pl-2",
            "bg-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
            index === 0 && "cursor-not-allowed opacity-40",
          )}
        >
          <span className="pointer-events-none flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <ChevronLeft className="size-4" aria-hidden />
            <span className="hidden md:inline">
              {getLocalized(LABELS.prevShort, locale)}
            </span>
          </span>
        </button>

        <main
          className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-[20%] py-8 md:py-12"
          aria-live="polite"
          aria-atomic
        >
          <DeckSlideView slide={slide} />
        </main>

        <button
          type="button"
          onClick={goNext}
          disabled={index === total - 1}
          aria-label={getLocalized(LABELS.next, locale)}
          className={cn(
            "absolute inset-y-0 right-0 z-20 flex w-[18%] min-w-[56px] items-center justify-end pr-2",
            "bg-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
            index === total - 1 && "cursor-not-allowed opacity-40",
          )}
        >
          <span className="pointer-events-none flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <span className="hidden md:inline">
              {getLocalized(LABELS.nextShort, locale)}
            </span>
            <ChevronRight className="size-4" aria-hidden />
          </span>
        </button>
      </div>

      <footer className="shrink-0 border-t border-border px-4 py-3 md:px-6">
        <div
          className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={getLocalized(LABELS.progress, locale)}
        >
          <div
            className="h-full bg-primary transition-[width] duration-200 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {getLocalized(LABELS.hint, locale)}
        </p>
      </footer>
    </div>
  );
}
