import type { Course, WithContext } from "schema-dts";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";
import { coursePricingConfig } from "@/data/coursePricing";
import { getSiteUrl } from "@/lib/seo/site-url";

function toAbsoluteUrl(canonicalPath: string, locale: Locale): string {
  const site = getSiteUrl();
  const path = localizedHref(canonicalPath, locale);
  if (path === "/") {
    return site;
  }
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getCourseJsonLd(locale: Locale): WithContext<Course> {
  const { sessionCount, fullPriceVnd, currencyCode } = coursePricingConfig;
  const isEn = locale === "en";

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: isEn ? "From Blocks to Hardware" : "Từ Khối Lệnh Đến Phần Cứng",
    alternateName: isEn ? "Từ Khối Lệnh Đến Phần Cứng" : "From Blocks to Hardware",
    description: isEn
      ? "A 16-session STEM course for grades 1–2: from Scratch and flowcharts to mBlock, Arduino, and real hardware projects — Robotics Sóc Sơn."
      : "Khóa STEM 16 buổi cho học sinh cấp 1–2: từ Scratch và flowchart đến mBlock, Arduino và dự án phần cứng thật — Robotics Sóc Sơn.",
    provider: {
      "@type": "Organization",
      name: "Robotics Sóc Sơn",
      url: toAbsoluteUrl("/", locale),
    },
    url: toAbsoluteUrl("/course", locale),
    inLanguage: locale,
    educationalLevel: "Primary and lower secondary (grades 1–2 tracks)",
    numberOfCredits: sessionCount,
    offers: {
      "@type": "Offer",
      price: String(fullPriceVnd),
      priceCurrency: currencyCode,
      availability: "https://schema.org/InStock",
      url: toAbsoluteUrl("/course-register-form", locale),
      category: "Full course tuition",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: `P${sessionCount}S`,
    },
  };
}
