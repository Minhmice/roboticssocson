# Phase 1 Research: Shape Curriculum Experience

## User Constraints

### Locked decisions from `01-CONTEXT.md`

- D-01: Phase output is shape-only; produce a design brief/shape artifact, not production code.
- D-02: Integration model is hybrid: homepage teaser plus dedicated curriculum page direction.
- D-03: Preserve current dark arena/cyan/silver Robotics Sóc Sơn identity and avoid cartoonish kid-only STEM styling.
- D-04: Reframe raw curriculum into a journey: Scratch block logic → mBlock/Arduino hardware → capstone project.
- D-05: Each lesson uses a consistent model: objective, theory, practice, core blocks/components, student output.
- D-06: AI and draw.io flowcharts are first-class learning practices; AI is a guided debugging/explanation assistant, not a shortcut.
- D-07: Include at least smart trash bin and reverse parking warning system capstone directions.
- D-08: Read product/design/research/codebase references before shaping.

### Deferred ideas

- Production implementation.
- LMS/accounts/progress/quizzes/certificates.
- Hardware simulator.
- Payment/enrollment.
- Complete teacher handouts.

## Standard Stack

No new runtime stack is needed for this phase. The deliverable is a planning/design artifact under `.planning/phases/01-shape-curriculum-experience/`.

If later implemented, the existing static Next.js/Tailwind stack is enough: `src/data/curriculum.ts`, homepage teaser section, and dedicated curriculum page.

## Architecture Patterns

- Use existing static-data-first architecture as a constraint for the brief.
- Shape should recommend data-driven lesson content, not hardcoded section copy.
- Shape should map likely future implementation to existing component families: `SectionHeader`, `GlowCard`, `CTAButton`, `Timeline`/`Stepper`, `PillBadge`, and image/media patterns.
- The brief should separate homepage teaser content from dedicated page content.

## Design Pattern Findings

- The surface is brand-register work: it communicates credibility and educational impact.
- Existing identity wins: arena black, pit slate, cyan/silver signal accents, Inter hierarchy.
- The page must feel like a Robotics Sóc Sơn education system, not a generic children’s coding class.
- Avoid identical card grids as the only structure; use a journey/bridge metaphor and progressive disclosure.

## Pedagogy Findings

- Scratch curricula commonly start with interface/events/sequence, then loops, conditionals, sensing, variables, and modularity.
- Hardware curricula should mirror the programming concepts:
  - event → board startup/button trigger
  - forever → Arduino main loop
  - if/else → sensor threshold decision
  - repeat/custom block → reusable hardware routine
- Flowcharts are valuable as pre-coding scaffolds: start/end, process, decision, input/output.
- AI should be framed as tutor/debugging partner: ask for explanation, test hypotheses, describe symptoms, verify outputs.

## Common Pitfalls

- Rendering the curriculum as a syllabus wall.
- Splitting Scratch and hardware into unrelated halves.
- Letting AI become an answer generator.
- Adding too many hardware concepts at once.
- Visual drift into cartoonish STEM or generic SaaS course cards.
- Treating flowcharts as decorative icons instead of logic artifacts.

## Validation Architecture

Phase 1 is complete only if the design/shape artifact proves:

1. All 17 Phase 1 requirement IDs are addressed explicitly.
2. Decisions D-01 through D-08 appear in the artifact or its must-haves.
3. The artifact includes `/impeccable shape` sections: feature summary, primary user action, design direction, scope, layout strategy, key states, interaction model, content requirements, implementation references, and open questions.
4. The artifact clearly says no production UI code is part of this phase.
5. The artifact has concrete future implementation guidance for static data model and hybrid site integration.

## Sources

- `.planning/research/SUMMARY.md`
- `.planning/research/FEATURES.md`
- `.planning/research/ARCHITECTURE.md`
- `.planning/research/PITFALLS.md`
- `PRODUCT.md`
- `DESIGN.md`
- `/Users/minhmice/.claude/skills/impeccable/reference/shape.md`
- `/Users/minhmice/.claude/skills/impeccable/reference/brand.md`
