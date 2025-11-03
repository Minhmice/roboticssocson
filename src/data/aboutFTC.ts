/**
 * AboutFTC section data
 * Includes all bilingual content (Vietnamese and English)
 */

import type { ImageGalleryLayout } from "@/components/shared/ImageGallery";
import { Clock, Target, Box, Users, Award, PersonStanding } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FTCFeatureImage {
  readonly caption: string;
  readonly src?: string;
}

export interface FTCFeature {
  readonly icon: LucideIcon;
  readonly title_vi: string;
  readonly title_en: string;
  readonly description_vi: string;
  readonly description_en: string;
  readonly iconColor: string;
  readonly bgColor: string;
  readonly imageLayout: ImageGalleryLayout;
  readonly images: readonly FTCFeatureImage[];
}

export interface FTCStat {
  readonly icon: LucideIcon;
  readonly label_vi: string;
  readonly label_en: string;
  readonly value: string;
}

export interface FTCHeader {
  readonly badge: string;
  readonly title_vi: string;
  readonly title_en: string;
  readonly subtitle_vi: string;
  readonly subtitle_en: string;
}

export const ftcHeader: FTCHeader = {
  badge: "FIRST Tech Challenge",
  title_vi: "FIRST Tech Challenge là gì?",
  title_en: "What is FTC?",
  subtitle_vi:
    "Cuộc thi robotics yêu cầu kỹ thuật cao, tập trung vào STEM và kỹ năng thế kỷ 21",
  subtitle_en:
    "High-tech robotics competition focused on STEM and 21st century skills",
} as const;

export const ftcFeatures: readonly FTCFeature[] = [
  {
    icon: Clock,
    title_vi: "Mùa giải DECODE™ 2025-2026",
    title_en: "DECODE™ 2025-2026 Season",
    description_vi:
      "Mùa giải bắt đầu kickoff 06/09/2025. Robot cần đáp ứng tiêu chuẩn kỹ thuật cao để thi đấu.",
    description_en:
      "Season starts with kickoff on September 6, 2025. Robots must meet high technical standards to compete.",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-900/20",
    imageLayout: "1",
    images: [
      { 
        caption: "DECODE™ 2025-2026 Season",
        src: "/Images/About FTC/1.1.jpg"
      },
    ],
  },
  {
    icon: Target,
    title_vi: "Cuộc thi Robotics Khối 7-12",
    title_en: "Robotics Competition for Grades 7-12",
    description_vi:
      "Giải robotics cho học sinh từ lớp 7 đến lớp 12, nơi các đội (tối đa 15 thành viên) thiết kế, chế tạo, lập trình và vận hành robot.",
    description_en:
      "Robotics competition for students from grade 7 to 12, where teams (max 15 members) design, build, program and operate robots.",
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-900/20",
    imageLayout: "2",
    images: [{ caption: "Cuộc thi Robotics Khối 7-12", src: "/Images/About FTC/2.1.jpg" },
    { caption: "Cuộc thi Robotics Khối 7-12", src: "/Images/About FTC/2.2.jpg" }],
  },
  {
    icon: Box,
    title_vi: "Robot 18x18x18 inch",
    title_en: "18x18x18 inch Robot",
    description_vi:
      'Robot phải lọt trong khối 18"×18"×18" khi xuất phát, sau đó có thể mở rộng theo giới hạn trong Competition Manual.',
    description_en:
      "Robot must fit in an 18x18x18 inch cube at match start, then can expand within Competition Manual limits.",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-900/20",
    imageLayout: "4",
    images: [
      { caption: "Robot 18x18x18 inch", src: "/Images/About FTC/3.1.jpg" },
      { caption: "Robot 18x18x18 inch", src: "/Images/About FTC/3.2.jpg" },
      { caption: "Robot 18x18x18 inch", src: "/Images/About FTC/3.3.jpg" },
      { caption: "Robot 18x18x18 inch", src: "/Images/About FTC/3.4.jpg" },
    ],
  },
  {
    icon: Users,
    title_vi: "Mô hình Liên minh",
    title_en: "Alliance Model",
    description_vi:
      "Các đội thi đấu theo mô hình liên minh, tăng cường kỹ năng hợp tác và làm việc nhóm.",
    description_en:
      "Teams compete in alliance model, fostering collaboration and teamwork skills.",
    iconColor: "text-purple-400",
    bgColor: "bg-purple-900/20",
    imageLayout: "1",
    images: [
      { caption: "Mô hình liên minh - Alliance Model", src: "/Images/About FTC/4.1.jpg" },
    ],
  },
  {
    icon: Award,
    title_vi: "Kỹ năng Kỹ thuật & Thiết kế",
    title_en: "Technical & Design Skills",
    description_vi:
      "Chương trình nhấn mạnh kỹ năng kỹ thuật, tư duy thiết kế, làm việc nhóm và tinh thần thi đấu công bằng.",
    description_en:
      "Program emphasizes technical skills, design thinking, teamwork and sportsmanship.",
    iconColor: "text-green-400",
    bgColor: "bg-green-900/20",
    imageLayout: "1",
    images: [
      { caption: "Technical & Design Skills", src: "/Images/About FTC/5.1.jpg" }
    ],
  },
] as const;

export const ftcStats: readonly FTCStat[] = [
  {
    label_vi: "Đội tối đa",
    label_en: "Max Teams",
    value: "15",
    icon: Users,
  },
  {
    label_vi: "Học sinh khối",
    label_en: "Grades",
    value: "7-12",
    icon: PersonStanding,
  },
  {
    label_vi: "Kích thước robot",
    label_en: "Robot Size",
    value: '18"',
    icon: Target,
  },
  {
    label_vi: "Mùa giải",
    label_en: "Season",
    value: "2025",
    icon: Clock,
  },
] as const;
