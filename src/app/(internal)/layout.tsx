import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";
import { rootMetadata, rootViewport } from "@/lib/seo/root-metadata";

// Deck, analytics and API stay single-locale (Vietnamese) and keep their existing URLs.
export const metadata = rootMetadata("vi");
export const viewport = rootViewport;

export default function InternalLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="vi">{children}</RootShell>;
}
