export interface EnumNode {
  marker: string;
  text: string;
  children?: EnumNode[];
  leadIn?: string;
}

const ROMAN_MAP: Readonly<Record<string, number>> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
};

interface MarkerCandidate {
  raw: string;
  marker: string;
  markerStart: number;
  markerEnd: number;
}

function stripDanglingJoiner(text: string): string {
  let s = text.trimEnd();
  while (true) {
    const before = s;
    s = s.replace(
      /\s+(?:và\s*\/\s*hoặc|and\s*\/\s*or|và|hoặc|and|or)$/i,
      ""
    );
    s = s.replace(/[\s,;]+$/, "");
    if (s === before) break;
  }
  return s.trim();
}

function findCandidates(text: string): MarkerCandidate[] {
  const MARKER_CANDIDATE_RE =
    /(?:^|[\s,;:]|(?:và\s*\/\s*hoặc|and\s*\/\s*or|và|hoặc|and|or)\s+)([A-Za-z]|\d+|viii|vii|vi|iii|ii|iv|ix)\.\s+/gi;
  const list: MarkerCandidate[] = [];
  let m: RegExpExecArray | null;
  while ((m = MARKER_CANDIDATE_RE.exec(text)) !== null) {
    const raw = m[1];
    const marker = `${raw}.`;
    const trailingSpaces = m[0].length - m[0].trimEnd().length;
    const markerStart = m.index + m[0].length - trailingSpaces - marker.length;
    const markerEnd = m.index + m[0].length;
    list.push({ raw, marker, markerStart, markerEnd });
  }
  return list;
}

function findLevel2Seq(
  candidates: MarkerCandidate[]
): { kind: "roman" | "alpha"; seq: MarkerCandidate[] } | null {
  // Check roman numerals starting at i
  const romanCands = candidates.filter((c) =>
    Object.prototype.hasOwnProperty.call(ROMAN_MAP, c.raw.toLowerCase())
  );
  for (let i = 0; i < romanCands.length; i++) {
    if (ROMAN_MAP[romanCands[i].raw.toLowerCase()] === 1) {
      let expected = 2;
      const seq = [romanCands[i]];
      for (let j = i + 1; j < romanCands.length; j++) {
        if (ROMAN_MAP[romanCands[j].raw.toLowerCase()] === expected) {
          seq.push(romanCands[j]);
          expected++;
        }
      }
      if (seq.length >= 2) return { kind: "roman", seq };
    }
  }

  // Check lowercase alphabet starting at a
  const alphaCands = candidates.filter((c) => /^[a-z]$/.test(c.raw));
  for (let i = 0; i < alphaCands.length; i++) {
    if (alphaCands[i].raw === "a") {
      let expected = "b".charCodeAt(0);
      const seq = [alphaCands[i]];
      for (let j = i + 1; j < alphaCands.length; j++) {
        if (alphaCands[j].raw.charCodeAt(0) === expected) {
          seq.push(alphaCands[j]);
          expected++;
        }
      }
      if (seq.length >= 2) return { kind: "alpha", seq };
    }
  }

  return null;
}

