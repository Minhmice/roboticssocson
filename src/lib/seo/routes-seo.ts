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

export const fundraisingSeo: Record<Locale, RouteSeo> = {
  vi: {
    title: "Gây quỹ mùa giải 2025-2026 | Robotics Sóc Sơn",
    description:
      "Cùng hỗ trợ đội Robotics Sóc Sơn chuẩn bị cho giải đấu FIRST Tech Challenge với ngân sách minh bạch từng hạng mục.",
    canonicalPath: "/fundraising",
    keywords: [
      "gây quỹ robotics sóc sơn",
      "ủng hộ robotics",
      "tài trợ FTC",
      "STEM Sóc Sơn",
      "Robotics Sóc Sơn fundraising",
    ],
  },
  en: {
    title: "Season 2025-2026 Fundraising | Robotics Sóc Sơn",
    description:
      "Support Robotics Sóc Sơn as we prepare for the FIRST Tech Challenge with transparent itemized budget allocations.",
    canonicalPath: "/fundraising",
    keywords: [
      "Robotics Soc Son fundraising",
      "support robotics",
      "FTC sponsorship",
      "STEM Soc Son",
      "Robotics Soc Son",
    ],
  },
};

export const recruitmentSeo: Record<Locale, RouteSeo> = {
  vi: {
    title: "Đợt tuyển thành viên đã kết thúc | Robotics Sóc Sơn",
    description:
      "Robotics Sóc Sơn đã kết thúc đợt tuyển thành viên RBS 4.0. Theo dõi các kênh chính thức của đội để cập nhật đợt tuyển tiếp theo.",
    canonicalPath: "/recruitment",
    keywords: [
      "tuyển thành viên robotics sóc sơn",
      "RBS 4.0",
      "FTC robotics team",
      "STEM Sóc Sơn",
    ],
  },
  en: {
    title: "Member Recruitment Closed | Robotics Sóc Sơn",
    description:
      "Robotics Sóc Sơn has concluded the RBS 4.0 member recruitment drive. Follow our official channels for updates on upcoming recruitments.",
    canonicalPath: "/recruitment",
    keywords: [
      "Robotics Soc Son recruitment",
      "RBS 4.0",
      "FTC robotics team",
      "STEM Soc Son",
    ],
  },
};
