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
  const immersive =
    pathname === "/contact-us" ||
    pathname === "/analytics" ||
    pathname?.startsWith("/course-register-form") === true ||
    deckPresentation;
  const hideFooter =
    pathname === "/analytics" || deckPresentation;
  const hideNavbar = deckPresentation;

  return (
    <BootRevealProvider>
      <BootLoader />
      <BootAwareMain>
        {!hideNavbar ? <Navbar /> : null}
        <main
          className={cn(
            "relative overflow-x-clip",
            deckPresentation && "fixed inset-0 z-50 h-dvh overflow-hidden pt-0",
            !deckPresentation && immersive && "pt-0",
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
