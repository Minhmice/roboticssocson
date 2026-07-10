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
  const immersive =
    pathname === "/contact-us" ||
    pathname === "/analytics" ||
    pathname?.startsWith("/course-register-form") === true ||
    pathname === "/course/arduino-mblock-deck";
  const hideFooter =
    pathname === "/analytics" ||
    pathname === "/course/arduino-mblock-deck";

  return (
    <BootRevealProvider>
      <BootLoader />
      <BootAwareMain>
        <Navbar />
        <main
          className={cn(
            "relative overflow-x-clip",
            immersive ? "pt-0" : "pt-16"
          )}
        >
          {children}
        </main>
        {!hideFooter ? <Footer /> : null}
      </BootAwareMain>
    </BootRevealProvider>
  );
}
