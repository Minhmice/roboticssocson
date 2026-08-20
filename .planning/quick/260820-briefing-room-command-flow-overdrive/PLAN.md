---
quick_id: 260820-briefing-room-command-flow-overdrive
status: planned
created: 2026-08-20
description: Implement the confirmed briefing-room command flow overdrive direction for /recruitment without changing form behavior or external contracts.
files_modified:
  - src/components/recruitment/RecruitmentFlow.tsx
preserve:
  - /recruitment route and current bilingual copy structure
  - field order, required/optional behavior, validation, local draft recovery, success/error states
  - Google Forms POST URL, entry IDs, payload names, page history, and Vietnamese posted values
  - existing RECRUITMENT_SUBMIT_CLICKED / RECRUITMENT_SUBMITTED analytics events
  - light briefing-room design tokens and existing Framer Motion stack
  - no new dependencies and no sponsorship/archive changes
must_haves:
  truths:
    - Applicant can see where the current question sits in a calm chapter-based briefing flow on desktop.
    - The chapter context compresses into a readable mobile-safe progress strip without clipping, overlaying controls, or changing question order.
    - Current, completed, unanswered, and invalid answer states are visually and semantically distinguishable in Vietnamese and English.
    - Question, chapter, selection, review, submission, error, and success transitions remain purposeful and become immediate/non-positional under reduced motion.
    - Existing draft, validation, analytics, Google Forms submission, and success/error behavior remain unchanged.
  artifacts:
    - path: src/components/recruitment/RecruitmentFlow.tsx
      provides: Desktop chapter/context rail, responsive progress/answer-state feedback, and reduced-motion-aware motion polish.
      contains: AnimatePresence
  key_links:
    - from: buildBeats/copyByLocale
      to: chapter rail and progress UI
      via: Stable derived chapter metadata keyed to existing beat ids and localized labels; no field or beat reorder.
    - from: values/errors/activeIndex
      to: answer-state feedback
      via: Derived state indicators that reuse existing validation and draft-backed values without changing submission logic.
    - from: existing AnimatePresence/useReducedMotion handlers
      to: rail, question, selection, and feedback transitions
      via: Opacity/transform-only Framer Motion variants with reduced-motion branches.
---

# Briefing-room command flow overdrive for `/recruitment`

## Objective

Implement the confirmed overdrive direction as a disciplined application-briefing command flow inside `src/components/recruitment/RecruitmentFlow.tsx`: make chapter context, progress, and answer feedback feel unusually clear and responsive while preserving every existing form, analytics, recovery, localization, and submission contract.

Purpose: Help a student understand the current task and their progress at a glance without turning a serious recruitment application into a game, terminal simulation, or decorative motion demo.

Output: One focused component refinement, verified at desktop/mobile widths and with reduced motion enabled.

## Scope and invariants

- Modify only `src/components/recruitment/RecruitmentFlow.tsx`.
- Derive chapter metadata from the existing beat ids/indexes; do not add, remove, reorder, or rename fields.
- Keep Google Forms constants and `buildRecruitmentFormPayload` untouched in behavior: do not change entry IDs, payload names, `pageHistory`, or Vietnamese option values.
- Keep existing analytics event names and firing points unchanged; do not add tracking events for presentation-only rail interactions.
- Keep local draft serialization/restoration, validation, review/edit paths, iframe submission handoff, timeout/error state, success state, and reset behavior intact.
- Use existing Tailwind, Lucide, `AnimatePresence`, `motion`, `useReducedMotion`, and `cn()` patterns only. Do not add dependencies or edit sponsorship/archive surfaces.
- Keep paper-white/cool-surface backgrounds, steel borders, ink text, and tech blue as the single active signal. No dark terminal/HUD world, gradients, ambient loops, or decorative glass effects.

## Tasks

<tasks>

<task type="tracer">
  <name>Task 1: Wire the chapter/context rail into the existing beat flow</name>
  <files>src/components/recruitment/RecruitmentFlow.tsx</files>
  <action>
    Add a localized, stable chapter model beside the existing copy/beat definitions, grouping the existing beats into the application journey without changing their order or validation scope (identity/birth, discovery, contact, direction, and branch practice/review as appropriate to the current flow). Derive the active chapter, chapter completion, current question count, and answer-state summary from `activeIndex`, `values`, `errors`, `visibleFields`, and the existing review state rather than introducing parallel state.

    Reshape the active form area into a responsive briefing-room composition: on desktop (`lg` and above), show a slim contextual rail with chapter labels, current/completed/upcoming states, current chapter context, and a clear connection to the existing progress line; keep the form panel dominant. On smaller screens, collapse the rail into a compact, naturally flowing horizontal/current-chapter strip that can scroll within its own bounds if needed, never becomes sticky over the keyboard, and never creates page-origin horizontal overflow. Keep labels and status text bilingual and expose `aria-current`, meaningful navigation labeling, and non-color status cues. The rail must be informational and must not create a skip-ahead path that bypasses `advance`, validation, review, or draft behavior.

    Add responsive progress and answer-state feedback to the existing header/form action area: preserve the question count and progress semantics, but make unanswered, answered, invalid, completed, and review states legible through localized text/icon/shape cues. Reuse existing error objects and focus behavior; do not duplicate personal answers into unnecessary live regions.
  </action>
  <verify>
    <automated>npx tsc --noEmit -p tsconfig.json && npm run lint</automated>
    <manual>At `/recruitment` in VI and EN, inspect desktop at approximately 1280px and mobile at approximately 390px. Confirm the rail maps to the existing beats, the form remains dominant, the compact mobile strip stays within the viewport, current/completed/error states are understandable without relying on color alone, and the existing field order, validation, review, draft restore, and action buttons still operate through their original handlers.</manual>
  </verify>
  <done>Desktop applicants have a readable chapter/context rail tied to the existing beat flow; mobile applicants have a safe compact equivalent; progress and answer-state feedback are bilingual, accessible, and derived from existing state; no form or submission contract changed.</done>
