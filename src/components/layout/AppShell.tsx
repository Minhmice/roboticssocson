"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  BootAwareMain,
  BootLoader,
} from "@/components/layout/BootLoader";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BootRevealProvider } from "@/contexts/BootRevealContext";
import { cn } from "@/lib/utils";

/** Full-bleed contact/register experiences — keep Navbar + Footer, drop main top pad. */

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const deckPresentation = pathname === "/course/arduino-mblock-deck";
  /** Carries its own exit affordance and owns the whole viewport. */
  const recruitmentFlow = pathname === "/recruitment";
  const immersive =
    pathname === "/contact-us" ||
    recruitmentFlow ||
    pathname === "/analytics" ||
    pathname?.startsWith("/course-register-form") === true ||
    deckPresentation;
  const hideFooter =
    pathname === "/analytics" || recruitmentFlow || deckPresentation;
  const hideNavbar = recruitmentFlow || deckPresentation;

  return (
    <BootRevealProvider>
      <BootLoader />
      <BootAwareMain>
        {!hideNavbar ? <Navbar /> : null}
        <main
          className={cn(
            "relative overflow-x-clip",
            deckPresentation && "fixed inset-0 z-50 h-dvh overflow-hidden pt-0",
            recruitmentFlow && "h-dvh min-h-0 overflow-hidden pt-0",
            !deckPresentation && !recruitmentFlow && immersive && "pt-0",
            !deckPresentation && !immersive && "pt-16",
          )}
        >
          {children}
        </main>
        {!hideFooter ? <Footer /> : null}
      </BootAwareMain>
    </BootRevealProvider>
  );
}
