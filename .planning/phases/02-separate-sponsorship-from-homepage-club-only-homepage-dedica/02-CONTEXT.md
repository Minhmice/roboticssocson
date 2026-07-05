# Phase 2: Separate Sponsorship From Homepage - Context

**Gathered:** 2026-07-05
**Status:** Ready for planning
**Source:** User request via `$gsd-phase` and `$gsd-plan-phase`

<domain>

## Phase Boundary

Refactor the live site so `/` becomes a club-introduction homepage only. Move all sponsorship/financial pitch sections off the homepage onto a dedicated sponsorship surface. Preserve two reusable archived snapshots for later reuse: `sponsorship-homepage` (full current homepage composition) and `sponsorship` (sponsorship-only bundle). Do not break the existing `/sponsor` donation/stepper flow.

This phase implements routing/IA changes and reuses existing section components — no new visual design system work.

</domain>

<decisions>

## Decisions

### D-01 — Homepage scope is club introduction only
- `/` renders: Hero, About FIRST, About FTC, About Soc Son High School, Team, Achievements, Mission, The Challenge.
- `/` must NOT render: `BudgetFundraising`, `BudgetBreakdown`, `WhySponsor`, `FinalCTA`.

### D-02 — Dedicated sponsorship pitch route
- Former homepage sponsorship/financial sections move to a dedicated route at `/sponsorship`.
- Section order on `/sponsorship`: `TheChallenge` (optional bridge — see D-06), `BudgetFundraising`, `BudgetBreakdown`, `WhySponsor`, `FinalCTA`.
- `/sponsor` remains the donation/stepper action page and is linked from the sponsorship surface and nav CTA.

### D-03 — Archive before mutate
- Before changing live routes, snapshot current compositions under `.planning/archives/`.
- `sponsorship-homepage` archive preserves the exact current `src/app/page.tsx` import list and section order.
- `sponsorship` archive preserves the sponsorship-only section bundle as a reusable composition file.

### D-04 — Navigation and CTA realignment
- Navbar/Footer must stop anchoring to `#budget-section` and `#why-sponsor` on `/`.
- Sponsorship nav links route to `/sponsorship` (with in-page anchors where useful).
- Hero primary CTA on club homepage should no longer default to `/sponsor`; use a club-focused action (e.g. scroll to `#about-first` or `#achievements`).

### D-05 — Preserve brand and bilingual patterns
- Reuse existing section components, data modules, and `useTranslatedData` / `t()` patterns.
- No rebrand; keep dark arena/cyan system from `DESIGN.md`.

### D-06 — The Challenge placement
- `TheChallenge` stays on the club homepage because it frames the team story, but its budget scroll CTA must target `/sponsorship#budget-section` instead of an on-page anchor removed from `/`.

### the agent's Discretion
- Exact archive file naming inside `.planning/archives/` as long as both snapshot names are discoverable.
- Whether `/sponsorship` uses a thin `page.tsx` composer or a shared `SponsorshipLanding` component.
- Minor message key additions in `messages/vi.json` and `messages/en.json` for nav labels if needed.

</decisions>

<canonical_refs>

## Canonical References

### Live composition (source of truth before change)
- `src/app/page.tsx` — current homepage section order
- `src/app/3. financial-need/BudgetFundraising.tsx`
- `src/app/3. financial-need/BudgetBreakdown.tsx`
- `src/app/4. sponsorship/WhySponsor.tsx`
- `src/app/shared/FinalCTA.tsx`
- `src/app/sponsor/page.tsx` — donation flow (must remain intact)
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/app/1. competition/Hero.tsx`

### Design and conventions
- `DESIGN.md` — visual system constraints
- `.planning/codebase/ARCHITECTURE.md` — app shell and section layering
- `.planning/codebase/CONVENTIONS.md` — bilingual/data/nav patterns
- `.planning/REQUIREMENTS.md` — HOME/SPON/ARCH requirement IDs

</canonical_refs>

<specifics>

## Specific Ideas

- User phrasing: "homepage chỉ là giới thiệu clb thôi, còn tài trợ thì để ra một page riêng, lưu riêng, sau cần dùng thì vẫn lôi ra được."
- Archive names requested explicitly: `sponsorship-homepage` and `sponsorship`.
- Unused legacy sections exist (`Sponsorship.tsx`, `SponsorshipProcess.tsx`) but are not on the current homepage; do not scope them into this phase unless needed for `/sponsorship`.

</specifics>

<deferred>

## Deferred Ideas

- Curriculum homepage teaser from Phase 1 shape brief (IMPL-01) — separate future phase.
- Redirect middleware for old external links to `#budget-section` on `/` — only add if user requests; not required for v1 split.
- Merging `/sponsor` and `/sponsorship` into one route — rejected; keep action flow separate from pitch page.

</deferred>

---

*Phase: 02-separate-sponsorship-from-homepage*
*Context gathered: 2026-07-05*
