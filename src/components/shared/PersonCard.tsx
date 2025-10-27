"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Person } from "@/types/person";
import { cn } from "@/lib/utils";

type Props = {
  data: Person;
  className?: string;
};

export default function PersonCard({ data, className }: Props) {
  return (
    <Card
      className={cn(
        "relative w-[320px] h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-[#0F172A] text-slate-100 shadow-xl",
        "transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]",
        className
      )}
    >
      {/* Ribbon (optional, top-left) */}
      {data.badge ? (
        <div className="absolute left-4 top-3 z-20">
          <div className="bg-[#2E3352] text-xs tracking-wide text-cyan-200 px-2 py-1 rounded-md shadow-md ring-1 ring-white/10">
            {data.badge}
          </div>
        </div>
      ) : null}

      {/* Photo area */}
      <div className="absolute inset-x-0 top-0 h-[68%]">
        <Image
          src={data.photo}
          alt={data.name}
          fill
          priority
          className="object-cover"
        />
        {/* Fade bottom of image */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%)",
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0), rgba(15,23,42,1))",
          }}
        />
      </div>

      {/* Info area */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="backdrop-blur-[6px] bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-4 ring-1 ring-white/10">
          <h3 className="text-xl font-semibold">{data.name}</h3>
          <p className="text-sm text-slate-300">{data.title}</p>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{data.bio}</p>

          {/* bottom stats row */}
          <div className="mt-4 grid grid-cols-3 items-center">
            <div>
              <div className="text-[11px] text-slate-400">{data.stat1_label}</div>
              <div className="text-sm font-medium">{data.stat1_value}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">{data.stat2_label}</div>
              <div className="text-sm font-medium">{data.stat2_value}</div>
            </div>

            {/* Club logo pill (replaces Follow button) */}
            <a
              href="/"
              className="justify-self-end inline-flex items-center gap-2 rounded-full bg-white/80 text-slate-900 px-3 py-1.5 shadow-md ring-1 ring-black/5 hover:bg-white transition"
              aria-label="Robotics Sóc Sơn"
              title="Robotics Sóc Sơn"
            >
              <Image src="/Logo.svg" width={20} height={20} alt="RSS" />
              <span className="text-xs font-medium">RSS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Outer soft shadow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
    </Card>
  );
}

