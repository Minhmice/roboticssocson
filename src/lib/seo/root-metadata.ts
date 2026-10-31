import type { Metadata, Viewport } from "next";
import type { Locale } from "@/lib/i18n/locales";
import { homeSeo } from "./routes-seo";
import { getSiteUrl } from "./site-url";

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/** Site-wide metadata shared by every root layout. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      template: "%s",
      default: homeSeo[locale].title,
    },
    description: homeSeo[locale].description,
    authors: [{ name: "Robotics Sóc Sơn" }],
    icons: {
      icon: "/Logo/RBS Logo.svg",
      shortcut: "/Logo/RBS Logo.svg",
      apple: "/Logo/RBS Logo.svg",
    },
  };
}
