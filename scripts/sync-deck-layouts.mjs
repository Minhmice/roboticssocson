import fs from "node:fs";

const map = {
  1: "cover-hero",
  2: "section-split-right",
  3: "editorial-image-right",
  4: "editorial-image-left",
  5: "compare-panels-side",
  6: "mosaic-four-up",
  7: "mosaic-three-row",
  8: "section-image-bottom",
  9: "center-stack-image",
  10: "flow-diagram-side",
  11: "image-hero-top",
  12: "showcase-trio",
  13: "section-band-image",
  14: "split-dual-images",
  15: "caption-over-image",
  16: "section-compact",
  17: "diagram-card-image",
  18: "bridge-compare",
  19: "section-wide-image",
  20: "pillars-horizontal",
  21: "loop-vertical",
  22: "feature-wide-image",
  23: "example-card-side",
  24: "example-image-top",
  25: "section-emotive-bg",
  26: "action-image-major",
  27: "debug-checklist",
  28: "trophy-showcase",
  30: "closing-qr",
};

let source = fs.readFileSync("src/data/arduinoMblockDeck.ts", "utf8");
for (const [id, layout] of Object.entries(map)) {
  const re = new RegExp(`("id": ${id},\\s*\\n\\s*"layout": )"[^"]+"`);
  source = source.replace(re, `$1"${layout}"`);
}
fs.writeFileSync("src/data/arduinoMblockDeck.ts", source);
console.log("Synced deck slide layouts.");
