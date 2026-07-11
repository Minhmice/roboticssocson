"use client";

import { FormEvent, useState } from "react";
import { Lock, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

type DeckLoginProps = {
  onSuccess: () => void;
};

export function DeckLogin({ onSuccess }: DeckLoginProps) {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/deck/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError(t("deck.login.wrongPassword"));
        return;
      }

      onSuccess();
    } catch {
      setError(t("deck.login.networkError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate flex min-h-dvh items-center justify-center bg-background px-4">
      <div
        className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
              <Presentation className="size-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-balance text-xl font-bold tracking-tight text-foreground">
                {t("deck.login.title")}
              </h1>
              <p className="mt-0.5 text-pretty text-sm text-foreground/80 md:text-base">
                {t("deck.login.subtitle")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="deck-password"
                className="mb-2 block text-sm font-medium text-foreground md:text-base"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="size-3.5" aria-hidden />
                  {t("deck.login.passwordLabel")}
                </span>
              </label>
              <Input
                id="deck-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t("deck.login.passwordPlaceholder")}
                className="h-11 text-base"
                required
              />
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive md:text-base"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl text-base"
            >
              {loading ? t("deck.login.submitting") : t("deck.login.submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
