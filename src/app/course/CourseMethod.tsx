"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  courseMethodPhases,
  courseMethodSteps,
  courseSectionCopy,
} from "@/data/courseSections";
import { getLocalized, type CourseLocale } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Presentation } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-60px" } as const;
const STEP_COUNT = courseMethodSteps.length;
/** h-11 marker column — rail must pass through its center */
const MARKER_SIZE_REM = 2.75;
const MARKER_GAP_REM = 1;
const MARKER_RAIL_LEFT = `${MARKER_SIZE_REM / 2}rem`;
const PHASE_LABEL_OFFSET = `${MARKER_SIZE_REM + MARKER_GAP_REM}rem`;
/** Navbar offset (pt-16) + breathing room — matches layout shell */
const STICKY_TOP_REM = 6;
const STICKY_TOP = `${STICKY_TOP_REM}rem`;

const sectionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};

function interpolateLabel(
  template: { vi: string; en: string } | undefined,
  locale: CourseLocale,
  values: Record<string, string | number>
): string {
  if (!template) return "";
  let text = getLocalized(template, locale);
  for (const [key, value] of Object.entries(values)) {
    text = text.replace(`{${key}}`, String(value));
  }
  return text;
}

function stepAccentAlpha(index: number): number {
  return 0.35 + (index / (STEP_COUNT - 1)) * 0.65;
}

type RailItemProps = {
  stepId: string;
  index: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  animated: boolean;
  isActive: boolean;
  isPast: boolean;
  onActivate: (source: "input" | "scroll") => void;
  onStepKeyDown: (event: KeyboardEvent<HTMLLIElement>, index: number) => void;
  stepRef: (element: HTMLLIElement | null) => void;
};

function RailItem({
  stepId,
  index,
  title,
  description,
  Icon,
  animated,
  isActive,
  isPast,
  onActivate,
  onStepKeyDown,
  stepRef,
}: RailItemProps) {
  const titleId = `course-method-step-${stepId}-title`;
  const descriptionId = `course-method-step-${stepId}-description`;

  const stepNumber = String(index + 1).padStart(2, "0");
  const isChallenge = index === STEP_COUNT - 1;
  const accentAlpha = stepAccentAlpha(index);
  const isHighlighted = isActive;

  const markerClass = cn(
    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300 motion-reduce:transition-none",
    isChallenge
      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow-lg)]"
      : isHighlighted
        ? "border-primary bg-card text-primary shadow-[var(--shadow-glow)] ring-2 ring-primary/25 ring-offset-2 ring-offset-background motion-reduce:ring-0 motion-reduce:ring-offset-0"
        : isPast
          ? "border-primary/35 bg-card text-primary/80"
          : "border-border bg-card text-primary/70"
  );

  const surfaceClass = cn(
    "min-w-0 flex-1 rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-300 motion-reduce:transition-none",
    isHighlighted
      ? "border-primary/30 bg-card shadow-md"
      : isPast
        ? "border-border/80 bg-card/90"
        : "border-border/60 bg-card",
    animated &&
      "[@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/25 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-sm"
  );

  const itemClassName = cn(
    "relative flex min-h-11 gap-4 rounded-2xl pb-8 last:pb-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    animated && "motion-safe:transition-[transform,opacity] motion-safe:duration-200",
    animated && isHighlighted && "motion-safe:active:scale-[0.995]"
  );

  const content = (
    <>
      <span className={markerClass} aria-hidden>
        {isChallenge ? (
          <Icon className="h-5 w-5" />
        ) : (
          <span className="flex flex-col items-center leading-none">
            <span className="text-[0.625rem] font-semibold tracking-wide text-primary/80">
              {stepNumber}
            </span>
            <Icon className="mt-0.5 h-4 w-4" />
          </span>
        )}
      </span>
      <div className={surfaceClass}>
        <div
          className="mb-2 h-0.5 w-8 rounded-full bg-primary transition-all duration-500 motion-reduce:transition-none"
          style={{
            opacity: isHighlighted ? accentAlpha : isPast ? accentAlpha * 0.6 : 0.25,
            width: isHighlighted ? "2.5rem" : "2rem",
          }}
          aria-hidden
        />
        <h3
          id={titleId}
          className={cn(
            "font-semibold text-foreground text-balance break-words transition-colors duration-300 motion-reduce:transition-none",
            isHighlighted && "text-primary"
          )}
        >
          {title}
        </h3>
        <p
          id={descriptionId}
          className="mt-1.5 text-sm text-foreground/75 leading-relaxed text-pretty max-w-prose break-words"
        >
          {description}
        </p>
      </div>
    </>
  );

  const sharedProps = {
    ref: stepRef,
    "data-step-index": index,
    tabIndex: 0,
    "aria-current": isActive ? ("step" as const) : undefined,
    "aria-labelledby": titleId,
    "aria-describedby": descriptionId,
    className: itemClassName,
    onFocus: () => onActivate("input"),
    onClick: () => onActivate("input"),
    onKeyDown: (event: KeyboardEvent<HTMLLIElement>) => onStepKeyDown(event, index),
  };

  if (!animated) {
    return <li {...sharedProps}>{content}</li>;
  }

  return (
    <motion.li {...sharedProps} variants={itemVariants}>
      {content}
    </motion.li>
  );
}

