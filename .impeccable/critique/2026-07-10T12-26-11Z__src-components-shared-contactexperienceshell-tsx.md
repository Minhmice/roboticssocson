---
target: ContactExperienceShell form column
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-07-10T12-26-11Z
slug: src-components-shared-contactexperienceshell-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Progress bar only; no visible "Bước 1/2" or step name |
| 2 | Match System / Real World | 3 | VI copy natural; "Gmail" is domain-specific but clear |
| 3 | User Control and Freedom | 3 | Back on step 2; no draft save on refresh |
| 4 | Consistency and Standards | 3 | Matches ContactExperienceShell elsewhere |
| 5 | Error Prevention | 3 | Phone hint + inline validation on Continue |
| 6 | Recognition Rather Than Recall | 2 | Step 2 hidden until step 1; no persistent step label |
| 7 | Flexibility and Efficiency | 2 | Standard wizard; no field tab-order shortcuts |
| 8 | Aesthetic and Minimalist Design | 2 | ALL-CAPS labels + hero title compete for attention |
| 9 | Error Recovery | 3 | Inline `role="alert"` errors; fields preserve values |
| 10 | Help and Documentation | 2 | Phone hint only; SLA meta is in left panel, not near CTA |
| **Total** | | **25/40** | **Acceptable — significant layout + hierarchy work** |

## Anti-Patterns Verdict

**LLM assessment:** Not full AI slop — the full-bleed FTC photo and editorial title have personality. The form column itself reads more generic: uppercase tracked labels on every field, underline inputs on glassy overlay, and white/ghost button pair match saturated 2024–2026 form templates. The eyebrow tell appears at field level (`labelClass` all-caps + tracking) rather than section level.

**Deterministic scan:** Clean (`[]`) on ContactExperienceShell, CourseConsultForm, ContactExperiencePanel.

**Browser evidence:** Playwright a11y tree confirms proper label/input associations and progressbar `aria-label`. Screenshot capture failed (CLI selector error); visual assessment from code + snapshot.

## Overall Impression

The shell is strong; the form column is functional but fights the layout below `lg` (1024px). At ~883px viewport the form starts ~410px down — parents scroll past hero title, email, phone, and meta before reaching fields. That's the biggest conversion risk on the primary task surface.

## What's Working

- **Accessible field wiring:** Labels use `htmlFor`, errors use `role="alert"`, Continue/Back meet 44px+ touch targets (`min-h-14`).
- **Two-step chunking:** Step 1 keeps four required fields in two logical pairs — within working-memory limits.
- **Boot-gated motion:** Form entrance waits for `animationReady` + 380ms delay, sequencing after left panel.

## Priority Issues

- **[P1] Tablet stacked layout buries the form** — `ContactExperienceShell` uses `lg:flex-row`; below 1024px the aside stacks under the full left panel. Primary fields start mid-viewport. **Fix:** Prioritize form above fold on `md`–`lg` (reorder columns, collapse meta, or sticky form). **Command:** `/impeccable layout`

- **[P1] Field labels use AI uppercase grammar** — `labelClass` applies `font-extrabold uppercase tracking-[0.07em]` on every label. Hurts scan speed for Vietnamese parents and matches banned eyebrow pattern at field level. **Fix:** Sentence case, weight 600, normal tracking; reserve uppercase for one system kicker if needed. **Command:** `/impeccable typeset`

- **[P2] Weak step visibility** — `Progress` at 45/100 with only `aria-label`; no visible "Bước 1/2 · Thông tin liên hệ". Parents don't know how much is left. **Fix:** Add compact step header above progress. **Command:** `/impeccable clarify`

- **[P2] Boot gate hides form visually** — `CourseConsultForm` animates `opacity: 0` until `animationReady`. Content exists for SR but sighted users see empty aside during boot. **Fix:** Default visible state; animate transform/blur only, or keep opacity ≥1 with subtle y-offset. **Command:** `/impeccable animate`

- **[P2] Errors not linked via `aria-describedby`** — Screen readers may not associate error text with inputs. **Fix:** Wire `aria-describedby` on invalid fields. **Command:** `/impeccable harden`

## Persona Red Flags

**Jordan (parent, first visit):** At 883px width, must scroll past large "Đăng ký tư vấn" headline and contact links before seeing "Họ và tên phụ huynh". No visible step count. "Tiếp tục" doesn't say what step 2 contains.

**Casey (mobile, interrupted):** Refresh loses in-progress form. Continue is thumb-friendly (full width) but form column is not sticky — returning user repeats scroll.

**Sam (keyboard/screen reader):** Labels and `aria-invalid` present; missing `aria-describedby` for error messages. Radio targets are 18px with label wrapper — focus order OK but hit area borderline.

## Minor Observations

- Placeholder `text-white/55` may be below 4.5:1 on variable photo background — verify contrast.
- `z-100` / `z-[100]` arbitrary stacking; consider semantic z-scale.
- Meta still shows "Phản hồi 24–48 giờ" in left panel while success page removed SLA — slight message inconsistency.
- Gradient rule in `ContactExperiencePanel` (`from-white/80 via-primary/70`) is decorative but acceptable at panel level.

## Questions to Consider

- Should the form be the first thing parents see on mobile/tablet, with title as backdrop only?
- Would sentence-case labels feel more trustworthy for a school program than shouty uppercase?
- Is a visible two-step indicator enough reassurance before "Tiếp tục"?
