"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import {
  buildRecruitmentFormPayload,
  EMPTY_RECRUITMENT_FORM,
  getRecruitmentDiscoverySourceLabel,
  getRecruitmentDivisionCopy,
  RECRUITMENT_DISCOVERY_SOURCES,
  RECRUITMENT_FORM_POST_URL,
  RECRUITMENT_DIVISIONS,
  type RecruitmentDivision,
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
    personalShort: "Cá nhân",
    common: "Động lực & lựa chọn",
    commonShort: "Lựa chọn",
    branch: "Câu hỏi theo ban",
    branchShort: "Theo ban",
    required: "Bắt buộc",
    optional: "Không bắt buộc",
    errorSummary: (count: number) =>
      `Cần kiểm tra ${count} mục trước khi tiếp tục.`,
    trust:
      "Thông tin này chỉ được đội dùng để xem đơn và liên hệ về tuyển thành viên.",
    nextSteps:
      "Sau khi gửi, đội sẽ đọc đơn và liên hệ qua điện thoại hoặc email. Bản nháp chỉ được lưu trên thiết bị này.",
    draftRestored: "Đã khôi phục bản nháp trên thiết bị này.",
    beginnerNote:
      "Không cần kinh nghiệm robotics trước đó. Bạn có thể kể về điều từng học ở trường, tự tìm hiểu hoặc viết “chưa có kinh nghiệm” và cách bạn muốn bắt đầu.",
    fullName: "Họ và tên",
    birthDate: "Ngày/tháng/năm sinh",
    classCohort: "Lớp - khóa",
    phone: "Số điện thoại",
    email: "Email",
    facebook: "Link Facebook",
    facebookHelp: "Có thể để trống nếu bạn muốn đội liên hệ qua điện thoại hoặc email.",
    discoverySource: "Bạn biết đến Robotics Sóc Sơn qua đâu?",
    discoverySourceOther: "Nguồn khác",
    motivation: "Điều gì khiến bạn muốn trở thành một phần của Robotics Sóc Sơn?",
    division: "Bạn muốn đăng ký ban nào?",
    next: "Tiếp tục",
    back: "Quay lại",
    submit: "Gửi đơn tuyển thành viên",
    sending: "Đang gửi…",
    submissionError:
      "Chưa thể chuyển đơn tới Google Forms. Kiểm tra kết nối rồi thử lại, nội dung của bạn vẫn được giữ.",
    successTitle: "Đơn đã được gửi",
    successBody: "Cảm ơn bạn đã muốn đồng hành cùng Robotics Sóc Sơn. Đội sẽ đọc đơn và liên hệ với bạn sớm.",
    successAgain: "Gửi đơn khác",
    time: "Khoảng 6-8 phút",
    branchHint: "Chọn nơi bạn tò mò nhất. Kinh nghiệm chưa phải điều kiện bắt đầu.",
    mechanical: {
      title: "Cơ khí - Thiết kế",
      experience: "Bạn đã từng thử thiết kế, sửa chữa hoặc lắp ráp thứ gì chưa? Có thể là bài học ở trường, dự án cá nhân hoặc chưa có kinh nghiệm.",
      tools: "Bạn đã thử công cụ hoặc phần mềm nào? Nếu chưa, bạn muốn học công cụ gì đầu tiên?",
      debugging: "Khi một chi tiết lắp chưa khớp, bạn sẽ quan sát và thử những bước nào để tìm nguyên nhân?",
      expectations: "Bạn mong muốn nhận được điều gì khi tham gia ban Cơ khí - Thiết kế của Robotics Sóc Sơn?",
    },
    code: {
      title: "Code - Điện tử",
      experience: "Bạn đã từng thử viết code hoặc dùng Arduino, ESP32 chưa? Có thể kể về bài học nhỏ hoặc ghi “chưa từng thử”.",
      electronics: "Bạn đã từng nối mạch, dùng cảm biến hoặc động cơ chưa? Nếu chưa, điều gì khiến bạn muốn học?",
      debugging: "Khi robot không làm đúng điều bạn mong đợi, bạn sẽ kiểm tra từng bước như thế nào?",
      expectations: "Bạn mong muốn nhận được điều gì khi tham gia ban Code - Điện tử của Robotics Sóc Sơn?",
    },
    media: {
      title: "Truyền thông",
      strengths: "Bạn thích kể chuyện bằng cách nào: viết, thiết kế, ảnh, video hay tổ chức hoạt động? Chưa có kinh nghiệm cũng không sao.",
      tools: "Bạn đã thử công cụ sáng tạo nào? Có thể là Canva, CapCut, Figma hoặc một công cụ bạn muốn học.",
      commitment: "Bạn thường sắp xếp việc học và hoạt động đội nhóm ra sao? Hãy chia sẻ khoảng thời gian bạn có thể dành mỗi tuần.",
      expectations: "Bạn mong muốn nhận được điều gì khi tham gia ban Truyền thông của Robotics Sóc Sơn?",
    },
  },
  en: {
    step: (current: number) => `Step ${current} of 3`,
    personal: "Personal details",
    personalShort: "Details",
    common: "Motivation & choice",
    commonShort: "Choice",
    branch: "Division questions",
    branchShort: "Division",
    required: "Required",
    optional: "Optional",
    errorSummary: (count: number) =>
      `Check ${count} field${count === 1 ? "" : "s"} before continuing.`,
    trust:
      "The team only uses this information to review applications and contact you about recruitment.",
    nextSteps:
      "After submission, the team will review your answers and contact you by phone or email. Your draft stays on this device only.",
    draftRestored: "Your saved draft was restored on this device.",
    beginnerNote:
      "No previous robotics experience is required. You can share something from school, self-learning, or say that you are new and explain how you want to begin.",
    fullName: "Full name",
    birthDate: "Date of birth",
    classCohort: "Class / cohort",
    phone: "Phone number",
    email: "Email",
    facebook: "Facebook link",
    facebookHelp: "Leave this blank if you prefer contact by phone or email.",
    discoverySource: "How did you hear about Robotics Sóc Sơn?",
    discoverySourceOther: "Other source",
    motivation: "What makes you want to become part of Robotics Sóc Sơn?",
    division: "Which division would you like to join?",
    next: "Continue",
    back: "Back",
    submit: "Submit member application",
    sending: "Sending…",
    submissionError:
      "We could not hand your application to Google Forms. Check your connection and try again. Your answers are still saved.",
    successTitle: "Application sent",
    successBody: "Thanks for wanting to join Robotics Sóc Sơn. The team will review your application and contact you soon.",
    successAgain: "Send another application",
    time: "About 6-8 minutes",
    branchHint: "Choose the area that interests you most. Experience is not required to start.",
    mechanical: {
      title: "Mechanical - Design",
      experience: "Have you tried designing, repairing, or assembling anything? A school project, personal attempt, or no experience yet are all valid.",
      tools: "Which tools or software have you tried? If none, what would you like to learn first?",
      debugging: "If a part does not fit, what would you observe and test to find the cause?",
      expectations: "What do you hope to gain from joining Robotics Sóc Sơn’s Mechanical - Design division?",
    },
    code: {
      title: "Code - Electronics",
      experience: "Have you tried coding or using Arduino or ESP32? A small lesson or “not yet” are both useful answers.",
      electronics: "Have you tried wiring, sensors, or motors? If not, what makes you curious about them?",
      debugging: "If a robot does not behave as expected, how would you check the problem one step at a time?",
      expectations: "What do you hope to gain from joining Robotics Sóc Sơn’s Code - Electronics division?",
    },
    media: {
      title: "Communications",
      strengths: "How do you enjoy telling stories: writing, design, photography, video, or events? No experience yet is also welcome.",
      tools: "Which creative tools have you tried? Canva, CapCut, Figma, or a tool you want to learn all count.",
      commitment: "How do you balance school and team activities? Share the time you could reasonably contribute each week.",
      expectations: "What do you hope to gain from joining Robotics Sóc Sơn’s Communications division?",
    },
  },
} as const;

