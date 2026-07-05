# Roadmap: Robotics Sóc Sơn Sponsorship Site

**Created:** 2026-07-04  
**Updated:** 2026-07-05  
**Mode:** Vertical MVP  
**Current Milestone:** v2.0 Implement Course Landing

## Milestone v2.0 Goal

Ship production course surface for **"Từ Khối Lệnh Đến Phần Cứng"**: `/course` landing page, homepage teaser, bilingual static data, registration CTA, and nav integration — per `docs/course/`.

---

## Completed Milestones

### v1.0 — Curriculum Shape & Site Split (Complete)

| Phase | Name | Status |
|-------|------|--------|
| 1 | Shape Curriculum Experience | Complete |
| 2 | Separate Sponsorship From Homepage | Complete |

---

## Active Phases (v2.0)

### Phase 3: Course Data & Route Foundation

**Goal:** Add typed course data modules, `/course` route shell with layout metadata, and minimal hero — proving data contract and SEO before full sections.

**Mode:** mvp  
**Status:** Complete  
**UI hint:** yes

**Requirements:** DATA-01, DATA-02, NAV-01, QUAL-01, I18N-01

**Depends on:**

- `docs/course/DATA_CONTRACT.md`
- `docs/course/technical_SPEC.md` §3–5
- Existing patterns: `src/data/hero.ts`, `src/app/sponsor/page.tsx`, `src/hooks/useTranslatedData.ts`

**Success Criteria:**

1. `src/data/course*.ts` exports Lesson[], Project[], FAQItem[], registration config with bilingual fields (`LocalizedText` for curriculum).
2. `/course` route renders with `layout.tsx` metadata and `CourseHero` using `AuroraBackground` + data-driven copy.
3. Language toggle switches hero copy between vi/en.
4. `npm run build` passes with new route.

**Plans:** 3 plans in 2 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 03-01, 03-02 | SEO registry + course static data layer (parallel) |
| 2 *(blocked on Wave 1)* | 03-03 | `/course` route shell + `CourseHero` |

- `03-01-PLAN.md` — SEO registry and course route metadata (QUAL-01)
- `03-02-PLAN.md` — Course static data layer (DATA-01, DATA-02, I18N-01)
- `03-03-PLAN.md` — Course route shell and hero (NAV-01, I18N-01)

---

### Phase 4: Course Page Sections

**Goal:** Implement all PRD content sections on `/course` (problem through FAQ) using shared components and static data.

**Mode:** mvp  
**Status:** Planned  
**UI hint:** yes

**Requirements:** PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, DSGN-04

**Depends on:**

- Phase 3 data modules and route shell
- `docs/course/PRD.md` section copy
- `GlowCard`, `SectionHeader`, `MediaPlaceholder`, `FadeInSection`
- `.planning/phases/04-course-page-sections/04-CONTEXT.md`

**Success Criteria:**

1. All 11 sections render in order with stable section `id`s for anchors.
2. Curriculum lists 12 lessons from data; FAQ has ≥7 expandable items.
3. Two capstone projects render from `courseProjects.ts`.
4. UI matches dark arena tokens; responsive at 375px without horizontal overflow.
5. Manual review: visitor understands course promise in ~30 seconds.

**Plans:** 4 plans in 3 waves

| Wave | Plans | Objective |
|------|-------|-----------|
| 1 | 04-01 | Section data fill + FadeInSection helper |
| 2 | 04-02, 04-03 | Narrative sections + curriculum/projects/CTA (parallel) |
| 3 *(blocked on Wave 2)* | 04-04 | FAQ, register bridge, page composition + verify |

- `04-01-PLAN.md` — Course section data and FadeIn helper (PAGE-02 data)
- `04-02-PLAN.md` — Trust and narrative sections (PAGE-02, PAGE-05, DSGN-04)
- `04-03-PLAN.md` — Curriculum, projects, mid-page CTA (PAGE-03, PAGE-04)
- `04-04-PLAN.md` — FAQ, register bridge, page compose (PAGE-01, PAGE-06, DSGN-04)

---

### Phase 5: Integration, Teaser & Launch

**Goal:** Wire homepage teaser, navbar/footer course links, registration CTAs, pathname-aware anchors, and full verification.

**Mode:** mvp  
**Status:** Not planned yet  
**UI hint:** yes

**Requirements:** TEAS-01, TEAS-02, NAV-02, NAV-03, NAV-04, REG-01, REG-02, QUAL-02, QUAL-03

**Depends on:**

- Phase 4 complete `/course` page
- `src/components/layout/Navbar.tsx`, `Footer.tsx`, `src/app/page.tsx`
- Google Form URLs in `courseRegistration.ts` (or inline form fallback)
- `docs/course/ACCEPTANCE_CRITERIA.md` manual checklist

**Success Criteria:**

1. `CourseTeaser` on `/` with CTA to `/course`; does not list 12 lessons.
2. Navbar shows course link; on `/course`, anchors scroll to curriculum/projects/faq/register.
3. Register section opens Google Form (vi/en) and/or validated inline form + Messenger link.
4. `npm run lint`, `npm run build`, `npm run check:assets` pass.
5. `/`, `/sponsorship`, `/sponsor` regression check pass.

**Plans:** Not planned yet — run `$gsd-plan-phase 5`.

---

## Requirement Coverage (v2.0)

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | 3 | Complete |
| DATA-02 | 3 | Complete |
| NAV-01 | 3 | Complete |
| QUAL-01 | 3 | Complete |
| I18N-01 | 3 | Complete |
| PAGE-01 | 4 | Pending |
| PAGE-02 | 4 | Pending |
| PAGE-03 | 4 | Pending |
| PAGE-04 | 4 | Pending |
| PAGE-05 | 4 | Pending |
| PAGE-06 | 4 | Pending |
| DSGN-04 | 4 | Pending |
| TEAS-01 | 5 | Pending |
| TEAS-02 | 5 | Pending |
| NAV-02 | 5 | Pending |
| NAV-03 | 5 | Pending |
| NAV-04 | 5 | Pending |
| REG-01 | 5 | Pending |
| REG-02 | 5 | Pending |
| QUAL-02 | 5 | Pending |
| QUAL-03 | 5 | Pending |

**Coverage:** 18 / 18 v2.0 requirements mapped.

---

## Historical Phases (v1.0)

### Phase 1: Shape Curriculum Experience — Complete

Produced `01-SHAPE-BRIEF.md`. Requirements CURR-*, INFO-*, LESS-*, METH-*, CAP-*, DSGN-01..03 validated.

### Phase 2: Separate Sponsorship From Homepage — Complete

Live: club-only `/`, `/sponsorship`, archives. Requirements HOME-*, SPON-*, ARCH-* validated.
