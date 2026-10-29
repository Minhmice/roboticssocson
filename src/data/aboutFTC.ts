/**
 * AboutFTC section data
 * Includes all bilingual content (Vietnamese and English)
 */

import type { ImageGalleryLayout } from "@/components/shared/ImageGallery";
import { Clock, Target, Box, Users, Award, PersonStanding } from "lucide-react";
import { LucideIcon } from "lucide-react";

import type { Localized } from "@/lib/i18n/localized";

export interface FTCFeatureImage {
  readonly caption: Localized<string>;
  readonly src?: string;
}

export interface FTCFeature {
  readonly icon: LucideIcon;
  readonly title: Localized<string>;
  readonly description: Localized<string>;
  readonly iconColor: string;
  readonly bgColor: string;
  readonly imageLayout: ImageGalleryLayout;
  readonly images: readonly FTCFeatureImage[];
}

export interface FTCStat {
  readonly icon: LucideIcon;
  readonly label: Localized<string>;
  readonly value: string;
}

export interface FTCHeader {
  readonly badge: string;
  readonly title: Localized<string>;
  readonly subtitle: Localized<string>;
}

export const ftcHeader: FTCHeader = {
  badge: "FIRST Tech Challenge",
  title: { vi: "FIRST Tech Challenge là gì?", en: "What is FTC?" },
  subtitle: { vi: "Cuộc thi robotics yêu cầu kỹ thuật cao, tập trung vào STEM và kỹ năng thế kỷ 21", en: "High-tech robotics competition focused on STEM and 21st century skills" },
} as const;

export const ftcFeatures: readonly FTCFeature[] = [
  {
    icon: Clock,
    title: { vi: "Mùa giải DECODE™ 2025-2026", en: "DECODE™ 2025-2026 Season" },
    description: { vi: "Mùa giải bắt đầu kickoff 06/09/2025. Robot cần đáp ứng tiêu chuẩn kỹ thuật cao để thi đấu.", en: "Season starts with kickoff on September 6, 2025. Robots must meet high technical standards to compete." },
    iconColor: "text-primary",
    bgColor: "bg-primary/[0.08]",
    imageLayout: "1",
    images: [
      {
        caption: { vi: "Mùa giải DECODE™ 2025-2026", en: "DECODE™ 2025-2026 Season" },
        src: "/Images/About FTC/1.1.webp",
      },
    ],
  },
  {
    icon: Target,
    title: { vi: "Cuộc thi Robotics Khối 7-12", en: "Robotics Competition for Grades 7-12" },
    description: { vi: "Giải robotics cho học sinh từ lớp 7 đến lớp 12, nơi các đội (tối đa 15 thành viên) thiết kế, chế tạo, lập trình và vận hành robot.", en: "Robotics competition for students from grade 7 to 12, where teams (max 15 members) design, build, program and operate robots." },
    iconColor: "text-primary",
    bgColor: "bg-primary/5",
    imageLayout: "2",
    images: [
      {
        caption: { vi: "Sân đấu giải robotics khối 7-12", en: "Competition field for grades 7-12" },
        src: "/Images/About FTC/2.1.webp",
      },
      {
        caption: { vi: "Các đội chuẩn bị thi đấu", en: "Teams preparing for matches" },
        src: "/Images/About FTC/2.2.webp",
      },
    ],
  },
  {
    icon: Box,
    title: { vi: "Robot 18x18x18 inch", en: "18x18x18 inch Robot" },
    description: { vi: 'Robot phải lọt trong khối 18"×18"×18" khi xuất phát, sau đó có thể mở rộng theo giới hạn trong Competition Manual.', en: "Robot must fit in an 18x18x18 inch cube at match start, then can expand within Competition Manual limits." },
    iconColor: "text-primary",
    bgColor: "bg-primary/[0.08]",
    imageLayout: "4",
    images: [
      {
        caption: { vi: "Khối giới hạn 18x18x18 inch", en: "18x18x18 inch starting cube sizing" },
        src: "/Images/About FTC/3.1.webp",
      },
      {
        caption: { vi: "Kiểm tra kích thước kỹ thuật", en: "Technical robot sizing inspection" },
        src: "/Images/About FTC/3.2.webp",
      },
      {
        caption: { vi: "Khung cơ khí chuẩn thi đấu", en: "Competition-spec chassis build" },
        src: "/Images/About FTC/3.3.webp",
      },
      {
        caption: { vi: "Cơ cấu mở rộng sau xuất phát", en: "Post-start expansion mechanism" },
        src: "/Images/About FTC/3.4.webp",
      },
    ],
  },
  {
    icon: Users,
    title: { vi: "Mô hình Liên minh", en: "Alliance Model" },
    description: { vi: "Các đội thi đấu theo mô hình liên minh, tăng cường kỹ năng hợp tác và làm việc nhóm.", en: "Teams compete in alliance model, fostering collaboration and teamwork skills." },
    iconColor: "text-primary",
    bgColor: "bg-primary/[0.08]",
    imageLayout: "1",
    images: [
      {
        caption: { vi: "Mô hình liên minh thi đấu", en: "Alliance competition match" },
        src: "/Images/About FTC/4.1.webp",
      },
    ],
  },
  {
    icon: Award,
    title: { vi: "Kỹ năng Kỹ thuật & Thiết kế", en: "Technical & Design Skills" },
    description: { vi: "Chương trình nhấn mạnh kỹ năng kỹ thuật, tư duy thiết kế, làm việc nhóm và tinh thần thi đấu công bằng.", en: "Program emphasizes technical skills, design thinking, teamwork and sportsmanship." },
    iconColor: "text-primary",
    bgColor: "bg-primary/[0.08]",
    imageLayout: "1",
    images: [
      {
        caption: { vi: "Tư duy kỹ thuật và thiết kế", en: "Engineering notebook and design iteration" },
        src: "/Images/About FTC/5.1.webp",
      },
    ],
  },
] as const;

export const ftcStats: readonly FTCStat[] = [
  {
    label: { vi: "Đội tối đa", en: "Max Teams" },
    value: "15",
    icon: Users,
  },
  {
    label: { vi: "Học sinh khối", en: "Grades" },
    value: "7-12",
    icon: PersonStanding,
  },
  {
    label: { vi: "Kích thước robot", en: "Robot Size" },
    value: '18"',
    icon: Target,
  },
  {
    label: { vi: "Mùa giải", en: "Season" },
    value: "2025",
    icon: Clock,
  },
] as const;
