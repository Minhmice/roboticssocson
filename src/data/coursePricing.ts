import type { LocalizedText } from "@/lib/course/getLocalized";

/** Single-package tuition — Option 1 (no tiers, no comparison table). */
export const coursePricingConfig = {
  sessionCount: 16,
  fullPriceVnd: 2_000_000,
  perSessionVnd: 125_000,
  currencyCode: "VND",
} as const;

export type CoursePricingBenefit = {
  id: string;
  text: LocalizedText;
};

export const coursePricingCopy = {
  heroTeaser: {
    vi: "16 buổi · 125.000đ/buổi",
    en: "16 sessions · 125,000 VND/session",
  },
  eyebrow: {
    vi: "Học phí trọn khóa",
    en: "Full-course tuition",
  },
  title: {
    vi: "Một hành trình trọn vẹn từ lập trình đến robot",
    en: "One complete journey from code to robot",
  },
  priceDisplay: {
    vi: "2.000.000đ",
    en: "2,000,000 VND",
  },
  supporting: {
    vi: "Trọn khóa 16 buổi · 125.000đ/buổi",
    en: "Full 16-session course · 125,000 VND per session",
  },
  transparency: {
    vi: "Học phí trọn khóa — không phát sinh chi phí ẩn trong chương trình. Chi tiết lịch học và địa điểm xác nhận khi đăng ký.",
    en: "One full-course fee — no hidden program charges. Schedule and venue are confirmed when you register.",
  },
  ctaPrimary: {
    vi: "Đăng ký giữ chỗ",
    en: "Reserve your spot",
  },
  ctaSecondary: {
    vi: "Xem lộ trình 16 buổi",
    en: "View 16-session curriculum",
  },
  stickyLabel: {
    vi: "2.000.000đ · Đăng ký",
    en: "2,000,000 VND · Register",
  },
  onboardHint: {
    vi: "Điền form 1–2 phút · đội phản hồi trong 24–48 giờ",
    en: "Form takes 1–2 minutes · team replies within 24–48 hours",
  },
} as const;

/**
 * Benefits sourced from confirmed course copy (hero, FAQ, outcomes).
 * Does not claim certificates, take-home kits, or bundled materials unless verified elsewhere.
 */
export const coursePricingBenefits: readonly CoursePricingBenefit[] = [
  {
    id: "sessions",
    text: {
      vi: "16 buổi thực hành có mục tiêu và sản phẩm mỗi buổi",
      en: "16 hands-on sessions with goals and a product each time",
    },
  },
  {
    id: "levels",
    text: {
      vi: "Phân tầng cấp 1–2 trong cùng lớp",
      en: "Level 1 and Level 2 tracks in one class",
    },
  },
  {
    id: "class-kit",
    text: {
      vi: "Kit linh kiện dùng trong lớp",
      en: "Class kit provided for in-session use",
    },
  },
  {
    id: "journey",
    text: {
      vi: "Scratch → flowchart → mBlock → Arduino → cảm biến",
      en: "Scratch → flowcharts → mBlock → Arduino → sensors",
    },
  },
  {
    id: "mentorship",
    text: {
      vi: "Giám sát bởi đội Robotics Sóc Sơn",
      en: "Supervised by the Robotics Sóc Sơn team",
    },
  },
] as const;

/**
 * TODO(curriculum): Marketing states 16 sessions; `courseLessons` in courseCurriculum.ts
 * currently defines 12 lessons. Add sessions 13–16 content before launch — do not fabricate here.
 */
export const courseCurriculumSessionMismatchNote =
  "CURRICULUM_MISMATCH: courseLessons has 12 entries; marketing/sessionCount is 16." as const;
