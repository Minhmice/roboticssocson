export type BlockType = "h" | "p" | "rule" | "cap" | "ul" | "table" | "img";

export interface HeadingBlock {
  t: "h";
  lvl: number;
  id: string;
  num: string;
  en: string;
  vi?: string;
  p: number;
}

export interface ParagraphBlock {
  t: "p";
  ind: number;
  en: string;
  vi?: string;
  p: number;
  is_h?: boolean;
}

export interface RuleBlock {
  t: "rule";
  id: string;
  ind: number;
  en: string;
  vi?: string;
  p: number;
}

export interface CaptionBlock {
  t: "cap";
  ind: number;
  en: string;
  vi?: string;
  p: number;
}

export interface ListItem {
  ind: number;
  en: string;
  vi?: string;
}

export interface ListBlock {
  t: "ul";
  p: number;
  items: ListItem[];
}

export interface TableBlock {
  t: "table";
  rows: string[][];
  rows_vi?: string[][];
  p: number;
}

export interface ImageBlock {
  t: "img";
  src: string;
  w: number;
  h: number;
  kind: "image" | "drawing" | "math";
  p: number;
}

export type ManualBlockData =
  | HeadingBlock
  | ParagraphBlock
  | RuleBlock
  | CaptionBlock
  | ListBlock
  | TableBlock
  | ImageBlock;

export interface ChunkHeading {
  id: string;
  num: string;
  lvl: number;
  title: string;
  title_vi?: string;
}

export interface ChunkMeta {
  id: string;
  num: string;
  lvl: number;
  title: string;
  title_vi?: string;
  p0: number;
  p1: number;
  blocks: number;
  /** Estimated rendered height (px) so lazy placeholders match real content. */
  est: number;
  headings: ChunkHeading[];
  rules?: string[];
}

export interface SectionMeta {
  id: string;
  num: string;
  lvl: number;
  title: string;
  title_vi?: string;
  p0: number;
  p1: number;
  blocks: number;
  chunks: ChunkMeta[];
}

export interface ManualIndex {
  version: string;
  /** [first page, last page] covered by the manual body. */
  pages: [number, number];
  sections: SectionMeta[];
}

export interface ManualChunkData {
  id: string;
  num: string;
  lvl: number;
  title: string;
  p0: number;
  p1: number;
  blocks: ManualBlockData[];
}
