"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type ReactElement,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import { useBootAnimationReady } from "@/contexts/BootRevealContext";
import {
  buildGoogleFormPayload,
  EMPTY_CONSULT_FORM,
  GOOGLE_FORM_POST_URL,
  GOOGLE_FORM_SOURCE_OPTIONS,
  type CourseConsultFormValues,
  type GoogleFormSourceOption,
} from "@/lib/google-form-map";
import {
  clearConsultFormDraft,
  readConsultFormDraft,
  writeConsultFormDraft,
} from "@/lib/course-consult-draft";
import {
  hasConsultErrors,
  validateConsultStep1,
  validateConsultStep2,
  type ConsultFieldErrors,
} from "@/lib/google-form-validation";

const IFRAME_NAME = "google-form-target";

/** Pause before form reveals — lets left panel finish first */
const FORM_ENTER_DELAY_S = 0.38;
const FORM_ENTER_EASE = [0.16, 1, 0.3, 1] as const;

const ui = {
  stepOf: {
    vi: (current: number, total: number) => `Bước ${current}/${total}`,
    en: (current: number, total: number) => `Step ${current} of ${total}`,
  },
  stepContact: { vi: "Thông tin liên hệ", en: "Contact details" },
  stepStudent: { vi: "Thông tin học sinh", en: "Student details" },
  next: {
    vi: "Tiếp tục — thông tin học sinh",
    en: "Continue — student details",
  },
  nextShort: { vi: "Tiếp tục", en: "Continue" },
  back: { vi: "Quay lại", en: "Back" },
  submit: { vi: "Gửi đăng ký", en: "Submit registration" },
  submitting: { vi: "Đang gửi…", en: "Sending…" },
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
  roboticsDream: {
    vi: "Ước mơ / dự định tương lai về Robotics",
    en: "Future robotics goals or dreams",
  },
  phoneHint: {
    vi: "10 số, bắt đầu bằng 0",
    en: "10 digits starting with 0",
  },
  replyHint: {
    vi: "Phản hồi trong 24–48 giờ qua email hoặc Messenger",
    en: "We reply within 24–48 hours by email or Messenger",
  },
  optionalToggle: {
    vi: "Thêm nền tảng lập trình (tuỳ chọn)",
    en: "Add coding background (optional)",
  },
  timeHint: {
    vi: "Khoảng 1–2 phút để hoàn tất",
    en: "About 1–2 minutes to complete",
  },
};

const STEP1_FIELD_ORDER = [
  "parentName",
  "studentName",
  "phone",
  "email",
] as const satisfies readonly (keyof CourseConsultFormValues)[];

const STEP2_FIELD_ORDER = [
  "schoolClass",
  "source",
  "sourceOther",
  "expectation",
  "roboticsDream",
] as const satisfies readonly (keyof CourseConsultFormValues)[];

/** Underline field — 48px+ touch, 16px text for mobile readability */
const fieldClass =
  "min-h-12 w-full rounded-none border-0 border-b border-white/45 bg-transparent px-1 py-2.5 text-base leading-relaxed tracking-[0.01em] text-white shadow-none outline-none transition-[border-color] placeholder:text-white/80 hover:border-white focus-visible:border-blue-300 focus-visible:ring-0 max-lg:text-[1.0625rem]";

const solidBtn =
  "inline-flex min-h-14 cursor-pointer items-center justify-center rounded-md border-0 bg-white px-8 py-4 text-[0.9375rem] font-semibold leading-snug tracking-normal text-primary shadow-[0_10px_28px_rgba(15,23,42,0.28)] transition-colors hover:bg-accent hover:text-primary disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

const ghostBtn =
  "inline-flex min-h-14 flex-1 cursor-pointer items-center justify-center rounded-md border border-white/55 bg-transparent px-6 py-3.5 text-[0.875rem] font-semibold leading-snug tracking-normal text-white transition-colors hover:border-white hover:bg-white/10 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

const labelClass =
  "mb-1.5 block text-[0.875rem] font-semibold leading-snug tracking-normal text-white lg:mb-1 lg:text-[0.8125rem]";

const textareaClass =
  "min-h-[3.25em] resize-y pt-1.5 max-lg:min-h-[3.25em] lg:min-h-[2.35rem] lg:resize-none lg:py-1.5 lg:text-[0.9375rem]";

