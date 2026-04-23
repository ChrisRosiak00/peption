"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-colors",
        className
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={dark ? "sun" : "moon"}
          initial={{ rotate: -40, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 40, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
