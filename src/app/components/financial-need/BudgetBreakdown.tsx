"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedGrid } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { Database, Wrench, FileText, Users2, Camera } from "lucide-react";

export default function BudgetBreakdownSection() {
  const { locale } = useLanguage();

  const categories = [
    {
      name_vi: "Phần cứng robot & linh kiện",
      name_en: "Robot Hardware & Components",
      percentage: 72,
      amount: 2579,
      description_vi:
        "Khung, motor, Mecanum wheels, controller, sensors, servo, encoder và các linh kiện cần thiết cho robot thi đấu FTC.",
      description_en:
        "Frame, motors, Mecanum wheels, controller, sensors, servo, encoder and essential components for FTC competition robot.",
      icon: Database,
      color: "from-primary to-primary/80",
    },
    {
      name_vi: "Công cụ & vật tư",
      name_en: "Tools & Materials",
      percentage: 8,
      amount: 300,
      description_vi: "In 3D, công cụ cơ khí, vật tư sửa chữa và bảo trì robot.",
      description_en: "3D printing, mechanical tools, repair and maintenance supplies.",
      icon: Wrench,
      color: "from-chart-2 to-chart-2/80",
    },
    {
      name_vi: "Lệ phí đăng ký & sự kiện",
      name_en: "Registration & Event Fees",
      percentage: 6,
      amount: 200,
      description_vi: "Lệ phí đăng ký FTC Vietnam, phí tham gia sự kiện và competitions.",
      description_en: "FTC Vietnam registration fees, event participation fees and competitions.",
      icon: FileText,
      color: "from-chart-3 to-chart-3/80",
    },
    {
      name_vi: "Hoạt động cộng đồng",
      name_en: "Community Activities",
      percentage: 14,
      amount: 500,
      description_vi:
        "Workshop STEM, robot demo, outreach activities để lan tỏa kiến thức robotics.",
      description_en: "STEM workshops, robot demonstrations, outreach activities to spread robotics knowledge.",
      icon: Users2,
      color: "from-chart-4 to-chart-4/80",
    },
    {
      name_vi: "Truyền thông & tiếp thị",
      name_en: "Media & Marketing",
      percentage: 0,
      amount: 0,
      description_vi: "Ảnh/video, ấn phẩm, nội dung social media và marketing materials (bao gồm trong hoạt động cộng đồng).",
      description_en: "Photos/videos, promotional materials, social media content and marketing materials (included in community activities).",
      icon: Camera,
      color: "from-chart-5 to-chart-5/80",
    },
  ];

  return (
    <section id="budget-breakdown" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Budget"
          title={
            locale === "vi"
              ? "Phân bổ ngân sách theo hạng mục"
              : "Budget Allocation by Category"
          }
          subtitle={
            locale === "vi"
              ? "Chúng em minh bạch về cách sử dụng mọi đồng tài trợ để tạo impact lớn nhất"
              : "We are transparent about how every sponsorship dollar is used for maximum impact"
          }
          align="center"
        />

        {/* Summary Cards */}
        <AnimatedGrid className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-4" staggerDelay={0.1}>
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <AnimatedCard key={idx} className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                  <p className="text-xs text-primary">${category.amount.toLocaleString()}</p>
                </div>
                <p className="text-lg font-bold text-primary mb-2">
                  ${category.amount.toLocaleString()}
                </p>
                <Progress value={category.percentage} className="h-1 mt-3" />
                <p className="text-xs text-muted-foreground mt-3 leading-tight">
                  {locale === "vi" ? category.name_vi : category.name_en}
                </p>
              </AnimatedCard>
            );
          })}
        </AnimatedGrid>

        {/* Detailed Description */}
        <div className="mt-12">
          <AnimatedCard className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {locale === "vi" ? "Chi tiết phân bổ" : "Detailed Breakdown"}
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-foreground mb-1">
                        {locale === "vi" ? category.name_vi : category.name_en}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {locale === "vi" ? category.description_vi : category.description_en}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {category.percentage}%
                        </span>
                        <span className="text-xs text-muted-foreground">
                          • ${category.amount.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}