const radioLabelClass =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-white/25 bg-white/[0.04] px-3 py-2.5 text-[0.9375rem] leading-snug text-white transition-colors hover:border-white/45 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-300 has-[:checked]:border-primary/80 has-[:checked]:bg-primary/15 max-lg:min-h-[3rem] max-lg:text-base lg:min-h-10 lg:gap-2 lg:px-2.5 lg:py-2 lg:text-[0.8125rem]";

const radioInputClass =
  "h-5 w-5 shrink-0 cursor-pointer accent-primary focus-visible:outline-none max-lg:h-[1.375rem] max-lg:w-[1.375rem]";

const actionBarClass =
  "mt-6 flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center max-lg:sticky max-lg:bottom-0 max-lg:z-20 max-lg:-mx-0.5 max-lg:border-t max-lg:border-white/15 max-lg:bg-slate-950/80 max-lg:px-0.5 max-lg:py-3 max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))] max-lg:backdrop-blur-md lg:mt-3 lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none";

const solidBtnCompact =
  "lg:min-h-12 lg:px-6 lg:py-3 lg:text-[0.875rem]";

const ghostBtnCompact =
  "lg:min-h-12 lg:px-5 lg:py-2.5 lg:text-[0.8125rem]";

function readInitialDraft(): { step: 1 | 2; values: CourseConsultFormValues } | null {
  if (typeof window === "undefined") return null;
  return readConsultFormDraft();
}

function focusFirstError(
  formId: string,
  step: 1 | 2,
  errors: ConsultFieldErrors,
) {
  const order = step === 1 ? STEP1_FIELD_ORDER : STEP2_FIELD_ORDER;
  const firstKey = order.find((key) => errors[key]);
  if (!firstKey) return;

  const idMap: Record<string, string> = {
    parentName: `${formId}-parent`,
    studentName: `${formId}-student`,
    phone: `${formId}-phone`,
    email: `${formId}-email`,
    schoolClass: `${formId}-school`,
    source: `${formId}-source`,
    sourceOther: `${formId}-source-other`,
    expectation: `${formId}-expect`,
    roboticsDream: `${formId}-robotics`,
  };

  const targetId = idMap[firstKey];
  if (!targetId) return;

  if (firstKey === "source") {
    const radio = document.querySelector<HTMLInputElement>(
      `input[name="${formId}-source"]`,
    );
    radio?.focus();
    return;
  }

  document.getElementById(targetId)?.focus();
}

