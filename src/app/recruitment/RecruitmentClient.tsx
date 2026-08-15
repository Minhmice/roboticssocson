"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, UsersRound } from "lucide-react";
import { RecruitmentForm } from "@/components/recruitment/RecruitmentForm";
import { PageAnalytics } from "@/components/shared/PageAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnalyticsEvents } from "@/lib/posthog/events";

const content = {
  vi: {
    title: "Tìm đồng đội cho mùa giải tiếp theo.",
    body: "Biến sự tò mò thành kỹ năng thật, trong xưởng, trên sân đấu và cùng một đội luôn muốn làm tốt hơn.",
    signal: "RBS 4.0 / OPEN CALL",
    proof: "Không cần kinh nghiệm robotics, CAD hay lập trình. Đội tìm sự tò mò, tinh thần học hỏi và trách nhiệm.",
    formTitle: "Bắt đầu từ câu chuyện của bạn",
    formBody: "Ba bước ngắn, có lưu bản nháp trên thiết bị. Câu hỏi cuối thay đổi theo ban bạn chọn.",
    jump: "Mở form tuyển thành viên",
  },
  en: {
    title: "Find your teammates for the next season.",
    body: "Turn curiosity into real skills in the workshop, on the field, and with a team that keeps improving.",
    signal: "RBS 4.0 / OPEN CALL",
    proof: "No robotics, CAD, or coding experience is required. We look for curiosity, willingness to learn, and responsibility.",
    formTitle: "Start with your story",
    formBody: "Three short steps with a draft saved on this device. Final questions adapt to your chosen division.",
    jump: "Open member application",
  },
} as const;

export default function RecruitmentClient() {
  const { locale } = useLanguage();
  const copy = content[locale];
  const reduceMotion = useReducedMotion();
  const clientReady = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const allowDecorativeMotion = clientReady && !reduceMotion;

  return (
    <>
      <PageAnalytics event={AnalyticsEvents.RECRUITMENT_PAGE_VIEWED} surface="/recruitment" />
      <div className="min-h-dvh overflow-x-clip bg-slate-950">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.25),transparent_33%),radial-gradient(circle_at_88%_18%,rgba(14,165,233,0.16),transparent_28%)]" aria-hidden />
          {allowDecorativeMotion ? (
            <>
              <motion.div
                aria-hidden
                animate={{ transform: ["translate3d(-5%, -4%, 0) scale(0.96)", "translate3d(4%, 3%, 0) scale(1.04)", "translate3d(-5%, -4%, 0) scale(0.96)"] }}
                transition={{ duration: 18, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
                className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
              />
              <motion.div
                aria-hidden
                animate={{ transform: ["translate3d(4%, 3%, 0) scale(1)", "translate3d(-5%, -2%, 0) scale(0.92)", "translate3d(4%, 3%, 0) scale(1)"] }}
                transition={{ duration: 22, repeat: Infinity, ease: [0.77, 0, 0.175, 1], delay: 1.4 }}
                className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
              />
            </>
          ) : null}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent" aria-hidden />
          <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-24">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, transform: "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0)" }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-xl"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, transform: "translateX(-10px)" }}
                animate={{ opacity: 1, transform: "translateX(0)" }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-blue-300"
              >
                <motion.span animate={reduceMotion ? undefined : { transform: ["scale(1)", "scale(1.18)", "scale(1)"] }} transition={{ duration: 2.4, repeat: Infinity, ease: [0.23, 1, 0.32, 1] }} className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10"><UsersRound className="h-4 w-4" /></motion.span>
                {copy.signal}
              </motion.div>
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(18px) scale(0.98)" }}
                animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="mt-7 max-w-[11ch] text-balance text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
              >
                {copy.title}
              </motion.h1>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="mt-7 max-w-[52ch] text-lg leading-8 text-slate-300"
              >
                {copy.body}
              </motion.p>
              <motion.a
                href="#apply"
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
                whileTap={reduceMotion ? undefined : { transform: "scale(0.98)" }}
                className="group mt-9 inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-[0_14px_38px_rgba(37,99,235,0.28)] transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-blue-500 hover:shadow-[0_18px_44px_rgba(37,99,235,0.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/30"
              >
                {copy.jump}<ArrowDown className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5" />
              </motion.a>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="mt-8 max-w-[44ch] border-l border-blue-400/60 pl-4 text-sm leading-6 text-slate-400"
              >
                {copy.proof}
              </motion.p>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, transform: "translateY(22px)" }}
              animate={{ opacity: 1, transform: "translateY(0)" }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
              id="apply"
              className="scroll-mt-24"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, transform: "translateX(12px)" }}
                animate={{ opacity: 1, transform: "translateX(0)" }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="mb-5 max-w-lg"
              >
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{copy.formTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{copy.formBody}</p>
              </motion.div>
              <RecruitmentForm />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