function SessionProgressBar({
  activeIndex,
  animated,
  progressLabel,
}: {
  activeIndex: number;
  animated: boolean;
  progressLabel: string;
}) {
  const segments = Array.from({ length: STEP_COUNT }, (_, i) => i);

  return (
    <div
      className="mt-8 flex gap-1.5"
      role="progressbar"
      aria-valuenow={activeIndex + 1}
      aria-valuemin={1}
      aria-valuemax={STEP_COUNT}
      aria-label={progressLabel}
      aria-live="polite"
      aria-atomic="true"
    >
      {segments.map((i) => {
        const filled = i <= activeIndex;
        const isCurrent = i === activeIndex;

        if (animated) {
          return (
            <motion.span
              key={i}
              className="h-1.5 flex-1 rounded-full origin-center"
              initial={false}
              animate={{
                backgroundColor: filled
                  ? "var(--primary)"
                  : "var(--border)",
                scaleY: isCurrent ? 1.35 : 1,
              }}
              transition={{ duration: 0.28, ease: EASE_OUT_QUART }}
              aria-hidden
            />
          );
        }

        return (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-[background-color,transform] duration-300 motion-reduce:transition-none",
              filled ? "bg-primary" : "bg-border",
              isCurrent && "scale-y-[1.35]"
            )}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

function useStickyHeaderPinned() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const media = window.matchMedia("(min-width: 1024px)");
    const stickyTopPx =
      parseFloat(getComputedStyle(document.documentElement).fontSize) *
      STICKY_TOP_REM;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!media.matches) return;
        setIsPinned(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `-${stickyTopPx}px 0px 0px 0px`,
      }
    );

    const handleViewportChange = () => {
      if (!media.matches) {
        setIsPinned(false);
      }
    };

    observer.observe(sentinel);
    media.addEventListener("change", handleViewportChange);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", handleViewportChange);
    };
  }, []);

  return { sentinelRef, isPinned };
}

type MethodHeaderProps = {
  progressRegionId: string;
  titleLine1: string;
  titleLine2: string | null;
  subtitle: string;
  activeIndex: number;
  animated: boolean;
  progressLabel: string;
};

