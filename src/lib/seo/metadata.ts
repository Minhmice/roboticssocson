import type { Metadata } from "next";

export type Locale = "vi" | "en";

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

const DEFAULT_OG_IMAGE = "/Logo/RBS Logo.svg";

export function buildMetadata(seo: RouteSeo): Metadata {
  const ogImage = seo.ogImage ?? DEFAULT_OG_IMAGE;
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;

  return {
    title: seo.title,
    description: seo.description,
    ...(seo.keywords?.length ? { keywords: seo.keywords } : {}),
    alternates: {
      canonical: seo.canonicalPath,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 637,
          height: 483,
          alt: "Robotics Sóc Sơn Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}
