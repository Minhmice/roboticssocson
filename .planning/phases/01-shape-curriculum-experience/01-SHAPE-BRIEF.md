# Shape Brief: "Từ Khối Lệnh Đến Phần Cứng"

**Phase:** 01 — Shape Curriculum Experience  
**Status:** Approved  
**Scope:** Shape-only planning artifact. No production UI code is delivered in this phase.  
**Source decisions:** D-01, D-02, D-03, D-04, D-05, D-06, D-07, D-08

## Feature Summary

"Từ Khối Lệnh Đến Phần Cứng" is a user-facing curriculum experience for students, families, educators, and sponsors who need to understand how Robotics Sóc Sơn teaches beginner programming into real robotics hardware. The experience reframes the raw lesson outline into a clear journey: Scratch block logic → mBlock/Arduino hardware → capstone project.

This surface extends the sponsorship site, not a separate LMS. It should make the team feel capable of teaching practical STEM with discipline, clarity, and credible outcomes.

Requirement coverage: CURR-01, CURR-02, CURR-03, INFO-01, INFO-02, INFO-03, LESS-01, LESS-02, LESS-03, METH-01, METH-02, METH-03, CAP-01, CAP-02, DSGN-01, DSGN-02, DSGN-03.

## Primary User Action

The primary action is understanding the course arc quickly enough to trust it: what students start with, how each lesson builds toward hardware, and what final projects prove.

Secondary actions for a later implementation:

- On the homepage teaser, continue to the dedicated curriculum page.
- On the dedicated curriculum page, scan the lesson journey and compare capstone directions.
- For sponsors/educators, connect the curriculum to Robotics Sóc Sơn's education impact.

## Design Direction

**Color strategy:** Restrained-to-committed within the existing brand. Arena black and pit slate carry most of the surface; HUD cyan and silver/ice accents are used as signal, path, active state, and diagram emphasis. This satisfies D-03, DSGN-01, and DSGN-02.

**Theme scene sentence:** A sponsor and a new student are viewing the curriculum after a robotics demo in a dim competition pit area; the board, robot parts, and lesson map are lit by focused cyan instrumentation, not classroom primary colors.

**Anchor references:**

- Existing Robotics Sóc Sơn `DESIGN.md`: "The Competition Floor" dark arena system.
- FTC pit scouting boards: organized, technical, proof-led.
- Arduino/mBlock wiring diagrams: functional learning artifacts, not decoration.

**Anti-direction:** No cartoon robots, bubble fonts, primary-color toy palettes, generic kid-STEM clip art, purple-gradient dark mode, dense LMS dashboard, or identical icon-card grids.

## Scope

**Fidelity:** High-fi design brief, implementation-ready but not code.  
**Breadth:** A whole curriculum surface: homepage teaser plus dedicated page direction.  
**Interactivity:** Static/scrollable site experience for later implementation, with light progressive disclosure.  
**Time intent:** Shape until it is clear enough to implement without rereading the raw curriculum prompt.

D-01 applies: this phase does not create production UI components, data modules, routes, or assets.

## Layout Strategy

### Homepage Teaser

The homepage teaser should be short, confidence-building, and connected to the sponsor story.

Recommended content:

- A compact promise: students move from Scratch logic to physical Arduino outcomes.
- A three-part journey strip: Logic Blocks → Hardware Signals → Capstone Build.
- One proof line: AI + flowcharts teach problem solving before wiring.
- CTA: "Explore curriculum" / "Xem giáo trình".

The teaser should not list all lessons. Its job is INFO-03 and CURR-03: show that the curriculum belongs inside the Robotics Sóc Sơn impact story.

### Dedicated Curriculum Page

The dedicated page should carry the full narrative with progressive scanning:

1. Hero: title, course promise, audience, duration, final outcomes.
2. Journey bridge: Scratch concepts on one side, hardware analogs on the other.
3. Learning method: explain → flowchart → build blocks → test → debug.
4. Lesson sequence: grouped into Part 1 Scratch and Part 2 mBlock/Arduino.
5. Capstone comparison: smart trash bin and reverse parking warning system.
6. Sponsor/education impact close: what this proves about the team.

The page should use rhythm instead of a syllabus wall. A visitor should be able to scan the whole structure in under one minute, then slow down for lesson details.

## Key States

**Default:** Course promise, journey, method, lessons, capstones, and impact are visible with no account or LMS setup.

**Mobile:** The journey becomes a vertical sequence. Lesson summaries collapse into compact rows with clear part labels and outputs. Body copy stays Ice Text, not muted fog text.

**Long content:** Lesson details use progressive disclosure or concise rows so INFO-02 is preserved.

**Empty/future implementation state:** If a lesson lacks a future downloadable material, omit the download affordance. Do not show placeholder buttons.

**Loading/error:** Not applicable to the shape artifact. Future implementation is static-first, so the page should avoid runtime data dependency.

**Reduced motion:** Future motion should use simple crossfades or static path highlights under `prefers-reduced-motion`.

## Interaction Model

The core interaction is scroll-based comprehension, not app-like task completion.

Recommended future interactions:

- Teaser CTA scrolls or routes to the curriculum page.
- Lesson rows/cards expand to show objective, theory, practice, core blocks/components, and output.
- Journey bridge highlights matching pairs: Scratch `if/else` ↔ ultrasonic threshold, Scratch loop ↔ Arduino loop, custom blocks ↔ reusable hardware routines.
- Capstone comparison lets users see which prior concepts each project combines.

Hover/focus states should use cyan signal glow sparingly. Avoid decorative glass panels unless they serve a real overlay or CTA purpose.

## Content Requirements

### Course Positioning

