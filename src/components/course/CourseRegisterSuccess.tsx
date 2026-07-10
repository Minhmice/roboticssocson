"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBootAnimationReady } from "@/contexts/BootRevealContext";
import { cn } from "@/lib/utils";

const copy = {
  headline: {
    vi: "Đăng ký thành công. Trung tâm sẽ liên hệ sớm.",
    en: "Registration successful. We will contact you soon.",
  },
  thankYou: {
    vi: "Cảm ơn bạn đã gửi đăng ký",
    en: "Thank you for registering",
  },
  loadingTitle: {
    vi: "Đang xử lý đăng ký",
    en: "Processing registration",
  },
  submitAnother: {
    vi: "Gửi đăng ký khác",
    en: "Submit another registration",
  },
  viewCourse: {
    vi: "Xem chương trình khóa học",
    en: "View course program",
  },
  milestones: {
    vi: [
      "Đã nhận thông tin đăng ký",
      "Đang lưu hồ sơ học sinh",
      "Hoàn tất — sẵn sàng liên hệ",
    ],
    en: [
      "Registration received",
      "Saving student profile",
      "Complete — ready to follow up",
    ],
  },
};

const easeOutQuint = [0.22, 1, 0.36, 1] as const;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * 0–2 loading on clear screen
 * 3   overlay slides down
 * 4   success body fades in + headline words
 * 5   epilogue + CTAs
 */
type SequenceStep = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_DELAYS_MS: Record<Exclude<SequenceStep, 0>, number> = {
  1: 1300,
  2: 3000,
  3: 4000,
  4: 5400,
  5: 7000,
};

const WORD_STAGGER_S = 0.14;
const WORD_REVEAL_S = 0.58;

function progressWidth(step: SequenceStep): `${number}%` {
  if (step >= 2) return "100%";
  if (step >= 1) return "58%";
  return "12%";
}

function resolveMilestoneState(
  index: number,
  step: SequenceStep,
): "idle" | "active" | "done" {
  if (step >= 3) return "done";
  if (step === 2) {
    if (index < 2) return "done";
    if (index === 2) return "active";
  }
  if (step === 1) {
    if (index === 0) return "done";
    if (index === 1) return "active";
  }
  if (step === 0 && index === 0) return "active";
  return "idle";
}

