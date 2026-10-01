/**
 * Team Carousel Data
 * Input data for TeamCarousel component
 * Supports full MemberCard props
 */

export type TeamCarouselMember = {
  name: string;
  role:
    | "President"
    | "Vice President"
    | "Head of Engineering"
    | "Head of Programming"
    | "Head of Media Design"
    | "Captain"
    | "Vice Captain"
    | "Member"
    | "Engineering"
    | "Coding"
    | "Media - Design";
  image?: string; // Ảnh cover, nếu undefined sẽ dùng MediaPlaceholder
  src?: string; // Link ảnh trong public folder, ví dụ: "/Images/Team/le-quang-trinh.webp"
  slogan?: string; // Slogan của thành viên
  classInfo?: string; // Năm sinh hoặc năm tham gia, ví dụ: "2007" hoặc "Class of 2025"
  tags?: string[]; // Hashtags, ví dụ: ["#Leadership", "#FTC2026", "#STEM"]
  href?: string; // Link đến profile page (optional)
};

export const teamCarouselData: readonly TeamCarouselMember[] = [
  {
    name: "Ngọc",
    role: "President",
    src: "/Images/Teams/ngoc.webp",
    slogan: "Định hướng và dẫn dắt Robotics Sóc Sơn",
    classInfo: "Class of 2026",
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },
  {
    name: "Dung",
    role: "Vice President",
    src: "/Images/Teams/dung.webp",
    slogan: "Đồng hành quản lý và phát triển đội tuyển",
    classInfo: "Class of 2026",
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },
  {
    name: "Nguyễn Thành Đạt",
    role: "Head of Engineering",
    src: "/Images/Teams/dat.webp",
    slogan: "Thiết kế cơ khí và tối ưu hóa kết cấu robot",
    classInfo: "Class of 2026",
    tags: ["#Engineering", "#FTC2026", "#Hardware"],
  },
  {
    name: "Võ Danh Sơn",
    role: "Head of Programming",
    src: "/Images/Teams/son.webp",
    slogan: "Phát triển thuật toán điều khiển và tự hành robot",
    classInfo: "Class of 2026",
    tags: ["#Programming", "#Autonomous", "#FTC2026"],
  },
  {
    name: "Chí Huy",
    role: "Head of Media Design",
    src: "/Images/Teams/chi-huy.webp",
    slogan: "Sáng tạo hình ảnh và truyền thông câu chuyện của đội",
    classInfo: "Class of 2026",
    tags: ["#Media", "#Design", "#Outreach"],
  },
  {
    name: "Lê Quang Trình",
    role: "Member",
    src: "/Images/Teams/trinh.webp",
    slogan: "Dẫn dắt đội đến thành công",
    classInfo: "Class of 2025",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Đoàn Thị Thuỳ Ngân",
    role: "Member",
    src: "/Images/Teams/ngan.webp",
    slogan: "Chuyên sâu về kỹ thuật robot và phát triển kỹ năng STEM",
    classInfo: "Class of 2025",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Trần Minh Hiếu",
    role: "Member",
    src: "/Images/Teams/hieu.webp",
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Anh Duy",
    role: "Member",
    src: "/Images/Teams/anh-duy.webp",
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Đoàn Duy Phong",
    role: "Member",
    src: "/Images/Teams/duy-phong.webp",
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Ngọc Thảo",
    role: "Member",
    src: "/Images/Teams/thao.webp",
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Hoàng Anh",
    role: "Member",
    src: "/Images/Teams/hoang-anh.webp",
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Phạm Đức Vinh",
    role: "Member",
    src: "/Images/Teams/vinh.webp",
    slogan: "Đóng góp cho đội Robotics",
    classInfo: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
];
