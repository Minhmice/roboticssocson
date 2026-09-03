"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, House } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnalyticsEvents } from "@/lib/posthog/events";

const content = {
  vi: {
    statusBadge: "RBS 4.0",
    statusState: "ĐÃ ĐÓNG ĐƠN",
    title: "Đợt tuyển thành viên đã kết thúc.",
    lead: "Cảm ơn bạn đã quan tâm đến Robotics Sóc Sơn. Hệ thống tiếp nhận hồ sơ kỳ này đã dừng hoạt động.",
    reviewTitle: "Hồ sơ đang được xét duyệt",
    reviewDesc:
      "Ban chuyên môn đang đánh giá các đơn đã nộp. Kết quả và lịch phỏng vấn sẽ được gửi qua email hoặc số điện thoại bạn đã đăng ký.",
    contactBtn: "Liên hệ đội",
    homeBtn: "Về trang chủ",
    imageAlt: "Đội ngũ Robotics Sóc Sơn tại giải đấu FIRST Tech Challenge Vietnam",
    photoTag: "FIRST Tech Challenge Vietnam",
    photoCaption: "Robotics Sóc Sơn • THPT Sóc Sơn",
  },
  en: {
    statusBadge: "RBS 4.0",
    statusState: "APPLICATIONS CLOSED",
    title: "Member applications are now closed.",
    lead: "Thank you for your interest in Robotics Soc Son. Submissions for this round are no longer accepted.",
    reviewTitle: "Applications in review",
    reviewDesc:
      "Submitted applications are being evaluated. Interview invitations and results will be sent via your registered contact info.",
    contactBtn: "Contact team",
    homeBtn: "Back to home",
    imageAlt: "Robotics Soc Son team at the FIRST Tech Challenge Vietnam championship",
    photoTag: "FIRST Tech Challenge Vietnam",
    photoCaption: "Robotics Soc Son • Soc Son High School",
  },
} as const;

export default function RecruitmentClient() {
  const { locale } = useLanguage();
  const copy = content[locale];
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <PageAnalytics event={AnalyticsEvents.RECRUITMENT_PAGE_VIEWED} surface="/recruitment" />

      <div className="relative min-w-0 overflow-hidden bg-background text-foreground selection:bg-primary/15 selection:text-primary">
        {/* Calming ambient breathing loop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Organic breathing orb 1 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.12, 0.98, 1],
                    x: [0, 20, -14, 0],
                    y: [0, -16, 12, 0],
                    opacity: [0.18, 0.28, 0.2, 0.18],
                  }
            }
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-20 -top-28 h-112 w-md rounded-full bg-primary/20 blur-[80px]"
          />

          {/* Organic breathing orb 2 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.18, 1.04, 1],
                    x: [0, -24, 16, 0],
                    y: [0, 20, -12, 0],
                    opacity: [0.14, 0.24, 0.16, 0.14],
                  }
            }
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute -right-24 top-1/3 h-128 w-lg rounded-full bg-blue-400/15 blur-[96px]"
          />

          {/* Organic breathing orb 3 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.1, 0.2, 0.1],
                  }
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-1/4 h-80 w-[50vw] rounded-full bg-primary/10 blur-[100px]"
          />
        </div>

        {/* Content layout */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Narrative & Status */}
            <div className="min-w-0 lg:col-span-7">
              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 shadow-2xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.8, 1],
                            opacity: [0.7, 0, 0.7],
                          }
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inline-flex h-full w-full rounded-full bg-amber-500"
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-600" />
                </span>
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {copy.statusBadge}
                </span>
                <span className="h-3 w-px bg-border" />
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  {copy.statusState}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-6 max-w-[18ch] text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-tight">
                {copy.title}
              </h1>

              {/* Concise lead */}
              <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                {copy.lead}
              </p>

              {/* Review status card */}
              <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/4 via-card to-card p-5 sm:p-6">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary/20 via-primary to-primary/20" />
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-foreground">
                      {copy.reviewTitle}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {copy.reviewDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="min-h-11 rounded-xl px-6 font-semibold shadow-xs transition-all active:scale-[0.98]"
                >
                  <Link href="/contact-us">
                    {copy.contactBtn}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-11 rounded-xl border-border/90 px-5 font-medium transition-all hover:bg-accent active:scale-[0.98]"
                >
                  <Link href="/">
                    <House className="h-4 w-4" aria-hidden="true" />
                    {copy.homeBtn}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="min-w-0 lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -6, 0],
                        }
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative overflow-hidden rounded-3xl border border-border/90 bg-card p-3 shadow-xl backdrop-blur-xl"
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-slate-950 sm:aspect-4/4.5">
                    <Image
                      src="/Images/Achievements/FTC 2024-2025/Image  (2).webp"
                      alt={copy.imageAlt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 38vw, (min-width: 640px) 70vw, 100vw"
                      className="object-cover object-center saturate-[0.92] transition-transform duration-700 ease-out hover:scale-[1.02]"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent"
                    />

                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{copy.photoTag}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-semibold tracking-wide text-white">
                        {copy.photoCaption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
