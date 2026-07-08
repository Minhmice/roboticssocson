"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  buildGoogleFormPayload,
  EMPTY_CONSULT_FORM,
  GOOGLE_FORM_POST_URL,
  GOOGLE_FORM_SOURCE_OPTIONS,
  type CourseConsultFormValues,
  type GoogleFormSourceOption,
} from "@/lib/google-form-map";
import {
  hasConsultErrors,
  validateConsultStep1,
  validateConsultStep2,
  type ConsultFieldErrors,
} from "@/lib/google-form-validation";

const IFRAME_NAME = "google-form-target";

const ui = {
  stepContact: { vi: "Thông tin liên hệ", en: "Contact details" },
  stepStudent: { vi: "Thông tin học sinh", en: "Student details" },
  next: { vi: "Tiếp tục", en: "Continue" },
  back: { vi: "Quay lại", en: "Back" },
  submit: { vi: "• Gửi đăng ký •", en: "• Submit •" },
  submitting: { vi: "Đang gửi…", en: "Sending…" },
  success: {
    vi: "Đăng ký thành công. Trung tâm sẽ liên hệ tư vấn sớm.",
    en: "Registration successful. We will contact you soon.",
  },
  successSub: {
    vi: "Cảm ơn bạn đã gửi đăng ký",
    en: "Thank you for registering",
  },
  reset: { vi: "Gửi đăng ký khác", en: "Submit another" },
  optional: { vi: "tuỳ chọn", en: "optional" },
  parentName: {
    vi: "Họ và tên phụ huynh",
    en: "Parent / guardian name",
  },
  studentName: { vi: "Họ và tên học sinh", en: "Student name" },
  phone: { vi: "Số điện thoại", en: "Phone" },
  email: { vi: "Địa chỉ Gmail", en: "Gmail" },
  schoolClass: {
    vi: "Trường, lớp đang theo học",
    en: "School and class",
  },
  source: {
    vi: "Biết lớp học qua đâu?",
    en: "How did you hear about us?",
  },
  sourceOther: { vi: "Ghi rõ nguồn khác", en: "Please specify" },
  sourceLabels: {
    "Qua mạng xã hội": { vi: "Qua mạng xã hội", en: "Social media" },
    "Qua bạn bè, người thân": {
      vi: "Qua bạn bè, người thân",
      en: "Friends or family",
    },
    "Mục khác": { vi: "Mục khác", en: "Other" },
  } as Record<GoogleFormSourceOption, { vi: string; en: string }>,
  experience: {
    vi: "Nền tảng lập trình (nếu có)",
    en: "Coding background (optional)",
  },
  expectation: {
    vi: "Kỳ vọng / mục tiêu của học sinh",
    en: "Student goal for this course",
  },
  phoneHint: {
    vi: "10 số, bắt đầu bằng 0",
    en: "10 digits starting with 0",
  },
};

/** Underline field — scaled for course-register overlay (light-on-dark). */
const fieldClass =
  "min-h-12 w-full rounded-none border-0 border-b border-white/40 bg-transparent px-1.5 py-1.5 text-base leading-relaxed tracking-[0.01em] text-white shadow-none outline-none transition-[border-color] placeholder:text-white/55 hover:border-white focus-visible:border-blue-300 focus-visible:ring-0";

const solidBtn =
  "inline-flex min-h-14 cursor-pointer items-center justify-center rounded-md border-0 bg-white px-8 py-4 text-[0.9rem] font-extrabold uppercase tracking-[0.08em] text-primary shadow-[0_10px_28px_rgba(15,23,42,0.28)] transition-colors hover:bg-accent hover:text-primary disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

const ghostBtn =
  "inline-flex min-h-14 flex-1 cursor-pointer items-center justify-center rounded-md border border-white/55 bg-transparent px-6 py-3.5 text-[0.875rem] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:border-white hover:bg-white/10 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

const labelClass =
  "mb-2 block text-[0.875rem] font-extrabold uppercase leading-snug tracking-[0.07em] text-white";

