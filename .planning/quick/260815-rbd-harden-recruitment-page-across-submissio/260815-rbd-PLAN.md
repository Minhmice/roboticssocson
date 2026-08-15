---
quick_id: 260815-rbd
status: in_progress
created: 2026-08-15
slug: harden-recruitment-page-across-submissio
description: Harden recruitment page across submission truth, accessibility, trust copy, beginner framing, mobile completion, and localization.
preserve:
  - /recruitment route and page metadata
  - Google Form POST URL, entry IDs, pageHistory, and Vietnamese option values
  - AnalyticsEvents.RECRUITMENT_PAGE_VIEWED / RECRUITMENT_SUBMIT_CLICKED / RECRUITMENT_SUBMITTED
  - Dark competition-floor identity and existing Framer Motion / reduced-motion system
must_haves:
  truths:
    - Success UI appears only after the hidden Google Form iframe completes load (or a timeout surfaces error), never immediately after form.submit()
    - Invalid Continue/Submit focuses the first invalid control, announces errors via a live summary, and radio groups use fieldset/legend with associated group errors
    - Required vs optional is visible per field; trust/privacy and next-step copy explain why personal data is collected
    - Beginner framing states no prior experience is required; division and branch prompts invite curiosity and problem-solving
    - Mobile inputs use autocomplete; drafts restore after refresh; time estimate and progress chrome are honest and uncrowded
    - English locale shows localized division/discovery labels while posted values remain Vietnamese Google Form strings
  artifacts:
    - src/components/recruitment/RecruitmentForm.tsx
    - src/app/recruitment/RecruitmentClient.tsx
    - src/lib/recruitment-form-map.ts
    - src/lib/recruitment-form-validation.ts
  key_links:
    - RecruitmentForm hidden iframe load → status success/error before RECRUITMENT_SUBMITTED
    - buildRecruitmentFormPayload Vietnamese values ↔ localized display maps
    - validateRecruitmentForm required/optional rules ↔ Field aria-required and trust copy
---

# Harden recruitment page across submission truth, accessibility, trust copy, beginner framing, mobile completion, and localization

## Objective

Close the six approved recruitment critique issues so applicants see truthful submission status, can complete the form with keyboard/screen-reader support, understand why data is required, feel welcome as beginners, finish on mobile without losing drafts, and see English option labels without breaking the Google Form contract.

Purpose: Trust and completion on `/recruitment` without redesigning the route, brand, motion, analytics, or Google Form entry map.

Output: Hardened form + client copy, verified by lint/build/assets/detector and bounded desktop/mobile browser QA.

## Non-negotiable constraints

- Do **not** change `/recruitment` routing or `page.tsx` metadata shape beyond copy if needed.
- Do **not** change `RECRUITMENT_FORM_POST_URL`, `RECRUITMENT_FORM_ENTRIES`, `RECRUITMENT_FORM_PAGE_HISTORY`, or the Vietnamese strings in `RECRUITMENT_DIVISIONS` / `RECRUITMENT_DISCOVERY_SOURCES` that Google Forms expects.
- Do **not** rename analytics event string values (`recruitment_page_viewed`, `recruitment_submit_clicked`, `recruitment_submitted`). Fire `RECRUITMENT_SUBMITTED` only after confirmed successful submission handoff (iframe load), not on click alone.
- Preserve dark competition-floor hero (`bg-slate-950`, cyan/blue glow) and the existing Framer Motion step transitions + `useReducedMotion` behavior. No new motion library.
- Do not expand scope into light-theme migration, CMS, auth, or a server proxy unless iframe-load confirmation proves impossible; prefer iframe `load` + timeout first.

## Approved issue coverage

| Issue | Plan task |
|-------|-----------|
| Wait for submission completion before success | Task 1 |
| Accessible validation / focus / live status / radio semantics | Task 1 |
| Explicit trust / required guidance | Task 2 |
| Beginner-friendly copy | Task 2 |
| Mobile autocomplete / draft recovery / honest time / progress | Task 2 |
| Localized option display; Vietnamese Google Form values | Task 1 |

## Tasks

<tasks>

