"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowCard } from "./GlowCard";

interface AnimatedComponentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}

// Base animation configuration
const animationConfig = {
  once: false,
  margin: "0px 0px -50px 0px",
  amount: 0.3,
};

const transitionConfig = {
  duration: 0.7,
  ease: "easeOut" as const,
};

/**
 * AnimatedCard - Wrapper cho GlowCard với fade in/out animation
 * Animation: opacity + y movement (từ dưới lên)
 */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ ...transitionConfig, delay }}
      {...props}
    >
      <GlowCard className="h-full">{children}</GlowCard>
    </motion.div>
  );
}

/**
 * AnimatedImageCard - Wrapper cho image với scale animation
 * Animation: opacity + scale (zoom in effect)
 */
export function AnimatedImageCard({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ ...transitionConfig, delay }}
      {...props}
    >
      <GlowCard className="h-full p-0 overflow-hidden">{children}</GlowCard>
    </motion.div>
  );
}

/**
 * AnimatedSection - Wrapper cho section với fade animation
 * Animation: opacity + y movement (subtle)
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...transitionConfig, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedGrid - Wrapper cho grid items với staggered animation
 * Animation: opacity + y movement với delay khác nhau cho mỗi item
 */
export function AnimatedGrid({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: AnimatedComponentProps & { staggerDelay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={transitionConfig}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * AnimatedText - Wrapper cho text với slide animation
 * Animation: opacity + x movement (từ trái hoặc phải)
 */
export function AnimatedText({
  children,
  className,
  direction = "left",
  delay = 0,
  ...props
}: AnimatedComponentProps & { direction?: "left" | "right" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);

  const xValue = direction === "left" ? -30 : 30;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: xValue }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: xValue }}
      transition={{ ...transitionConfig, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedIcon - Wrapper cho icons với rotation animation
 * Animation: opacity + rotation + scale
 */
export function AnimatedIcon({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
      animate={
        isInView
          ? { opacity: 1, rotate: 0, scale: 1 }
          : { opacity: 0, rotate: -180, scale: 0.5 }
      }
      transition={{ ...transitionConfig, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
