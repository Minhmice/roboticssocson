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
    title: "Gây quỹ mùa giải 2026–2027 | Robotics Sóc Sơn",
    description:
      "Đồng hành cùng đội FTC #39256 Robotics Sóc Sơn trong mùa BIOBUZZ thuộc FIRST CANOPY với ngân sách phần cứng minh bạch 33.975.000₫.",
    canonicalPath: "/fundraising",
    keywords: [
      "gây quỹ robotics sóc sơn",
      "BIOBUZZ",
      "FIRST CANOPY",
      "tài trợ FTC",
      "STEM Sóc Sơn",
      "Robotics Sóc Sơn fundraising",
    ],
  },
  en: {
    title: "2026–2027 Season Fundraising | Robotics Sóc Sơn",
    description:
      "Support Robotics Sóc Sơn FTC Team #39256 for BIOBUZZ in FIRST CANOPY with a transparent 33,975,000₫ hardware budget.",
    canonicalPath: "/fundraising",
    keywords: [
      "Robotics Soc Son fundraising",
      "BIOBUZZ",
      "FIRST CANOPY",
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
