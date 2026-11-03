import { Suspense, type ReactNode } from "react";
import "@/app/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppShell } from "@/components/layout/AppShell";
import { Analytics } from "@/components/shared/Analytics";
import { PostHogPageView } from "@/components/shared/PostHogPageView";
import { getBootLoaderPreloadScript } from "@/lib/boot-loader";
import type { Locale } from "@/lib/i18n/locales";
import { loadMessages } from "@/lib/i18n/messages";


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
        // The pre-paint boot gate belongs in the App Router root document head.
        // eslint-disable-next-line @next/next/no-head-element
        <head>
          <script
            id="rbs-boot-gate"
            dangerouslySetInnerHTML={{ __html: bootPreload }}
          />
        </head>
      ) : null}
      <body
        className="antialiased overflow-x-clip"
        suppressHydrationWarning
      >
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
