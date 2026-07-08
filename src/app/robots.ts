import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Former sponsorship surfaces archived under src/legacy — not public routes.
      disallow: ["/sponsor", "/sponsorship"],
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
