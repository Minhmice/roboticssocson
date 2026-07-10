---
target: ContactExperienceShell form column (post-fix)
total_score: 29
p0_count: 0
p1_count: 0
timestamp: 2026-07-10T12-35-30Z
slug: src-components-shared-contactexperienceshell-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Step header + progress; submit state clear |
| 2 | Match System / Real World | 3 | VI parent-facing copy; Gmail label intentional |
| 3 | User Control and Freedom | 3 | Back on step 2; refresh still clears draft |
| 4 | Consistency and Standards | 3 | Shell pattern coherent across contact + register |
| 5 | Error Prevention | 3 | Phone hint, step validation, inline errors |
| 6 | Recognition Rather Than Recall | 3 | Persistent "Bước 1/2 · …" label each step |
| 7 | Flexibility and Efficiency | 2 | No keyboard accelerators or draft autosave |
| 8 | Aesthetic and Minimalist Design | 3 | Sentence-case labels; hero title still dominant on lg |
| 9 | Error Recovery | 3 | `aria-describedby`, `role="alert"`, values kept |
| 10 | Help and Documentation | 3 | Reply hint co-located with form on max-lg |
| **Total** | | **29/40** | **Good — polish and edge cases remain** |

## Anti-Patterns Verdict

**LLM assessment:** No longer reads as generic AI form. Sentence-case labels, step header with real wizard semantics, and tablet-first reorder distinguish the surface. Remaining tells: underline-only inputs on photo overlay (common pattern, not fatal) and gradient rule on panel (decorative, single instance).

**Deterministic scan:** Clean (`[]`) on shell, panel, and form files.

**Browser evidence (883×800):** Form column appears first in a11y tree — "Bước 1/2 · Thông tin liên hệ", reply hint, progressbar, then four fields before panel title/contact. Confirms layout fix landed.

## Overall Impression

The prior P1 issues are largely resolved. The page now behaves like a registration task first, brand story second on tablet. Desktop `lg+` still leads with editorial title — appropriate for sponsor-grade identity. Remaining work is resilience (draft loss) and step-2 density, not layout fundamentals.

## What's Working

- **Tablet IA fix:** `order-1` form / `order-2` panel with `compactWhenStacked` puts fields in the first scroll at 883px.
- **Boot-safe motion:** Content visible at `opacity: 1`; entrance uses y/blur only after `animationReady`.
- **Copy + a11y pass:** Step header, clearer CTAs, `aria-describedby` on fields, reply hint when meta is hidden.

## Priority Issues

- **[P2] No draft persistence** — Refresh or accidental navigation loses all entered data. Parents on mobile (Casey) will abandon if interrupted. **Fix:** `sessionStorage` autosave or `beforeunload` guard. **Command:** `/impeccable harden`

- **[P2] Step 2 cognitive load** — Five inputs + radio group + up to three textareas in one view. Manageable but dense for first-time parents. **Fix:** Optional third micro-step or collapse optional fields behind disclosure. **Command:** `/impeccable distill`

- **[P2] Radio control size** — Native radios at 18px; label provides target but focus ring is tight. **Fix:** Custom radio with 44px row hit area (already `min-h-12` on label — verify tap on label only). **Command:** `/impeccable adapt`

- **[P3] Empty `backgroundAlt`** — Hero image has `alt=""` on register route. Decorative OK if intentional; FTC team photo could carry meaningful alt for trust. **Command:** `/impeccable clarify`

- **[P3] Title scale on lg** — `clamp` max 5.85rem is above impeccable 6rem ceiling guidance edge; monitor overflow on long EN title "Book a consult". **Command:** `/impeccable adapt`

## Persona Red Flags

**Jordan (parent, first visit):** Improved — sees step count and first field within one viewport on tablet. Still unsure what step 2 requires until clicking "Tiếp tục — thông tin học sinh" (CTA now hints, good).

**Casey (mobile, interrupted):** Red flag remains — no autosave; returning user starts over.

**Sam (a11y):** Improved — describedby wiring in snapshot ("Họ và tên phụ huynh (required)"). Radio group has `aria-describedby` on error path.

## Minor Observations

- `sr-only "(required)"` duplicates asterisk — acceptable for screen readers.
- Meta hidden on `max-lg` but Messenger link still reachable via reply hint copy (not linked) — could add inline link.
- MouseTrail + blur animations: fine on desktop; worth profiling on low-end Android.

## Questions to Consider

- Is step 2 intentionally one screen, or should optional coding background be collapsed by default?
- Should reply hint link directly to Messenger for one-tap reassurance?
- Is draft autosave in scope before launch?
