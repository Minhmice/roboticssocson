"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedSection } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, Megaphone, Users, Shield, Target, Award } from "lucide-react";

export default function WhySponsorSection() {
  const { locale } = useLanguage();

  const educationalImpact = {
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
  };

  const brandVisibility = {
    title_vi: "Hình ảnh thương hiệu & Nhận diện",
    title_en: "Brand Visibility & Recognition",
    intro_vi:
      "Đồng hành cùng Robotics Sóc Sơn, doanh nghiệp sẽ nhận được cơ hội tăng cường nhận diện thương hiệu trong cộng đồng giáo dục STEM và robotics. Các quyền lợi bao gồm:",
    intro_en:
      "By partnering with Robotics Sóc Sơn, your organization will gain opportunities to enhance brand recognition within the STEM and robotics education community. Key benefits include:",
    benefits: [
      {
        text_vi: "Logo xuất hiện trên robot thi đấu và banner của đội",
        text_en: "Logo placement on team's robots and event banners",
      },
      {
        text_vi: "Quảng bá trên các nền tảng truyền thông chính thức: mạng xã hội, website và video sự kiện",
        text_en: "Promotion through official media channels: social media, website, and event videos",
      },
      {
        text_vi: "Nhắc tên và giới thiệu thương hiệu tại các sự kiện, workshop, buổi trình diễn robot",
        text_en: "Brand mention and introduction at events, workshops, and robot demonstrations",
      },
      {
        text_vi: "Gắn thương hiệu với các giá trị tích cực: đổi mới, sáng tạo, giáo dục STEM và trách nhiệm xã hội",
        text_en: "Association with positive values: innovation, creativity, STEM education, and social responsibility",
      },
      {
        text_vi: "Cơ hội tiếp xúc trực tiếp với học sinh, giáo viên và các đội thi khác, tạo điều kiện quảng bá thương hiệu một cách sinh động và gần gũi",
        text_en: "Direct engagement with students, educators, and other participating teams, providing a tangible and interactive way to showcase your brand",
      },
    ],
  };

  const communityEngagement = {
    title_vi: "Cộng đồng và ảnh hưởng địa phương",
    title_en: "Community Engagement",
    content_vi:
      "Hỗ trợ Robotics Sóc Sơn giúp doanh nghiệp tiếp cận trực tiếp cộng đồng học sinh và giáo viên địa phương, đồng thời thúc đẩy phong trào STEM và đổi mới sáng tạo trong khu vực. Hỗ trợ đội của chúng tôi đồng nghĩa với việc đầu tư vào giáo dục địa phương và truyền cảm hứng cho thế hệ trẻ Sóc Sơn theo đuổi công nghệ và đổi mới sáng tạo.",
    content_en:
      "Supporting Robotics Sóc Sơn allows your organization to engage directly with local students and educators, while promoting STEM education and innovation within the community. Supporting our team means investing in local education and inspiring young minds in the Sóc Sơn community to pursue technology and innovation.",
  };

  const transparency = {
    title_vi: "Tính minh bạch & chuyên nghiệp",
    title_en: "Transparency & Professionalism",
    content_vi:
      "Đội Robotics Sóc Sơn cam kết sử dụng mọi khoản tài trợ đúng mục đích, hiệu quả và minh bạch, đồng thời thường xuyên cập nhật tiến độ, kết quả và báo cáo tài chính tới nhà tài trợ. Sự chuyên nghiệp này đảm bảo rằng đóng góp của doanh nghiệp được tận dụng tối đa và tạo niềm tin lâu dài.",
    content_en:
      "Robotics Sóc Sơn is committed to using all sponsorship funds responsibly, effectively, and transparently, while providing regular updates on progress, achievements, and financial reports to sponsors. This professional approach ensures that your contribution is maximized and trusted for long-term impact.",
  };

  return (
    <section id="why-sponsor" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Benefits"
          title={locale === "vi" ? "Lý do nên tài trợ" : "Why sponsor us?"}
          subtitle={
            locale === "vi"
              ? "Đầu tư vào giáo dục STEM, tạo impact bền vững cho thế hệ trẻ Việt Nam"
              : "Invest in STEM education, create lasting impact for Vietnam's youth"
          }
          align="center"
        />

        <div className="mt-12 space-y-8">
          {/* Educational Impact - Full width with 2 paragraphs */}
          <AnimatedCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-16 w-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {locale === "vi" ? educationalImpact.title_vi : educationalImpact.title_en}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {locale === "vi" ? educationalImpact.paragraph1_vi : educationalImpact.paragraph1_en}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {locale === "vi" ? educationalImpact.paragraph2_vi : educationalImpact.paragraph2_en}
                </p>
              </div>
            </div>
          </AnimatedCard>

          {/* Brand Visibility - 2 col layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Brand intro */}
            <AnimatedCard className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Megaphone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {locale === "vi" ? brandVisibility.title_vi : brandVisibility.title_en}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {locale === "vi" ? brandVisibility.intro_vi : brandVisibility.intro_en}
                  </p>
                </div>
              </div>
            </AnimatedCard>

            {/* Community Engagement */}
            <AnimatedCard className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {locale === "vi" ? communityEngagement.title_vi : communityEngagement.title_en}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {locale === "vi" ? communityEngagement.content_vi : communityEngagement.content_en}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Brand Benefits List - Full width */}
          <AnimatedCard className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {brandVisibility.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {locale === "vi" ? benefit.text_vi : benefit.text_en}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Transparency - Full width */}
          <AnimatedCard className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {locale === "vi" ? transparency.title_vi : transparency.title_en}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {locale === "vi" ? transparency.content_vi : transparency.content_en}
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
