"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Building2,
  Check,
  Copy,
  ExternalLink,
  HeartHandshake,
  QrCode,
  ShieldCheck,
  Wrench,
  Cpu,
  FileCheck2,
} from "lucide-react";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  fundraisingBank,
  fundraisingCategoryTotals,
  fundraisingCorporateFormUrl,
  fundraisingCopy,
  fundraisingItems,
  fundraisingQrImage,
  fundraisingTotal,
  type FundraisingCategoryId,
} from "@/data/fundraising";
import { contactEmail, contactLeadName, contactPhone } from "@/data/settings";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { AnalyticsEvents } from "@/lib/posthog/events";

const categoryIcons: Record<FundraisingCategoryId, typeof Cpu> = {
  hardware: Cpu,
  tools: Wrench,
  fees: FileCheck2,
};

const formatVnd = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function FundraisingClient() {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  const transferNoteText = fundraisingCopy.transferNoteValue[locale];

  const handleCopyNote = async () => {
    const ok = await copyToClipboard(transferNoteText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasBankDetails = Boolean(
    fundraisingBank.bankName &&
      fundraisingBank.accountNumber &&
      fundraisingBank.accountHolder,
  );

  return (
    <>
      <PageAnalytics
        event={AnalyticsEvents.FUNDRAISING_PAGE_VIEWED}
        surface="/fundraising"
      />

      <main className="relative min-w-0 bg-background text-foreground py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl space-y-16 md:space-y-24">
          {/* Hero Section */}
          <section className="text-center space-y-6 pt-4">
            <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary tracking-wide uppercase">
              {fundraisingCopy.badge[locale]}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance max-w-3xl mx-auto">
              {fundraisingCopy.title[locale]}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {fundraisingCopy.lead[locale]}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto">
              <GlowCard hover={false} className="p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {fundraisingCopy.goalLabel[locale]} (VNĐ)
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold text-primary">
                  {formatVnd(fundraisingTotal.vnd)}
                </div>
              </GlowCard>

              <GlowCard hover={false} className="p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {fundraisingCopy.goalLabel[locale]} (USD)
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold text-primary">
                  {formatUsd(fundraisingTotal.usd)}
                </div>
              </GlowCard>

              <GlowCard hover={false} className="p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {fundraisingCopy.itemsLabel[locale]}
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold text-primary">
                  {fundraisingItems.length}
                </div>
              </GlowCard>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <CTAButton
                label={fundraisingCopy.ctaDonate[locale]}
                variant="primary"
                href="#donate"
              />
              <CTAButton
                label={fundraisingCopy.ctaCorporate[locale]}
                variant="secondary"
                href="#corporate"
              />
            </div>
          </section>

          {/* Budget Categories Breakdown */}
          <section id="budget" className="space-y-8">
            <SectionHeader
              title={fundraisingCopy.budgetTitle[locale]}
              subtitle={fundraisingCopy.budgetSubtitle[locale]}
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fundraisingCategoryTotals.map((cat) => {
                const Icon = categoryIcons[cat.id];
                return (
                  <GlowCard key={cat.id} className="flex flex-col justify-between p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          {cat.percent}%
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">
                          {cat.name[locale]}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {cat.description[locale]}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground font-medium">
                        {formatUsd(cat.usd)}
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {formatVnd(cat.vnd)}
                      </span>
                    </div>
                  </GlowCard>
                );
              })}
            </div>

            {/* Detail items table */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
                <h3 className="text-base font-bold text-foreground">
                  {fundraisingCopy.itemsTitle[locale]}
                </h3>
                <span className="text-xs text-muted-foreground">
                  7 / 7 {fundraisingCopy.itemsLabel[locale].toLowerCase()}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-muted/10 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-semibold">
                        {locale === "vi" ? "Hạng mục" : "Item"}
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-center w-16">
                        {fundraisingCopy.qtyLabel[locale]}
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-right">
                        USD
                      </th>
                      <th scope="col" className="px-6 py-3 font-semibold text-right">
                        VNĐ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {fundraisingItems.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-foreground">
                            {item.name[locale]}
                          </div>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                            >
                              <span>{fundraisingCopy.viewProduct[locale]}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center text-muted-foreground font-mono">
                          {item.qty}
                        </td>
                        <td className="px-4 py-4 text-right text-muted-foreground font-mono">
                          {formatUsd(item.totalUsd)}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-foreground font-mono">
                          {formatVnd(item.totalVnd)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-border bg-muted/20 font-bold">
                    <tr>
                      <th scope="row" className="px-6 py-4 text-foreground">
                        {locale === "vi" ? "Tổng cộng" : "Total"}
                      </th>
                      <td className="px-4 py-4 text-center text-muted-foreground font-mono">
                        {fundraisingItems.reduce((acc, i) => acc + i.qty, 0)}
                      </td>
                      <td className="px-4 py-4 text-right text-primary font-mono">
                        {formatUsd(fundraisingTotal.usd)}
                      </td>
                      <td className="px-6 py-4 text-right text-primary font-mono text-base">
                        {formatVnd(fundraisingTotal.vnd)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>

          {/* Donation Channels Section */}
          <section id="donate" className="space-y-8">
            <SectionHeader
              title={fundraisingCopy.donateTitle[locale]}
              subtitle={fundraisingCopy.donateSubtitle[locale]}
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Personal donation card */}
              <GlowCard className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {fundraisingCopy.personalTitle[locale]}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {locale === "vi" ? "Ủng hộ tự do, mọi tấm lòng" : "Open contribution"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {fundraisingCopy.personalBody[locale]}
                  </p>

                  {/* QR Image Box */}
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card">
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-lg overflow-hidden border border-border bg-white p-2">
                      <Image
                        src={fundraisingQrImage}
                        alt={fundraisingCopy.qrAlt[locale]}
                        width={256}
                        height={256}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                    <span className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                      <QrCode className="h-3.5 w-3.5 text-primary" />
                      {locale === "vi" ? "Quét bằng app ngân hàng / ví điện tử" : "Scan with mobile banking app"}
                    </span>
                  </div>

                  {/* Transfer Note helper */}
                  <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                      <span>{fundraisingCopy.transferNote[locale]}</span>
                      <button
                        type="button"
                        onClick={handleCopyNote}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                        aria-label="Copy transfer note"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-medium">
                              {locale === "vi" ? "Đã chép" : "Copied"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>{locale === "vi" ? "Sao chép" : "Copy"}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-mono text-sm font-bold text-foreground select-all break-all bg-background px-3 py-2 rounded-lg border border-border">
                      {transferNoteText}
                    </p>
                  </div>

                  {/* Optional Bank Details if configured */}
                  {hasBankDetails && (
                    <div className="space-y-2 text-xs border-t border-border pt-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{fundraisingCopy.bankName[locale]}:</span>
                        <span className="font-semibold text-foreground">{fundraisingBank.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{fundraisingCopy.accountNumber[locale]}:</span>
                        <span className="font-mono font-semibold text-foreground">{fundraisingBank.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{fundraisingCopy.accountHolder[locale]}:</span>
                        <span className="font-semibold text-foreground">{fundraisingBank.accountHolder}</span>
                      </div>
                    </div>
                  )}
                </div>
              </GlowCard>

              {/* Corporate sponsorship card */}
              <div id="corporate" className="h-full">
                <GlowCard className="p-6 sm:p-8 flex flex-col justify-between space-y-6 h-full">
                  <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {fundraisingCopy.corporateTitle[locale]}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {locale === "vi" ? "Đồng hành chính thức cùng đội thi" : "Official partnership"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {fundraisingCopy.corporateBody[locale]}
                  </p>

                  <div className="space-y-3 rounded-xl border border-border bg-muted/20 p-4 text-sm">
                    <div className="font-semibold text-foreground">
                      {locale === "vi" ? "Quyền lợi tài trợ bao gồm:" : "Sponsor benefits include:"}
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
                      <li>
                        {locale === "vi"
                          ? "Logo đặt trên robot thi đấu và áo đồng phục đội"
                          : "Logo placement on competition robot and team apparel"}
                      </li>
                      <li>
                        {locale === "vi"
                          ? "Nhắc tên trong toàn bộ bài viết, video truyền thông"
                          : "Public acknowledgment across media channels and videos"}
                      </li>
                      <li>
                        {locale === "vi"
                          ? "Báo cáo tài chính định kỳ về hiệu quả sử dụng nguồn tài trợ"
                          : "Periodic financial reports on sponsorship utilization"}
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <CTAButton
                      label={fundraisingCopy.corporateForm[locale]}
                      variant="primary"
                      href={fundraisingCorporateFormUrl[locale]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Direct contact info */}
                <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="font-semibold text-foreground">
                    {locale === "vi" ? "Trao đổi trực tiếp với ban phụ trách:" : "Direct liaison:"}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{contactLeadName}</span> •{" "}
                    <a
                      href={`tel:${contactPhone}`}
                      className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                    >
                      {contactPhone}
                    </a>
                  </div>
                  <div>
                    Email:{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
              </GlowCard>
              </div>
            </div>
          </section>

          {/* Transparency & Contact */}
          <section className="space-y-6">
            <GlowCard hover={false} className="p-6 sm:p-8 bg-muted/20 border-primary/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0 mt-0.5 sm:mt-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {fundraisingCopy.transparencyTitle[locale]}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      {fundraisingCopy.transparencyBody[locale]}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                  <CTAButton
                    label={fundraisingCopy.contactCta[locale]}
                    variant="secondary"
                    href="/contact-us"
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
            </GlowCard>
          </section>
        </div>
      </main>
    </>
  );
}
