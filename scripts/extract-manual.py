#!/usr/bin/env python3
"""Extract the FTC Competition Manual PDF into lazy-loadable JSON chunks + WebP figures.

Usage:
  python scripts/extract-manual.py <manual.pdf>   # full extraction (overwrites chunks, no vi text kept)
  python scripts/extract-manual.py --index-only    # rebuild public/manual/index.json from existing chunks

Output:
  public/manual/chunks/<chunk-id>.json   one chunk per level-1/level-2 TOC heading
  public/manual/index.json               navigation tree (+ title_vi when chunks are translated)
  public/Images/manual/*.webp            figures (page clips, deduplicated by pixel hash)
"""
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHUNK_DIR = ROOT / "public" / "manual" / "chunks"
INDEX_PATH = ROOT / "public" / "manual" / "index.json"
IMG_DIR = ROOT / "public" / "Images" / "manual"
IMG_URL = "/Images/manual/"

FIRST_CONTENT_PAGE = 5  # pages 1-4: cover + generated table of contents
FOOTER_Y = 736
LINE_GAP = 15
RULE_RE = re.compile(r"^[A-Z]{1,2}\d{2,3}[a-z]?$")
NUM_RE = re.compile(r"^(\d+(?:\.\d+)*)\s+(.*)$")


def norm(s):
    return re.sub(r"\s+", "", s).lower()


def clean(s):
    return re.sub(r"\s+", " ", s.replace("\u00a0", " ")).strip()


def inside(rect, outer, pad=2):
    cx, cy = (rect[0] + rect[2]) / 2, (rect[1] + rect[3]) / 2
    return outer[0] - pad <= cx <= outer[2] + pad and outer[1] - pad <= cy <= outer[3] + pad


def is_math_line(line):
    spans = [s for s in line["spans"] if s["text"].strip()]
    return bool(spans) and all(s["font"].startswith("Cambria") for s in spans)


class Figures:
    def __init__(self, doc):
        self.doc = doc
        self.seen = {}
        self.count = 0
        IMG_DIR.mkdir(parents=True, exist_ok=True)

    def save(self, page, bbox, kind):
        from PIL import Image
        import pymupdf

        clip = pymupdf.Rect(bbox) & page.rect
        pix = page.get_pixmap(clip=clip, dpi=144, alpha=False)
        digest = hashlib.md5(pix.samples).hexdigest()
        if digest not in self.seen:
            self.count += 1
            name = f"p{page.number + 1:03d}-{self.count:03d}.webp"
            Image.frombytes("RGB", (pix.width, pix.height), pix.samples).save(
                IMG_DIR / name, "WEBP", quality=82, method=4
            )
            self.seen[digest] = (name, pix.width, pix.height)
        name, w, h = self.seen[digest]
        return {"t": "img", "kind": kind, "src": IMG_URL + name, "w": w, "h": h}


