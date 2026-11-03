---
name: gsap
description: Official GSAP AI skill suite for GreenSock Animation Platform. Covers core tweens, timelines, ScrollTrigger, React integration (useGSAP), plugins, utils, and 60fps performance optimizations.
license: MIT
---

# GSAP Animation Suite

Official GreenSock Animation Platform (GSAP) skill collection for building high-performance, fluid web animations.

## Skills in this Suite

1. **`gsap-core`**
   - Core API: `gsap.to()`, `gsap.from()`, `gsap.fromTo()`, `gsap.set()`
   - Easing functions (`power2.out`, `expo.inOut`, custom curves)
   - Duration, delay, stagger patterns, autoAlpha, transform shortcuts (`x`, `y`, `scale`, `rotation`)
   - Responsive & accessibility controls via `gsap.matchMedia()` and `prefers-reduced-motion`

2. **`gsap-react`**
   - React & Next.js integration via `@gsap/react`
   - `useGSAP()` hook for automatic scoping and memory cleanup
   - Safely targeting React refs vs. CSS selectors
   - Avoiding layout jumps and strict mode double-invocations

3. **`gsap-scrolltrigger`**
   - Scroll-linked animations, pinning (`pin: true`), scrubbing (`scrub: 1` or `true`)
   - Trigger points (`start: "top center"`, `end: "bottom top"`)
   - `ScrollTrigger.refresh()` after dynamic DOM/layout changes
   - Parallax, horizontal scroll sections, and card stacking

4. **`gsap-timeline`**
   - Choreographing multi-element sequences with `gsap.timeline()`
   - Position parameters (`"<"`, `"-=0.2"`, `"+=0.5"`, labels)
   - Nesting timelines and controlling playback (`play()`, `pause()`, `reverse()`, `seek()`)

5. **`gsap-plugins`**
   - Plugin registration (`gsap.registerPlugin(...)`)
   - Free official plugins: ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, MorphSVG, DrawSVG, MotionPath
   - NOTE: Since Webflow acquired GSAP, all plugins are 100% free for commercial use directly from `npm i gsap`.

6. **`gsap-utils`**
   - Utility functions: `gsap.utils.clamp()`, `mapRange()`, `normalize()`, `interpolate()`, `random()`, `snap()`, `toArray()`, `wrap()`, `pipe()`

7. **`gsap-performance`**
   - 60fps optimization guidelines: prefer composite-only properties (`transform`, `opacity`)
   - Managing `will-change` without memory bloat
   - Batching DOM reads and writes; avoiding layout thrashing

8. **`gsap-frameworks`**
   - Lifecycle management and scoped cleanup for Vue, Svelte, and other non-React frameworks.

## Quick Canonical React/Next.js Example

```tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Automatic cleanup handled by useGSAP
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.to(".hero-card", {
        scrollTrigger: {
          trigger: ".hero-card",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        scale: 1.05,
        ease: "none",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <h1 className="hero-title">Robotics Sóc Sơn</h1>
      <div className="hero-card" />
    </div>
  );
}
```
