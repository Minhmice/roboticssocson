import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseHeroImage = {
  readonly src: string;
  readonly alt: LocalizedText;
  readonly caption: LocalizedText;
};

export type CourseHeroData = {
  readonly badge: LocalizedText;
  readonly headline: LocalizedText;
  readonly lead: LocalizedText;
  readonly ctaPrimary: LocalizedText;
  readonly ctaSecondary: LocalizedText;
  readonly chips: readonly LocalizedText[];
  readonly heroImage: CourseHeroImage;
  readonly proofLine: LocalizedText;
};

export const courseHeroData: CourseHeroData = {
  badge: {
    vi: "Tiểu học & THCS · phân tầng Cấp 1–2",
    en: "Primary & lower secondary · Level 1–2 tracks",
  },
  headline: {
    vi: "Từ Khối Lệnh Đến Phần Cứng",
    en: "From Blocks to Hardware",
  },
  lead: {
    vi: "Giúp con dành ít thời gian màn hình thụ động — bằng cách tự tay lắp mạch và chế tạo sản phẩm thật, qua hành trình Scratch → flowchart → mBlock → Arduino → cảm biến. Không cần kinh nghiệm trước; giáo viên hướng dẫn từng bước.",
    en: "Help your child spend less time on passive screens — by building real circuits and projects, through Scratch → flowcharts → mBlock → Arduino → sensors. No prior experience needed; teachers guide every step.",
  },
  ctaPrimary: {
    vi: "Xem lộ trình",
    en: "View curriculum",
  },
  ctaSecondary: {
    vi: "Hỏi lịch học & học phí",
    en: "Ask about schedule & fees",
  },
  chips: [
    {
      vi: "12 buổi thực hành",
      en: "12 hands-on sessions",
    },
    {
      vi: "Kit dùng trong lớp",
      en: "Class kit provided",
    },
  ],
  heroImage: {
    src: "/Images/Mission/Image (2).webp",
    alt: {
      vi: "Học sinh Robotics Sóc Sơn thiết kế và lắp ráp mạch Arduino",
      en: "Robotics Sóc Sơn students designing and assembling an Arduino circuit",
    },
    caption: {
      vi: "Thực hành lắp mạch — không chỉ xem màn hình",
      en: "Hands-on circuits — not just screen time",
    },
  },
  proofLine: {
    vi: "Đội Robotics Sóc Sơn · giám sát trong lớp",
    en: "Robotics Sóc Sơn team · supervised in class",
  },
} as const;