- Course title: "Từ Khối Lệnh Đến Phần Cứng".
- Promise: students learn logic with Scratch, then transfer that thinking into mBlock/Arduino projects.
- Audience: beginners/new students who can start with block logic before electronics complexity.
- Duration: 6+ lessons, likely 60-90 minutes each.
- Outcomes: basic programming logic, hardware input/output intuition, sensor decisions, servo motion, flowchart planning, AI-assisted debugging, and capstone integration.

### Lesson Content Model

Every lesson should support LESS-01 with these fields:

- lesson number
- part/module
- title
- duration
- objective
- theory
- practice
- core blocks/components
- student output
- flowchart prompt
- AI prompt

### Part 1: Scratch Foundations

Required progression for LESS-02:

1. Interface, sprite/stage, events, and sequence.
2. Forever loop for continuous behavior.
3. Repeat loop for counted repetition.
4. If/else decisions and sensing.

Each Scratch lesson should show the logic concept and a visible student output, not just a block list.

### Part 2: mBlock/Arduino Hardware

Required progression for LESS-03:

1. Board connection and LED digital output.
2. Traffic light pattern.
3. Button input.
4. Ultrasonic sensor distance reading.
5. Servo control.
6. Custom blocks/functions.
7. Capstone integration.

Hardware lessons should mirror Scratch concepts so the bridge is obvious:

- event → board startup/button trigger
- forever → Arduino main loop
- if/else → sensor threshold decision
- repeat/custom block → reusable hardware routine

### Learning Method

The repeatable routine for METH-01, METH-02, and METH-03:

1. Explain the concept in simple language.
2. Draw the logic in draw.io.
3. Build the blocks in Scratch or mBlock.
4. Test with visible output.
5. Debug using observations, then AI-assisted questions.

AI prompt role:

- Ask AI to explain a concept back in beginner language.
- Ask AI to help inspect why an observed output differs from expected behavior.
- Ask AI for debugging questions, not final answers.

Flowchart role:

- Use start/end, process, decision, and input/output symbols.
- Treat flowcharts as pre-coding scaffolds.
- Use flowcharts to compare Scratch logic and hardware logic.

### Capstones

Required capstone directions for CAP-01 and CAP-02:

- Smart trash bin: combines ultrasonic sensor, threshold decision, servo motion, and output feedback.
- Reverse parking warning system: combines ultrasonic sensor, distance thresholds, buzzer/LED signal, and conditional behavior.

Each capstone should list:

- prior concepts used
- hardware components
- core logic
- student success output
- possible extension

## Recommended References

During implementation, read these first:

- `/Users/minhmice/.claude/skills/impeccable/reference/craft.md` if moving from this brief into production UI.
- `/Users/minhmice/.claude/skills/impeccable/reference/layout.md` for rhythm, hierarchy, and responsive section design.
- `/Users/minhmice/.claude/skills/impeccable/reference/typeset.md` if the lesson sequence becomes text-heavy.
- `/Users/minhmice/.claude/skills/impeccable/reference/animate.md` for the journey bridge and reduced-motion handling.
- `DESIGN.md` for the existing arena/cyan/silver identity.
- `.planning/codebase/ARCHITECTURE.md` and `.planning/codebase/CONVENTIONS.md` for future data-driven implementation.

## Open Questions

Resolved by user confirmation on 2026-07-04:

- The direction is approved.
- The future implementation should be bilingual-ready from the first implementation.
- The capstone section should present smart trash bin and reverse parking warning system equally.
- The lesson sequence should use a vertical journey with expandable lesson rows.

No open shape questions remain before handing this brief to a future implementation/craft phase.

## Requirement Coverage

- CURR-01: Course promise is Scratch block logic to real Arduino/mBlock hardware projects.
- CURR-02: Duration, audience, and outcomes are defined in Course Positioning.
- CURR-03: Homepage teaser and impact close tie the course to Robotics Sóc Sơn credibility.
- INFO-01: The layout separates Scratch Foundations and mBlock/Arduino Hardware.
- INFO-02: The plan avoids a syllabus wall through journey bridge, grouped lessons, and progressive disclosure.
- INFO-03: Hybrid integration is specified as homepage teaser plus dedicated page.
- LESS-01: Lesson content model includes objective, theory, practice, core blocks/components, and student output.
- LESS-02: Scratch progression covers events/sequence, loops, repeat, conditionals, and sensing.
- LESS-03: Hardware progression covers digital output, input, ultrasonic sensor, servo, custom blocks/functions, and capstone.
- METH-01: AI is framed as guided explanation/debugging support.
- METH-02: draw.io flowcharts are framed as pre-coding scaffolds.
- METH-03: The repeatable routine is explain → flowchart → build blocks → test → debug.
- CAP-01: Smart trash bin and reverse parking warning system are both included.
- CAP-02: Capstones list prior concepts, especially ultrasonic sensor, servo, and conditionals.
- DSGN-01: Design direction preserves arena black, pit slate, HUD cyan, and silver/ice accents.
- DSGN-02: Anti-direction rejects cartoonish kid-STEM visuals.
- DSGN-03: Key States and Layout Strategy include mobile readable hierarchy.

## Decision Coverage

- D-01: The artifact is shape-only and explicitly does not deliver production UI code.
- D-02: The artifact specifies homepage teaser plus dedicated curriculum page.
- D-03: The artifact preserves the existing dark arena/cyan/silver identity.
- D-04: The curriculum is reframed as Scratch logic → hardware → capstone.
- D-05: The lesson model includes objective, theory, practice, core blocks/components, and student output.
- D-06: AI and draw.io are first-class method pillars.
- D-07: Smart trash bin and reverse parking warning system are included.
- D-08: The brief points implementation back to product, design, research, and codebase references.
