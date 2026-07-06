"use client";

import { useEffect, useState } from "react";

/** Matches fixed navbar height + breathing room in Navbar scrollToSection */
export const NAV_SCROLL_OFFSET = 80;

export function useCourseScrollSpy(
  sectionIds: readonly string[],
  enabled: boolean
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const updateActive = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= NAV_SCROLL_OFFSET) {
          current = id;
        }
      }
      setActiveId(current ?? sectionIds[0] ?? null);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [enabled, sectionIds]);

  return enabled ? activeId : null;
}
