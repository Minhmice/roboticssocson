"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTAButton } from "@/components/shared/CTAButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { fundraisingCategoryTotals, fundraisingCorporateFormUrl, fundraisingCopy, fundraisingHardwareTotal, fundraisingItems, fundraisingQrImage, fundraisingReserve, fundraisingRoadmap, fundraisingTotal } from "@/data/fundraising";
import { contactEmail } from "@/data/settings";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

const formatVnd = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

export default function FundraisingClient() {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);
  const note = fundraisingCopy.transferNoteValue[locale];

  async function handleCopyNote() {
    if (await copyToClipboard(note)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <main className="min-w-0 bg-background py-12 text-foreground md:py-20">
        <div className="container mx-auto max-w-6xl space-y-20 px-4 sm:px-6 md:space-y-28">
          <section className="grid items-end gap-10 border-b border-border pb-12 md:grid-cols-[1.3fr_1fr] md:pb-16">
            <div className="space-y-6">
              <p className="text-sm font-semibold text-primary">BIOBUZZ presented by RTX · FIRST CANOPY · 2026–2027</p>
              <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{fundraisingCopy.title[locale]}</h1>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground sm:text-lg">{fundraisingCopy.lead[locale]}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton label={fundraisingCopy.ctaDonate[locale]} variant="primary" href="#donate" />
                <CTAButton label={fundraisingCopy.ctaCorporate[locale]} variant="secondary" href="#corporate" />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
              <p className="text-sm font-semibold text-muted-foreground">{fundraisingCopy.goalLabel[locale]}</p>
              <p className="mt-3 text-3xl font-bold tabular-nums text-primary sm:text-4xl">{formatVnd(fundraisingTotal)}</p>
              <p className="mt-4 text-sm leading-relaxed">{locale === "vi" ? "8 hạng mục · 11 thiết bị · bao gồm dự phòng kỹ thuật" : "8 line items · 11 devices · includes technical reserve"}</p>
              <a href="#budget" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">{locale === "vi" ? "Xem chi tiết ngân sách" : "View the budget"}</a>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{fundraisingCopy.seasonTitle[locale]}</h2>
            <div className="space-y-4 leading-relaxed">
              <p>{fundraisingCopy.seasonBody[locale]}</p>
              <p className="text-sm text-muted-foreground">{locale === "vi" ? "Kickoff toàn cầu: 12/09/2026 · Đội thi: #39256" : "Global kickoff: 12 Sep 2026 · Team #39256"}</p>
            </div>
          </section>

          <section id="budget" className="scroll-mt-24 space-y-8">
            <SectionHeader title={fundraisingCopy.budgetTitle[locale]} subtitle={fundraisingCopy.budgetSubtitle[locale]} align="center" />
            <div className="grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {fundraisingCategoryTotals.map((category) => (
                <div key={category.id} className="space-y-2 px-4 py-6 sm:px-6">
                  <h3 className="font-semibold">{category.name[locale]}</h3>
                  <p className="text-2xl font-bold tabular-nums">{formatVnd(category.vnd)}</p>
                  <p className="text-sm leading-relaxed">{category.description[locale]}</p>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="border-b border-border bg-muted/30 px-5 py-4 font-bold sm:px-6">{fundraisingCopy.itemsTitle[locale]}</div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[440px] text-left text-sm">
                  <thead className="border-b border-border text-muted-foreground"><tr><th scope="col" className="px-5 py-3 sm:px-6">{locale === "vi" ? "Hạng mục" : "Item"}</th><th scope="col" className="px-4 py-3 text-center">{fundraisingCopy.qtyLabel[locale]}</th><th scope="col" className="px-5 py-3 text-right sm:px-6">{locale === "vi" ? "Thành tiền" : "Total"}</th></tr></thead>
                  <tbody className="divide-y divide-border">{fundraisingItems.map((item) => <tr key={item.id}><td className="px-5 py-4 sm:px-6">{item.name[locale]}</td><td className="px-4 py-4 text-center tabular-nums">{item.qty}</td><td className="whitespace-nowrap px-5 py-4 text-right font-semibold tabular-nums sm:px-6">{formatVnd(item.totalVnd)}</td></tr>)}</tbody>
                  <tfoot className="border-t border-border bg-muted/30 tabular-nums">
                    <tr><th scope="row" colSpan={2} className="px-5 py-3 text-left sm:px-6">{locale === "vi" ? "Tổng thiết bị" : "Equipment subtotal"}</th><td className="whitespace-nowrap px-5 py-3 text-right sm:px-6">{formatVnd(fundraisingHardwareTotal)}</td></tr>
                    <tr><th scope="row" colSpan={2} className="px-5 py-3 text-left sm:px-6">{locale === "vi" ? "Dự phòng kỹ thuật và tỷ giá" : "Technical and exchange-rate reserve"}</th><td className="whitespace-nowrap px-5 py-3 text-right sm:px-6">{formatVnd(fundraisingReserve)}</td></tr>
                    <tr className="border-t border-border font-bold"><th scope="row" colSpan={2} className="px-5 py-4 text-left sm:px-6">{fundraisingCopy.goalLabel[locale]}</th><td className="whitespace-nowrap px-5 py-4 text-right text-primary sm:px-6">{formatVnd(fundraisingTotal)}</td></tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{locale === "vi" ? "Dự toán sử dụng tỷ giá 25.800₫/USD; giá có thể thay đổi theo vận chuyển, thuế và tỷ giá." : "The estimate uses an exchange rate of 25,800₫/USD; prices may vary with shipping, taxes and exchange rates."}</p>
          </section>

          <section className="space-y-8">
            <SectionHeader title={fundraisingCopy.roadmapTitle[locale]} subtitle={fundraisingCopy.roadmapSubtitle[locale]} align="center" />
            <div className="grid gap-6 md:grid-cols-2">{fundraisingRoadmap.map((phase) => <article key={phase.id} className="rounded-2xl border border-border p-6 sm:p-8"><p className="text-sm font-semibold text-primary">{phase.date[locale]}</p><h3 className="mt-3 text-xl font-bold">{phase.title[locale]}</h3><p className="mt-3 leading-relaxed">{phase.detail[locale]}</p><p className="mt-6 border-t border-border pt-4 text-xl font-bold tabular-nums">{formatVnd(phase.totalVnd)}</p></article>)}</div>
            <p className="text-sm text-muted-foreground">{locale === "vi" ? "Đợt 2 bao gồm 3.000.000₫ dự phòng kỹ thuật và tỷ giá." : "Phase 2 includes the 3,000,000₫ technical and exchange-rate reserve."}</p>
          </section>

          <section id="donate" className="scroll-mt-24 space-y-8">
            <SectionHeader title={fundraisingCopy.donateTitle[locale]} subtitle={fundraisingCopy.donateSubtitle[locale]} align="center" />
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-border p-6 sm:p-8">
                <h3 className="text-2xl font-bold">{fundraisingCopy.personalTitle[locale]}</h3>
                <p className="mt-3 leading-relaxed">{fundraisingCopy.personalBody[locale]}</p>
                <div className="mt-6 flex flex-col items-center rounded-xl bg-muted/30 p-6">
                  <Image src={fundraisingQrImage} alt={locale === "vi" ? "Mã QR ủng hộ Robotics Sóc Sơn" : "Robotics Sóc Sơn donation QR code"} width={256} height={256} className="h-auto w-full max-w-64 bg-white p-2" />
                  <p className="mt-4 text-center font-semibold">Nguyễn Minh Nghĩa</p>
                </div>
                <div className="mt-6 border-t border-border pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-semibold">{fundraisingCopy.transferNote[locale]}</span><button type="button" onClick={handleCopyNote} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={locale === "vi" ? "Sao chép nội dung chuyển khoản" : "Copy transfer note"}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? (locale === "vi" ? "Đã chép" : "Copied") : (locale === "vi" ? "Sao chép" : "Copy")}</button></div>
                  <p className="break-words text-sm">{note}</p>
                </div>
              </article>
              <article id="corporate" className="scroll-mt-24 rounded-2xl border border-border p-6 sm:p-8">
                <h3 className="text-2xl font-bold">{fundraisingCopy.corporateTitle[locale]}</h3>
                <p className="mt-3 leading-relaxed">{fundraisingCopy.corporateBody[locale]}</p>
                <h4 className="mt-8 font-semibold">{locale === "vi" ? "Giá trị đồng hành" : "Partnership benefits"}</h4>
                <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed"><li>{locale === "vi" ? "Đồng hành cùng học sinh phát triển kỹ năng cơ khí, điện tử và lập trình." : "Help students develop mechanical, electronics and programming skills."}</li><li>{locale === "vi" ? "Lan tỏa thương hiệu và kết nối cộng đồng STEM qua các hoạt động của đội." : "Share your brand and connect with the STEM community through team activities."}</li><li>{locale === "vi" ? "Trao đổi về hình thức ghi nhận và báo cáo sử dụng tài trợ." : "Discuss recognition and reporting on sponsorship use."}</li></ul>
                <div className="mt-8"><CTAButton label={fundraisingCopy.corporateForm[locale]} variant="primary" href={fundraisingCorporateFormUrl[locale]} target="_blank" rel="noopener noreferrer" /></div>
                <p className="mt-6 text-sm">Email: <a href={`mailto:${contactEmail}`} className="font-semibold text-primary underline underline-offset-4">{contactEmail}</a></p>
              </article>
            </div>
          </section>

          <section className="rounded-2xl bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{fundraisingCopy.transparencyTitle[locale]}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed">{fundraisingCopy.transparencyBody[locale]}</p>
            <div className="mt-6"><CTAButton label={fundraisingCopy.contactCta[locale]} variant="secondary" href="/contact-us" /></div>
          </section>
        </div>
      </main>
    </>
  );
}
