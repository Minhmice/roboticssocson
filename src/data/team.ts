/**
 * Team Carousel Data
 * Input data for TeamCarousel component
 * Supports full MemberCard props
 */

import type { Localized } from "@/lib/i18n/localized";

export type TeamCarouselMember = {
  name: string;
  role: Localized<string>;
  image?: string;
  src?: string;
  slogan?: Localized<string>;
  classInfo?: Localized<string>;
  tags?: string[];
  href?: string;
};

// Chưa có ảnh: MemberCard tự hiện placeholder. Thêm `src` khi có ảnh nền đen.
const pending = (dept: Localized<string>, names: string[]): TeamCarouselMember[] =>
  names.map((name) => ({
    name,
    role: { vi: "Thành viên", en: "Member" },
    classInfo: dept,
    tags: [],
  }));

const pendingPhotoMembers: TeamCarouselMember[] = [
  ...pending({ vi: "Ban Code – Điện tử", en: "Code and Electronics" }, [
    "Nguyễn Thanh Phong",
    "Nguyễn Đức Hoàng Lâm",
    "Lê Đức Anh",
    "Đào Nhật Tùng",
    "Đỗ Hải Châu Anh",
  ]),
  ...pending({ vi: "Ban Cơ khí – Thiết kế", en: "Mechanical and Design" }, [
    "Nguyễn Trọng Hùng",
    "Nguyễn Bảo Ngọc",
    "Trần Thanh Tùng",
    "Phạm Kiến Huy",
    "Nguyễn Quốc Phong",
  ]),
  ...pending({ vi: "Ban Truyền thông", en: "Communications" }, [
    "Vũ Hải Anh",
    "Nguyễn Quỳnh Anh",
    "Trần Thu Hà",
    "Nguyễn Thị Ngân Hà",
    "Lại Thảo Anh",
  ]),
];

export const teamCarouselData: readonly TeamCarouselMember[] = [
  {
    name: "Nguyễn Bảo Ngọc",
    role: { vi: "Chủ tịch", en: "President" },
    src: "/Images/Teams/ngoc.webp",
    slogan: { vi: "Định hướng và dẫn dắt Robotics Sóc Sơn", en: "Leading the strategic vision of Robotics Sóc Sơn" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },
  {
    name: "Nguyễn Thùy Dung",
    role: { vi: "Phó chủ tịch", en: "Vice President" },
    src: "/Images/Teams/dung.webp",
    slogan: { vi: "Đồng hành quản lý và phát triển đội tuyển", en: "Coordinating team operations and growth" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#Leadership", "#FTC2026", "#STEM"],
  },
  {
    name: "Nguyễn Thành Đạt",
    role: { vi: "Trưởng ban Cơ khí – Thiết kế", en: "Head of Mechanical and Design" },
    src: "/Images/Teams/dat.webp",
    slogan: { vi: "Thiết kế cơ khí và tối ưu hóa kết cấu robot", en: "Mechanical design and structural robot optimization" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#Engineering", "#FTC2026", "#Hardware"],
  },
  {
    name: "Võ Danh Sơn",
    role: { vi: "Trưởng ban Code – Điện tử", en: "Head of Code and Electronics" },
    src: "/Images/Teams/son.webp",
    slogan: { vi: "Phát triển thuật toán điều khiển và tự hành robot", en: "Autonomous algorithms and robot control systems" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#Programming", "#Autonomous", "#FTC2026"],
  },
  {
    name: "Đoàn Chí Huy",
    role: { vi: "Trưởng ban Truyền thông", en: "Head of Communications" },
    src: "/Images/Teams/chi-huy.webp",
    slogan: { vi: "Sáng tạo hình ảnh và truyền thông câu chuyện của đội", en: "Visual storytelling and team identity design" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#Media", "#Design", "#Outreach"],
  },
  {
    name: "Lê Quang Trình",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/trinh.webp",
    slogan: { vi: "Nhiệt huyết thi đấu và chế tạo robot", en: "Passionate about robotics engineering and competition" },
    classInfo: { vi: "Khóa 2025", en: "Class of 2025" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Đoàn Thùy Ngân",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/ngan.webp",
    slogan: { vi: "Chuyên sâu về kỹ thuật robot và phát triển kỹ năng STEM", en: "Focusing on robot mechanisms and STEM development" },
    classInfo: { vi: "Khóa 2025", en: "Class of 2025" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Anh Duy",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/anh-duy.webp",
    slogan: { vi: "Hỗ trợ lập trình điều khiển và tự hành", en: "Control programming and autonomous assistance" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Đoàn Duy Phong",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/duy-phong.webp",
    slogan: { vi: "Lắp ráp phần cứng và bảo trì hệ thống", en: "Hardware assembly and system maintenance" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Ngọc Thảo",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/thao.webp",
    slogan: { vi: "Hậu cần đội tuyển và truyền thông sự kiện", en: "Team logistics and event outreach" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Nguyễn Hoàng Anh",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/hoang-anh.webp",
    slogan: { vi: "Thử nghiệm cơ cấu nạp và bắn bóng", en: "Intake and launch mechanism testing" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  {
    name: "Phạm Đức Vinh",
    role: { vi: "Thành viên", en: "Member" },
    src: "/Images/Teams/vinh.webp",
    slogan: { vi: "Kiểm tra hệ thống điện và cảm biến", en: "Electrical wiring and sensor validation" },
    classInfo: { vi: "Khóa 2026", en: "Class of 2026" },
    tags: ["#FTC2026", "#STEM", "#Innovation"],
  },
  ...pendingPhotoMembers,
];
