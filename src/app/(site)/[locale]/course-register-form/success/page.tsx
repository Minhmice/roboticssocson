import type { Metadata } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { assertCourseEnabled } from "@/lib/course/assertCourseEnabled";
import { courseRegisterSuccessMetadata } from "@/lib/seo/contact-pages-seo";
import CourseRegisterSuccessClient from "./CourseRegisterSuccessClient";

export function generateMetadata(): Metadata {
  if (!courseSurfacesEnabled) {
    return { robots: { index: false, follow: false } };
  }
  return courseRegisterSuccessMetadata();
}

export default function CourseRegisterSuccessPage() {
  assertCourseEnabled();
  return <CourseRegisterSuccessClient />;
}
