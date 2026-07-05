---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Implement Course Landing
status: planning
last_updated: "2026-07-05T08:32:48.119Z"
last_activity: 2026-07-05
progress:
  total_phases: 3
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-07-05)

**Core value:** Prospective sponsors, students, and educators must quickly trust Robotics Sóc Sơn as a serious, hands-on STEM team with clear learning outcomes and credible execution.
**Current focus:** Milestone v2.0 — Implement Course Landing

## Current Milestone

**v2.0 Implement Course Landing** — Ship `/course` + homepage teaser per `docs/course/`.

## Current Phase

### Phase 3: Course Data & Route Foundation

**Status:** Not planned yet
**Mode:** mvp
**UI hint:** yes

**Goal:** Add typed course data modules, `/course` route shell with layout metadata, and minimal hero.

**Requirements:** DATA-01, DATA-02, NAV-01, QUAL-01, I18N-01

**Plans:** 0 — run `$gsd-plan-phase 3`

### Previous Milestone (v1.0 — Complete)

- Phase 1: Shape Curriculum Experience ✓
- Phase 2: Separate Sponsorship From Homepage ✓ (`/sponsorship`, club-only `/`, archives)

## Accumulated Context

### Roadmap Evolution

- 2026-07-04: GSD project initialized for existing Robotics Sóc Sơn sponsorship site.
- 2026-07-04: Codebase mapped into `.planning/codebase/` before initialization.
- 2026-07-04: Research captured for Scratch → mBlock/Arduino curriculum, AI-supported learning, and draw.io flowchart scaffolding.
- 2026-07-04: Phase 1 created: Shape Curriculum Experience.
- 2026-07-04: Phase 1 planned with `01-PLAN.md` for `/impeccable shape` design brief output.
- 2026-07-04: Phase 1 executed inline; `01-SHAPE-BRIEF.md` created and UAT opened for user confirmation.
- 2026-07-04: User approved the shape brief. Phase 1 marked complete.
- 2026-07-05: Phase 2 added: separate sponsorship from homepage, preserve archived snapshots (`sponsorship-homepage`, `sponsorship`), and keep `/sponsor` donation flow intact.
- 2026-07-05: Phase 2 executed — homepage split, `/sponsorship` live, archives saved, verification passed.
- 2026-07-05: Milestone v2.0 started — implement course landing per `docs/course/`.

### Current Decisions

- v2.0 scope: production `/course` page + homepage teaser; static data; Google Form registration.
- Site integration direction is hybrid: homepage teaser plus dedicated curriculum page.
- Phase 2 sponsorship split is complete — not in v2.0 scope.
- Roadmap mode is Vertical MVP.
- GSD config uses YOLO mode, standard granularity, parallel execution, adaptive model profile, research enabled, plan check disabled, verifier disabled, drift guard enabled.

### Constraints

- Preserve existing dark arena/cyan/silver design system.
- Avoid cartoonish/kid-only STEM aesthetics.
- Keep new curriculum content static-first and data-driven until implementation scope expands.
- Do not add LMS, accounts, progress tracking, payment, or simulator features in v1.

## Verification Notes

- Codebase map secret scan found no common secret patterns.
- No commits were created by the assistant because the user did not explicitly request a git commit.
- Phase 1 automated document checks and user confirmation passed.

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-07-05 — Milestone v2.0 started
