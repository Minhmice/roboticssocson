import { createProcessor } from "@mdx-js/mdx";

export interface ParsedMdxContent {
  headings: string;
  body: string;
}

interface AstNode {
  type: string;
  value?: string;
  children?: AstNode[];
}

function getNodeText(node: AstNode | undefined): string {
  if (!node) return "";
  if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
    return node.value ?? "";
  }
  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join(" ");
  }
  return "";
}

/**
 * Extracts plain-text headings and body content from raw MDX source using @mdx-js/mdx compiler processor.
 * Preserves code and inlineCode tokens and preserves word boundaries across nodes.
 */
export function parseMdxContent(source: string): ParsedMdxContent {
  const processor = createProcessor();
  const root = processor.parse(source) as AstNode;

  const headings: string[] = [];
  const bodyParts: string[] = [];

  function visit(node: AstNode | undefined) {
    if (!node) return;

    if (node.type === "heading") {
      const text = getNodeText(node).replace(/\s+/g, " ").trim();
      if (text) headings.push(text);
      return;
    }

    if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
      const text = (node.value ?? "").replace(/\s+/g, " ").trim();
      if (text) bodyParts.push(text);
      return;
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child);
      }
    }
  }

  visit(root);

  return {
    headings: headings.join(" | "),
    body: bodyParts.join(" "),
  };
}
