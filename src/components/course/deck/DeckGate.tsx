"use client";

import { useEffect, useState } from "react";
import { DeckLogin } from "@/components/course/deck/DeckLogin";
import { DeckPlayer } from "@/components/course/deck/DeckPlayer";
import type { DeckSlide } from "@/data/arduinoMblockDeck";
import {
  useLanguage,
  VietnameseOnlyLanguageProvider,
} from "@/contexts/LanguageContext";

type DeckGateProps = {
  slides: DeckSlide[];
};

function DeckGateContent({ slides }: DeckGateProps) {
  const { t } = useLanguage();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12_000);

    fetch("/api/deck/session", { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((data: { authenticated: boolean }) => {
        if (cancelled) return;
        setAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => {
        if (cancelled) return;
        setAuthenticated(false);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (authenticated === null) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <p className="text-base text-foreground/80 md:text-lg">
          {t("deck.checkingSession")}
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return <DeckLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return <DeckPlayer slides={slides} />;
}

export function DeckGate({ slides }: DeckGateProps) {
  return (
    <VietnameseOnlyLanguageProvider>
      <DeckGateContent slides={slides} />
    </VietnameseOnlyLanguageProvider>
  );
}
