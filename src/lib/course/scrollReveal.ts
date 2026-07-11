import type { Variants } from "framer-motion";

export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/** Re-animates when the section leaves the viewport (scroll away). */
export const COURSE_SCROLL_VIEWPORT = {
  once: false,
  margin: "-50px",
} as const;

export const COURSE_SCROLL_VIEWPORT_DEEP = {
  once: false,
  margin: "-60px",
} as const;

export const ENTER_DURATION = 0.45;
export const EXIT_DURATION = 0.34;

export function scrollRevealVariants(
  offset = 14,
  axis: "y" | "x" = "y",
): Variants {
  const hiddenOffset = axis === "y" ? { y: offset } : { x: offset };
  const visibleOffset = axis === "y" ? { y: 0 } : { x: 0 };

  return {
    hidden: {
      opacity: 0,
      ...hiddenOffset,
      transition: { duration: EXIT_DURATION, ease: EASE_OUT_QUART },
    },
    visible: {
      opacity: 1,
      ...visibleOffset,
      transition: { duration: ENTER_DURATION, ease: EASE_OUT_QUART },
    },
  };
}
