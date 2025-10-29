"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseScrollSnapOptions {
  delay?: number;
  threshold?: number;
  snapSpeed?: "slow" | "normal" | "fast" | number;
  easing?: "ease-in-out" | "ease-out" | "ease-in" | "linear";
}

export function useScrollSnap(options: UseScrollSnapOptions = {}) {
  const {
    delay = 300,
    threshold = 50,
    snapSpeed = "slow",
    easing = "ease-in-out",
  } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollY = useRef(0);

  const snapToNearestSection = useCallback(() => {
    const sections = document.querySelectorAll("[data-scroll-snap]");
    if (sections.length === 0) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const centerY = scrollY + windowHeight / 2;

    let nearestSection: Element | null = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenterY = rect.top + scrollY + rect.height / 2;
      const distance = Math.abs(centerY - sectionCenterY);

      if (distance < minDistance) {
        minDistance = distance;
        nearestSection = section;
      }
    });

    if (nearestSection && minDistance > threshold) {
      // Calculate snap duration based on snapSpeed
      let duration: number;
      if (typeof snapSpeed === "number") {
        duration = snapSpeed;
      } else {
        switch (snapSpeed) {
          case "slow":
            duration = 1000;
            break;
          case "fast":
            duration = 300;
            break;
          case "normal":
          default:
            duration = 600;
            break;
        }
      }

      // Apply custom scroll behavior with duration
      const startY = window.scrollY;
      const targetY = nearestSection.getBoundingClientRect().top + scrollY;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Multiple easing functions for smoother animation
        let easedProgress: number;
        switch (easing) {
          case "ease-in-out":
            easedProgress =
              progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            break;
          case "ease-out":
            easedProgress = 1 - Math.pow(1 - progress, 3);
            break;
          case "ease-in":
            easedProgress = progress * progress * progress;
            break;
          case "linear":
            easedProgress = progress;
            break;
          default:
            easedProgress =
              progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        }

        const currentY = startY + (targetY - startY) * easedProgress;
        window.scrollTo(0, currentY);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, [threshold, snapSpeed, easing]);

  const handleScroll = useCallback(() => {
    isScrollingRef.current = true;
    lastScrollY.current = window.scrollY;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for snap
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      snapToNearestSection();
    }, delay);
  }, [delay, snapToNearestSection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  return {
    isScrolling: isScrollingRef.current,
  };
}
