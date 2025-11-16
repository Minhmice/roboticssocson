/**
 * Border Beam with animated gradient
 * Source: https://magicui.design/components/border-beam
 */
"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "#22D3EE",
  colorTo = "#06B6D4",
  delay = 0,
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (spanRef.current) {
      // const rect = spanRef.current.getBoundingClientRect();
      // setDimensions({
      //   width: rect.width,
      //   height: rect.height,
      // });
    }
  }, []);

  return (
    <span
      ref={spanRef}
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute -z-10 inline-block size-full rounded-[inherit] [border:var(--border-width) solid transparent]",
        "before:absolute before:size-full before:rounded-[inherit] before:p-[var(--border-width)] before:[background:linear-gradient(transparent,transparent),conic-gradient(from_calc(270deg-(var(--a)*1deg)),var(--color-from),var(--color-to),var(--color-from))] before:[background-clip:content-box,border-box] before:[background-origin:border-box] before:[mask:linear-gradient(#000_0_0)content-box,linear-gradient(#000_0_0)] before:[mask-composite:xor] before:[mask-clip:padding-box,border-box] before:opacity-0 before:[animation:border-beam_calc(var(--duration)*1s)_linear_calc(var(--delay))_infinite]",
        "after:absolute after:top-1/2 after:size-full after:translate-y-[-50%] after:rounded-[inherit] after:[background:conic-gradient(from_calc(270deg-(var(--a)*1deg)),transparent_0deg,var(--color-from)_45deg,var(--color-to)_180deg,var(--color-from)_270deg,transparent_360deg)] after:opacity-0 after:[animation:border-beam_calc(var(--duration)*1s)_linear_calc(var(--delay))_infinite]",
        "@keyframes border-beam{100%{transform:rotate(360deg)}}",
        className
      )}
    />
  );
};

