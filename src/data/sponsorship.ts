/**
 * Sponsorship data for WhySponsor and Sponsorship sections
 * Includes all bilingual content (Vietnamese and English)
 */

// ========== Why Sponsor Section Data ==========

export interface WhySponsorCardContent {
  readonly content_vi: string;
  readonly content_en: string;
}

export interface WhySponsorCardBenefit {
  readonly text_vi: string;
  readonly text_en: string;
}

export type WhySponsorCardType = "full" | "two-col" | "benefits-list";

export interface WhySponsorCard {
  readonly id: string;
  readonly type: WhySponsorCardType;
  readonly icon: string; // Icon name from lucide-react
  readonly title_vi: string;
  readonly title_en: string;
  readonly content_vi?: string;
  readonly content_en?: string;
  readonly paragraph1_vi?: string;
  readonly paragraph1_en?: string;
  readonly paragraph2_vi?: string;
  readonly paragraph2_en?: string;
  readonly intro_vi?: string;
  readonly intro_en?: string;
  readonly benefits?: readonly WhySponsorCardBenefit[];
}

export const whySponsorCards: readonly WhySponsorCard[] = [
  // Card 1
  {
    id: "educational-impact",
    type: "full",
    icon: "GraduationCap",
    title_vi: "Tác động giáo dục & xã hội",
    title_en: "Educational & Social Impact",
    paragraph1_vi:
      "Trong bối cảnh thế giới phát triển nhanh chóng, nơi STEM và đổi mới công nghệ đóng vai trò then chốt trong giáo dục và sự tiến bộ xã hội, việc đồng hành cùng Robotics Sóc Sơn mang lại tác động đầy ý nghĩa. Sự hỗ trợ của nhà tài trợ giúp học sinh được trải nghiệm trực quan, thực hành sâu rộng trong robotics và STEM, đồng thời rèn luyện tư duy phản biện, khả năng sáng tạo và kỹ năng giải quyết vấn đề theo nhóm — những năng lực thiết yếu để thành công trong kỷ nguyên số và định hình các nghề nghiệp tương lai.",
    paragraph1_en:
      "In today's rapidly evolving world, where STEM and technological innovation are pivotal to education and societal progress, collaborating with Robotics Sóc Sơn delivers meaningful impact. Your support empowers students to engage in immersive, hands-on experiences in robotics and STEM, while cultivating critical thinking, creativity, and collaborative problem-solving — indispensable competencies for succeeding in the digital age and shaping future careers.",
    paragraph2_vi:
      "Hơn thế nữa, sự hợp tác này thể hiện cam kết của doanh nghiệp trong việc thúc đẩy giáo dục STEM và phát triển cộng đồng bền vững, truyền cảm hứng cho thế hệ trẻ Việt Nam tiếp nhận đổi mới, theo đuổi xuất sắc trong công nghệ và định hướng tư duy tiên phong.",
    paragraph2_en:
      "Furthermore, this partnership underscores a company's dedication to advancing STEM education and fostering sustainable community development, inspiring Vietnam's youth to embrace innovation, technological excellence, and forward-thinking solutions.",
  },

  // Card 2
  {
    id: "brand-visibility",
    type: "two-col",
    icon: "Megaphone",
    title_vi: "Hình ảnh thương hiệu & Nhận diện",
    title_en: "Brand Visibility & Recognition",
    intro_vi:
      "Đồng hành cùng Robotics Sóc Sơn, doanh nghiệp sẽ nhận được cơ hội tăng cường nhận diện thương hiệu trong cộng đồng giáo dục STEM và robotics. Các quyền lợi bao gồm:",
    intro_en:
      "By partnering with Robotics Sóc Sơn, your organization will gain opportunities to enhance brand recognition within the STEM and robotics education community. Key benefits include:",
  },
  // Card 3
  {
    id: "community-engagement",
    type: "two-col",
    icon: "Users",
    title_vi: "Cộng đồng và ảnh hưởng địa phương",
    title_en: "Community Engagement",
    content_vi:
      "Hỗ trợ Robotics Sóc Sơn giúp doanh nghiệp tiếp cận trực tiếp cộng đồng học sinh và giáo viên địa phương, đồng thời thúc đẩy phong trào STEM và đổi mới sáng tạo trong khu vực. Hỗ trợ đội của chúng tôi đồng nghĩa với việc đầu tư vào giáo dục địa phương và truyền cảm hứng cho thế hệ trẻ Sóc Sơn theo đuổi công nghệ và đổi mới sáng tạo.",
    content_en:
      "Supporting Robotics Sóc Sơn allows your organization to engage directly with local students and educators, while promoting STEM education and innovation within the community. Supporting our team means investing in local education and inspiring young minds in the Sóc Sơn community to pursue technology and innovation.",
  },
  // Card 4
  {
    id: "brand-benefits",
    type: "benefits-list",
    icon: "Award",
    title_vi: "Quyền lợi",
    title_en: "Benefits",
    benefits: [
      {
        text_vi: "Logo xuất hiện trên robot thi đấu và banner của đội",
        text_en: "Logo placement on team's robots and event banners",
      },
      {
        text_vi:
          "Quảng bá trên các nền tảng truyền thông chính thức: mạng xã hội, website và video sự kiện",
        text_en:
          "Promotion through official media channels: social media, website, and event videos",
      },
      {
        text_vi:
          "Nhắc tên và giới thiệu thương hiệu tại các sự kiện, workshop, buổi trình diễn robot",
        text_en:
          "Brand mention and introduction at events, workshops, and robot demonstrations",
      },
      {
        text_vi:
          "Gắn thương hiệu với các giá trị tích cực: đổi mới, sáng tạo, giáo dục STEM và trách nhiệm xã hội",
        text_en:
          "Association with positive values: innovation, creativity, STEM education, and social responsibility",
      },
      {
        text_vi:
          "Cơ hội tiếp xúc trực tiếp với học sinh, giáo viên và các đội thi khác, tạo điều kiện quảng bá thương hiệu một cách sinh động và gần gũi",
        text_en:
          "Direct engagement with students, educators, and other participating teams, providing a tangible and interactive way to showcase your brand",
      },
    ],
  },
  // Card 5
  {
    id: "transparency",
    type: "full",
    icon: "Shield",
    title_vi: "Tính minh bạch & chuyên nghiệp",
    title_en: "Transparency & Professionalism",
    content_vi:
      "Đội Robotics Sóc Sơn cam kết sử dụng mọi khoản tài trợ đúng mục đích, hiệu quả và minh bạch, đồng thời thường xuyên cập nhật tiến độ, kết quả và báo cáo tài chính tới nhà tài trợ. Sự chuyên nghiệp này đảm bảo rằng đóng góp của doanh nghiệp được tận dụng tối đa và tạo niềm tin lâu dài.",
    content_en:
      "Robotics Sóc Sơn is committed to using all sponsorship funds responsibly, effectively, and transparently, while providing regular updates on progress, achievements, and financial reports to sponsors. This professional approach ensures that your contribution is maximized and trusted for long-term impact.",
  },
] as const;

