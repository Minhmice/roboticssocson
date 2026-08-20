---
quick_id: 260820-6aq
status: planned
created: 2026-08-20
---

# Refine recruitment page copy, layout, typography, hardening, performance, responsive adaptation, and purposeful animation

## Scope

Refine `src/components/recruitment/RecruitmentFlow.tsx` and the recruitment route support only. Preserve the `/recruitment` route, bilingual structure, field order, Google Forms entry contract, analytics events, local draft recovery, and light briefing-room visual system. Do not alter sponsorship archive work or unrelated active surfaces.

## Tasks

1. Audit and update visible Vietnamese/English copy for clarity, consistent terminology, no em/en dash separators, and accurate action/state labels.
2. Improve responsive layout and typography: remove redundant eyebrow/meta treatment, strengthen content grouping, keep form controls at mobile-safe sizes, and preserve explicit field labels and focus order.
3. Harden the flow: keep validation and recovery inline, make review markup semantic, prevent stale selection timers from changing the wrong step, and preserve input/draft behavior under storage/network failures.
4. Optimize rendering and animation: use stable derived values, avoid unnecessary event work, keep motion scoped to opacity/transform, and respect reduced motion.
5. Verify with detector scopes, linter diagnostics, TypeScript/build/assets, and bounded desktop/mobile route inspection.

## Invariants

- No change to Google Forms entry IDs or payload names.
- No change to field order or required behavior unless required to correct an existing mismatch between UI and validator.
- No new dependencies.
- No active sponsorship content.

## Verification

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run check:assets`
- Impeccable type/layout detector on edited UI files
- Bounded `/recruitment` desktop/mobile inspection
