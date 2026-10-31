import type { Metadata } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { assertCourseEnabled } from "@/lib/course/assertCourseEnabled";
import { courseRegisterSuccessMetadata } from "@/lib/seo/contact-pages-seo";
import CourseRegisterSuccessClient from "./CourseRegisterSuccessClient";

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
  return courseRegisterSuccessMetadata(locale);
}
export default function CourseRegisterSuccessPage() {
  assertCourseEnabled();
  return <CourseRegisterSuccessClient />;
}
