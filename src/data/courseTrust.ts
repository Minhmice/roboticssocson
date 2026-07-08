import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseReview = {
  readonly quote: LocalizedText;
  readonly name: LocalizedText;
  readonly role: LocalizedText;
};

export type CourseMentor = {
  readonly name: LocalizedText;
  readonly title: LocalizedText;
  readonly bio: LocalizedText;
  readonly photoSrc?: string;
};

// TODO(GSC-launch): replace placeholder quotes/names with real parent/student testimonials + consent.
export const courseReviews: readonly CourseReview[] = [
  {
    quote: {
      vi: "Con hết sợ dùng tay lắp mạch — buổi học nào cũng muốn mang đồ về nhà làm tiếp.",
      en: "My child is no longer afraid of wiring circuits — they want to keep building at home after every class.",
    },
    name: { vi: "Phụ huynh học viên (placeholder)", en: "Parent of a student (placeholder)" },
    role: { vi: "Phụ huynh · Cấp 1", en: "Parent · Primary" },
  },
  {
    quote: {
      vi: "Lộ trình Scratch → Arduino rất rõ. Giáo viên giải thích flowchart trước khi code giúp con tự tin hơn.",
      en: "The Scratch → Arduino path is clear. Teachers explain flowcharts before code, which builds confidence.",
    },
    name: { vi: "Phụ huynh học viên (placeholder)", en: "Parent of a student (placeholder)" },
    role: { vi: "Phụ huynh · THCS", en: "Parent · Lower secondary" },
  },
  {
    quote: {
      vi: "Thích nhất là làm dự án thật với cảm biến — không chỉ kéo thả cho vui.",
      en: "The best part was real sensor projects — not just drag-and-drop for fun.",
    },
    name: { vi: "Học viên (placeholder)", en: "Student (placeholder)" },
    role: { vi: "Học viên · Cấp 2", en: "Student · Level 2" },
  },
] as const;

// TODO(GSC-launch): publish real mentor names/photos with consent before public trust claims.
export const courseMentors: readonly CourseMentor[] = [
  {
    name: { vi: "Mentor đội Robotics Sóc Sơn", en: "Robotics Sóc Sơn mentor" },
    title: {
      vi: "Giảng viên / mentor lớp STEM",
      en: "STEM class instructor / mentor",
    },
    bio: {
      vi: "Thành viên đội FTC — giám sát an toàn trong lớp, hướng dẫn Scratch đến Arduino. Hồ sơ cá nhân sẽ được cập nhật khi chốt lịch khai giảng.",
      en: "FTC team member — in-class safety supervision, Scratch through Arduino guidance. Individual bios will be published when enrollment opens.",
    },
  },
  {
    name: { vi: "Mentor kỹ thuật phần cứng", en: "Hardware mentor" },
    title: {
      vi: "Hỗ trợ mạch & cảm biến",
      en: "Circuits & sensors support",
    },
    bio: {
      vi: "Đồng hành khi học viên lắp mBlock/Arduino và kiểm tra kit trong mỗi buổi thực hành.",
      en: "Supports students during mBlock/Arduino builds and checks kits each hands-on session.",
    },
  },
] as const;
