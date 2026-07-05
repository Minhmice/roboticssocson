---
phase: 1
plan: "01"
type: shape
wave: 1
depends_on: []
files_modified:
  - ".planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md"
  - ".planning/STATE.md"
autonomous: true
requirements:
  - CURR-01
  - CURR-02
  - CURR-03
  - INFO-01
  - INFO-02
  - INFO-03
  - LESS-01
  - LESS-02
  - LESS-03
  - METH-01
  - METH-02
  - METH-03
  - CAP-01
  - CAP-02
  - DSGN-01
  - DSGN-02
  - DSGN-03
---

# Plan 01: Shape Curriculum Experience

<objective>
Create a confirmed `/impeccable shape` design brief for the "Từ Khối Lệnh Đến Phần Cứng" curriculum surface. The brief must transform the raw Scratch → mBlock/Arduino lesson outline into a sponsor-grade UX/content direction for a hybrid site integration: homepage teaser plus dedicated curriculum page. This phase produces planning/design documentation only; it does not implement production UI.
</objective>

## Context Coverage

- D-01: Phase output is shape-only.
- D-02: Integration model is hybrid.
- D-03: Preserve current Robotics Sóc Sơn brand.
- D-04: Curriculum narrative is Scratch logic → mBlock/Arduino hardware → capstone project.
- D-05: Lesson content model is objective, theory, practice, core blocks/components, student output.
- D-06: AI + draw.io are first-class learning practices.
- D-07: Capstones include smart trash bin and reverse parking warning system.
- D-08: Product/design/research/codebase refs must be read before shaping.

<tasks>

<task id="01" type="read">
  <title>Load canonical shape context</title>
  <read_first>
    <file>.planning/phases/01-shape-curriculum-experience/01-CONTEXT.md</file>
    <file>.planning/phases/01-shape-curriculum-experience/01-RESEARCH.md</file>
    <file>.planning/phases/01-shape-curriculum-experience/01-VALIDATION.md</file>
    <file>.planning/REQUIREMENTS.md</file>
    <file>.planning/ROADMAP.md</file>
    <file>PRODUCT.md</file>
    <file>DESIGN.md</file>
    <file>.planning/research/SUMMARY.md</file>
    <file>.planning/codebase/ARCHITECTURE.md</file>
    <file>.planning/codebase/CONVENTIONS.md</file>
    <file>/Users/minhmice/.claude/skills/impeccable/reference/shape.md</file>
    <file>/Users/minhmice/.claude/skills/impeccable/reference/brand.md</file>
  </read_first>
  <action>
    Read the listed references before writing the brief. Extract the required `/impeccable shape` sections from `shape.md`, the brand constraints from `brand.md`, the visual system from `DESIGN.md`, and all locked decisions D-01 through D-08 from `01-CONTEXT.md`. Treat deferred ideas in `01-CONTEXT.md` as explicit non-goals.
  </action>
  <verify>
    <automated>rg "D-01|D-02|D-03|D-04|D-05|D-06|D-07|D-08" .planning/phases/01-shape-curriculum-experience/01-CONTEXT.md</automated>
  </verify>
  <acceptance_criteria>
    <criterion>The executor has read `shape.md` and uses its design brief structure in the output artifact.</criterion>
    <criterion>The executor has read `DESIGN.md` and uses the arena black / pit slate / cyan-silver identity as the default visual lane.</criterion>
    <criterion>The executor has read `01-CONTEXT.md` and covers D-01 through D-08 in the brief.</criterion>
  </acceptance_criteria>
</task>

<task id="02" type="docs">
  <title>Create the shape brief artifact</title>
  <read_first>
    <file>.planning/phases/01-shape-curriculum-experience/01-CONTEXT.md</file>
    <file>.planning/phases/01-shape-curriculum-experience/01-RESEARCH.md</file>
    <file>.planning/REQUIREMENTS.md</file>
    <file>DESIGN.md</file>
    <file>PRODUCT.md</file>
  </read_first>
  <action>
    Create `.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md`. The artifact must be a full `/impeccable shape` design brief with these exact top-level sections: Feature Summary, Primary User Action, Design Direction, Scope, Layout Strategy, Key States, Interaction Model, Content Requirements, Recommended References, Open Questions, Requirement Coverage, Decision Coverage. It must specify the hybrid IA: homepage teaser communicates the course promise and credibility; dedicated curriculum page carries the full lesson journey, method pillars, capstones, and future implementation notes. It must state that Phase 1 does not write production code.
  </action>
  <verify>
    <automated>test -f .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
    <automated>rg "Feature Summary|Primary User Action|Design Direction|Layout Strategy|Content Requirements|Requirement Coverage|Decision Coverage" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
  </verify>
  <acceptance_criteria>
    <criterion>`01-SHAPE-BRIEF.md` exists.</criterion>
    <criterion>`01-SHAPE-BRIEF.md` contains all required `/impeccable shape` brief sections listed in the action.</criterion>
    <criterion>The brief states "shape-only" or equivalent language that no production UI code is delivered in this phase.</criterion>
    <criterion>The brief defines both homepage teaser and dedicated curriculum page roles.</criterion>
  </acceptance_criteria>
</task>

