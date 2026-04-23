"use client";

import { motion } from "framer-motion";

type FloatingProps = {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  rotate?: number;
  delay?: number;
  className?: string;
};

/**
 * Gentle floating bob + subtle rotation. Great for hero visuals.
 */
export function Floating({
  children,
  duration = 6,
  distance = 8,
  rotate = 2,
  delay = 0,
  className,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0, rotate: 0 }}
      animate={{ y: [0, -distance, 0, distance / 2, 0], rotate: [0, rotate, 0, -rotate, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
