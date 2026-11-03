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
  const header = (await headers()).get(PATH_HEADER) ?? "";
  // Set by the proxy; on paths it skips (file extensions) a client could send it, so accept
  // only a plain locale path. Anything else falls back to the client pathname.
  const pathname = /^\/(vi|en)(\/[a-z0-9/-]*)?$/.test(header) ? header : undefined;
  const locale = pathname?.startsWith("/en") ? "en" : "vi";
  return (
    <html lang={locale}>
      <body className="antialiased overflow-x-clip">
        <NotFoundView pathname={pathname} />
      </body>
    </html>
  );
}
