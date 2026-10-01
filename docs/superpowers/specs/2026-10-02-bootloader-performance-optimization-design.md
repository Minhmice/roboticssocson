# Design Specification: BootLoader Standardization & Web Performance Optimization

- **Date:** 2026-10-02
- **Topic:** BootLoader Standardization & Web Performance Optimization
- **Status:** Approved by User

---

## 1. Context & Motivation

Robotics Sóc Sơn is a high-performance Next.js 16 bilingual web platform. Currently:
1. **BootLoader Skipping Homepage:** The initial boot animation and asset gate are bypassed on the homepage (`/`), resulting in visible image loading pop-in and layout shift for high-resolution images.
2. **Artificial Progress:** BootLoader previously relied purely on a fixed timer without measuring whether actual DOM and image assets were decoded and ready to display.
3. **Over-fetching Critical Images:** The Team Carousel renders all 13 member cards simultaneously into the DOM, causing Next.js to immediately fetch all 13 high-resolution portraits on first paint.
4. **Heavy Initial Bundle:** Major below-the-fold sections and popup dialogs are statically bundled together, delaying initial interaction and inflating script execution duration.
5. **Missing Long-Term Cache Headers:** Static public assets under `/Images/` and `/Logo/` lack explicit immutable cache headers.

---

## 2. Goals & Success Criteria

1. **Deterministic Asset Readiness:** BootLoader operates on all pages (including `/` on hard load/F5 and route transitions). It displays real progress based on fonts and critical viewport assets, exiting only when critical images are decoded or an emergency safety cap is reached.
2. **Smooth Reveal Transition:** Page reveal transition is standardized to avoid any image flashing, pop-in, or layout shifts upon boot exit.
3. **Optimized Initial Payload:**
   - Carousel images restricted to the active slide on boot; other slides load on demand or idle.
   - Below-the-fold homepage sections dynamically imported via `next/dynamic`.
   - Tree-shaking enabled via `optimizePackageImports` in `next.config.js`.
   - Public assets cached with `Cache-Control: public, max-age=31536000, immutable`.
4. **Safety & Accessibility:**
   - 2.2s safety timeout ensures the page never hangs if an asset fails or connection is slow.
   - Respects `prefers-reduced-motion` with an instant/abbreviated transition.
   - `tsc --noEmit`, `npm run lint`, and `npm run build` must pass cleanly.

---

## 3. Architecture & Module Design

### 3.1. Real Asset Preloading (`src/hooks/useAssetPreloader.ts`)
A dedicated React hook that:
- Awaits `document.fonts.ready`.
- Collects critical above-the-fold images (`/Logo/RBS Logo.svg`, active slide images, hero assets).
- Utilizes `HTMLImageElement.prototype.decode()` wrapped in `Promise.allSettled()` to guarantee GPU-readiness.
- Emits real progress `[0..1]` with throttling to smoothly update `SegmentedProgress`.
- Enforces a 2200ms hard ceiling safety timer.

### 3.2. BootLoader Standardization (`src/lib/boot-loader.ts` & `src/components/layout/BootLoader.tsx`)
- Remove the homepage exemption (`isHomepagePath` bypass).
- Integrate `useAssetPreloader` into `BootLoaderOverlay` for both `initial` hard loads and `route` navigation.
- Smoothly transition `holding` -> `exiting` when asset progress reaches 100% or timeout triggers.
- Preserve existing `data-rbs-boot` HTML head gate for instant flash prevention.

### 3.3. Carousel Image Lazy Napping (`src/components/homepage/TeamCarousel.tsx`)
- Pass slide visibility flags (`isActiveSlide`, `isAdjacentSlide`) to each `MemberCard`.
- Only members in the active slide load with priority/eager decoding during boot.
- Remaining slides defer image network requests until user navigation or post-boot idle.

### 3.4. Code Splitting & Dynamic Imports (`src/components/homepage/HomePage.tsx`)
- Convert heavy below-the-fold components to `next/dynamic`:
  - `AchievementsSection` (SSR enabled)
  - `AboutFIRSTSection` (SSR enabled)
  - `AboutFTCSection` (SSR enabled)
  - `RecruitmentDialog` (client-only, idle load)
  - `CourseTeaser` (SSR enabled)

### 3.5. Next.js Config Tuning (`next.config.js`)
- Add `experimental.optimizePackageImports` for:
  - `lucide-react`
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-tabs`
  - `framer-motion`
- Add cache headers for `/Images/:path*` and `/Logo/:path*`:
  - `Cache-Control: public, max-age=31536000, immutable`

---

## 4. Verification & Testing Plan

1. **Functional Verification (Puppeteer / Browser Eval):**
   - Hard load `/` and verify BootLoader renders with actual progress increments, then cleanly exits to a fully painted page.
   - Verify active slide images are loaded before transition completes; no image pop-in.
   - Verify internal route navigation (e.g. to `/contact-us`, `/course`) uses standardized wipe transition.
2. **Performance Metrics:**
   - Measure Core Web Vitals (FCP, LCP, CLS, longTasks) in browser.
   - Verify initial image requests drop from 19+ down to critical-only on page load.
3. **Build & Typecheck:**
   - Run `npx tsc --noEmit` -> 0 errors.
   - Run `npm run lint` -> 0 errors.
   - Run `npm run build` -> clean Next.js build.
