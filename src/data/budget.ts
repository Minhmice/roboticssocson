/**
 * Budget data for FTC 2025-2026 season
 * Total: 6 items, $2,362.5 USD (~61.9M VNĐ)
 */

export interface BudgetItem {
  readonly name_vi: string;
  readonly name_en: string;
  readonly qty: number;
  readonly unitPrice: number;
  readonly totalUsd: number;
  readonly totalVnd: number;
  readonly link: string;
}

export const budgetItems: readonly BudgetItem[] = [
  {
    name_vi: "DUO Control Bundle (bộ điều khiển DUO)",
    name_en: "DUO Control Bundle",
    qty: 1,
    unitPrice: 650,
    totalUsd: 650,
    totalVnd: 17116665,
    link: "https://www.revrobotics.com/rev-35-2709/",
  },
  {
    name_vi: "REV Robotics Expansion Hub (tăng cường hub)",
    name_en: "REV Robotics Expansion Hub",
    qty: 1,
    unitPrice: 200,
    totalUsd: 200,
    totalVnd: 5266666,
    link: "https://www.revrobotics.com/rev-31-1153/",
  },
  {
    name_vi: "FTC Starter Kit (mùa giải 2025-2026)",
    name_en: "FTC Starter Kit (2025-2026 Season)",
    qty: 1,
    unitPrice: 637.5,
    totalUsd: 637.5,
    totalVnd: 16787499,
    link: "https://www.gobilda.com/ftc-starter-kit-2025-2026-season",
  },
  {
    name_vi: "Strafer® Chassis Kit (bộ khung GripForce™ với bánh xe Mecanum 104mm)",
    name_en: "Strafer® Chassis Kit (GripForce™ chassis with 104mm Mecanum wheels)",
    qty: 1,
    unitPrice: 525,
    totalUsd: 525,
    totalVnd: 13824998,
    link: "https://www.gobilda.com/strafer-chassis-kit-104mm-gripforce-mecanum-wheels/",
  },
  {
    name_vi: "4-Bar Odometry Pod (POD đo vị trí)",
    name_en: "4-Bar Odometry Pod",
    qty: 2,
    unitPrice: 75,
    totalUsd: 150,
    totalVnd: 3953609,
    link: "https://www.gobilda.com/4-bar-odometry-pod-32mm-wheel/",
  },
  {
    name_vi: "Lệ phí đăng ký & sự kiện",
    name_en: "Registration & Event Fees",
    qty: 1,
    unitPrice: 200,
    totalUsd: 200,
    totalVnd: 5000000,
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
