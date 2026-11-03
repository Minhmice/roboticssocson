"use client";

import React, { memo } from "react";
import Image from "next/image";
import { Hash } from "lucide-react";
import type { ManualBlockData } from "@/types/manual";
import { cn } from "@/lib/utils";
import { CSS_EASE } from "@/lib/manual/motion";
import { CopyLink } from "./CopyLink";
import { RefText } from "./RefText";
import { RichText } from "./RichText";

interface ManualBlockProps {
  block: ManualBlockData;
  lang: "vi" | "en";
  /** Rule ids that exist in the manual: only these become links (avoids linking "R300" in prose that is not a rule). */
  rules: ReadonlySet<string>;
  /** Show "trang N" only when the PDF page changed since the previous block. */
  showPage: boolean;
  /** Immediately preceded by another heading (collapses gap and divider). */
  isPrevHeading?: boolean;
  /** Alt text for figures (nearest caption). */
  figureAlt?: string;
  onNavigate: (id: string) => void;
}


function PageTag({ page, lang = "vi", className }: { page: number; lang?: "vi" | "en"; className?: string }) {
  return <span className={cn("font-mono text-xs text-muted-foreground", className)}>{lang === "vi" ? `trang ${page}` : `page ${page}`}</span>;
}


const BODY = "max-w-[75ch] text-base leading-relaxed text-foreground";

