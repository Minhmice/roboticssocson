/**
 * Magic Card with spotlight effect
 * Source: https://magicui.design/components/magic-card
 */
"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientOpacity?: number;
  duration?: number;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  gradientOpacity = 0.5,
  duration = 1.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 500,
    damping: 100,
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 500,
    damping: 100,
  });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${gradientOpacity * -30}deg`, `${gradientOpacity * 30}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`${gradientOpacity * -30}deg`, `${gradientOpacity * 30}deg`]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn("relative", className)}
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? gradientOpacity : 0,
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,${gradientOpacity}), transparent 40%)`,
        }}
      />
      {/* Content */}
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
    </motion.div>
  );
};

