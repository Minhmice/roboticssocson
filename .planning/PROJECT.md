# Robotics Sóc Sơn Sponsorship Site

## What This Is

Robotics Sóc Sơn is a bilingual marketing site for a Hanoi high school robotics team competing in FIRST Tech Challenge. The live site introduces the club (`/`), presents sponsorship pitch (`/sponsorship`), and handles donation flow (`/sponsor`).

The active milestone implements a course landing surface for **"Từ Khối Lệnh Đến Phần Cứng"** — a Scratch → mBlock/Arduino STEM course for grades 1–2 — as `/course` plus a homepage teaser, per `docs/course/`.

## Core Value

Prospective sponsors, students, and educators must quickly trust Robotics Sóc Sơn as a serious, hands-on STEM team with clear learning outcomes and credible execution.

## Business Context

- **Customer**: Sponsors, education partners, STEM supporters, and students/families evaluating Robotics Sóc Sơn.
- **Revenue model**: Sponsorship and partner funding, supported by transparent impact and budget storytelling.
- **Success metric**: Visitors understand the team/course value and take action through sponsor/contact/pitch or curriculum engagement paths.
- **Strategy notes**: `PRODUCT.md`, `DESIGN.md`, `docs/course/PRD.md`, and `docs/course/technical_SPEC.md`.

## Current Milestone: v2.0 Implement Course Landing

**Goal:** Ship production course surface (`/course` + homepage teaser) using existing Next.js stack, bilingual data modules, and sponsor-grade dark arena design.

**Target features:**

- Dedicated `/course` landing with 11 PRD sections (Hero through Register)
- Homepage `CourseTeaser` with CTA to `/course`
- Typed static data in `src/data/course*.ts` per `docs/course/DATA_CONTRACT.md`
- Navbar link + pathname-aware anchors on `/course`
- Registration via Google Form (pattern `src/app/sponsor/page.tsx`) + Messenger fallback
- Course-specific SEO metadata; lint/build/check:assets pass

**Canonical specs:** `docs/course/technical_SPEC.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_CRITERIA.md`

## Requirements

### Validated

- ✓ Bilingual sponsorship/club site with Vietnamese/English toggle — existing
- ✓ Club homepage `/` (competition, team, achievements, mission, challenge) — Phase 2
- ✓ Sponsorship pitch `/sponsorship` (budget, why sponsor, final CTA) — Phase 2
- ✓ Donation flow `/sponsor` (stepper, Google Form, QR) — existing
- ✓ Archives `sponsorship-homepage` and `sponsorship` — Phase 2
- ✓ Curriculum UX/content/design direction — Phase 1 (`01-SHAPE-BRIEF.md`)
- ✓ Dark arena/cyan design system — existing
- ✓ Static data-driven content (`src/data/*.ts`) — existing

### Active (v2.0)

- [ ] User can open `/course` and scan full course narrative (11 sections).
- [ ] User on `/` sees course teaser and can navigate to `/course`.
- [ ] Course content is bilingual via `_vi`/`_en` data modules.
- [ ] User can browse 12-lesson curriculum and 2 capstone projects from static data.
- [ ] User can request consultation (Google Form vi/en or validated inline form).
- [ ] Navbar includes course link; anchors work on `/course`.
- [ ] Course page has dedicated metadata; build verification passes.

### Out of Scope

- LMS, accounts, progress, quizzes, certificates, teacher dashboards
- Payment/enrollment backend, `POST /api/register`
- Analytics provider integration (v1)
- CMS / MDX content pipeline
- Light theme / separate course brand
- Re-implementing Phase 2 homepage/sponsorship split (already shipped)

## Context

- **Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind 4, Framer Motion, shadcn/Radix primitives.
- **Codebase map:** `.planning/codebase/`
- **Phase 1 output:** `.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md`
- **Phase 2 output:** `/sponsorship`, club-only `/`, `.planning/archives/`
- **Implementation specs:** `docs/course/` (written against real codebase patterns)

## Constraints

- **Existing brand**: Dark competition-floor/cyan glow — course extends CLB identity.
- **Static-first**: No database/CMS; content in `src/data/course*.ts`.
- **Bilingual**: `_vi`/`_en` fields + `messages/*.json` for UI chrome.
- **No new API routes** for registration v1 — Google Form external link.
- **Verification**: `npm run lint`, `npm run build`, `npm run check:assets`.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid IA: homepage teaser + `/course` | Phase 1 shape brief | Pending v2.0 |
| Google Form for registration v1 | Matches `/sponsor` pattern; no API in repo | Pending v2.0 |
| Course data in new `course*.ts` files | Backward compatible with CLB data | Pending v2.0 |
| Phase 2 sponsorship split done before course | User confirmed; club/sponsor routes live | ✓ Complete |
| Skip LMS/payment/analytics | PRD + technical spec non-goals | — |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Business Context check — customer, revenue model, success metric still accurate?
4. Audit Out of Scope — reasons still valid?
5. Update Context with current state

---
*Last updated: 2026-07-05 — Milestone v2.0 started*
