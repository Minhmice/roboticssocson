"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Heart, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { formatCount } from "@/lib/resources/format";
import { recordView, statOf, toggleLike, useResourceStats } from "@/lib/resources/stats-client";
import { cn } from "@/lib/utils";

/** Views, likes and comments for one thread. Reserves its width until counts arrive. */
export function StatLine({ k, locale, className }: { k: string; locale: Locale; className?: string }) {
  const snap = useResourceStats();
  const s = statOf(snap, k);
  const vi = locale === "vi";
  const item = "inline-flex items-center gap-1.5 tabular-nums";
  if (!snap.ready) return <span aria-hidden className={cn("inline-block h-4 w-28 animate-pulse rounded bg-secondary motion-reduce:animate-none", className)} />;
  if (snap.failed) return null;
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-4 gap-y-1", className)}>
      <span className={item} title={vi ? "Lượt xem" : "Views"}><Eye aria-hidden className="size-4" /><span className="sr-only">{vi ? "Lượt xem" : "Views"}</span>{formatCount(s.v, locale)}</span>
      <span className={item} title={vi ? "Lượt thích" : "Likes"}><Heart aria-hidden className="size-4" /><span className="sr-only">{vi ? "Lượt thích" : "Likes"}</span>{formatCount(s.l, locale)}</span>
      <span className={item} title={vi ? "Bình luận" : "Comments"}><MessageCircle aria-hidden className="size-4" /><span className="sr-only">{vi ? "Bình luận" : "Comments"}</span>{formatCount(s.c, locale)}</span>
    </span>
  );
}
export function LikeButton({ k, locale, className }: { k: string; locale: Locale; className?: string }) {
  const snap = useResourceStats();
  const [popped, setPopped] = useState(false);
  const liked = snap.liked.has(k);
  const vi = locale === "vi";
  return (
    <button
      type="button"
      aria-pressed={liked}
      disabled={!snap.ready || snap.failed}
      onClick={() => {
        setPopped(!liked);
        void toggleLike(k);
      }}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-60",
        liked ? "border-primary bg-accent text-primary" : "border-border bg-card hover:border-primary/40",
        className,
      )}
    >
      <Heart aria-hidden className={cn("size-4", liked && "fill-current", popped && liked && "like-pop")} />
      <span>{liked ? (vi ? "Đã thích" : "Liked") : vi ? "Thích bài này" : "Like this"}</span>
      <span className="tabular-nums text-muted-foreground">{formatCount(statOf(snap, k).l, locale)}</span>
    </button>
  );
}

/** Counts one view when the page opens. */
export function ViewTracker({ k }: { k: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    void recordView(k);
  }, [k]);
  return null;
}
