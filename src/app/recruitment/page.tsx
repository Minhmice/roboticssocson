import { buildMetadata } from "@/lib/seo/metadata";
import RecruitmentClient from "./RecruitmentClient";

export const metadata = buildMetadata({
  title: "Đơn tuyển thành viên RBS 4.0 | Robotics Sóc Sơn",
  description:
    "Điền đơn tuyển thành viên RBS 4.0 của Robotics Sóc Sơn. Chọn ban Cơ khí - Thiết kế, Code - Điện tử hoặc Truyền thông.",
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
