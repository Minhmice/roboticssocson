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
        "overflow-x-auto rounded-2xl border border-border bg-card",
        className
      )}
    >
      <table className="w-full">
        <thead className="sticky top-0 border-b border-border bg-card backdrop-blur-sm">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Item
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Qty
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              USD
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              VNĐ
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item, index) => (
            <tr
              key={index}
              className="transition-colors duration-200 hover:bg-muted"
            >
              <td className="px-6 py-4 text-sm font-medium text-foreground">
                {item.name}
              </td>
              <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                {item.qty || "-"}
              </td>
              <td className="px-6 py-4 text-right text-sm text-muted-foreground">
                {item.usd ? formatUSD(item.usd) : "-"}
              </td>
              <td className="px-6 py-4 text-right text-sm font-semibold text-primary">
                {formatVND(item.vnd)}
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">
                {item.note || "-"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0 border-t-2 border-primary/40 bg-card backdrop-blur-sm">
          <tr>
            <td
              colSpan={4}
              className="px-6 py-4 text-right text-lg font-bold text-primary"
            >
              Total: {formatVND(total)}
            </td>
            <td className="px-6 py-4 text-sm text-muted-foreground"></td>
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

