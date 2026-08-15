---
target: recruitment page
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-08-15T12-14-12Z
slug: src-app-recruitment-recruitmentclient-tsx
---
# Recruitment page critique and audit

Method: dual-agent (A: e7a612f2-f8d3-4614-9926-c8cdc8776cc4 · B: 79cd8fb2-a7d5-4e8c-bc7b-4a58a67aec9e)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Clear steps and success state; errors and step changes are not announced. |
| 2 | Match System / Real World | 3 | Natural copy, but technical vocabulary assumes familiarity. |
| 3 | User Control and Freedom | 2 | Back exists; no save, resume, cancel, or draft recovery. |
| 4 | Consistency and Standards | 3 | Cohesive visuals; localized option labels diverge. |
| 5 | Error Prevention | 2 | Validation exists; required status and date constraints are weak. |
| 6 | Recognition Rather Than Recall | 2 | Division choices lack descriptions and beginner framing. |
| 7 | Flexibility and Efficiency | 2 | No autocomplete, saved draft, or accelerated return path. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean hierarchy; mobile progress chrome is crowded. |
| 9 | Error Recovery | 2 | Content is preserved, but recovery guidance and focus are weak. |
| 10 | Help and Documentation | 1 | Little guidance on divisions, privacy, commitment, or next steps. |
| **Total** | | **23/40** | **Acceptable** |

## Design Specificity Verdict

The dark competition palette, “RBS 4.0 / OPEN CALL,” confident Vietnamese copy, and bilingual controls feel team-specific. The white wizard remains category-interchangeable because it carries no team imagery, division previews, commitment expectations, or selection-process detail into the application.

The CLI detector returned two `gray-on-color` warnings in `RecruitmentForm.tsx` at lines 483 and 512. Both are false positives caused by conditional classes: selected states use `bg-blue-50 text-blue-900`; `text-slate-900` only applies to white unselected states.

Browser injection succeeded. The Human tab contains four visible overlays. The palette, radial hero, eyebrow, and CTA glow follow DESIGN.md; the persistent wide form-card shadow is the one verified design-system drift.

## Overall Impression

This is a polished, usable foundation with a clear hierarchy and strong motion restraint. Its largest opportunity is trust: the interface asks beginners for significant personal data and technical essays before explaining why, how selection works, or whether submission actually succeeded.

## What's Working

- Desktop split composition places persuasion and action in one viewport.
- Three-step progressive disclosure, large controls, preserved values, and clear progress create a solid interaction base.
- Reduced-motion handling works. Browser verification found zero active page animations with reduced motion enabled.
- Mobile controls measured at least 48px high, and no page-originated horizontal overflow was found.

## Priority Issues

### [P1] Submission can report success before Google Forms responds

- **Why it matters:** Applicants can see “Application sent” even when the request fails.
- **Fix:** Confirm iframe load or submit through a controlled proxy endpoint before setting success.
- **Suggested command:** `/impeccable harden`

### [P1] Validation is neither announced nor focused

- **Why it matters:** Keyboard and screen-reader users can remain on Continue while six errors appear elsewhere.
- **Fix:** Add a live error summary, focus the first invalid control, connect group errors with fieldset/legend, and expose required state programmatically.
- **Suggested command:** `/impeccable harden`

### [P1] Personal-data collection lacks trust context

- **Why it matters:** Mandatory birth date, phone, email, and Facebook fields can trigger abandonment.
- **Fix:** Mark each field required or optional, explain data use, and make Facebook optional or offer another contact method.
- **Suggested command:** `/impeccable clarify`

### [P1] Beginner promise conflicts with technical screening

- **Why it matters:** Students with potential may self-reject when the final questions read like an expertise test.
- **Fix:** Reframe around curiosity and problem-solving, explicitly accepting no prior experience and school/self-learning examples.
- **Suggested command:** `/impeccable clarify`

### [P2] Mobile effort exceeds the three-minute promise

- **Why it matters:** Long typing, no autocomplete, and no draft recovery increase interruption loss.
- **Fix:** Add autocomplete, local draft persistence, a date control, fewer required essays, and an honest estimate.
- **Suggested command:** `/impeccable adapt`

### [P2] English mode retains Vietnamese option values

- **Why it matters:** The bilingual flow becomes inconsistent at key decisions.
- **Fix:** Separate stored Google Form values from localized display labels.
- **Suggested command:** `/impeccable harden`

## Persona Red Flags

**Jordan, first-timer:** Division names lack descriptions; technical vocabulary appears without beginner framing; required status is easy to miss.

**Sam, accessibility-dependent:** Radio groups lack fieldset/legend; group errors are not programmatically associated; step and submission states lack live announcements.

**Casey, distracted mobile user:** Long scrolling and essay input raise abandonment risk; progress is lost on refresh; missing autocomplete increases typing.

## Minor Observations

- The desktop form has unused vertical space on step 1.
- Required guidance appears after the action buttons.
- Birth date is a text field despite expecting a strict format.
- The mobile progress header is crowded.
- The persistent wide form shadow conflicts with the flat-at-rest material rule.

## Technical Audit

| Dimension | Score | Key finding |
|-----------|-------|-------------|
| Accessibility | 2/4 | Error focus, group semantics, and required-state announcements are incomplete. |
| Performance | 3/4 | No long tasks or layout overflow; infinite decorative blur motion adds some cost. |
| Theming | 2/4 | Concrete slate/blue classes bypass semantic tokens. |
| Responsive | 3/4 | Mobile works with good touch targets; progress and effort remain cramped. |
| Implementation Integrity | 2/4 | False success and localized display/value coupling are material gaps. |
| **Total** | **12/20** | **Acceptable** |

## Questions to Consider

- Should beginner conversion or detailed pre-screening be the primary goal?
- Is Facebook truly required, and what privacy promise can the team state?
- Should the next pass fix release safety only or all six priority issues?
