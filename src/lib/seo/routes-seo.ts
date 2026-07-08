import type { Locale, RouteSeo } from "./metadata";

export const homeSeo: Record<Locale, RouteSeo> = {
  vi: {
    title: "Robotics Sóc Sơn | Đội FIRST Tech Challenge Hà Nội",
    description:
      "Đội robotics trung học Sóc Sơn thi đấu FIRST Tech Challenge — thành tích, sứ mệnh STEM và khóa học Từ Khối Lệnh Đến Phần Cứng.",
    keywords: [
      "Robotics Sóc Sơn",
      "FIRST Tech Challenge",
      "FTC",
      "STEM",
      "Hà Nội",
      "khóa học Scratch Arduino",
    ],
    canonicalPath: "/",
  },
  en: {
    title: "Robotics Sóc Sơn | FIRST Tech Challenge Team — Hanoi",
    description:
      "High school robotics team from Sóc Sơn competing in FIRST Tech Challenge — achievements, STEM mission, and From Blocks to Hardware course.",
    keywords: [
      "Robotics Soc Son",
      "FIRST Tech Challenge",
      "FTC",
      "STEM",
      "Hanoi",
      "Scratch Arduino course",
    ],
    canonicalPath: "/",
  },
};
