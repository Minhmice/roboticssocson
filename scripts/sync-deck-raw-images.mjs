#!/usr/bin/env node
/**
 * Convert public/RAW/* → optimized WebP in public/Images/Deck/
 * and refresh src/data/arduinoMblockDeckImages.ts
 *
 * Naming (deck page = slide position 1–26):
 *   slide1.jpg        → page 1 (hero)
 *   slide5.png        → page 5
 *   slide61.webp      → page 6, slot 1 (mosaic)
 *   slide72.jpg       → page 7, slot 2
 *   slide10.jpg       → page 10 (two-digit page)
 *
 * Aliases:
 *   arduino_board.*   → page 3
 *   mblock.*          → page 8
 *   *_logo.*          → copied to Images/Deck/assets/ (not wired to slides)
 *
 * Usage:
 *   node scripts/sync-deck-raw-images.mjs
 *   node scripts/sync-deck-raw-images.mjs --watch
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, watch, renameSync, unlinkSync, statSync, copyFileSync } from "node:fs";
import { join, dirname, extname, parse as parsePath } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rawDir = join(root, "public", "RAW");
const outDir = join(root, "public", "Images", "Deck");
const assetsDir = join(outDir, "assets");
const manifestPath = join(outDir, "manifest.json");
const deckImagesTs = join(root, "src", "data", "arduinoMblockDeckImages.ts");

/** Deck page order (1–26) → slide id in arduinoMblockDeck.ts */
const PAGE_TO_SLIDE_ID = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 30,
];

/** Slide ids that use custom visuals instead of static photos */
const SKIP_SLIDE_IDS = new Set([4]);

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".tif", ".tiff"]);

/** Slide ids that reuse another deck asset (no dedicated RAW file) */
const REUSE_MEDIA = {
  16: ["/Images/Deck/slide-08-00.webp"],
  17: ["/Images/Deck/assets/mblock-logo.webp"],
};

const ALIASES = {
  arduino_board: { page: 3, slot: 0 },
  mblock: { page: 8, slot: 0 },
};

const OPT = {
  photo: { maxWidth: 1920, quality: 82 },
  logo: { maxWidth: 640, quality: 88 },
};

function parseSlideStem(stem) {
  const alias = ALIASES[stem.toLowerCase()];
  if (alias) return alias;

  // slide12,1 or slide12.1 → page 12 slot 1
  const commaSlot = stem.match(/^slide(\d{1,2})[,.](\d)$/i);
  if (commaSlot) {
    return { page: Number(commaSlot[1]), slot: Number(commaSlot[2]) };
  }

  const m = stem.match(/^slide(\d+)$/i);
  if (!m) return null;

  const digits = m[1];
  if (digits.length === 1) {
    return { page: Number(digits), slot: 0 };
  }
  if (digits.length === 2) {
    const n = Number(digits);
    if (n >= 10 && n <= PAGE_TO_SLIDE_ID.length) return { page: n, slot: 0 };
    return { page: Number(digits[0]), slot: Number(digits[1]) };
  }
  if (digits.length === 3) {
    return { page: Number(digits.slice(0, 2)), slot: Number(digits[2]) };
  }
  return null;
}

function pageToSlideId(page) {
  if (page < 1 || page > PAGE_TO_SLIDE_ID.length) return null;
  return PAGE_TO_SLIDE_ID[page - 1];
}

function outputWebPath(page, slot) {
  const slotPart = String(slot).padStart(2, "0");
  return `/Images/Deck/slide-${String(page).padStart(2, "0")}-${slotPart}.webp`;
}

function isLogoStem(stem) {
  return stem.toLowerCase().endsWith("_logo") || stem.toLowerCase().includes("logo");
}

function shouldSkipConversion(inputPath, outputPath) {
  if (!existsSync(outputPath)) return false;
  try {
    const inStat = statSync(inputPath);
    const outStat = statSync(outputPath);
    return outStat.mtimeMs >= inStat.mtimeMs;
  } catch {
    return false;
  }
}

async function optimizeToWebp(inputPath, outputPath, mode = "photo") {
  if (shouldSkipConversion(inputPath, outputPath)) {
    const meta = await sharp(outputPath).metadata();
    return { width: meta.width ?? 0, height: meta.height ?? 0, skipped: true };
  }

  const { maxWidth, quality } = OPT[mode];
  mkdirSync(dirname(outputPath), { recursive: true });

  const tmpPath = `${outputPath}.tmp`;
  if (existsSync(tmpPath)) {
    try {
      unlinkSync(tmpPath);
    } catch {
      /* ignore stale tmp */
    }
  }

  const pipeline = sharp(inputPath).rotate().resize({
    width: maxWidth,
    height: maxWidth,
    fit: "inside",
    withoutEnlargement: true,
  });

  await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toFile(tmpPath);
  try {
    if (existsSync(outputPath)) unlinkSync(outputPath);
    renameSync(tmpPath, outputPath);
  } catch {
    copyFileSync(tmpPath, outputPath);
    unlinkSync(tmpPath);
  }

  const meta = await sharp(outputPath).metadata();
  return { width: meta.width ?? 0, height: meta.height ?? 0 };
}

