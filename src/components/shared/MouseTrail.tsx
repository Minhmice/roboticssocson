"use client";

import { useEffect } from "react";

export type MouseTrailStop = {
  position: number;
  color: { r: number; g: number; b: number };
};

export type MouseTrailConfig = {
  sectionId?: string;
  squareSize?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  showOpacity?: number;
  containerZIndex?: number;
  gradientStops?: MouseTrailStop[];
};

/** Tech blue ramp — DESIGN.md primary (#2563eb). No pink / violet. */
export const ROBOTICS_TRAIL_STOPS: MouseTrailStop[] = [
  { position: 0, color: { r: 147, g: 197, b: 253 } },
  { position: 42, color: { r: 37, g: 99, b: 235 } },
  { position: 100, color: { r: 30, g: 64, b: 175 } },
];

/**
 * Desktop mouse-trail grid overlay (Farmminerals Webflow port).
 * Desktop only (≥768px); respects reduced motion by skipping init.
 *
 * Stack (ContactExperienceShell): image z-0 → gradient z-1 → trail z-2 → content z-10.
 */
export function MouseTrail({
  sectionId = "trail-section",
  squareSize = 5,
  fadeInDuration = 100,
  fadeOutDuration = 300,
  showOpacity = 0.85,
  containerZIndex = 2,
  gradientStops = ROBOTICS_TRAIL_STOPS,
}: MouseTrailConfig = {}) {
  useEffect(() => {
    const config = {
      sectionId,
      squareSize,
      fadeInDuration,
      fadeOutDuration,
      showOpacity,
      containerZIndex,
      gradientStops,
    };

    const isDesktop = () => window.innerWidth >= 768;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getGradientColor = (col: number, cols: number) => {
      const positionPercent = (col / cols) * 100;
      const stops = config.gradientStops;
      let startStop = stops[0];
      let endStop = stops[stops.length - 1];
      for (let i = 0; i < stops.length - 1; i += 1) {
        if (
          positionPercent >= stops[i].position &&
          positionPercent <= stops[i + 1].position
        ) {
          startStop = stops[i];
          endStop = stops[i + 1];
          break;
        }
      }
      const stopRange = endStop.position - startStop.position;
      const localProgress =
        stopRange > 0 ? (positionPercent - startStop.position) / stopRange : 0;
      const r = Math.round(
        startStop.color.r +
          (endStop.color.r - startStop.color.r) * localProgress
      );
      const g = Math.round(
        startStop.color.g +
          (endStop.color.g - startStop.color.g) * localProgress
      );
      const b = Math.round(
        startStop.color.b +
          (endStop.color.b - startStop.color.b) * localProgress
      );
      return `rgb(${r}, ${g}, ${b})`;
    };

    function init() {
      document.querySelector(".mouse-trail-container")?.remove();

      if (!isDesktop() || prefersReduced) return;

      const section = document.getElementById(config.sectionId);
      if (!section) return;

      const squareSizeInPx = (config.squareSize * window.innerWidth) / 100;
      const rect = section.getBoundingClientRect();
      const cols = Math.ceil(rect.width / squareSizeInPx);
      const rows = Math.ceil(rect.height / squareSizeInPx);

      const container = document.createElement("div");
      container.className = "mouse-trail-container";
      container.setAttribute("aria-hidden", "true");
      container.style.cssText = `
        position:absolute;top:0;left:0;width:100%;height:100%;
        pointer-events:none;z-index:${config.containerZIndex};
        display:grid;grid-template-columns:repeat(${cols}, 1fr);
        grid-template-rows:repeat(${rows}, 1fr);
      `;

      const squares: HTMLDivElement[] = [];
      const hideTimers: Record<number, number> = {};

      for (let i = 0; i < cols * rows; i += 1) {
        const col = i % cols;
        const sq = document.createElement("div");
        sq.style.cssText = `
          background:${getGradientColor(col, cols)};
          opacity:0;transition:opacity ${config.fadeInDuration}ms ease;
        `;
        container.appendChild(sq);
        squares.push(sq);
      }

      const hideSquare = (index: number) => {
        const sq = squares[index];
        if (!sq) return;
        sq.style.transition = `opacity ${config.fadeOutDuration}ms ease`;
        sq.style.opacity = "0";
      };

      const onMove = (event: MouseEvent) => {
        const bounds = section.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const col = Math.floor(x / squareSizeInPx);
        const row = Math.floor(y / squareSizeInPx);
        const index = row * cols + col;
        if (index < 0 || index >= squares.length) return;

        const sq = squares[index];
        sq.style.transition = `opacity ${config.fadeInDuration}ms ease`;
        sq.style.opacity = String(config.showOpacity);

        if (hideTimers[index]) window.clearTimeout(hideTimers[index]);
        hideTimers[index] = window.setTimeout(() => {
          hideSquare(index);
          delete hideTimers[index];
        }, config.fadeOutDuration);
      };

      section.addEventListener("mousemove", onMove);

      const gradientLayer = section.querySelector("[data-trail-underlay]");
      if (gradientLayer?.nextSibling) {
        section.insertBefore(container, gradientLayer.nextSibling);
      } else {
        section.appendChild(container);
      }

      (container as HTMLDivElement & { __cleanup?: () => void }).__cleanup =
        () => {
          section.removeEventListener("mousemove", onMove);
        };
    }

    init();
    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(init, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      const existing = document.querySelector(
        ".mouse-trail-container"
      ) as (HTMLDivElement & { __cleanup?: () => void }) | null;
      existing?.__cleanup?.();
      existing?.remove();
    };
  }, [
    sectionId,
    squareSize,
    fadeInDuration,
    fadeOutDuration,
    showOpacity,
    containerZIndex,
    gradientStops,
  ]);

  return null;
}
