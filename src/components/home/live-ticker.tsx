"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Heart, Syringe, TrendingDown, Users } from "lucide-react";

const items = [
  { icon: Syringe, text: "142 shots logged in the last hour", tone: "brand" as const },
  { icon: TrendingDown, text: "Jessica just hit -28 lbs 🎉", tone: "blush" as const },
  { icon: Users, text: "34 members joined today", tone: "mint" as const },
  { icon: Heart, text: "Amara posted a new week-12 update", tone: "blush" as const },
  { icon: Activity, text: "Community logged 1,024 check-ins today", tone: "brand" as const },
];

export function LiveTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((n) => (n + 1) % items.length), 3400);
    return () => clearInterval(id);
  }, []);
  const it = items[idx];
  const Icon = it.icon;
  const toneClass =
    it.tone === "mint"
      ? "bg-mint-500"
      : it.tone === "blush"
        ? "bg-blush-500"
        : "bg-brand-600";

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full bg-surface border border-border pl-1.5 pr-3 py-1 shadow-card overflow-hidden">
      <span className="relative flex size-6 items-center justify-center rounded-full bg-mint-500">
        <span className="absolute inset-0 rounded-full bg-mint-500 animate-ping-soft" />
        <span className="relative size-1.5 rounded-full bg-white" />
      </span>
      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-500">
        Live
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 text-xs text-ink-700 font-medium"
        >
          <span
            className={`inline-flex size-4 items-center justify-center rounded-full text-white ${toneClass}`}
          >
            <Icon size={9} />
          </span>
          {it.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
