/** Cool slate letterbox — matches site light surfaces, not dark arena */
export const DECK_STAGE_BG = "#e8edf4";

export const deckSlideTransition = {
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1] as const,
};

export function deckSlideVariants(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 28 : -28,
      scale: 0.985,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -20 : 20,
      scale: 0.99,
    }),
  };
}

export const deckRevealStagger = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Compare panels — slide in from opposite sides for sensors vs actuators */
export function deckComparePanelVariants(side: "left" | "right", reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      hidden: {},
      show: () => ({ opacity: 1, x: 0 }),
    };
  }
  const x = side === "left" ? -36 : 36;
  return {
    hidden: { opacity: 0, x, scale: 0.98 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: 0.12 + i * 0.1,
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };
}

export const deckCompareImageVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.28 + i * 0.06,
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Center connector between compare panels — scales in after first panel */
export const deckCompareConnectorVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.22 + i * 0.06,
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Section chapter band — image rises from bottom like a page turn */
export const deckChapterBandReveal = {
  hidden: { opacity: 0, y: 56, scale: 1.03 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.32 + i * 0.06,
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Chapter divider line — expands horizontally */
export const deckChapterRuleReveal = {
  hidden: { opacity: 0, scaleX: 0 },
  show: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: {
      delay: 0.24 + i * 0.06,
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Editorial slide image panel — enters from the image side (opacity stays 1) */
export function deckImageReveal(imageSide: "left" | "right", delayIndex = 3) {
  const x = imageSide === "right" ? 22 : -22;
  return {
    hidden: { opacity: 1, scale: 1.02, x },
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: delayIndex * 0.08,
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };
}

/** Editorial image — enters from the left */
export const deckEditorialImageLeftVariants = {
  hidden: { opacity: 0, x: -44, scale: 1.02 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.18 + i * 0.06,
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Stacked dual image — second frame rises after the lead image */
export const deckDualStackImageVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.42 + i * 0.08,
      duration: 0.54,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Part intro image — enters from the side on wide layouts */
export const deckPartIntroImageVariants = {
  hidden: { opacity: 0, x: 44, scale: 1.02 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.34 + i * 0.06,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 12 product columns — rise with slight scale, center reads as hero */
export const deckShowcaseColumnVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.14 + i * 0.11,
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Commitment band — lands after product grid */
export const deckShowcaseBandVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.06,
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Stagger reveal that never hides content — transform only */
export const deckRevealTransform = {
  hidden: { opacity: 1, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 13 part intro — copy rises in sequence, never opacity-gated */
export const deckTeachingIntroReveal = {
  hidden: { opacity: 1, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 13 subtitle pills — slight scale settle after title */
export const deckTeachingPillReveal = {
  hidden: { opacity: 1, y: 16, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.22 + i * 0.1,
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 13 hero image — enters from the right, always visible */
export const deckTeachingImageReveal = {
  hidden: { opacity: 1, x: 52, scale: 1.025 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.36 + i * 0.06,
      duration: 0.64,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 13 accent rule — horizontal expand without opacity fade */
export const deckTeachingRuleReveal = {
  hidden: { opacity: 1, scaleX: 0 },
  show: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: {
      delay: 0.3 + i * 0.06,
      duration: 0.46,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const deckOverdriveHeroDriftTransition = {
  duration: 11,
  repeat: Infinity,
  ease: [0.45, 0, 0.55, 1] as const,
};

export const deckOverdriveConnectorPulseTransition = {
  duration: 2.4,
  repeat: Infinity,
  ease: [0.45, 0, 0.55, 1] as const,
};

/** Slide 17 logic blocks — stack settles top-to-bottom */
export const deckLogicBlockVariants = {
  hidden: { opacity: 1, y: 20, x: -10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.22 + i * 0.09,
      duration: 0.52,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 17 outcome chips — land after block stack */
export const deckOutcomeChipVariants = {
  hidden: { opacity: 1, y: 14, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.54 + i * 0.07,
      duration: 0.44,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Slide 21 loop steps — cascade downward through the pipeline */
export const deckLoopStepVariants = {
  hidden: { opacity: 1, y: 28, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.16 + i * 0.09,
      duration: 0.56,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};
