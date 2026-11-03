import { type LocalizedText } from "@/lib/i18n/localized";

export type FundraisingCategoryId = "hardware" | "tools" | "reserve";

export type FundraisingItem = {
  id: string;
  category: Exclude<FundraisingCategoryId, "reserve">;
  name: LocalizedText;
  qty: number;
  totalVnd: number;
};

export const fundraisingItems: readonly FundraisingItem[] = [
  { id: "control-hub", category: "hardware", name: { vi: "REV Control Hub", en: "REV Control Hub" }, qty: 1, totalVnd: 11_716_000 },
  { id: "viper-slide", category: "hardware", name: { vi: "goBILDA Viper Slide Kit 4 tầng", en: "goBILDA Viper Slide Kit, 4-stage" }, qty: 1, totalVnd: 5_830_000 },
  { id: "battery", category: "hardware", name: { vi: "Pin REV 12V Slim NiMH", en: "REV 12V Slim NiMH battery" }, qty: 2, totalVnd: 4_056_000 },
  { id: "gobilda-motor", category: "hardware", name: { vi: "Động cơ goBILDA 5202 Yellow Jacket", en: "goBILDA 5202 Yellow Jacket motor" }, qty: 2, totalVnd: 2_745_000 },
  { id: "rev-motor", category: "hardware", name: { vi: "Động cơ REV UltraPlanetary HD Hex", en: "REV UltraPlanetary HD Hex motor" }, qty: 2, totalVnd: 3_278_000 },
  { id: "camera", category: "hardware", name: { vi: "Camera Logitech C920", en: "Logitech C920 camera" }, qty: 1, totalVnd: 1_850_000 },
  { id: "wera", category: "tools", name: { vi: "Bộ lục giác Wera", en: "Wera hex key set" }, qty: 1, totalVnd: 850_000 },
  { id: "wowstick", category: "tools", name: { vi: "Bộ tua vít điện Wowstick 1F+", en: "Wowstick 1F+ electric screwdriver" }, qty: 1, totalVnd: 650_000 },
];

export const fundraisingReserve = 3_000_000;
export const fundraisingHardwareTotal = fundraisingItems.reduce((sum, item) => sum + item.totalVnd, 0);
export const fundraisingTotal = fundraisingHardwareTotal + fundraisingReserve;

export const fundraisingCategories: readonly { id: FundraisingCategoryId; name: LocalizedText; description: LocalizedText }[] = [
  { id: "hardware", name: { vi: "Phần cứng robot", en: "Robot hardware" }, description: { vi: "Bộ điều khiển, truyền động, nguồn và camera của robot FTC.", en: "Control, drive, power and camera systems for the FTC robot." } },
  { id: "tools", name: { vi: "Công cụ kỹ thuật", en: "Technical tools" }, description: { vi: "Bộ dụng cụ cần thiết để lắp ráp, bảo trì và sửa chữa robot.", en: "Tools needed to assemble, maintain and repair the robot." } },
  { id: "reserve", name: { vi: "Dự phòng kỹ thuật", en: "Technical reserve" }, description: { vi: "Dự phòng cho chênh lệch tỷ giá và phát sinh kỹ thuật trong mùa giải.", en: "A reserve for exchange-rate changes and technical contingencies." } },
];

export const fundraisingCategoryTotals = fundraisingCategories.map((category) => {
  const vnd = category.id === "reserve" ? fundraisingReserve : fundraisingItems.filter((item) => item.category === category.id).reduce((sum, item) => sum + item.totalVnd, 0);
  return { ...category, vnd, usd: vnd / 25_800, percent: Math.round((vnd / fundraisingTotal) * 100) };
});

export const fundraisingRoadmap = [
  { id: "phase-1", date: { vi: "Trước 20/11/2026", en: "Before 20 Nov 2026" }, title: { vi: "Đợt 1 · Nền tảng điều khiển", en: "Phase 1 · Control platform" }, detail: { vi: "REV Control Hub và Viper Slide Kit 4 tầng", en: "REV Control Hub and 4-stage Viper Slide Kit" }, totalVnd: 17_546_000 },
  { id: "phase-2", date: { vi: "Trước 05/12/2026", en: "Before 05 Dec 2026" }, title: { vi: "Đợt 2 · Thiết bị hoàn thiện", en: "Phase 2 · Remaining equipment" }, detail: { vi: "Pin, động cơ, camera và bộ dụng cụ kỹ thuật còn lại", en: "Remaining batteries, motors, camera and technical tools" }, totalVnd: 16_429_000 },
] as const;

