/**
 * Data for /sponsor page
 * Contains all text content and step information for sponsorship process
 */

export interface SponsorOption {
  type: "corporate" | "personal";
  title_vi: string;
  title_en: string;
  subtitle_vi: string;
  subtitle_en: string;
  description_vi: string[];
  description_en: string[];
}

export interface SponsorStepInfo {
  title_vi: string;
  title_en: string;
  intro_vi: string;
  intro_en: string;
  checkpoints_vi: string[];
  checkpoints_en: string[];
  note_title_vi?: string;
  note_title_en?: string;
  note_content_vi?: string;
  note_content_en?: string;
  cta_vi: string;
  cta_en: string;
}

export interface BankInfo {
  bank_label_vi: string;
  bank_label_en: string;
  bank_name: string;
  account_label_vi: string;
  account_label_en: string;
  account_number: string;
  owner_label_vi: string;
  owner_label_en: string;
  owner_name: string;
  note_label_vi: string;
  note_label_en: string;
  note_format_vi: string;
  note_format_en: string;
}

export const sponsorPageHeader = {
  badge_vi: "Tài trợ",
  badge_en: "Sponsorship",
  title_vi: "Quy trình tài trợ",
  title_en: "Sponsorship Process",
  subtitle_vi: "Chọn hình thức phù hợp để đồng hành cùng Robotics Sóc Sơn",
  subtitle_en: "Choose the right form to partner with Robotics Sóc Sơn",
};

export const sponsorStepLabels = {
  step1_vi: "Chọn loại",
  step1_en: "Select Type",
  step2_vi: "Thông tin",
  step2_en: "Information",
  back_vi: "Quay lại",
  back_en: "Back",
};

export const sponsorOptions: SponsorOption[] = [
  {
    type: "corporate",
    title_vi: "Doanh nghiệp",
    title_en: "Corporate",
    subtitle_vi: "Tài trợ chính thức cho đội thi",
    subtitle_en: "Official team sponsorship",
    description_vi: [
      "Quyền lợi truyền thông rộng rãi",
      "Logo trên robot và đồng phục",
      "Gặp gỡ và trình bày trực tiếp",
    ],
    description_en: [
      "Extensive media benefits",
      "Logo on robot and uniforms",
      "Direct meeting and presentation",
    ],
  },
  {
    type: "personal",
    title_vi: "Cá nhân",
    title_en: "Personal",
    subtitle_vi: "Ủng hộ đội theo tâm huyết",
    subtitle_en: "Support with your passion",
    description_vi: [
      "Mọi đóng góp đều quý giá",
      "Chuyển khoản nhanh qua QR",
      "Minh bạch và dễ dàng",
    ],
    description_en: [
      "Every contribution matters",
      "Quick transfer via QR code",
      "Transparent and easy",
    ],
  },
];

export const corporateStepInfo: SponsorStepInfo = {
  title_vi: "Tài trợ từ Doanh nghiệp",
  title_en: "Corporate Sponsorship",
  intro_vi:
    "Cảm ơn doanh nghiệp đã quan tâm! Vui lòng điền thông tin qua Google Form bên dưới. Sau khi nhận được form, đội sẽ chủ động liên hệ lại để:",
  intro_en:
    "Thank you for your interest! Please fill out the Google Form below. After receiving your form, our team will proactively contact you to:",
  checkpoints_vi: [
    "Đến tận nơi gặp mặt và trình bày chi tiết về đội, kế hoạch mùa giải",
    "Trao đổi về các gói tài trợ và quyền lợi truyền thông phù hợp",
    "Thống nhất điều khoản hợp tác và ký kết tài trợ chính thức",
  ],
  checkpoints_en: [
    "Visit your office to present detailed information about our team and season plans",
    "Discuss sponsorship packages and appropriate media benefits",
    "Agree on partnership terms and sign official sponsorship",
  ],
  note_title_vi: "Quy trình làm việc chuyên nghiệp",
  note_title_en: "Professional Working Process",
  note_content_vi:
    "Đội cam kết làm việc minh bạch, chuyên nghiệp với lịch hẹn linh hoạt phù hợp với doanh nghiệp. Mọi thông tin tài trợ được bảo mật tuyệt đối.",
  note_content_en:
    "We commit to working transparently and professionally with flexible scheduling. All sponsorship information is kept strictly confidential.",
  cta_vi: "Điền Google Form ngay",
  cta_en: "Fill Google Form Now",
};

export const personalStepInfo: SponsorStepInfo = {
  title_vi: "Tài trợ Cá nhân",
  title_en: "Personal Donation",
  intro_vi:
    "Cảm ơn bạn đã muốn ủng hộ! Mọi đóng góp dù lớn hay nhỏ đều giúp đội có thêm động lực để tiếp tục theo đuổi đam mê robotics.",
  intro_en:
    "Thank you for wanting to support us! Every contribution, big or small, helps motivate our team to continue pursuing our robotics passion.",
  checkpoints_vi: [],
  checkpoints_en: [],
  note_content_vi:
    "💙 Mọi khoản ủng hộ đều được ghi nhận và sử dụng minh bạch cho hoạt động của đội. Cảm ơn bạn rất nhiều!",
  note_content_en:
    "💙 All donations are acknowledged and used transparently for team activities. Thank you very much!",
  cta_vi: "Tải QR về máy",
  cta_en: "Download QR Code",
};

export const bankInfo: BankInfo = {
  bank_label_vi: "Ngân hàng",
  bank_label_en: "Bank",
  // TODO: Replace placeholders with real bank details before go-live
  bank_name: "[Tên ngân hàng]",
  account_label_vi: "Số tài khoản",
  account_label_en: "Account Number",
  account_number: "[Số tài khoản]",
  owner_label_vi: "Chủ tài khoản",
  owner_label_en: "Account Name",
  owner_name: "[Tên chủ tài khoản]",
  note_label_vi: "Nội dung chuyển khoản",
  note_label_en: "Transfer Note",
  note_format_vi: "Ho ten - Ung ho Robotics Soc Son",
  note_format_en: "Full name - Support Robotics Soc Son",
};

export const qrCodeImage = "/Images/QR CODE/QR CODE.jpg";

export const googleFormLinks = {
  vi: "https://docs.google.com/forms/d/e/1FAIpQLSfyAMqpRlcGSSkXJfquSx7YwDHQkav1vxBnwWuPFKF9MI3Bvw/viewform",
  en: "https://docs.google.com/forms/d/e/1FAIpQLSegrfMfGf3_HaPFEl4vJ1Lkj6xCvY8XGTwcSsYlrqRBTRaCPg/viewform",
};

