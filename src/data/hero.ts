/**
 * Hero section bilingual content
 */
import type { Localized } from "@/lib/i18n/localized";

export type HeroData = {
  readonly badge: Localized<string>;
  readonly headline: Localized<string>;
  readonly sub: Localized<string>;
  readonly ctaPrimary: Localized<string>;
  readonly animatedWords: Localized<readonly string[]>;
};

export const heroData: HeroData = {
  badge: {
    vi: "Robotics Sóc Sơn • FIRST Tech Challenge",
    en: "Robotics Soc Son • FIRST Tech Challenge",
  },
  headline: {
    vi: "Trao quyền cho thế hệ nhà sáng tạo tiếp theo",
    en: "Empower the next generation of innovators",
  },
  sub: {
    vi: "Robotics Sóc Sơn là đội robot trung học đến từ Hà Nội, với sứ mệnh lan tỏa niềm đam mê STEAM thông qua sáng tạo và tinh thần đồng đội.",
    en: "Robotics Soc Son is a high school robotics team from Hanoi, with a mission to spread STEAM passion through creativity and teamwork.",
  },
  ctaPrimary: { vi: "Tìm hiểu về đội", en: "Explore the team" },
  animatedWords: {
    vi: [
      "Lập trình - Sáng tạo",
      "Mơ ước - Triển khai",
      "Phát minh - Lan tỏa",
      "Sóc Sơn vươn tầm.",
    ],
    en: [
      "Code - Create",
      "Dream - Design",
      "Invent - Inspire",
      "From SocSon to the World.",
    ],
  },
};
