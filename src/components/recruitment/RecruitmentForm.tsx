"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import {
  buildRecruitmentFormPayload,
  EMPTY_RECRUITMENT_FORM,
  RECRUITMENT_DISCOVERY_SOURCES,
  RECRUITMENT_FORM_POST_URL,
  RECRUITMENT_DIVISIONS,
  type RecruitmentFormValues,
} from "@/lib/recruitment-form-map";
import {
  hasRecruitmentErrors,
  validateRecruitmentForm,
  type RecruitmentFieldErrors,
  type RecruitmentFieldKey,
} from "@/lib/recruitment-form-validation";
import { cn } from "@/lib/utils";

const labels = {
  vi: {
    step: (current: number) => `Bước ${current}/3`,
    personal: "Thông tin cá nhân",
    common: "Động lực & lựa chọn",
    branch: "Câu hỏi theo ban",
    required: "* Bắt buộc",
    fullName: "Họ và tên",
    birthDate: "Ngày/tháng/năm sinh",
    classCohort: "Lớp - khóa",
    phone: "Số điện thoại",
    email: "Email",
    facebook: "Link Facebook",
    discoverySource: "Bạn biết đến Robotics Sóc Sơn qua đâu?",
    discoverySourceOther: "Nguồn khác",
    motivation: "Điều gì khiến bạn muốn trở thành một phần của Robotics Sóc Sơn?",
    division: "Bạn muốn đăng ký ban nào?",
    other: "Khác",
    next: "Tiếp tục",
    back: "Quay lại",
    submit: "Gửi đơn tuyển thành viên",
    sending: "Đang gửi…",
    successTitle: "Đơn đã được gửi",
    successBody: "Cảm ơn bạn đã muốn đồng hành cùng Robotics Sóc Sơn. Đội sẽ đọc đơn và liên hệ với bạn sớm.",
    successAgain: "Gửi đơn khác",
    time: "Khoảng 3 phút",
    branchHint: "Chọn đúng ban để nhận câu hỏi phù hợp.",
    mechanical: {
      title: "Cơ khí - Thiết kế",
      experience: "Bạn đã từng có kinh nghiệm thiết kế 3D (CAD) hay thao tác gia công, lắp ráp cơ khí thực tế nào chưa?",
      tools: "Kỹ năng hoặc công cụ thiết kế/phần mềm nào bạn thành thạo nhất",
      debugging: "Khi một chi tiết cơ khí bị lệch/hỏng trong quá trình lắp ráp thực tế, bạn sẽ ưu tiên xử lý tình huống đó như thế nào?",
      expectations: "Bạn mong muốn nhận được điều gì khi tham gia ban Cơ khí - Thiết kế của Robotics Sóc Sơn?",
    },
    code: {
      title: "Code - Điện tử",
      experience: "Bạn đã từng làm quen với ngôn ngữ lập trình nào (C/C++, Python,...), các vi điều khiển nào (Arduino, ESP32,...) chưa?",
      electronics: "Bạn đã có kinh nghiệm thực tế về đấu nối mạch điện, sử dụng cảm biến/mạch động cơ chưa?",
      debugging: "Khi robot chạy không đúng thuật toán hoặc gặp sự cố cháy/chập mạch, bạn sẽ debug và xử lý lỗi như thế nào?",
      expectations: "Bạn mong muốn nhận được điều gì khi tham gia ban Code - Điện tử của Robotics Sóc Sơn?",
    },
    media: {
      title: "Truyền thông",
      strengths: "Thế mạnh chính của bạn nằm ở mảng nào: thiết kế, quay phim chụp ảnh hay viết lách lên ý tưởng?",
      tools: "Hiện tại bạn đang dùng phần mềm nào để thiết kế? (VD: Canva, Figma, Illustrator, Photoshop,...)",
      commitment: "Mức độ sẵn sàng học hỏi và lượng thời gian bạn có thể cam kết đồng hành cùng Ban Truyền thông RBS mỗi tuần là bao nhiêu?",
      expectations: "Bạn mong muốn nhận được điều gì khi tham gia ban Truyền thông của Robotics Sóc Sơn?",
    },
  },
  en: {
    step: (current: number) => `Step ${current} of 3`,
    personal: "Personal details",
    common: "Motivation & choice",
    branch: "Division questions",
    required: "* Required",
    fullName: "Full name",
    birthDate: "Date of birth",
    classCohort: "Class / cohort",
    phone: "Phone number",
    email: "Email",
    facebook: "Facebook link",
    discoverySource: "How did you hear about Robotics Sóc Sơn?",
    discoverySourceOther: "Other source",
    motivation: "What makes you want to become part of Robotics Sóc Sơn?",
    division: "Which division would you like to join?",
    other: "Other",
    next: "Continue",
    back: "Back",
    submit: "Submit member application",
    sending: "Sending…",
    successTitle: "Application sent",
    successBody: "Thanks for wanting to join Robotics Sóc Sơn. The team will review your application and contact you soon.",
    successAgain: "Send another application",
    time: "About 3 minutes",
    branchHint: "Choose your division to see the right questions.",
    mechanical: {
      title: "Mechanical - Design",
      experience: "Have you worked with 3D design (CAD), fabrication, or hands-on mechanical assembly?",
      tools: "Which design skills, tools, or software are you strongest in?",
      debugging: "If a mechanical part is misaligned or damaged during assembly, how would you prioritize solving it?",
      expectations: "What do you hope to gain from joining Robotics Sóc Sơn’s Mechanical - Design division?",
    },
    code: {
      title: "Code - Electronics",
      experience: "Which programming languages (C/C++, Python, etc.) or microcontrollers (Arduino, ESP32, etc.) have you tried?",
      electronics: "Have you worked hands-on with wiring, sensors, or motor circuits?",
      debugging: "If a robot runs the wrong algorithm or has a short-circuit issue, how would you debug and respond?",
      expectations: "What do you hope to gain from joining Robotics Sóc Sơn’s Code - Electronics division?",
    },
    media: {
      title: "Communications",
      strengths: "What is your strongest area: design, photo/video, or writing and idea development?",
      tools: "Which design software do you currently use? (e.g. Canva, Figma, Illustrator, Photoshop)",
      commitment: "How ready are you to learn, and how much time can you commit to the RBS Communications division each week?",
      expectations: "What do you hope to gain from joining Robotics Sóc Sơn’s Communications division?",
    },
  },
} as const;

