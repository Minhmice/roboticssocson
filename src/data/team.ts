/**
 * Team Carousel Data
 * Input data for TeamCarousel component
 * Supports full MemberCard props
 */

export type TeamCarouselMember = {
  name: string;
  role:
    | "Captain"
    | "Vice Captain"
    | "Member"
    | "Engineering"
    | "Coding"
    | "Media - Design";
  image?: string; // Ảnh cover, nếu undefined sẽ dùng MediaPlaceholder
  slogan?: string; // Slogan của thành viên
  classInfo?: string; // Năm sinh hoặc năm tham gia, ví dụ: "2007" hoặc "Class of 2025"
  tags?: string[]; // Hashtags, ví dụ: ["#Leadership", "#FTC2026", "#STEM"]
  href?: string; // Link đến profile page (optional)
};

export const teamCarouselData: readonly TeamCarouselMember[] = [
  // Captain
  {
    name: "Lê Quang Trình",
    role: "Captain",
    image: undefined, // Dùng MediaPlaceholder
    slogan: "Dẫn dắt đội đến thành công",
    classInfo: "Class of 2025",
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },

  // Vice Captain
  {
    name: "Đoàn Thị Thuỳ Ngân",
    role: "Vice Captain",
    image: undefined,
    slogan: "Chuyên sâu về kỹ thuật robot và phát triển kỹ năng STEM",
    classInfo: "Class of 2025",
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },

  // Members
  {
    name: "Võ Danh Sơn",
    role: "Member",
    image: undefined,
    slogan: "Engineering enthusiast, passionate about robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Phạm Đức Vinh",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Phùng An Phong",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Đoàn Dũng",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Nguyễn Hồng Hà",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Cao Linh Hương",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Trần Minh Hiếu",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Nguyễn Anh Duy",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Vũ Hải Anh",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Nguyễn Đoàn Duy Phong",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Nguyễn Ngọc Thảo",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },

  {
    name: "Đỗ Ngô Thiện Nhân",
    role: "Member",
    image: undefined,
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
] as const;
