"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { budgetItems, budgetTotal } from "@/data/budget";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Download } from "lucide-react";

export default function BudgetSection() {
  const { t } = useLanguage();

  return (
    <section id="budget" className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge={t("budget.badge")}
          title={t("budget.title")}
          subtitle={t("budget.subtitle")}
          align="center"
        />

        {/* Table */}
        <div className="mt-12 overflow-x-auto">
          <GlowCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-400 sticky left-0 bg-slate-900/50">
                      {t("budget.item")}
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-400">
                      {t("budget.qty")}
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-400">
                      Unit Price (USD)
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

            {/* Summary */}
            <Separator className="bg-slate-800 my-4" />
            <div className="px-4 py-6 bg-slate-900/50">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-100">
                  {t("budget.total")}
                </span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">
                    ${budgetTotal.usd.toLocaleString()} USD
                  </p>
                  <p className="text-lg text-slate-400 mt-1">
                    {budgetTotal.vnd.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="px-4 pb-6">
              <p className="text-xs text-slate-500 text-center">
                {t("budget.transparency")}
              </p>
            </div>
          </GlowCard>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button variant="primary" size="lg" asChild>
            <a href="/contact">
              <Download className="mr-2 h-4 w-4" />
              {t("contact.submit")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

