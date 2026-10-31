import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const viPath = resolve(root, "messages/vi.json");
const enPath = resolve(root, "messages/en.json");

const vi = JSON.parse(readFileSync(viPath, "utf-8"));
const en = JSON.parse(readFileSync(enPath, "utf-8"));

function flatten(obj, prefix = "") {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(result, flatten(v, key));
    } else {
      result[key] = v;
    }
  }
  return result;
}

const viFlat = flatten(vi);
const enFlat = flatten(en);

let errors = 0;

// 1. Key Parity
const viKeys = Object.keys(viFlat).sort();
const enKeys = Object.keys(enFlat).sort();

for (const k of viKeys) {
  if (!(k in enFlat)) {
    console.error(`[i18n] Missing key in en.json: ${k}`);
    errors++;
  }
}

for (const k of enKeys) {
  if (!(k in viFlat)) {
    console.error(`[i18n] Extra key in en.json (missing in vi.json): ${k}`);
    errors++;
  }
}

// 2. Token Parity
const tokenRegex = /\{([a-zA-Z0-9_-]+)\}/g;
function getTokens(str) {
  if (typeof str !== "string") return [];
  const matches = [...str.matchAll(tokenRegex)];
  return matches.map((m) => m[1]).sort();
}

for (const k of viKeys) {
  if (k in enFlat) {
    const viTokens = getTokens(viFlat[k]);
    const enTokens = getTokens(enFlat[k]);
    if (JSON.stringify(viTokens) !== JSON.stringify(enTokens)) {
      console.error(
        `[i18n] Token mismatch in "${k}": vi has [${viTokens}], en has [${enTokens}]`
      );
      errors++;
    }
  }
}

// 3. Usage: every key used in src must exist, and every key in the dictionaries must be used.
// `t` always comes from `useLanguage()` and is never aliased or passed around (verified by hand),
// so scanning `t("...")` call sites is exact. Ternaries between two literals are handled too.
function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "legacy" && entry.name !== "node_modules") walk(full, out);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const stripComments = (code) =>
  code.replace(/\/\*[\s\S]*?\*\/|(?<![:"'`])\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, " "));

const used = new Map(); // key -> "file:line" of first use
const unresolved = [];
const callRegex = /(?<![\w.$])t\s*\(/g;
const literalRegex = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;

for (const file of walk(resolve(root, "src"))) {
  const code = stripComments(readFileSync(file, "utf-8"));
  for (const call of code.matchAll(callRegex)) {
    // Balanced-paren slice of the call arguments.
    let depth = 1;
    let i = call.index + call[0].length;
    const start = i;
    for (; i < code.length && depth > 0; i++) {
      if (code[i] === "(") depth++;
      else if (code[i] === ")") depth--;
    }
    const args = code.slice(start, i - 1);
    const where = `${relative(root, file)}:${code.slice(0, call.index).split("\n").length}`;
    const keys = [...args.matchAll(literalRegex)]
      .filter((m) => m[1] !== "`" || !m[2].includes("${"))
      .map((m) => m[2]);
    // Plain literals, or `cond ? "a" : "b"` between literals.
    const shape = args.replace(literalRegex, '""').replace(/\s+/g, "");
    const onlyLiterals = shape === '""' || /^[\w$.!&|()]+\?"":""$/.test(shape);
    if (keys.length === 0 || !onlyLiterals) {
      // Not a translator call (e.g. "(non-ASCII)" in prose) or a genuinely dynamic key.
      if (/[A-Za-z_$][\w$]*\s*(\)|$)/.test(args.trim()) && !/^[\p{L}\s]+$/u.test(args.trim())) {
        unresolved.push(`${where}  t(${args.trim().slice(0, 60)})`);
      }
      continue;
    }
    for (const key of keys) if (!used.has(key)) used.set(key, where);
  }
}

for (const [key, where] of used) {
  if (!(key in viFlat)) {
    console.error(`[i18n] Key used in code but missing from messages: ${key}  (${where})`);
    errors++;
  }
}

const orphans = viKeys.filter((k) => !used.has(k));
for (const key of orphans) {
  console.error(`[i18n] Unused key (not referenced by any t() call): ${key}`);
  errors++;
}

for (const entry of unresolved) console.warn(`[i18n] Warning: dynamic key, cannot verify: ${entry}`);

if (errors > 0) {
  console.error(`\nFAILED: Found ${errors} i18n issue(s).`);
  process.exit(1);
}

console.log(
  `[i18n] Passed: ${viKeys.length} keys in sync, all used (${used.size} referenced), matching interpolation tokens.`,
);
