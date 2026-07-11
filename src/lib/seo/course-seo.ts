import type { Locale, RouteSeo } from "./metadata";

export const courseSeo: Record<Locale, RouteSeo> = {
  vi: {
    title: "Từ Khối Lệnh Đến Phần Cứng | Robotics Sóc Sơn",
    description:
      "Khóa STEM 16 buổi cho học sinh cấp 1–2: từ Scratch và flowchart đến mBlock, Arduino và dự án phần cứng thật. Học phí trọn khóa 2.000.000đ — Robotics Sóc Sơn.",
    keywords: [
      "Scratch",
      "mBlock",
      "Arduino",
      "STEM",
      "robotics",
      "Sóc Sơn",
      "khóa học lập trình",
    ],
    canonicalPath: "/course",
  },
  en: {
    title: "From Blocks to Hardware | Robotics Sóc Sơn",
    description:
      "A 16-session STEM course for grades 1–2: from Scratch and flowcharts to mBlock, Arduino, and real hardware projects. Full course fee 2,000,000 VND — Robotics Sóc Sơn.",
    keywords: [
      "Scratch",
      "mBlock",
      "Arduino",
      "STEM",
      "robotics",
      "Soc Son",
      "coding course",
    ],
    canonicalPath: "/course",
  },
};
