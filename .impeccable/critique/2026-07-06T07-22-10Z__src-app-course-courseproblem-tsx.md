---
target: Vấn đề phụ huynh thường gặp / CourseProblem (post-redesign)
total_score: 37
p0_count: 0
p1_count: 0
timestamp: 2026-07-06T07-22-10Z
slug: src-app-course-courseproblem-tsx
---
# Critique: Vấn đề phụ huynh thường gặp (CourseProblem) — post-redesign

Target: `src/app/course/CourseProblem.tsx`

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Orb inView state + scroll stagger give clear reading progress |
| 2 | Match System / Real World | 4 | Parent-first copy unchanged; pains stay concrete |
| 3 | User Control and Freedom | 4 | n/a |
| 4 | Consistency and Standards | 4 | Aligns with Solution/Curriculum 2-col + rail system |
| 5 | Error Prevention | 4 | n/a |
| 6 | Recognition Rather Than Recall | 4 | Sequential rail + capstone peak-end replaces equal cards |
| 7 | Flexibility and Efficiency | 3 | n/a |
| 8 | Aesthetic and Minimalist Design | 3 | Card grid gone; badge + capstone inset box still add layers |
| 9 | Error Recovery | 4 | n/a |
| 10 | Help and Documentation | 3 | Capstone bridges value; no explicit CTA to Solution |
| **Total** | | **37/40** | **Excellent** |

## Anti-Patterns Verdict

**LLM assessment**: No longer reads as generic AI card grid. Editorial rail matches course system. Residual tells: badge pill (kept by choice), capstone bordered inset echoes card surface.

**Deterministic scan**: 0 findings.

## Overall Impression

Major upgrade. Section now feels intentional and co-owned with Solution. Polish-only gaps remain.

## What's Working

1. 2-col sticky + rail — scan path is obvious top-to-bottom.
2. Capstone item — prose has narrative closure without a fifth floating card.
3. Motion + a11y — reduced-motion fallback, semantic ol, labelled landmarks.

## Priority Issues (remaining)

**[P2] Capstone nested surface** — bordered bg-accent/50 inside rail may feel like mini-card. Fix: flatten to typography-only emphasis. Command: `/impeccable distill`

**[P2] Framer stagger through `<ol>`** — motion.li variants may not receive parent stagger (ol is not motion). Fix: motion.ol or per-item whileInView. Command: `/impeccable animate`

**[P3] Badge eyebrow** — intentional; only issue if repeated on every section. Command: `/impeccable quieter` (optional)

**[P3] No bridge CTA** — scroll to #course-solution link optional. Command: `/impeccable delight`

## Persona Red Flags

**Jordan**: Improved — rail order guides reading. Capstone title helps closure.

**Casey**: Mobile rail single column; long VI titles still wrap but no 4-col squeeze.

**Sam**: Good landmarks; capstone color-only emphasis (primary title) is supplementary to text.

## Minor Observations

- ~180 lines overlap CourseSolution — candidate for shared rail primitive later.
- Cognitive load checklist: 0–1 failures (was 2–3).

## Questions to Consider

- Does capstone need a box, or just a filled orb + bold prose?
- Should Problem and Solution share one extracted StepRail component?
