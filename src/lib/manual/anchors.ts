import type { ChunkMeta, ManualIndex, SectionMeta } from "@/types/manual";

/** Reading line: just below the sticky chrome (navbar + manual bar). Read from CSS so it scales with the root font size. */
export function readLine(): number {
  return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 140;
}

const BLOCK_ANCHOR = /^(s[\d-]+)\.(\d+)$/;

export interface ManualLookup {
  /** anchor id (chunk / heading / rule) -> owning chunk id */
  anchors: Map<string, string>;
  /** rule ids only (G205, I301 ...): the only ids worth auto-linking inside prose */
  rules: Set<string>;
  chunks: Map<string, ChunkMeta>;
  sectionOf: Map<string, SectionMeta>;
  headingTitle: Map<string, { num: string; vi?: string; en: string }>;
  order: ChunkMeta[];
}

export function buildLookup(index: ManualIndex): ManualLookup {
  const anchors = new Map<string, string>();
  const rules = new Set<string>();
  const chunks = new Map<string, ChunkMeta>();
  const sectionOf = new Map<string, SectionMeta>();
  const headingTitle = new Map<string, { num: string; vi?: string; en: string }>();
  const order: ChunkMeta[] = [];
  for (const s of index.sections) {
    for (const c of s.chunks) {
      order.push(c);
      chunks.set(c.id, c);
      sectionOf.set(c.id, s);
      anchors.set(c.id, c.id);
      for (const h of c.headings ?? []) {
        anchors.set(h.id, c.id);
        headingTitle.set(h.id, { num: h.num, vi: h.title_vi, en: h.title });
      }
      for (const r of c.rules ?? []) {
        anchors.set(r, c.id);
        rules.add(r);
      }
    }
  }
  return { anchors, rules, chunks, sectionOf, headingTitle, order };
}

/** Normalise a URL hash / stored anchor into a known anchor id, or null. */
export function resolveAnchor(raw: string, lookup: ManualLookup): { id: string; chunkId: string } | null {
  let id = raw.replace(/^#/, "");
  try {
    id = decodeURIComponent(id);
  } catch {
    /* keep raw */
  }
  if (!id) return null;
  const direct = lookup.anchors.get(id) ?? lookup.anchors.get(id.toUpperCase());
  if (direct) return { id: lookup.anchors.has(id) ? id : id.toUpperCase(), chunkId: direct };
  const dotted = id.replace(/\./g, "-"); // "1.3.1" -> "1-3-1"
  if (lookup.anchors.has(dotted)) return { id: dotted, chunkId: lookup.anchors.get(dotted)! };
  const m = BLOCK_ANCHOR.exec(id);
  if (m && lookup.chunks.has(m[1])) return { id, chunkId: m[1] };
  return null;
}

/** Human description of a stored reading position: `ref` (e.g. "4.1", "G205") + `title`. */
export function describeAnchor(
  id: string,
  chunkId: string,
  lang: "vi" | "en",
  lookup: ManualLookup,
): { ref: string; title: string } {
  const chunk = lookup.chunks.get(chunkId);
  const chunkTitle = chunk ? (lang === "vi" && chunk.title_vi ? chunk.title_vi : chunk.title) : "";
  const head = lookup.headingTitle.get(id);
  if (head) return { ref: head.num, title: lang === "vi" && head.vi ? head.vi : head.en };
  if (lookup.rules.has(id)) return { ref: id, title: `${chunk?.num ?? ""} ${chunkTitle}`.trim() };
  return { ref: chunk?.num ?? "", title: chunkTitle };
}
