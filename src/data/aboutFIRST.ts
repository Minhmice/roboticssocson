/**
 * AboutFIRST section data
 * Includes all bilingual content (Vietnamese and English)
 */

import { Users, GraduationCap, Rocket } from "lucide-react";
import { LucideIcon } from "lucide-react";
import type { LocalizedText } from "@/lib/i18n/localized";

export interface FIRSTImpactItem {
  readonly icon: LucideIcon;
  readonly value: string;
  readonly label: LocalizedText;
}

export interface FIRSTHeader {
  readonly badge: string;
  readonly title: LocalizedText;
  readonly subtitle: LocalizedText;
}

export interface FIRSTImageCaption {
  readonly caption: LocalizedText;
}

export const firstHeader: FIRSTHeader = {
  badge: "About FIRST®",
  title: { vi: "Về FIRST®", en: "About FIRST®" },
  subtitle: {
    vi: "Tổ chức phi lợi nhuận truyền cảm hứng STEM toàn cầu",
    en: "International nonprofit inspiring STEM worldwide",
  },
};

export const firstInfoCard = {
  title: {
    vi: "Tổ chức phi lợi nhuận quốc tế",
    en: "International Nonprofit",
  },
  paragraph1: {
    vi: "FIRST® (For Inspiration and Recognition of Science and Technology) được thành lập năm 1989 tại Hoa Kỳ bởi nhà phát minh Dean Kamen, với sứ mệnh truyền cảm hứng cho thế hệ trẻ theo đuổi khoa học, công nghệ, kỹ thuật và toán học (STEM).",
    en: "FIRST® is an international nonprofit founded in 1989 by inventor Dean Kamen, with the mission to inspire young people to pursue interests in science, technology, engineering, and mathematics (STEM).",
  },
  paragraph2: {
    vi: "FIRST tổ chức nhiều chương trình và cuộc thi robotics ở các cấp độ khác nhau: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) và FIRST Robotics Competition (FRC).",
    en: "FIRST organizes robotics programs at different levels: FIRST LEGO League (FLL), FIRST Tech Challenge (FTC) and FIRST Robotics Competition (FRC).",
  },
  host: { vi: "Việt Nam", en: "Vietnam" },
  hostOrganization: "FPT University",
};

export const firstImpactCard = {
  title: { vi: "Tác động toàn cầu", en: "Global Impact" },
  impactItems: [
    {
      icon: Users,
      value: "1M+",
      label: {
        vi: "hơn 1 triệu học sinh toàn cầu tham gia",
        en: "over 1 million students worldwide participate",
      },
    },
    {
      icon: GraduationCap,
      value: "$80M+",
      label: {
        vi: "80 triệu đôla học bổng đại học",
        en: "$80 million in university scholarships",
      },
    },
    {
      icon: Rocket,
      value: "10,000+",
      label: {
        vi: "hàng nghìn đội thi trên toàn cầu",
        en: "thousands of teams globally",
      },
    },
  ] as readonly FIRSTImpactItem[],
  footer: {
    vi: "Mỗi học sinh phát triển kỹ năng lãnh đạo, tư duy phản biện và tinh thần đồng đội — những giá trị thiết yếu cho tương lai.",
    en: "Each student develops leadership, critical thinking, and teamwork — essential values for the future.",
  },
};

export const firstImages: readonly FIRSTImageCaption[] = [
  { caption: { vi: "Cuộc thi FIRST Robotics", en: "FIRST Robotics Competition" } },
  { caption: { vi: "Học sinh tham gia STEM", en: "Students in STEM" } },
  { caption: { vi: "Robot thi đấu", en: "Competition Robots" } },
  { caption: { vi: "Sân đấu FIRST", en: "FIRST Field" } },
  { caption: { vi: "Không khí sự kiện", en: "Event Atmosphere" } },
];
