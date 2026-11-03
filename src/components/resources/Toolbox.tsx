"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

const FIELD = "min-h-11 w-full rounded-lg border border-input bg-card px-3 text-base tabular-nums focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:text-sm";

function NumberField({ label, unit, value, onChange, hint }: { label: string; unit: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const id = useId();
  const n = Number(value);
  const bad = value.trim() === "" || !Number.isFinite(n) || n <= 0;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label} <span className="font-normal text-muted-foreground">({unit})</span></label>
      <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value.replace(",", "."))} aria-invalid={bad} aria-describedby={hint ? `${id}-h` : undefined} className={cn(FIELD, bad && "border-destructive")} />
      {hint && <p id={`${id}-h`} className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const fmt = (n: number, d = 2) => new Intl.NumberFormat("en-US", { maximumFractionDigits: d }).format(n);
const pos = (v: string) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** Two quick sizing calculators. Inputs are the user's datasheet numbers; nothing is assumed about a motor. */
export function Calculators({ locale }: { locale: Locale }) {
  const vi = locale === "vi";
  const [tab, setTab] = useState<"drive" | "arm">("drive");
  const [rpm, setRpm] = useState("312");
  const [wheel, setWheel] = useState("96");
  const [stall, setStall] = useState("2.4");
  const [mass, setMass] = useState("1.5");
  const [length, setLength] = useState("30");

  const rpmN = pos(rpm), wheelN = pos(wheel), stallN = pos(stall), massN = pos(mass), lengthN = pos(length);
  const speed = rpmN && wheelN ? (rpmN / 60) * Math.PI * (wheelN / 1000) : null;
  const push = stallN && wheelN ? stallN / (wheelN / 2000) : null;
  const need = massN && lengthN ? massN * 9.81 * (lengthN / 100) : null;
  const load = need && stallN ? need / stallN : null;

  const tabBtn = (on: boolean) => cn("min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", on ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground");
  const verdict = load === null ? null : load <= 0.5 ? "ok" : load <= 0.8 ? "tight" : "over";
  const verdictText = {
    ok: vi ? "Dư an toàn: tải dưới một nửa mô-men xoắn khi bị giữ cứng." : "Comfortable: the load is under half of stall torque.",
    tight: vi ? "Sát giới hạn: dễ nóng và rung. Tăng tỉ số truyền hoặc giảm tay đòn." : "Tight: expect heat and jitter. Raise the reduction or shorten the arm.",
    over: vi ? "Quá tải: động cơ không giữ nổi ở tư thế nằm ngang." : "Overloaded: the motor cannot hold this arm horizontal.",
  };

  return (
    <div>
      <div role="tablist" aria-label={vi ? "Máy tính" : "Calculators"} className="inline-flex gap-1 rounded-xl border border-border bg-muted p-1">
        <button role="tab" type="button" aria-selected={tab === "drive"} aria-controls="calc-panel" onClick={() => setTab("drive")} className={tabBtn(tab === "drive")}>{vi ? "Tốc độ di chuyển" : "Drive speed"}</button>
        <button role="tab" type="button" aria-selected={tab === "arm"} aria-controls="calc-panel" onClick={() => setTab("arm")} className={tabBtn(tab === "arm")}>{vi ? "Tải tay đòn" : "Arm load"}</button>
      </div>

      <div role="tabpanel" id="calc-panel" className="mt-5 grid gap-6 sm:grid-cols-[1fr_1fr]">
        <div className="grid content-start gap-4">
          {tab === "drive" ? (
            <>
              <NumberField label={vi ? "Tốc độ trục ra, không tải" : "Output shaft speed, no load"} unit="RPM" value={rpm} onChange={setRpm} hint={vi ? "Đã tính tỉ số truyền, lấy từ datasheet." : "After the gearbox, from the datasheet."} />
              <NumberField label={vi ? "Đường kính bánh" : "Wheel diameter"} unit="mm" value={wheel} onChange={setWheel} />
              <NumberField label={vi ? "Mô-men xoắn khi bị giữ cứng" : "Stall torque"} unit="N·m" value={stall} onChange={setStall} hint={vi ? "Ở trục ra, từ datasheet." : "At the output shaft, from the datasheet."} />
            </>
          ) : (
            <>
              <NumberField label={vi ? "Khối lượng ở đầu tay đòn" : "Mass at the arm tip"} unit="kg" value={mass} onChange={setMass} />
              <NumberField label={vi ? "Chiều dài tay đòn" : "Arm length"} unit="cm" value={length} onChange={setLength} />
              <NumberField label={vi ? "Mô-men xoắn khi bị giữ cứng" : "Stall torque"} unit="N·m" value={stall} onChange={setStall} hint={vi ? "Ở trục ra, từ datasheet." : "At the output shaft, from the datasheet."} />
            </>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-muted p-5" aria-live="polite">
          {tab === "drive" ? (
            <dl className="grid gap-4">
              <div><dt className="text-sm text-muted-foreground">{vi ? "Tốc độ lý thuyết" : "Theoretical speed"}</dt><dd className="text-3xl font-bold tabular-nums">{speed ? `${fmt(speed)} m/s` : "-"}</dd></div>
              <div><dt className="text-sm text-muted-foreground">{vi ? "Lực đẩy tối đa tại bánh (mỗi động cơ)" : "Peak wheel force (per motor)"}</dt><dd className="text-3xl font-bold tabular-nums">{push ? `${fmt(push, 1)} N` : "-"}</dd></div>
              <p className="text-sm leading-relaxed">{vi ? "Tốc độ thực tế thấp hơn 15-25% vì tải, ma sát và điện áp pin sụt. Lực đẩy thực bị giới hạn thêm bởi độ bám của bánh." : "Real speed runs 15-25% lower from load, friction and battery sag. Real push is also capped by wheel grip."}</p>
            </dl>
          ) : (
            <dl className="grid gap-4">
              <div><dt className="text-sm text-muted-foreground">{vi ? "Mô-men xoắn cần để giữ nằm ngang" : "Torque to hold horizontal"}</dt><dd className="text-3xl font-bold tabular-nums">{need ? `${fmt(need)} N·m` : "-"}</dd></div>
              <div><dt className="text-sm text-muted-foreground">{vi ? "Tỉ lệ so với mô-men xoắn tối đa" : "Share of stall torque"}</dt><dd className="text-3xl font-bold tabular-nums">{load !== null ? `${fmt(load * 100, 0)}%` : "-"}</dd></div>
              {verdict && <p className={cn("text-sm font-medium leading-relaxed", verdict === "over" && "text-destructive")}>{verdictText[verdict]}</p>}
              <p className="text-sm leading-relaxed">{vi ? "Chưa tính khối lượng bản thân tay đòn. Cộng thêm nó (đặt ở giữa chiều dài) để ra con số sát hơn." : "Excludes the arm's own weight. Add it, centred along the length, for a closer figure."}</p>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
