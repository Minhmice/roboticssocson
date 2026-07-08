import type { Locale, RouteSeo } from "./metadata";

export const courseSeo: Record<Locale, RouteSeo> = {
  vi: {
    title: "Từ Khối Lệnh Đến Phần Cứng | Robotics Sóc Sơn",
    description:
      "Khóa STEM 12 buổi cho học sinh cấp 1–2: từ Scratch và flowchart đến mBlock, Arduino và dự án phần cứng thật — Robotics Sóc Sơn.",
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
      "A 12-session STEM course for grades 1–2: from Scratch and flowcharts to mBlock, Arduino, and real hardware projects — Robotics Sóc Sơn.",
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
