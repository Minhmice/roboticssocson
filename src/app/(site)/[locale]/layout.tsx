import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";
import { LOCALES, isSupportedLocale } from "@/lib/i18n/locales";
import { rootMetadata, rootViewport } from "@/lib/seo/root-metadata";

export const dynamicParams = false;
export const viewport = rootViewport;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return rootMetadata(locale);
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return <RootShell locale={locale}>{children}</RootShell>;
}
