import Link from "next/link";
import {
  CalendarRange,
  Camera,
  FlaskConical,
  Heart,
  Ruler,
  Sparkles,
  Syringe,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlannerWeek } from "./planner-week";

export const metadata = { title: "Plan · Peption" };

export default function PlanPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-10 space-y-8">
      <header className="animate-fade-up">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] text-white">
            <CalendarRange size={18} />
          </span>
          <span className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
            Protocol Planner
          </span>
        </div>
        <h1
          className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your week, <span className="text-gradient">designed around you.</span>
        </h1>
        <p className="mt-2 text-sm md:text-base text-ink-500 max-w-2xl">
          Doses, measurements, labs and check-ins — laid out on a single calm page. Drag to move
          events, tap an empty cell to schedule.
        </p>
      </header>

      {/* Top bar */}
      <section className="grid gap-4 md:grid-cols-3 animate-fade-up">
        <Card>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">
            This week
          </p>
          <p
            className="mt-2 text-3xl font-semibold tracking-tight text-ink-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            14 events
          </p>
          <p className="text-xs text-ink-500 mt-0.5">3 doses · 4 measurements · 7 check-ins</p>
          <Progress value={64} tone="brand" className="mt-4" />
          <p className="mt-2 text-xs text-ink-500">64% complete</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">
            Next up
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Syringe size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">Retatrutide 12 mg</p>
              <p className="text-xs text-ink-500">Thursday · 8:30 PM · left abdomen</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href="/track"
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium text-white [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)]"
            >
              Prep checklist
            </Link>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3.5 text-xs font-medium text-ink-700 hover:border-ink-300">
              Reschedule
            </button>
          </div>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">
            Coach says
          </p>
          <div className="mt-3 flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl [background:linear-gradient(135deg,#a78bfa,#ec4899)] text-white">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-sm text-ink-800 leading-snug">
                Your body-fat trend is tracking ahead of schedule. Consider adding a protein-forward
                breakfast on dose days to preserve lean mass.
              </p>
              <Link
                href="/ai"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-700"
              >
                Ask the AI for more
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* Week grid */}
      <section className="animate-fade-up">
        <PlannerWeek />
      </section>

      {/* Legend + quick add */}
      <section className="grid gap-4 md:grid-cols-[1fr_auto] animate-fade-up">
        <Card>
          <p className="text-sm font-semibold text-ink-900">Event types</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Legend tone="brand" label="Dose" icon={Syringe} />
            <Legend tone="mint" label="Measurement" icon={Ruler} />
            <Legend tone="blush" label="Check-in" icon={Heart} />
            <Legend tone="amber" label="Labs" icon={FlaskConical} />
            <Legend tone="sky" label="Progress photo" icon={Camera} />
            <Legend tone="brand" label="Goal" icon={Target} />
          </div>
        </Card>
        <Card className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-ink-900">Quick add</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <QuickAdd label="Log dose" icon={Syringe} />
            <QuickAdd label="Measurement" icon={Ruler} />
            <QuickAdd label="Photo" icon={Camera} />
            <QuickAdd label="Labs" icon={FlaskConical} />
          </div>
        </Card>
      </section>
    </div>
  );
}

function Legend({
  tone,
  label,
  icon: Icon,
}: {
  tone: "brand" | "mint" | "blush" | "amber" | "sky";
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}) {
  const bg =
    tone === "mint"
      ? "bg-mint-500"
      : tone === "blush"
        ? "bg-blush-500"
        : tone === "amber"
          ? "bg-amber-500"
          : tone === "sky"
            ? "bg-sky-500"
            : "bg-brand-600";
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 border border-border px-3 py-1.5 text-xs text-ink-700">
      <span className={`flex size-5 items-center justify-center rounded-md text-white ${bg}`}>
        <Icon size={10} />
      </span>
      {label}
    </span>
  );
}

function QuickAdd({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}) {
  return (
    <button className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium bg-ink-50 text-ink-700 border border-border hover:bg-ink-100">
      <Icon size={13} />
      {label}
    </button>
  );
}
