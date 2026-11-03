"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation } from "framer-motion";
import {
  BootAwareMain,
  BootLoader,
} from "@/components/layout/BootLoader";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BootRevealProvider } from "@/contexts/BootRevealContext";
import { stripLocale } from "@/lib/i18n/routes";
import { cn } from "@/lib/utils";

/** Full-bleed contact/register experiences — keep Navbar + Footer, drop main top pad. */

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = stripLocale(usePathname());
  const deckPresentation = pathname === "/course/arduino-mblock-deck";
  const printView = pathname === "/profile/print";
  const immersive =
    pathname === "/contact-us" ||
    pathname === "/analytics" ||
    pathname?.startsWith("/course-register-form") === true ||
    deckPresentation ||
    printView;
  const hideFooter = pathname === "/analytics" || deckPresentation || printView;
  const hideNavbar = deckPresentation || printView;

  return (
    <LazyMotion features={domAnimation} strict>
      <BootRevealProvider>
        <BootLoader />
        <BootAwareMain>
          {!hideNavbar ? <Navbar /> : null}
          <main
            className={cn(
              "relative overflow-x-clip print:overflow-visible print:pt-0",
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
    </LazyMotion>
  );
}
