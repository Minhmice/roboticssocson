import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robotics Sóc Sơn — Sponsorship Site",
  description: "Empower the next generation of innovators. High school robotics team from Hanoi competing in FIRST Tech Challenge.",
  keywords: "robotics, FIRST Tech Challenge, FTC, STEM, Sóc Sơn, Hanoi, sponsorship, innovation",
  authors: [{ name: "Robotics Sóc Sơn" }],
  openGraph: {
    title: "Robotics Sóc Sơn — Sponsorship Site",
    description: "Empower the next generation of innovators through robotics.",
    type: "website",
    siteName: "Robotics Sóc Sơn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robotics Sóc Sơn",
    description: "Empower the next generation of innovators.",
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
  return (
    <html lang="vi" className="scroll-smooth dark" data-theme="dark">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <LanguageProvider>
          <Navbar />
          <main className="relative overflow-x-hidden pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
