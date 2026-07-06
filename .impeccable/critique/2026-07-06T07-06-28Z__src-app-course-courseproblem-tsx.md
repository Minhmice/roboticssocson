---
target: Vấn đề phụ huynh thường gặp / CourseProblem
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-07-06T07-06-28Z
slug: src-app-course-courseproblem-tsx
---
# Critique: Vấn đề phụ huynh thường gặp (CourseProblem)

Target: `src/app/course/CourseProblem.tsx`

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Fade-in on scroll is the only motion; fine for static marketing |
| 2 | Match System / Real World | 4 | Copy speaks parent language; pain points are concrete |
| 3 | User Control and Freedom | 4 | n/a — read-only section |
| 4 | Consistency and Standards | 2 | Generic 4-card grid diverges from redesigned Solution/Method/Curriculum rails |
| 5 | Error Prevention | 4 | n/a |
| 6 | Recognition Rather Than Recall | 3 | Four equal-weight cards blur; bottom prose feels disconnected |
| 7 | Flexibility and Efficiency | 3 | n/a for marketing scroll |
| 8 | Aesthetic and Minimalist Design | 1 | Identical icon+title+text card grid; badge kicker adds scaffold noise |
| 9 | Error Recovery | 4 | n/a |
| 10 | Help and Documentation | 3 | Self-explanatory; no bridge to next section (Solution) |
| **Total** | | **31/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment**: Reads as AI-generated landing-page scaffolding. The 4-column identical card grid (icon, h3, muted body) is an Impeccable absolute ban. Badge eyebrow "Vì sao cần khóa học" adds template cadence. Structurally frozen while neighbor sections evolved to editorial 2-col + step rails.

**Deterministic scan**: `detect.mjs` on `CourseProblem.tsx` — 0 findings (clean CLI).

**Browser overlays**: Not injected this run (no reliable browser automation in session). Visual review from source + live dev server context.

## Overall Impression

Copy and parent empathy are strong. Visual system is the weak link: safest, most generic block on `/course`, visually behind Solution/Curriculum/Method.

## What's Working

1. **Parent-first copy** — four pains map to real objections (logic, hardware, debug, screen time).
2. **Closing prose** — neuroscience hook ("phần thưởng bất ngờ") bridges to course value without jargon.
3. **Token usage** — `border-border`, `bg-muted/50`, `text-primary` align with blue-white theme (no slate).

## Priority Issues

**[P1] Identical card grid anti-pattern**
- Why: Four same-shaped cards = AI grammar; users skim without hierarchy.
- Fix: Reframe as problem list/rail, asymmetric layout, or 2+2 with one lead pain.
- Command: `/impeccable distill course-problem`

**[P1] Visual rhythm break on `/course`**
- Why: White flat section between Hero and accent Solution; feels unfinished post light-theme migration.
- Fix: Match alternating `bg-muted/40` or `bg-accent/40`; or sticky header + rail like Solution.
- Command: `/impeccable layout course-problem`

**[P2] Typography hierarchy too flat**
- Why: Section subtitle and all card bodies use `text-muted-foreground`; headlines don't punch vs Solution's extrabold split.
- Fix: Bolder h2, darker body (`text-foreground/80`), one emphasized lead card.
- Command: `/impeccable bolder course-problem`

**[P2] Bottom prose box is a fifth card in disguise**
- Why: Same `rounded-2xl border bg-muted/50` as grid — redundant surface, weak peak-end.
- Fix: Integrate into header subcopy or full-width callout with distinct treatment (not nested card).
- Command: `/impeccable distill course-problem`

**[P3] Badge eyebrow**
- Why: SectionHeader kicker on every course block trains "template page" feel.
- Fix: Drop badge or fold into subtitle sentence.
- Command: `/impeccable quieter course-problem`

## Persona Red Flags

**Jordan (First-Timer parent)**: Four equal cards — no signal which pain matters most; must read all four before continuing.

**Casey (Mobile, distracted)**: `lg:grid-cols-4` squeezes card width; long VI titles ("Màn hình thụ động chiếm quá nhiều thời gian") wrap heavily on phone in 2-col.

**Lan (Vietnamese parent, skeptical)**: Generic card UI undermines trust built by specific copy — layout says "template," words say "we understand you."

## Minor Observations

- Cards use `<div>` not `<article>` / list semantics.
- No motion on individual pains (unlike Solution orb pulse).
- `CourseOutcomes` still uses `GlowCard`; Problem uses plain div — inconsistent siblings.

## Questions to Consider

- What if the strongest pain (screen time) owned 50% width and the other three stacked?
- Does this section need cards at all, or a numbered parent checklist?
- What would make the transition into Solution feel inevitable, not accidental?
