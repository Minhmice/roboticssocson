# Phase 5: Integration, Teaser & Launch - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-05
**Phase:** 05-integration-teaser-launch
**Areas discussed:** Registration, Teaser, Navbar, Sticky CTA, Impeccable UX (teaser, register, sticky, nav)

---

## Registration path

| Option | Description | Selected |
|--------|-------------|----------|
| Google Form primary | Locale Google Form new tab + Messenger secondary; matches sponsor | ✓ |
| Inline form only | Validated fields on page, console.log submit | |
| Both side-by-side | Inline + Google Form equal weight | |

**User's choice:** Google Form primary (upgraded empty-URL behavior)

**Notes:** When URL empty — disabled primary CTA + helper text + active Messenger. Never `href=""`. MVP channels: Google Form + Messenger only (no Zalo/phone). Layout: CTA buttons + "What we ask" bullets + trust/privacy line; no field preview card.

---

## Homepage teaser

| Option | Description | Selected |
|--------|-------------|----------|
| After Mission | Before TheChallenge | ✓ |
| After Hero | Higher visibility | |
| After Achievements | Lower placement | |

| Option | Description | Selected |
|--------|-------------|----------|
| Full section + journey cards | SectionHeader + 3-step journey | ✓ |
| Compact band | Slate band only | |
| GlowCard grid | Like course Outcomes | |

| Option | Description | Selected |
|--------|-------------|----------|
| Logic → Hardware → Capstone | Aligns with course promise | ✓ |
| Scratch → Arduino → Project | Simpler parent labels | |

| Option | Description | Selected |
|--------|-------------|----------|
| Single CTA to /course | Discovery-focused | ✓ |

---

## Navbar on /course

| Option | Description | Selected |
|--------|-------------|----------|
| Swap to course anchors | curriculum/projects/faq/register on /course | ✓ |
| CLB links to /#section | Cross-route scroll | |
| Sub-nav bar | Second row on course | |

| Option | Description | Selected |
|--------|-------------|----------|
| Footer course link | Add to quick links | ✓ |
| Navbar only | Skip footer | |

| Option | Description | Selected |
|--------|-------------|----------|
| Register CTA on /course navbar | Replace sponsor CTAs | ✓ |
| Keep sponsor CTAs | Same on all pages | |

**Notes:** Global `nav.course` before Sponsorship (recommended default; placement question skipped by user).

---

## Sticky register CTA

| Option | Description | Selected |
|--------|-------------|----------|
| Bottom sticky bar | Fixed bottom on /course | ✓ |
| No sticky | Existing CTAs only | |
| Top strip | Below navbar after scroll | |

| Option | Description | Selected |
|--------|-------------|----------|
| After hero scroll | ~300px threshold | ✓ |
| Always visible | From load | |

| Option | Description | Selected |
|--------|-------------|----------|
| Single register button | Full-width CTA | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| Safe-area + bottom spacer | z-40, don't cover footer | ✓ |

---

## Impeccable UX

| Option | Description | Selected |
|--------|-------------|----------|
| Teaser pit-slate journey rail | Not GlowCard grid | ✓ |
| FadeInSection on teaser | Match course sections | ✓ |
| Register stacked centered CTAs | Bullets below | ✓ |
| Muted disabled Google Form button | No glow when disabled | ✓ |
| Glass pit-slate sticky bar | backdrop-blur + border-t | ✓ |
| Scroll-spy on /course nav | IntersectionObserver | ✓ |

---

## the agent's Discretion

- Scroll-spy implementation details (thresholds, no hash update default).
- `courseTeaser.ts` vs inline copy.
- CourseTeaser file location under `src/components/homepage/`.

## Deferred Ideas

- Zalo, phone channels
- Inline form
- Analytics
- Locale URL segments