def page_items(page, figs):
    """Return [(y0, x0, block)] for one page, in reading order."""
    d = page.get_text("dict")
    items = []
    tables = []
    for t in page.find_tables().tables:
        rows = [[clean(c or "") for c in r] for r in t.extract()]
        if not rows or not any(any(r) for r in rows):
            continue
        tables.append(t.bbox)
        items.append((t.bbox[1], t.bbox[0], {"t": "table", "rows": rows}))

    boxes = []  # bboxes covered by rendered figures
    for info in page.get_image_info():
        b = info["bbox"]
        if b[3] <= 101 or b[2] - b[0] < 20 or b[3] - b[1] < 20:  # banner / specks
            continue
        boxes.append(b)
        items.append((b[1], b[0], figs.save(page, b, "image")))
    for c in page.cluster_drawings():
        if c.width * c.height < 8000 or any(inside(c, t, 6) for t in tables):
            continue
        if any(inside(c, b, 6) for b in boxes) or len(page.get_text("text", clip=c).strip()) >= 15:
            continue
        boxes.append(tuple(c))
        items.append((c.y0, c.x0, figs.save(page, c, "drawing")))

    math_rows = []
    lines = []
    for blk in d["blocks"]:
        if blk["type"] != 0:
            continue
        for ln in blk["lines"]:
            b = ln["bbox"]
            if b[1] >= FOOTER_Y or not clean("".join(s["text"] for s in ln["spans"])):
                continue
            if any(inside(b, t) for t in tables) or any(inside(b, x) for x in boxes):
                continue
            if is_math_line(ln):
                math_rows.append(b)
            else:
                lines.append(ln)
    math_rows.sort(key=lambda r: r[1])
    groups = []
    for r in math_rows:
        if groups and r[1] - groups[-1][3] < 30:
            g = groups[-1]
            groups[-1] = (min(g[0], r[0]), min(g[1], r[1]), max(g[2], r[2]), max(g[3], r[3]))
        else:
            groups.append(tuple(r))
    for g in groups:
        pad = (g[0] - 4, g[1] - 4, g[2] + 4, g[3] + 4)
        items.append((g[1], g[0], figs.save(page, pad, "math")))

    # Group lines by visual row (within 3.5pt vertically) and sort each row by x0
    visual_rows = []
    for ln in lines:
        y0 = ln["bbox"][1]
        placed = False
        for r in visual_rows:
            if abs(r["y"] - y0) <= 3.5:
                r["lines"].append(ln)
                placed = True
                break
        if not placed:
            visual_rows.append({"y": y0, "lines": [ln]})
    visual_rows.sort(key=lambda r: r["y"])
    sorted_lines = []
    for r in visual_rows:
        r["lines"].sort(key=lambda ln: ln["bbox"][0])
        sorted_lines.extend(r["lines"])

    cur = None
    def flush():
        nonlocal cur
        if cur:
            cur["en"] = clean(cur["en"])
            if cur["en"]:
                items.append((cur.pop("_y"), cur.pop("_x"), cur))
        cur = None

    prev_y = None
    for ln in sorted_lines:
        spans = [s for s in ln["spans"] if s["text"].strip()]
        first = spans[0]
        x0, y0 = ln["bbox"][0], ln["bbox"][1]
        text = "".join(s["text"] for s in ln["spans"])
        is_bold = any("Bold" in s["font"] for s in spans)
        is_sym = first["font"].startswith("Symbol")
        ftxt = first["text"].strip()

        is_heading_num = is_bold and bool(re.match(r"^\d+(\.\d+)*$", ftxt))

        if is_sym:
            flush()
            body = text.split(first["text"], 1)[1] if first["text"] in text else text
            cur = {"t": "li", "ind": max(0, round((x0 - 72) / 36)), "en": body, "_y": y0, "_x": x0}
        elif is_heading_num and len(spans) == 1:
            # Standalone heading number like "1.3.1"
            flush()
            cur = {"t": "p", "ind": 0, "is_h": True, "en": text, "_y": y0, "_x": x0}
        elif cur is not None and cur.get("is_h"):
            # The title following a heading number on same or next line
            cur["en"] += " " + text
            flush()
        elif cur is not None and prev_y is not None and y0 - prev_y <= LINE_GAP and cur["t"] != "cap":
            cur["en"] += " " + text
        else:
            flush()
            ind = 0 if x0 < 60 else (1 if x0 < 100 else 2)
            if "Bold" in first["font"] and RULE_RE.match(ftxt) and len(spans) > 1:
                cur = {"t": "rule", "id": ftxt, "ind": 0, "en": "".join(s["text"] for s in ln["spans"][ln["spans"].index(first) + 1:]), "_y": y0, "_x": x0}
            elif "Italic" in first["font"] and first["size"] < 10.5 and re.match(r"(Figure|Table)\b", ftxt):
                cur = {"t": "cap", "ind": 0, "en": text, "_y": y0, "_x": x0}
            else:
                cur = {"t": "p", "ind": ind, "en": text, "_y": y0, "_x": x0}
        prev_y = y0
    flush()
    items.sort(key=lambda it: (round(it[0]), it[1]))
    return [it[2] for it in items]


