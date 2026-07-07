"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  courseLessons,
  coursePartMeta,
  coursePartOrder,
  curriculumFieldLabels,
  type CourseLesson,
  type CoursePart,
} from "@/data/courseCurriculum";
import { courseSectionCopy } from "@/data/courseSections";
import { getLocalized, type CourseLocale } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-60px" } as const;
const SESSION_COUNT = courseLessons.length;
/** Navbar offset (pt-16) + breathing room — matches layout shell */
const STICKY_TOP_REM = 6;
const STICKY_TOP = `${STICKY_TOP_REM}rem`;
/** Wait before auto-opening the next lesson while scrolling — avoids accordion overload */
const SCROLL_OPEN_DELAY_MS = 1000;
const INPUT_LOCK_MS = 1200;
const PANEL_OPEN_DURATION_S = 0.42;
const PANEL_CLOSE_DURATION_S = 0.26;
const ACCORDION_LOCK_MS = Math.round(PANEL_OPEN_DURATION_S * 1000) + 80;
/** h-11 marker column — rail must pass through its center, not an arbitrary offset */
const MARKER_SIZE_REM = 2.75;
const MARKER_GAP_REM = 1;
const MARKER_RAIL_LEFT = `${MARKER_SIZE_REM / 2}rem`;
const PHASE_LABEL_OFFSET = `${MARKER_SIZE_REM + MARKER_GAP_REM}rem`;
const CAPSTONE_ID = 12;

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE_OUT_QUART },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

type DetailField = "goal" | "primaryLevel" | "secondaryLevel" | "challenge";

const detailFields: DetailField[] = [
  "goal",
  "primaryLevel",
  "secondaryLevel",
  "challenge",
];

function interpolateLabel(
  template: { vi: string; en: string },
  locale: CourseLocale,
  values: Record<string, string | number>
): string {
  let text = getLocalized(template, locale);
  for (const [key, value] of Object.entries(values)) {
    text = text.replace(`{${key}}`, String(value));
  }
  return text;
}

function sessionAccentAlpha(sessionIndex: number): number {
  return 0.3 + (sessionIndex / (SESSION_COUNT - 1)) * 0.7;
}

type PhaseNavProps = {
  activePhase: CoursePart;
  onSelectPhase: (part: CoursePart) => void;
  layout: "sidebar" | "chips";
};

