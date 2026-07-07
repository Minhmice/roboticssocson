---
target: course hero
total_score: 20
p0_count: 1
p1_count: 3
timestamp: 2026-07-06T13-59-34Z
slug: src-app-course-coursehero-tsx
---
Method: dual-agent (A: 5e673193-182b-46b9-8ea9-29830d0071cc · B: 2f06f2af-a6dc-4caf-8e82-9b65a4c89c9b)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | CTAs scroll to anchors but hero gives no preview of curriculum/register content |
| 2 | Match System / Real World | 2 | "Cấp 1–2" / "grades 1–2" ambiguous; parent CTA phrasing feels sales-y |
| 3 | User Control and Freedom | 3 | Two clear anchor exits; no traps |
| 4 | Consistency and Standards | 2 | DESIGN.md still describes dark arena/cyan while hero ships light-tech blue/white |
| 5 | Error Prevention | 2 | Production placeholder media reads as broken content |
| 6 | Recognition Rather Than Recall | 3 | Session badges and journey line reduce recall load |
| 7 | Flexibility and Efficiency | 2 | No scanline for schedule, location, prerequisites, or first project |
| 8 | Aesthetic and Minimalist Design | 2 | Badge + h1 + 2 paragraphs + 3 pills + 2 CTAs + aurora + placeholder = busy |
| 9 | Error Recovery | 1 | Placeholder shows English "Placeholder Image" with no "coming soon" framing |
| 10 | Help and Documentation | 1 | No parent reassurance (supervision, safety, outcomes proof) |
| **Total** | | **20/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment:** Borderline AI/template hero. Structure (glass badge → headline → dual paragraphs → pill row → twin CTAs → dashed placeholder) is a recognizable marketing scaffold. Aurora + glass badge add decorative chrome without course-specific art direction. Not full slop (no gradient text, hero metrics, or section eyebrows), but lacks a distinctive "how was this made?" moment.

**Deterministic scan:** 0 findings across CourseHero.tsx and related components (aurora-background, glass-button, CTAButton, MediaPlaceholder, courseHero.ts). Detector is clean on coded anti-pattern rules.

**Browser evidence:** Live `/course` hero confirmed on port 4000. Mobile stack is long before curriculum; desktop two-column layout works. Right column is visibly a dashed placeholder — trust risk for parents. detect.js overlay injection skipped (live-server entrypoint not run).

## Overall Impression

The copy has a strong parent hook and a credible learning pathway, but the hero fights itself: too much text above the fold, a non-functional glass badge button, and a placeholder where course imagery should sell the outcome. It reads as "course landing template" more than "Robotics Sóc Sơn built this."

## What's Working

- Parent value proposition ("less passive screens → real circuits") is specific and non-SaaS.
- Scratch → Arduino journey line is concrete and curriculum-real.
- CTAs meet 44px touch targets with visible focus rings.

## Priority Issues

**[P0] Placeholder media in production hero**
- **Why:** Dashed box + "Placeholder Image" undermines trust for parents evaluating a paid STEM course.
- **Fix:** Ship a real hero image (student project, kit photo, or classroom shot) via `MediaPlaceholder src=`.
- **Command:** `/impeccable polish src/app/course/CourseHero.tsx`

**[P1] Grade audience ambiguity ("cấp 1–2" / "grades 1–2")**
- **Why:** Vietnamese parents may read this as primary vs lower-secondary, or literally grade 1–2 — a huge positioning difference.
- **Fix:** Clarify age range or school level explicitly in badge copy.
- **Command:** `/impeccable clarify src/data/courseHero.ts`

**[P1] Cognitive overload above the fold**
- **Why:** Five text layers + three pills + two CTAs before any proof increases mobile drop-off.
- **Fix:** Merge parent hook + subtitle into one line; demote pills or move one proof element up.
- **Command:** `/impeccable distill src/app/course/CourseHero.tsx`

**[P1] Decorative GlassButton is a focusable dead control**
- **Why:** Badge uses `<button type="button">` with no action — keyboard users tab to a non-functional control.
- **Fix:** Replace with a styled `<span>` or `<p>` badge pattern.
- **Command:** `/impeccable audit src/app/course/CourseHero.tsx`

**[P2] Aurora animation lacks reduced-motion fallback**
- **Why:** `after:animate-aurora` is not disabled under `prefers-reduced-motion` (unlike pulse-glow/shimmer).
- **Fix:** Add aurora + glass hover scale to reduced-motion block in globals.css.
- **Command:** `/impeccable animate src/components/ui/aurora-background.tsx`

## Persona Red Flags

**Jordan (first-timer):** Jargon stack (Scratch/mBlock/Arduino) without "no prior experience" reassurance; no "what you'll build first" anchor.

**Casey (mobile):** Long vertical hero before curriculum; aurora + glass hover add visual noise on small screens.

**Lan (VN parent evaluating STEM):** No supervision/safety/teacher credibility; "Đăng ký tư vấn" sounds sales-y; screen-time hook doesn't reconcile that coding still uses screens.

## Minor Observations

- `min-h-screen` on AuroraBackground makes hero consume full viewport with heavy copy.
- Badge pills are clean but undifferentiated (tag cloud, not hierarchy).
- Bilingual gap: placeholder fallback text is English-only inside `MediaPlaceholder`.

## Questions to Consider

- What is the one artifact a parent should picture after session 2 — and why isn't that the hero visual?
- Is `/course` meant to live in light-tech (DESIGN.md Sponsor Briefing Room) or dark arena — and should it match the sponsor homepage?
- What earns glass treatment here beyond decoration?
