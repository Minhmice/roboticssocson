export type ExperienceLevel = "none" | "scratch" | "arduino" | "other";

import type { Localized } from "@/lib/i18n/localized";

export type CourseRegistrationConfig = {
  /**
   * Public course surfaces (`/course`, `/course-register-form`, nested deck,
   * homepage teaser, nav/footer links, sitemap/robots, Course JSON-LD).
   *
   * Flip to `true` and rebuild/redeploy to reopen. See `reopenNote_*`.
   */
  enabled: boolean;
  reopenNote: Localized<string>;
  title: Localized<string>;
  subtitle: Localized<string>;
  submitLabel: Localized<string>;
  successMessage: Localized<string>;
  googleFormLinks: { vi: string; en: string };
  messengerUrl?: string;
  emailFallback?: string;
  fieldLabels: {
    parentName: Localized<string>;
    phone: Localized<string>;
    email: Localized<string>;
    studentName: Localized<string>;
    age: Localized<string>;
    experience: Localized<string>;
    note: Localized<string>;
  };
  experienceOptions: Array<{
    value: ExperienceLevel;
    label: Localized<string>;
  }>;
};

export const courseRegistrationConfig: CourseRegistrationConfig = {
  // COURSE SURFACE SWITCH — set `enabled: true` and rebuild to restore
  // `/course`, `/course-register-form`, nested deck, homepage teaser,
  // nav/footer links, sitemap, robots, and Course JSON-LD.
  enabled: false,
  reopenNote: { vi: "Đặt courseRegistrationConfig.enabled = true rồi rebuild/redeploy để mở lại trang khóa học, form đăng ký, teaser trang chủ, và link nav/footer.", en: "Set courseRegistrationConfig.enabled = true, then rebuild/redeploy to restore the course page, registration form, homepage teaser, and nav/footer links." },
  title: { vi: "Đăng ký khóa học", en: "Course registration" },
  subtitle: { vi: "Đăng ký trực tiếp trên trang — phản hồi trong 24–48 giờ. Có thể nhắn Messenger nếu cần hỗ trợ nhanh.", en: "Register directly on this page — we reply within 24–48 hours. Messenger is available for quick help." },
  submitLabel: { vi: "Gửi đăng ký khóa học", en: "Submit course registration" },
  successMessage: { vi: "Đăng ký thành công. Trung tâm sẽ liên hệ sớm.", en: "Registration successful. We will contact you soon." },
  // Back-up links to the official Google Form (custom UI posts to formResponse).
  googleFormLinks: {
    vi: "https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/viewform",
    en: "https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/viewform",
  },
  messengerUrl: "https://m.me/roboticssocson",
  emailFallback: "mailto:roboticssocson@gmail.com?subject=Dang%20ky%20khoa%20hoc",
  fieldLabels: {
    parentName: { vi: "Họ tên phụ huynh", en: "Parent name" },
    phone: { vi: "Số điện thoại", en: "Phone number" },
    email: { vi: "Email (tuỳ chọn)", en: "Email (optional)" },
    studentName: { vi: "Họ tên học sinh", en: "Student name" },
    age: { vi: "Tuổi học sinh", en: "Student age" },
    experience: { vi: "Kinh nghiệm lập trình", en: "Coding experience" },
    note: { vi: "Ghi chú thêm", en: "Additional notes" },
  },
  experienceOptions: [
    { value: "none", label: { vi: "Chưa học bao giờ", en: "Never learned before" },},
    { value: "scratch", label: { vi: "Đã học Scratch", en: "Learned Scratch" },},
    { value: "arduino", label: { vi: "Đã làm Arduino", en: "Done Arduino" },},
    { value: "other", label: { vi: "Khác", en: "Other" },},
  ],
};

/** Convenience alias for route/UI/SEO gates. Flip via `courseRegistrationConfig.enabled`. */
export const courseSurfacesEnabled = courseRegistrationConfig.enabled;
