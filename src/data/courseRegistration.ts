export type ExperienceLevel = "none" | "scratch" | "arduino" | "other";

export type CourseRegistrationConfig = {
  /**
   * Public course surfaces (`/course`, `/course-register-form`, nested deck,
   * homepage teaser, nav/footer links, sitemap/robots, Course JSON-LD).
   *
   * Flip to `true` and rebuild/redeploy to reopen. See `reopenNote_*`.
   */
  enabled: boolean;
  reopenNote_vi: string;
  reopenNote_en: string;
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  submitLabel_vi: string;
  submitLabel_en: string;
  successMessage_vi: string;
  successMessage_en: string;
  googleFormLinks: { vi: string; en: string };
  messengerUrl?: string;
  emailFallback?: string;
  fieldLabels: {
    parentName_vi: string;
    parentName_en: string;
    phone_vi: string;
    phone_en: string;
    email_vi: string;
    email_en: string;
    studentName_vi: string;
    studentName_en: string;
    age_vi: string;
    age_en: string;
    experience_vi: string;
    experience_en: string;
    note_vi: string;
    note_en: string;
  };
  experienceOptions: Array<{
    value: ExperienceLevel;
    label_vi: string;
    label_en: string;
  }>;
};

export const courseRegistrationConfig: CourseRegistrationConfig = {
  // COURSE SURFACE SWITCH — set `enabled: true` and rebuild to restore
  // `/course`, `/course-register-form`, nested deck, homepage teaser,
  // nav/footer links, sitemap, robots, and Course JSON-LD.
  enabled: false,
  reopenNote_vi:
    "Đặt courseRegistrationConfig.enabled = true rồi rebuild/redeploy để mở lại trang khóa học, form đăng ký, teaser trang chủ, và link nav/footer.",
  reopenNote_en:
    "Set courseRegistrationConfig.enabled = true, then rebuild/redeploy to restore the course page, registration form, homepage teaser, and nav/footer links.",
  title_vi: "Đăng ký khóa học",
  title_en: "Course registration",
  subtitle_vi:
    "Đăng ký trực tiếp trên trang — phản hồi trong 24–48 giờ. Có thể nhắn Messenger nếu cần hỗ trợ nhanh.",
  subtitle_en:
    "Register directly on this page — we reply within 24–48 hours. Messenger is available for quick help.",
  submitLabel_vi: "Gửi đăng ký khóa học",
  submitLabel_en: "Submit course registration",
  successMessage_vi:
    "Đăng ký thành công. Trung tâm sẽ liên hệ sớm.",
  successMessage_en:
    "Registration successful. We will contact you soon.",
  // Back-up links to the official Google Form (custom UI posts to formResponse).
  googleFormLinks: {
    vi: "https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/viewform",
    en: "https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/viewform",
  },
  messengerUrl: "https://m.me/roboticssocson",
  emailFallback: "mailto:roboticssocson@gmail.com?subject=Dang%20ky%20khoa%20hoc",
  fieldLabels: {
    parentName_vi: "Họ tên phụ huynh",
    parentName_en: "Parent name",
    phone_vi: "Số điện thoại",
    phone_en: "Phone number",
    email_vi: "Email (tuỳ chọn)",
    email_en: "Email (optional)",
    studentName_vi: "Họ tên học sinh",
    studentName_en: "Student name",
    age_vi: "Tuổi học sinh",
    age_en: "Student age",
    experience_vi: "Kinh nghiệm lập trình",
    experience_en: "Coding experience",
    note_vi: "Ghi chú thêm",
    note_en: "Additional notes",
  },
  experienceOptions: [
    { value: "none", label_vi: "Chưa học bao giờ", label_en: "Never learned before" },
    { value: "scratch", label_vi: "Đã học Scratch", label_en: "Learned Scratch" },
    { value: "arduino", label_vi: "Đã làm Arduino", label_en: "Done Arduino" },
    { value: "other", label_vi: "Khác", label_en: "Other" },
  ],
};

/** Convenience alias for route/UI/SEO gates. Flip via `courseRegistrationConfig.enabled`. */
export const courseSurfacesEnabled = courseRegistrationConfig.enabled;
