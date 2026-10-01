# BootLoader Standardization & Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize BootLoader to run on all pages (including `/` and route transitions) waiting for actual decoded images/fonts before reveal, lazy-load non-active carousel images, code-split below-the-fold components, and add immutable asset caching.

**Architecture:** Create `useAssetPreloader` hook measuring `document.fonts.ready` and viewport critical images via `HTMLImageElement.decode()`. Update `BootLoader` and `boot-loader.ts` to include homepage and sync progress to real asset decoding with a 2.2s safety timer. Optimize Next.js configs (`optimizePackageImports`, Cache-Control headers), dynamic imports in `HomePage`, and active-slide lazy loading in `TeamCarousel`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Framer Motion, Tailwind CSS v4.

**Spec:** `docs/superpowers/specs/2026-10-02-bootloader-performance-optimization-design.md`

## Global Constraints
- Must preserve light tech briefing-room design (`DESIGN.md`).
- Respect `prefers-reduced-motion`.
- `tsc --noEmit`, `npm run lint`, `npm run build` must pass cleanly.
- Safety timeout ceiling: 2200ms maximum hold.

---

### Task 1: Create Real Asset Preloader Hook

**Files:**
- Create: `src/hooks/useAssetPreloader.ts`

**Interfaces:**
- Produces: `useAssetPreloader(options: { active: boolean; timeoutMs?: number }): { progress: number; isReady: boolean }`

- [ ] **Step 1: Write `src/hooks/useAssetPreloader.ts`**
Implement hook querying document fonts and decoding critical images (`/Logo/RBS Logo.svg`, above-the-fold images).

- [ ] **Step 2: Verify TypeScript compiles**
Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**
`git add src/hooks/useAssetPreloader.ts && git commit -m "feat: add useAssetPreloader hook with font and image decoding"`

---

### Task 2: Standardize BootLoader & Preload Gate

**Files:**
- Modify: `src/lib/boot-loader.ts`
- Modify: `src/components/layout/BootLoader.tsx`

**Interfaces:**
- Consumes: `useAssetPreloader`
- Modifies: `getBootLoaderPreloadScript` and `BootLoader` to remove homepage bypass and hook real asset progress.

- [ ] **Step 1: Update `src/lib/boot-loader.ts`**
Remove `p==="/"||p===""` bypass from inline gate script so bootloader gate applies uniformly.

- [ ] **Step 2: Update `src/components/layout/BootLoader.tsx`**
Connect `useAssetPreloader` into `BootLoaderOverlay`, remove `isHomepage` bypass, and bind progress directly to real assets loaded with smooth exit.

- [ ] **Step 3: Verify TypeScript and Lint**
Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**
`git add src/lib/boot-loader.ts src/components/layout/BootLoader.tsx && git commit -m "feat: standardize bootloader across all routes with real asset progress"`

---

### Task 3: Optimize Carousel Active-Slide Image Loading

**Files:**
- Modify: `src/components/homepage/TeamCarousel.tsx`
- Modify: `src/components/ui/member-card.tsx`

**Interfaces:**
- `MemberCardProps`: Add `eagerLoad?: boolean`

- [ ] **Step 1: Update `src/components/ui/member-card.tsx`**
Add `eagerLoad` prop: when `false`, use `loading="lazy"` on Next.js `Image`.

- [ ] **Step 2: Update `src/components/homepage/TeamCarousel.tsx`**
Only pass `eagerLoad={true}` and `imagePriority={true}` for members in `safeIndex` (active slide). Other slides get `eagerLoad={false}`.

- [ ] **Step 3: Verify TypeScript compiles**
Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**
`git add src/components/ui/member-card.tsx src/components/homepage/TeamCarousel.tsx && git commit -m "perf: defer loading carousel images for non-active slides"`

---

### Task 4: Dynamic Imports for Below-the-fold Sections

**Files:**
- Modify: `src/components/homepage/HomePage.tsx`

- [ ] **Step 1: Update `src/components/homepage/HomePage.tsx`**
Use `next/dynamic` for `AchievementsSection`, `AboutFIRSTSection`, `AboutFTCSection`, `RecruitmentDialog`, and `CourseTeaser`.

- [ ] **Step 2: Verify TypeScript compiles**
Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**
`git add src/components/homepage/HomePage.tsx && git commit -m "perf: code-split below-the-fold homepage sections"`

---

### Task 5: Next.js Cache Headers & Tree Shaking

**Files:**
- Modify: `next.config.js`

- [ ] **Step 1: Update `next.config.js`**
Add `experimental.optimizePackageImports` and long-term immutable Cache-Control headers for `/Images/:path*` and `/Logo/:path*`.

- [ ] **Step 2: Verify production build**
Run: `npm run build`

- [ ] **Step 3: Commit**
`git add next.config.js && git commit -m "perf: add package import optimization and static asset caching headers"`

---

### Task 6: End-to-End Verification & Metrics

- [ ] **Step 1: Test with browser eval**
Open `http://localhost:4000/`, measure BootLoader progress and smooth transition, verify active images are sharp on reveal.
- [ ] **Step 2: Run full checks**
Run `npm run lint` and `npm run check:assets`.
