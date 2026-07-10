#!/usr/bin/env node
/**
 * Merge POSTHOG_PERSONAL_API_KEY into .env.local.
 * Usage: node scripts/set-posthog-personal-key.mjs phx_your_key_here
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const key = process.argv[2]?.trim();

if (!key || !key.startsWith("phx_")) {
  console.error(
    "Usage: node scripts/set-posthog-personal-key.mjs phx_your_personal_api_key",
  );
  console.error(
    "Create a key at https://us.posthog.com/settings/user-api-keys (scope: query:read)",
  );
  process.exit(1);
}

const envPath = resolve(process.cwd(), ".env.local");
const line = `POSTHOG_PERSONAL_API_KEY=${key}`;

let contents = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

if (/^POSTHOG_PERSONAL_API_KEY=/m.test(contents)) {
  contents = contents.replace(/^POSTHOG_PERSONAL_API_KEY=.*$/m, line);
} else {
  contents = contents.trimEnd() + (contents.endsWith("\n") ? "" : "\n") + line + "\n";
}

writeFileSync(envPath, contents, "utf8");
console.log("Updated .env.local with POSTHOG_PERSONAL_API_KEY");
