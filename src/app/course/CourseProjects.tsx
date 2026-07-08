"use client";

import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  courseCapstone,
  type CapstoneMedia,
} from "@/data/courseProjects";
import { getLocalized, getLocalizedList } from "@/lib/course/getLocalized";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Gamepad2, Package, Trophy, Wrench } from "lucide-react";
import type { ReactNode } from "react";

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
const VIEWPORT = { once: false, amount: 0.28, margin: "-60px 0px" } as const;
const ENTER_DURATION = 0.45;
const EXIT_DURATION = 0.34;

const blockVariants: Variants = {
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

const splitRowVariants: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1,
      delayChildren: 0,
    },
  },
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

function ScrollRevealBlock({
  animated,
  className,
  children,
  whileHover,
}: {
  animated: boolean;
  className?: string;
  children: ReactNode;
  whileHover?: { y?: number };
}) {
  if (!animated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={blockVariants}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
}

function ScrollRevealGroup({
  animated,
  className,
  children,
  variants = splitRowVariants,
}: {
  animated: boolean;
  className?: string;
  children: ReactNode;
  variants?: Variants;
}) {
  if (!animated) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function RevealBlock({
  animated,
  variants = blockVariants,
  className,
  children,
  whileHover,
  grouped = false,
}: {
  animated: boolean;
  variants?: Variants;
  className?: string;
  children: ReactNode;
  whileHover?: { y?: number };
  grouped?: boolean;
}) {
  if (grouped) {
    if (!animated) {
      return <div className={className}>{children}</div>;
    }

    return (
      <motion.div
        variants={variants}
        className={className}
        whileHover={whileHover}
        transition={{ duration: 0.25, ease: EASE_OUT_QUART }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <ScrollRevealBlock
      animated={animated}
      className={className}
      whileHover={whileHover}
    >
      {children}
    </ScrollRevealBlock>
  );
}

function CapstoneShot({
  media,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  interactive = false,
}: {
  media: CapstoneMedia;
  className?: string;
  sizes?: string;
  interactive?: boolean;
}) {
  const { locale } = useLanguage();
  const src = media.src?.trim() ? media.src.trim() : undefined;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-muted/60",
        interactive &&
          "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-primary/30 hover:shadow-[0_8px_28px_rgba(37,99,235,0.1)] motion-reduce:transition-none",
        className,
      )}
    >
      <MediaPlaceholder
        type="image"
        src={src}
        alt={getLocalized(media.alt, locale)}
        caption={getLocalized(media.caption, locale)}
        sizes={sizes}
        className={cn(
          "aspect-16/10 min-h-[180px] w-full sm:min-h-[200px] md:min-h-[220px]",
          interactive &&
            "transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      />
    </div>
  );
}

export default function CourseProjects() {
  const { locale } = useLanguage();
  const d = courseCapstone;
  const vi = locale === "vi";
  const singleVariant = d.variants.length === 1;
  const variantIcon = singleVariant ? Package : Gamepad2;
  const VariantIcon = variantIcon;
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;

  const introGridClassName =
    "grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-10";
  const platformGridClassName =
    "mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:items-stretch md:gap-8";

  const introHero = (
    <RevealBlock animated={animated} grouped className="order-2 lg:order-1">
      <CapstoneShot
        media={d.heroMedia}
        sizes="(max-width: 1024px) 100vw, 55vw"
        interactive={animated}
      />
    </RevealBlock>
  );

  const introHeader = (
    <RevealBlock animated={animated} grouped className="order-1 lg:order-2">
      <SectionHeader
        title={getLocalized(d.title, locale)}
        subtitle={getLocalized(d.subtitle, locale)}
        badge={getLocalized(d.badge, locale)}
        align="left"
      />
    </RevealBlock>
  );

  const platformCard = (
    <RevealBlock
      animated={animated}
      grouped
      whileHover={animated ? { y: -2 } : undefined}
      className={cn(
        "flex flex-col justify-center rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8",
        animated &&
          "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-primary/35 hover:shadow-[0_10px_32px_rgba(37,99,235,0.1)] motion-reduce:transition-none motion-reduce:hover:shadow-none",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(37,99,235,0.25)]">
          <Wrench className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold tracking-tight text-foreground text-balance sm:text-2xl">
            {getLocalized(d.platformTitle, locale)}
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
            {getLocalizedList(d.platformItems, locale).map((item) => (
              <li
                key={item}
                className={cn(
                  "flex gap-2.5 rounded-lg px-1.5 py-1 -mx-1.5",
                  animated &&
                    "transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-primary/6 motion-reduce:transition-none",
                )}
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RevealBlock>
  );

  const platformImage = (
    <RevealBlock animated={animated} grouped className="h-full min-h-[200px]">
      <CapstoneShot
        media={d.platformMedia}
        className="h-full"
        interactive={animated}
      />
    </RevealBlock>
  );

  const arenaRules = getLocalizedList(d.arenaRules, locale).map((rule, i) => (
    <li
      key={rule}
      className={cn(
        "group/rule flex gap-3 rounded-xl p-2 -m-2 text-sm text-foreground sm:text-base",
        animated &&
          "transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-primary/8 motion-reduce:transition-none",
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground transition-transform duration-200 group-hover/rule:scale-105 motion-reduce:group-hover/rule:scale-100">
        {i + 1}
      </span>
      <span className="pt-0.5 text-pretty leading-snug">{rule}</span>
    </li>
  ));

  const arenaBlock = (
    <RevealBlock
      animated={animated}
      className="mt-14 rounded-2xl border border-primary/25 bg-accent p-5 sm:p-6 md:mt-20 md:p-8"
    >
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-primary" aria-hidden />
        <h3 className="text-xl font-extrabold tracking-tight text-foreground text-balance sm:text-2xl">
          {getLocalized(d.arenaTitle, locale)}
        </h3>
      </div>
      <p className="mt-3 max-w-[65ch] text-pretty text-sm text-foreground/90 sm:text-base">
        {getLocalized(d.arenaSetup, locale)}
      </p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">{arenaRules}</ol>
    </RevealBlock>
  );

  const variantBlock = (
    <RevealBlock animated={animated} className="mt-14 md:mt-20">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(37,99,235,0.25)]">
          <VariantIcon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold tracking-tight text-foreground text-balance">
            {getLocalized(d.variantsTitle, locale)}
          </h3>
          <p className="mt-2 max-w-[62ch] text-pretty text-base text-foreground/85">
            {getLocalized(d.variantsLead, locale)}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "mt-10",
          singleVariant
            ? "rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-8"
            : "space-y-10 md:space-y-14",
        )}
      >
        {d.variants.map((variant, index) => (
          <article
            key={variant.id}
            className={cn(
              "min-w-0",
              !singleVariant &&
                "border-t border-border pt-8 first:border-t-0 first:pt-0",
            )}
          >
            {!singleVariant ? (
              <p className="text-3xl font-black tabular-nums leading-none tracking-tight text-primary/25 sm:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </p>
            ) : null}
            <h4
              className={cn(
                "font-extrabold text-foreground text-balance",
                singleVariant
                  ? "text-xl sm:text-2xl"
                  : "mt-2 text-xl sm:text-2xl",
              )}
            >
              {getLocalized(variant.title, locale)}
            </h4>
            <p className="mt-1 max-w-[62ch] text-sm font-semibold text-primary text-pretty sm:text-base">
              {getLocalized(variant.tagline, locale)}
            </p>

            <dl className="mt-5 max-w-[70ch] space-y-5 text-sm leading-relaxed sm:text-base">
              <div>
                <dt className="font-bold text-foreground">
                  {vi ? "Setup" : "Setup"}
                </dt>
                <dd className="mt-1 text-pretty text-foreground/85">
                  {getLocalized(variant.setup, locale)}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-foreground">
                  {vi ? "Học sinh tự sáng tạo" : "Student freedom"}
                </dt>
                <dd className="mt-1.5">
                  <ul className="space-y-2 text-foreground/85">
                    {getLocalizedList(variant.creative, locale).map((line) => (
                      <li key={line} className="flex gap-2.5">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span className="text-pretty">{line}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-bold text-foreground">
                  {vi ? "Cách chơi" : "Gameplay"}
                </dt>
                <dd className="mt-1 text-pretty text-foreground/85">
                  {getLocalized(variant.gameplay, locale)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </RevealBlock>
  );

  return (
    <section
      id="course-projects"
      className="bg-muted/40 py-12 sm:py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <ScrollRevealGroup animated={animated} className={introGridClassName}>
          {introHero}
          {introHeader}
        </ScrollRevealGroup>

        <ScrollRevealGroup
          animated={animated}
          className={platformGridClassName}
        >
          {platformCard}
          {platformImage}
        </ScrollRevealGroup>

        {arenaBlock}
        {variantBlock}
      </div>
    </section>
  );
}
