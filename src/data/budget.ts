/**
 * Budget data for FTC 2024-2025 season
 * From Dự trù kinh phí.txt
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
] as const;

// Calculate total from items
const calculatedUsd = budgetItems.reduce((sum, item) => sum + item.totalUsd, 0);
const calculatedVnd = budgetItems.reduce((sum, item) => sum + item.totalVnd, 0);

export const budgetTotal = {
  usd: calculatedUsd,
  vnd: calculatedVnd,
} as const;

