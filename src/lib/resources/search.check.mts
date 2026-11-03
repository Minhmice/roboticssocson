import assert from "node:assert/strict";
import { fold, isValidResourceSearchDocument, searchResources, type ResourceSearchDocument } from "./search.ts";
import { parseMdxContent } from "./parser.ts";
import { isValidIsoDate, isValidSlug } from "../../../scripts/check-resources.mjs";

{
  const rulesDocument: unknown = {
    id: "category:rules",
    categoryId: "rules",
    title: "Rules",
    description: "FTC rules",
    href: "/ftc-rules",
    status: "ready",
    tags: ["Rules"],
    body: "",
    headings: "",
  };
  assert.ok(isValidResourceSearchDocument(rulesDocument), "Rules search destination must be accepted");
  assert.ok(isValidResourceSearchDocument({ ...rulesDocument as object, href: "/ftc-rules#r101" }), "Rules anchors must be accepted");
}

console.log("[search.check] Running parsing and search behavioral checks...");

// 1. Check diacritic-insensitive folding and length preservation
{
  const viSample = "Động cơ giảm tốc & Smart Servo: Lựa chọn lực kéo";
  const folded = fold(viSample);

  assert.equal(folded.length, viSample.length, "Folded string must preserve original length");
  assert.ok(folded.includes("dong co"), "Must fold 'Động cơ' to 'dong co'");
  assert.ok(folded.includes("lua chon"), "Must fold 'Lựa chọn' to 'lua chon'");
  assert.ok(folded.includes("luc keo"), "Must fold 'lực kéo' to 'luc keo'");
  assert.equal(fold("Đ"), "d", "Capital Đ must fold to d");
  assert.equal(fold("đ"), "d", "Lowercase đ must fold to d");
}

// 2. Check MDX AST parsing for headings, text, code tokens, and word boundaries
{
  const mdxSource = `
# REV Control Hub Guide

REV Control Hub là trung tâm điều khiển chính cho robot FTC.

Cổng giao tiếp sử dụng \`RS-485\` và bus I2C.

\`\`\`java
public class AutoDrive extends LinearOpMode {
  public void runOpMode() {}
}
\`\`\`

## Cổng Động Cơ UltraPlanetary

Cần chú ý giới hạn dòng 20A.

### Lưu ý an toàn

- Không chạm tay vào mạch điện khi pin đang cắm.
- Đeo kính bảo hộ khi thử nghiệm.
`;

  const parsed = parseMdxContent(mdxSource);

  assert.ok(parsed.headings.includes("REV Control Hub Guide"), "Headings must include H1");
  assert.ok(parsed.headings.includes("Cổng Động Cơ UltraPlanetary"), "Headings must include H2");
  assert.ok(parsed.headings.includes("Lưu ý an toàn"), "Headings must include H3");
  assert.ok(parsed.body.includes("trung tâm điều khiển"), "Body must contain paragraph text");
  assert.ok(parsed.body.includes("RS-485"), "Body must include inlineCode tokens");
  assert.ok(parsed.body.includes("LinearOpMode"), "Body must include code block tokens");
  assert.ok(parsed.body.includes("AutoDrive"), "Body must include class identifier from code block");
  assert.ok(parsed.body.includes("Không chạm tay vào mạch điện"), "Body must contain list item text");
  assert.ok(!parsed.body.includes("<"), "Body must not contain unparsed HTML tags");

  // Word boundary verification between paragraphs and items:
  assert.ok(!parsed.body.includes("FTC.Cổng"), "Word boundaries must be preserved across paragraph nodes");
}

// 3. Check calendar date and slug validators
{
  assert.equal(isValidIsoDate("2026-10-31"), true, "Valid date must pass");
  assert.equal(isValidIsoDate("2026-02-31"), false, "Impossible Feb 31 must fail");
  assert.equal(isValidIsoDate("2026-04-31"), false, "Impossible Apr 31 must fail");
  assert.equal(isValidIsoDate("not-a-date"), false, "Malformed string must fail");

  assert.equal(isValidSlug("ftc-components"), true, "Valid slug must pass");
  assert.equal(isValidSlug("motors-and-servos"), true, "Valid slug must pass");
  assert.equal(isValidSlug("../unsafe"), false, "Path traversal slug must fail");
  assert.equal(isValidSlug("Has Uppercase"), false, "Uppercase and spaces must fail");
}

