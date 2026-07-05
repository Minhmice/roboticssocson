# Phase 1: Shape Curriculum Experience - Context

**Gathered:** 2026-07-04
**Status:** Ready for planning
**Source:** `/gsd-plan-phase /impeccable shape`

<domain>

## Phase Boundary

This phase shapes the UX/content/design brief for the "Từ Khối Lệnh Đến Phần Cứng" curriculum surface. It does not implement production UI. The output should be a confirmed design brief and planning artifact that can later guide `/impeccable craft` or implementation.

</domain>

<decisions>

## Decisions

### D-01 — Phase output is shape-only
- The phase must produce a design brief/shape artifact, not production code.
- The brief must be specific enough to guide implementation later.

### D-02 — Integration model is hybrid
- The curriculum should be shaped as a hybrid experience: a homepage teaser plus a dedicated curriculum page direction.
- The phase must define what belongs in the teaser versus the dedicated page.

### D-03 — Preserve current brand
- The design direction must preserve the existing Robotics Sóc Sơn dark arena/cyan/silver visual identity.
- It must avoid cartoonish/kid-only STEM styling, primary-color toy palettes, and generic educational clip-art.

### D-04 — Curriculum narrative
- The raw curriculum must be reframed into a clear journey: Scratch block logic → mBlock/Arduino hardware → capstone project.
- The shape must avoid a dense syllabus wall.

### D-05 — Lesson content model
- Each lesson must use a consistent model: objective, theory, practice, core blocks/components, and student output.
- Scratch and hardware lessons should visibly mirror concepts across software and physical computing.

### D-06 — Learning method pillars
- AI and draw.io flowcharts must be first-class learning practices.
- AI must be positioned as a guided explanation/debugging assistant, not as a shortcut replacing student thinking.
- Flowcharts must be positioned as pre-coding scaffolds, not decorative diagrams.

### D-07 — Capstone choices
- The shape must include at least two capstone directions: smart trash bin and reverse parking warning system.
- Capstones must show how prior concepts combine, especially ultrasonic sensor + servo + conditionals.

### D-08 — Use existing design sources
- The planner/executor must read `PRODUCT.md`, `DESIGN.md`, `.planning/research/SUMMARY.md`, and relevant codebase map files before shaping.

### the agent's Discretion
- Exact design brief format, as long as it covers `/impeccable shape` brief requirements.
- Whether to name the final artifact `01-DESIGN-BRIEF.md`, `01-SHAPE-BRIEF.md`, or equivalent.
- Whether to include lightweight wireframe descriptions, annotated section order, or component inventory inside the brief.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product and design
- `PRODUCT.md` — strategic audience, brand personality, and anti-references.
- `DESIGN.md` — visual design system, colors, typography, components, and do/don't rules.
- `.impeccable/design.json` — component snippets and design sidecar.

### GSD project context
- `.planning/PROJECT.md` — project context and active requirements.
- `.planning/REQUIREMENTS.md` — v1 requirement IDs for this phase.
- `.planning/ROADMAP.md` — Phase 1 goal, mode, and success criteria.
- `.planning/research/SUMMARY.md` — project research synthesis for curriculum shape.
- `.planning/codebase/ARCHITECTURE.md` — site architecture and data flow.
- `.planning/codebase/CONVENTIONS.md` — code/design conventions.
- `.planning/codebase/TESTING.md` — verification commands and gaps.

### Impeccable references
- `/Users/minhmice/.claude/skills/impeccable/reference/shape.md` — required shape workflow and design brief structure.
- `/Users/minhmice/.claude/skills/impeccable/reference/brand.md` — brand-register design guardrails.

</canonical_refs>

<specifics>

## Specific Ideas

- Curriculum title: "Từ Khối Lệnh Đến Phần Cứng".
- Duration: 6+ lessons, each 60-90 minutes.
- Part 1: Scratch basics, sequence, forever loop, repeat loop, if/else + sensing.
- Part 2: mBlock/Arduino LED output, traffic light, button input, ultrasonic sensor, servo, custom blocks/functions, capstone.
- Learning method: explain concept, draw flowchart in draw.io, build Scratch/mBlock blocks, test, use AI for guided debugging/reflection.
- Capstones: smart trash bin and reverse parking warning system.

</specifics>

<deferred>

## Deferred Ideas

- Production implementation of homepage teaser or dedicated curriculum page.
- LMS features: accounts, progress tracking, quizzes, grading, certificates, teacher dashboards.
- Hardware simulator.
- Payment/enrollment.
- Complete teacher handouts or full lesson material authoring.

</deferred>

---

*Phase: 01-shape-curriculum-experience*
*Context gathered: 2026-07-04 via `/gsd-plan-phase /impeccable shape`*
