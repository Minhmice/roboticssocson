"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { DeckSlideView } from "@/components/course/deck/DeckSlide";
import { animateDeckSlideTransition, useGSAP } from "@/components/course/deck/deck-gsap";
import { DECK_STAGE_BG } from "@/components/course/deck/deck-motion";
import { deckType } from "@/components/course/deck/deck-typography";
import type { DeckSlide } from "@/data/arduinoMblockDeck";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalized } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";

interface DeckPlayerProps {
  slides: DeckSlide[];
}

const DECK_SLIDE_STORAGE_KEY = "arduino-mblock-deck-slide";

function readStoredSlideIndex(total: number): number {
  if (typeof window === "undefined" || total < 1) return 0;
  try {
    const raw = localStorage.getItem(DECK_SLIDE_STORAGE_KEY);
    if (raw === null) return 0;
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed)) return 0;
    return Math.min(Math.max(0, parsed), total - 1);
  } catch {
    return 0;
  }
}

function formatSlideAnnounce(
  template: string,
  current: number,
  total: number,
  title: string,
): string {
  return template
    .replace("{current}", String(current))
    .replace("{total}", String(total))
    .replace("{title}", title);
}

function useDeckFullscreen(containerRef: React.RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [containerRef]);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement === el) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked by browser policy or user settings.
    }
  }, [containerRef]);

  return { isFullscreen, toggleFullscreen };
}

export function DeckPlayer({ slides }: DeckPlayerProps) {
  const { locale, t } = useLanguage();
  const reducedMotion = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useDeckFullscreen(rootRef);
  const total = slides.length;
  const [index, setIndex] = useState(() => readStoredSlideIndex(total));
  const [chromeVisible, setChromeVisible] = useState(false);
  const [direction, setDirection] = useState(0);
  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;
  const stageRef = useRef<HTMLDivElement>(null);
  const slideLayerRef = useRef<HTMLDivElement>(null);

  const slideTitle = slide
    ? getLocalized(slide.title, locale)
    : "";

  const liveMessage = useMemo(() => {
    if (!slide) return "";
    return formatSlideAnnounce(
      t("deck.player.slideAnnounce"),
      index + 1,
      total,
      slideTitle,
    );
  }, [index, slide, slideTitle, t, total]);

  const sectionPartIndices = useMemo(() => {
    const result: (number | undefined)[] = [];
    let part = 0;
    for (const s of slides) {
      if (s.layout.startsWith("section-")) {
        part += 1;
        result.push(part);
      } else {
        result.push(undefined);
      }
    }
    return result;
  }, [slides]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  useEffect(() => {
    try {
      localStorage.setItem(DECK_SLIDE_STORAGE_KEY, String(index));
    } catch {
      // ignore quota / private mode
    }
  }, [index]);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const showChrome = () => {
      setChromeVisible(true);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setChromeVisible(false), 2800);
    };

    const onKey = (e: KeyboardEvent) => {
      showChrome();
      if (e.repeat) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    showChrome();
    window.addEventListener("pointermove", showChrome);
    window.addEventListener("keydown", onKey);

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      window.removeEventListener("pointermove", showChrome);
      window.removeEventListener("keydown", onKey);
    };
  }, [goNext, goPrev]);

  useGSAP(
    () => {
      if (!slideLayerRef.current) return;
      animateDeckSlideTransition(slideLayerRef.current, direction, reducedMotion);
    },
    {
      dependencies: [index, direction, reducedMotion],
      scope: stageRef,
      revertOnUpdate: false,
    },
  );

  if (!slide) return null;

  return (
    <div
      ref={rootRef}
      className="relative h-dvh w-full overflow-hidden"
      style={{ backgroundColor: DECK_STAGE_BG }}
      role="region"
      aria-label={t("deck.player.regionLabel")}
      aria-roledescription={t("deck.player.roleDescription")}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>

      <div
        className="pointer-events-none absolute inset-0 motion-reduce:animate-none"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 size-[min(120vw,80vh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />
      </div>

      <button
        type="button"
        onClick={goPrev}
        disabled={index === 0}
        aria-label={t("deck.player.prev")}
        className={cn(
          "absolute inset-y-0 left-0 z-30 w-[18%] min-w-[48px]",
          "cursor-w-resize bg-transparent opacity-0",
          "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60",
          index === 0 && "pointer-events-none",
        )}
        tabIndex={index === 0 ? -1 : 0}
      />

      <button
        type="button"
        onClick={goNext}
        disabled={index === total - 1}
        aria-label={t("deck.player.next")}
        className={cn(
          "absolute inset-y-0 right-0 z-30 w-[18%] min-w-[48px]",
          "cursor-e-resize bg-transparent opacity-0",
          "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60",
          index === total - 1 && "pointer-events-none",
        )}
        tabIndex={index === total - 1 ? -1 : 0}
      />

      <div className="absolute inset-0 flex items-center justify-center p-0 sm:p-1">
        <div
          ref={stageRef}
          className="relative aspect-video h-auto max-h-full w-full max-w-[min(100vw,calc(100dvh*16/9))] overflow-hidden rounded-sm bg-background shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-border"
        >
          <div ref={slideLayerRef} className="absolute inset-0">
            <DeckSlideView
              slide={slide}
              sectionPartIndex={sectionPartIndices[index]}
            />
          </div>
        </div>
      </div>

      <footer
        className={cn(
          "pointer-events-none fixed right-3 top-3 z-40 sm:right-4 sm:top-4",
          "transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          chromeVisible ? "opacity-100" : "opacity-[0.35]",
        )}
      >
        <div
          className={cn(
            "group/chrome pointer-events-auto flex w-[min(9.5rem,28vw)] flex-col gap-1.5 rounded-xl border-2 border-border/60 bg-background/92 px-3 py-2 shadow-md backdrop-blur-sm",
            "transition-[border-color,box-shadow,width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
            "hover:border-primary/38 hover:shadow-[0_10px_28px_rgba(37,99,235,0.14)] hover:w-[min(11rem,32vw)]",
            "focus-within:border-primary/38 focus-within:shadow-[0_10px_28px_rgba(37,99,235,0.14)] focus-within:w-[min(11rem,32vw)]",
          )}
        >
          <div
            className="h-1 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={t("deck.player.progress")}
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
              }
            />
          </div>

          <div
            className={cn(
              "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              "grid-rows-[0fr] opacity-0",
              "group-hover/chrome:grid-rows-[1fr] group-hover/chrome:opacity-100",
              "group-focus-within/chrome:grid-rows-[1fr] group-focus-within/chrome:opacity-100",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                aria-label={t(isFullscreen ? "deck.player.exitFullscreen" : "deck.player.enterFullscreen")}
                aria-pressed={isFullscreen}
                className={cn(
                  "flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-primary/42 bg-primary/12 px-2.5 py-1.5",
                  "font-mono text-xs font-extrabold tracking-wide text-primary shadow-sm",
                  "transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  "hover:border-primary/55 hover:bg-primary/18 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                {isFullscreen ? (
                  <Minimize2 className="size-3.5 shrink-0" strokeWidth={2.35} aria-hidden />
                ) : (
                  <Maximize2 className="size-3.5 shrink-0" strokeWidth={2.35} aria-hidden />
                )}
                <span>{t(isFullscreen ? "deck.player.exitFullscreen" : "deck.player.enterFullscreen")}</span>
              </button>
            </div>
          </div>

          <p className={cn("text-right font-semibold", deckType.counter)}>
            {index + 1} / {total}
          </p>
        </div>
      </footer>
    </div>
  );
}
