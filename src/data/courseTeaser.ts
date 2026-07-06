import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseTeaserStep = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

export const courseTeaserCopy = {
  badge: { vi: "Khóa học STEM", en: "STEM course" },
  title: {
    vi: "Từ Khối Lệnh Đến Phần Cứng",
    en: "From Blocks to Hardware",
  },
  subtitle: {
    vi: "Thực hành Scratch → Arduino thay vì chỉ xem màn hình — 12 buổi cho học sinh cấp 1–2.",
    en: "Hands-on Scratch → Arduino instead of passive screens — 12 sessions for grades 1–2.",
  },
  cta: { vi: "Xem khóa học", en: "View course" },
} as const;

export const courseTeaserSteps: CourseTeaserStep[] = [
  {
    id: "logic",
    title: { vi: "Logic", en: "Logic" },
    description: {
      vi: "Scratch và flowchart — hiểu tư duy lập trình trước khi code.",
      en: "Scratch and flowcharts — programming thinking before coding.",
    },
  },
  {
    id: "hardware",
    title: { vi: "Phần cứng", en: "Hardware" },
    description: {
      vi: "mBlock và Arduino — LED, cảm biến, servo trên mạch thật.",
      en: "mBlock and Arduino — LEDs, sensors, servos on real circuits.",
    },
  },
  {
    id: "capstone",
    title: { vi: "Dự án", en: "Capstone" },
    description: {
      vi: "Thùng rác thông minh hoặc cảnh báo lùi xe — sản phẩm trình bày được.",
      en: "Smart bin or parking warning — a product you can present.",
    },
  },
];
