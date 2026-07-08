/**
 * Google Form entry-ID map for:
 * "Đăng kí tư vấn khoá học lập trình Robotics"
 *
 * Extracted from FB_PUBLIC_LOAD_DATA_ on the live viewform HTML.
 * Do NOT invent IDs — re-extract if the form is edited (see docs/google-form-registration.md).
 */

export const GOOGLE_FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/viewform";

export const GOOGLE_FORM_POST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/formResponse";

/** Multi-section form: page 0 (contact) → page break → page 1 (student). Required on full submit. */
export const GOOGLE_FORM_PAGE_HISTORY = "0,1";

export const GOOGLE_FORM_ENTRIES = {
  parentName: "entry.1984926689",
  studentName: "entry.1231284654",
  phone: "entry.1640328848",
  email: "entry.324711986",
  schoolClass: "entry.1327669339",
  /** Radio: known channel */
  source: "entry.634147539",
  /** Required when source === OTHER_OPTION_VALUE */
  sourceOther: "entry.634147539.other_option_response",
  experience: "entry.651973947",
  expectation: "entry.672874165",
} as const;

/** Exact option strings from the Google Form (must match). */
export const GOOGLE_FORM_SOURCE_OPTIONS = [
  "Qua mạng xã hội",
  "Qua bạn bè, người thân",
  "Mục khác",
] as const;

export type GoogleFormSourceOption =
  (typeof GOOGLE_FORM_SOURCE_OPTIONS)[number];

/** Value Google Forms expects when the "Other" radio is selected. */
export const GOOGLE_FORM_OTHER_OPTION_VALUE = "__other_option__";

export type CourseConsultFormValues = {
  parentName: string;
  studentName: string;
  phone: string;
  email: string;
  schoolClass: string;
  source: GoogleFormSourceOption | "";
  sourceOther: string;
  experience: string;
  expectation: string;
};

export const EMPTY_CONSULT_FORM: CourseConsultFormValues = {
  parentName: "",
  studentName: "",
  phone: "",
  email: "",
  schoolClass: "",
  source: "",
  sourceOther: "",
  experience: "",
  expectation: "",
};

/**
 * Build the name/value pairs posted to formResponse.
 * Skips empty optional experience; maps "Mục khác" to __other_option__ + other text.
 */
export function buildGoogleFormPayload(
  values: CourseConsultFormValues
): Array<{ name: string; value: string }> {
  const E = GOOGLE_FORM_ENTRIES;
  const pairs: Array<{ name: string; value: string }> = [
    { name: E.parentName, value: values.parentName.trim() },
    { name: E.studentName, value: values.studentName.trim() },
    { name: E.phone, value: values.phone.trim() },
    { name: E.email, value: values.email.trim() },
    { name: E.schoolClass, value: values.schoolClass.trim() },
    { name: E.expectation, value: values.expectation.trim() },
    { name: "pageHistory", value: GOOGLE_FORM_PAGE_HISTORY },
    { name: "fvv", value: "1" },
  ];

  if (values.source === "Mục khác") {
    pairs.push({ name: E.source, value: GOOGLE_FORM_OTHER_OPTION_VALUE });
    pairs.push({
      name: E.sourceOther,
      value: values.sourceOther.trim(),
    });
  } else if (values.source) {
    pairs.push({ name: E.source, value: values.source });
  }

  const experience = values.experience.trim();
  if (experience) {
    pairs.push({ name: E.experience, value: experience });
  }

  return pairs;
}