def merge_lists(blocks):
    out = []
    for b in blocks:
        if b["t"] == "li":
            if out and out[-1]["t"] == "ul" and out[-1]["p"] == b["p"]:
                out[-1]["items"].append({"ind": b["ind"], "en": b["en"]})
            else:
                out.append({"t": "ul", "p": b["p"], "items": [{"ind": b["ind"], "en": b["en"]}]})
        else:
            out.append(b)
    return out


def chunk_id(num):
    parts = num.split(".")
    return "s" + "-".join(parts[:2])


def extract(pdf):
    import pymupdf

    doc = pymupdf.open(pdf)
    toc = {}
    for lvl, title, pg in doc.get_toc():
        m = NUM_RE.match(title)
        if m:
            toc[norm(title)] = (lvl, m.group(1), m.group(2), pg)
    figs = Figures(doc)
    chunks, cur, seen = [], None, set()
    for pn in range(FIRST_CONTENT_PAGE - 1, len(doc)):
        page = doc[pn]
        for b in merge_lists([dict(x, p=pn + 1) if x["t"] != "ul" else x for x in page_items(page, figs)]):
            b.setdefault("p", pn + 1)
            if b["t"] == "p" and norm(b["en"]) in toc:
                lvl, num, title, _ = toc[norm(b["en"])]
                seen.add(norm(b["en"]))
                b = {"t": "h", "lvl": lvl, "id": num.replace(".", "-"), "num": num, "en": title, "p": pn + 1}
                if lvl <= 2:
                    cur = {"id": chunk_id(num), "num": num, "lvl": lvl, "title": title, "p0": pn + 1, "blocks": []}
                    chunks.append(cur)
            if cur is None:
                cur = {"id": "front", "num": "", "lvl": 0, "title": "Front", "p0": pn + 1, "blocks": []}
                chunks.append(cur)
            cur["blocks"].append(b)
    missing = [t for k, t in ((k, v[1] + " " + v[2]) for k, v in toc.items()) if k not in seen]
    CHUNK_DIR.mkdir(parents=True, exist_ok=True)
    for f in CHUNK_DIR.glob("*.json"):
        f.unlink()
    for c in chunks:
        c["p1"] = max(b["p"] for b in c["blocks"]) if c["blocks"] else c["p0"]
        (CHUNK_DIR / f"{c['id']}.json").write_text(json.dumps(c, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    kinds = {}
    for c in chunks:
        for b in c["blocks"]:
            kinds[b["t"]] = kinds.get(b["t"], 0) + 1
    print(f"pages {len(doc) - FIRST_CONTENT_PAGE + 1}  chunks {len(chunks)}  blocks {kinds}")
    print(f"figures: {figs.count} unique files, {kinds.get('img', 0)} placements")
    print(f"TOC entries unmatched: {len(missing)} {missing[:10]}")


def _txt(b):
    return b.get("vi") or b.get("en") or ""


def _lines(n, per):
    return max(1, -(-n // per))


def est_height(b):
    """Rough rendered px height of one block (ManualBlock layout); keeps lazy placeholders close to reality."""
    t = b["t"]
    if t == "h":
        return {1: 120, 2: 96}.get(b["lvl"], 64)
    if t in ("p", "cap"):
        return 16 + 26 * _lines(len(_txt(b)), 80)
    if t == "rule":
        return 76 + 26 * _lines(len(_txt(b)), 80)
    if t == "ul":
        return 16 + sum(8 + 26 * _lines(len(i.get("vi") or i["en"]), 78) for i in b["items"])
    if t == "table":
        # merged PDF cells come through as empty strings: size columns by the cells that actually hold text
        rows = b.get("rows_vi") or b["rows"]
        total = 24
        for r in rows:
            filled = [c for c in r if c]
            per = max(8, 87 // max(1, len(filled)))
            total += max(40, 16 + 22 * max((_lines(len(c), per) for c in filled), default=0))
        return total
    if t == "img":
        return min(550, b["h"]) + 56
    return 0


def search_items(c, heads):
    """One tuple per searchable block: [chunk, anchor DOM id, head index, vi, en, kind]."""
    cid, head, items = c["id"], 0, []

    def add(anchor, vi, en, kind):
        if len((vi or en).strip()) >= 2:
            items.append([cid, anchor, head, vi or en, en or vi, kind])

    for idx, b in enumerate(c["blocks"]):
        t, dom = b["t"], f'{cid}.{idx}'
        if t == "h":
            heads.append(f'{b["num"]} {b.get("vi") or b["en"]}')
            head = len(heads) - 1
            add(b["id"], f'{b["num"]} {b.get("vi") or ""}'.strip(), f'{b["num"]} {b["en"]}', "h")
        elif t == "rule":
            # leading "*" marks an Evergreen rule (display concern, not searchable text)
            add(b["id"], f'{b["id"]} {(b.get("vi") or "").lstrip("* ")}'.strip(), f'{b["id"]} {b["en"].lstrip("* ")}', "r")
        elif t in ("p", "cap"):
            add(dom, b.get("vi"), b["en"], "p")
        elif t == "ul":
            for i in b["items"]:
                add(dom, i.get("vi"), i["en"], "p")
        elif t == "table":
            vi = " | ".join(x for r in (b.get("rows_vi") or b["rows"]) for x in r if x)
            en = " | ".join(x for r in b["rows"] for x in r if x)
            add(dom, vi, en, "p")
    return items


def write_index():
    sections, by_id, heads, items = [], {}, [], []
    for f in sorted(CHUNK_DIR.glob("*.json")):
        c = json.loads(f.read_text(encoding="utf-8"))
        hs = [
            {"id": b["id"], "num": b["num"], "lvl": b["lvl"], "title": b["en"], **({"title_vi": b["vi"]} if b.get("vi") else {})}
            for b in c["blocks"] if b["t"] == "h"
        ]
        rules = [b["id"] for b in c["blocks"] if b.get("t") == "rule"]
        entry = {
            "id": c["id"],
            "num": c["num"],
            "lvl": c["lvl"],
            "title": c["title"],
            "p0": c["p0"],
            "p1": c["p1"],
            "blocks": len(c["blocks"]),
            "est": 24 + sum(est_height(b) for b in c["blocks"]),
            "headings": hs,
            "rules": rules,
        }
        if hs and hs[0].get("title_vi"):
            entry["title_vi"] = hs[0]["title_vi"]
        by_id[c["id"]] = entry
        items.append(search_items(c, heads))
    for cid, e in by_id.items():
        if e["lvl"] <= 1:
            sections.append({**e, "chunks": [e]})
    top = {s["num"]: s for s in sections}
    for e in by_id.values():
        if e["lvl"] == 2:
            top[e["num"].split(".")[0]]["chunks"].append(e)
    order = lambda e: [int(x) for x in e["num"].split(".")] if e["num"] else []
    sections.sort(key=order)
    for s in sections:
        s["chunks"].sort(key=order)
        s.pop("headings", None)
    pages = [min(e["p0"] for e in by_id.values()), max(e["p1"] for e in by_id.values())]
    dump = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))
    INDEX_PATH.write_text(dump({"version": "TU06", "pages": pages, "sections": sections}), encoding="utf-8")
    # chunk files sort lexicographically (s1, s1-1, s10 ...) - flatten in reading order for stable result ranking
    chunk_order = {c["id"]: n for n, s in enumerate(sections) for n2, c in enumerate(s["chunks"])}
    flat = sorted((i for part in items for i in part), key=lambda i: chunk_order.get(i[0], 0))
    (INDEX_PATH.parent / "search-index.json").write_text(dump({"v": "TU06", "heads": heads, "items": flat}), encoding="utf-8")
    print(f"index: {len(sections)} sections, {sum(len(s['chunks']) for s in sections)} chunks, {len(flat)} search items")


if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--index-only":
        write_index()
    elif len(sys.argv) == 2:
        extract(sys.argv[1])
        write_index()
    else:
        sys.exit(__doc__)