<task id="03" type="docs">
  <title>Ensure curriculum model and learning method coverage</title>
  <read_first>
    <file>.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</file>
    <file>.planning/phases/01-shape-curriculum-experience/01-RESEARCH.md</file>
    <file>.planning/REQUIREMENTS.md</file>
  </read_first>
  <action>
    In `01-SHAPE-BRIEF.md`, include a concrete future content model for lessons with fields: lesson number, part/module, title, duration, objective, theory, practice, core blocks/components, student output, flowchart prompt, AI prompt. Include the Scratch progression from events/sequence to loops/repeat/if-else/sensing. Include the hardware progression from LED digital output to traffic light, button input, ultrasonic sensor, servo, custom block/function, and capstone integration. Include the repeatable learning routine: explain → flowchart → build blocks → test → debug.
  </action>
  <verify>
    <automated>rg "lesson number|objective|theory|practice|core blocks|student output|flowchart prompt|AI prompt|explain.*flowchart.*build.*test.*debug" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
  </verify>
  <acceptance_criteria>
    <criterion>The brief contains a lesson content model with all fields named in the action.</criterion>
    <criterion>The brief explicitly covers the Scratch sequence and the mBlock/Arduino sequence.</criterion>
    <criterion>The brief explicitly frames AI as guided explanation/debugging support and flowcharts as pre-coding scaffolds.</criterion>
  </acceptance_criteria>
</task>

<task id="04" type="verify">
  <title>Validate coverage and update planning state</title>
  <read_first>
    <file>.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</file>
    <file>.planning/phases/01-shape-curriculum-experience/01-VALIDATION.md</file>
    <file>.planning/REQUIREMENTS.md</file>
    <file>.planning/STATE.md</file>
    <file>.planning/ROADMAP.md</file>
  </read_first>
  <action>
    Verify that `01-SHAPE-BRIEF.md` references every Phase 1 requirement ID and every decision D-01 through D-08. Then update `.planning/STATE.md` to mark Phase 1 as planned and note that `01-PLAN.md` creates `01-SHAPE-BRIEF.md` as the execution artifact. Update `.planning/ROADMAP.md` Phase 1 Plans section from "Not planned yet" to list `01-PLAN.md — Shape Curriculum Experience`.
  </action>
  <verify>
    <automated>rg "CURR-01|CURR-02|CURR-03|INFO-01|INFO-02|INFO-03|LESS-01|LESS-02|LESS-03|METH-01|METH-02|METH-03|CAP-01|CAP-02|DSGN-01|DSGN-02|DSGN-03" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
    <automated>rg "D-01|D-02|D-03|D-04|D-05|D-06|D-07|D-08" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
    <automated>rg "01-PLAN.md|01-SHAPE-BRIEF.md" .planning/STATE.md .planning/ROADMAP.md</automated>
  </verify>
  <acceptance_criteria>
    <criterion>All 17 Phase 1 requirement IDs appear in `01-SHAPE-BRIEF.md`.</criterion>
    <criterion>D-01 through D-08 appear in `01-SHAPE-BRIEF.md`.</criterion>
    <criterion>`STATE.md` reflects Phase 1 planned status and points to the shape brief artifact.</criterion>
    <criterion>`ROADMAP.md` Phase 1 Plans section lists `01-PLAN.md`.</criterion>
  </acceptance_criteria>
</task>

</tasks>

<verification>
Run these checks after executing the plan:

<automated>test -f .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
<automated>rg "Feature Summary|Primary User Action|Design Direction|Scope|Layout Strategy|Key States|Interaction Model|Content Requirements|Recommended References|Open Questions" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
<automated>rg "CURR-01|INFO-01|LESS-01|METH-01|CAP-01|DSGN-01" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
<automated>rg "D-01|D-02|D-03|D-04|D-05|D-06|D-07|D-08" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md</automated>
</verification>

<success_criteria>
1. Phase 1 has a concrete, executable shape plan.
2. Execution of this plan produces `01-SHAPE-BRIEF.md`.
3. The shape brief covers all Phase 1 requirements and decisions.
4. The brief can be handed to `/impeccable craft` or a later implementation phase without rereading the raw prompt.
5. No production UI code is changed during this phase.
</success_criteria>

## Artifacts This Phase Produces

- `.planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md`
- Updated `.planning/STATE.md`
- Updated `.planning/ROADMAP.md`

## Must Haves

### Truths

- `01-SHAPE-BRIEF.md` must state the curriculum journey as Scratch block logic → mBlock/Arduino hardware → capstone project.
- `01-SHAPE-BRIEF.md` must define homepage teaser and dedicated curriculum page roles.
- `01-SHAPE-BRIEF.md` must include the lesson content model: objective, theory, practice, core blocks/components, student output.
- `01-SHAPE-BRIEF.md` must include AI and draw.io as first-class learning practices.
- `01-SHAPE-BRIEF.md` must preserve the current dark arena/cyan/silver visual identity.

### Prohibitions

- Do not implement production UI code in this phase.
- Do not introduce LMS/account/progress/payment/simulator scope.
- Do not use cartoonish/kid-only STEM visual direction.
- Do not reduce the curriculum to a dense syllabus wall.
