import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { assertCourseEnabled } from "@/lib/course/assertCourseEnabled";
import { buildMetadata } from "@/lib/seo/metadata";
import { courseSeo } from "@/lib/seo/course-seo";
import { getCourseJsonLd } from "@/lib/seo/course-jsonld";

export function generateMetadata(): Metadata {
  if (!courseSurfacesEnabled) {
    return { robots: { index: false, follow: false } };
  }
  return buildMetadata(courseSeo.vi);
}

export default function CourseLayout({ children }: { children: ReactNode }) {
  assertCourseEnabled();
  return (
    <>
      <Script
        id="course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCourseJsonLd()),
        }}
      />
      {children}
    </>
  );
}
