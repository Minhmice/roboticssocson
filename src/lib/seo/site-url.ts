/**
 * Canonical site origin for SEO (robots, sitemap, metadataBase).
 * Production builds must set NEXT_PUBLIC_SITE_URL — no silent localhost fallback.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[seo] NEXT_PUBLIC_SITE_URL is unset in production; using https://roboticssocson.minhmice.com",
    );
    return "https://roboticssocson.minhmice.com";
  }

  return "http://localhost:4000";
}

export const DEFAULT_OG_IMAGE = "/Images/og-default.png";
export const DEFAULT_OG_WIDTH = 1200;
export const DEFAULT_OG_HEIGHT = 630;
