"use client";

import { GlowCard } from "@/components/shared/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { courseOutcomeCards, courseSectionCopy } from "@/data/courseSections";
import { getLocalized } from "@/lib/course/getLocalized";
import { getLucideIcon } from "@/lib/course/lucideFromName";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";

import {
  COURSE_SCROLL_VIEWPORT,
  EASE_OUT_QUART,
  ENTER_DURATION,
  EXIT_DURATION,
} from "@/lib/course/scrollReveal";
const HEADING_ID = "course-outcomes-heading";

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ENTER_DURATION, ease: EASE_OUT_QUART },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ENTER_DURATION, ease: EASE_OUT_QUART },
  },
};

function splitSubtitle(subtitle: string) {
  const dashIndex = subtitle.indexOf(" — ");
  if (dashIndex < 0) {
    return { lead: subtitle, trail: null };
  }
  return {
    lead: subtitle.slice(0, dashIndex),
    trail: subtitle.slice(dashIndex),
  };
}

function OutcomeCardContent({
  title,
  description,
  Icon,
  animated,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  animated: boolean;
}) {
  const iconShell = (
    <div
      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-[transform,box-shadow,background-color] duration-300 group-hover:border-primary/25 group-hover:bg-primary/[0.12] group-hover:shadow-[0_4px_14px_rgba(37,99,235,0.12)] motion-reduce:transition-none"
      aria-hidden
    >
      <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100" />
    </div>
  );

  return (
    <GlowCard className="h-full">
      {animated ? (
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className="w-fit motion-reduce:transform-none"
        >
          {iconShell}
        </motion.div>
      ) : (
        iconShell
      )}
      <h3 className="mb-2 text-[1.0625rem] font-semibold leading-snug text-foreground text-balance">
        {title}
      </h3>
      <p className="text-[0.9375rem] leading-relaxed text-foreground/75 text-pretty">
        {description}
      </p>
    </GlowCard>
  );
}

export default function CourseOutcomes() {
  const { locale } = useLanguage();
  const copy = courseSectionCopy.outcomes;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  const title = getLocalized(copy.title, locale);
  const subtitleFull = getLocalized(copy.subtitle, locale);
  const { lead: subtitleLead, trail: subtitleTrail } =
    splitSubtitle(subtitleFull);

  const header = (
    <header className="py-8 text-center md:py-12">
      <h2
        id={HEADING_ID}
        className="mx-auto text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[42ch] text-lg leading-relaxed text-pretty md:text-xl">
        <span className="font-semibold text-foreground">{subtitleLead}</span>
        {subtitleTrail && (
          <span className="text-muted-foreground">{subtitleTrail}</span>
        )}
      </p>
    </header>
  );

  const gridClassName = "grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3";

  const cards = courseOutcomeCards.map((card) => {
    const Icon = getLucideIcon(card.icon ?? "Circle");
    const content = (
      <OutcomeCardContent
        title={getLocalized(card.title, locale)}
        description={getLocalized(card.description, locale)}
        Icon={Icon}
        animated={animated}
      />
    );

    if (!animated) {
      return <div key={card.id}>{content}</div>;
    }

    return (
      <motion.div key={card.id} variants={cardVariants}>
        {content}
      </motion.div>
    );
  });

  return (
    <section
      id="course-outcomes"
      className="py-12 sm:py-16 md:py-24"
      aria-labelledby={HEADING_ID}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {animated ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={COURSE_SCROLL_VIEWPORT}
          >
            <motion.div variants={headerVariants}>{header}</motion.div>
            <motion.div className={gridClassName} variants={gridVariants}>
              {cards}
            </motion.div>
          </motion.div>
        ) : (
          <>
            {header}
            <div className={gridClassName}>{cards}</div>
          </>
        )}
      </div>
    </section>
  );
}
