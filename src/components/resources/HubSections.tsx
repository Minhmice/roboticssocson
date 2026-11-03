"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CoverImage } from "./CoverImage";
import { ArrowUpRight, Check, Eye, RotateCcw, Search as SearchIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { fallbackCover } from "@/lib/resources/covers";
import { localizedHref } from "@/lib/i18n/routes";
import { fold } from "@/lib/resources/search";
import { formatCount } from "@/lib/resources/format";
import { CHECKLIST_KEY, READ_KEY, clearLocalSet, setLocalMember, useLocalSet } from "@/lib/resources/local-set";
import { statOf, useResourceStats } from "@/lib/resources/stats-client";
import type { ArticleLite } from "@/lib/resources/lite";
import { StatLine } from "./ResourceStats";
import { cn } from "@/lib/utils";

const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
export type PathLite = { id: string; title: string; blurb: string; articles: ArticleLite[] };
export type ChecklistLite = { id: string; group: string; text: string };
export type TermLite = { term: string; definition: string };
export function TrendingRail({ articles, locale }: { articles: ArticleLite[]; locale: Locale }) {
  const snap = useResourceStats();
  const ranked = useMemo(() => (snap.failed ? articles : [...articles].sort((a, b) => statOf(snap, b.key).v - statOf(snap, a.key).v || a.title.localeCompare(b.title))).slice(0, 6), [articles, snap]);
  if (!snap.ready) return <div aria-hidden className="mt-5 grid gap-x-10 sm:grid-cols-2">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="h-[4.5rem] border-t border-border"><div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-secondary motion-reduce:animate-none" /></div>)}</div>;
  const vi = locale === "vi";
  return (
    <ol className="mt-5 grid gap-x-10 sm:grid-cols-2">
      {ranked.map((a, i) => (
        <li key={a.key} className="border-t border-border">
          <Link href={localizedHref(a.href, locale)} className={cn("group flex min-h-11 items-start gap-4 rounded-md py-4", RING)}>
            <span aria-hidden className="w-7 shrink-0 pt-0.5 text-2xl font-bold tabular-nums text-primary">{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold leading-snug group-hover:text-primary">{a.title}</span>
              <span className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                <span>{a.category}</span>
                {snap.ready && !snap.failed && <span className="inline-flex items-center gap-1 tabular-nums"><Eye aria-hidden className="size-3.5" />{formatCount(statOf(snap, a.key).v, locale)} {vi ? "lượt xem" : "views"}</span>}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Learning paths with per-device progress. */
export function LearningPaths({ paths, locale }: { paths: PathLite[]; locale: Locale }) {
  const read = useLocalSet(READ_KEY);
  const vi = locale === "vi";
  const [active, setActive] = useState(paths[0]?.id ?? "");
  const path = paths.find((p) => p.id === active) ?? paths[0];
  if (!path) return null;
  const done = path.articles.filter((a) => read.has(a.key)).length;
  const next = path.articles.find((a) => !read.has(a.key));
  return (
    <div className="mt-5 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div role="tablist" aria-label={vi ? "Lộ trình học" : "Learning paths"} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {paths.map((p) => {
          const count = p.articles.filter((a) => read.has(a.key)).length;
          const on = p.id === path.id;
          return (
            <button
              key={p.id}
              role="tab"
              type="button"
              id={`path-tab-${p.id}`}
              aria-selected={on}
              aria-controls="path-panel"
              onClick={() => setActive(p.id)}
              className={cn("flex min-h-11 shrink-0 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-150", RING, on ? "border-primary bg-accent text-primary" : "border-border bg-card hover:border-primary/40")}
            >
              <span>{p.title}</span>
              <span className="tabular-nums text-xs font-medium text-muted-foreground">{count}/{p.articles.length}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id="path-panel" aria-labelledby={`path-tab-${path.id}`}>
        <p className="max-w-[60ch] leading-relaxed">{path.blurb}</p>
        <div className="mt-4 flex items-center gap-3" aria-label={vi ? `Đã đọc ${done} trên ${path.articles.length}` : `${done} of ${path.articles.length} read`}>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full w-full origin-left rounded-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transform: `scaleX(${done / path.articles.length})` }} /></div>
          <span className="text-sm tabular-nums text-muted-foreground">{done}/{path.articles.length}</span>
        </div>
        <ol className="mt-5 divide-y divide-border border-y border-border">
          {path.articles.map((a, i) => {
            const isRead = read.has(a.key);
            return (
              <li key={a.key}>
                <Link href={localizedHref(a.href, locale)} className={cn("group flex min-h-11 items-center gap-4 rounded-md py-3.5", RING)}>
                  <span aria-hidden className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums", isRead ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{isRead ? <Check className="size-3.5" /> : i + 1}</span>
                  <span className="min-w-0 flex-1 font-medium leading-snug group-hover:text-primary">{a.title}</span>
                  {isRead && <span className="text-xs text-muted-foreground">{vi ? "Đã đọc" : "Read"}</span>}
                  {a === next && !isRead && done > 0 && <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary">{vi ? "Đọc tiếp" : "Up next"}</span>}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

type Sort = "new" | "views" | "likes";

/** Filterable, sortable library of every guide with live counters. */
export function ArticleLibrary({ articles, categories, locale }: { articles: ArticleLite[]; categories: { id: string; title: string }[]; locale: Locale }) {
  const snap = useResourceStats();
  const read = useLocalSet(READ_KEY);
  const vi = locale === "vi";
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<Sort>("new");
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const tags = useMemo(() => {
    const count = new Map<string, number>();
    for (const a of articles) for (const t of a.tags) count.set(t, (count.get(t) ?? 0) + 1);
    return [...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 14).map(([t]) => t);
  }, [articles]);

  const shown = useMemo(() => {
    const needle = fold(q.trim());
    const list = articles.filter((a) => (cat === "all" || a.categoryId === cat) && (!tag || a.tags.includes(tag)) && (!needle || fold(`${a.title} ${a.summary} ${a.tags.join(" ")}`).includes(needle)));
    if (sort === "views") list.sort((a, b) => statOf(snap, b.key).v - statOf(snap, a.key).v);
    if (sort === "likes") list.sort((a, b) => statOf(snap, b.key).l - statOf(snap, a.key).l);
    return list;
  }, [articles, cat, tag, q, sort, snap]);

  const chip = (on: boolean) => cn("inline-flex min-h-11 items-center rounded-full border px-3.5 text-sm font-medium transition-colors duration-150", RING, on ? "border-primary bg-accent text-primary" : "border-border bg-card hover:border-primary/40");
  const sorts: [Sort, string][] = [["new", vi ? "Mặc định" : "Default"], ["views", vi ? "Xem nhiều" : "Most viewed"], ["likes", vi ? "Thích nhiều" : "Most liked"]];

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">{vi ? "Lọc bài theo từ khóa" : "Filter guides by keyword"}</span>
          <SearchIcon aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={vi ? "Lọc theo từ khóa, ví dụ: servo" : "Filter by keyword, e.g. servo"} className="min-h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-base placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-sm" />
        </label>
        <div className="flex gap-1 rounded-xl border border-border bg-muted p-1" role="group" aria-label={vi ? "Sắp xếp" : "Sort"}>
          {sorts.map(([id, label]) => <button key={id} type="button" aria-pressed={sort === id} onClick={() => setSort(id)} className={cn("min-h-9 rounded-lg px-3 text-sm font-medium transition-colors duration-150", RING, sort === id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>{label}</button>)}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={vi ? "Chuyên mục" : "Category"}>
        <button type="button" aria-pressed={cat === "all"} onClick={() => setCat("all")} className={chip(cat === "all")}>{vi ? "Tất cả" : "All"}</button>
        {categories.map((c) => <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={chip(cat === c.id)}>{c.title}</button>)}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm" role="group" aria-label="Tags">
        {tags.map((t) => <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)} className={cn("min-h-9 rounded-sm underline-offset-4", RING, tag === t ? "font-semibold text-primary underline" : "text-muted-foreground hover:text-foreground hover:underline")}>#{t}</button>)}
      </div>

      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">{vi ? `${shown.length} bài` : `${shown.length} guides`}</p>
      {shown.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="font-semibold">{vi ? "Không có bài khớp bộ lọc" : "No guides match these filters"}</p>
          <button type="button" onClick={() => { setCat("all"); setTag(null); setQ(""); }} className={cn("mt-3 inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-primary underline-offset-4 hover:underline", RING)}>{vi ? "Xóa bộ lọc" : "Clear filters"}</button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => {
            const cover = fallbackCover(a.categoryId);
            const isRead = read.has(a.key);
            return (
              <li key={a.key}>
                <Link
                  href={localizedHref(a.href, locale)}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md",
                    RING,
                  )}
                >
                  <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
                    <CoverImage src={a.cover} fallback={cover} alt={a.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md bg-background/90 px-2 py-0.5 text-xs font-semibold text-foreground backdrop-blur-xs">
                        {a.category}
                      </span>
                      {isRead && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-primary/90 px-2 py-0.5 text-xs font-semibold text-primary-foreground backdrop-blur-xs">
                          <Check aria-hidden className="size-3" />
                          {vi ? "Đã đọc" : "Read"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {a.summary}
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60 text-xs text-muted-foreground">
                      <StatLine k={a.key} locale={locale} />
                      <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                        {vi ? "Đọc bài" : "Read"}
                        <ArrowUpRight aria-hidden className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Pre-match checklist, persisted on this device. */
export function PrematchChecklist({ items, locale }: { items: ChecklistLite[]; locale: Locale }) {
  const checked = useLocalSet(CHECKLIST_KEY);
  const vi = locale === "vi";
  const done = items.filter((i) => checked.has(i.id)).length;
  const groups = [...new Set(items.map((i) => i.group))];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-1.5 min-w-32 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full w-full origin-left rounded-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transform: `scaleX(${done / items.length})` }} /></div>
        <span className="text-sm font-medium tabular-nums" aria-live="polite">{done === items.length ? (vi ? "Sẵn sàng vào trận" : "Ready to play") : `${done}/${items.length}`}</span>
        {done > 0 && <button type="button" onClick={() => clearLocalSet(CHECKLIST_KEY)} className={cn("inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-semibold text-primary", RING)}><RotateCcw aria-hidden className="size-3.5" />{vi ? "Làm lại" : "Reset"}</button>}
      </div>
      <div className="mt-4 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {groups.map((g) => (
          <fieldset key={g}>
            <legend className="mb-1 text-sm font-semibold">{g}</legend>
            {items.filter((i) => i.group === g).map((i) => (
              <label key={i.id} className="flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm leading-snug">
                <input type="checkbox" checked={checked.has(i.id)} onChange={(e) => setLocalMember(CHECKLIST_KEY, i.id, e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />
                <span className={cn(checked.has(i.id) && "text-muted-foreground line-through")}>{i.text}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
    </div>
  );
}

/** Searchable glossary with letter jump. */
export function Glossary({ terms, locale }: { terms: TermLite[]; locale: Locale }) {
  const vi = locale === "vi";
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const needle = fold(q.trim());
    return terms.filter((t) => !needle || fold(`${t.term} ${t.definition}`).includes(needle));
  }, [terms, q]);
  return (
    <div>
      <label className="relative block max-w-md">
        <span className="sr-only">{vi ? "Tìm thuật ngữ" : "Search terms"}</span>
        <SearchIcon aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={vi ? "Tìm thuật ngữ, ví dụ: PID" : "Search a term, e.g. PID"} className="min-h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-base placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-sm" />
      </label>
      {list.length === 0 ? (
        <p className="mt-4 text-sm">{vi ? "Chưa có thuật ngữ này. Hỏi trong mục Hỏi đáp để đội bổ sung." : "That term is not here yet. Ask in Q&A and the team will add it."}</p>
      ) : (
        <dl className="mt-4 grid gap-x-10 sm:grid-cols-2">
          {list.map((t) => (
            <div key={t.term} className="border-t border-border py-3.5">
              <dt className="font-semibold">{t.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed">{t.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
