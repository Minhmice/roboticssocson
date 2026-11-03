/** Local fallback cover per category, used only when an article has no web image or it fails to load. */
export const CATEGORY_FALLBACK_COVERS: Record<string, string> = {
  "ftc-components": "/Images/Achievements/FTC 2024-2025/Image  (1).webp",
  "robotics-general": "/Images/Mission/Image (1).webp",
  programming: "/Images/Course/capstone-chassis.webp",
  "ftc-knowledge": "/Images/Achievements/VRC/IMG_0663.webp",
  rules: "/Images/About FTC/1.1.webp",
};

export const fallbackCover = (categoryId: string): string =>
  CATEGORY_FALLBACK_COVERS[categoryId] ?? CATEGORY_FALLBACK_COVERS["ftc-components"];
