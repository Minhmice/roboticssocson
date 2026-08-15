import type { Locale, RouteSeo } from "./metadata";
import { courseSurfacesEnabled } from "@/data/courseRegistration";

export const homeSeo: Record<Locale, RouteSeo> = {
  vi: {
    title: "Robotics Sóc Sơn | Đội FIRST Tech Challenge Hà Nội",
    description: courseSurfacesEnabled
      ? "Đội robotics trung học Sóc Sơn thi đấu FIRST Tech Challenge — thành tích, sứ mệnh STEM và khóa học Từ Khối Lệnh Đến Phần Cứng."
      : "Đội robotics trung học Sóc Sơn thi đấu FIRST Tech Challenge — thành tích và sứ mệnh STEM.",
    keywords: [
      "Robotics Sóc Sơn",
      "FIRST Tech Challenge",
      "FTC",
      "STEM",
      "Hà Nội",
      ...(courseSurfacesEnabled ? ["khóa học Scratch Arduino"] : []),
    ],
    canonicalPath: "/",
  },
  en: {
    title: "Robotics Sóc Sơn | FIRST Tech Challenge Team — Hanoi",
    description: courseSurfacesEnabled
      ? "High school robotics team from Sóc Sơn competing in FIRST Tech Challenge — achievements, STEM mission, and From Blocks to Hardware course."
      : "High school robotics team from Sóc Sơn competing in FIRST Tech Challenge — achievements and STEM mission.",
    keywords: [
      "Robotics Soc Son",
      "FIRST Tech Challenge",
      "FTC",
      "STEM",
      "Hanoi",
      ...(courseSurfacesEnabled ? ["Scratch Arduino course"] : []),
    ],
    canonicalPath: "/",
  },
};
