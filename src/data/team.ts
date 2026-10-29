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
  role_vi?: string;
  role_en?: string;
  image?: string;
  src?: string;
  slogan?: string;
  slogan_vi?: string;
  slogan_en?: string;
  classInfo?: string;
  classInfo_vi?: string;
  classInfo_en?: string;
  tags?: string[];
  href?: string;
};

export const teamCarouselData: readonly TeamCarouselMember[] = [
  {
    name: "Ngọc",
    role: "President",
    role_vi: "Chủ tịch",
    role_en: "President",
    src: "/Images/Teams/ngoc.webp",
    slogan: "Định hướng và dẫn dắt Robotics Sóc Sơn",
    slogan_vi: "Định hướng và dẫn dắt Robotics Sóc Sơn",
    slogan_en: "Leading the strategic vision of Robotics Sóc Sơn",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },
  {
    name: "Dung",
    role: "Vice President",
    role_vi: "Phó chủ tịch",
    role_en: "Vice President",
    src: "/Images/Teams/dung.webp",
    slogan: "Đồng hành quản lý và phát triển đội tuyển",
    slogan_vi: "Đồng hành quản lý và phát triển đội tuyển",
    slogan_en: "Coordinating team operations and growth",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },
  {
    name: "Nguyễn Thành Đạt",
    role: "Head of Engineering",
    role_vi: "Trưởng ban Kỹ thuật",
    role_en: "Head of Engineering",
    src: "/Images/Teams/dat.webp",
    slogan: "Thiết kế cơ khí và tối ưu hóa kết cấu robot",
    slogan_vi: "Thiết kế cơ khí và tối ưu hóa kết cấu robot",
    slogan_en: "Mechanical design and structural robot optimization",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#Engineering", "#FTC2026", "#Hardware"],
  },
  {
    name: "Võ Danh Sơn",
    role: "Head of Programming",
    role_vi: "Trưởng ban Lập trình",
    role_en: "Head of Programming",
    src: "/Images/Teams/son.webp",
    slogan: "Phát triển thuật toán điều khiển và tự hành robot",
    slogan_vi: "Phát triển thuật toán điều khiển và tự hành robot",
    slogan_en: "Autonomous algorithms and robot control systems",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#Programming", "#Autonomous", "#FTC2026"],
  },
  {
    name: "Chí Huy",
    role: "Head of Media Design",
    role_vi: "Trưởng ban Truyền thông",
    role_en: "Head of Media Design",
    src: "/Images/Teams/chi-huy.webp",
    slogan: "Sáng tạo hình ảnh và truyền thông câu chuyện của đội",
    slogan_vi: "Sáng tạo hình ảnh và truyền thông câu chuyện của đội",
    slogan_en: "Visual storytelling and team identity design",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#Media", "#Design", "#Outreach"],
  },
  {
    name: "Lê Quang Trình",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/trinh.webp",
    slogan: "Dẫn dắt đội đến thành công",
    slogan_vi: "Nhiệt huyết thi đấu và chế tạo robot",
    slogan_en: "Passionate about robotics engineering and competition",
    classInfo: "Class of 2025",
    classInfo_vi: "Khóa 2025",
    classInfo_en: "Class of 2025",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Đoàn Thị Thuỳ Ngân",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/ngan.webp",
    slogan: "Chuyên sâu về kỹ thuật robot và phát triển kỹ năng STEM",
    slogan_vi: "Chuyên sâu về kỹ thuật robot và phát triển kỹ năng STEM",
    slogan_en: "Focusing on robot mechanisms and STEM development",
    classInfo: "Class of 2025",
    classInfo_vi: "Khóa 2025",
    classInfo_en: "Class of 2025",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Trần Minh Hiếu",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/hieu.webp",
    slogan: "Chế tạo cơ khí và hỗ trợ thử nghiệm thực địa",
    slogan_vi: "Chế tạo cơ khí và hỗ trợ thử nghiệm thực địa",
    slogan_en: "Mechanical fabrication and field testing",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Anh Duy",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/anh-duy.webp",
    slogan: "Hỗ trợ lập trình điều khiển và tự hành",
    slogan_vi: "Hỗ trợ lập trình điều khiển và tự hành",
    slogan_en: "Control programming and autonomous assistance",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Đoàn Duy Phong",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/duy-phong.webp",
    slogan: "Lắp ráp phần cứng và bảo trì hệ thống",
    slogan_vi: "Lắp ráp phần cứng và bảo trì hệ thống",
    slogan_en: "Hardware assembly and system maintenance",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Ngọc Thảo",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/thao.webp",
    slogan: "Hậu cần đội tuyển và truyền thông sự kiện",
    slogan_vi: "Hậu cần đội tuyển và truyền thông sự kiện",
    slogan_en: "Team logistics and event outreach",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Hoàng Anh",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/hoang-anh.webp",
    slogan: "Thử nghiệm cơ cấu nạp và bắn bóng",
    slogan_vi: "Thử nghiệm cơ cấu nạp và bắn bóng",
    slogan_en: "Intake and launch mechanism testing",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Phạm Đức Vinh",
    role: "Member",
    role_vi: "Thành viên",
    role_en: "Member",
    src: "/Images/Teams/vinh.webp",
    slogan: "Kiểm tra hệ thống điện và cảm biến",
    slogan_vi: "Kiểm tra hệ thống điện và cảm biến",
    slogan_en: "Electrical wiring and sensor validation",
    classInfo: "Class of 2026",
    classInfo_vi: "Khóa 2026",
    classInfo_en: "Class of 2026",
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
];
