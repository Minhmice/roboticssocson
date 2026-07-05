# Phase 3: Course Data & Route Foundation - Context

**Gathered:** 2026-07-05
**Status:** Ready for planning
**Source:** `$gsd-discuss-phase 3`

<domain>

## Phase Boundary

Deliver typed static course data modules, SEO infrastructure (`src/lib/seo/`), `/course` route shell (`layout.tsx` + `page.tsx`), and `CourseHero` — proving the data contract and route-level metadata before Phase 4 renders the remaining sections.

**In scope:** `courseHero.ts`, `courseCurriculum.ts` (12 lessons), types inline per file, `src/lib/seo/`, `/course` route, hero with `AuroraBackground`, bilingual data, `npm run build` pass.

**Out of scope (later phases):** Homepage teaser (Phase 5), navbar course link (Phase 5), sections Problem→FAQ (Phase 4), registration UI (Phase 5), full curriculum UI rendering (Phase 4), course images under `/Images/Course/` (optional later), `[locale]` URL segments like `/en/course` (deferred).

</domain>

<decisions>

## Implementation Decisions

### Data module organization
- **D-DATA-01:** Split data files per `docs/course/technical_SPEC.md`: `courseHero.ts`, `courseCurriculum.ts`, `courseProjects.ts`, `courseFaq.ts`, `courseRegistration.ts`, `courseSections.ts` (create stubs/exports where Phase 3 does not fill content yet).
- **D-DATA-02:** TypeScript interfaces/types live **inline** in each data file (pattern: `hero.ts`, `sponsorPage.ts`) — no separate `src/types/course.ts` in Phase 3.
- **D-DATA-03:** Export new modules from `src/data/index.ts`.

### Course lesson shape (course-specific i18n)
- **D-CURR-01:** `courseCurriculum.ts` exports **exactly 12** lessons.
- **D-CURR-02:** Use nested `LocalizedText = { vi: string; en: string }` for course domain fields (differs from site-wide `_vi`/`_en` suffix pattern — intentional for course data clarity).
- **D-CURR-03:** Each lesson satisfies `CourseLesson`: `id` (number 1–12), `title`, `goal`, `product`, `primaryLevel`, `secondaryLevel`, `challenge` — all `LocalizedText`.
- **D-CURR-04:** **No placeholders:** no `TBD`, empty strings, lorem ipsum, or "coming soon". Content is **concise** (1–2 sentences per field), not full teaching scripts.
- **D-CURR-05:** Phase 3 creates data only; **does not** render full curriculum UI (Phase 4 owns `CourseCurriculum` component).

### Hero visual (Phase 3)
- **D-UI-01:** `CourseHero` uses `MediaPlaceholder` **without** a real image path — gradient/icon treatment only; do not reference `/Images/Course/` assets that do not exist yet.
- **D-UI-02:** Reuse `AuroraBackground`, `CTAButton`, `useTranslatedData` or a small `getLocalized(text, locale)` helper for `LocalizedText` fields in hero data.

### SEO strategy (upgraded — user A+)
- **D-SEO-01:** Root `layout.tsx` defines **global defaults + `title.template` only** — not page-specific course titles.
- **D-SEO-02:** `/course` owns SEO via **route-level** `generateMetadata` (or static `metadata` fed by factory) in `src/app/course/layout.tsx`.
- **D-SEO-03:** Introduce typed SEO registry:
  - `src/lib/seo/metadata.ts` — `RouteSeo` type + `buildMetadata(seo: RouteSeo): Metadata`
  - `src/lib/seo/course-seo.ts` — `courseSeo: Record<Locale, RouteSeo>` with vi/en title, description, canonicalPath, optional ogImage
- **D-SEO-04:** **No client-side SEO patching** for `/course` — no `useEffect` / `document.title` / extending `useDynamicMetadata` for course route.
- **D-SEO-05:** Server-rendered metadata uses **Vietnamese** as default for `/course` in Phase 3 (matches `html lang="vi"` and default locale). English strings live in `courseSeo.en` for registry completeness and future routing.
- **D-SEO-06:** **`/en/course` URL locale segment is deferred** — current site uses client `LanguageContext` + `localStorage`, not `[locale]` App Router segments. Do not refactor root app to `[locale]` in Phase 3. Document EN metadata in registry; full locale-per-URL SEO is a future milestone if product requires it.

### Route
- **D-ROUTE-01:** Course route slug is `/course` (`src/app/course/page.tsx` + `layout.tsx`).

### Carried forward (do not re-decide)
- Dark arena / cyan brand — Phase 1–2 + `DESIGN.md`
- Hybrid teaser + full page — Phase 1; teaser implementation Phase 5
- No API / Google Form registration — Phase 5 (data stub in `courseRegistration.ts` OK in Phase 3)
- Static-first `src/data/` — `docs/course/technical_SPEC.md`

