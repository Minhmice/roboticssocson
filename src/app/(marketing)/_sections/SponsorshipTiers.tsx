"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CTAButton } from "@/components/shared/CTAButton";
import { Check } from "lucide-react";

export default function SponsorshipTiersSection() {
  const { locale } = useLanguage();

  const tiers = [
    {
      name: "Bronze",
      price: "$200-500",
      popular: false,
      features: [
        locale === "vi" ? "Logo trên team banner" : "Logo on team banner",
        locale === "vi" ? "Social media mention" : "Social media mention",
        locale === "vi" ? "Báo cáo hàng quý" : "Quarterly report",
      ],
    },
    {
      name: "Silver",
      price: "$500-1,000",
      popular: false,
      features: [
        locale === "vi" ? "Tất cả quyền lợi Bronze" : "All Bronze benefits",
        locale === "vi" ? "Logo trên robot" : "Logo on robot",
        locale === "vi" ? "Feature trên website" : "Feature on website",
        locale === "vi" ? "Báo cáo hàng tháng" : "Monthly updates",
      ],
    },
    {
      name: "Gold",
      price: "$1,000-2,000",
      popular: true,
      features: [
        locale === "vi" ? "Tất cả quyền lợi Silver" : "All Silver benefits",
        locale === "vi" ? "Nhắc tên tại sự kiện" : "Event name recognition",
        locale === "vi" ? "Video shoutout" : "Video shoutout",
        locale === "vi" ? "Personal updates" : "Personal updates",
      ],
    },
    {
      name: "Platinum",
      price: "$2,000+",
      popular: false,
      features: [
        locale === "vi" ? "Tất cả quyền lợi Gold" : "All Gold benefits",
        locale === "vi" ? "Website homepage feature" : "Website homepage feature",
        locale === "vi" ? "Collaboration videos" : "Collaboration videos",
        locale === "vi" ? "Custom partnership" : "Custom partnership",
      ],
    },
  ];

  return (
    <section id="sponsorship-tiers" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge="Sponsorship"
          title={locale === "vi" ? "Chọn gói tài trợ" : "Choose your sponsorship tier"}
          subtitle={
            locale === "vi"
              ? "Chọn tier → Liên hệ → Chuyển khoản → Nhận updates hàng quý"
              : "Choose tier → Contact → Transfer → Receive quarterly updates"
          }
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <GlowCard
              key={idx}
              className={`p-8 text-center relative ${
                tier.popular ? "border-2 border-cyan-500 scale-105" : ""
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-900">
                  Popular
                </Badge>
              )}
              <h4 className="text-2xl font-bold text-cyan-400 mb-2">
                {tier.name}
              </h4>
              <p className="text-2xl font-bold text-slate-100 mb-6">
                {tier.price}
              </p>
              <ul className="space-y-3 text-left mb-6 min-h-[120px]">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-400">
                    <Check className="text-cyan-400 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Choose {tier.name}
              </Button>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

