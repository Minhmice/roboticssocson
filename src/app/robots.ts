import type { MetadataRoute } from "next";
import { courseSurfacesEnabled } from "@/data/courseRegistration";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        // Former sponsorship surfaces archived under src/legacy — not public routes.
        "/sponsor",
        "/sponsorship",
        ...(!courseSurfacesEnabled
          ? ["/course", "/course-register-form"]
          : []),
      ],
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
