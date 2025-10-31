/**
 * Site settings and configuration
 * Central source of truth for brand, contact, and visual tokens
 */

export const brand = "Robotics Sóc Sơn" as const;

export const domain = "roboticssocson.minhmice.com" as const;

export const sponsorEmail = "sponsor@roboticssocson.com" as const;

export const pitchPdfUrl = "/Logo.svg" as const;

export type Socials = {
  readonly facebook: string;
  readonly youtube: string;
  readonly tiktok: string;
  readonly github: string;
};

export const socials: Socials = {
  facebook: "{{FACEBOOK_URL}}",
  youtube: "{{YOUTUBE_URL}}",
  tiktok: "{{TIKTOK_URL}}",
  github: "{{GITHUB_URL}}",
} as const;

export type Palette = {
  readonly bg: string;
  readonly surface: string;
  readonly text: string;
  readonly muted: string;
  readonly cyan: string;
  readonly cyanHover: string;
  readonly glowRGBA: string;
};

export const palette: Palette = {
  bg: "#0B1220",
  surface: "#0F172A",
  text: "#E2E8F0",
  muted: "#94A3B8",
  cyan: "#22D3EE",
  cyanHover: "#06B6D4",
  glowRGBA: "rgba(34,211,238,0.35)",
} as const;

/**
 * Convenience object exporting all settings
 */
export const settings = {
  brand,
  domain,
  sponsorEmail,
  pitchPdfUrl,
  socials,
  palette,
} as const;