function PhaseNav({ activePhase, onSelectPhase, layout }: PhaseNavProps) {
  const { locale } = useLanguage();
  const navLabel = getLocalized(curriculumFieldLabels.phaseNavLabel, locale);

  if (layout === "chips") {
    return (
      <nav
        className="lg:hidden -mx-1 mb-6 overflow-x-auto pb-1"
        aria-label={navLabel}
      >
        <div className="flex min-w-min gap-2 px-1">
          {coursePartMeta.map((meta) => {
            const isActive = activePhase === meta.id;
            return (
              <button
                key={meta.id}
                type="button"
                onClick={() => onSelectPhase(meta.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 min-h-[44px] text-sm font-medium transition-colors duration-200 motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-accent"
                )}
              >
                {getLocalized(meta.label, locale)}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="mt-8 hidden lg:block" aria-label={navLabel}>
      <ul className="space-y-2">
        {coursePartMeta.map((meta) => {
          const isActive = activePhase === meta.id;
          return (
            <li key={meta.id}>
              <button
                type="button"
                onClick={() => onSelectPhase(meta.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left transition-all duration-200 motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary/35 bg-accent shadow-sm"
                    : "border-transparent bg-transparent hover:border-border hover:bg-card"
                )}
              >
                <span
                  className={cn(
                    "block text-sm font-semibold",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                >
                  {getLocalized(meta.label, locale)}
                </span>
                <span className="mt-0.5 block text-sm text-foreground/70 leading-snug">
                  {getLocalized(meta.description, locale)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SessionProgressBar({
  activeSessionIndex,
  animated,
  progressLabel,
}: {
  activeSessionIndex: number;
  animated: boolean;
  progressLabel: string;
}) {
  const segments = Array.from({ length: SESSION_COUNT }, (_, i) => i);

  return (
    <div
      className="mt-8 flex gap-1.5"
      role="progressbar"
      aria-valuenow={activeSessionIndex + 1}
      aria-valuemin={1}
      aria-valuemax={SESSION_COUNT}
      aria-label={progressLabel}
      aria-live="polite"
      aria-atomic="true"
    >
      {segments.map((i) => {
        const filled = i <= activeSessionIndex;
        const isCurrent = i === activeSessionIndex;

        if (animated) {
          return (
            <motion.span
              key={i}
              className="h-1.5 flex-1 rounded-full origin-center"
              initial={false}
              animate={{
                backgroundColor: filled ? "var(--primary)" : "var(--border)",
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

type CurriculumHeaderProps = {
  headingId: string;
  title: string;
  titleLine2: string | null;
  subtitle: string;
  activeSessionIndex: number;
  activePhase: CoursePart;
  animated: boolean;
  progressLabel: string;
  onSelectPhase: (part: CoursePart) => void;
};

function CurriculumHeader({
  headingId,
  title,
  titleLine2,
  subtitle,
  activeSessionIndex,
  activePhase,
  animated,
  progressLabel,
  onSelectPhase,
}: CurriculumHeaderProps) {
  const { sentinelRef, isPinned } = useStickyHeaderPinned();

  const headerInner = (
    <>
      <h2
        id={headingId}
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.1] tracking-tight text-balance"
      >
        <span className="block">{title}</span>
        {titleLine2 && (
          <span className="block text-primary">{titleLine2}</span>
        )}
      </h2>
      <p className="mt-5 mx-auto lg:mx-0 max-w-[38ch] text-base md:text-lg text-foreground/75 leading-relaxed text-pretty break-words">
        {subtitle}
      </p>
      <SessionProgressBar
        activeSessionIndex={activeSessionIndex}
        animated={animated}
        progressLabel={progressLabel}
      />
      <PhaseNav
        activePhase={activePhase}
        onSelectPhase={onSelectPhase}
        layout="sidebar"
      />
    </>
  );

  const stickyShellClass = cn(
    "mb-8 sm:mb-10 lg:mb-0 lg:self-start lg:sticky lg:z-10",
    "lg:top-[var(--course-curriculum-sticky-top,6rem)]"
  );

  const headerSurfaceClass = cn(
    "relative text-center lg:text-left",
    "lg:-mx-3 lg:px-3 lg:py-4 lg:rounded-2xl lg:border lg:border-transparent"
  );

  return (
    <div
      className={stickyShellClass}
      style={{ "--course-curriculum-sticky-top": STICKY_TOP } as CSSProperties}
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
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
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

type LessonRailItemProps = {
  lesson: CourseLesson;
  sessionIndex: number;
  isOpen: boolean;
  isActive: boolean;
  isPast: boolean;
  onToggle: () => void;
  animated: boolean;
  collapseInstant: boolean;
  expandFadeOnly: boolean;
};

function LessonRailItem({
  lesson,
  sessionIndex,
  isOpen,
  isActive,
  isPast,
  onToggle,
  animated,
  collapseInstant,
  expandFadeOnly,
}: LessonRailItemProps) {
  const { locale } = useLanguage();
  const title = getLocalized(lesson.title, locale);
  const panelId = `curriculum-lesson-${lesson.id}-panel`;
  const toggleId = `curriculum-lesson-${lesson.id}-toggle`;
  const titleId = `curriculum-lesson-${lesson.id}-title`;

  const isCapstone = lesson.id === CAPSTONE_ID;
  const accentAlpha = sessionAccentAlpha(sessionIndex);
  const isHighlighted = isActive || isOpen;

  const toggleAriaLabel = interpolateLabel(
    isOpen
      ? curriculumFieldLabels.hideDetailsAriaLabel
      : curriculumFieldLabels.detailsAriaLabel,
    locale,
    { session: lesson.id, title }
  );

  const markerClass = cn(
    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 text-sm font-bold transition-all duration-300 motion-reduce:transition-none",
    isCapstone
      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow-lg)]"
      : isHighlighted
        ? "border-primary bg-accent text-primary shadow-[var(--shadow-glow)] ring-2 ring-primary/25 ring-offset-2 ring-offset-background motion-reduce:ring-0 motion-reduce:ring-offset-0"
        : isPast
          ? "border-primary/40 bg-accent/80 text-primary"
          : "border-border bg-card text-primary/80"
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

  const content = (
    <>
      <span className={markerClass} data-session-marker aria-hidden>
        {lesson.id}
      </span>
      <div className={surfaceClass}>
        <div
          className="mb-2 h-0.5 w-8 rounded-full bg-primary transition-all duration-500 motion-reduce:transition-none"
          style={{
            opacity: isHighlighted
              ? accentAlpha
              : isPast
                ? accentAlpha * 0.6
                : 0.25,
            width: isHighlighted ? "2.5rem" : "2rem",
          }}
          aria-hidden
        />
        <h3
          id={titleId}
          className={cn(
            "font-semibold text-foreground text-balance break-words",
            isCapstone && "text-primary"
          )}
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed text-pretty break-words">
          {getLocalized(lesson.product, locale)}
        </p>
        <button
          id={toggleId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={toggleAriaLabel}
          className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md -ml-1 px-1"
        >
          <span aria-hidden>
            {getLocalized(
              isOpen
                ? curriculumFieldLabels.hideDetailsToggle
                : curriculumFieldLabels.detailsToggle,
              locale
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none",
              isOpen && "rotate-180"
            )}
            aria-hidden
          />
        </button>
        {animated ? (
          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.dl
                key={panelId}
                id={panelId}
                role="region"
                aria-labelledby={titleId}
                className="mt-3 overflow-hidden rounded-xl border border-border bg-accent/40 p-4 [overflow-anchor:none]"
                initial={
                  expandFadeOnly
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                animate={
                  expandFadeOnly
                    ? {
                        opacity: 1,
                        transition: {
                          duration: 0.35,
                          ease: EASE_OUT_EXPO,
                        },
                      }
                    : {
                        height: "auto",
                        opacity: 1,
                        transition: {
                          duration: PANEL_OPEN_DURATION_S,
                          ease: EASE_OUT_EXPO,
                        },
                      }
                }
                exit={
                  expandFadeOnly
                    ? {
                        opacity: 0,
                        transition: {
                          duration: collapseInstant ? 0.01 : 0.2,
                          ease: EASE_OUT_QUART,
                        },
                      }
                    : {
                        height: 0,
                        opacity: 0,
                        transition: {
                          duration: collapseInstant ? 0.01 : PANEL_CLOSE_DURATION_S,
                          ease: EASE_OUT_QUART,
                        },
                      }
                }
              >
                <div className="space-y-3">
                  {detailFields.map((field) => (
                    <div key={field}>
                      <dt className="text-sm font-medium text-foreground">
                        {getLocalized(curriculumFieldLabels[field], locale)}
                      </dt>
                      <dd className="mt-0.5 text-sm text-foreground/75 leading-relaxed text-pretty">
                        {getLocalized(lesson[field], locale)}
                      </dd>
                    </div>
                  ))}
                </div>
              </motion.dl>
            ) : null}
          </AnimatePresence>
        ) : isOpen ? (
          <dl
            id={panelId}
            role="region"
            aria-labelledby={titleId}
            className="mt-3 space-y-3 rounded-xl border border-border bg-accent/40 p-4"
          >
            {detailFields.map((field) => (
              <div key={field}>
                <dt className="text-sm font-medium text-foreground">
                  {getLocalized(curriculumFieldLabels[field], locale)}
                </dt>
                <dd className="mt-0.5 text-sm text-foreground/75 leading-relaxed text-pretty">
                  {getLocalized(lesson[field], locale)}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </>
  );

  if (!animated) {
    return (
      <li
        className="relative flex gap-4 pb-8 last:pb-0 [overflow-anchor:none]"
        data-session-index={sessionIndex}
      >
        {content}
      </li>
    );
  }

  return (
    <motion.li
      className="relative flex gap-4 pb-8 last:pb-0 [overflow-anchor:none]"
      variants={itemVariants}
      data-session-index={sessionIndex}
    >
      {content}
    </motion.li>
  );
}

export default function CourseCurriculum() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.curriculum;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const headingId = useId();

  const [openLessonIds, setOpenLessonIds] = useState<Set<number>>(
    () => new Set([1])
  );
  const [collapseInstant, setCollapseInstant] = useState(false);
  const [scrollExpandLessonId, setScrollExpandLessonId] = useState<number | null>(
    null
  );
  const [activePhase, setActivePhase] = useState<CoursePart>("scratch");
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);

  const listRef = useRef<HTMLOListElement>(null);
  const phaseRefs = useRef<Partial<Record<CoursePart, HTMLElement>>>({});
  const inputLockRef = useRef(false);
  const inputLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingOpenIndexRef = useRef<number | null>(null);
  const openLessonIdsRef = useRef(openLessonIds);
  const accordionAnimatingRef = useRef(false);
  const collapseInstantTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stabilizeViewportTopRef = useRef<number | null>(null);
  const stabilizeIndexRef = useRef<number | null>(null);

  useEffect(() => {
    openLessonIdsRef.current = openLessonIds;
  }, [openLessonIds]);

  const lessonsByPart = useMemo(() => {
    const grouped = {} as Record<CoursePart, CourseLesson[]>;
    for (const part of coursePartOrder) {
      grouped[part] = [];
    }
    for (const lesson of courseLessons) {
      grouped[lesson.part].push(lesson);
    }
    return grouped;
  }, []);

  const sessionIndexById = useMemo(() => {
    const map = new Map<number, number>();
    courseLessons.forEach((lesson, index) => {
      map.set(lesson.id, index);
    });
    return map;
  }, []);

  const lessonIdByIndex = useMemo(
    () => courseLessons.map((lesson) => lesson.id),
    []
  );

  const clearScrollOpenTimer = useCallback(() => {
    if (scrollOpenTimerRef.current) {
      clearTimeout(scrollOpenTimerRef.current);
      scrollOpenTimerRef.current = null;
    }
    pendingOpenIndexRef.current = null;
  }, []);

  const getOpenLessonIndex = useCallback(() => {
    const openId = [...openLessonIdsRef.current][0];
    if (openId === undefined) return -1;
    return lessonIdByIndex.indexOf(openId);
  }, [lessonIdByIndex]);

  const captureMarkerViewportTop = useCallback((index: number) => {
    const list = listRef.current;
    if (!list) return null;

    const item = list.querySelector<HTMLElement>(
      `[data-session-index="${index}"]`
    );
    const marker = item?.querySelector<HTMLElement>("[data-session-marker]");
    if (!marker) return null;

    return marker.getBoundingClientRect().top;
  }, []);

  const openLessonWithStability = useCallback(
    (id: number, index: number, fromScroll: boolean) => {
      const currentOpenId = [...openLessonIdsRef.current][0];
      if (currentOpenId === id) return;

      if (fromScroll) {
        const viewportTop = captureMarkerViewportTop(index);
        if (viewportTop !== null) {
          stabilizeIndexRef.current = index;
          stabilizeViewportTopRef.current = viewportTop;
        }
        setScrollExpandLessonId(id);

        if (currentOpenId !== undefined) {
          setCollapseInstant(true);
          if (collapseInstantTimerRef.current) {
            clearTimeout(collapseInstantTimerRef.current);
          }
          collapseInstantTimerRef.current = setTimeout(() => {
            setCollapseInstant(false);
            collapseInstantTimerRef.current = null;
          }, 80);
        }
      } else {
        setScrollExpandLessonId(null);
      }

      accordionAnimatingRef.current = true;
      setOpenLessonIds(new Set([id]));

      window.setTimeout(() => {
        accordionAnimatingRef.current = false;
        setScrollExpandLessonId((current) => (current === id ? null : current));
      }, ACCORDION_LOCK_MS);
    },
    [captureMarkerViewportTop]
  );

  const scheduleScrollOpen = useCallback(
    (index: number) => {
      if (accordionAnimatingRef.current) return;

      const openIndex = getOpenLessonIndex();
      if (openIndex === index) return;

      clearScrollOpenTimer();
      pendingOpenIndexRef.current = index;
      const delay = animated ? SCROLL_OPEN_DELAY_MS : 0;

      scrollOpenTimerRef.current = setTimeout(() => {
        scrollOpenTimerRef.current = null;
        if (inputLockRef.current) return;
        if (pendingOpenIndexRef.current !== index) return;
        if (accordionAnimatingRef.current) return;

        const id = lessonIdByIndex[index];
        if (id !== undefined) {
          openLessonWithStability(id, index, true);
        }
        pendingOpenIndexRef.current = null;
      }, delay);
    },
    [
      animated,
      clearScrollOpenTimer,
      getOpenLessonIndex,
      lessonIdByIndex,
      openLessonWithStability,
    ]
  );

  const lockInputNavigation = useCallback(() => {
    clearScrollOpenTimer();
    inputLockRef.current = true;
    if (inputLockTimerRef.current) {
      clearTimeout(inputLockTimerRef.current);
    }
    inputLockTimerRef.current = setTimeout(() => {
      inputLockRef.current = false;
    }, INPUT_LOCK_MS);
  }, [clearScrollOpenTimer]);

  const toggleLesson = useCallback((id: number) => {
    lockInputNavigation();
    setCollapseInstant(false);
    setScrollExpandLessonId(null);
    stabilizeIndexRef.current = null;
    stabilizeViewportTopRef.current = null;
    const index = sessionIndexById.get(id);
    if (index !== undefined) {
      setActiveSessionIndex(index);
    }

    setOpenLessonIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    });
  }, [lockInputNavigation, sessionIndexById]);

  const scrollToPhase = useCallback(
    (part: CoursePart) => {
      setActivePhase(part);
      const target = phaseRefs.current[part];
      if (!target) return;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [prefersReducedMotion]
  );

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const phaseElements = coursePartOrder
      .map((part) => phaseRefs.current[part])
      .filter((element): element is HTMLElement => Boolean(element));

    if (phaseElements.length === 0) return;

    const phaseObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const part = top.target.getAttribute("data-phase-id") as CoursePart | null;
        if (part) setActivePhase(part);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    for (const element of phaseElements) {
      phaseObserver.observe(element);
    }

    return () => phaseObserver.disconnect();
  }, [locale]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLElement>("[data-session-index]")
    );
    if (items.length === 0) return;

    const sessionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const index = Number(top.target.getAttribute("data-session-index"));
        if (!Number.isNaN(index)) {
          setActiveSessionIndex(index);
          if (!inputLockRef.current && !accordionAnimatingRef.current) {
            scheduleScrollOpen(index);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    for (const item of items) {
      sessionObserver.observe(item);
    }

    return () => sessionObserver.disconnect();
  }, [locale, scheduleScrollOpen]);

  useLayoutEffect(() => {
    const index = stabilizeIndexRef.current;
    const viewportTopBefore = stabilizeViewportTopRef.current;
    if (index === null || viewportTopBefore === null) return;

    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(
      `[data-session-index="${index}"]`
    );
    const marker = item?.querySelector<HTMLElement>("[data-session-marker]");
    if (!marker) {
      stabilizeIndexRef.current = null;
      stabilizeViewportTopRef.current = null;
      return;
    }

    const delta = marker.getBoundingClientRect().top - viewportTopBefore;
    if (Math.abs(delta) > 0.5) {
      window.scrollBy({ top: delta, behavior: "auto" });
    }

    stabilizeIndexRef.current = null;
    stabilizeViewportTopRef.current = null;
  }, [openLessonIds]);

  useEffect(() => {
    return () => {
      if (inputLockTimerRef.current) {
        clearTimeout(inputLockTimerRef.current);
      }
      if (scrollOpenTimerRef.current) {
        clearTimeout(scrollOpenTimerRef.current);
      }
      if (collapseInstantTimerRef.current) {
        clearTimeout(collapseInstantTimerRef.current);
      }
    };
  }, []);

  const title = getLocalized(copy.title, locale);
  const titleLine2 = copy.titleLine2
    ? getLocalized(copy.titleLine2, locale)
    : null;
  const subtitle = getLocalized(copy.subtitle, locale);
  const progressLabel = interpolateLabel(
    curriculumFieldLabels.progressLabel,
    locale,
    { current: activeSessionIndex + 1, total: SESSION_COUNT }
  );
  const lessonsListLabel = getLocalized(
    curriculumFieldLabels.lessonsListLabel,
    locale
  );
  const staticProgress =
    SESSION_COUNT > 1 ? activeSessionIndex / (SESSION_COUNT - 1) : 0;

  const railContent = coursePartOrder.map((part, phaseIndex) => {
    const meta = coursePartMeta.find((entry) => entry.id === part);
    if (!meta) return null;

    const phaseLabelId = `curriculum-phase-${part}`;
    const lessons = lessonsByPart[part];

    return (
      <Fragment key={part}>
        <li className="list-none" role="presentation">
          <div
            ref={(element) => {
              if (element) phaseRefs.current[part] = element;
            }}
            id={phaseLabelId}
            data-phase-id={part}
            className={cn(
              "scroll-mt-28",
              phaseIndex > 0 ? "pt-6" : "pt-0",
              "pb-3"
            )}
          >
            <p
              className="text-sm font-semibold text-foreground/90 break-words"
              style={{ paddingInlineStart: PHASE_LABEL_OFFSET }}
            >
              {getLocalized(meta.label, locale)}
            </p>
          </div>
        </li>
        {lessons.map((lesson) => {
          const sessionIndex = sessionIndexById.get(lesson.id) ?? 0;
          return (
            <LessonRailItem
              key={lesson.id}
              lesson={lesson}
              sessionIndex={sessionIndex}
              isOpen={openLessonIds.has(lesson.id)}
              isActive={activeSessionIndex === sessionIndex}
              isPast={sessionIndex < activeSessionIndex}
              onToggle={() => toggleLesson(lesson.id)}
              animated={animated}
              collapseInstant={collapseInstant}
              expandFadeOnly={scrollExpandLessonId === lesson.id}
            />
          );
        })}
      </Fragment>
    );
  });

  const gridClassName =
    "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-14 xl:gap-x-20 lg:items-start";

  const railBlock = (
    <div className="relative min-w-0">
      <PhaseNav
        activePhase={activePhase}
        onSelectPhase={scrollToPhase}
        layout="chips"
      />
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-3xl bg-gradient-to-br from-accent/60 via-transparent to-primary/[0.04] sm:-inset-x-6"
        aria-hidden
      />
      {animated ? (
        <motion.ol
          ref={listRef}
          className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0 pl-0 min-w-0 [overflow-anchor:none]"
          aria-labelledby={headingId}
          aria-label={lessonsListLabel}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={listVariants}
        >
          <span
            className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-border"
            style={{ left: MARKER_RAIL_LEFT }}
            aria-hidden
          />
          <motion.span
            className="pointer-events-none absolute inset-y-0 w-px origin-top -translate-x-1/2 bg-primary"
            style={{ left: MARKER_RAIL_LEFT, scaleY: progressScale }}
            aria-hidden
          />
          {railContent}
        </motion.ol>
      ) : (
        <ol
          ref={listRef}
          className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0 pl-0 min-w-0 [overflow-anchor:none]"
          aria-labelledby={headingId}
          aria-label={lessonsListLabel}
        >
          <span
            className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-border"
            style={{ left: MARKER_RAIL_LEFT }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-y-0 w-px origin-top -translate-x-1/2 bg-primary"
            style={{
              left: MARKER_RAIL_LEFT,
              transform: `translateX(-50%) scaleY(${staticProgress})`,
            }}
            aria-hidden
          />
          {railContent}
        </ol>
      )}
    </div>
  );

  return (
    <section
      id="course-curriculum"
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
          <div className={gridClassName}>
            <CurriculumHeader
              headingId={headingId}
              title={title}
              titleLine2={titleLine2}
              subtitle={subtitle}
              activeSessionIndex={activeSessionIndex}
              activePhase={activePhase}
              animated={animated}
              progressLabel={progressLabel}
              onSelectPhase={scrollToPhase}
            />
            <motion.div
              className="min-w-0"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={itemVariants}
            >
              {railBlock}
            </motion.div>
          </div>
        ) : (
          <div className={gridClassName}>
            <CurriculumHeader
              headingId={headingId}
              title={title}
              titleLine2={titleLine2}
              subtitle={subtitle}
              activeSessionIndex={activeSessionIndex}
              activePhase={activePhase}
              animated={animated}
              progressLabel={progressLabel}
              onSelectPhase={scrollToPhase}
            />
            {railBlock}
          </div>
        )}
      </div>
    </section>
  );
}
