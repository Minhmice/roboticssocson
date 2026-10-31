import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { assertCourseEnabled } from "@/lib/course/assertCourseEnabled";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo/metadata";
import { courseSeo } from "@/lib/seo/course-seo";
import { getCourseJsonLd } from "@/lib/seo/course-jsonld";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  if (!courseSurfacesEnabled) {
    return { robots: { index: false, follow: false } };
  }
  return buildMetadata(courseSeo[locale], locale);
}

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  assertCourseEnabled();
  return (
    <>
      <JsonLd data={getCourseJsonLd(locale)} />
      {children}
    </>
  );
}
