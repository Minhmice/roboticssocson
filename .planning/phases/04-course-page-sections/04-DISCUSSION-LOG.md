# Phase 4: Course Page Sections - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-05
**Phase:** 4-course-page-sections
**Areas discussed:** Curriculum UX, FAQ pattern, Data scope, Projects layout, Section rhythm, UI/UX shape (impeccable)

---

## Curriculum UX

| Option | Description | Selected |
|--------|-------------|----------|
| Expandable list | Vertical list, tap expand full lesson fields | ✓ |
| Timeline | Reuse shared Timeline component | |
| Part groups | Scratch / Hardware / Capstone grouped tabs | |

**Follow-ups:** Full fields on expand ✓ | Single open ✓ | Part badge ✓

---

## FAQ pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Native `<details>` | No new dependency, accessible | ✓ |
| useState accordion | Custom styled accordion | |
| Add shadcn Accordion | New Radix primitive | |

**Follow-ups:** Single-open (JS close siblings) ✓ | PRD 7 + 1–2 extra ✓

---

## Data scope

| Option | Description | Selected |
|--------|-------------|----------|
| Full PRD copy | Fill all stubs, no placeholders | ✓ |
| Minimal viable | Compile-safe stubs only | |

**Follow-ups:** LocalizedText for section data ✓ | Lucide icon names in data ✓

---

## Projects layout

| Option | Description | Selected |
|--------|-------------|----------|
| Two-column GlowCards | Side-by-side desktop | ✓ |
| Stacked full-width | | |
| Tabs | | |

**Follow-ups:** Full breakdown ✓ | MediaPlaceholder no asset ✓

---

## Section rhythm

| Option | Description | Selected |
|--------|-------------|----------|
| PRD order | Problem → … → FAQ | ✓ |
| Mid CTA after Curriculum | Slate band before FAQ | ✓ |
| Messenger bridge | `#course-register` without form | ✓ |
| 3-column card grid | Problem/Outcomes-style sections | ✓ |

---

## UI/UX shape (impeccable)

| Option | Description | Selected |
|--------|-------------|----------|
| Mixed surfaces | Vary layout per section, avoid uniform card grid | ✓ |
| Sparse badges | Not every SectionHeader gets eyebrow | ✓ |
| Competition-grade STEM | Dark arena, no cartoon kid UI | ✓ |
| Subtle fade-in scroll | framer-motion + reduced-motion | ✓ |
| Trust-first scan | Keep Problem/Solution/Outcomes before Curriculum | ✓ |
| Pit-slate curriculum rows | Flat default, cyan on open/hover | ✓ |
| Pit-slate FAQ details | Match curriculum surface | ✓ |
| Slate CTA band | No second Aurora | ✓ |

**User note:** Requested additional UI/UX discussion via `/impeccable shape` before finalizing context.

---

## the agent's Discretion

- Fade-in wrapper implementation
- Which sections receive SectionHeader badges
- Specific lucide icon mapping

## Deferred Ideas

- Registration form UI (Phase 5)
- Navbar course links (Phase 5)
- Course photography assets
