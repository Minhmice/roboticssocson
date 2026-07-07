"use client";

import {
  useState,
  useEffect,
  useCallback,
  useId,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { ImageGallery } from "@/components/shared/ImageGallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ftcFeatures, ftcStats, ftcHeader } from "@/data/aboutFTC";
import { Pause, Play } from "lucide-react";

const SLIDE_INTERVAL_MS = 8000;
const PAUSE_AFTER_SELECT_MS = 6000;
const PANEL_IN_MS = 0.26;
const EASE_OUT = [0.25, 1, 0.5, 1] as const;

export default function AboutFTCSection() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const rootId = useId();
  const pauseTimeoutRef = useRef<number | null>(null);

  const activeFeature = ftcFeatures[activeIndex];
  const ActiveIcon = activeFeature.icon;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setIsMobile(mq.matches);
      setAutoAdvanceEnabled(mq.matches ? false : true);
    };

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    if (isMobile && !autoAdvanceEnabled) return;

    const id = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ftcFeatures.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearTimeout(id);
  }, [activeIndex, autoAdvanceEnabled, isMobile, isPaused, prefersReducedMotion]);

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(
      () => setIsPaused(false),
      PAUSE_AFTER_SELECT_MS,
    );
  }, []);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        window.clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const featureIds = useMemo(
    () =>
      ftcFeatures.map((_, idx) => ({
        tab: `${rootId}-ftc-tab-${idx}`,
        panel: `${rootId}-ftc-panel-${idx}`,
      })),
    [rootId],
  );

  const moveFocusToTab = useCallback(
    (nextIdx: number) => {
      const el = document.getElementById(featureIds[nextIdx]?.tab ?? "");
      if (el instanceof HTMLButtonElement) el.focus();
    },
    [featureIds],
  );

  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
      if (
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Home" &&
        e.key !== "End"
      ) {
        return;
      }

      e.preventDefault();
      const max = ftcFeatures.length - 1;
      const nextIdx =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? max
            : e.key === "ArrowLeft"
              ? (idx - 1 + ftcFeatures.length) % ftcFeatures.length
              : (idx + 1) % ftcFeatures.length;

      setActiveIndex(nextIdx);
      moveFocusToTab(nextIdx);
    },
    [moveFocusToTab],
  );

  return (
    <section id="about-ftc" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title={locale === "vi" ? ftcHeader.title_vi : ftcHeader.title_en}
          subtitle={
            locale === "vi" ? ftcHeader.subtitle_vi : ftcHeader.subtitle_en
          }
          align="center"
        />

        <div className="mt-6">
          <GlowCard hover={false} className="h-full overflow-hidden">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {/* Mobile segmented tabs */}
              <div className="md:hidden" onFocus={pause} onBlur={resume}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    {locale === "vi" ? "Chủ đề" : "Topics"}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                        "min-h-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        autoAdvanceEnabled
                          ? "border-primary/25 bg-primary/5 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:text-foreground",
                      )}
                      onClick={() => setAutoAdvanceEnabled((v) => !v)}
                      aria-pressed={autoAdvanceEnabled}
                      aria-label={
                        locale === "vi"
                          ? autoAdvanceEnabled
                            ? "Tắt tự chuyển chủ đề"
                            : "Bật tự chuyển chủ đề"
                          : autoAdvanceEnabled
                            ? "Disable auto-advance"
                            : "Enable auto-advance"
                      }
                    >
                      {autoAdvanceEnabled ? (
                        <Pause className="h-3.5 w-3.5 text-primary" aria-hidden />
                      ) : (
                        <Play className="h-3.5 w-3.5 text-primary" aria-hidden />
                      )}
                      {locale === "vi" ? "Tự chuyển" : "Auto"}
                    </button>

                    {!prefersReducedMotion &&
                      !isPaused &&
                      (!isMobile || autoAdvanceEnabled) && (
                        <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            key={activeIndex}
                            className="h-full w-full origin-left bg-primary/60"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: SLIDE_INTERVAL_MS / 1000,
                              ease: "linear",
                            }}
                          />
                        </div>
                      )}
                  </div>
                </div>

                <div className="relative">
                  <div
                    role="tablist"
                    aria-label={locale === "vi" ? "Chủ đề FTC" : "FTC topics"}
                    className="relative flex w-full max-w-full min-w-0 gap-2 overflow-x-auto pb-1 pr-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    onPointerDown={pause}
                    onPointerUp={resume}
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                  >
                    {ftcFeatures.map((feature, idx) => {
                      const title =
                        locale === "vi" ? feature.title_vi : feature.title_en;
                      const isActive = idx === activeIndex;

                      return (
                        <button
                          key={feature.title_en}
                          id={featureIds[idx]?.tab}
                          role="tab"
                          type="button"
                          aria-selected={isActive}
                          aria-controls={featureIds[idx]?.panel}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => handleSelect(idx)}
                          onKeyDown={(e) => handleTabKeyDown(e, idx)}
                          className={cn(
                            "relative isolate shrink-0 rounded-full border px-3 py-2 text-left text-xs font-medium leading-snug transition-colors",
                            "min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            isActive
                              ? "border-primary/25 bg-primary/10 text-foreground"
                              : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/60",
                          )}
                        >
                          {isActive && animated && (
                            <motion.span
                              layoutId={`${rootId}-ftc-tab-highlight`}
                              className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                              transition={{ duration: 0.28, ease: EASE_OUT }}
                            />
                          )}
                          {title}
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-card to-transparent"
                    aria-hidden
                  />
                </div>
              </div>

              <div
                className="hidden md:block space-y-2"
                onMouseEnter={pause}
                onMouseLeave={resume}
                onFocus={pause}
                onBlur={resume}
              >
                <div
                  role="tablist"
                  aria-label={locale === "vi" ? "Chủ đề FTC" : "FTC topics"}
                  className="space-y-2"
                >
                  {ftcFeatures.map((feature, idx) => {
                    const Icon = feature.icon;
                    const isActive = idx === activeIndex;
                    const title =
                      locale === "vi" ? feature.title_vi : feature.title_en;

                    return (
                      <button
                        key={feature.title_en}
                        id={featureIds[idx]?.tab}
                        role="tab"
                        type="button"
                        onClick={() => handleSelect(idx)}
                        aria-selected={isActive}
                        aria-controls={featureIds[idx]?.panel}
                        tabIndex={isActive ? 0 : -1}
                        onKeyDown={(e) => handleTabKeyDown(e, idx)}
                        className={cn(
                          "relative w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left min-h-[44px]",
                          "transition-[border-color,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          isActive
                            ? "border-primary/25 bg-primary/5 shadow-[0_8px_24px_rgba(37,99,235,0.08)]"
                            : "border-border bg-card hover:bg-muted/60 hover:border-primary/20",
                        )}
                      >
                        {isActive && animated && (
                          <motion.span
                            layoutId={`${rootId}-ftc-list-highlight`}
                            className="absolute inset-0 rounded-xl bg-primary/6"
                            transition={{ duration: 0.28, ease: EASE_OUT }}
                            aria-hidden
                          />
                        )}
                        <span
                          className={cn(
                            "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                            isActive
                              ? "border-primary/20 bg-primary/10"
                              : "border-border bg-muted/40",
                          )}
                          aria-hidden
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4",
                              isActive ? "text-primary" : "text-muted-foreground",
                            )}
                          />
                        </span>
                        <span
                          className={cn(
                            "relative z-10 text-sm font-medium leading-snug text-pretty",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="min-w-0 md:col-span-2"
                onMouseEnter={pause}
                onMouseLeave={resume}
              >
                <div className="mb-3 hidden md:flex items-center justify-between gap-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    {locale === "vi" ? "Chi tiết" : "Details"}
                  </p>
                  {!prefersReducedMotion && !isPaused && (!isMobile || autoAdvanceEnabled) && (
                    <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        key={activeIndex}
                        className="h-full w-full origin-left bg-primary/60"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: SLIDE_INTERVAL_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}
                </div>

                {animated ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      id={featureIds[activeIndex]?.panel}
                      role="tabpanel"
                      aria-labelledby={featureIds[activeIndex]?.tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{
                        duration: PANEL_IN_MS,
                        ease: EASE_OUT,
                      }}
                      className="space-y-4"
                    >
                      <FeaturePanel
                        locale={locale}
                        feature={activeFeature}
                        Icon={ActiveIcon}
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="space-y-4">
                    <FeaturePanel
                      locale={locale}
                      feature={activeFeature}
                      Icon={ActiveIcon}
                    />
                  </div>
                )}
              </div>
            </div>
          </GlowCard>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {ftcStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label_en}
                className="rounded-xl border border-border bg-card/60 p-4 text-center"
              >
                <Icon
                  className="mx-auto mb-2 h-5 w-5 text-muted-foreground"
                  aria-hidden
                />
                <p className="text-xl font-semibold text-foreground tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {locale === "vi" ? stat.label_vi : stat.label_en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturePanel({
  locale,
  feature,
  Icon,
}: {
  locale: string;
  feature: (typeof ftcFeatures)[number];
  Icon: (typeof ftcFeatures)[number]["icon"];
}) {
  const title = locale === "vi" ? feature.title_vi : feature.title_en;
  const description =
    locale === "vi" ? feature.description_vi : feature.description_en;

  return (
    <>
      <div className="flex items-start gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08]"
          aria-hidden
        >
          <Icon className="h-5 w-5 text-primary" />
        </span>
        <h3 className="pt-1 text-xl font-semibold text-foreground text-balance sm:text-2xl">
          {title}
        </h3>
      </div>

      <div className="sm:hidden">
        <ImageGallery
          layout="1"
          animated={false}
          images={[
            {
              caption: feature.images[0]?.caption,
              src: feature.images[0]?.src,
            },
          ]}
        />
      </div>

      <div className="hidden sm:block">
        <ImageGallery
          layout={feature.imageLayout || "1"}
          animated={false}
          images={feature.images.map((img) => ({
            caption: img.caption,
            src: img.src,
          }))}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {locale === "vi" ? `${feature.images.length} ảnh` : `${feature.images.length} images`}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-foreground/85 text-pretty sm:text-base">
        {description}
      </p>
    </>
  );
}
