"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { categoryLabel, timeAgo } from "@/lib/resources/format";
import type { QuestionRow } from "@/lib/resources/db";
import { cn } from "@/lib/utils";

const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
const FIELD = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-sm";

export function QuestionList({ locale, limit = 5, category, refreshKey }: { locale: Locale; limit?: number; category?: string; refreshKey?: number }) {
  const vi = locale === "vi";
  const [rows, setRows] = useState<QuestionRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // ponytail: ignore flag, not AbortController - an aborted fetch rejected as an unhandled AbortError in dev; cost is one wasted GET on unmount.
    let ignore = false;
    const url = `/api/resources/questions?limit=${limit}${category ? `&category=${encodeURIComponent(category)}` : ""}`;
    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { questions: QuestionRow[] }) => { if (!ignore) setRows(d.questions); })
      .catch(() => { if (!ignore) setFailed(true); });
    return () => { ignore = true; };
  }, [limit, category, refreshKey]);

  if (failed) return <p role="alert" className="rounded-lg border border-border bg-muted p-4 text-sm">{vi ? "Không tải được câu hỏi. Tải lại trang để thử lại." : "Could not load questions. Reload to retry."}</p>;
  if (!rows) return <div aria-hidden className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-secondary motion-reduce:animate-none" />)}</div>;
  if (rows.length === 0)
    return (
      <div className="rounded-2xl border border-dashed border-border p-8">
        <p className="font-semibold">{vi ? "Chưa có câu hỏi nào" : "No questions yet"}</p>
        <p className="mt-1 max-w-[55ch] text-sm leading-relaxed">{vi ? "Bạn đang vướng chỗ nào khi chế tạo hoặc lập trình robot? Đặt câu hỏi đầu tiên, cả đội và các bạn khác sẽ cùng trả lời." : "Stuck on a build or a bug? Ask the first question and the team and other students will answer."}</p>
      </div>
    );
  return (
    <ul className="divide-y divide-border border-y border-border">
      {rows.map((q) => (
        <li key={q.id}>
          <Link href={localizedHref(`/resources/community/${q.id}`, locale)} className={cn("group flex min-h-11 items-start gap-4 rounded-md px-1 py-4 sm:px-3", RING)}>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold leading-snug group-hover:text-primary">{q.title}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                <span>{categoryLabel(q.categoryId, locale)}</span>
                <span>{q.author}</span>
                <time dateTime={new Date(q.createdAt).toISOString()}>{timeAgo(q.createdAt, locale)}</time>
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 pt-0.5 text-sm tabular-nums text-muted-foreground" title={vi ? "Câu trả lời" : "Answers"}>
              <MessageCircle aria-hidden className="size-4" />
              <span className="sr-only">{vi ? "Câu trả lời" : "Answers"}</span>
              {q.answers}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function AskForm({ locale, categories }: { locale: Locale; categories: { id: string; title: string }[] }) {
  const id = useId();
  const router = useRouter();
  const vi = locale === "vi";
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "other");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/resources/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ categoryId, author, title, body }) });
      if (res.status === 429) throw new Error(vi ? "Bạn đã đăng nhiều câu hỏi liên tiếp. Thử lại sau vài phút." : "You posted several questions in a row. Try again in a few minutes.");
      if (!res.ok) throw new Error(vi ? "Tên 2-40 ký tự, tiêu đề 8-140 ký tự, mô tả 10-2000 ký tự." : "Name 2-40 characters, title 8-140, details 10-2000.");
      const d: { question: QuestionRow } = await res.json();
      router.push(localizedHref(`/resources/community/${d.question.id}`, locale));
    } catch (e) {
      setError(e instanceof Error ? e.message : vi ? "Không gửi được. Kiểm tra mạng rồi thử lại." : "Could not send. Check your connection and retry.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-muted p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-n`} className="mb-1.5 block text-sm font-medium">{vi ? "Tên của bạn" : "Your name"}</label>
          <input id={`${id}-n`} value={author} onChange={(e) => setAuthor(e.target.value)} minLength={2} maxLength={40} required autoComplete="nickname" className={FIELD} />
        </div>
        <div>
          <label htmlFor={`${id}-c`} className="mb-1.5 block text-sm font-medium">{vi ? "Chủ đề" : "Topic"}</label>
          <select id={`${id}-c`} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={FIELD}>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-t`} className="mb-1.5 block text-sm font-medium">{vi ? "Câu hỏi" : "Question"}</label>
        <input id={`${id}-t`} value={title} onChange={(e) => setTitle(e.target.value)} minLength={8} maxLength={140} required placeholder={vi ? "Ví dụ: Servo rung khi nâng tay đòn, nên làm gì?" : "e.g. My servo jitters when lifting the arm. What should I check?"} className={FIELD} />
      </div>
      <div>
        <label htmlFor={`${id}-b`} className="mb-1.5 block text-sm font-medium">{vi ? "Mô tả chi tiết" : "Details"}</label>
        <textarea id={`${id}-b`} value={body} onChange={(e) => setBody(e.target.value)} minLength={10} maxLength={2000} required rows={6} placeholder={vi ? "Bạn đã thử gì? Linh kiện, đoạn code, thông số liên quan." : "What did you try? Parts, code and numbers help."} className={FIELD} />
        <p className="mt-1.5 text-xs tabular-nums text-muted-foreground">{body.length}/2000</p>
      </div>
      {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
      <div>
        <button type="submit" disabled={busy} className={cn("inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-150 hover:bg-primary/90 active:scale-[0.97] disabled:opacity-60", RING)}>
          {busy && <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />}
          {busy ? (vi ? "Đang gửi" : "Sending") : vi ? "Đăng câu hỏi" : "Post question"}
        </button>
        <p className="mt-3 max-w-[60ch] text-xs leading-relaxed text-muted-foreground">{vi ? "Không cần đăng nhập. Đừng nhập số điện thoại, địa chỉ hay thông tin cá nhân khác." : "No account needed. Do not post phone numbers, addresses or other personal details."}</p>
      </div>
    </form>
  );
}
