import type { Metadata } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { notFound } from "next/navigation";
import { isSupportedLocale } from "@/lib/i18n/locales";
import { assertCourseEnabled } from "@/lib/course/assertCourseEnabled";
import { courseRegisterFormMetadata } from "@/lib/seo/contact-pages-seo";
import CourseRegisterFormClient from "./CourseRegisterFormClient";

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
  return courseRegisterFormMetadata(locale);
}
export default function CourseRegisterFormPage() {
  assertCourseEnabled();
  return <CourseRegisterFormClient />;
}
