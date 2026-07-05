# Project Research Summary

## Key Findings

**Stack:** The existing Next.js/Tailwind/static-data stack is enough for the first curriculum feature. Start with `src/data/curriculum.ts` and a static section/page before considering LMS, CMS, or interactive tooling.

**Learning progression:** Common Scratch curricula progress from interface/events/sequence into loops, conditionals, sensing, variables, and modularity. The user's outline matches this well. Hardware should mirror the same concepts through Arduino startup, digital output, digital input, sensor thresholds, servo control, and custom blocks/functions.

**Flowcharts:** draw.io/diagrams.net should be positioned as a pre-coding scaffold. Flowcharts help students decompose logic, reason about decisions, and debug before touching blocks or wiring. Standard symbols should be used: start/end, process, decision, input/output.

**AI:** AI should support explanation, questioning, debugging, and reflection inside project-based learning. It should not replace students' own flowchart or test observations.

**Table Stakes:** Course overview, module arc, lesson cards, method pillars, capstone projects, and clear outputs per lesson.

**Watch Out For:** Avoid a syllabus wall, weak Scratch-to-Arduino bridge, AI shortcutting, hardware complexity spikes, kid-like visual drift, and decorative flowcharts.

## Implications For Roadmap

The next phase should not jump directly to implementation. It should first shape the curriculum UX:

1. Clarify information architecture: homepage section, dedicated page, or hybrid.
2. Convert the raw curriculum into a structured data model.
3. Design the visual hierarchy using current `DESIGN.md` tokens.
4. Create lesson/capstone components only after hierarchy is clear.
5. Verify the page against beginner comprehension and sponsor-grade credibility.

## Recommended Requirements Categories

- Curriculum positioning
- Lesson structure
- Learning method pillars
- Capstone presentation
- Site integration
- Design/accessibility

## Sources

- Scratch Creative Computing Curriculum: https://scratched.gse.harvard.edu/guide/curriculum.html
- Project STEM Scratch scope/sequence: https://projectstem.org/middle-school-cs-demo/scope-and-sequence
- Scratch Encore grades 5-8: https://stelar.edc.org/projects/24065/curricula/teaching-coding-grades-5-8-scratch-encore
- Makeblock ultrasonic sensor guide: https://support.makeblock.com/hc/en-us/articles/10707974472727-Case-6-Read-the-value-of-the-ultrasonic-sensor
- Arduino with mBlock ultrasonic sensor: https://aposteriori-sg.github.io/tutorials/10-Arduino-with-mBlock/40-Sensors/20-Ultrasonic-Sensor.html
- Flowcharts in robotics curriculum: https://dam.assets.ohio.gov/image/upload/drive.ohio.gov/workforce/educator-toolkit/automate/lesson-plans/AutomatE_6-8.pdf
- Flowcharts for programming: https://blog.technokids.com/programming/how-to-make-a-flowchart-for-programming-easy-to-understand/
- K-12 AI guidance: https://www.cde.ca.gov/ci/pl/aiincalifornia.asp
- AI-supported PBL robotics/programming: https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1674320/full
