import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { NotFoundView } from "@/components/shared/NotFoundView";
import { PATH_HEADER } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "404 | Robotics Sóc Sơn",
  robots: { index: false, follow: true },
};

/** Unmatched URLs. The root layout sits behind [locale], so this renders its own document. */
export default async function GlobalNotFound() {
  const pathname = (await headers()).get(PATH_HEADER) ?? "";
  const locale = /^\/en(?=\/|$)/.test(pathname) ? "en" : "vi";
  return (
    <html lang={locale}>
      <body className="antialiased overflow-x-clip">
        <NotFoundView pathname={pathname} />
      </body>
    </html>
  );
}
