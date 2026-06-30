#!/usr/bin/env node
/**
 * Lists image paths referenced in src/ and reports missing files under public/.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src");
const publicDir = join(root, "public");

const imagePattern = /\/Images\/[^"'`]+/g;

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const referenced = new Set();
for (const file of walk(srcDir)) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(imagePattern)) {
    const path = match[0].replace(/[),;]+$/, "");
    if (path.includes("/Images/Team/") && !path.includes("/Images/Teams/")) {
      continue;
    }
    referenced.add(path);
  }
}

const missing = [];
const found = [];

for (const webPath of [...referenced].sort()) {
  const diskPath = join(publicDir, webPath.replace(/^\//, ""));
  if (existsSync(diskPath)) found.push(webPath);
  else missing.push(webPath);
}

console.log(`Referenced: ${referenced.size} | Found: ${found.length} | Missing: ${missing.length}`);

if (missing.length) {
  console.log("\nMissing files (copy into public/):");
  for (const p of missing) console.log(`  public${p}`);
  process.exit(1);
}

console.log("All referenced images exist under public/.");
