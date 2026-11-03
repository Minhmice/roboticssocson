"use client";

import type React from "react";
import { BLUR, DUR, EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/manual/motion";
import { isScrollLocked } from "@/lib/manual/scroll";

type RevealType = "heading" | "rule" | "img" | "table";

let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();
const revealedElements = new WeakSet<Element>();
const activeHiddenElements = new Set<HTMLElement>();

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const cb = revealCallbacks.get(target);
            if (cb) {
              revealCallbacks.delete(target);
              sharedObserver?.unobserve(target);
              cb();
            }
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
  }
  return sharedObserver;
}

function observeElement(el: HTMLElement, onIntersect: () => void) {
  const observer = getObserver();
  if (!observer) return;
  revealCallbacks.set(el, onIntersect);
  observer.observe(el);
}

function unobserveElement(el: HTMLElement) {
  revealCallbacks.delete(el);
  sharedObserver?.unobserve(el);
}

/** Clear any hidden elements near the viewport during a programmatic jump so nothing is left hidden. */
export function clearJumpHiddenElements(): void {
  if (typeof window === "undefined" || activeHiddenElements.size === 0) return;
  const innerH = window.innerHeight;
  for (const el of Array.from(activeHiddenElements)) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= innerH * 2 && rect.bottom >= -innerH) {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "all" });
      activeHiddenElements.delete(el);
      revealedElements.add(el);
      el.dataset.revealed = "true";
      unobserveElement(el);
    }
  }
}

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      if (isScrollLocked() && activeHiddenElements.size > 0) {
        clearJumpHiddenElements();
      }
    },
    { passive: true },
  );
}

export function useBlockReveal(
  containerRef: React.RefObject<HTMLDivElement | null>,
  hasData: boolean,
): void {
  useGSAP(
    () => {
      if (!hasData || !containerRef.current) return;
      const container = containerRef.current;

      const locked = isScrollLocked();
      const reduced = prefersReducedMotion();

      if (locked) {
        clearJumpHiddenElements();
      }

      const items: Array<{ el: HTMLElement; type: RevealType }> = [];

      // 1. Headings (rule line)
      container.querySelectorAll<HTMLElement>(".manual-heading-rule").forEach((el) => {
        items.push({ el, type: "heading" });
      });

      // 2. Rule cards
      container.querySelectorAll<HTMLElement>('[data-block="rule"]').forEach((el) => {
        items.push({ el, type: "rule" });
      });

      // 3. Figures/images (the image itself, not the frame)
      container.querySelectorAll<HTMLElement>('[data-block="img"] img').forEach((el) => {
        items.push({ el, type: "img" });
      });

      // 4. Tables
      container.querySelectorAll<HTMLElement>('[data-block="table"]').forEach((el) => {
        items.push({ el, type: "table" });
      });

      const innerH = window.innerHeight;

      for (const { el, type } of items) {
        if (revealedElements.has(el) || el.dataset.revealed === "true") {
          continue;
        }

        const rect = el.getBoundingClientRect();
        const inOrAbove = rect.top < innerH;

        if (locked || inOrAbove || reduced) {
          revealedElements.add(el);
          el.dataset.revealed = "true";
          continue;
        }

        activeHiddenElements.add(el);

        switch (type) {
          case "heading":
            gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
            break;
          case "rule":
            gsap.set(el, { y: 12, opacity: 0, filter: `blur(${BLUR.soft}px)` });
            break;
          case "img":
            gsap.set(el, { scale: 0.96, opacity: 0, filter: `blur(${BLUR.soft}px)` });
            break;
          case "table":
            gsap.set(el, { opacity: 0 });
            break;
        }

        observeElement(el, () => {
          activeHiddenElements.delete(el);
          revealedElements.add(el);
          el.dataset.revealed = "true";

          if (isScrollLocked()) {
            gsap.set(el, { clearProps: "all" });
            return;
          }

          switch (type) {
            case "heading":
              gsap.to(el, {
                scaleX: 1,
                duration: 0.36,
                ease: EASE.inOut,
                clearProps: "transform",
              });
              break;
            case "rule":
              gsap.to(el, {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: DUR.ui,
                ease: EASE.out,
                clearProps: "opacity,transform,filter",
              });
              break;
            case "img":
              gsap.to(el, {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.48,
                ease: EASE.out,
                clearProps: "opacity,transform,filter",
              });
              break;
            case "table":
              gsap.to(el, {
                opacity: 1,
                duration: DUR.ui,
                ease: EASE.out,
                clearProps: "opacity",
              });
              break;
          }
        });
      }

      return () => {
        for (const { el } of items) {
          if (activeHiddenElements.has(el)) {
            gsap.killTweensOf(el);
            gsap.set(el, { clearProps: "all" });
            activeHiddenElements.delete(el);
            unobserveElement(el);
          }
        }
      };
    },
    { scope: containerRef, dependencies: [hasData] },
  );
}
