"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  courseProblemCapstone,
  courseProblemCards,
  courseSectionCopy,
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

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const VIEWPORT = { once: false, margin: "-50px" } as const;
const ITEM_DURATION = 0.6;
const STAGGER_CHILDREN = 0.15;
const HEADING_ID = "course-problem-heading";

const sectionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
    },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ITEM_DURATION, ease: EASE_OUT_QUART },
  },
};

const orbPulseVariants: Variants = {
  idle: {
    boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)",
  },
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(37, 99, 235, 0)",
      "0 0 0 6px rgba(37, 99, 235, 0.14)",
      "0 0 0 0 rgba(37, 99, 235, 0)",
    ],
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

type RailItemProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
  isLast: boolean;
  isCapstone?: boolean;
  animated: boolean;
};

function StepOrb({
  Icon,
  animated,
  inView,
  isCapstone,
}: {
  Icon: LucideIcon;
  animated: boolean;
  inView: boolean;
  isCapstone?: boolean;
}) {
  const baseClass = cn(
    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors duration-300 motion-reduce:transition-none",
    isCapstone
      ? "border-primary bg-primary text-primary-foreground"
      : inView
        ? "border-primary/40 bg-accent"
        : "border-border bg-card",
  );

  const iconClass = cn(
    "h-4 w-4",
    isCapstone ? "text-primary-foreground" : "text-primary",
  );

  if (!animated || isCapstone) {
    return (
      <span className={baseClass}>
        <Icon className={iconClass} aria-hidden />
      </span>
    );
  }

  return (
    <motion.span
      className={baseClass}
      variants={orbPulseVariants}
      initial="idle"
      animate={inView ? "pulse" : "idle"}
    >
      <Icon className={iconClass} aria-hidden />
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
}: RailItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });

  const connector = !isLast ? (
    <span
      className="absolute left-[1.375rem] top-11 bottom-0 w-px bg-border"
      aria-hidden
    />
  ) : null;

  const bodyClass = cn(
    "mt-1.5 text-sm leading-relaxed text-pretty",
    isCapstone
      ? "text-foreground/85 md:text-base"
      : "text-foreground/80",
  );

  const content = (
    <>
      {connector}
      <StepOrb
        Icon={Icon}
        animated={animated}
        inView={inView}
        isCapstone={isCapstone}
      />
      <div className="min-w-0 pt-0.5">
        <h3
          className={cn(
            "font-semibold text-foreground text-balance",
            isCapstone
              ? "text-base sm:text-[1.0625rem] text-primary"
              : "text-base sm:text-[1.0625rem]",
          )}
        >
          {title}
        </h3>
        <p className={bodyClass}>{description}</p>
      </div>
    </>
  );

  if (!animated) {
    return (
      <li ref={ref} className="relative flex gap-4 pb-10 last:pb-0">
        {content}
      </li>
    );
  }

  return (
    <motion.li
      ref={ref}
      className="relative flex gap-4 pb-10 last:pb-0"
      variants={itemVariants}
    >
      {content}
    </motion.li>
  );
}

export default function CourseProblem() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.problem;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const listLabelId = useId();

  const title = getLocalized(copy.title, locale);
  const subtitle = getLocalized(copy.subtitle, locale);
  const badge = copy.badge ? getLocalized(copy.badge, locale) : null;

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

  const allItems = [...painItems, capstoneItem];
  const totalSteps = allItems.length;

  const railItems = allItems.map((item, index) => (
    <RailItem
      key={item.id}
      title={item.title}
      description={item.description}
      Icon={item.Icon}
      isLast={index === totalSteps - 1}
      isCapstone={index === totalSteps - 1}
      animated={animated}
    />
  ));

  const gridClassName =
    "lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-16 lg:gap-y-0 lg:items-start";

  const headerBlock = animated ? (
    <motion.header
      className="mb-10 text-center lg:mb-0 lg:sticky lg:top-24 lg:text-left"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={sectionContainerVariants}
    >
      {badge && (
        <motion.span
          className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          variants={itemVariants}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        id={HEADING_ID}
        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.12] tracking-tight text-balance text-foreground"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mt-5 mx-auto lg:mx-0 max-w-[38ch] text-base md:text-lg text-foreground/80 leading-relaxed text-pretty"
        variants={itemVariants}
      >
        {subtitle}
      </motion.p>
    </motion.header>
  ) : (
    <header className="mb-10 text-center lg:mb-0 lg:sticky lg:top-24 lg:text-left">
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {badge}
        </span>
      )}
      <h2
        id={HEADING_ID}
        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.12] tracking-tight text-balance text-foreground"
      >
        {title}
      </h2>
      <p className="mt-5 mx-auto lg:mx-0 max-w-[38ch] text-base md:text-lg text-foreground/80 leading-relaxed text-pretty">
        {subtitle}
      </p>
    </header>
  );

  const railBlock = animated ? (
    <motion.ol
      className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0"
      aria-labelledby={listLabelId}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={listVariants}
    >
      <span id={listLabelId} className="sr-only">
        {title}
      </span>
      {railItems}
    </motion.ol>
  ) : (
    <ol
      className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0"
      aria-labelledby={listLabelId}
    >
      <span id={listLabelId} className="sr-only">
        {title}
      </span>
      {railItems}
    </ol>
  );

  return (
    <section
      id="course-problem"
      className="py-12 sm:py-16 md:py-24 bg-muted/40"
      aria-labelledby={HEADING_ID}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className={gridClassName}>
          {headerBlock}
          {railBlock}
        </div>
      </div>
    </section>
  );
}
