"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  AnimatedCard,
  AnimatedSection,
  AnimatedGrid,
} from "@/components/shared/AnimatedComponents";
import { ProgressWithLabel } from "@/components/shared/ProgressWithLabel";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  budgetItems,
  budgetTotal,
  budgetCategories,
  getCategoryAmount,
} from "@/data/budget";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function BudgetFundraisingSection() {
  const { locale } = useLanguage();

  const summaryCategories = budgetCategories.map((cat) => {
    const amount = getCategoryAmount(cat.percentage);
    return {
      name: locale === "vi" ? cat.name_vi : cat.name_en,
      percentage: cat.percentage,
      amount: amount.usd,
    };
  });

  return (
    <section id="budget-section" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          badge="Budget"
          title={
            locale === "vi"
              ? "Ngân sách minh bạch: Chúng em cần gì"
              : "Transparent budget: What we need"
          }
          subtitle={
            locale === "vi"
              ? "Tất cả 11 linh kiện đều cần thiết cho robot thi đấu FTC 2025-2026"
              : "All 11 components are essential for our FTC 2025-2026 competition robot"
          }
          align="center"
        />

        {/* Summary Cards */}
        <AnimatedGrid
          className="grid grid-cols-2 gap-4 sm:gap-3 md:gap-6"
          staggerDelay={0.1}
        >
          {summaryCategories.map((cat, idx) => (
            <AnimatedCard key={idx} className="">
              <div className="mb-6">
                <p className="text-sm md:text-base text-muted-foreground line-clamp-1 mb-1">
                  {cat.name}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  ${cat.amount.toLocaleString("en-US")}
                </p>
              </div>
              <ProgressWithLabel
                value={cat.percentage}
                label={`${cat.percentage}%`}
                className="h-4 md:h-6 border border-primary/30"
              />
            </AnimatedCard>
          ))}
        </AnimatedGrid>

        {/* Full Budget Table */}
        <AnimatedSection className="mt-6">
          <AnimatedCard>
            <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-lg border">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="w-full border-collapse min-w-[700px]">
                  <thead className="bg-card/50 relative z-30">
                    <tr>
                      <th className="px-3 py-2.5 sm:px-4 sm:py-3 text-left text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground sticky left-0 bg-card z-[30] shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
                        {locale === "vi" ? "Hạng mục" : "Item"}
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground whitespace-nowrap relative z-10">
                        {locale === "vi" ? "SL" : "Qty"}
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-right text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground whitespace-nowrap relative z-10">
                        {locale === "vi" ? "Đơn giá" : "Unit"} (USD)
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-right text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground whitespace-nowrap relative z-10">
                        Total (USD)
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-right text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground whitespace-nowrap relative z-10">
                        Total (VND)
                      </th>
                      <th className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground relative z-10">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetItems.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-border hover:bg-card/30 transition-colors relative"
                      >
                        <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-[11px] sm:text-xs md:text-sm text-foreground sticky left-0 bg-background z-[20] shadow-[2px_0_4px_rgba(0,0,0,0.1)] min-w-[140px] sm:min-w-[160px] max-w-[200px]">
                          <span className="line-clamp-2">{item.name}</span>
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center text-[11px] sm:text-xs md:text-sm text-muted-foreground whitespace-nowrap relative z-0">
                          {item.qty}
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-right text-[11px] sm:text-xs md:text-sm text-muted-foreground whitespace-nowrap relative z-0">
                          ${item.unitPrice}
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-right text-[11px] sm:text-xs md:text-sm text-foreground font-medium whitespace-nowrap relative z-0">
                          ${item.totalUsd}
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-right text-[11px] sm:text-xs md:text-sm text-foreground font-medium whitespace-nowrap relative z-0">
                          {item.totalVnd.toLocaleString("vi-VN")} đ
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-center relative z-0">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 text-primary hover:text-primary/80 transition-colors p-1 rounded hover:bg-primary/10"
                            aria-label="External link"
                          >
                            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total and Pledge */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 bg-card/50 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                  <span className="text-base sm:text-lg md:text-3xl font-bold text-foreground">
                    {locale === "vi" ? "Tổng cộng" : "Total"}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">
                    ${budgetTotal.usd.toLocaleString()}
                  </p>
                  <p className="text-sm sm:text-lg text-muted-foreground mt-1">
                    {budgetTotal.vnd.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
              <div className="sm:text-md text-muted-foreground text-center space-y-1.5 sm:space-y-1 leading-relaxed">
                <p>
                  {locale === "vi"
                    ? "Danh sách trên là các khoản tối thiểu để đội có thể tham gia giải đấu FTC."
                    : "The above list covers the minimum essentials for our team to participate in the FTC competition."}
                </p>
                <p>
                  {locale === "vi"
                    ? "Các trang thiết bị này cũng có thể phục vụ cho những giải đấu khác trong tương lai."
                    : "These items may also be useful for future competitions beyond FTC."}
                </p>
                <p>
                  {locale === "vi"
                    ? "Cam kết sử dụng mọi khoản tài trợ một cách minh bạch, hiệu quả. Báo cáo tài chính định kỳ gửi tới nhà tài trợ."
                    : "We commit to using every donation transparently and efficiently. Regular financial reports will be sent to sponsors."}
                </p>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