// 4. Check search query engine rankings, AND logic, and filters
{
  const docs: ResourceSearchDocument[] = [
    {
      id: "match-title-only",
      categoryId: "ftc-components",
      title: "Động cơ goBILDA Yellow Jacket",
      description: "Tổng quan các dòng",
      href: "/resources/ftc-components/motors",
      status: "soon",
      tags: ["Components"],
      body: "Chi tiết lắp đặt trục",
      headings: "Thông số",
    },
    {
      id: "match-heading-only",
      categoryId: "ftc-components",
      title: "Cẩm nang phần cứng FTC",
      description: "Tài liệu cơ bản",
      href: "/resources/ftc-components/hardware",
      status: "soon",
      tags: ["Components"],
      body: "Chi tiết lắp đặt trục",
      headings: "Hệ thống động cơ giảm tốc",
    },
    {
      id: "match-tags-only",
      categoryId: "ftc-components",
      title: "Khung gầm Mecanum",
      description: "Tài liệu cơ bản",
      href: "/resources/ftc-components/drivetrain",
      status: "soon",
      tags: ["Động cơ", "Kinematics"],
      body: "Chi tiết lắp đặt trục",
      headings: "Thông số",
    },
    {
      id: "match-body-only",
      categoryId: "ftc-components",
      title: "Cảm biến khoảng cách và màu sắc",
      description: "Tài liệu cơ bản",
      href: "/resources/ftc-components/sensors",
      status: "soon",
      tags: ["Components"],
      body: "Cách kết nối động cơ với bus I2C",
      headings: "Thông số",
    },
    {
      id: "doc-rules",
      categoryId: "rules",
      title: "Luật G205: Động cơ hợp lệ",
      description: "Quy định số lượng động cơ tối đa trên robot",
      href: "/ftc-rules#G205",
      status: "ready",
      tags: ["Rules", "Inspection"],
      body: "Chỉ được phép sử dụng tối đa 8 động cơ.",
      headings: "Quy chuẩn động cơ",
    },
  ];

  // A. Ranked order: title > headings > tags > body
  const results = searchResources(docs, "dong co");
  assert.equal(results.length, 5, "All 5 documents mention 'dong co'");

  const titleHit = results.find((r) => r.id === "match-title-only");
  const headingHit = results.find((r) => r.id === "match-heading-only");
  const tagHit = results.find((r) => r.id === "match-tags-only");
  const bodyHit = results.find((r) => r.id === "match-body-only");

  assert.ok(titleHit && headingHit && tagHit && bodyHit, "All hits must be found");
  assert.ok(titleHit.score > headingHit.score, "Title score must exceed heading score");
  assert.ok(headingHit.score > tagHit.score, "Heading score must exceed tags score");
  assert.ok(tagHit.score > bodyHit.score, "Tags score must exceed body score");

  // B. AND query logic (all terms required)
  const andResults = searchResources(docs, "dong co yellow");
  assert.equal(andResults.length, 1, "Only match-title-only has both 'dong co' and 'yellow'");
  assert.equal(andResults[0].id, "match-title-only");

  const noMatch = searchResources(docs, "dong co pin-khong-ton-tai");
  assert.equal(noMatch.length, 0, "Missing one term must yield no hits");

  // C. Category filter
  const rulesOnly = searchResources(docs, "dong co", "rules");
  assert.equal(rulesOnly.length, 1, "Category filter 'rules' must include only rules");
  assert.equal(rulesOnly[0].id, "doc-rules");

  const componentsOnly = searchResources(docs, "dong co", "ftc-components");
  assert.equal(componentsOnly.length, 4, "Category filter 'ftc-components' must match 4 items");

  // D. Safe snippet verification (no HTML)
  assert.ok(!results[0].snippet.includes("<mark>"), "Snippet must not inject HTML");
  assert.ok(!results[0].snippet.includes("<"), "Snippet must be safe plain text");
  assert.ok(results[0].snippet.length > 0, "Snippet must not be empty");

  // E. Empty query returns empty array
  assert.equal(searchResources(docs, "").length, 0, "Empty query returns 0 hits");
  assert.equal(searchResources(docs, "   ").length, 0, "Whitespace query returns 0 hits");
}

console.log("[search.check] All parsing and search behavioral checks passed successfully!");
