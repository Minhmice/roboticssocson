# Phase 2 Research: Separate Sponsorship From Homepage

**Researched:** 2026-07-05
**Phase:** 2 — Separate Sponsorship From Homepage
**Confidence:** HIGH

## Summary

The codebase is a static Next.js App Router site with page-level section composition in `src/app/page.tsx`. Sponsorship content is already modularized into section components under `src/app/3. financial-need/` and `src/app/4. sponsorship/`. Splitting homepage vs sponsorship is a composition/routing refactor, not a data-model rewrite. The lowest-risk approach is: archive current compositions first, add `src/app/sponsorship/page.tsx` as a composer, slim `src/app/page.tsx`, then update Navbar/Footer/Hero/TheChallenge links.

## Current Homepage Composition

```tsx
Hero → AboutFIRST → AboutFTC → AboutSocSonHighSchool → TeamCarousel →
Achievements → Mission → TheChallenge → BudgetFundraising → BudgetBreakdown →
WhySponsor → FinalCTA
```

**Club-only block:** lines 1–7 (through TheChallenge)
**Sponsorship block:** BudgetFundraising, BudgetBreakdown, WhySponsor, FinalCTA

## Existing Routes

| Route | Purpose | Action |
|-------|---------|--------|
| `/` | Combined homepage today | Slim to club-only |
| `/sponsor` | Corporate/personal donation stepper | Keep unchanged |
| *(new)* `/sponsorship` | Sponsorship pitch sections | Create composer page |

`/sponsor` and `/sponsorship` serve different jobs: pitch vs transaction. Navbar `CTAButton` "Tài trợ ngay" can continue pointing to `/sponsor` or `/sponsorship` — recommend `/sponsorship` for nav discovery and keep `/sponsor` CTAs inside pitch sections.

## Section Anchor IDs (for cross-route linking)

| Component | Section ID |
|-----------|------------|
| BudgetFundraising | `budget-section` |
| WhySponsor | `why-sponsor` |
| TheChallenge | `the-challenge` |

`TheChallenge.scrollToBudget()` currently targets `#budget-section` on same page — must become `router.push('/sponsorship#budget-section')` or `<Link href="/sponsorship#budget-section">`.

## Navbar/Footer Impact

**Navbar** (`src/components/layout/Navbar.tsx`):
- Remove `#budget-section` and `#why-sponsor` anchor links from homepage nav.
- Replace with route links to `/sponsorship` (and optionally `/sponsorship#budget-section`).
- Keep `/sponsor` CTA button or retarget to `/sponsorship` — prefer sponsorship pitch first per IA.

**Footer** (`src/components/layout/Footer.tsx`):
- `#why-sponsor` quick link → `/sponsorship`.

**Hero** (`src/app/1. competition/Hero.tsx`):
- Primary CTA currently `href="/sponsor"` — change to club action per D-04.
- Secondary PDF download can remain if pitch PDF is still club-relevant, or move to sponsorship page.

## Archive Strategy

Store non-routable snapshots under `.planning/archives/` (outside `src/app/` so Next.js does not expose them):

```
.planning/archives/
  sponsorship-homepage/
    README.md          — purpose, date, restore instructions
    page.snapshot.tsx  — copy of src/app/page.tsx before change
  sponsorship/
    README.md
    page.snapshot.tsx  — sponsorship-only composer (TheChallenge optional + 4 pitch sections)
```

Using `.planning/archives/` keeps archives versioned with GSD docs and avoids accidental public routes. README in each folder documents how to restore or copy back into `src/app/`.

## Unused Components (out of scope)

- `src/app/4. sponsorship/Sponsorship.tsx` — not imported anywhere
- `src/app/4. sponsorship/SponsorshipProcess.tsx` — not imported anywhere

Do not wire these into `/sponsorship` in this phase unless explicitly needed; they duplicate content patterns already in WhySponsor + `/sponsor`.

## Recommended Implementation Order

1. Copy snapshots to `.planning/archives/` (ARCH-01, ARCH-02)
2. Create `src/app/sponsorship/page.tsx` composing sponsorship sections (SPON-01, SPON-02)
3. Slim `src/app/page.tsx` (HOME-01)
4. Update Navbar, Footer, Hero, TheChallenge CTAs (HOME-02, SPON-03)
5. Run `npm run lint`, `npm run build`, `npm run check:assets`

## Risks

| Risk | Mitigation |
|------|------------|
| Broken in-page anchors from external bookmarks | Document in archive README; optional future redirect |
| Hero loses sponsor conversion on `/` | Nav + `/sponsorship` + FinalCTA on pitch page retain paths |
| TheChallenge still imports budget data on club page | Acceptable — it tells team story; CTA links out |

## Validation Architecture

### Automated checks
- `npm run lint` — ESLint pass
- `npm run build` — Next.js production build pass
- `npm run check:assets` — image path validation
- `rg "BudgetFundraising|BudgetBreakdown|WhySponsor|FinalCTA" src/app/page.tsx` — must return no imports after slim

### Manual checks
- `/` shows club sections only; no budget/why-sponsor blocks visible
- `/sponsorship` shows all four former pitch sections
- `/sponsor` stepper still works
- VI/EN toggle works on both pages
- Navbar sponsorship link navigates to `/sponsorship`, not dead anchors on `/`

## RESEARCH COMPLETE
