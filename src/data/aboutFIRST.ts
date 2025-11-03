/**
 * AboutFIRST section data
 * Includes all bilingual content (Vietnamese and English)
 */

import { Users, GraduationCap, Rocket, Globe } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface FIRSTImpactItem {
  readonly icon: LucideIcon;
  readonly value: string;
  readonly label_vi: string;
  readonly label_en: string;
}

export interface FIRSTHeader {
  readonly badge: string;
  readonly title_vi: string;
  readonly title_en: string;
  readonly subtitle_vi: string;
  readonly subtitle_en: string;
}

export interface FIRSTImageCaption {
  readonly caption_vi: string;
  readonly caption_en: string;
}

export const firstHeader: FIRSTHeader = {
  badge: "About FIRST",
  title_vi: "Về FIRST®",
  title_en: "About FIRST®",
  subtitle_vi: "Tổ chức phi lợi nhuận truyền cảm hứng STEM toàn cầu",
  subtitle_en: "International nonprofit inspiring STEM worldwide",
} as const;

export const firstInfoCard = {
  title_vi: "Tổ chức phi lợi nhuận quốc tế",
  title_en: "International Nonprofit",
  paragraph1_vi:
    "FIRST® (For Inspiration and Recognition of Science and Technology) được thành lập năm 1989 tại Hoa Kỳ bởi nhà phát minh Dean Kamen, với sứ mệnh truyền cảm hứng cho thế hệ trẻ theo đuổi khoa học, công nghệ, kỹ thuật và toán học (STEM).",
  paragraph1_en:
    "FIRST® is an international nonprofit founded in 1989 by inventor Dean Kamen, with the mission to inspire young people to pursue interests in science, technology, engineering, and mathematics (STEM).",
  paragraph2_vi:
    "FIRST tổ chức nhiều chương trình và cuộc thi robotics ở các cấp độ khác nhau: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) và FIRST Robotics Competition (FRC).",
  paragraph2_en:
    "FIRST organizes robotics programs at different levels: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) and FIRST Robotics Competition (FRC).",
  host_vi: "Vietnam",
  host_en: "Việt Nam",
  hostOrganization: "FPT University",
} as const;

export const firstImpactCard = {
  title_vi: "Tác động toàn cầu",
  title_en: "Global Impact",
  impactItems: [
    {
      icon: Users,
      value: "1M+",
      label_vi: "hơn 1 triệu học sinh toàn cầu tham gia",
      label_en: "over 1 million students worldwide participate",
    },
    {
      icon: GraduationCap,
      value: "$80M+",
      label_vi: "80 triệu đôla học bổng đại học",
      label_en: "$80 million in university scholarships",
    },
    {
      icon: Rocket,
      value: "Thousands",
      label_vi: "hàng nghìn đội thi trên toàn cầu",
      label_en: "thousands of teams globally",
    },
  ] as readonly FIRSTImpactItem[],
  footer_vi:
    "Mỗi học sinh phát triển kỹ năng lãnh đạo, tư duy phản biện và tinh thần đồng đội — những giá trị thiết yếu cho tương lai.",
  footer_en:
    "Each student develops leadership, critical thinking, and teamwork — essential values for the future.",
} as const;

export const firstImages: readonly FIRSTImageCaption[] = [
  {
    caption_vi: "Cuộc thi FIRST Robotics",
    caption_en: "FIRST Robotics Competition",
  },
  {
    caption_vi: "Học sinh tham gia STEM",
    caption_en: "Students in STEM",
  },
  {
    caption_vi: "Robot thi đấu",
    caption_en: "Competition Robots",
  },
  {
    caption_vi: "Sân đấu FIRST",
    caption_en: "FIRST Field",
  },
  {
    caption_vi: "Không khí sự kiện",
    caption_en: "Event Atmosphere",
  },
] as const;

