"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedSection } from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import { budgetItems, budgetTotal } from "@/data/budget";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Download } from "lucide-react";

export default function BudgetSection() {
  const { locale } = useLanguage();

  return (
    <section id="budget" className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Budget"
          title={
            locale === "vi"
              ? "Ngân sách chi tiết FTC 2024-2025"
              : "Detailed FTC 2024-2025 Budget"
          }
          subtitle={
            locale === "vi"
              ? "13 hạng mục cần thiết cho robot thi đấu và hoạt động team"
              : "13 essential items for competition robot and team activities"
          }
          align="center"
        />

        {/* Table */}
        <AnimatedSection className="mt-12 overflow-x-auto">
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
                      Unit Price (USD)
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

            {/* Summary */}
            <Separator className="bg-border my-4" />
            <div className="px-4 py-6 bg-card/50">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">
                  {locale === "vi" ? "Tổng cộng" : "Total"}
                </span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ${budgetTotal.usd.toLocaleString()} USD
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">
                    {budgetTotal.vnd.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="px-4 pb-6">
              <p className="text-xs text-muted-foreground text-center">
                {locale === "vi"
                  ? "Cam kết sử dụng mọi đồng minh bạch, hiệu quả. Báo cáo tài chính hàng quý cho nhà tài trợ."
                  : "We commit to using every dollar transparently and effectively. Quarterly financial reports to sponsors."}
              </p>
            </div>
          </AnimatedCard>
        </AnimatedSection>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button variant="default" size="lg" asChild>
            <a href="/contact">
              <Download className="mr-2 h-4 w-4" />
              {locale === "vi" ? "Liên hệ tài trợ" : "Contact for Sponsorship"}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