<task type="tracer">
  <name>Task 1: Submission truth, a11y recovery, and localized option display</name>
  <files>src/components/recruitment/RecruitmentForm.tsx, src/lib/recruitment-form-map.ts, src/lib/recruitment-form-validation.ts</files>
  <action>
    1. Submission truth: Replace the current pattern that calls `hiddenForm.submit()` then immediately `setStatus("success")` and `captureEvent(AnalyticsEvents.RECRUITMENT_SUBMITTED, ...)`. Instead keep status `submitting` until the hidden iframe (`name="recruitment-google-form-target"`) fires `load` after this submit, then set success and fire `RECRUITMENT_SUBMITTED`. On timeout (reasonable bound, e.g. 12–15s) or submit exception, set `error` and do not fire submitted. Keep `RECRUITMENT_SUBMIT_CLICKED` on user submit attempt. Preserve payload building via `buildRecruitmentFormPayload` and all entry IDs.

    2. Accessibility: On failed `validateStep` / final validate, render a bilingual error summary with `role="alert"` (or polite/assertive live region), focus the first invalid control, and move the generic required footnote so it is not the only guidance after actions. Wrap discovery-source and division radio clusters in `fieldset` + `legend`. Associate group-level errors with `aria-describedby`. Expose `aria-required` (and visible required markers) on required controls; ensure step/status changes announce via a live region (step label + submitting/success/error).

    3. Localization without contract drift: Add display-label maps (vi/en) keyed by the existing Vietnamese option values for divisions and discovery sources in `recruitment-form-map.ts` (or colocated helpers). UI must render localized labels in English mode; radio `value` / stored form state / payload must remain the Vietnamese Google Form strings (including `"Khác"` → `__other_option__` behavior). Division title chip on step 3 must show localized label while branching still compares against Vietnamese constants.

    4. Validation alignment: Keep Vietnamese enum checks. If Facebook is marked optional in Task 2 copy, stop requiring empty Facebook in `validateRecruitmentForm` while still validating URL shape when provided; still post the entry (empty string allowed). Do not alter other entry IDs.
  </action>
  <verify>
    <automated>npx tsc --noEmit -p tsconfig.json 2>&amp;1 | Select-String -Pattern "recruitment" ; if ($LASTEXITCODE -gt 1) { exit $LASTEXITCODE }</automated>
    Manual/scripted: from `/recruitment`, force a validation failure — focus moves to first invalid field and summary is announced; English locale shows English division/discovery labels while inspecting hidden inputs still shows Vietnamese values; successful path reaches success only after iframe load (or shows error on timeout), and `recruitment_submitted` is not emitted before that.
  </verify>
  <done>
    False success path removed; a11y focus/summary/fieldset/live status present; English labels decoupled from Vietnamese posted values; Google Form entry map unchanged.
  </done>
</task>

<task type="auto">
  <name>Task 2: Trust copy, beginner framing, and mobile completion</name>
  <files>src/components/recruitment/RecruitmentForm.tsx, src/app/recruitment/RecruitmentClient.tsx</files>
  <action>
    1. Trust / required guidance: On step 1 and the form intro, add concise bilingual trust copy covering data use (recruitment contact/review only), what happens after submit, and per-field required vs optional markers (not only a trailing `* Required`). Make Facebook optional in UI + validation per Task 1, with clear optional label; keep phone/email required for contact. Birth date: use a date-friendly control (`type="date"` or equivalent) while converting to the Google Form expected display format on payload if the form expects `dd/mm/yyyy` text — do not change the entry ID.

    2. Beginner framing: Update `RecruitmentClient` proof/formBody and branch question labels so they invite curiosity and problem-solving, explicitly state that no prior robotics/CAD/coding experience is required, and accept school or self-learning examples. Add short division descriptions under each division option (localized) so first-timers understand Mechanical / Code / Communications without jargon walls. Soften step-3 prompts that currently read like expertise tests; keep the same fields and entry IDs.

    3. Mobile completion: Add appropriate `autoComplete` attributes (`name`, `bday`, `tel`, `email`, `url` as applicable). Persist form values + step to `localStorage` (namespaced key) on change and restore on mount, clearing draft on confirmed success or explicit reset. Replace the “About 3 minutes” chip with an honest estimate that reflects three steps including short written answers. Simplify mobile progress chrome so step label + bar remain readable without crowding three uppercase labels on small widths (collapse or shorten labels under `sm`).

    4. Visual identity: Keep white form card inside dark hero; do not strip intentional motion. Prefer reducing the persistent wide resting shadow only if it conflicts with DESIGN.md flat-at-rest — optional polish, not a redesign.
  </action>
  <verify>
    Browser at `/recruitment` (mobile width ≤390 and desktop ≥1280): fill step 1, refresh — draft restores; autocomplete attributes present on personal fields; EN/VI toggle shows beginner + trust copy; Facebook optional path can Continue without Facebook; progress/time copy is readable on mobile.
  </verify>
  <done>
    Trust/required/beginner copy shipped; autocomplete + draft recovery work; time/progress honest on mobile; dark identity and motion preserved.
  </done>
