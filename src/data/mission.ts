/**
 * Mission & Vision Data
 * Input data for Mission component
 */

export type MissionItem = {
  type: "text" | "image" | "value" | "stats";
  id: string;
  title_vi?: string;
  title_en?: string;
  content_vi?: string;
  content_en?: string;
  // Mobile grid span classes (e.g., "col-span-2")
  mobileSpan?: string;
  span: string; // Grid span classes (e.g., "md:col-span-2 md:row-span-2")
  height?: string; // Desktop height class (e.g., "md:h-[500px]")
  mobileHeight?: string; // Mobile min-height class (e.g., "min-h-[200px]")
  icon?: string; // Icon name for Lucide icons
  caption_vi?: string;
  caption_en?: string;
  color?: string; // Gradient color classes
  bgColor?: string; // Background color on hover
  animation?: string;
};

export const missionData: readonly MissionItem[] = [
  // Mission - Large text card
  {
    type: "text",
    id: "mission",
    title_vi: "Sứ mệnh",
    title_en: "Our Mission",
    content_vi:
      "Mục tiêu và sứ mệnh của Robotics Sóc Sơn khi tham gia FIRST Tech Challenge là phát triển năng lực khoa học – kỹ thuật của học sinh thông qua trải nghiệm thực tiễn, đồng thời lan tỏa tinh thần STEM đến cộng đồng học sinh tại Sóc Sơn và khu vực lân cận.\n\nĐội hướng tới việc xây dựng một môi trường học tập sáng tạo, nơi mỗi thành viên được khuyến khích tư duy độc lập, hợp tác nhóm và giải quyết vấn đề bằng công nghệ.\n\nTham gia FIRST không chỉ là hành trình chinh phục thử thách kỹ thuật, mà còn là cơ hội để Robotics Sóc Sơn rèn luyện bản lĩnh, tinh thần chuyên nghiệp và ý thức trách nhiệm xã hội – trở thành những người trẻ sẵn sàng đóng góp cho tương lai công nghệ Việt Nam.",
    content_en:
      "The goal and mission of Robotics Sóc Sơn in participating in the FIRST Tech Challenge is to develop students' scientific and technical abilities through hands-on experience, while promoting the spirit of STEM within the student community in Sóc Sơn and surrounding areas.\n\nThe team aims to build a creative learning environment where every member is encouraged to think independently, collaborate effectively, and solve problems through technology.\n\nFor Robotics Sóc Sơn, joining FIRST is not only a journey of overcoming technical challenges but also an opportunity to cultivate professionalism, resilience, and social responsibility — shaping young innovators ready to contribute to Vietnam's technological future.",
    span: "col-span-2 md:col-span-2 md:row-span-2",
    mobileHeight: "min-h-[300px]",
    height: "md:h-[450px]",
    icon: "Target",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-900/20",
  },
  // Image 1
  {
    type: "image",
    id: "image-1",
    mobileSpan: "col-span-2",
    span: "md:col-span-2 md:row-span-1",
    mobileHeight: "h-[200px]",
    height: "md:h-[215px]",
    caption_vi: "Robotics Sóc Sơn - Hoạt động đội",
    caption_en: "Robotics Sóc Sơn - Team activities",
  },
  // Vision - Medium text card
  {
    type: "text",
    id: "vision",
    title_vi: "Tầm nhìn",
    title_en: "Our Vision",
    content_vi:
      "Tạo ra một thế hệ học sinh am hiểu công nghệ, đam mê sáng tạo và có khả năng đóng góp tích cực cho xã hội.",
    content_en:
      "Create a generation of tech-savvy students passionate about innovation and capable of making positive contributions to society.",
    mobileSpan: "col-span-1",
    span: "md:col-span-2 md:row-span-1",
    mobileHeight: "h-[200px]",
    height: "md:h-[215px]",
    icon: "Rocket",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-900/20",
  },
  // Image 2
  {
    type: "image",
    id: "image-2",
    mobileSpan: "col-span-2",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    mobileHeight: "h-[200px]",
    height: "md:h-[215px]",
    caption_vi: "Robotics Sóc Sơn - Thiết kế và lắp ráp",
    caption_en: "Robotics Sóc Sơn - Design and assembly",
  },
  // Image 3
  {
    type: "image",
    id: "image-3",
    mobileSpan: "col-span-2",
    span: "col-span-2 md:col-span-2 md:row-span-1",
    mobileHeight: "min-h-[150px]",
    height: "md:h-[215px]",
    caption_vi: "Robotics Sóc Sơn - Làm việc nhóm",
    caption_en: "Robotics Sóc Sơn - Team collaboration",
  },
  // Core Value 1 - Dynamic
  {
    type: "value",
    id: "value-dynamic",
    title_vi: "Năng động",
    title_en: "Dynamic",
    content_vi:
      "Luôn sẵn sàng đón nhận thách thức mới và thích ứng nhanh chóng",
    content_en: "Always ready to embrace new challenges and adapt quickly",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    mobileSpan: "col-span-2",
    mobileHeight: "h-[200px]",
    height: "md:h-[215px]",
    icon: "Target",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-900/20",
    animation: "bento2-float 6s ease-in-out infinite",
  },
  // Core Value 2 - Creative
  {
    type: "value",
    id: "value-creative",
    title_vi: "Sáng tạo",
    title_en: "Creative",
    content_vi: "Tư duy đổi mới, giải pháp sáng tạo và ý tưởng độc đáo",
    content_en: "Innovative thinking, creative solutions, and unique ideas",
    mobileSpan: "col-span-2",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    mobileHeight: "min-h-[150px]",
    height: "md:h-[215px]",
    icon: "Rocket",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-900/20",
    animation: "bento2-pulse 4s ease-in-out infinite",
  },
  // Image 4
  {
    type: "image",
    id: "image-4",
    mobileSpan: "col-span-2",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    mobileHeight: "min-h-[150px]",
    height: "md:h-[215px]",
    caption_vi: "Robotics Sóc Sơn - Thử nghiệm robot",
    caption_en: "Robotics Sóc Sơn - Robot testing",
  },
  // Core Value 3 - Discovery
  {
    type: "value",
    id: "value-discovery",
    title_vi: "Khám phá",
    title_en: "Discovery",
    content_vi:
      "Không ngừng khám phá tri thức và mở rộng giới hạn của bản thân",
    content_en:
      "Continuously exploring knowledge and pushing personal boundaries",
    mobileSpan: "col-span-2",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    mobileHeight: "min-h-[150px]",
    height: "md:h-[215px]",
    icon: "Heart",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-900/20",
    animation: "bento2-tilt 5.5s ease-in-out infinite",
  },
  // Image 5 - Achievements
  {
    type: "image",
    id: "image-5",
    mobileSpan: "col-span-2",
    span: "md:col-span-1 md:row-span-1",
    mobileHeight: "h-[200px]",
    height: "md:h-[215px]",
    caption_vi: "Robotics Sóc Sơn - Thành tích và giải thưởng",
    caption_en: "Robotics Sóc Sơn - Achievements and awards",
  },
] as const;
