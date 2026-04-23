"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast/toaster";
import { useConfetti } from "@/components/effects/confetti";

const moods = [
  { v: 1, face: "😣", label: "Rough" },
  { v: 2, face: "🙁", label: "Meh" },
  { v: 3, face: "😐", label: "Ok" },
  { v: 4, face: "🙂", label: "Good" },
  { v: 5, face: "😄", label: "Great" },
];

export function MoodCheckIn() {
  const [picked, setPicked] = useState<number | null>(5);
  const [checkedIn, setCheckedIn] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const { fire } = useConfetti();

  function handleCheckIn() {
    setCheckedIn(true);
    const rect = btnRef.current?.getBoundingClientRect();
    fire({
      x: rect ? rect.left + rect.width / 2 : undefined,
      y: rect ? rect.top + rect.height / 2 : undefined,
      count: 160,
    });
    toast({
      kind: "success",
      title: "Check-in logged",
      description: "Streak extended to 22 days. Keep it going.",
    });
    if ("vibrate" in navigator) {
      navigator.vibrate?.(12);
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink-900">Today&apos;s Check-in</p>
      <p className="mt-1 text-xs text-ink-500">How are you feeling today?</p>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {moods.map((m) => (
          <motion.button
            key={m.v}
            type="button"
            onClick={() => setPicked(m.v)}
            aria-label={m.label}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "flex aspect-square items-center justify-center rounded-2xl text-xl transition-all border",
              picked === m.v
                ? "bg-mint-500 text-white border-mint-500 shadow-[0_6px_20px_-8px_rgba(16,185,129,0.6)] scale-[1.04]"
                : "bg-ink-50 text-ink-600 border-transparent hover:bg-ink-100"
            )}
          >
            <span aria-hidden>{m.face}</span>
          </motion.button>
        ))}
      </div>

      <Button
        ref={btnRef}
        variant="gradient"
        size="lg"
        className="mt-4 w-full"
        disabled={picked === null || checkedIn}
        onClick={handleCheckIn}
      >
        {checkedIn ? "Checked in ✓" : "Check In"}
      </Button>
    </div>
  );
}
