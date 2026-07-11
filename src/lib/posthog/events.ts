/** Custom analytics events for Robotics Sóc Sơn — keep names stable for dashboards. */
export const AnalyticsEvents = {
  CTA_CLICKED: "cta_clicked",
  LANGUAGE_SWITCHED: "language_switched",
  NAV_SECTION_CLICKED: "nav_section_clicked",
  COURSE_PAGE_VIEWED: "course_page_viewed",
  COURSE_REGISTER_PAGE_VIEWED: "course_register_page_viewed",
  COURSE_REGISTER_STARTED: "course_register_started",
  COURSE_REGISTER_SUBMIT_CLICKED: "course_register_submit_clicked",
  COURSE_REGISTER_SUBMITTED: "course_register_submitted",
  COURSE_CONSULT_SUBMITTED: "course_consult_submitted",
  COURSE_PRICING_VIEWED: "course_pricing_viewed",
  COURSE_PRICING_CTA_CLICKED: "course_pricing_cta_clicked",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  BOOT_LOADER_COMPLETED: "boot_loader_completed",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export type CtaClickedProps = {
  label: string;
  href?: string;
  variant?: string;
  surface?: string;
};

export type LanguageSwitchedProps = {
  from: string;
  to: string;
};

export type NavSectionClickedProps = {
  section_id: string;
  label?: string;
};

export type CoursePricingEventProps = {
  price: number;
  session_count: number;
  surface: string;
  href?: string;
};
