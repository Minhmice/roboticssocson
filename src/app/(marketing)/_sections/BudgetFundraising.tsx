"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { budgetItems, budgetTotal } from "@/data/budget";
import { ExternalLink, CheckCircle2 } from "lucide-react";

export default function BudgetFundraisingSection() {
  const { locale } = useLanguage();

  const summaryCategories = [
    {
      name: locale === "vi" ? "Robot Parts" : "Linh kiện Robot",
      percentage: 70,
      amount: (budgetTotal.usd * 0.7).toFixed(0),
    },
    {
      name: locale === "vi" ? "Competition Fees" : "Phí thi đấu",
      percentage: 15,
      amount: (budgetTotal.usd * 0.15).toFixed(0),
    },
    {
      name: locale === "vi" ? "Training & Maintenance" : "Đào tạo & Bảo dưỡng",
      percentage: 10,
      amount: (budgetTotal.usd * 0.1).toFixed(0),
    },
    {
      name: locale === "vi" ? "Contingency" : "Dự phòng",
      percentage: 5,
      amount: (budgetTotal.usd * 0.05).toFixed(0),
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
              ? "Tất cả 10 items đều cần thiết cho robot thi đấu FTC 2024-2025"
              : "All 10 items are essential for our FTC 2024-2025 competition robot"
          }
          align="center"
        />

        {/* Summary Cards */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCategories.map((cat, idx) => (
            <GlowCard key={idx} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-400">{cat.name}</p>
                <p className="text-xs text-cyan-400">{cat.percentage}%</p>
              </div>
              <p className="text-2xl font-bold text-cyan-400">${cat.amount}</p>
              <Progress value={cat.percentage} className="h-1 mt-2" />
            </GlowCard>
          ))}
        </div>

        {/* Full Budget Table */}
        <div className="mt-12">
          <GlowCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-400 sticky left-0 bg-slate-900/50">
                      {locale === "vi" ? "Hạng mục" : "Item"}
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-400">
                      {locale === "vi" ? "SL" : "Qty"}
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-400">
                      {locale === "vi" ? "Đơn giá" : "Unit Price"} (USD)
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-400">
                      Total (USD)
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-400">
                      Total (VND)
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-400">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budgetItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-slate-800 hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-slate-300 sticky left-0 bg-slate-950">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-slate-400">
                        {item.qty}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-slate-400">
                        ${item.unitPrice}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-slate-300">
                        ${item.totalUsd}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-slate-300">
                        {item.totalVnd.toLocaleString("vi-VN")} đ
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
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
            <div className="px-6 py-6 bg-slate-900/50 border-t border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span className="text-lg font-semibold text-slate-100">
                    {locale === "vi" ? "Tổng cộng" : "Total"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-cyan-400">
                    ${budgetTotal.usd.toLocaleString()}
                  </p>
                  <p className="text-lg text-slate-400 mt-1">
                    {budgetTotal.vnd.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                {locale === "vi"
                  ? "Cam kết sử dụng mọi đồng minh bạch, hiệu quả. Báo cáo tài chính hàng quý cho nhà tài trợ."
                  : "We commit to using every dollar transparently and effectively. Quarterly financial reports to sponsors."}
              </p>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

