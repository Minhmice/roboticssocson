import { courseRegisterFormMetadata } from "@/lib/seo/contact-pages-seo";
import CourseRegisterFormClient from "./CourseRegisterFormClient";

export const generateMetadata = courseRegisterFormMetadata;

export default function CourseRegisterFormPage() {
  return <CourseRegisterFormClient />;
}