export const ManualBlock: React.FC<ManualBlockProps> = memo(function ManualBlock({
  block,
  lang,
  rules,
  showPage,
  isPrevHeading,
  figureAlt,
  onNavigate,
}) {
  switch (block.t) {
    case "h": {
      const title = lang === "vi" && block.vi ? block.vi : block.en;
      // page title is the only <h1>; manual chapters start at <h2>
      const Tag = block.lvl === 1 ? "h2" : block.lvl === 2 ? "h3" : "h4";
      const hasRule = !isPrevHeading && (block.lvl === 1 || block.lvl === 2);
      return (
        <div
          data-block="h"
          data-lvl={block.lvl}
          className={cn(
            "manual-heading group relative",
            block.lvl === 1 && "mb-3 mt-10 border-t-2 border-transparent pt-5",
            block.lvl === 2 && "mb-2.5 mt-7 border-t border-transparent pt-3",
            block.lvl >= 3 && "mb-2 mt-5",
            isPrevHeading && "mt-3 border-t-0 pt-0",
          )}
        >
          {hasRule ? (
            <span
              aria-hidden="true"
              className={cn(
                "manual-heading-rule pointer-events-none absolute inset-x-0 block origin-left",
                block.lvl === 1 ? "-top-[2px] h-0.5 bg-primary/30" : "-top-px h-px bg-border",
              )}
            />
          ) : null}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="self-center rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
              {block.num}
            </span>
            <Tag
              className={cn(
                "font-bold tracking-tight text-foreground",
                block.lvl === 1 && "text-2xl text-primary md:text-3xl",
                block.lvl === 2 && "text-xl md:text-2xl",
                block.lvl >= 3 && "text-lg",
              )}
            >
              {title}
            </Tag>
            <a
              href={`#${block.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(block.id);
              }}
              aria-label={lang === "vi" ? `Liên kết tới mục ${block.num}` : `Link to section ${block.num}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center -my-2.5 rounded-md text-muted-foreground opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-60"
            >
              <Hash className="size-4" aria-hidden />
            </a>
            {showPage ? <PageTag page={block.p} lang={lang} className="ml-auto shrink-0 self-baseline" /> : null}
          </div>
        </div>
      );
    }

    case "rule": {
      const raw = lang === "vi" && block.vi ? block.vi : block.en;
      // a leading "*" marks an Evergreen rule (stable across seasons) - show it as a labelled mark, not a stray glyph
      const evergreen = raw.trimStart().startsWith("*");
      const text = evergreen ? raw.trimStart().slice(1).trimStart() : raw;
      return (
        <div
          data-block="rule"
          className="group my-3 w-full rounded-xl border border-primary/20 bg-card/60 px-4 py-3.5 shadow-xs [transition-property:border-color,box-shadow] [transition-duration:200ms] [@media(hover:hover)_and_(pointer:fine)]:hover:border-primary/40 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_4px_14px_rgba(37,99,235,0.1)]"
          style={{ transitionTimingFunction: CSS_EASE.out }}
        >
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-primary-foreground">
                {block.id}
              </span>
              {evergreen ? (
                <span
                  title={
                    lang === "vi"
                      ? "Luật bất biến (Evergreen): giữ nguyên qua các mùa giải, chỉ đổi chi tiết"
                      : "Evergreen rule: preserved across seasons, minor details updated"
                  }
                  className="rounded-full border border-emerald-600/30 bg-emerald-600/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-800"
                >
                  {lang === "vi" ? "Bất biến" : "Evergreen"}
                </span>
              ) : null}
              {showPage ? <PageTag page={block.p} lang={lang} /> : null}
            </div>
            <CopyLink
              id={block.id}
              label={lang === "vi" ? `luật ${block.id}` : `rule ${block.id}`}
              lang={lang}
              className="opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
            />
          </div>
          <div className="max-w-[75ch] text-base leading-relaxed text-foreground">
            <RichText text={text} rules={rules} lang={lang} onNavigate={onNavigate} />
          </div>
        </div>
      );
    }

    case "p": {
      const text = lang === "vi" && block.vi ? block.vi : block.en;
      const callout = /^(Violation|Vi phạm)\s*:/i.test(text);
      return (
        <div
          data-block="p"
          className={cn(
            "my-2",
            BODY,
            block.ind === 1 && "border-l-2 border-border pl-3.5",
            block.ind === 2 && "ml-4 border-l-2 border-primary/30 pl-3.5",
            callout && "my-3 rounded-r-md border-l-4 border-amber-500 bg-amber-500/10 p-3 font-medium text-amber-950",
          )}
        >
          <RichText text={text} rules={rules} lang={lang} onNavigate={onNavigate} />
        </div>
      );
    }

    case "ul": {
      return (
        <ul data-block="ul" className="my-2.5 max-w-[75ch] space-y-1 pl-1">
          {block.items.map((item, idx) => {
            const text = lang === "vi" && item.vi ? item.vi : item.en;
            return (
              <li
                key={idx}
                className={cn(
                  "flex items-start gap-2.5 text-base leading-relaxed text-foreground",
                  item.ind === 1 && "pl-4",
                  item.ind === 2 && "pl-8",
                )}
              >
                <span aria-hidden className="flex h-[1lh] shrink-0 items-center justify-center">
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>
                <span className="flex-1">
                  <RefText text={text} rules={rules} lang={lang} onNavigate={onNavigate} />
                </span>
              </li>
            );
          })}
        </ul>
      );
    }

    case "table": {
      const rows = lang === "vi" && block.rows_vi?.length ? block.rows_vi : block.rows;
      if (rows.length === 0) return null;
      const [head, ...body] = rows;
      return (
        <div data-block="table" className="my-4 overflow-hidden rounded-xl border border-border bg-card shadow-xs">
          {/* tabIndex: keyboard users need to focus the scroll area to pan wide tables */}
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={lang === "vi" ? `Bảng, trang ${block.p}` : `Table, page ${block.p}`}>
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/70">
                  {head.map((cell, c) => (
                    <th key={c} scope="col" className="px-3.5 py-2.5 font-semibold text-foreground">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {body.map((row, r) => (
                  <tr key={r} className="transition-colors even:bg-muted/30 hover:bg-muted/50">
                    {row.map((cell, c) => (
                      <td key={c} className="px-3.5 py-2.5 align-top leading-relaxed text-foreground">
                        <RefText text={cell} rules={rules} lang={lang} onNavigate={onNavigate} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case "img": {
      return (
        <figure data-block="img" className="my-5 flex flex-col items-center">
          <div className="relative max-w-full overflow-hidden rounded-xl border border-border bg-card p-2 shadow-xs">
            <Image
              src={block.src}
              alt={
                figureAlt ??
                (block.kind === "math"
                  ? lang === "vi"
                    ? `Công thức, trang ${block.p}`
                    : `Formula, page ${block.p}`
                  : lang === "vi"
                    ? `Hình minh họa, trang ${block.p}`
                    : `Illustration, page ${block.p}`)
              }
              width={block.w}
              height={block.h}
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="h-auto max-h-[34.5rem] w-auto rounded-lg object-contain"
              loading="lazy"
            />
          </div>
        </figure>
      );
    }

    case "cap": {
      const text = lang === "vi" && block.vi ? block.vi : block.en;
      return <p data-block="cap" className="mx-auto my-2 max-w-[75ch] text-center text-sm font-medium italic text-muted-foreground">{text}</p>;
    }
  }
});