</task>

<task type="auto">
  <name>Task 3: Lint, build, assets, detector, and bounded browser QA</name>
  <files>src/components/recruitment/RecruitmentForm.tsx, src/app/recruitment/RecruitmentClient.tsx, src/lib/recruitment-form-map.ts, src/lib/recruitment-form-validation.ts (fix only if checks fail)</files>
  <action>
    Run project verification and bounded QA. Fix only regressions introduced by Tasks 1–2.

    1. `npm run lint`
    2. `npm run build`
    3. `npm run check:assets`
    4. Detector on touched UI files, e.g. `node .cursor/skills/impeccable/scripts/detect.mjs --json src/components/recruitment/RecruitmentForm.tsx src/app/recruitment/RecruitmentClient.tsx` (fallback `.agents/skills/impeccable/scripts/detect.mjs` if that path is the project’s active copy). Treat new real contrast/overflow findings as fix-required; known false-positive `gray-on-color` on conditional selected radio classes may be documented, not “fixed” with harmful class changes.
    5. Bounded browser QA on `/recruitment`:
       - Desktop: validation failure focus + summary; EN label / VI value check on division radios; happy-path submit shows success only after handoff; reduced-motion still respects `useReducedMotion`.
       - Mobile (~390px): draft restore after refresh; touch targets remain ≥44px; no page-origin horizontal overflow; progress chrome not overlapping actions.
  </action>
  <verify>
    <automated>npm run lint &amp;&amp; npm run build &amp;&amp; npm run check:assets</automated>
    Detector run exits usable; browser QA checklist above recorded in SUMMARY with pass/fail notes.
  </verify>
  <done>
    Lint, build, and asset check pass; detector reviewed; desktop and mobile QA confirm all six approved issues addressed without breaking preserved contracts.
  </done>
</task>

</tasks>

## Threat model (PII form)

| Threat ID | Category | Component | Severity | Disposition | Mitigation |
|-----------|----------|-----------|----------|-------------|------------|
| T-rbd-01 | Information disclosure | Step 1 personal fields | medium | mitigate | Trust copy states recruitment-only use; mark optional Facebook; no new third-party sinks |
| T-rbd-02 | Spoofing / false status | Success UI vs Google Form | high | mitigate | Success only after iframe load or explicit error on timeout |
| T-rbd-03 | Tampering | localStorage draft | low | accept | Client-only draft for UX; server of record remains Google Form POST |
| T-rbd-04 | Elevation of privilege | N/A | low | accept | Public form; no auth surface in scope |

## Acceptance criteria

- All six approved critique issues are implemented and observable on `/recruitment`.
- Google Form entry IDs, Vietnamese option values, route, analytics event names, dark competition identity, and motion/reduced-motion system remain intact.
- `npm run lint`, `npm run build`, and `npm run check:assets` pass.
- Detector run completed on touched recruitment UI files; actionable findings fixed or documented.
- Bounded desktop + mobile browser QA confirms submission truth, a11y recovery, trust/beginner copy, mobile draft/autocomplete, and EN display / VI payload split.

## Out of scope

- Redesigning the recruitment hero composition or migrating the form card to the light theme system.
- Replacing Google Forms with a custom backend/database.
- Changing PostHog event name strings or adding new analytics products.
- Unrelated site pages or curriculum surfaces.
