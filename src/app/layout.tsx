import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppShell } from "@/components/layout/AppShell";
import { DynamicMetadata } from "@/components/layout/DynamicMetadata";
import { Analytics } from "@/components/shared/Analytics";
import { PostHogPageView } from "@/components/shared/PostHogPageView";
import { getBootLoaderPreloadScript } from "@/lib/boot-loader";
import { buildMetadata } from "@/lib/seo/metadata";
import { homeSeo } from "@/lib/seo/routes-seo";
import { getSiteUrl } from "@/lib/seo/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...buildMetadata(homeSeo.vi),
  authors: [{ name: "Robotics Sóc Sơn" }],
  icons: {
    icon: "/Logo/RBS Logo.svg",
    shortcut: "/Logo/RBS Logo.svg",
    apple: "/Logo/RBS Logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bootPreload = getBootLoaderPreloadScript();

  return (
    <html lang="vi" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      {bootPreload ? (
        <head>
          <script
            id="rbs-boot-gate"
            dangerouslySetInnerHTML={{ __html: bootPreload }}
          />
        </head>
      ) : null}
      <body className={`${inter.variable} antialiased overflow-x-clip`}>
        <LanguageProvider>
          <DynamicMetadata />
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
