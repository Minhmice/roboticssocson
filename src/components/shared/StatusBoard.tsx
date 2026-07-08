"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { CTAButton } from "@/components/shared/CTAButton";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.25, 1, 0.5, 1] as const;

export type StatusBoardAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  target?: "_blank" | "_self";
};

type StatusBoardProps = {
  code: string;
  title: string;
  description: string;
  actions: StatusBoardAction[];
  signal?: string;
  className?: string;
};

/**
 * Competition Status Board — asymmetric recovery / 404 surface.
 * Content is always visible (no opacity-gated entrance) for crawlers,
 * headless preview, and prefers-reduced-motion.
 */
export function StatusBoard({
  code,
  title,
  description,
  actions,
  signal,
  className,
}: StatusBoardProps) {
  const reduced = Boolean(useReducedMotion());

  return (
    <div
      className={cn(
        "relative isolate grid-pattern flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-x-clip bg-background",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl sm:h-64 sm:w-64"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-12 md:px-8 lg:gap-16 lg:py-20">
        <motion.div
          className="min-w-0 md:self-end md:pb-2"
          initial={false}
          animate={reduced ? undefined : { y: [8, 0] }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <p
            className={cn(
              "font-black tabular-nums leading-none tracking-[-0.04em] text-primary text-balance",
              "text-[clamp(3.75rem,14vw,7rem)]",
            )}
          >
            <span className="sr-only">{code}. </span>
            <span aria-hidden>{code}</span>
          </p>
          <p className="mt-3 text-xs font-medium tracking-[0.04em] text-muted-foreground sm:text-sm">
            Robotics Sóc Sơn · status
          </p>
        </motion.div>

        <div className="flex min-w-0 flex-col items-start text-left">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <BrandLogo className="h-8 w-auto shrink-0 sm:h-9" />
            <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              Robotics Sóc Sơn
            </span>
          </div>

          {signal ? (
            <p className="mb-4 inline-flex max-w-full items-center rounded-full border border-primary/25 bg-accent px-3 py-1 text-xs font-medium text-primary text-pretty sm:text-sm">
              {signal}
            </p>
          ) : null}

          <h1 className="max-w-[18ch] text-balance text-[clamp(1.875rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-foreground">
            {title}
          </h1>

          <p className="mt-4 max-w-[42ch] text-pretty text-base leading-relaxed text-foreground/85 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap">
            {actions.map((action, index) => (
              <CTAButton
                key={action.label}
                label={action.label}
                variant={action.variant ?? (index === 0 ? "primary" : "secondary")}
                href={action.href}
                onClick={action.onClick}
                target={action.target}
                className="w-full min-h-[48px] px-8 text-base sm:w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
