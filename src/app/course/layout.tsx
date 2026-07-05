import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import { courseSeo } from "@/lib/seo/course-seo";

export function generateMetadata() {
  return buildMetadata(courseSeo.vi);
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  return children;
}
