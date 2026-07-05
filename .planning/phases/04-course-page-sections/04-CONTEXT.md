# Phase 4: Course Page Sections - Context

**Gathered:** 2026-07-05
**Status:** Ready for planning
**Source:** `$gsd-discuss-phase 4` + impeccable shape UX pass

<domain>

## Phase Boundary

Implement all PRD content sections on `/course` from **Problem through FAQ**, composing section components into `src/app/course/page.tsx` below existing `CourseHero`. Fill static data stubs (`courseSections`, `courseProjects`, `courseFaq`) with full bilingual PRD copy. Render curriculum UI from existing `courseLessons` data.

**In scope:** `CourseProblem`, `CourseSolution`, `CourseOutcomes`, `CourseCurriculum`, `CourseProjects`, `CourseMethod`, `CourseLeveling`, `CourseAIUsage`, `CourseFAQ`, mid-page CTA band, lightweight `#course-register` messenger bridge (no form), section `id`s for anchors, bilingual UI via `getLocalized`, dark arena tokens.

**Out of scope (Phase 5):** `CourseRegister` form/Google Form UI, navbar course link & pathname-aware anchors, homepage `CourseTeaser`, real `/Images/Course/` assets, `[locale]` URL segments.

</domain>

<decisions>

## Implementation Decisions

### Curriculum UX (PAGE-03)
- **D-CURR-UI-01:** Render 12 lessons as **vertical expandable list** (not Timeline, not part-group tabs).
- **D-CURR-UI-02:** Expanded row shows **all fields**: goal, product, primaryLevel, secondaryLevel, challenge.
- **D-CURR-UI-03:** **Single-open** accordion behavior (`useState` — only one lesson expanded at a time).
- **D-CURR-UI-04:** Show **part badge** (Scratch / Hardware / Capstone) on each row from `lesson.part`.

### FAQ (PAGE-06)
- **D-FAQ-01:** Use native **`<details>` / `<summary>`** elements styled to match course surfaces (no new shadcn Accordion dependency).
- **D-FAQ-02:** Enforce **single-open** by closing sibling `<details>` on toggle (lightweight JS — native multi-open default is not acceptable).
- **D-FAQ-03:** Fill `courseFaq.ts` with **PRD's 7 required questions + 1–2 additional** bilingual entries (8–9 total).

### Data authoring (PAGE-02, DATA-02)
- **D-DATA-04:** **Full PRD copy** in Phase 4 for `courseSections`, `courseProjects`, `courseFaq` — no TBD/lorem/empty strings.
- **D-DATA-05:** Use **`LocalizedText`** (`{ vi, en }`) for new/updated section card data; align `courseProjects` fields to `LocalizedText` (arrays of strings per locale) for consistency with Phase 3 curriculum — document delta from `DATA_CONTRACT.md` `_vi`/`_en` suffixes.
- **D-DATA-06:** Problem/Solution/Outcomes/Method cards include **lucide icon name strings** in data, mapped in components.

### Capstone projects (PAGE-04)
- **D-PROJ-01:** Two projects in **two-column `GlowCard` grid** on `lg+`, stacked on mobile.
- **D-PROJ-02:** Each card shows **full breakdown**: description, components, logic steps, skills (from data lists).
- **D-PROJ-03:** Project visual = **`MediaPlaceholder` without asset path** (same as hero) until `/Images/Course/` exists.

### Section order & CTAs (PAGE-01, PAGE-02, PAGE-05)
- **D-RHYTHM-01:** Section order = **PRD order** after Hero: Problem → Solution → Outcomes → Curriculum → Projects → Method → Leveling → AI → FAQ → Register bridge.
- **D-RHYTHM-02:** **Trust-first scan path** — do not move Curriculum above Problem/Solution/Outcomes; strengthen copy/hierarchy in first three sections for parent 30-second comprehension.
- **D-RHYTHM-03:** **Mid-page CTA band** after Curriculum, before FAQ: slate full-width band with short headline + primary/secondary CTAs (`#course-register` / `#course-curriculum` or Messenger).
- **D-RHYTHM-04:** Problem / Solution / Outcomes (and similar card sections) use **`repeat(3, 1fr)` grid on `lg`**, single column mobile — not identical icon+heading+text card clone on every section (see D-UX-01).

### Register anchor (bridge only — Phase 5 owns form)
- **D-REG-BRIDGE-01:** `#course-register` section = **Messenger bridge**: `SectionHeader` + short copy from `courseRegistrationConfig` + `CTAButton` to `messengerUrl` — **no inline form**, no empty placeholder form.

### UI/UX shape (impeccable + DESIGN.md) — DSGN-04
- **D-UX-01:** **Mixed surfaces per section** — avoid uniform GlowCard grid on every block; vary layout (prose list, step rail, expandable rows, metric highlights).
- **D-UX-02:** **Sparse section badges** — optional badge on `SectionHeader` only where it adds meaning; no all-caps eyebrow on every section.
- **D-UX-03:** **Competition-grade STEM tone** — dark arena + cyan signal, purposeful lucide icons; **reject** cartoon/kid-only palette or PRD light theme.
- **D-UX-04:** **Subtle scroll fade-in** per section (`opacity` + `translateY` ~12px via framer-motion); respect `prefers-reduced-motion` (instant/crossfade).
- **D-UX-05:** Curriculum + FAQ rows use **pit-slate flat surfaces** (`border-slate-800`, `bg-slate-900/30`); cyan glow only on hover/open/focus — flat-by-default per DESIGN.md.
- **D-UX-06:** FAQ uses **pit-slate styled `<details>` rows** (not GlowCard per item).
- **D-UX-07:** Mid-page CTA uses **slate band** (`bg-slate-900/50 border-y border-slate-800`) — **no second AuroraBackground**.

