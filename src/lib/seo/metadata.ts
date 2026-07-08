import type { Metadata } from "next";
import {
  DEFAULT_OG_HEIGHT,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_WIDTH,
} from "./site-url";

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
      url: seo.canonicalPath,
      siteName: "Robotics Sóc Sơn",
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_WIDTH,
          height: DEFAULT_OG_HEIGHT,
          alt: "Robotics Sóc Sơn",
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
