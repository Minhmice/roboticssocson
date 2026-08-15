import { buildMetadata } from "@/lib/seo/metadata";
import RecruitmentClient from "./RecruitmentClient";

export const metadata = buildMetadata({
  title: "Tuyển thành viên | Robotics Sóc Sơn",
  description:
    "Tham gia Robotics Sóc Sơn. Điền form tuyển thành viên RBS 4.0 và chọn ban Cơ khí - Thiết kế, Code - Điện tử hoặc Truyền thông.",
  keywords: [
    "tuyển thành viên robotics sóc sơn",
    "RBS 4.0",
    "FTC robotics team",
    "STEM Sóc Sơn",
  ],
  canonicalPath: "/recruitment",
});

export default function RecruitmentPage() {
  return <RecruitmentClient />;
}
