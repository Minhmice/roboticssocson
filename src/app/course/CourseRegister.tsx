"use client";

import { BootLink } from "@/components/shared/BootLink";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLanguage } from "@/contexts/LanguageContext";
import { coursePricingCopy } from "@/data/coursePricing";
import { getLocalized } from "@/lib/course/getLocalized";
import {
  COURSE_SCROLL_VIEWPORT,
  EASE_OUT_QUART,
  ENTER_DURATION,
} from "@/lib/course/scrollReveal";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import {
  useCallback,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const headingId = "course-register-heading";
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type SplashPoint = { x: number; y: number };
type Ripple = SplashPoint & { id: number };

function pointerToPercent(event: ReactPointerEvent<HTMLElement>): SplashPoint {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100,
  };
}

const ctaButtonBase =
  "inline-flex w-full min-h-[52px] items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 text-base font-bold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d4ed8] sm:text-lg";

const panelReveal: Variants = {
  hidden: { opacity: 1, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

const copy = {
  title: {
    vi: "Sẵn sàng cho con bắt đầu?",
    en: "Ready for your child to start?",
  },
  lead: {
    vi: "Điền form trong 1–2 phút — học phí trọn khóa, không phí ẩn.",
    en: "Fill the form in 1–2 minutes — one full-course fee, no hidden charges.",
  },
  proof: {
    vi: "Đội phản hồi trong 24–48 giờ",
    en: "Team replies within 24–48 hours",
  },
  cta: {
    vi: "Đăng ký ngay",
    en: "Register now",
  },
  contact: {
    vi: "Liên hệ để thêm chi tiết",
    en: "Contact for more details",
  },
};

function trackRegisterCta(label: string, href: string) {
  captureEvent(AnalyticsEvents.CTA_CLICKED, {
    label,
    href,
    variant: href.includes("contact") ? "secondary" : "primary",
    surface: "/course",
  });
}

/** Final course conversion — aura section + drenched tech-blue panel. */
export default function CourseRegister() {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const [splashPos, setSplashPos] = useState<SplashPoint>({ x: 50, y: 50 });
  const [splashActive, setSplashActive] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      setSplashActive(true);
      setSplashPos(pointerToPercent(event));
    },
    [reduced],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      setSplashPos(pointerToPercent(event));
    },
    [reduced],
  );

  const handlePointerLeave = useCallback(() => {
    setSplashActive(false);
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced || event.button !== 0) return;
      const point = pointerToPercent(event);
      const id = event.timeStamp;
      setRipples((current) => [...current, { ...point, id }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 520);
    },
    [reduced],
  );

  const splashStyle = {
    "--splash-x": `${splashPos.x}%`,
    "--splash-y": `${splashPos.y}%`,
  } as CSSProperties;

  const stagger = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 1, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: COURSE_SCROLL_VIEWPORT,
          transition: { duration: ENTER_DURATION, delay, ease: EASE_OUT_QUART },
        };

  const Panel = reduced ? "div" : motion.div;
  const panelMotion = reduced
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: COURSE_SCROLL_VIEWPORT,
        variants: panelReveal,
        whileHover: {
          scale: 1.008,
          transition: { duration: 0.2, ease: EASE_OUT_EXPO },
        },
        whileTap: {
          scale: 0.996,
          transition: { duration: 0.1, ease: EASE_OUT_EXPO },
        },
      };

  return (
    <AuroraBackground
      id="course-register"
      fillViewport={false}
      intensity="vivid"
      showRadialGradient
      className="relative py-14 sm:py-20 md:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-linear-to-b from-background from-20% via-background/70 to-transparent sm:h-40 md:h-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-linear-to-t from-background from-15% via-background/65 to-transparent sm:h-36"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <Panel
          {...panelMotion}
          className={cn(
            "course-mid-cta grid-pattern animate-gradient-shift rounded-2xl",
            !reduced && "animate-pulse-glow will-change-transform",
            splashActive && "course-mid-cta--live",
          )}
          onPointerEnter={reduced ? undefined : handlePointerEnter}
          onPointerMove={reduced ? undefined : handlePointerMove}
          onPointerLeave={reduced ? undefined : handlePointerLeave}
          onPointerDown={reduced ? undefined : handlePointerDown}
        >
          <div
            className="course-mid-cta-orb -left-24 -top-28 h-72 w-72 bg-white/25 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
            aria-hidden
          />
          <div
            className="course-mid-cta-orb -bottom-32 -right-20 h-96 w-96 bg-sky-300/35 motion-safe:animate-[pulse_5s_ease-in-out_infinite_0.8s]"
            aria-hidden
          />
          <div className="course-mid-cta-shimmer" aria-hidden />

          {!reduced && (
            <>
              <div
                className={cn(
                  "course-mid-cta-splash",
                  splashActive && "is-active",
                )}
                style={splashStyle}
                aria-hidden
              />
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="course-mid-cta-ripple"
                  style={
                    {
                      "--splash-x": `${ripple.x}%`,
                      "--splash-y": `${ripple.y}%`,
                    } as CSSProperties
                  }
                  aria-hidden
                />
              ))}
            </>
          )}

          <div className="relative z-[2] flex flex-col gap-8 p-6 sm:p-10 md:p-12 lg:p-14 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] xl:items-center xl:gap-x-16">
            <header className="min-w-0 text-center xl:text-left">
              {reduced ? (
                <>
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-sm font-bold text-white shadow-sm">
                    {getLocalized(coursePricingCopy.priceDisplay, locale)}
                    <span className="text-white/75">·</span>
                    <span className="font-semibold text-blue-50/90">
                      {locale === "vi" ? "trọn khóa" : "full course"}
                    </span>
                  </p>
                  <h2
                    id={headingId}
                    className="text-balance text-[clamp(1.875rem,4.8vw,3.25rem)] font-black leading-[1.06] tracking-tight text-white"
                  >
                    {copy.title[locale]}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[44ch] text-pretty text-base font-medium leading-relaxed text-blue-50 sm:text-lg md:text-xl xl:mx-0">
                    {copy.lead[locale]}
                  </p>
                  <p className="mx-auto mt-3 text-sm font-medium tracking-wide text-blue-100/80 sm:text-base xl:mx-0">
                    {copy.proof[locale]}
                  </p>
                </>
              ) : (
                <>
                  <motion.p
                    {...stagger(0.04)}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-sm font-bold text-white shadow-sm"
                  >
                    {getLocalized(coursePricingCopy.priceDisplay, locale)}
                    <span className="text-white/75">·</span>
                    <span className="font-semibold text-blue-50/90">
                      {locale === "vi" ? "trọn khóa" : "full course"}
                    </span>
                  </motion.p>
                  <motion.h2
                    id={headingId}
                    {...stagger(0.1)}
                    className="text-balance text-[clamp(1.875rem,4.8vw,3.25rem)] font-black leading-[1.06] tracking-tight text-white"
                  >
                    {copy.title[locale]}
                  </motion.h2>
                  <motion.p
                    {...stagger(0.16)}
                    className="mx-auto mt-4 max-w-[44ch] text-pretty text-base font-medium leading-relaxed text-blue-50 sm:text-lg md:text-xl xl:mx-0"
                  >
                    {copy.lead[locale]}
                  </motion.p>
                  <motion.p
                    {...stagger(0.24)}
                    className="mx-auto mt-3 text-sm font-medium tracking-wide text-blue-100/80 sm:text-base xl:mx-0"
                  >
                    {copy.proof[locale]}
                  </motion.p>
                </>
              )}
            </header>

            <div className="flex min-w-0 w-full flex-col gap-3 sm:mx-auto sm:max-w-md xl:mx-0 xl:max-w-none">
              {reduced ? (
                <>
                  <BootLink
                    href="/course-register-form"
                    className={cn(
                      ctaButtonBase,
                      "bg-white text-primary shadow-[0_6px_24px_rgba(0,0,0,0.16)] hover:bg-blue-50 hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)] active:scale-[0.98]",
                    )}
                    aria-describedby={headingId}
                    onClick={() =>
                      trackRegisterCta(copy.cta[locale], "/course-register-form")
                    }
                  >
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                    {copy.cta[locale]}
                  </BootLink>
                  <BootLink
                    href="/contact-us"
                    className={cn(
                      ctaButtonBase,
                      "border-2 border-white/80 bg-white/10 text-white hover:border-white hover:bg-white/18 active:scale-[0.98]",
                    )}
                    onClick={() =>
                      trackRegisterCta(copy.contact[locale], "/contact-us")
                    }
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden />
                    {copy.contact[locale]}
                  </BootLink>
                </>
              ) : (
                <>
                  <motion.div {...stagger(0.32)}>
                    <BootLink
                      href="/course-register-form"
                      className={cn(
                        ctaButtonBase,
                        "group bg-white text-primary shadow-[0_6px_24px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_14px_40px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.98]",
                      )}
                      aria-describedby={headingId}
                      onClick={() =>
                        trackRegisterCta(
                          copy.cta[locale],
                          "/course-register-form",
                        )
                      }
                    >
                      <ArrowRight
                        className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                      {copy.cta[locale]}
                    </BootLink>
                  </motion.div>
                  <motion.div {...stagger(0.4)}>
                    <BootLink
                      href="/contact-us"
                      className={cn(
                        ctaButtonBase,
                        "group border-2 border-white/80 bg-white/10 font-semibold text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/18 active:translate-y-0 active:scale-[0.98]",
                      )}
                      onClick={() =>
                        trackRegisterCta(copy.contact[locale], "/contact-us")
                      }
                    >
                      <Mail
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        aria-hidden
                      />
                      {copy.contact[locale]}
                    </BootLink>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </Panel>
      </div>
    </AuroraBackground>
  );
}
