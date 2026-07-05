# Project Research: Architecture

## Recommended Architecture

Implement the curriculum as a static, data-driven content surface inside the existing Next.js site.

## Content Model

Suggested new file:

- `src/data/curriculum.ts`

Suggested entities:

- `course`: title, subtitle, duration, target audience, promise
- `methodPillars`: AI, draw.io, project-based learning, hardware intuition
- `modules`: Scratch and Hardware/mBlock
- `lessons`: lesson number, module, title, duration, objectives, theory, practice, core concepts, output
- `capstones`: smart trash bin and reverse parking warning system

## UI Integration Options

### Option A: Dedicated Page

- Route: `src/app/curriculum/page.tsx`
- Best if the course needs a full narrative and shareable URL.

### Option B: Homepage Section

- Add a `CurriculumSection` to `src/app/page.tsx`.
- Best if it should support sponsor conversion by showing educational impact.

### Option C: Hybrid

- Short homepage teaser + dedicated page.
- Best long-term option, but more implementation work.

## Recommended First Slice

Use Option B or C:

1. Add typed curriculum data.
2. Add a homepage teaser showing the learning arc.
3. Add a dedicated page only if content density feels too high.

## Component Boundaries

- `src/components/shared/CurriculumLessonCard.tsx` for reusable lesson cards if needed.
- `src/components/shared/CurriculumTimeline.tsx` or reuse existing `Timeline`/`Stepper`.
- Keep page composition in `src/app/**`.
- Keep all lesson copy in `src/data/curriculum.ts`.

## Flowchart Representation

Flowcharts should be represented as method cards or lightweight visual diagrams first, not embedded editor functionality. The page can show:

- Start → Action → Decision → Output examples.
- Sensor loop example: Start → Read Distance → Is distance < 15cm? → Open Servo / Keep Closed → Loop.

## AI Representation

AI should be described as a learning routine:

1. Ask AI to explain a concept.
2. Draw the logic in draw.io.
3. Build the blocks.
4. Test on stage/hardware.
5. Ask AI to help debug with observed symptoms.

## Build Order

1. Shape information architecture and content hierarchy.
2. Create data model.
3. Build visual section/page.
4. Verify responsiveness, contrast, and content length.
5. Add assets/diagrams if available.

## Sources

- Flowchart robotics curriculum example: https://dam.assets.ohio.gov/image/upload/drive.ohio.gov/workforce/educator-toolkit/automate/lesson-plans/AutomatE_6-8.pdf
- Flowcharts for beginner programming: https://stemrobotics.cs.pdx.edu/node/570%3Froot=291.html