const inputClass =
  "min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base text-slate-950 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";
const labelClass = "mb-2 block text-sm font-semibold leading-snug text-slate-900";

const fieldId = (formId: string, field: string) => `${formId}-${field}`;

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  index = 0,
  reduceMotion,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "url" | "date";
  placeholder?: string;
  index?: number;
  reduceMotion?: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px) scale(0.985)" }}
      animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
      transition={{ duration: 0.28, delay: reduceMotion ? 0 : index * 0.045, ease: [0.23, 1, 0.32, 1] }}
    >
      <label className={labelClass} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={cn(inputClass, error && "border-red-500 focus:border-red-600 focus:ring-red-600/10")}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-4px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={reduceMotion ? undefined : { opacity: 0, transform: "translateY(-4px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] }}
            id={`${id}-error`}
            className="mt-1.5 text-sm font-medium text-red-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  index = 0,
  reduceMotion,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  index?: number;
  reduceMotion?: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px) scale(0.985)" }}
      animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
      transition={{ duration: 0.28, delay: reduceMotion ? 0 : index * 0.045, ease: [0.23, 1, 0.32, 1] }}
    >
      <label className={labelClass} htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={cn(inputClass, "min-h-28 resize-y", error && "border-red-500 focus:border-red-600 focus:ring-red-600/10")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-4px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            exit={reduceMotion ? undefined : { opacity: 0, transform: "translateY(-4px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] }}
            id={`${id}-error`}
            className="mt-1.5 text-sm font-medium text-red-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function RecruitmentForm() {
  const { locale } = useLanguage();
  const copy = labels[locale];
  const formId = useId();
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const progress = step / 3;
  const [values, setValues] = useState<RecruitmentFormValues>(EMPTY_RECRUITMENT_FORM);
  const [errors, setErrors] = useState<RecruitmentFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hiddenPairs, setHiddenPairs] = useState<Array<{ name: string; value: string }>>([]);

  useEffect(() => {
    if (status !== "submitting" || hiddenPairs.length === 0) return;
    const hiddenForm = hiddenFormRef.current;
    if (!hiddenForm) return;
    const timer = window.setTimeout(() => {
      try {
        hiddenForm.submit();
        captureEvent(AnalyticsEvents.RECRUITMENT_SUBMITTED, { surface: "/recruitment", division: values.division });
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }, 50);
    return () => window.clearTimeout(timer);
  }, [hiddenPairs, status, values.division]);

  const setField = <K extends keyof RecruitmentFormValues>(key: K, value: RecruitmentFormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const validateStep = (targetStep: 1 | 2 | 3) => {
    const allErrors = validateRecruitmentForm(values, locale);
    const keys: RecruitmentFieldKey[] = targetStep === 1
      ? ["fullName", "birthDate", "classCohort", "phone", "email", "facebook"]
      : targetStep === 2
        ? ["discoverySource", "discoverySourceOther", "motivation", "division"]
        : [
            "mechanicalExperience", "mechanicalTools", "mechanicalDebugging",
            "codeExperience", "electronicsExperience", "codeDebugging",
            "mediaStrengths", "mediaTools", "mediaCommitment",
          ];
    const scoped = Object.fromEntries(keys.filter((key) => allErrors[key]).map((key) => [key, allErrors[key]])) as RecruitmentFieldErrors;
    setErrors(scoped);
    return !hasRecruitmentErrors(scoped);
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((current) => (current === 3 ? current : (current + 1) as 1 | 2 | 3));
    formRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => (current === 1 ? current : (current - 1) as 1 | 2 | 3));
    formRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    captureEvent(AnalyticsEvents.RECRUITMENT_SUBMIT_CLICKED, { surface: "/recruitment", division: values.division });
    const nextErrors = validateRecruitmentForm(values, locale);
    setErrors(nextErrors);
    if (hasRecruitmentErrors(nextErrors)) {
      if (nextErrors.division) setStep(2);
      return;
    }
    setHiddenPairs(buildRecruitmentFormPayload(values));
    setStatus("submitting");
  };

  const reset = () => {
    setValues(EMPTY_RECRUITMENT_FORM);
    setErrors({});
    setHiddenPairs([]);
    setStatus("idle");
    setStep(1);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(18px) scale(0.98)" }}
        animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-10"
      >
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, transform: "scale(0.7)" }}
            animate={{ opacity: [0, 0.8, 0], transform: ["scale(0.7)", "scale(1.15)", "scale(1.35)"] }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-400/20 blur-3xl"
          />
        ) : null}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "scale(0.84) rotate(-8deg)" }}
          animate={{ opacity: 1, transform: "scale(1) rotate(0deg)" }}
          transition={{ type: "spring", duration: 0.5, bounce: reduceMotion ? 0 : 0.2 }}
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        >
          <Check />
        </motion.div>
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="relative mt-6 text-3xl font-black tracking-tight text-slate-950"
        >
          {copy.successTitle}
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="relative mt-3 max-w-xl text-base leading-7 text-slate-600"
        >
          {copy.successBody}
        </motion.p>
        <motion.button
          type="button"
          onClick={reset}
          whileTap={reduceMotion ? undefined : { transform: "scale(0.98)" }}
          transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="relative mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20"
        >
          {copy.successAgain}
        </motion.button>
      </motion.div>
    );
  }

  const update = (key: keyof RecruitmentFormValues) => (value: string) => setField(key, value);

  return (
    <div className="relative">
      <iframe name="recruitment-google-form-target" title="google-form-submission" className="hidden" aria-hidden tabIndex={-1} />
      <form ref={hiddenFormRef} action={RECRUITMENT_FORM_POST_URL} method="POST" target="recruitment-google-form-target" className="hidden" aria-hidden>
        {hiddenPairs.map((pair) => <input key={`${pair.name}-${pair.value}`} type="hidden" name={pair.name} value={pair.value} readOnly />)}
      </form>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(24px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8"
        noValidate
      >
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            animate={{ transform: ["translateX(-12%)", "translateX(112%)"] }}
            transition={{ duration: 7, repeat: Infinity, repeatDelay: 2, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-70"
          />
        ) : null}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.p
                key={step}
                initial={reduceMotion ? false : { opacity: 0, transform: "translateX(-6px)" }}
                animate={{ opacity: 1, transform: "translateX(0)" }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="text-sm font-semibold text-blue-700"
              >
                {copy.step(step)}
              </motion.p>
              <motion.h2
                key={`heading-${step}`}
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(5px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.24, delay: reduceMotion ? 0 : 0.04, ease: [0.23, 1, 0.32, 1] }}
                className="mt-1 text-xl font-black tracking-tight text-slate-950"
              >
                {step === 1 ? copy.personal : step === 2 ? copy.common : copy.branch}
              </motion.h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{copy.time}</span>
          </div>
          <div className="mt-5" aria-label={copy.step(step)}>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              <span className={step >= 1 ? "text-blue-700" : undefined}>{copy.personal}</span>
              <span className={step >= 2 ? "text-blue-700" : undefined}>{copy.common}</span>
              <span className={step >= 3 ? "text-blue-700" : undefined}>{copy.branch}</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                animate={{ transform: `scaleX(${progress})` }}
                initial={false}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="h-full origin-left rounded-full bg-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 min-h-108">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, transform: "translateX(10px)" }}
              animate={{ opacity: 1, transform: "translateX(0)" }}
              exit={reduceMotion ? undefined : { opacity: 0, transform: "translateX(-10px)" }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-5"
            >
              {step === 1 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id={fieldId(formId, "fullName")} label={copy.fullName} value={values.fullName} error={errors.fullName} onChange={update("fullName")} reduceMotion={reduceMotion} index={0} />
                  <Field id={fieldId(formId, "birthDate")} label={copy.birthDate} value={values.birthDate} error={errors.birthDate} onChange={update("birthDate")} placeholder="dd/mm/yyyy" reduceMotion={reduceMotion} index={1} />
                  <Field id={fieldId(formId, "classCohort")} label={copy.classCohort} value={values.classCohort} error={errors.classCohort} onChange={update("classCohort")} reduceMotion={reduceMotion} index={2} />
                  <Field id={fieldId(formId, "phone")} label={copy.phone} value={values.phone} error={errors.phone} onChange={update("phone")} type="tel" reduceMotion={reduceMotion} index={3} />
                  <Field id={fieldId(formId, "email")} label={copy.email} value={values.email} error={errors.email} onChange={update("email")} type="email" reduceMotion={reduceMotion} index={4} />
                  <Field id={fieldId(formId, "facebook")} label={copy.facebook} value={values.facebook} error={errors.facebook} onChange={update("facebook")} type="url" placeholder="https://facebook.com/..." reduceMotion={reduceMotion} index={5} />
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
                    animate={{ opacity: 1, transform: "translateY(0)" }}
                    transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <p className={labelClass}>{copy.discoverySource}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {RECRUITMENT_DISCOVERY_SOURCES.map((source, index) => (
                        <motion.label
                          key={source}
                          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                          animate={{ opacity: 1, transform: "translateY(0)" }}
                          transition={{ duration: 0.24, delay: reduceMotion ? 0 : index * 0.04, ease: [0.23, 1, 0.32, 1] }}
                          whileTap={reduceMotion ? undefined : { transform: "scale(0.985)" }}
                          className={cn("flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm font-medium transition-[border-color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]", values.discoverySource === source ? "border-blue-600 bg-blue-50 text-blue-900 shadow-[0_8px_20px_rgba(37,99,235,0.1)]" : "border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:shadow-[0_8px_18px_rgba(37,99,235,0.07)]")}
                        >
                          <input type="radio" name={`${formId}-source`} value={source} checked={values.discoverySource === source} onChange={() => setField("discoverySource", source)} className="h-4 w-4 accent-blue-600" />
                          {source === "Khác" ? copy.other : source}
                        </motion.label>
                      ))}
                    </div>
                    <AnimatePresence initial={false}>
                      {errors.discoverySource ? <motion.p initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-4px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }} className="mt-1.5 text-sm font-medium text-red-600">{errors.discoverySource}</motion.p> : null}
                    </AnimatePresence>
                  </motion.div>
                  <AnimatePresence initial={false} mode="wait">
                    {values.discoverySource === "Khác" ? <Field key="other-source" id={fieldId(formId, "discoverySourceOther")} label={copy.discoverySourceOther} value={values.discoverySourceOther} error={errors.discoverySourceOther} onChange={update("discoverySourceOther")} reduceMotion={reduceMotion} /> : null}
                  </AnimatePresence>
                  <TextField id={fieldId(formId, "motivation")} label={copy.motivation} value={values.motivation} error={errors.motivation} onChange={update("motivation")} reduceMotion={reduceMotion} index={1} />
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
                    animate={{ opacity: 1, transform: "translateY(0)" }}
                    transition={{ duration: 0.26, delay: reduceMotion ? 0 : 0.06, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <p className={labelClass}>{copy.division}</p>
                    <div className="grid gap-2">
                      {RECRUITMENT_DIVISIONS.map((division, index) => (
                        <motion.label
                          key={division}
                          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                          animate={{ opacity: 1, transform: "translateY(0)" }}
                          transition={{ duration: 0.24, delay: reduceMotion ? 0 : 0.08 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                          whileTap={reduceMotion ? undefined : { transform: "scale(0.985)" }}
                          className={cn("flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm font-semibold transition-[border-color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]", values.division === division ? "border-blue-600 bg-blue-50 text-blue-900 shadow-[0_8px_20px_rgba(37,99,235,0.1)]" : "border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:shadow-[0_8px_18px_rgba(37,99,235,0.07)]")}
                        >
                          <input type="radio" name={`${formId}-division`} value={division} checked={values.division === division} onChange={() => setField("division", division)} className="h-4 w-4 accent-blue-600" />
                          {division}
                        </motion.label>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{copy.branchHint}</p>
                    <AnimatePresence initial={false}>
                      {errors.division ? <motion.p initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-4px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }} className="mt-1.5 text-sm font-medium text-red-600">{errors.division}</motion.p> : null}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ) : null}

              {step === 3 && values.division ? (
                <div className="space-y-5">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px) scale(0.985)" }}
                    animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="rounded-2xl bg-slate-950 p-4 text-white"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">{copy.branch}</p>
                    <motion.p
                      key={values.division}
                      initial={reduceMotion ? false : { opacity: 0, transform: "translateX(-8px)" }}
                      animate={{ opacity: 1, transform: "translateX(0)" }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-1 text-lg font-bold"
                    >
                      {values.division}
                    </motion.p>
                  </motion.div>
                  {values.division === "Cơ khí - Thiết kế" ? <>
                    <TextField id={fieldId(formId, "mechanicalExperience")} label={copy.mechanical.experience} value={values.mechanicalExperience} error={errors.mechanicalExperience} onChange={update("mechanicalExperience")} reduceMotion={reduceMotion} index={0} />
                    <TextField id={fieldId(formId, "mechanicalTools")} label={copy.mechanical.tools} value={values.mechanicalTools} error={errors.mechanicalTools} onChange={update("mechanicalTools")} reduceMotion={reduceMotion} index={1} />
                    <TextField id={fieldId(formId, "mechanicalDebugging")} label={copy.mechanical.debugging} value={values.mechanicalDebugging} error={errors.mechanicalDebugging} onChange={update("mechanicalDebugging")} reduceMotion={reduceMotion} index={2} />
                    <TextField id={fieldId(formId, "mechanicalExpectations")} label={copy.mechanical.expectations} value={values.mechanicalExpectations} error={errors.mechanicalExpectations} onChange={update("mechanicalExpectations")} reduceMotion={reduceMotion} index={3} />
                  </> : null}
                  {values.division === "Code - Điện tử" ? <>
                    <TextField id={fieldId(formId, "codeExperience")} label={copy.code.experience} value={values.codeExperience} error={errors.codeExperience} onChange={update("codeExperience")} reduceMotion={reduceMotion} index={0} />
                    <TextField id={fieldId(formId, "electronicsExperience")} label={copy.code.electronics} value={values.electronicsExperience} error={errors.electronicsExperience} onChange={update("electronicsExperience")} reduceMotion={reduceMotion} index={1} />
                    <TextField id={fieldId(formId, "codeDebugging")} label={copy.code.debugging} value={values.codeDebugging} error={errors.codeDebugging} onChange={update("codeDebugging")} reduceMotion={reduceMotion} index={2} />
                    <TextField id={fieldId(formId, "codeExpectations")} label={copy.code.expectations} value={values.codeExpectations} error={errors.codeExpectations} onChange={update("codeExpectations")} reduceMotion={reduceMotion} index={3} />
                  </> : null}
                  {values.division === "Truyền thông" ? <>
                    <TextField id={fieldId(formId, "mediaStrengths")} label={copy.media.strengths} value={values.mediaStrengths} error={errors.mediaStrengths} onChange={update("mediaStrengths")} reduceMotion={reduceMotion} index={0} />
                    <TextField id={fieldId(formId, "mediaTools")} label={copy.media.tools} value={values.mediaTools} error={errors.mediaTools} onChange={update("mediaTools")} reduceMotion={reduceMotion} index={1} />
                    <TextField id={fieldId(formId, "mediaCommitment")} label={copy.media.commitment} value={values.mediaCommitment} error={errors.mediaCommitment} onChange={update("mediaCommitment")} reduceMotion={reduceMotion} index={2} />
                    <TextField id={fieldId(formId, "mediaExpectations")} label={copy.media.expectations} value={values.mediaExpectations} error={errors.mediaExpectations} onChange={update("mediaExpectations")} reduceMotion={reduceMotion} index={3} />
                  </> : null}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {status === "error" ? <motion.div initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-6px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduceMotion ? undefined : { opacity: 0, transform: "translateY(-6px)" }} transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }} role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">Không thể gửi đơn. Vui lòng thử lại.</motion.div> : null}
        </AnimatePresence>
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
          <motion.button
            type="button"
            onClick={goBack}
            disabled={step === 1 || status === "submitting"}
            whileTap={reduceMotion ? undefined : { transform: "scale(0.98)" }}
            transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition-[border-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5" />{copy.back}
          </motion.button>
          {step < 3 ? (
            <motion.button
              type="button"
              onClick={goNext}
              disabled={status === "submitting"}
              whileTap={reduceMotion ? undefined : { transform: "scale(0.98)" }}
              transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-blue-700 hover:shadow-[0_14px_30px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20 disabled:cursor-wait disabled:opacity-60"
            >
              {copy.next}<ChevronRight className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileTap={reduceMotion ? undefined : { transform: "scale(0.98)" }}
              transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white shadow-lg shadow-slate-950/20 transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-blue-700 hover:shadow-[0_14px_30px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20 disabled:cursor-wait disabled:opacity-60"
            >
              {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}{status === "submitting" ? copy.sending : copy.submit}
            </motion.button>
          )}
        </div>
        <p className="mt-4 text-right text-xs text-slate-500">{copy.required}</p>
      </motion.form>
    </div>
  );
}
