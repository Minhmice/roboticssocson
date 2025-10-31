"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  AnimatedCard,
  AnimatedGrid,
} from "@/components/shared/AnimatedComponents";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Database,
  Wrench,
  FileText,
  Users2,
  Camera,
  ArrowRight,
} from "lucide-react";
import {
  budgetCategories,
  getCategoryAmount,
  budgetTotal,
} from "@/data/budget";

// Icon map for lucide-react icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Database,
  Wrench,
  FileText,
  Users2,
  Camera,
};

export default function BudgetBreakdownSection() {
  const { locale } = useLanguage();

  // Map budget categories with calculated amounts
  const categories = budgetCategories.map((cat) => {
    const amount = getCategoryAmount(cat.percentage);
    const Icon = iconMap[cat.icon] || Database;

    return {
      ...cat,
      amount: amount.usd,
      Icon,
    };
  });

  // Scroll to budget table section
  const scrollToBudgetTable = () => {
    const element = document.getElementById("budget-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="budget-breakdown" className="relative py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
        <AnimatedGrid
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          staggerDelay={0.1}
        >
          {categories.map((category, idx) => {
            const Icon = category.Icon;
            return (
              <AnimatedCard key={idx} className="h-full">
                <div className="h-full flex flex-col">
                  {/* Top Section */}
                  <div className="mb-4 flex-1">
                    {/* Category Label */}
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {locale === "vi" ? "NGÂN SÁCH" : "BUDGET"}
                    </p>

                    {/* Main Heading */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                      {locale === "vi" ? category.name_vi : category.name_en}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {locale === "vi"
                        ? category.description_vi
                        : category.description_en}
                    </p>
                  </div>

                  {/* Bottom Section - Bám sát bottom */}
                  <div className="mt-auto">
                    {/* Separator */}
                    <div className="border-t border-border mb-4" />

                    {/* Bottom Content */}
                    <div className="flex items-end justify-between">
                      <div>
                        {/* Metric Label - Percentage of total */}
                        <p className="text-xs text-muted-foreground mb-1">
                          {category.percentage}%{" "}
                          {locale === "vi"
                            ? "tổng ngân sách"
                            : "of total budget"}
                        </p>
                        {/* Value - Amount */}
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          ${category.amount.toLocaleString("en-US")}
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={scrollToBudgetTable}
                        className="h-8 w-8 sm:h-9 sm:w-9 bg-primary/10 hover:bg-primary/20 text-primary justify-center items-center flex transition-colors rounded-full glass-button"
                        aria-label={
                          locale === "vi" ? "Xem chi tiết" : "View details"
                        }
                      >
                        <span className="flex items-center justify-center w-full h-full">
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </AnimatedGrid>

        {/* Detailed Description */}
        <div className="mt-6">
          <AnimatedCard>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {locale === "vi" ? "Chi tiết phân bổ" : "Detailed Breakdown"}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {categories.map((category, idx) => {
                const Icon = category.Icon;
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
                        {locale === "vi"
                          ? category.description_vi
                          : category.description_en}
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
