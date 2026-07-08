import type {
  CourseConsultFormValues,
  GoogleFormSourceOption,
} from "@/lib/google-form-map";
import { GOOGLE_FORM_SOURCE_OPTIONS } from "@/lib/google-form-map";

export type ConsultFieldKey = keyof CourseConsultFormValues;

export type ConsultFieldErrors = Partial<Record<ConsultFieldKey, string>>;

/** Digits only; VN mobile: 10 digits starting with 0 (spaces allowed in raw input). */
export function normalizeVietnamPhone(raw: string): string {
  return raw.replace(/\s+/g, "");
}

export function isValidVietnamPhone(raw: string): boolean {
  const digits = normalizeVietnamPhone(raw);
  return /^0\d{9}$/.test(digits);
}

export function isValidEmail(raw: string): boolean {
  const v = raw.trim();
  // Practical check; Gmail field accepts any email format parents may use.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isValidSource(
  value: string
): value is GoogleFormSourceOption {
  return (GOOGLE_FORM_SOURCE_OPTIONS as readonly string[]).includes(value);
}

type Locale = "vi" | "en";

const messages = {
  required: {
    vi: "Vui lòng điền thông tin này",
    en: "This field is required",
  },
  phone: {
    vi: "Số điện thoại gồm 10 số, bắt đầu bằng 0",
    en: "Phone must be 10 digits starting with 0",
  },
  email: {
    vi: "Email không hợp lệ",
    en: "Enter a valid email address",
  },
  sourceOther: {
    vi: "Vui lòng ghi rõ nguồn khác",
    en: "Please specify the other source",
  },
} as const;

function req(locale: Locale) {
  return messages.required[locale];
}

/** Validate step 1: parent, student, phone, email. */
export function validateConsultStep1(
  values: CourseConsultFormValues,
  locale: Locale = "vi"
): ConsultFieldErrors {
  const errors: ConsultFieldErrors = {};

  if (!values.parentName.trim()) errors.parentName = req(locale);
  if (!values.studentName.trim()) errors.studentName = req(locale);

  if (!values.phone.trim()) {
    errors.phone = req(locale);
  } else if (!isValidVietnamPhone(values.phone)) {
    errors.phone = messages.phone[locale];
  }

  if (!values.email.trim()) {
    errors.email = req(locale);
  } else if (!isValidEmail(values.email)) {
    errors.email = messages.email[locale];
  }

  return errors;
}

/** Validate step 2: school/class, source (+ other), expectation. Experience optional. */
export function validateConsultStep2(
  values: CourseConsultFormValues,
  locale: Locale = "vi"
): ConsultFieldErrors {
  const errors: ConsultFieldErrors = {};

  if (!values.schoolClass.trim()) errors.schoolClass = req(locale);

  if (!values.source || !isValidSource(values.source)) {
    errors.source = req(locale);
  } else if (values.source === "Mục khác" && !values.sourceOther.trim()) {
    errors.sourceOther = messages.sourceOther[locale];
  }

  if (!values.expectation.trim()) errors.expectation = req(locale);

  return errors;
}

export function validateConsultForm(
  values: CourseConsultFormValues,
  locale: Locale = "vi"
): ConsultFieldErrors {
  return {
    ...validateConsultStep1(values, locale),
    ...validateConsultStep2(values, locale),
  };
}

export function hasConsultErrors(errors: ConsultFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
