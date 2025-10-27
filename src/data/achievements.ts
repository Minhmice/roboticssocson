/**
 * Achievements data
 * Competition results and rankings from Thành tích.txt
 */

export interface Achievement {
  readonly year: string;
  readonly rank: string;
  readonly title_vi: string;
  readonly title_en: string;
  readonly description_vi: string;
  readonly description_en: string;
  readonly competition: string;
  readonly participants?: string;
}

export const achievements: readonly Achievement[] = [
  {
    year: "2023-2024",
    rank: "Top 4 toàn quốc",
    title_vi: "Vietnam Robotics Challenge (VRC)",
    title_en: "Vietnam Robotics Challenge (VRC)",
    description_vi: "Chương trình đào tạo, thực hành và thi đấu robotics miễn phí dành cho học sinh THPT. Chủ đề Zero Carbon, 66 đội tham gia.",
    description_en: "Free robotics training and competition for high school students. Theme: Zero Carbon. 66 teams participated.",
    competition: "VRC",
    participants: "66 đội",
  },
  {
    year: "2024-2025",
    rank: "Top 8 toàn quốc",
    title_vi: "Vietnam Open Robotics Challenge (VORC)",
    title_en: "Vietnam Open Robotics Challenge (VORC)",
    description_vi: "Sân chơi bổ ích để học sinh THPT thử sức với thiết kế, lập trình và vận hành robot.",
    description_en: "Educational platform for high school students to test their skills in robot design, programming, and operation.",
    competition: "VORC",
  },
  {
    year: "2024-2025",
    rank: "Top 11",
    title_vi: "FIRST Tech Challenge Vietnam",
    title_en: "FIRST Tech Challenge Vietnam",
    description_vi: "Giải đấu robotics quy mô quốc gia được tổ chức lần đầu tại Việt Nam bởi Đại học FPT.",
    description_en: "National-scale robotics competition organized for the first time in Vietnam by FPT University.",
    competition: "FTC Vietnam",
  },
  {
    year: "2025",
    rank: "Hạng 1 vòng loại & Á quân",
    title_vi: "Motions In Fire 2025",
    title_en: "Motions In Fire 2025",
    description_vi: "Sự kiện trong STEAMese Festival, tổ chức bởi Đại học Bách Khoa Hà Nội, UNICEF Việt Nam và Đại sứ quán Hoa Kỳ.",
    description_en: "Event in STEAMese Festival, organized by Hanoi University of Science and Technology, UNICEF Vietnam, and U.S. Embassy.",
    competition: "Motions In Fire",
  },
] as const;

