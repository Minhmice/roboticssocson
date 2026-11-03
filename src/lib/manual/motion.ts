import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase, useGSAP);

/** Bezier curves from the emil-design-eng skill (CSS string form, 4 numbers = cubic-bezier). */
export const BEZIER = {
  /** entrances, feedback: starts fast, settles soft */
  out: "0.23,1,0.32,1",
  /** on-screen movement / morph */
  inOut: "0.77,0,0.175,1",
  /** drawer / sheet (iOS-like) */
  drawer: "0.32,0.72,0,1",
} as const;

/** The same curves as ready-to-paste CSS values (for transitions and keyframes). */
export const CSS_EASE = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

/** GSAP ease names (registered below, safe to pass as `ease:`). */
export const EASE = { out: "manualOut", inOut: "manualInOut", drawer: "manualDrawer" } as const;

if (typeof window !== "undefined") {
  CustomEase.create(EASE.out, BEZIER.out);
  CustomEase.create(EASE.inOut, BEZIER.inOut);
  CustomEase.create(EASE.drawer, BEZIER.drawer);
}

/** Seconds. UI motion stays under 0.3s; only decorative one-offs may exceed it. */
export const DUR = { press: 0.14, micro: 0.18, ui: 0.24, panel: 0.36 } as const;

/** Motion blur in px (masks the crossfade between two states). Keep <= BLUR.max: heavy blur is costly in Safari. */
export const BLUR = { soft: 3, enter: 6, max: 8 } as const;

export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export const prefersReducedMotion = (): boolean => typeof window !== "undefined" && window.matchMedia(REDUCED_QUERY).matches;

export { gsap, useGSAP };
