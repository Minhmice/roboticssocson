/**
 * Sponsorship section data
 * Benefits and sponsorship tiers
 */

export interface Benefit {
  readonly icon: string; // lucide icon name
  readonly title_vi: string;
  readonly title_en: string;
  readonly description_vi: string;
  readonly description_en: string;
}

export interface SponsorshipTier {
  readonly tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  readonly price_vi: string;
  readonly price_en: string;
  readonly features: readonly string[];
  readonly popular?: boolean;
}

export const benefits: readonly Benefit[] = [
  {
    icon: "Building2",
    title_vi: "Đặt Logo",
    title_en: "Logo Placement",
    description_vi: "Logo xuất hiện trên robot, banner, và tài liệu của đội",
    description_en: "Logo appears on robot, banners, and team materials",
  },
  {
    icon: "Megaphone",
    title_vi: "Quảng bá Truyền thông",
    title_en: "Media Promotion",
    description_vi: "Quảng bá trên mạng xã hội, website và video sự kiện",
    description_en: "Promotion on social media, website, and event videos",
  },
  {
    icon: "Users",
    title_vi: "Tham gia Cộng đồng",
    title_en: "Community Engagement",
    description_vi: "Tiếp cận trực tiếp với học sinh, giáo viên và các đội thi khác",
    description_en: "Direct engagement with students, educators, and other teams",
  },
  {
    icon: "Star",
    title_vi: "Giá trị Thương hiệu",
    title_en: "Brand Values",
    description_vi: "Gắn thương hiệu với đổi mới, sáng tạo và giáo dục STEM",
    description_en: "Associate brand with innovation, creativity, and STEM education",
  },
  {
    icon: "BarChart",
    title_vi: "Báo cáo Minh bạch",
    title_en: "Transparency Reports",
    description_vi: "Báo cáo tài chính và cập nhật tiến độ thường xuyên",
    description_en: "Regular financial reports and progress updates",
  },
] as const;

export const sponsorshipTiers: readonly SponsorshipTier[] = [
  {
    tier: "Bronze",
    price_vi: "$200 - $500",
    price_en: "$200 - $500",
    features: [
      "Logo trên team banner",
      "Social media mention",
      "Báo cáo hàng quý",
    ],
  },
  {
    tier: "Silver",
    price_vi: "$500 - $1,000",
    price_en: "$500 - $1,000",
    features: [
      "Tất cả quyền lợi Bronze",
      "Logo trên robot",
      "Feature trong sponsorship page",
      "Báo cáo hàng tháng",
    ],
  },
  {
    tier: "Gold",
    price_vi: "$1,000 - $2,000",
    price_en: "$1,000 - $2,000",
    features: [
      "Tất cả quyền lợi Silver",
      "Nhắc tên tại sự kiện",
      "Độ ưu tiên hỗ trợ",
      "Video dedicated",
    ],
    popular: true,
  },
  {
    tier: "Platinum",
    price_vi: "$2,000+",
    price_en: "$2,000+",
    features: [
      "Tất cả quyền lợi Gold",
      "Spotlight feature trên website",
      "Collaboration videos",
      "Personalized benefits",
    ],
  },
] as const;

