"use client";

import { useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { RESOURCE_CATEGORIES } from "@/data/resources";
import { isValidResourceSearchDocument, fold, searchResources, type ResourceSearchDocument } from "@/lib/resources/search";
import { localize } from "@/lib/i18n/localized";
function Highlight({ text, query }: { text: string; query: string }) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  const normalized = fold(text);
  const ranges: [number, number][] = [];
  for (const term of terms) {
    let offset = 0;
    while (offset < normalized.length) {
      const start = normalized.indexOf(term, offset);
      if (start < 0) break;
      ranges.push([start, start + term.length]);
      offset = start + term.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const previous = merged.at(-1);
    if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
    else merged.push([...range]);
  }
  let offset = 0;
  return <>{merged.map(([start, end]) => {
    const before = text.slice(offset, start);
    offset = end;
    return <span key={start}>{before}<mark className="bg-primary/15 text-foreground">{text.slice(start, end)}</mark></span>;
  })}{text.slice(offset)}</>;
}

export function ResourceSearch({ locale, defaultCategory = "all" }: { locale: Locale; defaultCategory?: string }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const loading = useRef(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [documents, setDocuments] = useState<readonly ResourceSearchDocument[] | null>(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const vi = locale === "vi";
  const hits = useMemo(() => documents ? searchResources(documents, query, category) : [], [documents, query, category]);
  const visible = open && query.trim().length > 0;

  async function load() {
    if (documents || loading.current) return;
    loading.current = true;
    setError(false);
    try {
      const response = await fetch(`/resources/search-index.${locale}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: unknown = await response.json();
      if (!Array.isArray(data) || !data.every(isValidResourceSearchDocument)) throw new Error("Invalid search index");
      setDocuments(data);
    } catch {
      setError(true);
    } finally {
      loading.current = false;
    }
  }

  return (
    <div className="relative w-full" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }} onKeyDown={(event) => {
      if (event.key === "Escape") { setOpen(false); input.current?.focus(); }
    }}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{vi ? "Tìm kiếm tài nguyên" : "Search resources"}</label>
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input ref={input} id={id} type="search" value={query} autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={visible} aria-controls={`${id}-results`} aria-activedescendant={visible && hits[active] ? `${id}-result-${active}` : undefined}
          onFocus={() => { setOpen(true); void load(); }}
          onChange={(event) => { setQuery(event.target.value); setActive(0); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && hits.length) { event.preventDefault(); setOpen(true); setActive((value) => Math.min(value + 1, hits.length - 1)); }
            if (event.key === "ArrowUp" && hits.length) { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); }
            if (event.key === "Enter" && visible && hits[active]) { event.preventDefault(); window.location.assign(localizedHref(hits[active].href, locale)); }
          }}
          placeholder={vi ? "Rules, Control Hub, động cơ, cảm biến…" : "Rules, Control Hub, motors, sensors…"}
          className="min-h-12 w-full rounded-lg border border-border bg-card py-3 pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden" />
        {query && <button type="button" aria-label={vi ? "Xóa tìm kiếm" : "Clear search"} onClick={() => { setQuery(""); input.current?.focus(); }} className="absolute right-1 top-1 inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X aria-hidden className="size-4" /></button>}
      </div>
      <div className="mt-3 space-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={vi ? "Lọc theo chuyên mục" : "Filter by category"}>
          <span className="mr-1 text-sm font-semibold">{vi ? "Tìm trong" : "Search in"}</span>
          {[
            { id: "all", label: vi ? "Tất cả" : "All" },
            ...RESOURCE_CATEGORIES.filter((item) => item.id !== "programming").map((item) => ({ id: item.id, label: localize(item.title, locale) })),
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              onClick={() => { setCategory(item.id); setActive(0); setOpen(true); }}
              className={`inline-flex min-h-11 items-center rounded-full border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${category === item.id ? "border-primary bg-accent text-accent-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{vi ? "Hỗ trợ từ khóa không dấu." : "Accent-insensitive search."}</p>
      </div>
      <p role="status" aria-live="polite" className="sr-only">{visible ? error ? (vi ? "Không tải được chỉ mục tìm kiếm." : "Search index could not load.") : documents ? (vi ? `${hits.length} kết quả` : `${hits.length} results`) : (vi ? "Đang tải chỉ mục." : "Loading search index.") : ""}</p>
      {visible && <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-xl border border-border bg-card p-3 shadow-lg">
        <div className="mb-2 flex items-center justify-between gap-3 border-b border-border pb-2">
          <p className="text-sm font-medium">{error ? (vi ? "Không tải được chỉ mục" : "Search unavailable") : documents ? (vi ? `${hits.length} kết quả` : `${hits.length} results`) : (vi ? "Đang tải chỉ mục…" : "Loading index…")}</p>
          <button type="button" onClick={() => setOpen(false)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={vi ? "Đóng kết quả" : "Close results"}><X aria-hidden className="size-4" /></button>
        </div>
        {error && <div className="px-2 py-3"><p className="text-sm">{vi ? "Kiểm tra kết nối mạng rồi thử lại." : "Check your connection and try again."}</p><button type="button" onClick={() => void load()} className="mt-2 min-h-11 rounded-md px-3 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Thử lại" : "Try again"}</button></div>}
        {documents && hits.length === 0 && <p className="px-2 py-4 text-sm">{vi ? `Không tìm thấy “${query}”. Thử bớt từ khóa.` : `No results for “${query}”. Try fewer words.`}</p>}
        <ul id={`${id}-results`} role="listbox" aria-label={vi ? "Kết quả tìm kiếm" : "Search results"} className="max-h-80 space-y-1 overflow-y-auto overscroll-contain">
          {hits.map((hit, index) => <li key={hit.id} id={`${id}-result-${index}`} role="option" aria-selected={index === active}>
            <Link href={localizedHref(hit.href, locale)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} className={`flex min-h-11 items-start gap-3 rounded-lg p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${index === active ? "bg-muted" : "hover:bg-muted/60"}`}>
              <div className="min-w-0 flex-1"><p className="text-xs text-muted-foreground">{hit.status === "soon" ? (vi ? "Đề cương · Đang cập nhật" : "Outline · Coming soon") : (vi ? "Đọc được ngay" : "Available now")}</p><p className="mt-1 font-semibold"><Highlight text={hit.title} query={query} /></p><p className="mt-1 text-sm leading-relaxed"><Highlight text={hit.snippet || hit.description} query={query} /></p></div><ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-primary" />
            </Link>
          </li>)}
        </ul>
      </div>}
    </div>
  );
}
