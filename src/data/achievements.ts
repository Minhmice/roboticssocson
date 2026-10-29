/**
 * Achievements data
 * Competition results and rankings from Thành tích.txt
 */

import type { Localized } from "@/lib/i18n/localized";

export interface AchievementImage {
  readonly src: string;
  readonly caption: Localized<string>;
  readonly loading?: "lazy" | "eager";
  readonly priority?: boolean;
}

export interface Achievement {
  readonly year: string;
  readonly rank: Localized<string>;
  readonly title: Localized<string>;
  readonly description: Localized<string>;
  readonly competition: string;
  readonly participants?: Localized<string>;
  readonly images?: readonly AchievementImage[];
}

// Section header data
export const achievementsHeader = {
  title: { vi: "Hành trình thi đấu của chúng em", en: "Our Competition Journey" },
  description: { vi: "Từ những ngày đầu thành lập đến những thành tích đáng tự hào trong các cuộc thi robotics.", en: "From our early days to the proud achievements in robotics competitions." },
} as const;

export const achievements: readonly Achievement[] = [
  {
    year: "2023-2024",
    rank: { vi: "Top 4 toàn quốc", en: "Top 4 Nationwide" },
    title: { vi: "Vietnam Robotics Challenge (VRC)", en: "Vietnam Robotics Challenge (VRC)" },
    description: { vi: "Chương trình đào tạo, thực hành và thi đấu robotics miễn phí dành cho học sinh THPT. Chủ đề Zero Carbon, tập trung vào việc xây dựng các robot làm việc trong các nhà máy xử lý CO₂ nhằm giảm thiểu và ngăn không cho CO₂ tích tụ trong bầu khí quyển, hướng đến mục tiêu Net Zero.", en: "Free robotics training and competition for high school students. Theme: Zero Carbon, focusing on building robots that work in CO₂ processing plants to reduce and prevent CO₂ accumulation in the atmosphere, aiming for Net Zero goals." },
    competition: "VRC",
    participants: { vi: "66 đội", en: "66 đội" },
    images: [
      {
        src: "/Images/Achievements/VRC/IMG_0526.webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      { src: "/Images/Achievements/VRC/IMG_0531.webp", caption: { vi: "Đội thi", en: "Đội thi" } },
      { src: "/Images/Achievements/VRC/IMG_0543.webp", caption: { vi: "Hoạt động", en: "Hoạt động" } },
      { src: "/Images/Achievements/VRC/IMG_0660.webp", caption: { vi: "Đội thi", en: "Đội thi" } },
      { src: "/Images/Achievements/VRC/IMG_0663.webp", caption: { vi: "Giải thưởng", en: "Giải thưởng" } },
      { src: "/Images/Achievements/VRC/IMG_0664.webp", caption: { vi: "Giải thưởng", en: "Giải thưởng" } },
      { src: "/Images/Achievements/VRC/IMG_0665.webp", caption: { vi: "Giải thưởng", en: "Giải thưởng" } },
      { src: "/Images/Achievements/VRC/IMG_0688.webp", caption: { vi: "Giải thưởng", en: "Giải thưởng" } },
    ] as const,
  },
  {
    year: "2024-2025",
    rank: { vi: "Top 8 toàn quốc", en: "Top 8 Nationwide" },
    title: { vi: "Vietnam Open Robotics Challenge (VORC)", en: "Vietnam Open Robotics Challenge (VORC)" },
    description: { vi: "VORC 2024 tiếp nối thành công của các mùa giải trước, tạo sân chơi bổ ích để học sinh THPT trên cả nước thử sức với các thử thách về thiết kế, lập trình và vận hành robot. Cuộc thi không chỉ giúp học sinh rèn luyện kỹ năng STEM mà còn khơi dậy niềm đam mê khoa học công nghệ.", en: "VORC 2024 continues the success of previous seasons, creating a beneficial platform for high school students nationwide to test their skills in robot design, programming, and operation. The competition not only helps students develop STEM skills but also ignites passion for science and technology." },
    competition: "VORC",
    images: [
      {
        src: "/Images/Achievements/VORC/Image (1).webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      { src: "/Images/Achievements/VORC/Image (2).webp", caption: { vi: "Đội thi", en: "Đội thi" } },
      { src: "/Images/Achievements/VORC/Image (3).webp", caption: { vi: "Hoạt động", en: "Hoạt động" } },
      {
        src: "/Images/Achievements/VORC/Image (4).webp",
        caption: { vi: "Giải thưởng", en: "Giải thưởng" },
      },
      {
        src: "/Images/Achievements/VORC/Image (5).webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      { src: "/Images/Achievements/VORC/Image (6).webp", caption: { vi: "Đội thi", en: "Đội thi" } },
    ] as const,
  },
  {
    year: "2024-2025",
    rank: { vi: "Top 11", en: "Top 11" },
    title: { vi: "FIRST Tech Challenge Vietnam", en: "FIRST Tech Challenge Vietnam" },
    description: { vi: "FIRST Tech Challenge Vietnam (FTC Vietnam) là giải đấu robotics quy mô quốc gia, được tổ chức lần đầu tiên tại Việt Nam vào năm 2024. Giải đấu này là một phần của hệ thống FIRST (For Inspiration and Recognition of Science and Technology) do tổ chức phi lợi nhuận FIRST của Mỹ sáng lập.", en: "FIRST Tech Challenge Vietnam (FTC Vietnam) is a national-scale robotics competition, organized for the first time in Vietnam in 2024. This competition is part of the FIRST system (For Inspiration and Recognition of Science and Technology) founded by the non-profit FIRST organization from the United States." },
    competition: "FTC Vietnam",
    images: [
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (1).webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (2).webp",
        caption: { vi: "Đội thi", en: "Đội thi" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (3).webp",
        caption: { vi: "Hoạt động", en: "Hoạt động" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (4).webp",
        caption: { vi: "Giải thưởng", en: "Giải thưởng" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (5).webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (6).webp",
        caption: { vi: "Đội thi", en: "Đội thi" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (7).webp",
        caption: { vi: "Hoạt động", en: "Hoạt động" },
      },
      {
        src: "/Images/Achievements/FTC 2024-2025/Image  (8).webp",
        caption: { vi: "Giải thưởng", en: "Giải thưởng" },
      },
    ] as const,
  },
  {
    year: "2025",
    rank: { vi: "Hạng 1 vòng loại & Á quân", en: "1st Place Round & Runner-up" },
    title: { vi: "Motions In Fire 2025", en: "Motions In Fire 2025" },
    description: { vi: "Motions In Fire 2025 là một trong những sự kiện nổi bật trong khuôn khổ STEAMese Festival 2025, được tổ chức phối hợp giữa Đại học Bách Khoa Hà Nội, STEAM for Vietnam, UNICEF Việt Nam và Đại sứ quán Hoa Kỳ tại Việt Nam, nhằm tạo ra một sân chơi giao hữu robotics mở vật liệu.", en: "Motions In Fire 2025 is one of the prominent events within STEAMese Festival 2025, organized in collaboration between Hanoi University of Science and Technology, STEAM for Vietnam, UNICEF Vietnam, and the U.S. Embassy in Vietnam, aiming to create an open-material robotics friendly competition platform." },
    competition: "Motions In Fire",
    images: [
      {
        src: "/Images/Achievements/Motion Fire/Image (1).webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      {
        src: "/Images/Achievements/Motion Fire/Image (2).webp",
        caption: { vi: "Đội thi", en: "Đội thi" },
      },
      {
        src: "/Images/Achievements/Motion Fire/Image (3).webp",
        caption: { vi: "Hoạt động", en: "Hoạt động" },
      },
      {
        src: "/Images/Achievements/Motion Fire/Image (4).webp",
        caption: { vi: "Giải thưởng", en: "Giải thưởng" },
      },
      {
        src: "/Images/Achievements/Motion Fire/Image (5).webp",
        caption: { vi: "Robot thi đấu", en: "Robot thi đấu" },
      },
      {
        src: "/Images/Achievements/Motion Fire/Image (6).webp",
        caption: { vi: "Đội thi", en: "Đội thi" },
      },
    ] as const,
  },
] as const;