</task>

<task type="auto">
  <name>Task 2: Add purposeful transitions and run contract-preserving QA</name>
  <files>src/components/recruitment/RecruitmentFlow.tsx</files>
  <action>
    Extend the component's existing Framer Motion choreography so chapter changes, question changes, rail state changes, answer completion feedback, selection confirmation, review entry, submission/error states, and success entry feel like one continuous briefing flow. Keep motion scoped to opacity and small transforms/scale where it improves hierarchy; use the existing strong ease-out language and avoid layout animation that shifts focused controls or changes form height unpredictably. Preserve the existing choice auto-advance timing and focus-on-mount behavior.

    Use `useReducedMotion` consistently across every new motion branch: remove positional movement and decorative repetition, make progress/state changes immediate, and preserve readable state feedback. Check keyboard focus, `aria-live` announcements, touch target sizes, viewport overflow, and mobile keyboard scrolling after the visual changes. If a lint/build issue appears, fix only the regression in this file and do not change unrelated repository work.
  </action>
  <verify>
    <automated>npm run lint && npx tsc --noEmit -p tsconfig.json && npm run build && npm run check:assets</automated>
    <manual>Run a bounded desktop/mobile pass on `/recruitment`: validate an incomplete step and a final submission error, restore a draft after refresh, switch VI/EN, inspect the hidden Google Form inputs for unchanged names/Vietnamese values, and exercise review/edit/success paths. Emulate `prefers-reduced-motion: reduce` and confirm no new positional/looping motion remains. Run the focused Impeccable detector on `src/components/recruitment/RecruitmentFlow.tsx` if available and resolve actionable contrast, overflow, focus, or motion findings.</manual>
  </verify>
  <done>Transitions and feedback feel purposeful at normal motion settings and remain immediate/accessibly calm under reduced motion; all required lint/type/build/asset checks pass; bounded QA confirms route, bilingual behavior, field order, payload contract, analytics, draft recovery, validation, and success/error states are preserved.</done>
</task>

</tasks>

## Source coverage audit

| Source | Requirement | Plan coverage | Status |
|---|---|---|---|
| GOAL | Confirmed briefing-room command flow overdrive for `/recruitment` | Tasks 1-2 | COVERED |
| PRODUCT.md | Focused bilingual recruitment completion without confusion | Tasks 1-2 | COVERED |
| DESIGN.md | Light briefing-room system, chapter/question progress, purposeful motion, reduced-motion support | Tasks 1-2 | COVERED |
| Prior recruitment quick plans | Preserve form, payload, analytics, draft, validation, trust, mobile, and localization behavior | Task 1 contract constraints + Task 2 QA | COVERED |
| User constraints | Only `RecruitmentFlow.tsx`; no dependencies; no sponsorship/archive edits; no code changes/commit during planning | Scope/invariants + both task file lists | COVERED |

## Threat model

| Boundary | Risk | Mitigation |
|---|---|---|
| Applicant input/state → presentation feedback | PII could be repeated into overly broad announcements | Derive compact answer-state labels from existing values/errors; keep answer text out of new live regions. |
| Presentation controls → existing flow state | A rail could allow invalid skip-ahead or stale index changes | Rail is informational; all progression remains through existing `advance`, validation, review, and draft handlers. |
| Motion enhancement → form usability | Animation could move focus or cause mobile overflow | Animate opacity/transform only, keep layout in normal flow, test 390px and reduced motion. |
| UI refinement → Google Forms/analytics contract | Visual changes could accidentally alter submission wiring | Modify only render/derived presentation concerns; verify hidden payload names/values and analytics behavior. |

## Success criteria

- `src/components/recruitment/RecruitmentFlow.tsx` is the only implementation file changed.
- Desktop shows a chapter/context rail and mobile shows a safe compact chapter/progress treatment.
- Progress and answer-state feedback are bilingual, accessible, responsive, and not color-only.
- Motion is purposeful, uses existing Framer Motion APIs, and respects reduced motion.
- `/recruitment` retains its route, field order, Google Forms entry contract, analytics events, local draft recovery, validation, review/edit path, and success/error behavior.
- `npm run lint`, `npx tsc --noEmit -p tsconfig.json`, `npm run build`, and `npm run check:assets` pass.
- No dependencies, sponsorship/archive files, or commits are introduced by this planning task.
