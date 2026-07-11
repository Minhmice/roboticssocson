"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  courseProblemCapstone,
  courseProblemCards,
  courseSectionCopy,
  courseSolutionCards,
} from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";
import { cn } from "@/lib/utils";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useId, useRef } from "react";

import {
  COURSE_SCROLL_VIEWPORT_DEEP,
  EASE_OUT_QUART,
  EXIT_DURATION,
} from "@/lib/course/scrollReveal";
const ITEM_DURATION = 0.45;
const STAGGER_CHILDREN = 0.1;

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
    transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: ITEM_DURATION, ease: EASE_OUT_QUART },
  },
};

const solutionItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 8,
    transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: ITEM_DURATION, ease: EASE_OUT_QUART },
  },
};

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};

type RailItemProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
  isLast: boolean;
  isCapstone?: boolean;
  animated: boolean;
  variant?: "problem" | "solution";
};

function StepOrb({
  Icon,
  inView,
  isCapstone,
  animated,
  variant = "problem",
}: {
  Icon: LucideIcon;
  inView: boolean;
  isCapstone?: boolean;
  animated: boolean;
  variant?: "problem" | "solution";
}) {
  const baseClass = cn(
    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm",
    isCapstone
      ? "border-primary bg-primary text-primary-foreground"
      : inView
        ? "border-primary/50 bg-accent text-primary"
        : "border-border bg-card text-muted-foreground",
    variant === "solution" &&
      inView &&
      !isCapstone &&
      "shadow-[0_0_0_4px_rgba(37,99,235,0.08)]",
  );

  if (!animated) {
    return (
      <span className={baseClass}>
        <Icon
          className={cn(
            "h-4 w-4",
            isCapstone
              ? "text-primary-foreground"
              : inView
                ? "text-primary"
                : "text-muted-foreground",
          )}
          aria-hidden
        />
      </span>
    );
  }

  return (
    <motion.span
      className={baseClass}
      initial={{ scale: 0.9, opacity: 0.85 }}
      animate={
        inView
          ? {
              scale: 1,
              opacity: 1,
              boxShadow: isCapstone
                ? [
                    "0 0 0 0 rgba(37, 99, 235, 0.2)",
                    "0 0 0 8px rgba(37, 99, 235, 0)",
                  ]
                : undefined,
            }
          : { scale: 0.9, opacity: 0.85 }
      }
      transition={{
        duration: isCapstone ? 0.55 : 0.4,
        ease: EASE_OUT_QUART,
        boxShadow: isCapstone
          ? { duration: 1.2, ease: "easeOut" }
          : undefined,
      }}
    >
      <Icon
        className={cn(
          "h-4 w-4",
          isCapstone
            ? "text-primary-foreground"
            : inView
              ? "text-primary"
              : "text-muted-foreground",
        )}
        aria-hidden
      />
    </motion.span>
  );
}

function RailItem({
  title,
  description,
  Icon,
  isLast,
  isCapstone = false,
  animated,
  variant = "problem",
}: RailItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px", amount: 0.45 });
  const itemVariant =
    variant === "solution" ? solutionItemVariants : itemVariants;

  const connector = !isLast ? (
    <>
      <span
        className="absolute left-[1.375rem] top-11 bottom-0 w-px bg-border"
        aria-hidden
      />
      {animated ? (
        <motion.span
          className="absolute left-[1.375rem] top-11 bottom-0 w-px origin-top bg-primary/35"
          aria-hidden
          initial={false}
          animate={{ scaleY: inView ? 1 : 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_QUART, delay: 0.12 }}
        />
      ) : (
        <span
          className={cn(
            "absolute left-[1.375rem] top-11 bottom-0 w-px origin-top bg-primary/35",
            inView ? "scale-y-100" : "scale-y-0",
          )}
          aria-hidden
        />
      )}
    </>
  ) : null;

  const content = (
    <>
      {connector}
      <StepOrb
        Icon={Icon}
        inView={inView}
        isCapstone={isCapstone}
        animated={animated}
        variant={variant}
      />
      <div className="min-w-0 pt-0.5">
        <h3
          className={cn(
            "font-semibold text-balance",
            isCapstone
              ? "text-base text-primary sm:text-[1.0625rem]"
              : "text-base text-foreground sm:text-[1.0625rem]",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed text-pretty",
            isCapstone
              ? "text-foreground/85 md:text-base"
              : "text-foreground/80",
          )}
        >
          {description}
        </p>
      </div>
    </>
  );

  if (!animated) {
    return (
      <li ref={ref} className="relative flex gap-4 pb-9 last:pb-0">
        {content}
      </li>
    );
  }

  return (
    <motion.li
      ref={ref}
      className="relative flex gap-4 pb-9 last:pb-0"
      variants={itemVariant}
    >
      {content}
    </motion.li>
  );
}

