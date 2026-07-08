"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  BootAwareMain,
  BootLoader,
} from "@/components/layout/BootLoader";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

/** Full-bleed contact/register experiences — keep Navbar + Footer, drop main top pad. */
const IMMERSIVE_PATHS = new Set([
  "/course-register-form",
  "/contact-us",
]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const immersive = IMMERSIVE_PATHS.has(pathname);

  return (
    <>
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
        <Footer />
      </BootAwareMain>
    </>
  );
}
