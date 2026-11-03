"use client";

import React, { useDeferredValue, useId, useMemo, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ensureSearchData, search, snippet, useSearchData, type Hit } from "@/lib/manual/search";
import { BLUR, CSS_EASE, DUR, EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/manual/motion";
interface ManualSearchProps {
  lang: "vi" | "en";
  /** Called with the DOM anchor of the picked result (rule id, heading id or `<chunk>.<index>`). */
  onPick: (anchor: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** Result list renders inline (sidebar / drawer) so keyboard focus order stays natural. */
  className?: string;
  autoFocus?: boolean;
}

const KIND_LABEL: Record<"vi" | "en", Record<"h" | "r" | "p", string>> = {
  vi: { h: "Mục", r: "Luật", p: "" },
  en: { h: "Section", r: "Rule", p: "" },
};

function Marked({ text, marks }: { text: string; marks: [number, number][] }) {
  const out: React.ReactNode[] = [];
  let at = 0;
  marks.forEach(([a, b], i) => {
    if (a > at) out.push(text.slice(at, a));
    out.push(
      <mark key={i} className="rounded-sm bg-primary/20 px-0.5 font-semibold text-foreground">
        {text.slice(a, b)}
      </mark>,
    );
    at = b;
  });
  if (at < text.length) out.push(text.slice(at));
  return <>{out}</>;
}

export function ManualSearch({ lang, onPick, inputRef, className, autoFocus }: ManualSearchProps) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const { status, data } = useSearchData();
  const listId = useId();
  const fallbackRef = useRef<HTMLInputElement>(null);
  const input = inputRef ?? fallbackRef;
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ for: readonly Hit[]; at: number }>({ for: [], at: 0 });

  const hits: Hit[] = useMemo(
    () => (data && deferred.trim() ? search(data, deferred, lang) : []),
    [data, deferred, lang],
  );

  // The highlighted row belongs to one result list; a new list starts again at the top (no effect needed).
  const active = cursor.for === hits ? cursor.at : 0;
  const setActive = (update: number | ((prev: number) => number)) =>
    setCursor({ for: hits, at: typeof update === "function" ? update(active) : update });

  const trimmed = deferred.trim();

  type StatusKind = "idle" | "loading" | "error" | "no-results";
  let statusKind: StatusKind = "idle";
  if (status === "error") {
    statusKind = "error";
  } else if (trimmed && status === "loading") {
    statusKind = "loading";
  } else if (trimmed && status === "ready" && hits.length === 0) {
    statusKind = "no-results";
  }

  // Set of hit ids for entrance animation. Does not re-trigger when query changes without changing results.
  const hitIds = useMemo(
    () => (hits.length > 0 ? hits.map((h) => `${h.item.anchor}:${h.field}`).join(",") : ""),
    [hits],
  );

  useGSAP(
    () => {
      if (!listRef.current || hits.length === 0) return;
      const items = listRef.current.querySelectorAll<HTMLLIElement>(":scope > li");
      if (!items.length) return;

      const toAnimate = Array.from(items).slice(0, 8);
      const rest = Array.from(items).slice(8);

      if (rest.length > 0) {
        gsap.set(rest, { opacity: 1, y: 0, filter: "none", clearProps: "all" });
      }

      if (prefersReducedMotion()) {
        gsap.fromTo(
          toAnimate,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DUR.ui,
            ease: EASE.out,
            stagger: 0.03,
            clearProps: "opacity",
          },
        );
      } else {
        gsap.fromTo(
          toAnimate,
          {
            opacity: 0,
            y: 6,
            filter: `blur(${BLUR.soft}px)`,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: DUR.ui,
            ease: EASE.out,
            stagger: 0.03,
            clearProps: "opacity,transform,filter",
          },
        );
      }
    },
    { scope: rootRef, dependencies: [hitIds] },
  );

  useGSAP(
    () => {
      if (!statusRef.current || statusKind === "idle") return;
      if (prefersReducedMotion()) {
        gsap.fromTo(
          statusRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.16,
            ease: EASE.out,
            clearProps: "opacity",
          },
        );
      } else {
        gsap.fromTo(
          statusRef.current,
          {
            opacity: 0,
            filter: `blur(${BLUR.soft}px)`,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.16,
            ease: EASE.out,
            clearProps: "opacity,filter",
          },
        );
      }
    },
    { scope: rootRef, dependencies: [statusKind] },
  );

  return (
    <div ref={rootRef} className={className}>
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={input}
          type="search"
          value={query}
          autoFocus={autoFocus}
          onFocus={ensureSearchData}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && hits.length) {
              e.preventDefault();
              setActive((i) => Math.min(hits.length - 1, i + 1));
            } else if (e.key === "ArrowUp" && hits.length) {
              e.preventDefault();
              setActive((i) => Math.max(0, i - 1));
            } else if (e.key === "Enter" && hits[active]) {
              e.preventDefault();
              onPick(hits[active].item.anchor);
            } else if (e.key === "Escape" && query) {
              e.preventDefault();
              e.stopPropagation();
              setQuery("");
            }
          }}
          role="combobox"
          aria-expanded={hits.length > 0}
          aria-controls={listId}
          aria-activedescendant={hits.length ? `${listId}-${active}` : undefined}
          aria-label={lang === "vi" ? "Tìm kiếm luật theo mã hoặc từ khóa" : "Search rules by code or keyword"}
          placeholder={lang === "vi" ? "Tìm mã luật (G205), từ khóa, thẻ vàng…" : "Search rule code (G205), keyword…"}
          className="min-h-11 w-full rounded-lg border border-border bg-card pl-9 pr-11 text-sm placeholder:text-muted-foreground [transition-property:border-color,box-shadow] [transition-duration:160ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/40 [&::-webkit-search-cancel-button]:hidden"
          style={{ transitionTimingFunction: CSS_EASE.out }}
        />
        {query ? (
          <button
            type="button"
            aria-label={lang === "vi" ? "Xóa nội dung tìm kiếm" : "Clear search"}
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
            className="absolute right-0 top-0 inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-safe:active:scale-[0.97] [transition-property:color,transform] [transition-duration:140ms]"
            style={{ transitionTimingFunction: CSS_EASE.out }}
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : null}
      </div>

      <div role="status" aria-live="polite" className="sr-only">
        {trimmed && status === "ready"
          ? hits.length
            ? lang === "vi"
              ? `Tìm thấy ${hits.length} kết quả`
              : `Found ${hits.length} results`
            : lang === "vi"
              ? "Không có kết quả phù hợp"
              : "No matching results"
          : ""}
      </div>

      {statusKind !== "idle" ? (
        <div ref={statusRef} className="mt-3 min-h-8 px-1">
          {statusKind === "loading" ? (
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 motion-safe:animate-spin" aria-hidden />
              {lang === "vi" ? "Đang tải dữ liệu tìm kiếm, vui lòng đợi…" : "Loading search data, please wait…"}
            </p>
          ) : statusKind === "error" ? (
            <p className="text-xs leading-relaxed text-muted-foreground" role="alert">
              {lang === "vi"
                ? "Không tải được dữ liệu tìm kiếm. Kiểm tra kết nối mạng rồi bấm Thử lại."
                : "Failed to load search data. Check your network connection and click Retry."}
              <button
                type="button"
                onClick={ensureSearchData}
                className="ml-1 font-semibold text-primary underline underline-offset-2"
              >
                {lang === "vi" ? "Thử lại" : "Retry"}
              </button>
            </p>
          ) : statusKind === "no-results" ? (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {lang === "vi"
                ? `Không tìm thấy kết quả cho “${trimmed}”. Thử đổi từ khóa, bớt từ hoặc gõ không dấu.`
                : `No results found for “${trimmed}”. Try different keywords or fewer terms.`}
            </p>
          ) : null}
        </div>
      ) : null}

      {hits.length > 0 ? (
        <ul ref={listRef} id={listId} role="listbox" aria-label={lang === "vi" ? "Kết quả tìm kiếm" : "Search results"} className="mt-3 space-y-1">
          {hits.map((hit, i) => {
            const text = hit.item[hit.field];
            const sn = snippet(text, hit.ranges);
            const where = data?.heads[hit.item.head] ?? "";
            return (
              <li
                key={`${hit.item.anchor}-${i}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => onPick(hit.item.anchor)}
                  className={cn(
                    "block min-h-11 w-full rounded-lg border px-3 py-2 text-left motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    i === active ? "border-primary/40 bg-primary/10" : "border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted/60",
                  )}
                >
                  <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-primary">
                    {hit.item.kind !== "p" ? <span>{KIND_LABEL[lang][hit.item.kind]}</span> : null}
                    {hit.field !== lang ? <span className="rounded bg-muted px-1 text-muted-foreground">{hit.field}</span> : null}
                  </span>
                  <span className="mt-0.5 line-clamp-3 block text-[0.8125rem] leading-snug text-foreground">
                    <Marked text={sn.text} marks={sn.marks} />
                  </span>
                  {where ? <span className="mt-1 line-clamp-1 block text-[0.6875rem] text-muted-foreground">{where}</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
