"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (barRef.current) {
        gsap.set(barRef.current, { display: "none" });
      }
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!barRef.current) return;

      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        }
      );
    });

    return () => mm.revert();
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[60] h-[2.5px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-primary/80 via-primary to-primary shadow-[0_0_10px_var(--primary)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
