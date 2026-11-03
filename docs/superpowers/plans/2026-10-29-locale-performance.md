# Locale and Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship static Vietnamese and English URLs with server-rendered localized content while removing current locale hydration faults and highest-confidence loading waste.

**Architecture:** Locale is a first-class App Router segment (`/[locale]`) validated at route boundary and statically generated for `vi` and `en`. Server-only dictionary/data resolution replaces root client locale state; client leaves receive localized props or locale as serializable data. Existing unprefixed routes redirect to `/vi/*` to preserve Vietnamese default and inbound links.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Playwright, ESLint; no new dependency.

**Spec:** `PRODUCT.md`, `DESIGN.md`, repository `AGENTS.md`.

## Global Constraints

- Vietnamese remains default locale.
- Preserve light technical visual system and bootloader requirement: shell stays blocked until page assets finish.
- Do not add i18n dependencies or a backend/CMS.
- Do not weaken tests, asset checks, or verification configuration.
- Localized pages require server-rendered `<html lang>`, metadata, canonical URL, `hreflang`, and static generation.
- Bilingual copy must not mix languages unless product copy intentionally does so.

---

### Task 1: Locale primitives and dictionary validation

**Files:**
- Create: `src/lib/i18n/locales.ts`
- Create: `src/lib/i18n/messages.ts`
- Create: `scripts/check-i18n.mjs`
- Create: `tests/e2e/i18n-routing.spec.ts`
- Modify: `package.json`

**Interfaces:**
- Produces `Locale`, `locales`, `defaultLocale`, `hasLocale(locale)`, `getMessages(locale)`.
- `npm run check:i18n` fails when message key paths or `{token}` sets differ by locale.

- [ ] Write Playwright expectations for `/vi` and `/en` document language and locale-visible navigation.
- [ ] Run test and observe route failure before locale routing exists.
- [ ] Implement locale primitives and server-only JSON dictionary loader.
- [ ] Implement zero-dependency key/token parity checker and script entry.
- [ ] Run `npm run check:i18n` and targeted Playwright test.

### Task 2: Static locale route skeleton and SEO

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/(homepage)/page.tsx`
- Create: `src/app/[locale]/fundraising/page.tsx`
- Create: `src/app/[locale]/recruitment/page.tsx`
- Create: `src/app/[locale]/contact-us/page.tsx`
- Create: `src/app/[locale]/course/page.tsx`
- Modify: `src/lib/seo/metadata.ts`, `src/lib/seo/routes-seo.ts`, `src/app/sitemap.ts`, `next.config.js`

**Interfaces:**
- Every public page has `/vi/...` and `/en/...` static output.
- `buildMetadata(locale, seo)` emits locale canonical and alternates.

- [ ] Write test asserting `/en` has `lang=en`, English title, canonical `/en`, and Vietnamese alternate.
- [ ] Run test and observe failure.
- [ ] Implement locale validation, `generateStaticParams`, locale-aware metadata, and alternate sitemap entries.
- [ ] Redirect legacy unprefixed public paths to `/vi/...`.
- [ ] Run targeted test, `npm run lint`, `npm run build`.

### Task 3: Remove client locale state and migrate shared shell

**Files:**
- Modify: `src/app/layout.tsx`, `src/components/layout/AppShell.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/shared/LanguageToggle.tsx`
- Delete: `src/contexts/LanguageContext.tsx`, `src/hooks/useDynamicMetadata.ts`, `src/components/layout/DynamicMetadata.tsx`

**Interfaces:**
- Language toggle links to parallel locale route and preserves current pathname.
- Shell receives server-provided localized labels; no `localStorage` locale state or opacity timeout.

- [ ] Write route-switch test asserting toggle changes URL and document language.
- [ ] Run test and observe failure.
- [ ] Migrate shell to server-provided dictionary and locale links; delete obsolete context paths.
- [ ] Run targeted Playwright test, lint, and build.

### Task 4: Migrate content data to one localized schema

**Files:**
- Create: `src/lib/i18n/localized.ts`
- Modify: affected `src/data/*.ts`, homepage/course/fundraising/recruitment/contact components, `src/hooks/useTranslatedData.ts`
- Delete: `src/hooks/useTranslatedData.ts` after all callers move.

**Interfaces:**
- `Localized<T> = { vi: T; en: T }` and `localize(value, locale): T`.
- Data supports strings, lists, and nested data with compile-time locale coverage.

- [ ] Write unit-free deterministic checker fixture/assertion through `check:i18n` or a focused Playwright surface test for English text.
- [ ] Run it and observe untranslated/missing output before migration.
- [ ] Migrate consumers route by route; correct known inverted/missing translations.
- [ ] Delete `_vi/_en` resolver only after no caller remains.
- [ ] Run `npm run check:i18n`, lint, build, and public-route browser tests.

### Task 5: High-confidence loading fixes

**Files:**
- Modify: `src/app/layout.tsx`, `next.config.js`, `src/components/shared/MediaPlaceholder.tsx`, `src/components/ui/member-card.tsx`, `src/components/shared/AnimatedComponents.tsx`, `src/app/course/CourseHero.tsx`

**Interfaces:**
- Inter includes Vietnamese glyphs.
- Only true LCP image preloads; all image wrappers declare bounded responsive `sizes`.
- Optimized image responses carry long-lived cache policy.

- [ ] Add browser checks for above-fold LCP image priority and no broken image requests.
- [ ] Run them before behavior changes and record failures where applicable.
- [ ] Add Vietnamese font subset, image cache TTL, bounded image defaults, correct team-card sizes, remove duplicate CourseHero priority request, set scroll reveals to once.
- [ ] Run `npm run check:assets`, lint, build, and browser checks.

### Task 6: Bootloader and client-boundary optimization

**Files:**
- Modify: `src/lib/boot-loader.ts`, `src/components/layout/BootLoader.tsx`, `src/hooks/useAssetPreloader.ts`, `src/components/shared/BootLink.tsx`, `src/app/course/page.tsx`, `src/components/homepage/HomePage.tsx`, `src/lib/posthog/client.ts`

**Interfaces:**
- Boot gate always releases after a finite timeout and honors reduced motion/background tabs.
- Asset readiness still gates initial reveal; route navigation retains Next prefetch.
- Static content stays server-rendered where it has no browser behavior.

- [ ] Write Playwright test for boot gate release under reduced motion and a link navigation assertion.
- [ ] Run test and observe failure where current behavior blocks/persists.
- [ ] Implement minimal resilient boot/fallback behavior, defer analytics, and isolate client leaves.
- [ ] Run production browser smoke, Lighthouse, lint, asset check, build, and full Playwright suite.

### Task 7: Verification and visual review

**Files:**
- Modify only files found defective in tasks 1–6.

- [ ] Run `npm run check:i18n`, `npm run lint`, `npm run check:assets`, `npm run build`, and `npm run test:e2e`.
- [ ] Start production server; verify `/vi`, `/en`, `/vi/course`, `/en/course`, `/vi/fundraising`, `/en/fundraising` at desktop and mobile widths.
- [ ] Verify locale links, reload, console, network image 404s, canonical/hreflang markup, reduced motion, and boot reveal.
- [ ] Run Lighthouse against `/vi` and `/en`; compare LCP, CLS, and transferred JavaScript with recorded baseline.
