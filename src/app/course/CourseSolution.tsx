"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { courseSectionCopy, courseSolutionCards } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const VIEWPORT = { once: false, margin: "-50px" } as const;
const ITEM_DURATION = 0.6;
const STAGGER_CHILDREN = 0.15;

const sectionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
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
  animated: boolean;
};

function StepOrb({
  Icon,
  animated,
  inView,
}: {
  Icon: LucideIcon;
  animated: boolean;
  inView: boolean;
}) {
  const baseClass =
    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm transition-colors duration-300 motion-reduce:transition-none";
  const stateClass = inView
    ? "border-primary/40 bg-accent"
    : "border-border";

  if (!animated) {
    return (
      <span className={`${baseClass} ${stateClass}`}>
        <Icon className="h-4 w-4 text-primary" aria-hidden />
      </span>
    );
  }

  return (
    <motion.span
      className={`${baseClass} ${stateClass}`}
      variants={orbPulseVariants}
      initial="idle"
      animate={inView ? "pulse" : "idle"}
    >
      <Icon className="h-4 w-4 text-primary" aria-hidden />
    </motion.span>
  );
}

function RailItem({ title, description, Icon, isLast, animated }: RailItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.5 });

  const connector = !isLast ? (
    <span
      className="absolute left-[1.375rem] top-11 bottom-0 w-px bg-border"
      aria-hidden
    />
  ) : null;

  const content = (
    <>
      {connector}
      <StepOrb Icon={Icon} animated={animated} inView={inView} />
      <div className="min-w-0 pt-0.5">
        <h3 className="text-base font-semibold text-foreground text-balance sm:text-[1.0625rem]">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
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

export default function CourseSolution() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.solution;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  const titleLine1 = getLocalized(copy.title, locale);
  const titleLine2 = copy.titleLine2
    ? getLocalized(copy.titleLine2, locale)
    : null;
  const subtitle = getLocalized(copy.subtitle, locale);

  const railItems = courseSolutionCards.map((item, index) => {
    const Icon = getLucideIcon(item.icon ?? "Circle");
    const isLast = index === courseSolutionCards.length - 1;

    return (
      <RailItem
        key={item.id}
        title={getLocalized(item.title, locale)}
        description={getLocalized(item.description, locale)}
        Icon={Icon}
        isLast={isLast}
        animated={animated}
      />
    );
  });

  const gridClassName =
    "lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-16 lg:gap-y-0 lg:items-start";

  const headerBlock = (
    <header className="mb-10 text-center lg:mb-0 lg:sticky lg:top-24 lg:text-left">
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.12] tracking-tight text-balance">
        {animated ? (
          <>
            <motion.span
              className="block text-foreground"
              variants={itemVariants}
            >
              {titleLine1}
            </motion.span>
            {titleLine2 && (
              <motion.span
                className="block text-primary"
                variants={itemVariants}
              >
                {titleLine2}
              </motion.span>
            )}
          </>
        ) : (
          <>
            <span className="block text-foreground">{titleLine1}</span>
            {titleLine2 && (
              <span className="block text-primary">{titleLine2}</span>
            )}
          </>
        )}
      </h2>
      {animated ? (
        <motion.p
          className="mt-5 mx-auto lg:mx-0 max-w-[38ch] text-base md:text-lg text-muted-foreground leading-relaxed text-pretty"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      ) : (
        <p className="mt-5 mx-auto lg:mx-0 max-w-[38ch] text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </header>
  );

  const railBlock = (
    <ol className="relative mx-auto w-full max-w-xl lg:max-w-none space-y-0">
      {railItems}
    </ol>
  );

  return (
    <section id="course-solution" className="py-12 sm:py-16 md:py-24 bg-accent/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {animated ? (
          <motion.div
            className={gridClassName}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={sectionContainerVariants}
          >
            {headerBlock}
            {railBlock}
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
