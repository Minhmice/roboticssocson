"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedSection, AnimatedGrid } from "@/components/shared/AnimatedComponents";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { budgetItems, budgetTotal } from "@/data/budget";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function BudgetFundraisingSection() {
  const { locale } = useLanguage();

  const summaryCategories = [
    {
      name: locale === "vi" ? "Phần cứng Robot" : "Robot Hardware",
      percentage: 72,
      amount: Math.round(budgetTotal.usd * 0.72),
    },
    {
      name: locale === "vi" ? "Hoạt động Cộng đồng" : "Community Activities",
      percentage: 14,
      amount: Math.round(budgetTotal.usd * 0.14),
    },
    {
      name: locale === "vi" ? "Công cụ & Vật tư" : "Tools & Materials",
      percentage: 8,
      amount: Math.round(budgetTotal.usd * 0.08),
    },
    {
      name: locale === "vi" ? "Lệ phí Đăng ký" : "Registration Fees",
      percentage: 6,
      amount: Math.round(budgetTotal.usd * 0.06),
    },
  ];

  return (
    <section id="budget-section" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Budget"
          title={
            locale === "vi"
              ? "Ngân sách minh bạch: Chúng em cần gì"
              : "Transparent budget: What we need"
          }
          subtitle={
            locale === "vi"
              ? "Tất cả 13 items đều cần thiết cho robot thi đấu FTC 2024-2025"
              : "All 13 items are essential for our FTC 2024-2025 competition robot"
          }
          align="center"
        />

        {/* Summary Cards */}
        <AnimatedGrid className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.1}>
          {summaryCategories.map((cat, idx) => (
            <AnimatedCard key={idx} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{cat.name}</p>
                <p className="text-xs text-primary">{cat.percentage}%</p>
              </div>
              <p className="text-2xl font-bold text-primary">${cat.amount}</p>
              <Progress value={cat.percentage} className="h-1 mt-2" />
            </AnimatedCard>
          ))}
        </AnimatedGrid>

        {/* Full Budget Table */}
        <AnimatedSection className="mt-12">
          <AnimatedCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-card/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground sticky left-0 bg-card/50">
                      {locale === "vi" ? "Hạng mục" : "Item"}
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                      {locale === "vi" ? "SL" : "Qty"}
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                      {locale === "vi" ? "Đơn giá" : "Unit Price"} (USD)
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                      Total (USD)
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                      Total (VND)
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budgetItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-border hover:bg-card/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-foreground sticky left-0 bg-background">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                        {item.qty}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                        ${item.unitPrice}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">
                        ${item.totalUsd}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-foreground">
                        {item.totalVnd.toLocaleString("vi-VN")} đ
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total and Pledge */}
            <div className="px-6 py-6 bg-card/50 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">
                    {locale === "vi" ? "Tổng cộng" : "Total"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    ${budgetTotal.usd.toLocaleString()}
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">
                    {budgetTotal.vnd.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {locale === "vi"
                  ? "Cam kết sử dụng mọi đồng minh bạch, hiệu quả. Báo cáo tài chính hàng quý cho nhà tài trợ."
                  : "We commit to using every dollar transparently and effectively. Quarterly financial reports to sponsors."}
              </p>
            </div>
          </AnimatedCard>
        </AnimatedSection>
      </div>
    </section>
  );
}

