import type { MetadataRoute } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      // Match metadataBase/canonical (no trailing slash) to avoid GSC soft duplicate.
      url: `${origin}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...(courseSurfacesEnabled
      ? [
          {
            url: `${origin}/course`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
          {
            url: `${origin}/course-register-form`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.85,
          },
        ]
      : []),
    {
      url: `${origin}/recruitment`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${origin}/contact-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