function ColumnHeader({
  animated,
  children,
  className,
}: {
  animated: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!animated) {
    return <header className={className}>{children}</header>;
  }

  return (
    <motion.header
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={COURSE_SCROLL_VIEWPORT_DEEP}
      variants={headerVariants}
    >
      {children}
    </motion.header>
  );
}

function MotionBadge({
  animated,
  children,
}: {
  animated: boolean;
  children: React.ReactNode;
}) {
  const className =
    "mb-4 inline-block rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-medium text-primary";

  if (!animated) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span className={className} variants={headerItemVariants}>
      {children}
    </motion.span>
  );
}

function MotionTitle({
  animated,
  id,
  children,
  className,
}: {
  animated: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!animated) {
    return (
      <h2 id={id} className={className}>
        {children}
      </h2>
    );
  }

  return (
    <motion.h2 id={id} className={className} variants={headerItemVariants}>
      {children}
    </motion.h2>
  );
}

function MotionSubtitle({
  animated,
  children,
  className,
}: {
  animated: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!animated) {
    return <p className={className}>{children}</p>;
  }

  return (
    <motion.p className={className} variants={headerItemVariants}>
      {children}
    </motion.p>
  );
}

function MotionList({
  animated,
  children,
  className,
  ariaLabelledBy,
}: {
  animated: boolean;
  children: React.ReactNode;
  className?: string;
  ariaLabelledBy: string;
}) {
  if (!animated) {
    return (
      <ol className={className} aria-labelledby={ariaLabelledBy}>
        {children}
      </ol>
    );
  }

  return (
    <motion.ol
      className={className}
      aria-labelledby={ariaLabelledBy}
      initial="hidden"
      whileInView="visible"
      viewport={COURSE_SCROLL_VIEWPORT_DEEP}
      variants={listVariants}
    >
      {children}
    </motion.ol>
  );
}

const PROBLEM_HEADING_ID = "course-problem-heading";
const SOLUTION_HEADING_ID = "course-solution-heading";