export function CourseRegisterSuccess() {
  const { locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const animationReady = useBootAnimationReady();
  const instant = Boolean(reduceMotion);
  const [step, setStep] = useState<SequenceStep>(instant ? 5 : 0);

  const words = useMemo(
    () => copy.headline[locale].split(/\s+/).filter(Boolean),
    [locale],
  );

  const milestones = copy.milestones[locale];
  const showClearScreen = !instant && step < 4;
  const overlayDescending = step === 3;
  const successReady = step >= 4 || instant;
  const epilogueReady = step >= 5 || instant;

  useEffect(() => {
    if (instant || !animationReady) return;

    const timers = (
      Object.entries(STEP_DELAYS_MS) as [string, number][]
    ).map(([next, ms]) =>
      window.setTimeout(() => setStep(Number(next) as SequenceStep), ms),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [animationReady, instant]);

  const wordVariants: Variants = {
    hidden: {
      opacity: instant ? 1 : 0.18,
      y: instant ? 0 : 12,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: WORD_REVEAL_S, ease: easeOutQuint },
    },
  };

  return (
    <div
      className="relative z-[100] w-full max-w-[42rem] pb-[clamp(0.25rem,2vh,1rem)] text-white"
      aria-live="polite"
    >
      <div className="relative min-h-[clamp(17rem,44dvh,26rem)] w-full">
        {/* Clear loading screen — frosted panel, then slides down */}
        <AnimatePresence>
          {showClearScreen ? (
            <motion.div
              key="clear-screen"
              className="absolute inset-0 z-30 flex flex-col justify-center overflow-hidden rounded-sm border border-white/10 bg-slate-950/94 px-[clamp(1.25rem,4vw,2rem)] py-[clamp(1.5rem,4vh,2.5rem)] shadow-[0_24px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: overlayDescending ? 0.92 : 1,
                y: overlayDescending ? "108%" : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.35, ease: easeOutQuint },
                y: { duration: 1.15, ease: easeOutExpo },
              }}
              aria-busy={step < 2}
              aria-label={copy.loadingTitle[locale]}
            >
              <p className="m-0 mb-[clamp(1.25rem,3vh,1.75rem)] font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-200/90">
                {copy.loadingTitle[locale]}
              </p>

              <div
                className="h-1 w-full max-w-[28rem] overflow-hidden rounded-full bg-white/12"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={
                  step >= 2 ? 100 : step >= 1 ? 58 : step >= 0 ? 12 : 0
                }
              >
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-blue-200 via-primary to-blue-300 shadow-[0_0_16px_rgba(37,99,235,0.4)]"
                  initial={false}
                  animate={{ width: progressWidth(step) }}
                  transition={{
                    duration: step <= 1 ? 1.25 : 1.45,
                    ease: easeOutQuint,
                  }}
                />
              </div>

              <ol className="mt-5 flex max-w-[28rem] flex-col gap-2.5">
                {milestones.map((label, index) => {
                  const state = resolveMilestoneState(index, step);
                  return (
                    <motion.li
                      key={label}
                      className="flex items-start gap-3 text-[0.74rem] leading-snug"
                      initial={false}
                      animate={{
                        opacity: state === "idle" ? 0.35 : 1,
                        x: state === "idle" ? -8 : 0,
                      }}
                      transition={{ duration: 0.5, ease: easeOutQuint }}
                    >
                      <span
                        className={cn(
                          "mt-0.5 inline-flex min-w-[2rem] font-mono text-[0.64rem] font-semibold tabular-nums tracking-[0.08em]",
                          state === "done" && "text-blue-200",
                          state === "active" && "text-white",
                          state === "idle" && "text-white/40",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "uppercase tracking-[0.08em]",
                          state === "done" && "font-bold text-white/90",
                          state === "active" && "font-extrabold text-white",
                          state === "idle" && "font-medium text-white/50",
                        )}
                      >
                        {label}
                        {state === "active" ? (
                          <motion.span
                            aria-hidden
                            className="ml-1 inline-block text-blue-200"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                              duration: 1.35,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            …
                          </motion.span>
                        ) : null}
                      </span>
                    </motion.li>
                  );
                })}
              </ol>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Success — fades in after clear screen descends */}
        <motion.div
          className="relative z-10 flex w-full flex-col gap-[clamp(1.5rem,3.5vh,2.25rem)]"
          initial={false}
          animate={{
            opacity: successReady ? 1 : 0,
            y: successReady ? 0 : 28,
            filter: successReady ? "blur(0px)" : "blur(8px)",
          }}
          transition={{
            duration: instant ? 0 : 1.05,
            ease: easeOutQuint,
            delay: instant ? 0 : overlayDescending ? 0.15 : 0,
          }}
        >
          <div className="flex flex-col gap-[clamp(0.75rem,1.5vh,1rem)]">
            <motion.h2
              className={cn(
                "m-0 flex max-w-[19ch] flex-wrap gap-x-[0.32em] gap-y-1 text-balance",
                "text-[clamp(2.1rem,5.6vw,3.85rem)] font-black leading-[1.05] tracking-[-0.03em]",
                "[text-shadow:0_4px_36px_rgba(15,23,42,0.5)]",
              )}
            >
              {instant ? (
                copy.headline[locale]
              ) : (
                words.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className="inline-block whitespace-nowrap"
                    variants={wordVariants}
                    initial="hidden"
                    animate={successReady ? "visible" : "hidden"}
                    transition={{
                      delay: successReady ? index * WORD_STAGGER_S : 0,
                    }}
                  >
                    {word}
                  </motion.span>
                ))
              )}
            </motion.h2>

            <motion.p
              className="m-0 max-w-[38ch] text-[clamp(0.82rem,1.3vw,0.94rem)] font-bold uppercase tracking-[0.11em] text-white/88"
              initial={false}
              animate={{
                opacity: epilogueReady ? 1 : 0,
                y: epilogueReady ? 0 : 10,
              }}
              transition={{ duration: 0.72, ease: easeOutQuint }}
            >
              {copy.thankYou[locale]}
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-4 border-t border-white/14 pt-[clamp(1rem,2vh,1.25rem)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-7"
            initial={false}
            animate={{
              opacity: epilogueReady ? 1 : 0,
              y: epilogueReady ? 0 : 8,
            }}
            transition={{
              duration: 0.68,
              delay: instant ? 0 : 0.12,
              ease: easeOutQuint,
            }}
          >
            <Link
              href="/course-register-form"
              className={cn(
                "group inline-flex w-fit min-h-11 items-center gap-2 text-sm font-semibold text-blue-200 underline underline-offset-[0.35em] transition-colors",
                "hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
              )}
            >
              {copy.submitAnother[locale]}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>

            <Link
              href="/course"
              className={cn(
                "inline-flex min-h-11 w-fit items-center rounded-md border border-white/45 bg-white/10 px-5 py-2.5 text-[0.8rem] font-extrabold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors",
                "hover:border-white hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
              )}
            >
              {copy.viewCourse[locale]}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default CourseRegisterSuccess;
