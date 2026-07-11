import type { ReactNode } from "react";
import Script from "next/script";
import { buildMetadata } from "@/lib/seo/metadata";
import { courseSeo } from "@/lib/seo/course-seo";
import { getCourseJsonLd } from "@/lib/seo/course-jsonld";

export function generateMetadata() {
  return buildMetadata(courseSeo.vi);
}

export default function CourseLayout({ children }: { children: ReactNode }) {
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
