import { buildMetadata } from "@/lib/seo/metadata";
import FundraisingClient from "./FundraisingClient";

export const metadata = buildMetadata({
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
});

export default function FundraisingPage() {
  return <FundraisingClient />;
}
