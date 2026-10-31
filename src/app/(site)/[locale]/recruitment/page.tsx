import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  return buildMetadata(recruitmentSeo[locale], locale);
}

export default function RecruitmentPage() {
  return <RecruitmentClient />;
}
