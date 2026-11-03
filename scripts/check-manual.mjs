import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CHUNK_DIR = path.join(ROOT, "public", "manual", "chunks");
const INDEX_PATH = path.join(ROOT, "public", "manual", "index.json");

console.log("Checking FTC Competition Manual data integrity...");

if (!fs.existsSync(INDEX_PATH)) {
  console.error("FAIL: index.json does not exist");
  process.exit(1);
}

const indexData = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8"));
console.log(`- Index: version ${indexData.version}, ${indexData.sections.length} sections`);

const files = fs.readdirSync(CHUNK_DIR).filter((f) => f.endsWith(".json"));
console.log(`- Chunks found: ${files.length}`);

let totalBlocks = 0;
let totalRules = 0;
let totalImages = 0;
let totalTables = 0;
let missingTranslations = 0;
const ruleIds = new Set();
const missingImages = [];

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(CHUNK_DIR, file), "utf-8"));
  for (const b of content.blocks) {
    totalBlocks++;
    if (b.t === "h" || b.t === "p" || b.t === "rule" || b.t === "cap") {
      if (!b.vi || b.vi.trim().length === 0) {
        missingTranslations++;
      }
    } else if (b.t === "ul") {
      for (const it of b.items || []) {
        if (!it.vi || it.vi.trim().length === 0) {
          missingTranslations++;
        }
      }
    } else if (b.t === "table") {
      totalTables++;
      if (!b.rows_vi || b.rows_vi.length === 0) {
        missingTranslations++;
      }
    } else if (b.t === "img") {
      totalImages++;
      const localPath = path.join(ROOT, "public", b.src.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        missingImages.push(b.src);
      }
    }

    if (b.t === "rule" && b.id) {
      totalRules++;
      ruleIds.add(b.id);
    }
  }
}

console.log(`- Total blocks: ${totalBlocks}`);
console.log(`- Total rules: ${totalRules} unique rules (${ruleIds.size})`);
console.log(`- Total tables: ${totalTables}`);
console.log(`- Total image placements: ${totalImages}`);
console.log(`- Missing translations: ${missingTranslations}`);
console.log(`- Missing image files: ${missingImages.length}`);

if (missingTranslations > 0) {
  console.error(`FAIL: ${missingTranslations} blocks missing Vietnamese translation.`);
  process.exit(1);
}

if (missingImages.length > 0) {
  console.error(`FAIL: Missing image files: ${missingImages.slice(0, 5).join(", ")}`);
  process.exit(1);
}

console.log("PASS: 100% manual data integrity check succeeded!");
