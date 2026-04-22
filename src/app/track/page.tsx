import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkline } from "@/components/charts/sparkline";
import { TrackingTabs } from "./tabs";
import { demoUser } from "@/lib/data/user";
import { Camera, Pill, Ruler, Syringe, Target, Trophy } from "lucide-react";

export const metadata = { title: "Tracking · Peption" };

export default function TrackPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 py-6 md:py-10 space-y-8">
      <header className="animate-fade-up">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
          Tracking
        </p>
        <h1
          className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Every shot. Every win. Every trend.
        </h1>
        <p className="mt-2 text-sm md:text-base text-ink-500 max-w-2xl">
          Log doses, measurements, and how you feel — so you can see exactly what&apos;s working.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-4 animate-fade-up">
        <QuickAction icon={Syringe} label="Log dose" tone="brand" />
        <QuickAction icon={Ruler} label="Add measurement" tone="mint" />
        <QuickAction icon={Pill} label="Log side effect" tone="blush" />
        <QuickAction icon={Camera} label="Progress photo" tone="amber" />
      </div>

      <TrackingTabs>
        {{
          progress: (
            <div className="space-y-6">
              <Card>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-ink-500">Weight</p>
                    <p className="mt-1 text-3xl font-semibold text-ink-900 tracking-tight">
                      197.6
                      <span className="text-sm text-ink-500 font-medium ml-1">lbs</span>
                    </p>
                    <p className="mt-0.5 text-xs text-mint-600 font-medium">
                      –{Math.abs(parseFloat(demoUser.metrics.weightLoss))} lbs total loss
                    </p>
                  </div>
                  <span className="chip">All Time</span>
                </div>
                <div className="mt-4">
                  <Sparkline data={demoUser.weightSeries} tone="brand" height={220} showAxis />
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <p className="text-sm font-semibold text-ink-900">Body Composition</p>
                  <p className="text-xs text-ink-500 mt-0.5">vs. start</p>
                  <div className="mt-4 divide-y divide-border">
                    <Row label="Weight" value={`${demoUser.metrics.weightLoss} lbs`} tone="mint" />
                    <Row label="Body Fat" value={`${demoUser.metrics.bodyFat}%`} tone="mint" />
                    <Row label="Lean Mass" value={`${demoUser.metrics.leanMass} lbs`} tone="brand" />
                    <Row label="BMI" value={demoUser.metrics.bmi} tone="mint" />
                  </div>
                </Card>

                <Card>
                  <p className="text-sm font-semibold text-ink-900">Energy & Appetite</p>
                  <p className="text-xs text-ink-500 mt-0.5">Weekly average</p>
                  <div className="mt-4 space-y-4">
                    <MetricBar
                      label="Energy"
                      value={demoUser.metrics.energy}
                      tone="mint"
                    />
                    <MetricBar
                      label="Appetite"
                      value={demoUser.metrics.appetite}
                      tone="blush"
                    />
                    <MetricBar label="Sleep" value={8.1} tone="brand" />
                    <MetricBar label="Mood" value={7.9} tone="amber" />
                  </div>
                </Card>
              </div>

              <Card>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-900">Goal Progress</p>
                  <span className="chip">Target: 180 lbs</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-end justify-between text-xs text-ink-500 mb-2">
                    <span>Start 210</span>
                    <span>Now 197.6</span>
                    <span>Goal 180</span>
                  </div>
                  <Progress value={41} tone="brand" />
                  <p className="mt-2 text-xs text-ink-500">41% of the way — keep going 💪</p>
                </div>
              </Card>
            </div>
          ),
          shots: (
            <div className="space-y-4">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">Next dose</p>
                    <p className="mt-0.5 text-xs text-ink-500">Thursday, 8:30 PM</p>
                  </div>
                  <span className="chip chip-mint">
                    <Syringe size={12} /> Retatrutide 12 mg
                  </span>
                </div>
              </Card>
              <div className="grid md:grid-cols-2 gap-4">
                {["Week 6", "Week 5", "Week 4", "Week 3"].map((w, i) => (
                  <Card key={w}>
                    <p className="text-sm font-semibold text-ink-900">{w}</p>
                    <p className="mt-1 text-xs text-ink-500">
                      Thursday, 8:30 PM · Left abdomen · 12 mg
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="chip chip-mint">No nausea</span>
                      {i < 2 && <span className="chip">Energy 8/10</span>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ),
          metrics: (
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <p className="text-sm font-semibold text-ink-900">Lab Panel — Aug 1</p>
                <p className="text-xs text-ink-500 mt-0.5">vs. baseline (May 1)</p>
                <div className="mt-4 divide-y divide-border">
                  <Row label="A1C" value="5.4 (–0.9)" tone="mint" />
                  <Row label="LDL" value="92 (–28)" tone="mint" />
                  <Row label="Fasting Glucose" value="88 (–16)" tone="mint" />
                  <Row label="Triglycerides" value="102 (–44)" tone="mint" />
                  <Row label="ALT" value="24 (–8)" tone="mint" />
                </div>
              </Card>
              <Card>
                <p className="text-sm font-semibold text-ink-900">Measurements</p>
                <div className="mt-4 divide-y divide-border">
                  <Row label="Waist" value="34 in (–4)" tone="mint" />
                  <Row label="Hips" value="40 in (–2)" tone="mint" />
                  <Row label="Chest" value="42 in (–1)" tone="mint" />
                  <Row label="Arm" value="14.8 in (+0.3)" tone="brand" />
                </div>
              </Card>
            </div>
          ),
          photos: (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Week 1", "Week 4", "Week 8", "Week 12", "Week 16", "Week 20"].map((w, i) => (
                  <div
                    key={w}
                    className="aspect-[3/4] rounded-2xl border border-border overflow-hidden relative bg-gradient-to-br from-brand-100 via-blush-100 to-mint-100"
                  >
                    <div className="absolute inset-0 flex items-end p-3">
                      <span className="chip bg-white/80 backdrop-blur text-ink-800 border-white/60">
                        {w}
                      </span>
                    </div>
                    <div className="absolute inset-0 grid place-items-center text-ink-400">
                      <Camera size={32} />
                    </div>
                    {i === 0 && (
                      <span className="absolute top-2 right-2 chip chip-ink text-[10px]">Start</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ),
        }}
      </TrackingTabs>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  tone: "brand" | "mint" | "blush" | "amber";
}) {
  const toneClass =
    tone === "mint"
      ? "bg-mint-500"
      : tone === "blush"
        ? "bg-blush-500"
        : tone === "amber"
          ? "bg-amber-500"
          : "bg-brand-600";
  return (
    <button className="surface-card flex items-center gap-3 p-4 hover:border-brand-200 transition-colors text-left">
      <span className={`flex size-10 items-center justify-center rounded-xl text-white ${toneClass}`}>
        <Icon size={18} />
      </span>
      <span className="text-sm font-medium text-ink-900">{label}</span>
    </button>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "brand" | "mint" | "blush";
}) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className="text-ink-600">{label}</span>
      <span
        className={`font-semibold ${
          tone === "mint" ? "text-mint-600" : tone === "blush" ? "text-blush-500" : "text-brand-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function MetricBar({ label, value, tone }: { label: string; value: number; tone: "brand" | "mint" | "blush" | "amber" }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-ink-600">{label}</span>
        <span className="font-semibold text-ink-900">{value.toFixed(1)} / 10</span>
      </div>
      <Progress value={value * 10} tone={tone} />
    </div>
  );
}