export function CourseConsultForm() {
  const { locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const formId = useId();
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] =
    useState<CourseConsultFormValues>(EMPTY_CONSULT_FORM);
  const [errors, setErrors] = useState<ConsultFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [hiddenPairs, setHiddenPairs] = useState<
    Array<{ name: string; value: string }>
  >([]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (status !== "submitting" || hiddenPairs.length === 0) return;
    const form = hiddenFormRef.current;
    if (!form) return;
    const t = window.setTimeout(() => {
      form.submit();
      startTransition(() => {
        setStatus("success");
        setValues(EMPTY_CONSULT_FORM);
        setStep(1);
        setErrors({});
        setHiddenPairs([]);
      });
    }, 50);
    return () => window.clearTimeout(t);
  }, [status, hiddenPairs]);

  const setField = <K extends keyof CourseConsultFormValues>(
    key: K,
    value: CourseConsultFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const goNext = () => {
    const stepErrors = validateConsultStep1(values, locale);
    setErrors(stepErrors);
    if (hasConsultErrors(stepErrors)) return;
    setStep(2);
  };

  const goBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = () => {
    const stepErrors = validateConsultStep2(values, locale);
    setErrors(stepErrors);
    if (hasConsultErrors(stepErrors)) return;

    const step1 = validateConsultStep1(values, locale);
    if (hasConsultErrors(step1)) {
      setErrors(step1);
      setStep(1);
      return;
    }

    setHiddenPairs(buildGoogleFormPayload(values));
    setStatus("submitting");
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  if (status === "success") {
    return (
      <div className="relative z-[100] flex min-h-48 w-full max-w-[42em] flex-col justify-end gap-4 text-white">
        <p className="m-0 text-balance text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          {ui.success[locale]}
        </p>
        <p className="m-0 text-[0.9rem] uppercase tracking-[0.04em] text-white/90">
          {ui.successSub[locale]}
        </p>
        <button
          type="button"
          className="w-fit min-h-11 cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold text-blue-200 underline underline-offset-4"
          onClick={() => setStatus("idle")}
        >
          {ui.reset[locale]}
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-[100] w-full max-w-[42em]">
      <iframe
        name={IFRAME_NAME}
        title="google-form-submission"
        className="hidden"
        aria-hidden
        tabIndex={-1}
      />
      <form
        ref={hiddenFormRef}
        action={GOOGLE_FORM_POST_URL}
        method="POST"
        target={IFRAME_NAME}
        className="hidden"
        aria-hidden
      >
        {hiddenPairs.map((pair) => (
          <input
            key={`${pair.name}-${pair.value.slice(0, 24)}`}
            type="hidden"
            name={pair.name}
            value={pair.value}
            readOnly
          />
        ))}
      </form>

      <Progress
        value={step === 1 ? 45 : 100}
        className="mb-10 h-1.5 bg-white/20"
        aria-label={
          step === 1 ? ui.stepContact[locale] : ui.stepStudent[locale]
        }
      />

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={transition}
            className="flex w-full flex-col"
          >
            {/* Identity pair — tight group */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <OverlayField
                id={`${formId}-parent`}
                label={ui.parentName[locale]}
                required
                error={errors.parentName}
              >
                <input
                  id={`${formId}-parent`}
                  className={fieldClass}
                  autoComplete="name"
                  value={values.parentName}
                  onChange={(e) => setField("parentName", e.target.value)}
                  aria-invalid={Boolean(errors.parentName)}
                />
              </OverlayField>

              <OverlayField
                id={`${formId}-student`}
                label={ui.studentName[locale]}
                required
                error={errors.studentName}
              >
                <input
                  id={`${formId}-student`}
                  className={fieldClass}
                  value={values.studentName}
                  onChange={(e) => setField("studentName", e.target.value)}
                  aria-invalid={Boolean(errors.studentName)}
                />
              </OverlayField>
            </div>

            {/* Contact pair */}
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <OverlayField
                id={`${formId}-phone`}
                label={ui.phone[locale]}
                required
                hint={ui.phoneHint[locale]}
                error={errors.phone}
              >
                <input
                  id={`${formId}-phone`}
                  className={fieldClass}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="09xx xxx xxx"
                  value={values.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
              </OverlayField>

              <OverlayField
                id={`${formId}-email`}
                label={ui.email[locale]}
                required
                error={errors.email}
              >
                <input
                  id={`${formId}-email`}
                  className={fieldClass}
                  type="email"
                  autoComplete="email"
                  placeholder="name@gmail.com"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
              </OverlayField>
            </div>

            {/* CTA — generous separation from fields */}
            <div className="mt-12">
              <button
                type="button"
                className={cn(solidBtn, "w-full sm:w-auto sm:min-w-[11.5rem]")}
                onClick={goNext}
              >
                {ui.next[locale]}
                <ChevronRight className="ml-2 h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={transition}
            className="flex w-full flex-col"
          >
            <OverlayField
              id={`${formId}-school`}
              label={ui.schoolClass[locale]}
              required
              error={errors.schoolClass}
            >
              <input
                id={`${formId}-school`}
                className={fieldClass}
                value={values.schoolClass}
                onChange={(e) => setField("schoolClass", e.target.value)}
                aria-invalid={Boolean(errors.schoolClass)}
              />
            </OverlayField>

            <fieldset className="mt-8 w-full">
              <legend className={labelClass}>
                {ui.source[locale]}
                <span className="ml-1 text-blue-300">*</span>
              </legend>
              <div className="flex flex-col gap-2" role="radiogroup">
                {GOOGLE_FORM_SOURCE_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className="flex min-h-12 cursor-pointer items-center gap-3 text-base leading-snug text-white"
                  >
                    <input
                      type="radio"
                      name={`${formId}-source`}
                      value={opt}
                      checked={values.source === opt}
                      onChange={() => {
                        setField("source", opt);
                        if (opt !== "Mục khác") setField("sourceOther", "");
                      }}
                      className="h-[1.125rem] w-[1.125rem] accent-primary"
                    />
                    <span>{ui.sourceLabels[opt][locale]}</span>
                  </label>
                ))}
              </div>
              {errors.source && (
                <p className="mt-2 text-sm text-red-200" role="alert">
                  {errors.source}
                </p>
              )}
            </fieldset>

            {values.source === "Mục khác" && (
              <div className="mt-6">
                <OverlayField
                  id={`${formId}-source-other`}
                  label={ui.sourceOther[locale]}
                  required
                  error={errors.sourceOther}
                >
                  <input
                    id={`${formId}-source-other`}
                    className={fieldClass}
                    value={values.sourceOther}
                    onChange={(e) => setField("sourceOther", e.target.value)}
                  />
                </OverlayField>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-8">
              <OverlayField
                id={`${formId}-exp`}
                label={`${ui.experience[locale]} (${ui.optional[locale]})`}
              >
                <textarea
                  id={`${formId}-exp`}
                  className={cn(fieldClass, "min-h-[5em] resize-none pt-1.5")}
                  rows={2}
                  value={values.experience}
                  onChange={(e) => setField("experience", e.target.value)}
                />
              </OverlayField>

              <OverlayField
                id={`${formId}-expect`}
                label={ui.expectation[locale]}
                required
                error={errors.expectation}
              >
                <textarea
                  id={`${formId}-expect`}
                  className={cn(fieldClass, "min-h-[5.5em] resize-none pt-1.5")}
                  rows={3}
                  value={values.expectation}
                  onChange={(e) => setField("expectation", e.target.value)}
                  aria-invalid={Boolean(errors.expectation)}
                />
              </OverlayField>
            </div>

            <div className="mt-12 flex w-full flex-col-reverse gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className={ghostBtn}
                onClick={goBack}
                disabled={status === "submitting"}
              >
                <ChevronLeft className="mr-1 h-4 w-4" aria-hidden />
                {ui.back[locale]}
              </button>
              <button
                type="button"
                className={cn(solidBtn, "flex-[1.4]")}
                onClick={handleSubmit}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden
                    />
                    {ui.submitting[locale]}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" aria-hidden />
                    {ui.submit[locale]}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OverlayField({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-blue-300">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-2 text-sm leading-snug text-white/75">{hint}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default CourseConsultForm;
