import type { LocalizedText } from "@/lib/course/getLocalized";

/** FTC 2025-2026 season budget. Totals are derived, never hardcoded. */
export type FundraisingCategoryId = "hardware" | "tools" | "fees";

export type FundraisingItem = {
  id: string;
  category: FundraisingCategoryId;
  name: LocalizedText;
  qty: number;
  totalUsd: number;
  totalVnd: number;
  link?: string;
};

export const fundraisingItems: readonly FundraisingItem[] = [
  {
    id: "duo-control",
    category: "hardware",
    name: { vi: "DUO Control Bundle (bộ điều khiển DUO)", en: "DUO Control Bundle" },
    qty: 1,
    totalUsd: 650,
    totalVnd: 17_116_665,
    link: "https://www.revrobotics.com/rev-35-2709/",
  },
  {
    id: "expansion-hub",
    category: "hardware",
    name: { vi: "REV Robotics Expansion Hub (tăng cường hub)", en: "REV Robotics Expansion Hub" },
    qty: 1,
    totalUsd: 200,
    totalVnd: 5_266_666,
    link: "https://www.revrobotics.com/rev-31-1153/",
  },
  {
    id: "ftc-starter-kit",
    category: "hardware",
    name: { vi: "FTC Starter Kit (mùa giải 2025-2026)", en: "FTC Starter Kit (2025-2026 Season)" },
    qty: 1,
    totalUsd: 637.5,
    totalVnd: 16_787_499,
    link: "https://www.gobilda.com/ftc-starter-kit-2025-2026-season",
  },
  {
    id: "strafer-chassis",
    category: "hardware",
    name: {
      vi: "Strafer® Chassis Kit (khung GripForce™ với bánh Mecanum 104mm)",
      en: "Strafer® Chassis Kit (GripForce™ chassis with 104mm Mecanum wheels)",
    },
    qty: 1,
    totalUsd: 525,
    totalVnd: 13_824_998,
    link: "https://www.gobilda.com/strafer-chassis-kit-104mm-gripforce-mecanum-wheels/",
  },
  {
    id: "odometry-pod",
    category: "hardware",
    name: { vi: "4-Bar Odometry Pod (POD đo vị trí)", en: "4-Bar Odometry Pod" },
    qty: 2,
    totalUsd: 150,
    totalVnd: 3_953_609,
    link: "https://www.gobilda.com/4-bar-odometry-pod-32mm-wheel/",
  },
  {
    id: "registration-fees",
    category: "fees",
    name: { vi: "Lệ phí đăng ký & sự kiện", en: "Registration & Event Fees" },
    qty: 1,
    totalUsd: 200,
    totalVnd: 5_000_000,
  },
  {
    id: "materials-tools",
    category: "tools",
    name: {
      vi: "Vật tư bổ sung, in 3D và công cụ cơ khí",
      en: "Additional Materials, 3D Printing & Mechanical Tools",
    },
    qty: 1,
    totalUsd: 300,
    totalVnd: 7_800_000,
  },
];

export const fundraisingCategories: readonly {
  id: FundraisingCategoryId;
  name: LocalizedText;
  description: LocalizedText;
}[] = [
  {
    id: "hardware",
    name: { vi: "Phần cứng robot", en: "Robot hardware" },
    description: {
      vi: "Bộ điều khiển, khung gầm, hub và cảm biến cho robot thi đấu FTC.",
      en: "Controllers, chassis, hubs and sensors for the FTC competition robot.",
    },
  },
  {
    id: "tools",
    name: { vi: "Công cụ & vật tư", en: "Tools & materials" },
    description: {
      vi: "In 3D, công cụ cơ khí, vật tư sửa chữa và bảo trì robot.",
      en: "3D printing, mechanical tools, repair and maintenance supplies.",
    },
  },
  {
    id: "fees",
    name: { vi: "Lệ phí đăng ký & sự kiện", en: "Registration & event fees" },
    description: {
      vi: "Lệ phí đăng ký FTC Vietnam và phí tham gia giải đấu.",
      en: "FTC Vietnam registration and tournament participation fees.",
    },
  },
];

export const fundraisingTotal = {
  usd: fundraisingItems.reduce((acc, item) => acc + item.totalUsd, 0),
  vnd: fundraisingItems.reduce((acc, item) => acc + item.totalVnd, 0),
} as const;

export const fundraisingCategoryTotals = fundraisingCategories.map((cat) => {
  const items = fundraisingItems.filter((i) => i.category === cat.id);
  const usd = items.reduce((acc, item) => acc + item.totalUsd, 0);
  const vnd = items.reduce((acc, item) => acc + item.totalVnd, 0);
  return { ...cat, usd, vnd, percent: Math.round((usd / fundraisingTotal.usd) * 100) };
});

