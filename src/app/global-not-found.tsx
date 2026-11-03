import "./globals.css";
import type { Metadata } from "next";
import { NotFoundView } from "@/components/shared/NotFoundView";

export const metadata: Metadata = {
  title: "404 | Robotics Sóc Sơn",
  robots: { index: false, follow: true },
};

/** Unmatched URLs. The root layout sits behind [locale], so this renders its own document. */
export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body className="antialiased overflow-x-clip">
        <NotFoundView />
      </body>
    </html>
  );
}
