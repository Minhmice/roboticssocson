# Phase 2 Verification

**Phase:** 2 — Separate Sponsorship From Homepage  
**Date:** 2026-07-05  
**status:** passed

## Automated Checks

| Check | Result |
|-------|--------|
| `npm run lint` | pass |
| `npm run build` | pass — routes: `/`, `/sponsor`, `/sponsorship` |
| `npm run check:assets` | pass — 70/70 images |
| Homepage free of sponsorship imports | pass |
| Archive files exist | pass |

## Requirement Verification

| ID | Status | Evidence |
|----|--------|----------|
| HOME-01 | pass | `src/app/page.tsx` club sections only |
| HOME-02 | pass | Navbar/Footer link to `/sponsorship` |
| HOME-03 | pass | No design system changes; bilingual preserved |
| SPON-01 | pass | `src/app/sponsorship/page.tsx` created |
| SPON-02 | pass | Four pitch sections on `/sponsorship` |
| SPON-03 | pass | `/sponsor/page.tsx` untouched |
| ARCH-01 | pass | `.planning/archives/sponsorship-homepage/` |
| ARCH-02 | pass | `.planning/archives/sponsorship/` |

## Manual Checks (recommended)

- [ ] `/` — no budget or why-sponsor blocks visible
- [ ] `/sponsorship` — full pitch flow visible
- [ ] `/sponsor` — corporate/personal stepper works
- [ ] VI/EN toggle on both pages
