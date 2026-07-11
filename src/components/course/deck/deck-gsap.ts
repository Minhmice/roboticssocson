import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export { useGSAP };

export const DECK_GSAP_EASE = "power3.out";
export const DECK_GSAP_EASE_IN = "power2.in";

export const DECK_GSAP_DURATION = {
  slide: 0.52,
  enter: 0.58,
  media: 0.72,
  micro: 0.36,
  rule: 0.48,
} as const;

export type DeckEnterRole =
  | "ghost"
  | "chip"
  | "headline"
  | "subhead"
  | "rule"
  | "step"
  | "card"
  | "item"
  | "connector"
  | "band"
  | "media"
  | "pill";

const ENTER_SEQUENCE: DeckEnterRole[] = [
  "ghost",
  "chip",
  "headline",
  "subhead",
  "rule",
  "step",
  "card",
  "item",
  "connector",
  "pill",
  "band",
  "media",
];

const ENTER_OVERLAP = 0.38;

function enterFromVars(role: DeckEnterRole): gsap.TweenVars {
  switch (role) {
    case "ghost":
      return { scale: 0.88, autoAlpha: 0, transformOrigin: "50% 50%" };
    case "chip":
    case "pill":
      return { y: 16, scale: 0.9, autoAlpha: 0 };
    case "headline":
      return { y: 36, autoAlpha: 0 };
    case "subhead":
      return { y: 22, autoAlpha: 0 };
    case "rule":
      return { scaleX: 0, autoAlpha: 1, transformOrigin: "0% 50%" };
    case "step":
    case "card":
      return { y: 28, scale: 0.94, autoAlpha: 0 };
    case "item":
      return { x: -18, autoAlpha: 0 };
    case "connector":
      return { scale: 0.72, autoAlpha: 0 };
    case "band":
      return { y: 24, autoAlpha: 0 };
    case "media":
      return { scale: 1.06, autoAlpha: 0, transformOrigin: "50% 55%" };
    default:
      return { y: 20, autoAlpha: 0 };
  }
}

function enterDuration(role: DeckEnterRole): number {
  if (role === "media") return DECK_GSAP_DURATION.media;
  if (role === "rule") return DECK_GSAP_DURATION.rule;
  if (role === "chip" || role === "pill" || role === "connector") return DECK_GSAP_DURATION.micro;
  return DECK_GSAP_DURATION.enter;
}

function enterStagger(role: DeckEnterRole): number {
  if (role === "item" || role === "step") return 0.09;
  if (role === "card") return 0.11;
  if (role === "pill") return 0.08;
  return 0;
}

/** Orchestrated entrance for `[data-deck-enter]` roles inside a slide scope. */
export function buildDeckEnterTimeline(
  scope: HTMLElement,
  reducedMotion: boolean,
): gsap.core.Timeline {
  const targets = gsap.utils
    .toArray<HTMLElement>("[data-deck-enter]", scope)
    .filter((el) => !el.closest("[data-deck-fm-scope]"));

  if (targets.length === 0) {
    return gsap.timeline();
  }

  if (reducedMotion) {
    gsap.set(targets, { autoAlpha: 1, clearProps: "transform,filter" });
    return gsap.timeline();
  }

  gsap.set(targets, { autoAlpha: 1 });

  const tl = gsap.timeline({
    defaults: { ease: DECK_GSAP_EASE },
  });

  let started = false;

  for (const role of ENTER_SEQUENCE) {
    const els = targets.filter((el) => el.dataset.deckEnter === role);
    if (els.length === 0) continue;

    const position = started ? `-=${ENTER_OVERLAP}` : 0;
    started = true;

    if (els.length > 0) {
      tl.from(
        els,
        {
          ...enterFromVars(role),
          duration: enterDuration(role),
          stagger: enterStagger(role),
        },
        position,
      );
    }
  }

  const untyped = targets.filter((el) => !el.dataset.deckEnter);
  if (untyped.length > 0) {
    tl.from(
      untyped,
      {
        y: 22,
        autoAlpha: 0,
        duration: DECK_GSAP_DURATION.enter,
        stagger: 0.07,
      },
      started ? `-=${ENTER_OVERLAP}` : 0,
    );
  }

  return tl;
}

/** Slide-level transition when the deck index changes. */
export function animateDeckSlideTransition(
  el: HTMLElement,
  direction: number,
  reducedMotion: boolean,
): gsap.core.Tween {
  if (reducedMotion) {
    return gsap.set(el, {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      clearProps: "filter",
    });
  }

  const sign = direction >= 0 ? 1 : -1;

  return gsap.fromTo(
    el,
    {
      x: sign * 48,
      autoAlpha: 0,
      scale: 0.978,
      filter: "blur(10px)",
    },
    {
      x: 0,
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: DECK_GSAP_DURATION.slide,
      ease: DECK_GSAP_EASE,
      clearProps: "filter",
    },
  );
}

/** Subtle idle motion for hero frames, connectors, and floating chips. */
export function startDeckAmbientLoops(
  scope: HTMLElement,
  reducedMotion: boolean,
): gsap.core.Tween[] {
  if (reducedMotion) return [];

  const tweens: gsap.core.Tween[] = [];

  gsap.utils.toArray<HTMLElement>('[data-deck-ambient="drift"]', scope).forEach((el) => {
    tweens.push(
      gsap.to(el, {
        scale: 1.045,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-deck-ambient="float"]', scope).forEach((el, i) => {
    tweens.push(
      gsap.to(el, {
        y: "+=7",
        duration: 3.8 + i * 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-deck-ambient="pulse"]', scope).forEach((el) => {
    gsap.set(el, { scale: 1, autoAlpha: 0.45 });
    tweens.push(
      gsap.to(el, {
        scale: 1.42,
        autoAlpha: 0,
        duration: 2.2,
        repeat: -1,
        ease: DECK_GSAP_EASE,
      }),
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-deck-ambient="glow"]', scope).forEach((el) => {
    tweens.push(
      gsap.to(el, {
        opacity: 0.55,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
    );
  });

  return tweens;
}

export function killDeckAmbientLoops(tweens: gsap.core.Tween[]): void {
  tweens.forEach((tween) => tween.kill());
}