### Carried forward (do not re-decide)
- Dark arena brand, `getLocalized` + `LocalizedText`, existing `CourseHero`, server SEO from Phase 3.
- Section `id`s: `course-problem`, `course-curriculum`, `course-projects`, `course-faq`, `course-register` (+ others per `docs/course/technical_SPEC.md`).
- Reuse `SectionHeader`, `GlowCard`, `CTAButton`, `MediaPlaceholder`, spacing `py-12 sm:py-16 md:py-24`, `max-w-7xl`.

### the agent's Discretion
- Exact framer-motion wrapper (per-section vs shared `FadeInSection` helper).
- Which sections get a `SectionHeader` badge (sparse — e.g. Curriculum + Projects only).
- Lucide icon picks per card from data strings.
- Messenger bridge copy tweaks within `courseRegistrationConfig` bilingual fields.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Course specs
- `docs/course/PRD.md` — section copy, FAQ questions, project descriptions, method steps
- `docs/course/technical_SPEC.md` — component tree, section IDs, curriculum/FAQ UI notes, styling overrides
- `docs/course/DATA_CONTRACT.md` — types (adapt to `LocalizedText` per D-DATA-05)
- `docs/course/ACCEPTANCE_CRITERIA.md` — Phase 4 verification checklist
- `.planning/REQUIREMENTS.md` — PAGE-01..06, DSGN-04

### Design system
- `DESIGN.md` — dark arena tokens, typography, glow rules
- `.impeccable/design.json` — HUD cyan, pit slate, narrative rules, anti-patterns
- `PRODUCT.md` — reject cartoon kid-STEM; competition-grade positioning

### Phase 3 outputs
- `.planning/phases/03-course-data-route-foundation/03-CONTEXT.md` — data/i18n/SEO boundaries
- `.planning/phases/03-course-data-route-foundation/03-SUMMARY.md` — what shipped
- `src/data/courseCurriculum.ts` — 12 lessons (read-only content source)
- `src/data/courseHero.ts`, `src/lib/course/getLocalized.ts`
- `src/app/course/CourseHero.tsx`, `src/app/course/page.tsx`

### Code patterns
- `src/components/shared/SectionHeader.tsx`, `GlowCard.tsx`, `CTAButton.tsx`, `MediaPlaceholder.tsx`
- `src/components/sponsor/WhySponsor.tsx` — card grid reference
- `src/app/course/` — integration point for new section components

### Impeccable shape (UX planning)
- `.claude/skills/impeccable/reference/shape.md` — mixed surfaces, trust-first hierarchy
- `.claude/skills/impeccable/reference/brand.md` — brand slop avoidance, sparse badges

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets
- `SectionHeader` — section title rhythm; use badges sparingly (D-UX-02).
- `GlowCard` — projects grid + outcome highlights; not for every section.
- `CTAButton` — mid-page CTA band + messenger bridge.
- `MediaPlaceholder` — project visuals without assets.
- `getLocalized` + `courseLessons` — curriculum data ready.
- Framer Motion — already in project for subtle section entrance (D-UX-04).

### Established Patterns
- `"use client"` section components with `useLanguage` + `getLocalized`.
- `py-12 sm:py-16 md:py-24` + `max-w-7xl mx-auto px-4 sm:px-6 md:px-8`.
- Bilingual static data in `src/data/course*.ts`, exported via `src/data/index.ts`.

### Integration Points
- Extend `src/app/course/page.tsx` to compose sections below `CourseHero`.
- Populate `courseSections.ts`, `courseProjects.ts`, `courseFaq.ts` (currently empty stubs).
- Add section components under `src/app/course/Course*.tsx` per technical spec file tree.

</code_context>

<specifics>

## Specific Ideas

### Curriculum row example
Pit-slate row: lesson number + part badge + title; chevron; expand reveals labeled fields (Goal, Product, Cấp 1, Cấp 2, Challenge) in `text-foreground` / `text-muted-foreground`.

### Mid-page CTA band
After `#course-curriculum`, before FAQ: one-line parent-facing prompt ("Sẵn sàng cho con bắt đầu?") + "Đăng ký tư vấn" → `#course-register` + secondary back to curriculum.

### Impeccable anti-patterns to avoid
No gradient text, no side-stripe borders, no numbered `01/02/03` eyebrows on every section, no identical 12× GlowCard curriculum grid, no second aurora hero band.

</specifics>

<deferred>

## Deferred Ideas

- Full registration form / Google Form integration — Phase 5 (`REG-01`, `REG-02`).
- Navbar pathname-aware course anchors — Phase 5 (`NAV-02`..`NAV-04`).
- Homepage `CourseTeaser` — Phase 5 (`TEAS-01`, `TEAS-02`).
- Course OG image and `/Images/Course/` photography — when assets available.
- shadcn Radix Accordion — rejected in favor of `<details>` (D-FAQ-01).

</deferred>

---

*Phase: 04-course-page-sections*
*Context gathered: 2026-07-05*
