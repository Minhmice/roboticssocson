/**
 * Hero section bilingual content
 * Data-driven approach for easy i18n updates
 */

export type HeroData = {
  readonly badge_vi: string;
  readonly badge_en: string;
  readonly headline_vi: string;
  readonly headline_en: string;
  readonly sub_vi: string;
  readonly sub_en: string;
  readonly cta_primary_vi: string;
  readonly cta_primary_en: string;
  readonly cta_note_vi: string;
  readonly cta_note_en: string;
  readonly animatedWords_vi: readonly string[];
  readonly animatedWords_en: readonly string[];
};

export const heroData: HeroData = {
  badge_vi: "Robotics Sóc Sơn • FIRST Tech Challenge",
  badge_en: "Robotics Soc Son • FIRST Tech Challenge",
  headline_vi: "Trao quyền cho thế hệ nhà sáng tạo tiếp theo",
  headline_en: "Empower the next generation of innovators",
  sub_vi:
    "Robotics Sóc Sơn là đội robot trung học đến từ Hà Nội, với sứ mệnh lan tỏa niềm đam mê STEAM thông qua sáng tạo và tinh thần đồng đội.",
  sub_en:
    "Robotics Soc Son is a high school robotics team from Hanoi, with a mission to spread STEAM passion through creativity and teamwork.",
  cta_primary_vi: "Liên hệ",
  cta_primary_en: "Contact us",
  cta_note_vi: "roboticssocson@gmail.com — phản hồi trong 48 giờ",
  cta_note_en: "roboticssocson@gmail.com — we reply within 48 hours",
  animatedWords_vi: [
    "Lập trình - Sáng tạo",
    "Mơ ước - Triển khai",
    "Phát minh - Lan tỏa",
    "Sóc Sơn vươn tầm."
  ],
  animatedWords_en: [
    "Code - Create",
    "Dream - Design",
    "Invent - Inspire",
    "From SocSon to the World."
  ],
} as const;
