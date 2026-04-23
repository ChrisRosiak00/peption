"use client";

import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "header" | "article";
};

/**
 * Fade + slide-up on scroll into view. Wraps children in a motion.div.
 */
export function Reveal({
  delay = 0,
  y = 14,
  once = true,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  delayStep?: number;
  initialDelay?: number;
  className?: string;
};

/**
 * Clones children and progressively delays each one's Reveal.
 */
export function Stagger({ children, delayStep = 0.08, initialDelay = 0, className }: StaggerProps) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} delay={initialDelay + i * delayStep}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
