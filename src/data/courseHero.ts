import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseHeroData = {
  readonly badge: LocalizedText;
  readonly headline: LocalizedText;
  readonly parentHook: LocalizedText;
  readonly subtitle: LocalizedText;
  readonly ctaPrimary: LocalizedText;
  readonly ctaSecondary: LocalizedText;
  readonly badges: readonly LocalizedText[];
};

export const courseHeroData: CourseHeroData = {
  badge: {
    vi: "Dành cho học sinh cấp 1–2",
    en: "For grades 1–2 students",
  },
  headline: {
    vi: "Từ Khối Lệnh Đến Phần Cứng",
    en: "From Blocks to Hardware",
  },
  parentHook: {
    vi: "Giúp con dành ít thời gian màn hình thụ động — bằng cách tự tay lắp mạch và chế tạo sản phẩm thật.",
    en: "Help your child spend less time on passive screens — by building real circuits and projects with their own hands.",
  },
  subtitle: {
    vi: "Hành trình Scratch → flowchart → mBlock → Arduino → cảm biến → dự án thật.",
    en: "A journey from Scratch → flowcharts → mBlock → Arduino → sensors → real projects.",
  },
  ctaPrimary: {
    vi: "Xem lộ trình",
    en: "View curriculum",
  },
  ctaSecondary: {
    vi: "Đăng ký tư vấn",
    en: "Register for consultation",
  },
  badges: [
    {
      vi: "Cấp 1–2",
      en: "Grades 1–2",
    },
    {
      vi: "12 buổi",
      en: "12 sessions",
    },
    {
      vi: "Học qua thực hành",
      en: "Hands-on learning",
    },
  ],
} as const;
