"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  clearBootPreloadGate,
  isBootLoaderDisabled,
} from "@/lib/boot-loader";

type BootRevealContextValue = {
  /** True when boot overlay is done and the page shell may fade in. */
  animationReady: boolean;
  beginBoot: () => void;
  endBoot: () => void;
};

const BootRevealContext = createContext<BootRevealContextValue | null>(null);

export function BootRevealProvider({ children }: { children: ReactNode }) {
  const disabled = isBootLoaderDisabled();
  const [animationReady, setAnimationReady] = useState(disabled);

  const beginBoot = useCallback(() => {
    if (disabled) return;
    setAnimationReady(false);
  }, [disabled]);

  const endBoot = useCallback(() => {
    if (disabled) return;
    setAnimationReady(true);
    clearBootPreloadGate();
  }, [disabled]);

  return (
    <BootRevealContext.Provider
      value={{ animationReady, beginBoot, endBoot }}
    >
      {children}
    </BootRevealContext.Provider>
  );
}

export function useBootAnimationReady(): boolean {
  const ctx = useContext(BootRevealContext);
  if (!ctx) {
    return isBootLoaderDisabled();
  }
  return ctx.animationReady;
}

export function useBootRevealActions(): Pick<
  BootRevealContextValue,
  "beginBoot" | "endBoot"
> {
  const ctx = useContext(BootRevealContext);
  if (!ctx) {
    return { beginBoot: () => {}, endBoot: () => {} };
  }
  return { beginBoot: ctx.beginBoot, endBoot: ctx.endBoot };
}
