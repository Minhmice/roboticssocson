import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RESOURCE_CATEGORIES, RESOURCE_ARTICLES } from "../src/data/resources.ts";

export function isValidIsoDate(str) {
  if (typeof str !== "string") return false;
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isValidSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function validateResources(options = {}) {
  const contentDir = options.contentDir ?? path.join(process.cwd(), "src", "content", "resources");
  const errors = [];
  const categoryIds = new Set();

  // 1. Verify Categories (unique ID, valid slug ID, localized title/description)
  for (const cat of RESOURCE_CATEGORIES) {
    if (!cat.id || !isValidSlug(cat.id)) {
      errors.push(`[resources] Invalid or unsafe category ID: ${cat.id}`);
      continue;
    }
    if (categoryIds.has(cat.id)) {
      errors.push(`[resources] Duplicate category ID detected: ${cat.id}`);
      continue;
    }
    categoryIds.add(cat.id);

    if (!cat.title?.vi || !cat.title?.en || !cat.description?.vi || !cat.description?.en) {
      errors.push(`[resources] Category ${cat.id} missing localized title or description`);
    }
  }

  // 2. Verify Articles (known category, valid slug, unique key, localized title/summary, status, valid calendar date)
  const slugs = new Set();
  const articleMap = new Map();

  for (const art of RESOURCE_ARTICLES) {
    if (!isValidSlug(art.slug)) {
      errors.push(`[resources] Article ${art.slug} has invalid or unsafe slug`);
    }
    if (!categoryIds.has(art.categoryId)) {
      errors.push(`[resources] Article ${art.slug} references unknown category: ${art.categoryId}`);
    }

    const key = `${art.categoryId}/${art.slug}`;
    if (slugs.has(key)) {
      errors.push(`[resources] Duplicate article slug detected: ${key}`);
    }
    slugs.add(key);
    articleMap.set(key, art);

    if (!art.title?.vi || !art.title?.en) {
      errors.push(`[resources] Article ${key} missing localized title`);
    }
    if (!art.summary?.vi || !art.summary?.en) {
      errors.push(`[resources] Article ${key} missing localized summary`);
    }
    if (art.status !== "ready" && art.status !== "soon") {
      errors.push(`[resources] Article ${key} has invalid status: ${art.status}`);
    }
    if (!isValidIsoDate(art.lastUpdated)) {
      errors.push(`[resources] Article ${key} has invalid or impossible lastUpdated date: ${art.lastUpdated}`);
    }
    if (art.previewTopics) {
      if (!art.previewTopics.vi || !art.previewTopics.en) {
        errors.push(`[resources] Article ${key} previewTopics missing locale`);
      }
    }
  }

  // 3. Verify Content directory (no orphan folders, even empty; valid file format and slugs)
  if (fs.existsSync(contentDir)) {
    const catEntries = fs.readdirSync(contentDir, { withFileTypes: true });
    for (const catEntry of catEntries) {
      if (!catEntry.isDirectory()) {
        errors.push(`[resources] Unexpected non-directory in content folder: ${catEntry.name}`);
        continue;
      }
      const catId = catEntry.name;
      if (!categoryIds.has(catId)) {
        errors.push(`[resources] Orphan folder in content resources: ${catId} (unknown category)`);
        continue;
      }

      const catPath = path.join(contentDir, catId);
      const files = fs.readdirSync(catPath, { withFileTypes: true });

      for (const file of files) {
        if (!file.isFile()) {
          errors.push(`[resources] Unexpected subfolder in category: ${catId}/${file.name}`);
          continue;
        }
        const match = file.name.match(/^([a-z0-9-]+)\.(vi|en)\.mdx$/);
        if (!match) {
          errors.push(`[resources] Unknown or malformed file: ${catId}/${file.name}`);
          continue;
        }
        const [, slug] = match;
        const key = `${catId}/${slug}`;
        if (!articleMap.has(key)) {
          errors.push(`[resources] Content file ${catId}/${file.name} does not match any registered article in RESOURCE_ARTICLES`);
        }
      }
    }
  }

  // 4. Verify Ready articles have BOTH files present and non-whitespace-only
  for (const [key, art] of articleMap.entries()) {
    if (art.status === "ready") {
      const viFile = path.join(contentDir, art.categoryId, `${art.slug}.vi.mdx`);
      const enFile = path.join(contentDir, art.categoryId, `${art.slug}.en.mdx`);

      const viExists = fs.existsSync(viFile);
      const enExists = fs.existsSync(enFile);

      if (!viExists || !enExists) {
        errors.push(`[resources] Ready article ${key} missing required MDX files: vi=${viExists}, en=${enExists}`);
        continue;
      }

      const viContent = fs.readFileSync(viFile, "utf8").trim();
      const enContent = fs.readFileSync(enFile, "utf8").trim();

      if (viContent.length === 0 || enContent.length === 0) {
        errors.push(`[resources] Ready article ${key} has whitespace-only MDX content: vi=${viContent.length > 0}, en=${enContent.length > 0}`);
      }
    }
  }

  return {
    errors,
    categoryIds,
    articleMap,
  };
}

const currentScriptPath = fileURLToPath(import.meta.url);
const invokedScriptPath = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (invokedScriptPath === currentScriptPath) {
  console.log("Checking Resources data integrity...");
  const { errors } = validateResources();
  if (errors.length > 0) {
    for (const err of errors) console.error(err);
    console.error(`[resources] FAILED: ${errors.length} errors found`);
    process.exit(1);
  } else {
    console.log(`[resources] Passed: ${RESOURCE_CATEGORIES.length} categories, ${RESOURCE_ARTICLES.length} articles verified.`);
  }
}
