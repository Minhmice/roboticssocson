"use client";

import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AnalyticsLoginProps = {
  onSuccess: () => void;
};

export function AnalyticsLogin({ onSuccess }: AnalyticsLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/analytics/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Mật khẩu không đúng. Thử lại.");
        return;
      }

      onSuccess();
    } catch {
      setError("Không thể xác thực. Kiểm tra kết nối và thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-background px-4 pb-16 pt-16">
      <div
        className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-16 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
              <Lock className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground text-balance">
                Bảng phân tích nội bộ
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground text-pretty">
                Chỉ dành cho đội Robotics Sóc Sơn
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="analytics-password"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Mật khẩu truy cập
              </label>
              <Input
                id="analytics-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nhập mật khẩu"
                className="h-11"
                required
              />
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Đang xác thực…" : "Vào bảng phân tích"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
