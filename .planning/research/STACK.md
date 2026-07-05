# Project Research: Stack

## Domain

Curriculum/content design for a beginner robotics pathway: Scratch computational thinking → mBlock/Arduino hardware programming → small smart-home/robot projects.

## Recommended Implementation Stack

The existing site stack is sufficient for the first curriculum surface:

- **Next.js App Router + React + TypeScript** for pages/sections.
- **Tailwind CSS + existing tokens** for the dark Robotics Sóc Sơn identity.
- **Static data modules** in `src/data/` for lesson metadata, objectives, block focus, equipment, and deliverables.
- **Existing i18n pattern** with `_vi` / `_en` fields and `messages/*.json`.
- **Existing components** such as `SectionHeader`, `GlowCard`, `CTAButton`, `Timeline`, `Stepper`, `PillBadge`, and `ImageGallery`.

## Curriculum Authoring Format

Use a typed TypeScript data model first, not MDX/CMS yet. Suggested data shape:

- course title and promise
- audience/age band
- total duration
- learning method pillars: Scratch, hardware, AI, draw.io
- parts/modules
- lessons with objectives, theory, practice, core blocks/components, outputs
- capstone projects

This matches the current static-first codebase and keeps implementation light.

## External Tool References

- **Scratch** for block-based programming.
- **mBlock** for Arduino-compatible block programming.
- **draw.io / diagrams.net** for flowcharts.
- **AI assistant** as guided tutor/debugging helper, not as answer machine.

## What Not To Add Yet

- LMS/auth/progress tracking.
- Database-backed course CMS.
- Hardware simulator.
- Payment/enrollment.

## Sources

- Scratch Creative Computing curriculum: https://scratched.gse.harvard.edu/guide/curriculum.html
- Project STEM CSE scope/sequence: https://projectstem.org/middle-school-cs-demo/scope-and-sequence
- Makeblock ultrasonic sensor guide: https://support.makeblock.com/hc/en-us/articles/10707974472727-Case-6-Read-the-value-of-the-ultrasonic-sensor
- Arduino with mBlock ultrasonic sensor notes: https://aposteriori-sg.github.io/tutorials/10-Arduino-with-mBlock/40-Sensors/20-Ultrasonic-Sensor.html