export const fundraisingCopy = {
  metaTitle: { vi: "Gây quỹ mùa giải 2026–2027 | Robotics Sóc Sơn", en: "2026–2027 Season Fundraising | Robotics Sóc Sơn" },
  badge: { vi: "BIOBUZZ · FIRST CANOPY · 2026–2027", en: "BIOBUZZ · FIRST CANOPY · 2026–2027" },
  title: { vi: "Cùng đội #39256 xây robot cho mùa BIOBUZZ", en: "Help Team #39256 build for BIOBUZZ" },
  lead: { vi: "Robotics Sóc Sơn đang vận động 33.975.000₫ cho phần cứng và công cụ của mùa FIRST Tech Challenge 2026–2027. Từng khoản được công khai để người đồng hành biết nguồn lực đi vào đâu.", en: "Robotics Sóc Sơn is raising 33,975,000₫ for hardware and tools for the 2026–2027 FIRST Tech Challenge season. Every line is public so supporters can see where resources go." },
  goalLabel: { vi: "Mục tiêu vận động", en: "Public campaign goal" },
  itemsLabel: { vi: "Hạng mục", en: "Budget lines" },
  ctaDonate: { vi: "Ủng hộ ngay", en: "Donate now" },
  ctaCorporate: { vi: "Đồng hành doanh nghiệp", en: "Partner as a company" },
  budgetTitle: { vi: "Ngân sách đi vào đâu", en: "Where the budget goes" },
  budgetSubtitle: { vi: "30.975.000₫ cho 8 hạng mục phần cứng và công cụ, cộng 3.000.000₫ dự phòng kỹ thuật.", en: "30,975,000₫ for 8 hardware and tool lines, plus a 3,000,000₫ technical reserve." },
  itemsTitle: { vi: "8 hạng mục · 11 thiết bị", en: "8 lines · 11 devices" },
  qtyLabel: { vi: "SL", en: "Qty" },
  viewProduct: { vi: "Xem sản phẩm", en: "View product" },
  seasonTitle: { vi: "Mùa giải 2026–2027", en: "2026–2027 season" },
  seasonBody: { vi: "BIOBUZZ presented by RTX thuộc mùa FIRST CANOPY. Mỗi trận kéo dài 2 phút 30 giây; lịch thi đấu tại Việt Nam chưa được công bố chính thức.", en: "BIOBUZZ presented by RTX is part of FIRST CANOPY. Each match lasts 2 minutes 30 seconds; Vietnam's official event date has not been announced." },
  roadmapTitle: { vi: "Lộ trình mua sắm", en: "Purchase roadmap" },
  roadmapSubtitle: { vi: "Ưu tiên nền tảng điều khiển trước, sau đó hoàn thiện hệ thống robot.", en: "Secure the control platform first, then complete the robot system." },
  donateTitle: { vi: "Cách ủng hộ", en: "How to give" },
  donateSubtitle: { vi: "Quét mã QR bằng ứng dụng ngân hàng. Mọi khoản ủng hộ đều giúp đội tiến gần hơn tới ngày thi đấu.", en: "Scan the QR with your banking app. Every contribution brings the team closer to competition day." },
  personalTitle: { vi: "Ủng hộ qua QR", en: "Give by QR" },
  personalBody: { vi: "Quét mã QR bên dưới để chuyển khoản ủng hộ Robotics Sóc Sơn.", en: "Scan the QR below to support Robotics Sóc Sơn." },
  qrAlt: { vi: "Mã QR ủng hộ Robotics Sóc Sơn, người nhận Nguyễn Minh Nghĩa", en: "Robotics Sóc Sơn donation QR, recipient Nguyễn Minh Nghĩa" },
  recipient: { vi: "Người nhận", en: "Recipient" },
  recipientName: "Nguyễn Minh Nghĩa",
  transferNote: { vi: "Nội dung chuyển khoản", en: "Transfer note" },
  transferNoteValue: { vi: "Ho ten - Ung ho Robotics Soc Son", en: "Full name - Support Robotics Soc Son" },
  corporateTitle: { vi: "Doanh nghiệp: đồng hành cùng đội", en: "Companies: partner with the team" },
  corporateBody: { vi: "Điền form tài trợ để trao đổi về hiện vật, ngân sách và quyền lợi truyền thông phù hợp với doanh nghiệp.", en: "Fill in the sponsor form to discuss in-kind support, funding and media benefits that fit your company." },
  corporateForm: { vi: "Điền form tài trợ", en: "Open sponsor form" },
  transparencyTitle: { vi: "Cam kết minh bạch", en: "Our transparency pledge" },
  transparencyBody: { vi: "33.975.000₫ là mục tiêu vận động công khai cho phần cứng và dự phòng kỹ thuật. Ngân sách hiện chưa gồm vật tư gia công thử nghiệm, in 3D, đồng phục, di chuyển và kinh phí dự thi vòng quốc tế tại Mỹ.", en: "33,975,000₫ is the public goal for hardware and technical reserve. It does not currently include prototype materials, 3D printing, uniforms, travel or international competition costs in the United States." },
  contactCta: { vi: "Liên hệ đội", en: "Contact the team" },
} as const;

export const fundraisingQrImage = "/Images/QR CODE/QR CODE.webp";
export const fundraisingCorporateFormUrl = {
  vi: "https://docs.google.com/forms/d/e/1FAIpQLSfyAMqpRlcGSSkXJfquSx7YwDHQkav1vxBnwWuPFKF9MI3Bvw/viewform",
  en: "https://docs.google.com/forms/d/e/1FAIpQLSegrfMfGf3_HaPFEl4vJ1Lkj6xCvY8XGTwcSsYlrqRBTRaCPg/viewform",
} as const;
