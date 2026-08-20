import {
  getRecruitmentBranchFields,
  RECRUITMENT_DISCOVERY_SOURCES,
  RECRUITMENT_DIVISIONS,
  type RecruitmentFormValues,
} from "@/lib/recruitment-form-map";

export type RecruitmentFieldKey = keyof RecruitmentFormValues;
export type RecruitmentFieldErrors = Partial<
  Record<RecruitmentFieldKey, string>
>;
type Locale = "vi" | "en";

const messages = {
  required: { vi: "Vui lòng điền thông tin này", en: "This field is required" },
  email: { vi: "Email không hợp lệ", en: "Enter a valid email address" },
  phone: {
    vi: "Số điện thoại gồm 10 số, bắt đầu bằng 0",
    en: "Phone must be 10 digits starting with 0",
  },
  facebook: {
    vi: "Vui lòng nhập link Facebook hợp lệ",
    en: "Enter a valid Facebook link",
  },
  otherSource: {
    vi: "Vui lòng ghi rõ nguồn khác",
    en: "Please specify the other source",
  },
} as const;

const required = (locale: Locale) => messages.required[locale];

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidVietnamPhone(value: string): boolean {
  return /^0\d{9}$/.test(value.replace(/\s+/g, ""));
}

export function isValidFacebookLink(value: string): boolean {
  return /^https?:\/\/(www\.)?facebook\.com\//i.test(value.trim());
}

export function validateRecruitmentForm(
  values: RecruitmentFormValues,
  locale: Locale = "vi",
): RecruitmentFieldErrors {
  const errors: RecruitmentFieldErrors = {};
  const setRequired = (key: RecruitmentFieldKey, value: string) => {
    if (!value.trim()) errors[key] = required(locale);
  };

  setRequired("fullName", values.fullName);
  setRequired("birthDate", values.birthDate);
  setRequired("classCohort", values.classCohort);
  setRequired("phone", values.phone);
  setRequired("email", values.email);
  setRequired("facebook", values.facebook);
  setRequired("motivation", values.motivation);

  if (values.phone.trim() && !isValidVietnamPhone(values.phone)) {
    errors.phone = messages.phone[locale];
  }
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = messages.email[locale];
  }
  if (values.facebook.trim() && !isValidFacebookLink(values.facebook)) {
    errors.facebook = messages.facebook[locale];
  }

  if (!values.discoverySource || !RECRUITMENT_DISCOVERY_SOURCES.includes(values.discoverySource)) {
    errors.discoverySource = required(locale);
  } else if (values.discoverySource === "Khác" && !values.discoverySourceOther.trim()) {
    errors.discoverySourceOther = messages.otherSource[locale];
  }

  if (!values.division || !RECRUITMENT_DIVISIONS.includes(values.division)) {
    errors.division = required(locale);
    return errors;
  }

  for (const key of getRecruitmentBranchFields(values.division) as Array<keyof RecruitmentFormValues>) {
    setRequired(key, values[key]);
  }

  return errors;
}

export function hasRecruitmentErrors(errors: RecruitmentFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
