import { coursePricingConfig } from "@/data/coursePricing";
import { getSiteUrl } from "@/lib/seo/site-url";

export function getCourseJsonLd() {
  const site = getSiteUrl();
  const { sessionCount, fullPriceVnd, currencyCode } = coursePricingConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Từ Khối Lệnh Đến Phần Cứng",
    alternateName: "From Blocks to Hardware",
    description:
      "Khóa STEM 16 buổi cho học sinh cấp 1–2: từ Scratch và flowchart đến mBlock, Arduino và dự án phần cứng thật — Robotics Sóc Sơn.",
    provider: {
      "@type": "Organization",
      name: "Robotics Sóc Sơn",
      url: site,
    },
    url: `${site}/course`,
    inLanguage: ["vi", "en"],
    educationalLevel: "Primary and lower secondary (grades 1–2 tracks)",
    numberOfCredits: sessionCount,
    offers: {
      "@type": "Offer",
      price: String(fullPriceVnd),
      priceCurrency: currencyCode,
      availability: "https://schema.org/InStock",
      url: `${site}/course-register-form`,
      category: "Full course tuition",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      courseWorkload: `P${sessionCount}S`,
    },
  };
}
