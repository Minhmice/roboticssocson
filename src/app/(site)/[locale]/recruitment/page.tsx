import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { recruitmentSurfacesEnabled } from "@/data/recruitment";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo/metadata";
import { recruitmentSeo } from "@/lib/seo/routes-seo";
import RecruitmentClient from "./RecruitmentClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();
  if (!recruitmentSurfacesEnabled) return { robots: { index: false, follow: false } };
  return buildMetadata(recruitmentSeo[locale], locale);
}

export default function RecruitmentPage() {
  if (!recruitmentSurfacesEnabled) notFound();
  return <RecruitmentClient />;
}
