---
target: recruitment page
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-20T03-40-08Z
slug: src-components-recruitment-recruitmentflow-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No progress or step count after rail removal; only disabled "Tiếp tục" signals incomplete state |
| 2 | Match System / Real World | 3 | Student-friendly Vietnamese copy; division cards map to real team structure |
| 3 | User Control and Freedom | 2 | Visible back removed; Esc still calls `goBack()` but `keyboardHint` is never rendered |
| 4 | Consistency and Standards | 3 | Light briefing-room tokens hold on orientation/review; active steps feel generic Typeform |
| 5 | Error Prevention | 3 | Scoped beat validation, `maxLength`, date min/max, auto-advance on radio choices |
| 6 | Recognition Rather Than Recall | 2 | ~10+ beats with no location cue; applicant must remember how far they are |
| 7 | Flexibility and Efficiency | 2 | Enter-to-advance works; no visible keyboard affordances or step jumping |
| 8 | Aesthetic and Minimalist Design | 3 | Clean, but duplicate H1+label and vast empty field on wide screens |
| 9 | Error Recovery | 3 | Plain-language errors, offline/timeout handling, local draft persistence |
| 10 | Help and Documentation | 2 | Branch `aside` hints help; orientation meta explains purpose; no mid-flow guidance |
| **Total** | | **25/40** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment:** Orientation and review screens feel authored for Robotics Sóc Sơn — white card, RBS header, bilingual toggle, division briefing cards with steel borders and tech-blue selection. Active question steps drift toward category-generic Typeform: one oversized `h1`, bare textarea on `bg-slate-50`, Continue isolated at bottom-right. The briefing-room "system" disappears mid-flow.

**Deterministic scan:** `detect.mjs` returned **0 findings** on `RecruitmentFlow.tsx` and `src/app/recruitment/`. No automated token/contrast violations flagged. Implementation drift vs `DESIGN.md` §5 (progress contract) is a documentation/product gap the detector does not catch.

**Visual inspection:** Desktop/mobile orientation matches brief. User screenshot of drive step shows duplicate question in `h1` and `<label>` (`field.label || beat.prompt`), disabled Continue far from input, "0 ký tự" counter with no guidance.

## Overall Impression

The recruitment flow is technically solid and emotionally approachable at the gate, but mid-form it loses both briefing-room identity and navigational confidence. The single biggest opportunity is restoring lightweight system status and tightening the question-step composition so it feels like the same product as the orientation card — not a stripped survey widget floating in whitespace.

## What's Working

1. **Orientation card** — `rounded-2xl border border-slate-200 bg-white`, effort estimate ("6-8 phút"), privacy line, and `min-h-14` Start CTA set expectations before data collection.
2. **Division/discovery choice cards** — Radio semantics, arrow-key focus, selected `border-blue-600 bg-blue-50`, and timed auto-advance respect Operate-mode clarity without gamification.
3. **Resilience layer** — Draft persistence, offline detection, submission timeout, `aria-live` for submit/error, and review screen with per-field edit jumps are production-grade for a student audience.

## Priority Issues

### [P1] No visible progress or location in a 10+ step flow
- **Why it matters:** After removing the chapter rail, applicants cannot tell how much remains. `DESIGN.md` §5 still requires chapter + question progress. Abandonment risk rises on branch questions.
- **Fix:** Add a minimal status strip — e.g. "Câu 5 / ~12" or a thin `scaleX` progress line under the header — without restoring the full sidebar.
- **Suggested command:** `$impeccable layout`

### [P1] Duplicate question text on textarea beats
- **Why it matters:** Drive step renders the same string in `h1` and `<label htmlFor>` via `{field.label || beat.prompt}`. Screen readers announce twice; sighted users see redundant hierarchy (per user screenshot).
- **Fix:** When `field.label` is empty and prompt is already in `h1`, use `aria-labelledby` on the textarea and omit the visible label, or show a shorter field-specific label.
- **Suggested command:** `$impeccable clarify`

### [P2] Continue action visually detached from input
- **Why it matters:** `mt-16 sm:mt-20` + `justify-end` places "Tiếp tục" far below and right-aligned on desktop. On mobile it sits outside comfortable thumb reach relative to the textarea.
- **Fix:** Anchor actions directly under the field block (`max-w-xl`), left-align or full-width on narrow viewports, reduce vertical gap to `mt-8`–`mt-10`.
- **Suggested command:** `$impeccable adapt`

### [P2] Hidden back affordance after UI removal
- **Why it matters:** Back button removed per request, but `copy.keyboardHint` ("Esc để quay lại") exists and is never shown. Jordan has no visible undo; only header "Về trang đội" exits entirely.
- **Fix:** Either restore a quiet text back link near the prompt, or render `keyboardHint` as visible helper text under the action row (and ensure focus management on back).
- **Suggested command:** `$impeccable onboard`

### [P3] DESIGN.md / implementation drift on progress and first-view contract
- **Why it matters:** Docs promise progress animation and draft disclosure on first view; implementation removed these intentionally. Future agents may reintroduce wrong patterns.
- **Fix:** Update `DESIGN.md` §5 to match shipped minimal flow, or re-implement a distilled progress element aligned with user direction.
- **Suggested command:** `$impeccable document`

## Persona Red Flags

**Jordan (First-Timer):** No step indicator after Start — "Am I almost done?" never answered. Duplicate heading on motivation step reads as a mistake, eroding trust. No visible back on question steps; only exit is "Về trang đội" which feels like losing all progress.

**Sam (Accessibility):** Textarea steps duplicate the question in `h1` + label — redundant announcements. `keyboardHint` not exposed despite Esc handler existing — keyboard users discover back by accident. Boot curtain uses `aria-hidden` while blocking interaction on first visit.

**Casey (Mobile):** Continue button bottom-right after large vertical gap — thumb must travel past empty space. Internal scroll in `overflow-y-auto` region works, but primary action is not in the lower thumb zone when keyboard is closed. Character counter "0 ký tự" without minimum guidance offers no encouragement to start typing.

## Minor Observations

- Review screen back button uses `{copy.edit}` label while calling `goBack()` — inconsistent with per-field Edit buttons nearby.
- Error text uses both `text-red-700` and hard-coded `text-[#b91c1c]` in the same file.
- Boot typing sequence (`BootSequence`, 34ms interval) adds personality but conflicts with Operate-mode "no boot delay" note in DESIGN.md.
- `textarea` fixed at `rows={3}` may feel cramped for motivation/branch answers that invite longer responses.
- RBS wordmark hidden on mobile (`hidden sm:inline`) — brand signal only on desktop.

## Questions to Consider

- What if progress were a single line under the header instead of a sidebar — enough status without clutter?
- Does the motivation step need a visible label at all when the prompt already fills that role?
- What would make the active question feel like "briefing room" rather than "survey" without re-adding heavy chrome?