export default function CourseProblem() {
  const { locale } = useLanguage();
  const problemCopy = courseSectionCopy.problem;
  const solutionCopy = courseSectionCopy.solution;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const problemListLabelId = useId();
  const solutionListLabelId = useId();

  const problemTitle = getLocalized(problemCopy.title, locale);
  const problemSubtitle = getLocalized(problemCopy.subtitle, locale);
  const badge = problemCopy.badge
    ? getLocalized(problemCopy.badge, locale)
    : null;

  const solutionTitleLine1 = getLocalized(solutionCopy.title, locale);
  const solutionTitleLine2 = solutionCopy.titleLine2
    ? getLocalized(solutionCopy.titleLine2, locale)
    : null;
  const solutionSubtitle = getLocalized(solutionCopy.subtitle, locale);

  const painItems = courseProblemCards.map((item) => {
    const Icon = getLucideIcon(item.icon ?? "Circle");
    return {
      id: item.id,
      title: getLocalized(item.title, locale),
      description: getLocalized(item.description, locale),
      Icon,
    };
  });

  const CapstoneIcon = getLucideIcon(courseProblemCapstone.icon);
  const capstoneItem = {
    id: "problem-capstone",
    title: getLocalized(courseProblemCapstone.title, locale),
    description: getLocalized(courseProblemCapstone.description, locale),
    Icon: CapstoneIcon,
  };

  const solutionItems = courseSolutionCards.map((item) => {
    const Icon = getLucideIcon(item.icon ?? "Circle");
    return {
      id: item.id,
      title: getLocalized(item.title, locale),
      description: getLocalized(item.description, locale),
      Icon,
    };
  });

  const rightRailItems = [capstoneItem, ...solutionItems];
  const titleClassName =
    "text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-balance text-foreground";
  const subtitleClassName =
    "mt-4 max-w-[38ch] text-pretty text-base leading-relaxed text-foreground/80 md:text-lg";

  return (
    <section
      id="course-problem"
      className="relative overflow-hidden bg-muted/40 py-12 sm:py-16 md:py-24"
      aria-labelledby={PROBLEM_HEADING_ID}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {badge && (
          <div className="mb-10 text-center lg:mb-14">
            <MotionBadge animated={animated}>{badge}</MotionBadge>
          </div>
        )}

        <div className="flex flex-col gap-16 lg:gap-24">
          {/* Row 1 — title trái · bullets phải */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <ColumnHeader
              animated={animated}
              className="text-center lg:sticky lg:top-24 lg:text-left"
            >
              <MotionTitle
                animated={animated}
                id={PROBLEM_HEADING_ID}
                className={titleClassName}
              >
                {problemTitle}
              </MotionTitle>
              <MotionSubtitle
                animated={animated}
                className={cn(subtitleClassName, "mx-auto lg:mx-0")}
              >
                {problemSubtitle}
              </MotionSubtitle>
            </ColumnHeader>

            <MotionList
              animated={animated}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
              ariaLabelledBy={problemListLabelId}
            >
              <span id={problemListLabelId} className="sr-only">
                {problemTitle}
              </span>
              {painItems.map((item, index) => (
                <RailItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  Icon={item.Icon}
                  isLast={index === painItems.length - 1}
                  animated={animated}
                  variant="problem"
                />
              ))}
            </MotionList>
          </div>

          {/* Row 2 — bullets trái · title phải */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <MotionList
              animated={animated}
              className="relative order-2 mx-auto w-full max-w-xl lg:order-1 lg:max-w-none"
              ariaLabelledBy={solutionListLabelId}
            >
              <span id={solutionListLabelId} className="sr-only">
                {solutionTitleLine1} {solutionTitleLine2}
              </span>
              {rightRailItems.map((item, index) => (
                <RailItem
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  Icon={item.Icon}
                  isLast={index === rightRailItems.length - 1}
                  isCapstone={index === 0}
                  animated={animated}
                  variant="solution"
                />
              ))}
            </MotionList>

            <ColumnHeader
              animated={animated}
              className="order-1 text-center lg:order-2 lg:sticky lg:top-24 lg:text-right"
            >
              <MotionTitle
                animated={animated}
                id={SOLUTION_HEADING_ID}
                className={titleClassName}
              >
                <span className="block">{solutionTitleLine1}</span>
                {solutionTitleLine2 && (
                  <span className="mt-1 block text-primary">
                    {solutionTitleLine2}
                  </span>
                )}
              </MotionTitle>
              <MotionSubtitle
                animated={animated}
                className={cn(
                  subtitleClassName,
                  "mx-auto lg:ml-auto lg:mr-0 lg:text-right",
                )}
              >
                {solutionSubtitle}
              </MotionSubtitle>
            </ColumnHeader>
          </div>
        </div>
      </div>
    </section>
  );
}
