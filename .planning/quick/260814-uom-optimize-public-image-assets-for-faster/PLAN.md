---
quick_id: 260814-uom
status: in_progress
created: 2026-08-14
---

# Optimize public image assets for faster, more reliable page rendering while preserving existing public URLs

## Objective

Reduce image payload and oversized source dimensions under `public/Images/` without changing paths used by the site. Keep `public/RAW/` as source material and preserve formats required by social previews and logos.

## Scope

- Optimize existing WebP assets in `public/Images/` in place.
- Preserve image filenames, dimensions unless source exceeds practical display width, transparency, and URL paths.
- Add repeatable sharp-based command for future optimization.
- Do not modify `public/RAW/` source images.
- Do not add dependencies; `sharp` already exists in `devDependencies`.

## Tasks

### 1. Add repeatable optimizer

**Files:** `scripts/optimize-public-images.mjs`, `package.json`

Use existing `sharp` dependency. Walk `public/Images/`, process raster images, write through temporary files, and replace only when output is smaller. Use WebP quality tuned for photographic assets, preserve alpha, avoid enlarging, and keep `og-default.png` as PNG. Print before/after byte totals and skipped files. No URL or filename changes.

**Verify:** `node scripts/optimize-public-images.mjs --dry-run` completes and reports candidates without changing files.

**Done:** Future optimization runs use `npm run optimize:images`; script handles spaces and Vietnamese filenames safely.

### 2. Apply optimization to page assets

**Files:** existing raster files under `public/Images/` only

Run optimizer against tracked page assets. Keep `public/RAW/` untouched because it is source input for the deck sync flow. Confirm generated deck assets remain valid WebP and no referenced paths disappear.

**Verify:** `npm run optimize:images` completes; `npm run check:assets` passes; image metadata scan finds every file decodable.

**Done:** Existing URLs resolve to smaller assets, with no missing files or broken image formats.

### 3. Verify rendering/build safety

**Files:** no additional source changes unless verification exposes a direct regression

Run lint and production build if available. Inspect Git diff for accidental non-image changes and compare aggregate image size before/after. Check no `.tmp` artifacts are added.

**Verify:** `npm run lint`; `npm run build`; `git diff --stat`; `git status --short`.

**Done:** Asset checks and app validation pass; only intended optimizer/script/planning and image changes remain.

## Acceptance Criteria

- Existing `/Images/...` URLs remain unchanged.
- Page asset bytes decrease without changing `public/RAW/` source files.
- All referenced assets pass `npm run check:assets`.
- `sharp` decodes every optimized raster asset.
- `npm run lint` and `npm run build` pass, or failures are documented as pre-existing/unrelated.