export function parseEnum(text: string): EnumNode[] {
  if (!text || typeof text !== "string") return [];
  const candidates = findCandidates(text);
  if (candidates.length === 0) return [];

  // Check Level 1: capital letters or arabic numbers
  const capCands = candidates.filter((c) => /^[A-Z]$/.test(c.raw));
  let l1Seq: { kind: "cap" | "arabic"; seq: MarkerCandidate[] } | null = null;

  for (let i = 0; i < capCands.length; i++) {
    const isFirstValue =
      capCands[i].raw === "A" ||
      (capCands[i].markerStart <= 3 && /^[A-Z]$/.test(capCands[i].raw));
    if (isFirstValue) {
      let expected = capCands[i].raw.charCodeAt(0) + 1;
      const seq = [capCands[i]];
      for (let j = i + 1; j < capCands.length; j++) {
        if (capCands[j].raw.charCodeAt(0) === expected) {
          seq.push(capCands[j]);
          expected++;
        }
      }
      if (seq.length >= 2) {
        l1Seq = { kind: "cap", seq };
        break;
      }
    }
  }

  // Check arabic sequence starting at 1
  if (!l1Seq) {
    const arabicCands = candidates.filter((c) => /^\d+$/.test(c.raw));
    for (let i = 0; i < arabicCands.length; i++) {
      if (arabicCands[i].raw === "1") {
        let expected = 2;
        const seq = [arabicCands[i]];
        for (let j = i + 1; j < arabicCands.length; j++) {
          if (parseInt(arabicCands[j].raw, 10) === expected) {
            seq.push(arabicCands[j]);
            expected++;
          }
        }
        if (seq.length >= 2) {
          l1Seq = { kind: "arabic", seq };
          break;
        }
      }
    }
  }

  // Check single capital letter at start with nested Level 2 sequence
  if (!l1Seq) {
    const firstCand = candidates[0];
    if (
      firstCand &&
      firstCand.markerStart <= 3 &&
      /^[A-Z]$/.test(firstCand.raw)
    ) {
      const restCands = candidates.slice(1);
      const l2 = findLevel2Seq(restCands);
      if (l2) {
        l1Seq = { kind: "cap", seq: [firstCand] };
      }
    }
  }

  if (l1Seq) {
    const leadIn = text.slice(0, l1Seq.seq[0].markerStart).trim();
    const items: EnumNode[] = [];

    for (let i = 0; i < l1Seq.seq.length; i++) {
      const current = l1Seq.seq[i];
      const next = l1Seq.seq[i + 1];
      const itemSpanEnd = next ? next.markerStart : text.length;
      const rawItemText = text.slice(current.markerEnd, itemSpanEnd);

      const nestedCands = candidates.filter(
        (c) => c.markerStart >= current.markerEnd && c.markerEnd <= itemSpanEnd
      );
      const l2 = findLevel2Seq(nestedCands);

      if (l2) {
        const itemLeadText = text
          .slice(current.markerEnd, l2.seq[0].markerStart)
          .trim();
        const children: EnumNode[] = [];
        for (let j = 0; j < l2.seq.length; j++) {
          const cCurr = l2.seq[j];
          const cNext = l2.seq[j + 1];
          const cEnd = cNext ? cNext.markerStart : itemSpanEnd;
          let cText = text.slice(cCurr.markerEnd, cEnd);
          if (cNext) {
            cText = stripDanglingJoiner(cText);
          } else {
            cText = cText.trim();
          }
          children.push({ marker: cCurr.marker, text: cText });
        }
        items.push({
          marker: current.marker,
          text: itemLeadText,
          children,
        });
      } else {
        let itemText = rawItemText;
        if (next) {
          itemText = stripDanglingJoiner(itemText);
        } else {
          itemText = itemText.trim();
        }
        items.push({
          marker: current.marker,
          text: itemText,
        });
      }
    }

    if (leadIn && items.length > 0) {
      items[0].leadIn = leadIn;
    }
    return items;
  }

  // Standalone Level 2
  const l2 = findLevel2Seq(candidates);
  if (l2) {
    const leadIn = text.slice(0, l2.seq[0].markerStart).trim();
    const items: EnumNode[] = [];
    for (let j = 0; j < l2.seq.length; j++) {
      const cCurr = l2.seq[j];
      const cNext = l2.seq[j + 1];
      const cEnd = cNext ? cNext.markerStart : text.length;
      let cText = text.slice(cCurr.markerEnd, cEnd);
      if (cNext) {
        cText = stripDanglingJoiner(cText);
      } else {
        cText = cText.trim();
      }
      items.push({ marker: cCurr.marker, text: cText });
    }
    if (leadIn && items.length > 0) {
      items[0].leadIn = leadIn;
    }
    return items;
  }

  return [];
}
