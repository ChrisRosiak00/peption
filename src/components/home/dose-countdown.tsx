"use client";

import { useEffect, useMemo, useState } from "react";
import { Syringe } from "lucide-react";

function nextDoseDate() {
  // Schedule: next Thursday at 20:30 local
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // 0 Sun .. 6 Sat
  const diff = (4 - day + 7) % 7 || 7;
  target.setDate(now.getDate() + diff);
  target.setHours(20, 30, 0, 0);
  return target;
}

function format(diff: number) {
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const s = Math.floor(diff / 1000) % 60;
  const m = Math.floor(diff / 60000) % 60;
  const h = Math.floor(diff / 3600000) % 24;
  const d = Math.floor(diff / 86400000);
  return { d, h, m, s };
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function DoseCountdown() {
  const target = useMemo(() => nextDoseDate(), []);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <Skeleton />;
  }

  const diff = target.getTime() - now.getTime();
  const elapsed = WEEK_MS - diff;
  const progress = Math.max(0, Math.min(1, elapsed / WEEK_MS));
  const { d, h, m, s } = format(diff);

  const size = 164;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - progress);

  return (
    <div className="flex items-center gap-5 md:gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="dose-ring" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="55%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--ink-100)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#dose-ring)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="flex size-9 items-center justify-center rounded-xl [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.6)]">
            <Syringe size={16} />
          </span>
          <p className="mt-2 text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-500">
            Next dose
          </p>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">
          Retatrutide 12 mg
        </p>
        <p
          className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {d}d {h.toString().padStart(2, "0")}h {m.toString().padStart(2, "0")}m
        </p>
        <div className="mt-1 font-mono text-xs tabular-nums text-ink-500">
          :{s.toString().padStart(2, "0")} · Thu 8:30 PM
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="chip chip-mint">On schedule</span>
          <span className="chip">22-day streak</span>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex items-center gap-5 md:gap-6 animate-pulse">
      <div className="size-[164px] rounded-full bg-ink-100" />
      <div className="flex-1 space-y-3">
        <div className="h-3 w-28 rounded bg-ink-100" />
        <div className="h-10 w-56 rounded-lg bg-ink-100" />
        <div className="h-3 w-32 rounded bg-ink-100" />
      </div>
    </div>
  );
}
