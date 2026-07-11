"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  buildDeckEnterTimeline,
  killDeckAmbientLoops,
  startDeckAmbientLoops,
  useGSAP,
} from "@/components/course/deck/deck-gsap";

type DeckSlideGsapProps = {
  slideId: number;
  children: React.ReactNode;
};

/**
 * GSAP entrance + ambient layer for every deck slide.
 * Targets elements marked with `data-deck-enter` / `data-deck-ambient`.
 */
export function DeckSlideGsap({ slideId, children }: DeckSlideGsapProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      const enterTimeline = buildDeckEnterTimeline(scope, reducedMotion);
      const ambientTweens = startDeckAmbientLoops(scope, reducedMotion);

      return () => {
        enterTimeline.kill();
        killDeckAmbientLoops(ambientTweens);
      };
    },
    {
      dependencies: [slideId, reducedMotion],
      scope: scopeRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={scopeRef} className="h-full min-h-0" data-deck-slide={slideId}>
      {children}
    </div>
  );
}