export const fundraisingCopy = {
  metaTitle: {
    vi: "Gây quỹ | Robotics Sóc Sơn",
    en: "Fundraising | Robotics Sóc Sơn",
  },
  badge: { vi: "Gây quỹ mùa giải 2025-2026", en: "2025-2026 season fundraising" },
  title: {
    vi: "Cùng đưa robot của học sinh Sóc Sơn ra đấu trường FTC",
    en: "Help Soc Son students take their robot to FTC",
  },
  lead: {
    vi: "Mọi khoản ủng hộ được dùng để mua linh kiện, đăng ký giải đấu và bảo trì robot cho đội Robotics Sóc Sơn. Dưới đây là toàn bộ ngân sách, từng khoản một.",
    en: "Every contribution buys components, covers tournament registration and keeps the Robotics Soc Son robot running. Below is the full budget, line by line.",
  },
  goalLabel: { vi: "Mục tiêu gây quỹ", en: "Fundraising goal" },
  itemsLabel: { vi: "Hạng mục", en: "Budget lines" },
  ctaDonate: { vi: "Ủng hộ ngay", en: "Donate now" },
  ctaCorporate: { vi: "Tài trợ doanh nghiệp", en: "Corporate sponsorship" },
  budgetTitle: { vi: "Tiền của bạn đi đâu", en: "Where your money goes" },
  budgetSubtitle: {
    vi: "Ngân sách chia theo nhóm, tính từ từng hạng mục bên dưới.",
    en: "The budget grouped by category, computed from the line items below.",
  },
  itemsTitle: { vi: "Chi tiết từng hạng mục", en: "Line-item detail" },
  qtyLabel: { vi: "SL", en: "Qty" },
  viewProduct: { vi: "Xem sản phẩm", en: "View product" },
  donateTitle: { vi: "Cách ủng hộ", en: "How to give" },
  donateSubtitle: {
    vi: "Chọn hình thức phù hợp. Mọi khoản ủng hộ, dù nhỏ, đều được ghi nhận.",
    en: "Pick what suits you. Every contribution, however small, is acknowledged.",
  },
  personalTitle: { vi: "Cá nhân: chuyển khoản", en: "Individuals: bank transfer" },
  personalBody: {
    vi: "Quét mã QR bằng ứng dụng ngân hàng, hoặc chuyển khoản theo thông tin bên dưới.",
    en: "Scan the QR with your banking app, or transfer using the details below.",
  },
  qrAlt: { vi: "Mã QR chuyển khoản ủng hộ Robotics Sóc Sơn", en: "Donation QR code for Robotics Soc Son" },
  bankName: { vi: "Ngân hàng", en: "Bank" },
  accountNumber: { vi: "Số tài khoản", en: "Account number" },
  accountHolder: { vi: "Chủ tài khoản", en: "Account name" },
  transferNote: { vi: "Nội dung chuyển khoản", en: "Transfer note" },
  transferNoteValue: {
    vi: "Ho ten - Ung ho Robotics Soc Son",
    en: "Full name - Support Robotics Soc Son",
  },
  corporateTitle: { vi: "Doanh nghiệp: tài trợ chính thức", en: "Companies: official sponsorship" },
  corporateBody: {
    vi: "Điền Google Form, đội sẽ liên hệ trao đổi hình thức đồng hành và quyền lợi truyền thông.",
    en: "Fill in the Google Form and the team will reach out to discuss partnership and media benefits.",
  },
  corporateForm: { vi: "Điền form tài trợ", en: "Open sponsor form" },
  transparencyTitle: { vi: "Cam kết minh bạch", en: "Our transparency pledge" },
  transparencyBody: {
    vi: "Đội sử dụng mọi khoản ủng hộ đúng mục đích như ngân sách trên và cập nhật kết quả tới người ủng hộ.",
    en: "The team uses every contribution for the purposes in the budget above and shares updates with supporters.",
  },
  contactTitle: { vi: "Cần hỏi thêm?", en: "Questions?" },
  contactCta: { vi: "Liên hệ đội", en: "Contact the team" },
} as const;

/**
 * Real values REQUIRED before the bank block renders. Empty strings keep the block hidden
 * (page never shows placeholder account details).
 */
export const fundraisingBank = {
  bankName: "",
  accountNumber: "",
  accountHolder: "",
} as const;

export const fundraisingQrImage = "/Images/QR CODE/QR CODE.webp";

export const fundraisingCorporateFormUrl = {
  vi: "https://docs.google.com/forms/d/e/1FAIpQLSfyAMqpRlcGSSkXJfquSx7YwDHQkav1vxBnwWuPFKF9MI3Bvw/viewform",
  en: "https://docs.google.com/forms/d/e/1FAIpQLSegrfMfGf3_HaPFEl4vJ1Lkj6xCvY8XGTwcSsYlrqRBTRaCPg/viewform",
} as const;