const RECRUITMENT_DRAFT_KEY = "robotics-soc-son:recruitment-draft:v1";
const SUBMISSION_TIMEOUT_MS = 15_000;
const inputClass =
  "min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base text-slate-950 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";
const labelClass = "mb-2 block text-sm font-semibold leading-snug text-slate-900";

const fieldId = (formId: string, field: string) => `${formId}-${field}`;

function clearRecruitmentDraft() {
  try {
    window.localStorage.removeItem(RECRUITMENT_DRAFT_KEY);
  } catch {
    // Draft storage is an enhancement; submission must still work without it.
  }
}

function getStepForField(key: RecruitmentFieldKey): 1 | 2 | 3 {
  if (["fullName", "birthDate", "classCohort", "phone", "email", "facebook"].includes(key)) {
    return 1;
  }
  if (["discoverySource", "discoverySourceOther", "motivation", "division"].includes(key)) {
    return 2;
  }
  return 3;
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  helperText,
  required = true,
  requiredLabel,
  optionalLabel,
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
  autoComplete?: string;
  helperText?: string;
  required?: boolean;
  requiredLabel: string;
  optionalLabel: string;
  index?: number;
  reduceMotion?: boolean | null;
}) {
  const describedBy = [
    helperText ? `${id}-hint` : "",
    error ? `${id}-error` : "",
  ].filter(Boolean).join(" ") || undefined;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px) scale(0.985)" }}
      animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
      transition={{ duration: 0.28, delay: reduceMotion ? 0 : index * 0.045, ease: [0.23, 1, 0.32, 1] }}
    >
      <label className={labelClass} htmlFor={id}>
        {label}{" "}
        {required ? (
          <>
            <span aria-hidden className="text-red-600">*</span>
            <span className="sr-only">({requiredLabel})</span>
          </>
        ) : (
          <span className="font-normal text-slate-500">({optionalLabel})</span>
        )}
      </label>
      <input
        id={id}
        className={cn(inputClass, error && "border-red-500 focus:border-red-600 focus:ring-red-600/10")}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        maxLength={type === "url" ? 500 : 120}
      />
      {helperText ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm leading-6 text-slate-600">
          {helperText}
        </p>
      ) : null}
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
  helperText,
  required = true,
  requiredLabel,
  optionalLabel,
  index = 0,
  reduceMotion,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  helperText?: string;
  required?: boolean;
  requiredLabel: string;
  optionalLabel: string;
  index?: number;
  reduceMotion?: boolean | null;
}) {
  const describedBy = [
    helperText ? `${id}-hint` : "",
    error ? `${id}-error` : "",
  ].filter(Boolean).join(" ") || undefined;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px) scale(0.985)" }}
      animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
      transition={{ duration: 0.28, delay: reduceMotion ? 0 : index * 0.045, ease: [0.23, 1, 0.32, 1] }}
    >
      <label className={labelClass} htmlFor={id}>
        {label}{" "}
        {required ? (
          <>
            <span aria-hidden className="text-red-600">*</span>
            <span className="sr-only">({requiredLabel})</span>
          </>
        ) : (
          <span className="font-normal text-slate-500">({optionalLabel})</span>
        )}
      </label>
      <textarea
        id={id}
        className={cn(inputClass, "min-h-28 resize-y", error && "border-red-500 focus:border-red-600 focus:ring-red-600/10")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        maxLength={2000}
      />
      {helperText ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm leading-6 text-slate-600">
          {helperText}
        </p>
      ) : null}
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
  const clientReady = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const submissionStartedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const allowDecorativeMotion = clientReady && !reduceMotion;
  const progress = step / 3;
  const [values, setValues] = useState<RecruitmentFormValues>(EMPTY_RECRUITMENT_FORM);
  const [errors, setErrors] = useState<RecruitmentFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hiddenPairs, setHiddenPairs] = useState<Array<{ name: string; value: string }>>([]);
  const [draftReady, setDraftReady] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(RECRUITMENT_DRAFT_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as {
            values?: Partial<RecruitmentFormValues>;
            step?: number;
          };
          const hasSavedContent =
            parsed.step === 2 ||
            parsed.step === 3 ||
            Object.values(parsed.values ?? {}).some(
              (value) => typeof value === "string" && value.trim().length > 0,
            );
          if (hasSavedContent && parsed.values && typeof parsed.values === "object") {
            const restored = {
              ...EMPTY_RECRUITMENT_FORM,
              ...parsed.values,
            } as RecruitmentFormValues;
            if (
              restored.division &&
              !RECRUITMENT_DIVISIONS.includes(restored.division as RecruitmentDivision)
            ) {
              restored.division = "";
            }
            if (
              restored.discoverySource &&
              !RECRUITMENT_DISCOVERY_SOURCES.includes(restored.discoverySource)
            ) {
              restored.discoverySource = "";
            }
            setValues(restored);
            setStep(parsed.step === 2 || parsed.step === 3 ? parsed.step : 1);
            setDraftRestored(true);
          }
        }
      } catch {
        clearRecruitmentDraft();
      } finally {
        setDraftReady(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!draftReady || status === "success") return;
    const timer = window.setTimeout(() => {
      try {
        const hasContent =
          step > 1 ||
          Object.values(values).some(
            (value) => typeof value === "string" && value.trim().length > 0,
          );
        if (!hasContent) {
          clearRecruitmentDraft();
          return;
        }
        window.localStorage.setItem(
          RECRUITMENT_DRAFT_KEY,
          JSON.stringify({ values, step }),
        );
      } catch {
        // Continue without draft persistence when storage is unavailable.
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [draftReady, status, step, values]);

  useEffect(() => {
    if (status !== "success") return;
    const frame = window.requestAnimationFrame(() => successRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  const focusField = (field: RecruitmentFieldKey) => {
    window.setTimeout(() => {
      const control = document.getElementById(
        fieldId(formId, field),
      ) as HTMLElement | null;
      if (!control) return;
      control.scrollIntoView({
        block: "center",
        behavior: reduceMotion ? "auto" : "smooth",
      });
      control.focus({ preventScroll: true });
    }, 0);
  };

  useEffect(() => {
    if (status !== "submitting" || hiddenPairs.length === 0) return;
    const hiddenForm = hiddenFormRef.current;
    if (!hiddenForm) return;

    const submitTimer = window.setTimeout(() => {
      try {
        submissionStartedRef.current = true;
        hiddenForm.submit();
      } catch {
        submissionStartedRef.current = false;
        setStatus("error");
      }
    }, 50);
    const timeoutTimer = window.setTimeout(() => {
      submissionStartedRef.current = false;
      setStatus("error");
    }, SUBMISSION_TIMEOUT_MS);

    return () => {
      window.clearTimeout(submitTimer);
      window.clearTimeout(timeoutTimer);
    };
  }, [hiddenPairs, status]);

  const handleSubmissionLoad = () => {
    if (!submissionStartedRef.current) return;
    submissionStartedRef.current = false;
    clearRecruitmentDraft();
    captureEvent(AnalyticsEvents.RECRUITMENT_SUBMITTED, {
      surface: "/recruitment",
      division: values.division,
    });
    setStatus("success");
  };

  const handleSubmissionError = () => {
    if (!submissionStartedRef.current) return;
    submissionStartedRef.current = false;
    setStatus("error");
  };

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
    const firstInvalid = keys.find((key) => scoped[key]);
    if (firstInvalid) focusField(firstInvalid);
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
      const firstInvalid = Object.keys(nextErrors)[0] as RecruitmentFieldKey;
      setStep(getStepForField(firstInvalid));
      focusField(firstInvalid);
      return;
    }
    if (!window.navigator.onLine) {
      setStatus("error");
      return;
    }
    setHiddenPairs(buildRecruitmentFormPayload(values));
    setStatus("submitting");
  };

  const reset = () => {
    clearRecruitmentDraft();
    setValues(EMPTY_RECRUITMENT_FORM);
    setErrors({});
    setHiddenPairs([]);
    setStatus("idle");
    setStep(1);
    setDraftRestored(false);
  };

  if (status === "success") {
    return (
      <motion.div
        ref={successRef}
        role="status"
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(18px) scale(0.98)" }}
        animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white p-6 shadow-[0_16px_42px_rgba(15,23,42,0.14)] outline-none sm:p-10"
      >
        {allowDecorativeMotion ? (
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
      <iframe
        name="recruitment-google-form-target"
        title="google-form-submission"
        className="hidden"
        aria-hidden
        tabIndex={-1}
        onLoad={handleSubmissionLoad}
        onError={handleSubmissionError}
      />
      <form ref={hiddenFormRef} action={RECRUITMENT_FORM_POST_URL} method="POST" target="recruitment-google-form-target" className="hidden" aria-hidden>
        {hiddenPairs.map((pair) => <input key={`${pair.name}-${pair.value}`} type="hidden" name={pair.name} value={pair.value} readOnly />)}
      </form>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {status === "submitting"
          ? copy.sending
          : status === "error"
            ? copy.submissionError
            : copy.step(step)}
      </p>
      {draftRestored ? (
        <p className="sr-only" role="status" aria-live="polite">
          {copy.draftRestored}
        </p>
      ) : null}
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(24px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.14)] sm:p-8"
        aria-busy={status === "submitting"}
        noValidate
      >
        {allowDecorativeMotion ? (
          <motion.div
            aria-hidden
            animate={{ transform: ["translateX(-12%)", "translateX(112%)"] }}
            transition={{ duration: 7, repeat: Infinity, repeatDelay: 2, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-70"
          />
        ) : null}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
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
            <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{copy.time}</span>
          </div>
          <div className="mt-5" aria-label={copy.step(step)}>
            <div aria-hidden className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500 sm:uppercase sm:tracking-[0.12em]">
              <span className={step >= 1 ? "text-blue-700" : undefined}>
                <span className="sm:hidden">{copy.personalShort}</span>
                <span className="hidden sm:inline">{copy.personal}</span>
              </span>
              <span className={step >= 2 ? "text-blue-700" : undefined}>
                <span className="sm:hidden">{copy.commonShort}</span>
                <span className="hidden sm:inline">{copy.common}</span>
              </span>
              <span className={step >= 3 ? "text-blue-700" : undefined}>
                <span className="sm:hidden">{copy.branchShort}</span>
                <span className="hidden sm:inline">{copy.branch}</span>
              </span>
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

        {Object.keys(errors).length > 0 ? (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
          >
            {copy.errorSummary(Object.keys(errors).length)}
          </div>
        ) : null}

        <div className="mt-7 min-h-108">
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, transform: "translateX(10px)" }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
          >
              {step === 1 ? (
                <div className="space-y-5">
                  <div className="rounded-2xl bg-blue-50 px-4 py-4 text-sm leading-6 text-blue-950">
                    <p className="font-semibold">{copy.trust}</p>
                    <p className="mt-1 text-blue-900">{copy.nextSteps}</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id={fieldId(formId, "fullName")} label={copy.fullName} value={values.fullName} error={errors.fullName} onChange={update("fullName")} autoComplete="name" requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={0} />
                    <Field id={fieldId(formId, "birthDate")} label={copy.birthDate} value={values.birthDate} error={errors.birthDate} onChange={update("birthDate")} type="date" autoComplete="bday" requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={1} />
                    <Field id={fieldId(formId, "classCohort")} label={copy.classCohort} value={values.classCohort} error={errors.classCohort} onChange={update("classCohort")} autoComplete="off" requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={2} />
                    <Field id={fieldId(formId, "phone")} label={copy.phone} value={values.phone} error={errors.phone} onChange={update("phone")} type="tel" autoComplete="tel" requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={3} />
                    <Field id={fieldId(formId, "email")} label={copy.email} value={values.email} error={errors.email} onChange={update("email")} type="email" autoComplete="email" requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={4} />
                    <Field id={fieldId(formId, "facebook")} label={copy.facebook} value={values.facebook} error={errors.facebook} onChange={update("facebook")} type="url" autoComplete="url" placeholder="https://facebook.com/..." helperText={copy.facebookHelp} required={false} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={5} />
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
                    animate={{ opacity: 1, transform: "translateY(0)" }}
                    transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <fieldset
                      className="m-0 min-w-0 border-0 p-0"
                      aria-describedby={errors.discoverySource ? `${fieldId(formId, "discoverySource")}-error` : undefined}
                    >
                      <legend className={labelClass}>
                        {copy.discoverySource}{" "}
                        <span aria-hidden className="text-red-600">*</span>
                        <span className="sr-only">({copy.required})</span>
                      </legend>
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
                            <input
                              id={index === 0 ? fieldId(formId, "discoverySource") : `${fieldId(formId, "discoverySource")}-${index}`}
                              type="radio"
                              name={`${formId}-source`}
                              value={source}
                              checked={values.discoverySource === source}
                              onChange={() => setField("discoverySource", source)}
                              required
                              className="h-4 w-4 shrink-0 accent-blue-600"
                            />
                            {getRecruitmentDiscoverySourceLabel(source, locale)}
                          </motion.label>
                        ))}
                      </div>
                      <AnimatePresence initial={false}>
                        {errors.discoverySource ? <motion.p id={`${fieldId(formId, "discoverySource")}-error`} role="alert" initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-4px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }} className="mt-1.5 text-sm font-medium text-red-600">{errors.discoverySource}</motion.p> : null}
                      </AnimatePresence>
                    </fieldset>
                  </motion.div>
                  <AnimatePresence initial={false} mode="wait">
                    {values.discoverySource === "Khác" ? <Field key="other-source" id={fieldId(formId, "discoverySourceOther")} label={copy.discoverySourceOther} value={values.discoverySourceOther} error={errors.discoverySourceOther} onChange={update("discoverySourceOther")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} /> : null}
                  </AnimatePresence>
                  <TextField id={fieldId(formId, "motivation")} label={copy.motivation} value={values.motivation} error={errors.motivation} onChange={update("motivation")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={1} />
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
                    animate={{ opacity: 1, transform: "translateY(0)" }}
                    transition={{ duration: 0.26, delay: reduceMotion ? 0 : 0.06, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <fieldset
                      className="m-0 min-w-0 border-0 p-0"
                      aria-describedby={`${fieldId(formId, "division")}-hint${errors.division ? ` ${fieldId(formId, "division")}-error` : ""}`}
                    >
                      <legend className={labelClass}>
                        {copy.division}{" "}
                        <span aria-hidden className="text-red-600">*</span>
                        <span className="sr-only">({copy.required})</span>
                      </legend>
                      <div className="grid gap-2">
                        {RECRUITMENT_DIVISIONS.map((division, index) => {
                          const divisionCopy = getRecruitmentDivisionCopy(division, locale);
                          return (
                            <motion.label
                              key={division}
                              initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                              animate={{ opacity: 1, transform: "translateY(0)" }}
                              transition={{ duration: 0.24, delay: reduceMotion ? 0 : 0.08 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                              whileTap={reduceMotion ? undefined : { transform: "scale(0.985)" }}
                              className={cn("flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-sm transition-[border-color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]", values.division === division ? "border-blue-600 bg-blue-50 text-blue-900 shadow-[0_8px_20px_rgba(37,99,235,0.1)]" : "border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:shadow-[0_8px_18px_rgba(37,99,235,0.07)]")}
                            >
                              <input
                                id={index === 0 ? fieldId(formId, "division") : `${fieldId(formId, "division")}-${index}`}
                                type="radio"
                                name={`${formId}-division`}
                                value={division}
                                checked={values.division === division}
                                onChange={() => setField("division", division)}
                                required
                                className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                              />
                              <span>
                                <span className="block font-semibold">{divisionCopy.label}</span>
                                <span className="mt-1 block leading-5 text-slate-700">{divisionCopy.description}</span>
                              </span>
                            </motion.label>
                          );
                        })}
                      </div>
                      <p id={`${fieldId(formId, "division")}-hint`} className="mt-2 text-sm text-slate-600">{copy.branchHint}</p>
                      <AnimatePresence initial={false}>
                        {errors.division ? <motion.p id={`${fieldId(formId, "division")}-error`} role="alert" initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-4px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }} className="mt-1.5 text-sm font-medium text-red-600">{errors.division}</motion.p> : null}
                      </AnimatePresence>
                    </fieldset>
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
                    <motion.p
                      key={values.division}
                      initial={reduceMotion ? false : { opacity: 0, transform: "translateX(-8px)" }}
                      animate={{ opacity: 1, transform: "translateX(0)" }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="text-lg font-bold"
                    >
                      {getRecruitmentDivisionCopy(values.division, locale).label}
                    </motion.p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{copy.beginnerNote}</p>
                  </motion.div>
                  {values.division === "Cơ khí - Thiết kế" ? <>
                    <TextField id={fieldId(formId, "mechanicalExperience")} label={copy.mechanical.experience} value={values.mechanicalExperience} error={errors.mechanicalExperience} onChange={update("mechanicalExperience")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={0} />
                    <TextField id={fieldId(formId, "mechanicalTools")} label={copy.mechanical.tools} value={values.mechanicalTools} error={errors.mechanicalTools} onChange={update("mechanicalTools")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={1} />
                    <TextField id={fieldId(formId, "mechanicalDebugging")} label={copy.mechanical.debugging} value={values.mechanicalDebugging} error={errors.mechanicalDebugging} onChange={update("mechanicalDebugging")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={2} />
                    <TextField id={fieldId(formId, "mechanicalExpectations")} label={copy.mechanical.expectations} value={values.mechanicalExpectations} error={errors.mechanicalExpectations} onChange={update("mechanicalExpectations")} required={false} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={3} />
                  </> : null}
                  {values.division === "Code - Điện tử" ? <>
                    <TextField id={fieldId(formId, "codeExperience")} label={copy.code.experience} value={values.codeExperience} error={errors.codeExperience} onChange={update("codeExperience")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={0} />
                    <TextField id={fieldId(formId, "electronicsExperience")} label={copy.code.electronics} value={values.electronicsExperience} error={errors.electronicsExperience} onChange={update("electronicsExperience")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={1} />
                    <TextField id={fieldId(formId, "codeDebugging")} label={copy.code.debugging} value={values.codeDebugging} error={errors.codeDebugging} onChange={update("codeDebugging")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={2} />
                    <TextField id={fieldId(formId, "codeExpectations")} label={copy.code.expectations} value={values.codeExpectations} error={errors.codeExpectations} onChange={update("codeExpectations")} required={false} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={3} />
                  </> : null}
                  {values.division === "Truyền thông" ? <>
                    <TextField id={fieldId(formId, "mediaStrengths")} label={copy.media.strengths} value={values.mediaStrengths} error={errors.mediaStrengths} onChange={update("mediaStrengths")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={0} />
                    <TextField id={fieldId(formId, "mediaTools")} label={copy.media.tools} value={values.mediaTools} error={errors.mediaTools} onChange={update("mediaTools")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={1} />
                    <TextField id={fieldId(formId, "mediaCommitment")} label={copy.media.commitment} value={values.mediaCommitment} error={errors.mediaCommitment} onChange={update("mediaCommitment")} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={2} />
                    <TextField id={fieldId(formId, "mediaExpectations")} label={copy.media.expectations} value={values.mediaExpectations} error={errors.mediaExpectations} onChange={update("mediaExpectations")} required={false} requiredLabel={copy.required} optionalLabel={copy.optional} reduceMotion={reduceMotion} index={3} />
                  </> : null}
                </div>
              ) : null}
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {status === "error" ? <motion.div initial={reduceMotion ? false : { opacity: 0, transform: "translateY(-6px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} exit={reduceMotion ? undefined : { opacity: 0, transform: "translateY(-6px)" }} transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }} role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{copy.submissionError}</motion.div> : null}
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
              {status === "submitting" ? <Loader2 className={cn("h-4 w-4", !reduceMotion && "animate-spin")} /> : <Send className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}{status === "submitting" ? copy.sending : copy.submit}
            </motion.button>
          )}
        </div>
      </motion.form>
    </div>
  );
}
