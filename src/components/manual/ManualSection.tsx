"use client";

import React, { memo, useEffect, useRef } from "react";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import type { ChunkMeta, ManualBlockData, ManualChunkData } from "@/types/manual";
import { cancelChunk, requestChunk, seedChunk, useChunk, type ChunkError } from "@/lib/manual/chunks";
import { readLine } from "@/lib/manual/anchors";
import { BLUR, DUR, EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/manual/motion";
import { isScrollLocked } from "@/lib/manual/scroll";
import { ManualBlock } from "./ManualBlock";
import { useBlockReveal } from "./useBlockReveal";
interface ManualSectionProps {
  chunk: ChunkMeta;
  lang: "vi" | "en";
  rules: ReadonlySet<string>;
  /** Server-rendered first chunk: present in the HTML, so no fetch and no placeholder flash. */
  initialData?: ManualChunkData | null;
  onNavigate: (id: string) => void;
}

const ERROR_TEXT: Record<"vi" | "en", Record<ChunkError, string>> = {
  vi: {
    network: "Không có kết nối mạng nên chưa tải được phần này. Kiểm tra đường truyền và bấm Thử lại.",
    server: "Máy chủ chưa phản hồi nội dung phần này. Vui lòng bấm Thử lại sau ít phút.",
    data: "Dữ liệu phần này bị lỗi cấu trúc. Vui lòng bấm Thử lại hoặc tải lại trang.",
  },
  en: {
    network: "No network connection. Check your connection and click Retry.",
    server: "The server did not respond for this section. Please try again shortly.",
    data: "This section contains invalid data. Please try again or refresh the page.",
  },
};

/** Stable DOM id for every block: headings/rules keep their public id, everything else is `<chunk>.<index>`. */
function blockDomId(chunkId: string, block: ManualBlockData, index: number): string {
  return block.t === "h" || block.t === "rule" ? block.id : `${chunkId}.${index}`;
}

function captionText(block: ManualBlockData | undefined, lang: "vi" | "en"): string | undefined {
  return block?.t === "cap" ? (lang === "vi" && block.vi ? block.vi : block.en) : undefined;
}

export const ManualSection = memo(function ManualSection({
  chunk,
  lang,
  rules,
  initialData,
  onNavigate,
}: ManualSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useChunk(chunk.id);
  const data = state.data ?? initialData ?? null;
  const arrivedRef = useRef(Boolean(initialData));

  useEffect(() => {
    if (initialData) seedChunk(initialData);
  }, [initialData]);

  useGSAP(
    () => {
      if (!data || !ref.current || arrivedRef.current) return;
      arrivedRef.current = true;

      if (isScrollLocked()) return;
      if (ref.current.getBoundingClientRect().top <= readLine()) return;

      const targets = Array.from(ref.current.children).filter((el) =>
        el.hasAttribute("data-a"),
      ) as HTMLElement[];
      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DUR.panel,
            ease: EASE.out,
            clearProps: "opacity",
          },
        );
      } else {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 10, filter: `blur(${BLUR.enter}px)` },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: DUR.panel,
            ease: EASE.out,
            clearProps: "opacity,transform,filter",
          },
        );
      }
    },
    { scope: ref, dependencies: [Boolean(data)] },
  );

  useBlockReveal(ref, Boolean(data));
  // One observer for the whole lifetime: prefetch only. Which chunk is "being read" is decided by the viewer's scroll
  // handler at the reading line, never by this 1200px prefetch margin (that is what made the TOC highlight jump ahead).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = chunk.id;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void requestChunk(id);
        else cancelChunk(id);
      },
      { rootMargin: "1200px 0px 1200px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelChunk(id);
    };
  }, [chunk.id]);

  const title = lang === "vi" && chunk.title_vi ? chunk.title_vi : chunk.title;
  const firstBlock = data ? data.blocks[0] : (chunk.headings.length > 0 ? { t: "h" as const } : undefined);
  const lastBlock = data ? data.blocks[data.blocks.length - 1] : (chunk.blocks === 1 && chunk.headings.length === 1 ? { t: "h" as const } : undefined);
  const isChapterLeadSubsection = chunk.lvl === 2 && (chunk.num === "1.1" || chunk.num === "3.1" || chunk.num === "11.1" || chunk.num === "13.1");

  return (
    <div
      ref={ref}
      id={chunk.id}
      data-chunk={chunk.id}
      data-first-block={firstBlock?.t}
      data-last-block={lastBlock?.t}
      style={
        data
          ? { contentVisibility: "auto", containIntrinsicSize: `auto ${chunk.est}px` }
          : { minHeight: chunk.est }
      }
    >
      <style>{`
        [data-block="h"] + [data-block="h"] > .manual-heading,
        [data-last-block="h"] + [data-chunk] > div:first-child[data-block="h"] > .manual-heading,
        div[data-chunk]:has(> div:last-child[data-block="h"]) + div[data-chunk] > div:first-child[data-block="h"] > .manual-heading {
          margin-top: 0.75rem !important;
          padding-top: 0 !important;
          border-top-width: 0 !important;
        }
        [data-block="h"] + [data-block="h"] > .manual-heading > .manual-heading-rule,
        [data-last-block="h"] + [data-chunk] > div:first-child[data-block="h"] > .manual-heading > .manual-heading-rule,
        div[data-chunk]:has(> div:last-child[data-block="h"]) + div[data-chunk] > div:first-child[data-block="h"] > .manual-heading > .manual-heading-rule {
          display: none !important;
        }
      `}</style>
      {data ? (
        data.blocks.map((block, idx) => {
          const prev = data.blocks[idx - 1];
          const isPrevHeading = prev ? prev.t === "h" : (idx === 0 ? isChapterLeadSubsection : false);
          return (
            <div
              key={idx}
              id={blockDomId(chunk.id, block, idx)}
              data-a
              data-p={block.p}
              data-block={block.t}
            >
              <ManualBlock
                block={block}
                lang={lang}
                rules={rules}
                showPage={idx === 0 || prev?.p !== block.p}
                isPrevHeading={isPrevHeading}
                figureAlt={block.t === "img" ? (captionText(prev, lang) ?? captionText(data.blocks[idx + 1], lang)) : undefined}
                onNavigate={onNavigate}
              />
            </div>
          );
        })
      ) : state.status === "error" ? (
        <div
          role="alert"
          className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <span className="flex items-center gap-2 font-medium">
            <AlertCircle className="size-4 shrink-0" aria-hidden />
            {lang === "vi"
              ? `Phần ${chunk.num} - ${title}: ${ERROR_TEXT.vi[state.error ?? "network"]}`
              : `Section ${chunk.num} - ${title}: ${ERROR_TEXT.en[state.error ?? "network"]}`}
          </span>
          <button
            type="button"
            onClick={() => void requestChunk(chunk.id, true)}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-destructive px-4 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
          >
            <RefreshCw className="size-4" aria-hidden />
            {lang === "vi" ? "Thử lại" : "Retry"}
          </button>
        </div>
      ) : (
        <div
          role={state.status === "loading" ? "status" : undefined}
          className="flex h-full min-h-40 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-10 text-center text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-2 font-medium text-foreground/80">
            {state.status === "loading" ? <Loader2 className="size-4 motion-safe:animate-spin" aria-hidden /> : null}
            {`${chunk.num} ${title}`}
          </span>
          <span className="font-mono text-xs">
            {state.status === "loading" ? (lang === "vi" ? "Đang tải dữ liệu · " : "Loading data · ") : ""}
            {lang === "vi" ? "trang" : "page"} {chunk.p0}
            {chunk.p1 > chunk.p0 ? `–${chunk.p1}` : ""}
          </span>
        </div>
      )}
    </div>
  );
});
