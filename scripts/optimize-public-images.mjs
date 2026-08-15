#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync, renameSync, unlinkSync } from "node:fs";
import { join, dirname, extname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = join(root, "public", "Images");
const dryRun = process.argv.includes("--dry-run");
const reencodeWebp = process.argv.includes("--reencode-webp");
const rasterExtensions = new Set([".png"]);
if (reencodeWebp) rasterExtensions.add(".webp");

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const filePath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(filePath));
    else if (rasterExtensions.has(extname(entry.name).toLowerCase())) files.push(filePath);
  }
  return files;
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function encode(filePath) {
  const source = sharp(readFileSync(filePath), { animated: false }).rotate();
  const name = basename(filePath);

  if (name.toLowerCase() === "og-default.png") {
    return source.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }).toBuffer();
  }

  return source
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toBuffer();
}

async function main() {
  if (!existsSync(imageDir)) throw new Error(`Missing image directory: ${imageDir}`);

  const files = walk(imageDir).sort();
  let before = 0;
  let after = 0;
  let changed = 0;
  let skipped = 0;

  for (const filePath of files) {
    const original = readFileSync(filePath);
    const output = await encode(filePath);
    before += original.length;

    if (output.length >= original.length) {
      after += original.length;
      skipped += 1;
      continue;
    }

    after += output.length;
    changed += 1;
    console.log(`${dryRun ? "would optimize" : "optimize"} ${relative(root, filePath)} ${formatBytes(original.length)} -> ${formatBytes(output.length)}`);

    if (!dryRun) {
      const tempPath = `${filePath}.tmp`;
      writeFileSync(tempPath, output);
      try {
        renameSync(tempPath, filePath);
      } catch (error) {
        unlinkSync(tempPath);
        throw error;
      }
    }
  }

  console.log(`\n${dryRun ? "Dry run" : "Optimized"}: ${changed} file(s), skipped ${skipped}.`);
  console.log(`Payload: ${formatBytes(before)} -> ${formatBytes(after)} (${formatBytes(Math.max(0, before - after))} saved).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
