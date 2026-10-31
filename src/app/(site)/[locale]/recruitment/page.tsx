import { buildMetadata } from "@/lib/seo/metadata";
import RecruitmentClient from "./RecruitmentClient";

export const metadata = buildMetadata({
  title: "Đợt tuyển thành viên đã kết thúc | Robotics Sóc Sơn",
  description:
    "Robotics Sóc Sơn đã kết thúc đợt tuyển thành viên RBS 4.0. Theo dõi các kênh chính thức của đội để cập nhật đợt tuyển tiếp theo.",
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
