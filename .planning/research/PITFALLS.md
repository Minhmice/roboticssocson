# Project Research: Pitfalls

## Pitfall 1: Too Much Syllabus, Not Enough Journey

The provided curriculum has rich detail. If rendered as a long wall of text, beginners and sponsors will lose the story.

**Warning signs:**

- Every lesson has equal visual weight.
- No clear transformation from Scratch to hardware.
- Capstone projects are buried at the bottom.

**Prevention:**

- Lead with the arc: logic → loops/conditions → inputs/outputs → sensors/servo → capstone.
- Use progressive disclosure for lesson details.
- Highlight outputs and artifacts for each lesson.

## Pitfall 2: Weak Bridge Between Scratch And Arduino

Scratch and mBlock can feel like two separate courses if the conceptual links are not explicit.

**Warning signs:**

- Scratch section stops at games/animations with no hardware analogy.
- Hardware section starts with pins without connecting to events/loops/conditions.

**Prevention:**

- Pair each hardware concept with a prior Scratch concept:
  - event → board startup/button trigger
  - forever → main loop
  - if/else → sensor threshold
  - repeat/custom block → reusable hardware routine

## Pitfall 3: AI Becomes Shortcut Instead Of Thinking Tool

AI can weaken learning if students ask for answers before forming their own model.

**Warning signs:**

- Prompts ask AI to "make the code" before students draw logic.
- No reflection or debugging evidence.

**Prevention:**

- Require a flowchart before AI debugging.
- Use AI prompts like "explain why this condition fails" or "ask me questions to debug wiring."
- Include responsible AI norms: verify, cite observations, do not blindly copy.

## Pitfall 4: Hardware Complexity Spikes Too Quickly

Jumping from LED blink to ultrasonic + servo capstone without enough scaffolding can overwhelm students.

**Warning signs:**

- Too many new components in one lesson.
- No wiring/safety checklists.
- No test step for each component alone.

**Prevention:**

- Test one component per lesson before combining.
- Include breadboard/pin diagrams or checklists.
- Treat final project as integration of known parts, not new theory.

## Pitfall 5: Visual Design Drifts From Sponsor Site

A curriculum page can accidentally become colorful/kid-like, conflicting with sponsor-grade Robotics Sóc Sơn identity.

**Warning signs:**

- Primary-color classroom palette.
- Cartoon robot imagery.
- Dense worksheets pasted into cards.

**Prevention:**

- Follow `DESIGN.md`: arena black, pit slate, HUD cyan, silver/cyan accents.
- Use credible technical diagrams and clean lesson cards.
- Keep playful energy in examples, not in brand structure.

## Pitfall 6: Flowcharts Are Decorative Only

Flowcharts help only if tied to code and debugging.

**Warning signs:**

- Generic flowchart icons with no relation to lesson tasks.
- Students draw diagrams after coding rather than before.

**Prevention:**

- Every hardware lesson should include a "draw before blocks" logic artifact.
- Use standard symbols: start/end, process, decision, input/output.
- Match flowchart nodes to Scratch/mBlock blocks.

## Sources

- Beginner flowchart pedagogy: https://blog.technokids.com/programming/how-to-make-a-flowchart-for-programming-easy-to-understand/
- Pre-coding scaffolds in robotics curriculum: https://doi.org/10.22318/icls2025.562882
- K-12 AI guidance: https://www.cde.ca.gov/ci/pl/aiincalifornia.asp
