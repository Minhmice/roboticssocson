import { Inter } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import "@/app/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppShell } from "@/components/layout/AppShell";
import { Analytics } from "@/components/shared/Analytics";
import { PostHogPageView } from "@/components/shared/PostHogPageView";
import { getBootLoaderPreloadScript } from "@/lib/boot-loader";
import type { Locale } from "@/lib/i18n/locales";
import { loadMessages } from "@/lib/i18n/messages";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Shared `<html>` shell for every root layout. Loads exactly one dictionary on the
 * server; the other locale's JSON never ships to the client.
 */
export async function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const messages = await loadMessages(locale);
  const bootPreload = getBootLoaderPreloadScript();

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {bootPreload ? (
        <head>
          <script
            id="rbs-boot-gate"
            dangerouslySetInnerHTML={{ __html: bootPreload }}
          />
        </head>
      ) : null}
      <body className={`${inter.variable} antialiased overflow-x-clip`}>
        <LanguageProvider locale={locale} messages={messages}>
          <Analytics />
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
