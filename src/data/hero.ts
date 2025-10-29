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
  readonly cta_secondary_vi: string;
  readonly cta_secondary_en: string;
  readonly budget_vi: string;
  readonly budget_en: string;
  readonly budget_label_vi: string;
  readonly budget_label_en: string;
  readonly students_vi: string;
  readonly students_en: string;
  readonly students_label_vi: string;
  readonly students_label_en: string;
  readonly competitions_vi: string;
  readonly competitions_en: string;
  readonly competitions_label_vi: string;
  readonly competitions_label_en: string;
  readonly animatedWords_vi: readonly string[];
  readonly animatedWords_en: readonly string[];
};

export const heroData: HeroData = {
  badge_vi: "Robotics Sóc Sơn • FIRST Tech Challenge",
  badge_en: "Robotics Soc Son • FIRST Tech Challenge",
  headline_vi: "Trao quyền cho thế hệ nhà sáng tạo tiếp theo",
  headline_en: "Empower the next generation of innovators",
  sub_vi:
    "Robotics Sóc Sơn là đội robot trung học từ Hà Nội, truyền cảm hứng STEAM qua sáng tạo và tinh thần đồng đội.",
  sub_en:
    "Robotics Soc Son is a high school robotics team from Hanoi, inspiring youth in STEAM through creativity and teamwork.",
  cta_primary_vi: "Tài trợ ngay",
  cta_primary_en: "Become a Sponsor",
  cta_secondary_vi: "Tải Pitch PDF",
  cta_secondary_en: "Download Pitch PDF",
  budget_vi: "63 triệu VND",
  budget_en: "$2,579",
  budget_label_vi: "Ngân sách cần thiết",
  budget_label_en: "Required budget",
  students_vi: "15",
  students_en: "15",
  students_label_vi: "học sinh",
  students_label_en: "students",
  competitions_vi: "4",
  competitions_en: "4",
  competitions_label_vi: "giải đấu",
  competitions_label_en: "competitions",
  animatedWords_vi: [
    "Lập trình. Sáng tạo. Thi đấu.",
    "Mơ ước. Thiết kế. Triển khai.",
    "Phát minh. Truyền cảm hứng. Tạo dấu ấn.",
    "Từ Sóc Sơn vươn ra thế giới."
  ],
  animatedWords_en: [
    "Code. Create. Compete.",
    "Dream. Design. Deploy.",
    "Invent. Inspire. Impact.",
    "From Sóc Sơn to the World."
  ],
} as const;
