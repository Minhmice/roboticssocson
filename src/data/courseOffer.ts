import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseOfferConfig = {
  readonly enabled: boolean;
  readonly headline: LocalizedText;
  readonly body: LocalizedText;
  readonly ctaLabel: LocalizedText;
};

export const courseOfferConfig: CourseOfferConfig = {
  enabled: false,
  headline: {
    vi: "Ưu đãi khai giảng",
    en: "Launch offer",
  },
  body: {
    vi: "Giảm 15% học phí cho 5 suất đăng ký đầu tiên — áp dụng khi mở khóa.",
    en: "15% off tuition for the first 5 registrations — applies when the cohort opens.",
  },
  ctaLabel: {
    vi: "Đăng ký ngay",
    en: "Register now",
  },
} as const;