// Why Sponsor section header
export interface WhySponsorHeader {
  readonly badge_vi: string;
  readonly badge_en: string;
  readonly title_vi: string;
  readonly title_en: string;
  readonly subtitle_vi: string;
  readonly subtitle_en: string;
}

export const whySponsorHeader: WhySponsorHeader = {
  badge_vi: "Benefits",
  badge_en: "Benefits",
  title_vi: "Lý do nên tài trợ",
  title_en: "Why sponsor us?",
  subtitle_vi:
    "Đầu tư vào giáo dục STEM, tạo impact bền vững cho thế hệ trẻ Việt Nam",
  subtitle_en:
    "Invest in STEM education, create lasting impact for Vietnam's youth",
} as const;

// ========== Sponsorship Section Data ==========

export interface SponsorshipBenefit {
  readonly icon: string; // Icon name from lucide-react
  readonly title_vi: string;
  readonly title_en: string;
  readonly description_vi: string;
  readonly description_en: string;
}

export const benefits: readonly SponsorshipBenefit[] = [
  {
    icon: "Building2",
    title_vi: "Logo trên robot",
    title_en: "Logo on Robot",
    description_vi:
      "Logo của bạn sẽ được in và dán trên robot thi đấu, hiển thị tại mọi sự kiện và cuộc thi.",
    description_en:
      "Your logo will be printed and placed on our competition robot, displayed at all events and competitions.",
  },
  {
    icon: "Megaphone",
    title_vi: "Quảng bá truyền thông",
    title_en: "Media Promotion",
    description_vi:
      "Được nhắc đến và quảng bá trên website, mạng xã hội và video sự kiện của đội.",
    description_en:
      "Mentioned and promoted on our website, social media, and event videos.",
  },
  {
    icon: "Users",
    title_vi: "Tương tác cộng đồng",
    title_en: "Community Engagement",
    description_vi:
      "Cơ hội tham gia và tương tác trực tiếp với học sinh, giáo viên tại các sự kiện STEM.",
    description_en:
      "Opportunity to participate and engage directly with students and educators at STEM events.",
  },
  {
    icon: "Star",
    title_vi: "Ghi nhận đặc biệt",
    title_en: "Special Recognition",
    description_vi:
      "Được vinh danh và nhắc đến tại các buổi trao giải, workshop và sự kiện của đội.",
    description_en:
      "Honored and mentioned at award ceremonies, workshops, and team events.",
  },
  {
    icon: "BarChart",
    title_vi: "Báo cáo minh bạch",
    title_en: "Transparent Reporting",
    description_vi:
      "Nhận báo cáo định kỳ về tiến độ, thành tích và sử dụng ngân sách tài trợ.",
    description_en:
      "Receive regular reports on progress, achievements, and sponsorship fund usage.",
  },
] as const;
