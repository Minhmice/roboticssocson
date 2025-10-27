/**
 * Hero section bilingual content
 * Data-driven approach for easy i18n updates
 */

export type HeroData = {
  readonly headline_vi: string;
  readonly headline_en: string;
  readonly sub_vi: string;
  readonly sub_en: string;
  readonly cta_primary_vi: string;
  readonly cta_primary_en: string;
  readonly cta_secondary_vi: string;
  readonly cta_secondary_en: string;
  readonly media: {
    readonly type: "video" | "image";
    readonly src: string;
    readonly caption_vi: string;
    readonly caption_en: string;
  };
};

export const heroData: HeroData = {
  headline_vi: "Trao quyền cho thế hệ nhà sáng tạo tiếp theo",
  headline_en: "Empower the next generation of innovators",
  sub_vi:
    "Robotics Sóc Sơn là đội robot trung học từ Hà Nội, truyền cảm hứng STEM qua sáng tạo và tinh thần đồng đội.",
  sub_en:
    "Robotics Soc Son is a high school robotics team from Hanoi, inspiring youth in STEM through creativity and teamwork.",
  cta_primary_vi: "Tài trợ ngay",
  cta_primary_en: "Become a Sponsor",
  cta_secondary_vi: "Tải Pitch PDF",
  cta_secondary_en: "Download Pitch PDF",
  media: {
    type: "video",
    src: "/video-placeholder.mp4",
    caption_vi: "Giới thiệu đội (video placeholder)",
    caption_en: "Team intro (video placeholder)",
  },
} as const;

