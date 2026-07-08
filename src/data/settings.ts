/**
 * Site settings and configuration
 * Central source of truth for brand, contact, and visual tokens
 */

export const brand = "Robotics Sóc Sơn" as const;

export const domain = "roboticssocson.minhmice.com" as const;

export const sponsorEmail = "roboticssocson@gmail.com" as const;

export const contactPhone = "0981427659" as const;
export const contactLeadName = "Đoàn Thùy Ngân" as const;
export const messengerUrl = "https://m.me/roboticssocson" as const;

/** Reserved for a future public pitch PDF path under /public. */
export const pitchPdfUrl: string | null = null;

export type Socials = {
  readonly facebook: string;
  readonly youtube: string;
  readonly tiktok: string;
  readonly github: string;
};

export const socials: Socials = {
  facebook: "https://www.facebook.com/roboticssocson/",
  youtube: "",
  tiktok: "",
  github: "",
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
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  cyan: "#2563EB",
  cyanHover: "#1D4ED8",
  glowRGBA: "rgba(37,99,235,0.12)",
} as const;

/**
 * Convenience object exporting all settings
 */
export const settings = {
  brand,
  domain,
  sponsorEmail,
  contactPhone,
  pitchPdfUrl,
  socials,
  palette,
} as const;