export function CourseConsultForm() {
  const { locale } = useLanguage();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const animationReady = useBootAnimationReady();
  const formId = useId();
  const formShellRef = useRef<HTMLDivElement>(null);
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2>(
    () => readInitialDraft()?.step ?? 1,
  );
  const [values, setValues] = useState<CourseConsultFormValues>(
    () => readInitialDraft()?.values ?? EMPTY_CONSULT_FORM,
  );
  const [errors, setErrors] = useState<ConsultFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [hiddenPairs, setHiddenPairs] = useState<
    Array<{ name: string; value: string }>
  >([]);
  const [, startTransition] = useTransition();
  const draftHydratedRef = useRef(false);

  useEffect(() => {
    draftHydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!draftHydratedRef.current) return;
    writeConsultFormDraft({ step, values });
  }, [step, values]);

  useEffect(() => {
    if (status !== "submitting" || hiddenPairs.length === 0) return;
    const form = hiddenFormRef.current;
    if (!form) return;
    const t = window.setTimeout(() => {
      form.submit();
      startTransition(() => {
        clearConsultFormDraft();
        setValues(EMPTY_CONSULT_FORM);
        setStep(1);
        setErrors({});
        setHiddenPairs([]);
        setStatus("idle");

        const go = () => {
          captureEvent(AnalyticsEvents.COURSE_REGISTER_SUBMITTED, {
            surface: "/course-register-form",
          });
          router.push("/course-register-form/success");
        };
        if (
          typeof document !== "undefined" &&
          "startViewTransition" in document
        ) {
          (
            document as Document & {
              startViewTransition: (callback: () => void) => void;
            }
          ).startViewTransition(go);
        } else {
          go();
        }
      });
    }, 50);
    return () => window.clearTimeout(t);
  }, [status, hiddenPairs, router]);

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
    if (hasConsultErrors(stepErrors)) {
      focusFirstError(formId, 1, stepErrors);
      return;
    }
    setStep(2);
    formShellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    setStep(1);
    setErrors({});
    formShellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = () => {
    captureEvent(AnalyticsEvents.COURSE_REGISTER_SUBMIT_CLICKED, {
      button_label: ui.submit[locale],
      step: String(step),
      surface: "/course-register-form",
    });

    const stepErrors = validateConsultStep2(values, locale);
    setErrors(stepErrors);
    if (hasConsultErrors(stepErrors)) {
      focusFirstError(formId, 2, stepErrors);
      return;
    }

    const step1 = validateConsultStep1(values, locale);
    if (hasConsultErrors(step1)) {
      setErrors(step1);
      setStep(1);
      focusFirstError(formId, 1, step1);
      return;
    }

    setHiddenPairs(buildGoogleFormPayload(values));
    setStatus("submitting");
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };

  const formControls = useAnimationControls();
  const formEnteredRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      formControls.set({ opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }
    if (!animationReady) {
      formEnteredRef.current = false;
      formControls.set({ opacity: 1, y: 18, filter: "blur(5px)" });
      return;
    }
    if (formEnteredRef.current) return;
    formEnteredRef.current = true;

    formControls.set({ opacity: 1, y: 18, filter: "blur(5px)" });
    void formControls.start({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        delay: FORM_ENTER_DELAY_S,
        ease: FORM_ENTER_EASE,
      },
    });
  }, [animationReady, formControls, reduceMotion]);

  const stepLabel =
    step === 1 ? ui.stepContact[locale] : ui.stepStudent[locale];

  return (
    <motion.div
      ref={formShellRef}
      className="relative z-10 w-full min-w-0 max-w-[42em] scroll-mt-24 lg:max-w-none"
      initial={false}
      animate={formControls}
    >
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

      <div className="mb-2 flex flex-col gap-0.5 lg:mb-1">
        <p className="m-0 text-sm font-medium leading-snug text-white/90">
          <span className="text-white">{ui.stepOf[locale](step, 2)}</span>
          <span className="text-white/70" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span>{stepLabel}</span>
        </p>
        <p className="m-0 text-xs leading-snug text-white/70 lg:hidden">
          {ui.replyHint[locale]}
          <span className="text-white/50" aria-hidden>
            {" "}
            ·{" "}
          </span>
          {ui.timeHint[locale]}
        </p>
      </div>

      <Progress
        value={step === 1 ? 45 : 100}
        className="mb-4 h-1 bg-white/20 lg:mb-2.5"
        aria-label={stepLabel}
      />

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.form
            key="step1"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              goNext();
            }}
            initial={reduceMotion ? false : { opacity: 1, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 1, y: -4 }}
            transition={transition}
            className="flex w-full flex-col"
          >
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2">
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
                  enterKeyHint="next"
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
                  autoComplete="additional-name"
                  enterKeyHint="next"
                  value={values.studentName}
                  onChange={(e) => setField("studentName", e.target.value)}
                  aria-invalid={Boolean(errors.studentName)}
                />
              </OverlayField>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2">
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
                  enterKeyHint="next"
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
                  inputMode="email"
                  autoComplete="email"
                  enterKeyHint="go"
                  placeholder="name@gmail.com"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
              </OverlayField>
            </div>

            <div className={actionBarClass}>
              <button type="submit" className={cn(solidBtn, "w-full sm:w-auto sm:min-w-[11.5rem]")}>
                <span className="sm:hidden">{ui.nextShort[locale]}</span>
                <span className="hidden sm:inline">{ui.next[locale]}</span>
                <ChevronRight className="ml-2 h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            initial={reduceMotion ? false : { opacity: 1, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 1, y: -4 }}
            transition={transition}
            className="flex w-full flex-col lg:gap-2"
          >
            <div className="flex w-full flex-col gap-3 lg:gap-2.5">
            <OverlayField
              id={`${formId}-school`}
              label={ui.schoolClass[locale]}
              required
              error={errors.schoolClass}
            >
              <input
                id={`${formId}-school`}
                className={fieldClass}
                autoComplete="organization"
                enterKeyHint="next"
                value={values.schoolClass}
                onChange={(e) => setField("schoolClass", e.target.value)}
                aria-invalid={Boolean(errors.schoolClass)}
              />
            </OverlayField>

            <fieldset className="w-full lg:mt-0">
              <legend className={labelClass}>
                {ui.source[locale]}
                <span className="ml-1 text-blue-300" aria-hidden>
                  *
                </span>
                <span className="sr-only"> (required)</span>
              </legend>
              <div
                className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-2"
                role="radiogroup"
                id={`${formId}-source`}
                aria-describedby={errors.source ? `${formId}-source-error` : undefined}
                aria-invalid={Boolean(errors.source)}
              >
                {GOOGLE_FORM_SOURCE_OPTIONS.map((opt) => (
                  <label key={opt} className={radioLabelClass}>
                    <input
                      type="radio"
                      name={`${formId}-source`}
                      value={opt}
                      checked={values.source === opt}
                      onChange={() => {
                        setField("source", opt);
                        if (opt !== "Mục khác") setField("sourceOther", "");
                      }}
                      className={radioInputClass}
                    />
                    <span>{ui.sourceLabels[opt][locale]}</span>
                  </label>
                ))}
              </div>
              {errors.source && (
                <p
                  id={`${formId}-source-error`}
                  className="mt-2 text-sm text-red-200"
                  role="alert"
                >
                  {errors.source}
                </p>
              )}
            </fieldset>

            {values.source === "Mục khác" && (
              <div className="mt-2 lg:mt-0">
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

            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2.5">
              <details
                className="group rounded-sm border border-white/20 bg-white/5 open:border-white/30 open:pb-2 lg:col-span-2"
                open={values.experience.trim().length > 0}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center px-3 text-sm font-medium text-white/90 marker:content-none lg:min-h-9 lg:px-2.5 lg:text-[0.8125rem] [&::-webkit-details-marker]:hidden">
                  {ui.optionalToggle[locale]}
                </summary>
                <div className="px-3 pt-1 lg:px-2.5">
                  <OverlayField
                    id={`${formId}-exp`}
                    label={ui.experience[locale]}
                  >
                    <textarea
                      id={`${formId}-exp`}
                      className={cn(fieldClass, textareaClass)}
                      rows={2}
                      value={values.experience}
                      onChange={(e) => setField("experience", e.target.value)}
                    />
                  </OverlayField>
                </div>
              </details>

              <OverlayField
                id={`${formId}-expect`}
                label={ui.expectation[locale]}
                required
                error={errors.expectation}
              >
                <textarea
                  id={`${formId}-expect`}
                  className={cn(fieldClass, textareaClass)}
                  rows={2}
                  value={values.expectation}
                  onChange={(e) => setField("expectation", e.target.value)}
                  aria-invalid={Boolean(errors.expectation)}
                />
              </OverlayField>

              <OverlayField
                id={`${formId}-robotics`}
                label={ui.roboticsDream[locale]}
                required
                error={errors.roboticsDream}
              >
                <textarea
                  id={`${formId}-robotics`}
                  className={cn(fieldClass, textareaClass)}
                  rows={2}
                  value={values.roboticsDream}
                  onChange={(e) => setField("roboticsDream", e.target.value)}
                  aria-invalid={Boolean(errors.roboticsDream)}
                />
              </OverlayField>
            </div>
            </div>

            <div className={actionBarClass}>
              <button
                type="button"
                className={cn(ghostBtn, ghostBtnCompact)}
                onClick={goBack}
                disabled={status === "submitting"}
              >
                <ChevronLeft className="mr-1 h-4 w-4" aria-hidden />
                {ui.back[locale]}
              </button>
              <button
                type="submit"
                className={cn(solidBtn, solidBtnCompact, "flex-[1.4]")}
                data-analytics-id="course-register-submit"
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
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
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
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [error ? errorId : undefined, !error && hint ? hintId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const child = Children.only(children);
  const fieldControl = isValidElement(child)
    ? cloneElement(child as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className="w-full min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className="ml-1 text-blue-300" aria-hidden>
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {fieldControl}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-sm leading-snug text-white/80">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default CourseConsultForm;
