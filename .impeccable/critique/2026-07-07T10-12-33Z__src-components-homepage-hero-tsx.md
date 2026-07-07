---
target: hero ở homepage
total_score: 19
p0_count: 2
p1_count: 2
timestamp: 2026-07-07T10-12-33Z
slug: src-components-homepage-hero-tsx
---
Method: dual-agent (A: 912f4d27-1311-4296-94c4-9601395f69ce · B: ecd15d81-b287-40ad-b88f-134b2de4148f)

## Target
`src/components/homepage/Hero.tsx` (Homepage hero)

## Design Health Score (Nielsen 10)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Rotating word animation runs continuously with no user control or “why”. |
| 2 | Match System / Real World | 2/4 | “Download Pitch PDF” expectation is at risk if the URL is not a real PDF. |
| 3 | User Control and Freedom | 2/4 | No pause/stop for headline cycling; motion likely replays on scroll. |
| 4 | Consistency and Standards | 2/4 | i18n model is mixed: some copy is data-driven, some hardcoded; CTA labels mismatch intent. |
| 5 | Error Prevention | 1/4 | A visible class typo (`sm:w-aut o`) + misleading deck link are avoidable trust leaks. |
| 6 | Recognition Rather Than Recall | 2/4 | Sponsor must infer where sponsorship info lives; hero CTA doesn’t make the sponsor path obvious. |
| 7 | Flexibility and Efficiency | 2/4 | No fast path to “tiers / contact / deck” from the hero’s primary action. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Clean base composition, but headline motion adds cognitive noise at the most important moment. |
| 9 | Error Recovery | 1/4 | If deck link is missing/wrong, there’s no graceful fallback or honest alternative CTA. |
| 10 | Help and Documentation | 2/4 | Missing reassurance microcopy (“2-min PDF”, response time, what happens next). |
| **Total** | | **19/40** | **Poor → needs sponsor-first rewrite + motion restraint** |

## Anti-Patterns Verdict

### LLM assessment
- **Borderline “template hero”**: rotating, per-character animated headline reads more like a generic modern landing page than a sponsor-grade pitch.
- **Proof density too low above the fold**: energy > evidence.

### Deterministic scan
- `detect.mjs --json src/components/homepage/Hero.tsx` returned **0 findings**.

### Visual overlays
- Overlay injection was not performed in this run (browser evidence only).

## Overall Impression
Visually premium and on-brand, but the current hero optimizes for “vibes + motion” over the sponsor job-to-be-done: **trust quickly, understand need/impact, take a sponsor action**.

## What's Working
- **Visual cadence**: badge → headline → subhead → CTAs is the right hierarchy scaffold.
- **Responsive type scaling**: `text-3xl … xl:text-7xl` with balanced line-height feels strong.
- **CTA components**: `CTAButton` has good baseline a11y (44px min height, focus ring).

## Priority Issues

- **[P0] Sponsor journey: wrong primary CTA**
  - **Why it matters**: Sponsors come to decide, not to browse. Primary action should be “sponsor/contact/deck”, not “about FIRST”.
  - **Fix**: Make primary CTA use `heroData.cta_primary_*` and route to `/sponsor` or `#sponsorship`. Move “About” to secondary/tertiary.
  - **Suggested command**: `/impeccable clarify` (CTA intent + copy) then `/impeccable layout` (hierarchy).

- **[P0] Pitch link trust leak**
  - **Why it matters**: A broken/misleading deck link is a credibility-killer on a sponsor pitch site.
  - **Fix**: Ensure `pitchPdfUrl` points to an actual PDF. If not ready, change CTA to an honest action (“Request deck”) and add microcopy.
  - **Suggested command**: `/impeccable harden` (truthful links + fallbacks).

- **[P1] Motion is too attention-hungry for sponsors**
  - **Why it matters**: Per-character spring flips increase reading friction and can feel less serious.
  - **Fix**: Animate per-phrase (fade/slide), slow down, stop after 1–2 cycles, and fully respect reduced-motion.
  - **Suggested command**: `/impeccable animate` (purposeful motion + reduced-motion).

- **[P1] Badge is an interactive button with no action**
  - **Why it matters**: Keyboard users hit a focusable control that does nothing; it’s confusing and feels “template”.
  - **Fix**: Render as a non-interactive pill (`span`/`div`) unless it links to a relevant proof page.
  - **Suggested command**: `/impeccable harden`.

- **[P2] Mobile layout break + typo**
  - **Why it matters**: The hero must look flawless on mobile; blank space / narrow column reads like broken layout.
  - **Fix**: Fix `sm:w-aut o` → `sm:w-auto` and re-check hero container sizing on mobile.
  - **Suggested command**: `/impeccable adapt`.

## Persona Red Flags

- **Jordan (first-time sponsor)**: primary action doesn’t map to “become a sponsor”; low proof density; deck trust risk.
- **Riley (mentor/educator evaluator)**: wants outcomes + credibility signal fast; abstract rotating phrases don’t answer “what you achieved / impact”.
- **Casey (mobile, distracted)**: mobile layout risk (narrow column + blank space) and constant animation can be fatiguing.

## Minor Observations
- `heroData.headline_*` exists but headline is hardcoded in the component → i18n parity + maintenance risk.
- Secondary CTA `aria-label` is English-only; localize it or derive from label.
- `AnimatedText` uses `once: false`, which can make the page feel restless on scroll.

## Questions to Consider
- If a sponsor only reads the hero, what **one proof point** must they see above the fold?
- What is the **one true action** above the fold: deck, tiers, or contact—and why isn’t that primary?
- Should the rotating phrase communicate **impact** (results/metrics) rather than abstract vibes?
