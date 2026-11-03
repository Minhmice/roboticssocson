"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { timeAgo } from "@/lib/resources/format";
import { setCommentCount } from "@/lib/resources/stats-client";
import type { CommentRow } from "@/lib/resources/db";

const FIELD = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-sm";

export function Comments({ thread, locale, answers = false }: { thread: string; locale: Locale; answers?: boolean }) {
  const id = useId();
  const vi = locale === "vi";
  const [items, setItems] = useState<CommentRow[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // ponytail: ignore flag, not AbortController - see Community.tsx; cost is one wasted GET on unmount.
    let ignore = false;
    fetch(`/api/resources/comments?thread=${encodeURIComponent(thread)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { comments: CommentRow[] }) => {
        if (ignore) return;
        setItems(d.comments);
        setCommentCount(thread, d.comments.length);
      })
      .catch(() => { if (!ignore) setLoadError(true); });
    return () => { ignore = true; };
  }, [thread]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/resources/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ thread, author, body }) });
      if (res.status === 429) throw new Error(vi ? "Bạn gửi quá nhanh. Thử lại sau một phút." : "You are posting too fast. Try again in a minute.");
      if (!res.ok) throw new Error(vi ? "Tên cần 2-40 ký tự và nội dung 2-1000 ký tự." : "Name needs 2-40 characters and the message 2-1000.");
      const d: { comment: CommentRow } = await res.json();
      const next = [...(items ?? []), d.comment];
      setItems(next);
      setCommentCount(thread, next.length);
      setBody("");
    } catch (e) {
      setError(e instanceof Error ? e.message : vi ? "Không gửi được. Kiểm tra mạng rồi thử lại." : "Could not send. Check your connection and retry.");
    } finally {
      setBusy(false);
    }
  }

  const heading = answers ? (vi ? "Trả lời" : "Answers") : vi ? "Bình luận" : "Comments";
  return (
    <section aria-labelledby={`${id}-h`} className="mt-12 border-t border-border pt-8">
      <h2 id={`${id}-h`} className="text-xl font-semibold">
        {heading}
        {items && <span className="ml-2 text-base font-normal tabular-nums text-muted-foreground">{items.length}</span>}
      </h2>

      <div aria-live="polite" className="mt-4">
        {loadError && <p role="alert" className="rounded-lg border border-border bg-muted p-4 text-sm">{vi ? "Không tải được bình luận. Tải lại trang để thử lại." : "Could not load the thread. Reload the page to retry."}</p>}
        {!items && !loadError && <div aria-hidden className="space-y-3">{[0, 1].map((i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-secondary motion-reduce:animate-none" />)}</div>}
        {items && items.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-5 text-sm leading-relaxed">
            {answers ? (vi ? "Chưa có ai trả lời. Nếu bạn biết câu trả lời, chia sẻ bên dưới." : "No answers yet. If you know this one, share it below.") : vi ? "Chưa có bình luận. Bạn đã thử làm theo bài này chưa? Kể kết quả bên dưới." : "No comments yet. Tried this one on your robot? Tell us how it went."}
          </p>
        )}
        {items && items.length > 0 && (
          <ul className="divide-y divide-border">
            {items.map((c) => (
              <li key={c.id} className="py-4">
                <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
                  <span className="font-semibold">{c.author}</span>
                  <time dateTime={new Date(c.createdAt).toISOString()} className="text-muted-foreground">{timeAgo(c.createdAt, locale)}</time>
                </div>
                <p className="mt-1.5 max-w-[70ch] whitespace-pre-wrap break-words leading-relaxed">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl border border-border bg-muted p-5 sm:p-6">
        <div>
          <label htmlFor={`${id}-a`} className="mb-1.5 block text-sm font-medium">{vi ? "Tên của bạn" : "Your name"}</label>
          <input id={`${id}-a`} value={author} onChange={(e) => setAuthor(e.target.value)} minLength={2} maxLength={40} required autoComplete="nickname" className={FIELD} />
        </div>
        <div>
          <label htmlFor={`${id}-b`} className="mb-1.5 block text-sm font-medium">{answers ? (vi ? "Câu trả lời" : "Your answer") : vi ? "Bình luận" : "Comment"}</label>
          <textarea id={`${id}-b`} value={body} onChange={(e) => setBody(e.target.value)} minLength={2} maxLength={1000} required rows={4} className={FIELD} />
          <p className="mt-1.5 text-xs text-muted-foreground tabular-nums">{body.length}/1000</p>
        </div>
        {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
        <div>
          <button type="submit" disabled={busy} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-60">
            {busy && <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />}
            {busy ? (vi ? "Đang gửi" : "Sending") : answers ? (vi ? "Gửi câu trả lời" : "Post answer") : vi ? "Gửi bình luận" : "Post comment"}
          </button>
          <p className="mt-3 max-w-[60ch] text-xs leading-relaxed text-muted-foreground">{vi ? "Không cần đăng nhập. Đừng nhập số điện thoại, địa chỉ hay thông tin cá nhân khác." : "No account needed. Do not post phone numbers, addresses or other personal details."}</p>
        </div>
      </form>
    </section>
  );
}
