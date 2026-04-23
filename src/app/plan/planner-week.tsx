"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Heart,
  Plus,
  Ruler,
  Syringe,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EventKind = "dose" | "measurement" | "check-in" | "labs" | "photo" | "goal";

type Event = {
  id: string;
  day: number; // 0 Mon .. 6 Sun
  hour: number; // 0..23
  kind: EventKind;
  title: string;
  sub?: string;
  done?: boolean;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const kindMeta: Record<EventKind, { bg: string; icon: React.ComponentType<{ size?: number }>; ring: string; label: string }> = {
  dose: { bg: "bg-brand-600", icon: Syringe, ring: "ring-brand-200 dark:ring-brand-500/30", label: "Dose" },
  measurement: { bg: "bg-mint-500", icon: Ruler, ring: "ring-mint-300 dark:ring-mint-500/30", label: "Measurement" },
  "check-in": { bg: "bg-blush-500", icon: Heart, ring: "ring-blush-300 dark:ring-blush-500/30", label: "Check-in" },
  labs: { bg: "bg-amber-500", icon: FlaskConical, ring: "ring-amber-300 dark:ring-amber-500/30", label: "Labs" },
  photo: { bg: "bg-sky-500", icon: Camera, ring: "ring-sky-300 dark:ring-sky-500/30", label: "Photo" },
  goal: { bg: "bg-brand-400", icon: Target, ring: "ring-brand-200 dark:ring-brand-500/30", label: "Goal" },
};

const initialEvents: Event[] = [
  { id: "1", day: 0, hour: 8, kind: "check-in", title: "Morning check-in", sub: "Mood 4/5", done: true },
  { id: "2", day: 0, hour: 20, kind: "measurement", title: "Weight", sub: "197.6 lbs", done: true },
  { id: "3", day: 1, hour: 8, kind: "check-in", title: "Morning check-in", sub: "Mood 5/5", done: true },
  { id: "4", day: 2, hour: 8, kind: "check-in", title: "Morning check-in", sub: "Mood 4/5", done: true },
  { id: "5", day: 3, hour: 8, kind: "check-in", title: "Morning check-in", sub: "Mood pending" },
  { id: "6", day: 3, hour: 20, kind: "dose", title: "Retatrutide", sub: "12 mg · L abdomen" },
  { id: "7", day: 4, hour: 8, kind: "check-in", title: "Morning check-in" },
  { id: "8", day: 4, hour: 19, kind: "measurement", title: "Waist + hips" },
  { id: "9", day: 5, hour: 9, kind: "labs", title: "A1C + lipid panel", sub: "Quest · 9 AM" },
  { id: "10", day: 6, hour: 10, kind: "photo", title: "Progress photo", sub: "Week 6" },
  { id: "11", day: 6, hour: 18, kind: "goal", title: "Weekly goal", sub: "2 × 30-min walks ✓" },
  { id: "12", day: 3, hour: 12, kind: "measurement", title: "Resting HR" },
];

const hours = Array.from({ length: 24 }, (_, i) => i);

export function PlannerWeek() {
  const [events] = useState<Event[]>(initialEvents);
  const [weekOffset, setWeekOffset] = useState(0);

  const label = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + weekOffset * 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${fmt(monday)} — ${fmt(sunday)}`;
  }, [weekOffset]);

  return (
    <div className="rounded-3xl border border-border bg-surface shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-border">
        <div>
          <p className="text-sm font-semibold text-ink-900">{label}</p>
          <p className="text-xs text-ink-500">Week {weekOffset === 0 ? "of today" : `${weekOffset > 0 ? "+" : ""}${weekOffset}`}</p>
        </div>
        <div className="flex items-center gap-1">
          <IconBtn onClick={() => setWeekOffset((w) => w - 1)} aria-label="Previous week">
            <ChevronLeft size={16} />
          </IconBtn>
          <button
            onClick={() => setWeekOffset(0)}
            className="inline-flex h-9 items-center px-3 text-xs rounded-full bg-ink-50 text-ink-700 hover:bg-ink-100 border border-border"
          >
            Today
          </button>
          <IconBtn onClick={() => setWeekOffset((w) => w + 1)} aria-label="Next week">
            <ChevronRight size={16} />
          </IconBtn>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[64px_repeat(7,minmax(120px,1fr))] min-w-[780px]">
          {/* Column headers */}
          <div className="sticky left-0 z-10 bg-surface border-r border-border" />
          {weekDays.map((d, i) => {
            const isToday = i === (new Date().getDay() + 6) % 7 && weekOffset === 0;
            return (
              <div
                key={d}
                className={cn(
                  "px-3 py-3 text-center border-b border-border",
                  isToday && "bg-brand-50/50 dark:bg-brand-500/10"
                )}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-ink-400">
                  {d}
                </p>
                <p
                  className={cn(
                    "mt-0.5 text-lg font-semibold tracking-tight",
                    isToday ? "text-brand-700 dark:text-brand-300" : "text-ink-900"
                  )}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {20 + i}
                </p>
              </div>
            );
          })}

          {/* Rows per hour — condensed (every 3 hours) */}
          {hours
            .filter((h) => h % 3 === 0)
            .map((h) => (
              <Row key={h} hour={h} events={events} />
            ))}
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-full text-ink-600 hover:text-ink-900 hover:bg-ink-100"
      {...rest}
    >
      {children}
    </button>
  );
}

function Row({ hour, events }: { hour: number; events: Event[] }) {
  const hourLabel = new Date(0, 0, 0, hour).toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  });
  return (
    <>
      <div className="sticky left-0 z-10 bg-surface border-r border-t border-border px-2 py-3 text-[10px] uppercase tracking-wider text-ink-400 font-semibold">
        {hourLabel}
      </div>
      {weekDays.map((_, dayIdx) => {
        const dayEvents = events.filter(
          (e) => e.day === dayIdx && e.hour >= hour && e.hour < hour + 3
        );
        return (
          <div
            key={dayIdx}
            className="relative min-h-[64px] border-t border-border px-2 py-2 group hover:bg-ink-50/60 dark:hover:bg-ink-100/50 transition-colors"
          >
            {dayEvents.map((e, i) => (
              <EventPill key={e.id} event={e} index={i} />
            ))}
            <button
              aria-label="Add event"
              className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity inline-flex size-5 items-center justify-center rounded-full bg-brand-600 text-white"
            >
              <Plus size={11} />
            </button>
          </div>
        );
      })}
    </>
  );
}

function EventPill({ event, index }: { event: Event; index: number }) {
  const meta = kindMeta[event.kind];
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={cn(
        "mb-1 flex items-start gap-2 rounded-xl bg-surface-muted/70 border border-border p-1.5 text-[11px] leading-tight shadow-[0_2px_8px_-6px_rgba(76,29,149,0.4)] ring-1 ring-transparent transition-all hover:ring-2",
        meta.ring,
        event.done && "opacity-70"
      )}
    >
      <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md text-white ${meta.bg}`}>
        <Icon size={10} />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-semibold text-ink-900 truncate",
            event.done && "line-through decoration-ink-300"
          )}
        >
          {event.title}
        </p>
        {event.sub && <p className="text-ink-500 truncate text-[10px]">{event.sub}</p>}
      </div>
    </motion.div>
  );
}