### the agent's Discretion
- Exact `RouteSeo` optional fields (`keywords`, `ogImage`) — use RBS logo fallback until course OG asset exists.
- Whether `courseHero` uses `_vi`/`_en` suffixes or `LocalizedText` — prefer `LocalizedText` for consistency with curriculum; hero can use either if helper is shared.
- Stub shape for `courseProjects.ts`, `courseFaq.ts`, `courseRegistration.ts` in Phase 3 (empty arrays vs minimal one item) — must not break TypeScript build.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Course specs (primary)
- `docs/course/technical_SPEC.md` — route tree, component reuse, phase boundaries
- `docs/course/DATA_CONTRACT.md` — baseline types (Phase 3 may use `LocalizedText` variant per D-CURR-02 — document delta in plan)
- `docs/course/ACCEPTANCE_CRITERIA.md` — verification checklist
- `docs/course/PRD.md` — lesson titles and section copy source

### Shape & product
- `.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md` — journey, lesson model intent
- `DESIGN.md` — dark arena visual system
- `.planning/REQUIREMENTS.md` — DATA-01, DATA-02, NAV-01, QUAL-01, I18N-01

### Code patterns
- `src/data/hero.ts` — bilingual data module pattern
- `src/data/sponsorPage.ts` — single-domain data file pattern
- `src/app/sponsor/page.tsx` — dedicated route composer pattern
- `src/app/1. competition/Hero.tsx` — `AuroraBackground`, `useTranslatedData`, CTAs
- `src/app/layout.tsx` — root metadata baseline
- `src/hooks/useDynamicMetadata.ts` — **do not extend** for course SEO (D-SEO-04)
- `.planning/codebase/ARCHITECTURE.md` — app shell, data flow
- `.planning/codebase/CONVENTIONS.md` — component/data conventions

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets
- `AuroraBackground` — course hero background (`src/components/ui/aurora-background.tsx`)
- `CTAButton` — hero CTAs (`src/components/shared/CTAButton.tsx`)
- `MediaPlaceholder` — hero visual without asset (`src/components/shared/MediaPlaceholder.tsx`)
- `useTranslatedData` — site-wide `_vi`/`_en` fields; course may add `getLocalized()` for `LocalizedText`
- `useLanguage` — locale for rendering

### Established Patterns
- Data in `src/data/*.ts`, pages compose sections under `src/app/`
- Dedicated routes: `src/app/sponsor/page.tsx`, `src/app/sponsorship/page.tsx` (thin composers)
- Section spacing: `py-12 sm:py-16 md:py-24`, `max-w-7xl mx-auto px-4 sm:px-6 md:px-8`
- Client components use `"use client"` when hooks/motion needed

### Integration Points
- `src/app/course/layout.tsx` — new; metadata factory entry
- `src/app/course/page.tsx` — compose `CourseHero` only in Phase 3
- `src/data/index.ts` — add exports
- Root layout unchanged except optional `title.template` refinement

</code_context>

<specifics>

## Specific Ideas

### Lesson content example (user-provided minimum viable)

Lesson 1 fields should read like real curriculum copy, e.g. title "Làm quen Scratch" / "Getting Started with Scratch", product "Nhân vật nói xin chào và di chuyển", challenge "Tạo đoạn hội thoại giữa hai nhân vật" — concise, bilingual, complete.

### SEO registry sketch (user-provided)

```ts
type RouteSeo = {
  title: string
  description: string
  keywords?: string[]
  canonicalPath: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}
```

`buildMetadata(seo)` returns Next.js `Metadata` with `alternates.canonical` and Open Graph fields.

### Phase 3 acceptance additions (from discussion)
- `/course` `<title>` is course-specific, not overwritten to CLB sponsorship title
- `courseCurriculum.ts` compiles with 12 complete lessons, no placeholder strings
- No `document.title` client patch on `/course`
- Club `/`, `/sponsorship`, `/sponsor` unchanged

</specifics>

<deferred>

## Deferred Ideas

- **`[locale]` App Router segment** (`/en/course`) — requires site-wide i18n routing refactor; out of Phase 3 scope (D-SEO-06)
- **Course OG image** `/Images/Course/og.webp` — add when design provides asset
- **Align DATA_CONTRACT.md** with `LocalizedText` nested shape — update doc in Phase 3 or 4 if planners prefer single source
- **Homepage teaser, navbar course link** — Phase 5 per roadmap

</deferred>

---

*Phase: 03-course-data-route-foundation*
*Context gathered: 2026-07-05*
