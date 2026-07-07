---
status: resolved
trigger: |
  (node:31532) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///C:/Users/minhmice/Documents/projects/roboticssocson/tailwind.config.ts?id=1783345499793 is not specified and it doesn't parse as CommonJS.
  Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
  To eliminate this warning, add "type": "module" to package.json.
created: 2026-07-06
updated: 2026-07-06
---

## Symptoms

- **Expected:** Dev server starts without Node warnings; GET / returns 200.
- **Actual:** MODULE_TYPELESS_PACKAGE_JSON warning on tailwind.config.ts at startup.
- **Error messages:** See trigger above.
- **Timeline:** Regressed after `git reset --hard origin/main` reverted prior fix.
- **Reproduction:** `npm run dev`, load `/`.

## Current Focus

- **hypothesis:** tailwind.config.ts uses ESM syntax without package.json "type":"module"; rename to .mjs is the minimal fix (next.config.js is CJS).
- **next_action:** apply fix and verify dev startup

## Evidence

- timestamp: 2026-07-06 — Prior session fixed via tailwind.config.mjs; force pull restored tailwind.config.ts.

## Eliminated

- hypothesis: Add "type":"module" to package.json — next.config.js uses module.exports (CJS).

## Resolution

- **root_cause:** Tailwind v4 loads config via `@config` in globals.css; `tailwind.config.ts` uses ESM syntax but package.json has no `"type": "module"`. Node reparses and warns. Cannot add `"type": "module"` because `next.config.js` is CJS.
- **fix:** Renamed to `tailwind.config.mjs`; updated `@config` in globals.css and components.json.
- **verification:** `next dev -p 4002` → `✓ Ready in 446ms`, no MODULE_TYPELESS_PACKAGE_JSON warning.
- **files_changed:** tailwind.config.mjs (new), tailwind.config.ts (removed), src/app/globals.css, components.json
