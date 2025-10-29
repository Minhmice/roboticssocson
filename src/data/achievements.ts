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
    description_vi: "Chương trình đào tạo, thực hành và thi đấu robotics miễn phí dành cho học sinh THPT. Chủ đề Zero Carbon, tập trung vào việc xây dựng các robot làm việc trong các nhà máy xử lý CO₂ nhằm giảm thiểu và ngăn không cho CO₂ tích tụ trong bầu khí quyển, hướng đến mục tiêu Net Zero.",
    description_en: "Free robotics training and competition for high school students. Theme: Zero Carbon, focusing on building robots that work in CO₂ processing plants to reduce and prevent CO₂ accumulation in the atmosphere, aiming for Net Zero goals.",
    competition: "VRC",
    participants: "66 đội",
  },
  {
    year: "2024-2025",
    rank: "Top 8 toàn quốc",
    title_vi: "Vietnam Open Robotics Challenge (VORC)",
    title_en: "Vietnam Open Robotics Challenge (VORC)",
    description_vi: "VORC 2024 tiếp nối thành công của các mùa giải trước, tạo sân chơi bổ ích để học sinh THPT trên cả nước thử sức với các thử thách về thiết kế, lập trình và vận hành robot. Cuộc thi không chỉ giúp học sinh rèn luyện kỹ năng STEM mà còn khơi dậy niềm đam mê khoa học công nghệ.",
    description_en: "VORC 2024 continues the success of previous seasons, creating a beneficial platform for high school students nationwide to test their skills in robot design, programming, and operation. The competition not only helps students develop STEM skills but also ignites passion for science and technology.",
    competition: "VORC",
  },
  {
    year: "2024-2025",
    rank: "Top 11",
    title_vi: "FIRST Tech Challenge Vietnam",
    title_en: "FIRST Tech Challenge Vietnam",
    description_vi: "FIRST Tech Challenge Vietnam (FTC Vietnam) là giải đấu robotics quy mô quốc gia, được tổ chức lần đầu tiên tại Việt Nam vào năm 2024. Giải đấu này là một phần của hệ thống FIRST (For Inspiration and Recognition of Science and Technology) do tổ chức phi lợi nhuận FIRST của Mỹ sáng lập.",
    description_en: "FIRST Tech Challenge Vietnam (FTC Vietnam) is a national-scale robotics competition, organized for the first time in Vietnam in 2024. This competition is part of the FIRST system (For Inspiration and Recognition of Science and Technology) founded by the non-profit FIRST organization from the United States.",
    competition: "FTC Vietnam",
  },
  {
    year: "2025",
    rank: "Hạng 1 vòng loại & Á quân",
    title_vi: "Motions In Fire 2025",
    title_en: "Motions In Fire 2025",
    description_vi: "Motions In Fire 2025 là một trong những sự kiện nổi bật trong khuôn khổ STEAMese Festival 2025, được tổ chức phối hợp giữa Đại học Bách Khoa Hà Nội, STEAM for Vietnam, UNICEF Việt Nam và Đại sứ quán Hoa Kỳ tại Việt Nam, nhằm tạo ra một sân chơi giao hữu robotics mở vật liệu.",
    description_en: "Motions In Fire 2025 is one of the prominent events within STEAMese Festival 2025, organized in collaboration between Hanoi University of Science and Technology, STEAM for Vietnam, UNICEF Vietnam, and the U.S. Embassy in Vietnam, aiming to create an open-material robotics friendly competition platform.",
    competition: "Motions In Fire",
  },
] as const;

