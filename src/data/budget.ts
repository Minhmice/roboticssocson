/**
 * Budget data for FTC 2024-2025 season
 * From Dự trù kinh phí.txt and Sponsorship2.md
 * Total: 11 items, $2,879.5 USD (~74.8M VNĐ)
 */

export interface BudgetItem {
  readonly name: string;
  readonly qty: number;
  readonly unitPrice: number;
  readonly totalUsd: number;
  readonly totalVnd: number;
  readonly link: string;
}

export const budgetItems: readonly BudgetItem[] = [
  {
    name: "DUO Control Bundle",
    qty: 1,
    unitPrice: 650,
    totalUsd: 650,
    totalVnd: 16900000,
    link: "https://www.revrobotics.com/rev-35-2709/",
  },
  {
    name: "FTC Starter Kit V3.1",
    qty: 1,
    unitPrice: 695,
    totalUsd: 695,
    totalVnd: 18070000,
    link: "https://www.revrobotics.com/rev-45-3529/",
  },
  {
    name: "REV Robotics Expansion Hub",
    qty: 1,
    unitPrice: 275,
    totalUsd: 275,
    totalVnd: 7150000,
    link: "https://www.revrobotics.com/rev-31-1153/",
  },
  {
    name: "FTC Sensor Bundle",
    qty: 1,
    unitPrice: 180,
    totalUsd: 180,
    totalVnd: 4680000,
    link: "https://www.revrobotics.com/rev-45-1885/",
  },
  {
    name: "Servo Bundle",
    qty: 1,
    unitPrice: 327.5,
    totalUsd: 327.5,
    totalVnd: 8515000,
    link: "https://www.revrobotics.com/rev-45-1892/",
  },
  {
    name: "Through Bore Encoder",
    qty: 1,
    unitPrice: 48,
    totalUsd: 48,
    totalVnd: 1248000,
    link: "https://www.revrobotics.com/rev-11-1271/",
  },
  {
    name: "UltraPlanetary Gearbox Kit & HD Hex motor",
    qty: 3,
    unitPrice: 50,
    totalUsd: 150,
    totalVnd: 3900000,
    link: "https://www.revrobotics.com/rev-41-1600/",
  },
  {
    name: "Core Hex Motor",
    qty: 1,
    unitPrice: 32,
    totalUsd: 32,
    totalVnd: 832000,
    link: "https://www.revrobotics.com/rev-41-1300/",
  },
  {
    name: "Mecanum Wheel (104mm, 40A Durometer Rollers) Set 4 bánh",
    qty: 1,
    unitPrice: 190,
    totalUsd: 190,
    totalVnd: 4940000,
    link: "https://www.gobilda.com/gripforce-mecanum-wheel-set-o104mm-40a-durometer-rollers/",
  },
  {
    name: "1310 Series Hyper Hub (5mm Hex Bore)",
    qty: 4,
    unitPrice: 8,
    totalUsd: 32,
    totalVnd: 832000,
    link: "https://www.gobilda.com/1310-series-hyper-hub-5mm-hex-bore/",
  },
  {
    name: "Vật tư bổ sung, in 3D, công cụ",
    qty: 1,
    unitPrice: 300,
    totalUsd: 300,
    totalVnd: 7800000,
    link: "",
  },
] as const;

// Calculate total from items
const calculatedUsd = budgetItems.reduce((sum, item) => sum + item.totalUsd, 0);
const calculatedVnd = budgetItems.reduce((sum, item) => sum + item.totalVnd, 0);

// Funded amount (currently 20% of total budget)
// 15% of calculatedUsd = ~466.575 USD
const fundedUsd = calculatedUsd * 0.2;
const fundedVnd = calculatedVnd * 0.2;

export const fundedAmount = {
  usd: fundedUsd,
  vnd: fundedVnd,
} as const;

// Calculate funded percentage (should be 25%)
export const fundedPercentage = Math.round(
  (fundedAmount.usd / calculatedUsd) * 100
);

export const budgetTotal = {
  usd: calculatedUsd,
  vnd: calculatedVnd,
} as const;

// Budget categories breakdown
export interface BudgetCategory {
  readonly name_vi: string;
  readonly name_en: string;
  readonly percentage: number; // Percentage of total budget
  readonly description_vi: string;
  readonly description_en: string;
  readonly icon: string; // Icon name from lucide-react (e.g., "Database", "Wrench")
  readonly color: string; // Tailwind gradient classes (e.g., "from-primary to-primary/80")
}

export const budgetCategories: readonly BudgetCategory[] = [
  {
    name_vi: "Phần cứng robot & linh kiện",
    name_en: "Robot Hardware & Components",
    percentage: 72,
    description_vi:
      "Khung, motor, Mecanum wheels, controller, sensors, servo, encoder và các linh kiện cần thiết cho robot thi đấu FTC.",
    description_en:
      "Frame, motors, Mecanum wheels, controller, sensors, servo, encoder and essential components for FTC competition robot.",
    icon: "Database",
    color: "from-primary to-primary/80",
  },
  {
    name_vi: "Công cụ & vật tư",
    name_en: "Tools & Materials",
    percentage: 8,
    description_vi: "In 3D, công cụ cơ khí, vật tư sửa chữa và bảo trì robot.",
    description_en:
      "3D printing, mechanical tools, repair and maintenance supplies.",
    icon: "Wrench",
    color: "from-chart-2 to-chart-2/80",
  },
  {
    name_vi: "Lệ phí đăng ký & sự kiện",
    name_en: "Registration & Event Fees",
    percentage: 6,
    description_vi:
      "Lệ phí đăng ký FTC Vietnam, phí tham gia sự kiện và competitions.",
    description_en:
      "FTC Vietnam registration fees, event participation fees and competitions.",
    icon: "FileText",
    color: "from-chart-3 to-chart-3/80",
  },
  {
    name_vi: "Hoạt động cộng đồng",
    name_en: "Community Activities",
    percentage: 14,
    description_vi:
      "Workshop STEM, robot demo, outreach activities để lan tỏa kiến thức robotics.",
    description_en:
      "STEM workshops, robot demonstrations, outreach activities to spread robotics knowledge.",
    icon: "Users2",
    color: "from-chart-4 to-chart-4/80",
  },
] as const;

// Calculate category amounts from percentages
export const getCategoryAmount = (percentage: number) => ({
  usd: Math.round(budgetTotal.usd * (percentage / 100)),
  vnd: Math.round(budgetTotal.vnd * (percentage / 100)),
});
