import { cn } from "@/lib/utils";

interface BudgetItem {
  name: string;
  qty?: number;
  usd?: number;
  vnd: number;
  note?: string;
}

interface BudgetTableProps {
  items: BudgetItem[];
  total: number;
  className?: string;
}

const formatVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const BudgetTable: React.FC<BudgetTableProps> = ({
  items,
  total,
  className,
}) => {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50",
        className
      )}
    >
      <table className="w-full">
        <thead className="sticky top-0 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Item
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
              Qty
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
              USD
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
              VNĐ
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {items.map((item, index) => (
            <tr
              key={index}
              className="transition-colors duration-200 hover:bg-slate-800/30"
            >
              <td className="px-6 py-4 text-sm font-medium text-slate-200">
                {item.name}
              </td>
              <td className="px-6 py-4 text-center text-sm text-slate-400">
                {item.qty || "-"}
              </td>
              <td className="px-6 py-4 text-right text-sm text-slate-300">
                {item.usd ? formatUSD(item.usd) : "-"}
              </td>
              <td className="px-6 py-4 text-right text-sm font-semibold text-cyan-400">
                {formatVND(item.vnd)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">
                {item.note || "-"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0 border-t-2 border-cyan-500/50 bg-slate-900/90 backdrop-blur-sm">
          <tr>
            <td
              colSpan={4}
              className="px-6 py-4 text-right text-lg font-bold text-cyan-400"
            >
              Total: {formatVND(total)}
            </td>
            <td className="px-6 py-4 text-sm text-slate-400"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

/**
 * Usage example:
 * 
 * <BudgetTable 
 *   items={[
 *     { name: "DUO Control Bundle", qty: 1, usd: 650, vnd: 16900000 },
 *     { name: "FTC Starter Kit", qty: 1, usd: 695, vnd: 18070000 },
 *   ]}
 *   total={67067000}
 * />
 */

