import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/homepage/HomePage";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo/metadata";
import { homeSeo } from "@/lib/seo/routes-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  return buildMetadata(homeSeo[locale], locale);
}

export default function Page() {
  return <HomePage />;
}
