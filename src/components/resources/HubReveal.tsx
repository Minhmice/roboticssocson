"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CSS_EASE, EASE, REDUCED_QUERY } from "@/lib/manual/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * One authored moment: sections below the first screen rise in once as they enter.
 * Sections already on screen are never touched, so there is no flash on load and
 * nothing stays hidden if JS fails. Mark targets with `data-reveal`.
 */
export function HubReveal({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`not all and ${REDUCED_QUERY}`, () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
        gsap.set(targets, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE.out, stagger: 0.06, overwrite: true }),
        });
        // Anything the trigger missed (fast jumps, anchors) must still end up visible.
        return () => gsap.set(targets, { clearProps: "opacity,visibility,transform" });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className} style={{ ["--hub-ease" as string]: CSS_EASE.out }}>
      {children}
    </div>
  );
}
