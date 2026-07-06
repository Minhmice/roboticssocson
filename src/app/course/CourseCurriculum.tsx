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
  useMemo,
  useRef,
  useState,
} from "react";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-60px" } as const;
const SESSION_COUNT = courseLessons.length;
const MARKER_OFFSET = "1.625rem";
const CAPSTONE_ID = 12;

const sectionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

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
      className="mt-8 flex gap-1"
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

        return (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-[background-color,transform] duration-300 motion-reduce:transition-none",
              filled ? "bg-primary" : "bg-border",
              animated && isCurrent && "motion-safe:scale-y-[1.35]"
            )}
            aria-hidden
          />
        );
      })}
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
};

function LessonRailItem({
  lesson,
  sessionIndex,
  isOpen,
  isActive,
  isPast,
  onToggle,
  animated,
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
        ? "border-primary bg-accent text-primary shadow-[var(--shadow-glow)] scale-105 motion-reduce:scale-100"
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
      <span className={markerClass} aria-hidden>
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
        <dl
          id={panelId}
          role="region"
          aria-labelledby={titleId}
          hidden={!isOpen}
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
      </div>
    </>
  );

  if (!animated) {
    return (
      <li
        className="relative flex gap-4 pb-8 last:pb-0"
        data-session-index={sessionIndex}
      >
        {content}
      </li>
    );
  }

  return (
    <motion.li
      className="relative flex gap-4 pb-8 last:pb-0"
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
  const [activePhase, setActivePhase] = useState<CoursePart>("scratch");
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);

  const listRef = useRef<HTMLOListElement>(null);
  const phaseRefs = useRef<Partial<Record<CoursePart, HTMLElement>>>({});

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

  const toggleLesson = useCallback((id: number) => {
    setOpenLessonIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    const index = sessionIndexById.get(id);
    if (index !== undefined) {
      setActiveSessionIndex(index);
    }
  }, [sessionIndexById]);

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
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    for (const item of items) {
      sessionObserver.observe(item);
    }

    return () => sessionObserver.disconnect();
  }, [locale]);

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
            />
          );
        })}
      </Fragment>
    );
  });

  const gridClassName =
    "lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-14 xl:gap-x-20 lg:items-start";

  const headerBlock = (
    <header className="mb-8 text-center sm:mb-10 lg:mb-0 lg:sticky lg:top-24 lg:text-left">
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
        onSelectPhase={scrollToPhase}
        layout="sidebar"
      />
    </header>
  );

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
      <span
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-border"
        style={{ left: MARKER_OFFSET }}
        aria-hidden
      />
      {animated && (
        <motion.span
          className="pointer-events-none absolute top-0 bottom-0 w-px origin-top bg-primary"
          style={{ left: MARKER_OFFSET, scaleY: progressScale }}
          aria-hidden
        />
      )}
      {animated ? (
        <motion.ol
          ref={listRef}
          className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0 pl-0 min-w-0"
          aria-labelledby={headingId}
          aria-label={lessonsListLabel}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={listVariants}
        >
          {railContent}
        </motion.ol>
      ) : (
        <ol
          ref={listRef}
          className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0 pl-0 min-w-0"
          aria-labelledby={headingId}
          aria-label={lessonsListLabel}
        >
          {railContent}
        </ol>
      )}
    </div>
  );

  return (
    <section
      id="course-curriculum"
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent via-background to-accent/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-primary/[0.05] blur-xl motion-reduce:blur-none"
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
            <motion.div variants={headerItemVariants}>{headerBlock}</motion.div>
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
      </div>
    </section>
  );
}
