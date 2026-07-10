"use client";

import { BootLink } from "@/components/shared/BootLink";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const headingId = "course-register-heading";

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

const ctaButtonBase =
  "inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d4ed8] sm:text-lg";

const copy = {
  title: {
    vi: "Sẵn sàng đăng ký khóa học?",
    en: "Ready to register for the course?",
  },
  lead: {
    vi: "Mở form đầy đủ trên trang riêng — gửi đăng ký trong 1–2 phút.",
    en: "Open the full registration page — submit in about one to two minutes.",
  },
  proof: {
    vi: "Đội phản hồi trong 24–48 giờ",
    en: "Team replies within 24–48 hours",
  },
  cta: {
    vi: "Mở form đăng ký khóa học",
    en: "Open course registration form",
  },
  contact: {
    vi: "Liên hệ để thêm chi tiết",
    en: "Contact for more details",
  },
};

/** Final course conversion — drenched tech-blue panel into /course-register-form. */
export default function CourseRegister() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const MotionTag = prefersReducedMotion ? "div" : motion.div;
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45, ease: easeOutQuart },
      };

  const stagger = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay, ease: easeOutQuart },
        };

  return (
    <FadeInSection
      id="course-register"
      className="py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <MotionTag
          {...motionProps}
          className={cn(
            "course-mid-cta grid-pattern animate-gradient-shift animate-pulse-glow rounded-2xl",
            !prefersReducedMotion && "will-change-transform",
          )}
        >
          <div
            className="course-mid-cta-orb -left-20 -top-24 h-64 w-64 bg-white/22"
            aria-hidden
          />
          <div
            className="course-mid-cta-orb -bottom-28 -right-16 h-80 w-80 bg-sky-300/30"
            aria-hidden
          />
          <div className="course-mid-cta-shimmer" aria-hidden />

          <div className="relative flex flex-col gap-8 p-6 sm:p-10 md:p-12 lg:p-14 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] xl:items-center xl:gap-x-14">
            <header className="min-w-0 text-center xl:text-left">
              {prefersReducedMotion ? (
                <>
                  <h2
                    id={headingId}
                    className="text-balance text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.08] tracking-tight text-white"
                  >
                    {copy.title[locale]}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[44ch] text-pretty text-base font-medium leading-relaxed text-blue-50/95 sm:text-lg md:text-xl xl:mx-0">
                    {copy.lead[locale]}
                  </p>
                  <p className="mx-auto mt-3 text-sm tracking-wide text-blue-100/70 sm:text-base xl:mx-0">
                    {copy.proof[locale]}
                  </p>
                </>
              ) : (
                <>
                  <motion.h2
                    id={headingId}
                    {...stagger(0.08)}
                    className="text-balance text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.08] tracking-tight text-white"
                  >
                    {copy.title[locale]}
                  </motion.h2>
                  <motion.p
                    {...stagger(0.14)}
                    className="mx-auto mt-4 max-w-[44ch] text-pretty text-base font-medium leading-relaxed text-blue-50/95 sm:text-lg md:text-xl xl:mx-0"
                  >
                    {copy.lead[locale]}
                  </motion.p>
                  <motion.p
                    {...stagger(0.22)}
                    className="mx-auto mt-3 text-sm tracking-wide text-blue-100/70 sm:text-base xl:mx-0"
                  >
                    {copy.proof[locale]}
                  </motion.p>
                </>
              )}
            </header>

            <div className="flex min-w-0 w-full flex-col gap-3 sm:mx-auto sm:max-w-md xl:mx-0 xl:max-w-none">
              {prefersReducedMotion ? (
                <>
                  <BootLink
                    href="/course-register-form"
                    className={cn(
                      ctaButtonBase,
                      "bg-white text-primary shadow-[0_4px_20px_rgba(0,0,0,0.14)] hover:bg-blue-50 hover:shadow-[0_10px_32px_rgba(0,0,0,0.18)] active:scale-[0.98]",
                    )}
                    aria-describedby={headingId}
                  >
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                    {copy.cta[locale]}
                  </BootLink>
                  <BootLink
                    href="/contact-us"
                    className={cn(
                      ctaButtonBase,
                      "border-2 border-white/80 bg-white/10 text-white hover:border-white hover:bg-white/18 active:scale-[0.98]",
                    )}
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden />
                    {copy.contact[locale]}
                  </BootLink>
                </>
              ) : (
                <>
                  <motion.div {...stagger(0.28)}>
                    <BootLink
                      href="/course-register-form"
                      className={cn(
                        ctaButtonBase,
                        "group bg-white text-primary shadow-[0_4px_20px_rgba(0,0,0,0.14)] hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_10px_32px_rgba(0,0,0,0.18)] active:translate-y-0 active:scale-[0.98]",
                      )}
                      aria-describedby={headingId}
                    >
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                      {copy.cta[locale]}
                    </BootLink>
                  </motion.div>
                  <motion.div {...stagger(0.36)}>
                    <BootLink
                      href="/contact-us"
                      className={cn(
                        ctaButtonBase,
                        "group border-2 border-white/80 bg-white/10 text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/18 active:translate-y-0 active:scale-[0.98]",
                      )}
                    >
                      <Mail
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105"
                        aria-hidden
                      />
                      {copy.contact[locale]}
                    </BootLink>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </MotionTag>
      </div>
    </FadeInSection>
  );
}
