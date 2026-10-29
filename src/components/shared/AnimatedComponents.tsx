"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GlowCard } from "./GlowCard";

interface AnimatedComponentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

// Base animation configuration
const animationConfig = {
  once: true,
  margin: "0px 0px -50px 0px" as const,
  amount: 0.3,
} as const;

const transitionConfig = {
  duration: 0.7,
  ease: "easeOut" as const,
};


export function AnimatedCard({
  children,
  className,
  delay = 0,
  onClick,
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} onClick={onClick}>
        <GlowCard className="h-full">{children}</GlowCard>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ ...transitionConfig, delay }}
      onClick={onClick}
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
    >
      <GlowCard className="h-full p-0 overflow-hidden">{children}</GlowCard>
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig);
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ ...transitionConfig, delay }}
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
    >
      {React.Children.map(children, (child) => (
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
 * AnimatedIcon - Wrapper cho icons với rotation animation
 * Animation: opacity + rotation + scale
 */
export function AnimatedIcon({
  children,
  className,
  delay = 0,
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
    >
      {children}
    </motion.div>
  );
}
