import type { Metadata } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { assertCourseEnabled } from "@/lib/course/assertCourseEnabled";
import { courseRegisterFormMetadata } from "@/lib/seo/contact-pages-seo";
import CourseRegisterFormClient from "./CourseRegisterFormClient";

export function generateMetadata(): Metadata {
  if (!courseSurfacesEnabled) {
    return { robots: { index: false, follow: false } };
  }
  return courseRegisterFormMetadata();
}

export default function CourseRegisterFormPage() {
  assertCourseEnabled();
  return <CourseRegisterFormClient />;
}