function loadExistingDeckMedia() {
  if (!existsSync(deckImagesTs)) return {};
  const src = readFileSync(deckImagesTs, "utf8");
  const match = src.match(/export const DECK_SLIDE_MEDIA[^=]*=\s*(\{[\s\S]*?\n\});/);
  if (!match) return {};
  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return {};
  }
}

function writeDeckMediaTs(mediaBySlideId, manifestEntries) {
  const lines = Object.entries(mediaBySlideId)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([id, paths]) => {
      if (paths.length === 1) {
        return `  ${id}: ["${paths[0]}"],`;
      }
      const inner = paths.map((p) => `"${p}"`).join(",\n    ");
      return `  ${id}: [\n    ${inner},\n  ],`;
    });

  const content = `/** Real image paths for deck slides — synced from public/RAW via \`npm run sync:deck-images\`. */
export const DECK_SLIDE_MEDIA: Record<number, string[]> = {
${lines.join("\n")}
};

export function getDeckSlideMediaSources(slideId: number): string[] {
  return DECK_SLIDE_MEDIA[slideId] ?? [];
}
`;

  writeFileSync(deckImagesTs, content, "utf8");
  writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        sources: manifestEntries,
        slideIds: mediaBySlideId,
      },
      null,
      2,
    ),
    "utf8",
  );
}

function slotToIndex(slot) {
  return slot === 0 ? 0 : slot - 1;
}

async function syncAll() {
  if (!existsSync(rawDir)) {
    mkdirSync(rawDir, { recursive: true });
    console.log("Created public/RAW — drop images there and re-run.");
    return;
  }

  mkdirSync(outDir, { recursive: true });
  mkdirSync(assetsDir, { recursive: true });

  const files = readdirSync(rawDir)
    .filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()))
    .sort();

  if (!files.length) {
    console.log("No images in public/RAW.");
    return;
  }

  /** slideId → slot → web path */
  const bySlide = new Map();
  const manifestEntries = [];

  for (const file of files) {
    const stem = parsePath(file).name;
    const inputPath = join(rawDir, file);

    if (isLogoStem(stem) && !ALIASES[stem.toLowerCase()]) {
      const outName = `${stem.replace(/_logo$/i, "")}-logo.webp`;
      const outputPath = join(assetsDir, outName);
      const meta = await optimizeToWebp(inputPath, outputPath, "logo");
      manifestEntries.push({
        source: `RAW/${file}`,
        output: `/Images/Deck/assets/${outName}`,
        type: "logo",
        ...meta,
      });
      console.log(`  logo  ${file} → Images/Deck/assets/${outName}`);
      continue;
    }

    const parsed = parseSlideStem(stem);
    if (!parsed) {
      console.warn(`  skip  ${file} (unrecognized name — see public/RAW/README.md)`);
      continue;
    }

    const slideId = pageToSlideId(parsed.page);
    if (!slideId) {
      console.warn(`  skip  ${file} (page ${parsed.page} out of range 1–${PAGE_TO_SLIDE_ID.length})`);
      continue;
    }
    if (SKIP_SLIDE_IDS.has(slideId)) {
      console.log(`  skip  ${file} → slide id ${slideId} uses custom diagram`);
      continue;
    }

    const webPath = outputWebPath(parsed.page, parsed.slot);
    const outputPath = join(root, "public", webPath.replace(/^\//, ""));

    const meta = await optimizeToWebp(inputPath, outputPath, "photo");
    if (!bySlide.has(slideId)) bySlide.set(slideId, new Map());
    bySlide.get(slideId).set(slotToIndex(parsed.slot), webPath);

    manifestEntries.push({
      source: `RAW/${file}`,
      page: parsed.page,
      slot: parsed.slot,
      slideId,
      output: webPath,
      ...meta,
    });
    console.log(`  photo ${file} → ${webPath} (slide id ${slideId})`);
  }

  const merged = loadExistingDeckMedia();

  for (const [slideId, slotMap] of bySlide) {
    const indices = [...slotMap.keys()];
    const previous = merged[slideId] ?? [];
    const maxIndex = Math.max(...indices, previous.length - 1, 0);
    const paths = [];
    for (let i = 0; i <= maxIndex; i += 1) {
      const next = slotMap.get(i) ?? previous[i];
      if (next) paths[i] = next;
    }
    merged[slideId] = paths.filter(Boolean);
  }

  for (const id of SKIP_SLIDE_IDS) {
    delete merged[id];
  }

  for (const [id, paths] of Object.entries(REUSE_MEDIA)) {
    merged[Number(id)] = paths;
  }

  writeDeckMediaTs(merged, manifestEntries);
  console.log(`\nSynced ${manifestEntries.length} asset(s). Updated arduinoMblockDeckImages.ts`);
}

const watchMode = process.argv.includes("--watch");

if (watchMode) {
  console.log("Watching public/RAW for new images… (Ctrl+C to stop)\n");
  let timer;
  const debounced = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("\n— change detected —");
      syncAll().catch((err) => console.error(err));
    }, 400);
  };
  syncAll()
    .catch(console.error)
    .finally(() => {
      watch(rawDir, { persistent: true }, debounced);
    });
} else {
  syncAll().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