function MethodHeader({
  progressRegionId,
  titleLine1,
  titleLine2,
  subtitle,
  activeIndex,
  animated,
  progressLabel,
}: MethodHeaderProps) {
  const { sentinelRef, isPinned } = useStickyHeaderPinned();

  const headerInner = (
    <>
      <h2
        id={progressRegionId}
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.1] tracking-tight text-balance"
      >
        <span className="block">{titleLine1}</span>
        {titleLine2 && (
          <span className="block text-primary">{titleLine2}</span>
        )}
      </h2>
      <p className="mt-5 mx-auto lg:mx-0 max-w-[38ch] text-base md:text-lg text-foreground/75 leading-relaxed text-pretty break-words">
        {subtitle}
      </p>
      <SessionProgressBar
        activeIndex={activeIndex}
        animated={animated}
        progressLabel={progressLabel}
      />
    </>
  );

  const stickyShellClass = cn(
    "mb-10 sm:mb-12 lg:mb-0 lg:self-start lg:sticky lg:z-10",
    "lg:top-[var(--course-method-sticky-top,6rem)]"
  );

  const headerSurfaceClass = cn(
    "relative text-center lg:text-left",
    "lg:-mx-3 lg:px-3 lg:py-4 lg:rounded-2xl lg:border lg:border-transparent"
  );

  return (
    <div
      className={stickyShellClass}
      style={{ "--course-method-sticky-top": STICKY_TOP } as CSSProperties}
    >
      <div
        ref={sentinelRef}
        className="pointer-events-none hidden lg:block h-px w-full"
        aria-hidden
      />
      {animated ? (
        <motion.header
          className={cn(
            headerSurfaceClass,
            "transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none",
            isPinned &&
              "lg:bg-background/95 lg:shadow-[var(--shadow-glow)] lg:border-border/60"
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl lg:backdrop-blur-sm motion-reduce:backdrop-blur-none"
            initial={false}
            animate={{ opacity: isPinned ? 1 : 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT_QUART }}
            aria-hidden
          />
          {headerInner}
        </motion.header>
      ) : (
        <header
          className={cn(
            headerSurfaceClass,
            isPinned &&
              "lg:bg-background/95 lg:shadow-[var(--shadow-glow)] lg:border-border/60"
          )}
        >
          {headerInner}
        </header>
      )}
    </div>
  );
}

export default function CourseMethod() {
  const { locale, t } = useLanguage();
  const copy = courseSectionCopy.method;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const progressRegionId = useId();

  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const inputLockRef = useRef(false);
  const inputLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const titleLine1 = getLocalized(copy.title, locale);
  const titleLine2 = copy.titleLine2
    ? getLocalized(copy.titleLine2, locale)
    : null;
  const subtitle = getLocalized(copy.subtitle, locale);
  const progressLabel = interpolateLabel(copy.progressLabel, locale, {
    current: activeIndex + 1,
    total: STEP_COUNT,
  });
  const stepsListLabel = interpolateLabel(copy.stepsListLabel, locale, {});

  const lockInputNavigation = useCallback(() => {
    inputLockRef.current = true;
    if (inputLockTimerRef.current) {
      clearTimeout(inputLockTimerRef.current);
    }
    inputLockTimerRef.current = setTimeout(() => {
      inputLockRef.current = false;
    }, 1200);
  }, []);

  const focusStep = useCallback((index: number) => {
    stepRefs.current[index]?.focus();
  }, []);

  const handleActivate = useCallback(
    (index: number, source: "input" | "scroll") => {
      if (source === "input") {
        lockInputNavigation();
      }
      setActiveIndex(index);
    },
    [lockInputNavigation]
  );

  const handleStepKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLIElement>, index: number) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const next = Math.min(index + 1, STEP_COUNT - 1);
        handleActivate(next, "input");
        focusStep(next);
        return;
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const prev = Math.max(index - 1, 0);
        handleActivate(prev, "input");
        focusStep(prev);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        handleActivate(0, "input");
        focusStep(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        const last = STEP_COUNT - 1;
        handleActivate(last, "input");
        focusStep(last);
      }
    },
    [focusStep, handleActivate]
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLElement>("[data-step-index]")
    );
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (inputLockRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (!top) return;

        const index = Number(top.target.getAttribute("data-step-index"));
        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    for (const item of items) {
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    return () => {
      if (inputLockTimerRef.current) {
        clearTimeout(inputLockTimerRef.current);
      }
    };
  }, []);

  const stepById = Object.fromEntries(
    courseMethodSteps.map((step, index) => [step.id, { step, index }])
  );

  const railContent = courseMethodPhases.map((phase, phaseIndex) => {
    const phaseTitle = getLocalized(phase.title, locale);
    const phaseLabelId = `course-method-phase-${phase.id}`;
    const phaseSteps = phase.stepIds
      .map((id) => stepById[id])
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

    return (
      <Fragment key={phase.id}>
        <li className="list-none" role="presentation">
          <div
            role="group"
            aria-labelledby={phaseLabelId}
            className={cn(phaseIndex > 0 ? "pt-6" : "pt-0", "pb-3")}
          >
            <p
              id={phaseLabelId}
              className="text-sm font-semibold text-foreground/90 break-words"
              style={{ paddingInlineStart: PHASE_LABEL_OFFSET }}
            >
              {phaseTitle}
            </p>
          </div>
        </li>
        {phaseSteps.map(({ step, index }) => {
          const Icon = getLucideIcon(step.icon ?? "Circle");
          const title = getLocalized(step.title, locale);

          return (
            <RailItem
              key={step.id}
              stepId={step.id}
              index={index}
              title={title}
              description={getLocalized(step.description, locale)}
              Icon={Icon}
              animated={animated}
              isActive={activeIndex === index}
              isPast={index < activeIndex}
              onActivate={(source) => handleActivate(index, source)}
              onStepKeyDown={handleStepKeyDown}
              stepRef={(element) => {
                stepRefs.current[index] = element;
              }}
            />
          );
        })}
      </Fragment>
    );
  });

  const gridClassName =
    "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-14 xl:gap-x-20 lg:items-start";

  const headerBlock = (
    <MethodHeader
      progressRegionId={progressRegionId}
      titleLine1={titleLine1}
      titleLine2={titleLine2}
      subtitle={subtitle}
      activeIndex={activeIndex}
      animated={animated}
      progressLabel={progressLabel}
    />
  );

  const railBlock = (
    <div className="relative min-w-0">
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-3xl bg-gradient-to-br from-accent/60 via-transparent to-primary/[0.04] sm:-inset-x-6"
        aria-hidden
      />
      <ol
        ref={listRef}
        className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0 pl-0 min-w-0"
        aria-labelledby={progressRegionId}
        aria-label={stepsListLabel || undefined}
      >
        <span
          className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-border motion-reduce:opacity-100"
          style={{ left: MARKER_RAIL_LEFT }}
          aria-hidden
        />
        {railContent}
      </ol>
    </div>
  );

  return (
    <section
      id="course-method"
      className="relative py-12 sm:py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent via-background to-accent/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-primary/[0.05] blur-xl motion-reduce:blur-none overflow-hidden"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {animated ? (
          <motion.div
            className={gridClassName}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={sectionContainerVariants}
          >
            {headerBlock}
            <motion.div className="min-w-0" variants={itemVariants}>
              {railBlock}
            </motion.div>
          </motion.div>
        ) : (
          <div className={gridClassName}>
            {headerBlock}
            {railBlock}
          </div>
        )}

        <div className="relative mt-12 rounded-2xl border border-border bg-accent/50 p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Presentation className="size-5 shrink-0" aria-hidden />
                <h3 className="text-lg font-semibold text-foreground">
                  {t("course.deckLink")}
                </h3>
              </div>
              <p className="max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
                {t("course.deckLinkDescription")}
              </p>
            </div>
            <Link
              href="/course/arduino-mblock-deck"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              {t("course.deckLink")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
