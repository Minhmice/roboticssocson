export type ExperienceLevel = "none" | "scratch" | "arduino" | "other";

export type CourseRegistrationConfig = {
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
  title_vi: "Đăng ký tư vấn khóa học",
  title_en: "Course consultation registration",
  subtitle_vi: "Đăng ký qua Google Form hoặc nhắn Messenger — phản hồi trong 24–48 giờ.",
  subtitle_en: "Register via Google Form or message us on Messenger — we reply within 24–48 hours.",
  submitLabel_vi: "Gửi đăng ký",
  submitLabel_en: "Submit registration",
  successMessage_vi: "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.",
  successMessage_en: "Thank you! We will contact you soon.",
  googleFormLinks: { vi: "", en: "" },
  messengerUrl: "https://m.me/roboticssocson",
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
