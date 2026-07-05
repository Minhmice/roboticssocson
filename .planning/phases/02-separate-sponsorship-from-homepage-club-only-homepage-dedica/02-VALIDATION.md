# Phase 2 Validation Strategy

**Phase:** 2
**Slug:** separate-sponsorship-from-homepage
**Created:** 2026-07-05

## Validation Architecture

This phase modifies live routes and navigation. Validation combines automated build/lint/asset checks with route-level behavioral assertions.

## Required Checks

### Requirement Coverage

Every Phase 2 requirement must be implemented and verifiable:

- HOME-01, HOME-02, HOME-03
- SPON-01, SPON-02, SPON-03
- ARCH-01, ARCH-02

### Decision Coverage

Implementation must honor CONTEXT.md decisions D-01 through D-06.

### Automated Commands

| Command | Pass condition |
|---------|----------------|
| `npm run lint` | Exit 0 |
| `npm run build` | Exit 0 |
| `npm run check:assets` | Exit 0 |
| `rg "BudgetFundraising|BudgetBreakdown|WhySponsor|FinalCTA" src/app/page.tsx` | No matches |
| `test -f .planning/archives/sponsorship-homepage/page.snapshot.tsx` | File exists |
| `test -f .planning/archives/sponsorship/page.snapshot.tsx` | File exists |
| `test -f src/app/sponsorship/page.tsx` | File exists |

### Manual Route Checks

- `/` — club sections visible; no budget table or why-sponsor cards
- `/sponsorship` — budget fundraising, budget breakdown, why sponsor, final CTA visible
- `/sponsor` — stepper loads; corporate/personal selection works
- Navbar sponsorship link opens `/sponsorship` (not dead `#` anchor on `/`)
- VI/EN toggle works on `/` and `/sponsorship`

## Release Criteria

Phase 2 passes when all automated commands pass and manual route checks confirm the IA split.
