export interface ResourceSearchDocument {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  href: string;
  status: "ready" | "soon";
  tags: readonly string[];
  body: string;
  headings: string;
}

export function isValidResourceSearchDocument(value: unknown): value is ResourceSearchDocument {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ResourceSearchDocument>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    typeof item.body === "string" &&
    typeof item.headings === "string" &&
    typeof item.categoryId === "string" &&
    typeof item.href === "string" &&
    (item.href === "/ftc-rules" || item.href.startsWith("/ftc-rules#") || item.href.startsWith("/resources/")) &&
    !item.href.includes("\\") &&
    Array.isArray(item.tags) &&
    item.tags.every((tag) => typeof tag === "string") &&
    (item.status === "ready" || item.status === "soon")
  );
}

export interface ResourceSearchHit extends ResourceSearchDocument {
  score: number;
  snippet: string;
}

function foldChar(ch: string): string {
  if (ch === "đ" || ch === "Đ") return "d";
  const out = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (out.length === ch.length) return out;
  const lower = ch.toLowerCase();
  return lower.length === ch.length ? lower : ch;
}

/**
 * Length-preserving lowercase + diacritic removal for Vietnamese & English search and safe range mapping.
 */
export function fold(s: string): string {
  let out = "";
  for (const ch of s) out += foldChar(ch);
  return out;
}

/**
 * Extracts a window of plain text around the match index.
 * Returns safe plain text with no HTML injection.
 */
function extractWindow(
  text: string,
  matchIdx: number,
  matchLen: number,
  maxLen = 140,
): string {
  const half = Math.floor((maxLen - matchLen) / 2);
  let start = Math.max(0, matchIdx - half);
  let end = Math.min(text.length, matchIdx + matchLen + half);

  if (start > 0) {
    const spaceIdx = text.indexOf(" ", start);
    if (spaceIdx >= 0 && spaceIdx < matchIdx) {
      start = spaceIdx + 1;
    }
  }

  if (end < text.length) {
    const spaceIdx = text.lastIndexOf(" ", end);
    if (spaceIdx > matchIdx + matchLen) {
      end = spaceIdx;
    }
  }

  let snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
  if (start > 0) snippet = `...${snippet}`;
  if (end < text.length) snippet = `${snippet}...`;
  return snippet;
}

/**
 * Generates a safe plain-text snippet from body, description, or headings.
 */
export function createSafeSnippet(
  doc: ResourceSearchDocument,
  terms: readonly string[],
): string {
  const body = doc.body.trim();
  const desc = doc.description.trim();
  const headings = doc.headings.trim();

  if (body) {
    const foldedBody = fold(body);
    for (const term of terms) {
      const idx = foldedBody.indexOf(term);
      if (idx >= 0) {
        return extractWindow(body, idx, term.length);
      }
    }
  }

  if (desc) {
    const foldedDesc = fold(desc);
    for (const term of terms) {
      const idx = foldedDesc.indexOf(term);
      if (idx >= 0) {
        if (desc.length <= 160) return desc;
        return extractWindow(desc, idx, term.length);
      }
    }
    if (desc.length <= 160) return desc;
    return `${desc.slice(0, 157)}...`;
  }

  if (headings) {
    return headings.length <= 160 ? headings : `${headings.slice(0, 157)}...`;
  }

  return doc.title;
}

/**
 * Client query engine:
 * - Diacritic-insensitive ranking: title > headings/tags > body
 * - Requires all whitespace-separated query terms (AND matching)
 * - Safe plain-text snippet generation
 * - Category filtering (including Rules under rules filter)
 */
export function searchResources(
  documents: readonly ResourceSearchDocument[],
  query: string,
  categoryId?: string,
): ResourceSearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const foldedQuery = fold(trimmed);
  const terms = foldedQuery.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const filterCategory =
    categoryId && categoryId !== "all" ? categoryId : undefined;

  const hits: ResourceSearchHit[] = [];

  for (const doc of documents) {
    if (filterCategory && doc.categoryId !== filterCategory) {
      continue;
    }

    const foldedTitle = fold(doc.title);
    const foldedHeadings = fold(doc.headings);
    const foldedTags = doc.tags.map(fold);
    const foldedDesc = fold(doc.description);
    const foldedBody = fold(doc.body);

    let docScore = 0;
    let allTermsMatch = true;

    for (const term of terms) {
      const inTitle = foldedTitle.includes(term);
      const inHeadings = foldedHeadings.includes(term);
      const inTags = foldedTags.some((t) => t.includes(term));
      const inDesc = foldedDesc.includes(term);
      const inBody = foldedBody.includes(term);

      if (!inTitle && !inHeadings && !inTags && !inDesc && !inBody) {
        allTermsMatch = false;
        break;
      }

      // Ranked weights: title > headings/tags > description > body
      if (inTitle) {
        docScore += 100;
        if (foldedTitle === term) docScore += 50;
        else if (foldedTitle.startsWith(term)) docScore += 25;
      }
      if (inHeadings) {
        docScore += 50;
      }
      if (inTags) {
        docScore += 40;
      }
      if (inDesc) {
        docScore += 25;
      }
      if (inBody) {
        docScore += 10;
      }
    }

    if (!allTermsMatch) continue;

    const snippet = createSafeSnippet(doc, terms);

    hits.push({
      ...doc,
      score: docScore,
      snippet,
    });
  }

  return hits.sort((a, b) => b.score - a.score);
}
