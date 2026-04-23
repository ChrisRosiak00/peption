import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  ChevronRight,
  Flame,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { MoodCheckIn } from "@/components/home/mood-check-in";
import { Sparkline } from "@/components/charts/sparkline";
import { demoUser } from "@/lib/data/user";
import { peptides } from "@/lib/data/peptides";
import { PeptideOrbit } from "@/components/visuals/peptide-orbit";
import { HeroGreeting } from "@/components/home/hero-greeting";
import { Reveal } from "@/components/effects/reveal";
import { CountUp } from "@/components/effects/count-up";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { Floating } from "@/components/effects/floating";
import { Grain } from "@/components/effects/grain";
import { WelcomeSplash } from "@/components/onboarding/welcome-splash";
import { DoseCountdown } from "@/components/home/dose-countdown";
import { LiveTicker } from "@/components/home/live-ticker";

export default function HomePage() {
  const featured = peptides.slice(0, 3);

  return (
    <>
      <WelcomeSplash />
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-10 space-y-8">
        <div className="pointer-events-none absolute inset-0 dark-stars" aria-hidden />

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <HeroGreeting name={demoUser.name.split(" ")[0]} />
            <div className="hidden md:flex pt-6">
              <LiveTicker />
            </div>
          </div>
          <div className="md:hidden mt-3">
            <LiveTicker />
          </div>
        </div>

        {/* Top row: Protocol hero + check-in */}
        <section className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-12">
          <Reveal delay={0.05} className="lg:col-span-7">
            <Link
              href="/peptide/retatrutide"
              className="relative group block rounded-3xl p-6 md:p-8 text-white overflow-hidden [background:linear-gradient(135deg,#6d28d9_0%,#7c3aed_40%,#ec4899_120%)] shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)]"
            >
              <Grain opacity={0.08} />
              <CursorGlow size={520} opacity={0.55} color="255, 255, 255" />
              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/80 font-semibold">
                    Current Protocol
                  </p>
                  <p
                    className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {demoUser.currentProtocol.name}
                  </p>
                  <p className="mt-1 text-sm text-white/80">{demoUser.currentProtocol.dose}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
                    {demoUser.currentProtocol.weekOf}
                  </span>
                </div>
                <Floating distance={7} duration={7} className="justify-self-end">
                  <PeptideOrbit
                    size={140}
                    tone="brand"
                    className="shrink-0 opacity-95 drop-shadow-2xl"
                  />
                </Floating>
              </div>

              <div className="relative z-10 mt-6 grid grid-cols-3 gap-2">
                <MiniStat label="Next dose" value="Thu" hint="8:30 PM" />
                <MiniStat label="Streak" value="22d" hint="keep going" icon={<Flame size={12} />} />
                <MiniStat label="Adherence" value="96%" hint="last 12 wk" />
              </div>

              <div className="relative z-10 mt-6 flex items-center justify-between text-sm text-white/90">
                <span>View full protocol</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
              <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 -bottom-16 size-60 rounded-full bg-blush-300/40 blur-3xl" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Card>
              <MoodCheckIn />
            </Card>
          </Reveal>
        </section>

        {/* Countdown + plan CTA */}
        <section className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-12">
          <Reveal delay={0.04} className="lg:col-span-7">
            <Card>
              <DoseCountdown />
            </Card>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <Link
              href="/plan"
              className="group relative h-full block rounded-3xl p-6 border border-border bg-surface shadow-card overflow-hidden hover:-translate-y-0.5 transition-transform"
            >
              <div className="absolute inset-0 gradient-brand-soft opacity-80" />
              <Grain opacity={0.04} />
              <CursorGlow size={380} opacity={0.28} />
              <div className="relative z-10 flex items-start justify-between gap-4 h-full">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
                    Protocol Planner
                  </p>
                  <h3
                    className="mt-2 text-xl font-semibold tracking-tight text-ink-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Your week, visualized.
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">
                    Doses, measurements, labs and check-ins — laid out on a single calm page.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="chip">3 doses this week</span>
                    <span className="chip chip-mint">Mon check-in done</span>
                  </div>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]">
                  <CalendarRange size={20} />
                </div>
              </div>
            </Link>
          </Reveal>
        </section>

        {/* Progress overview */}
        <section>
          <Reveal>
            <div className="flex items-end justify-between mb-3">
              <h2 className="text-lg font-semibold tracking-tight text-ink-900">
                Progress Overview
              </h2>
              <Link
                href="/track"
                className="text-xs text-brand-700 hover:text-brand-800 inline-flex items-center gap-1"
              >
                Details <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Reveal delay={0.04}>
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-ink-500">Weight</p>
                    <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                      <CountUp value={-12.4} decimals={1} />
                      <span className="text-sm font-medium text-ink-500 ml-1">lbs</span>
                    </p>
                    <p className="text-[11px] text-ink-500">since start</p>
                  </div>
                  <span className="chip chip-mint">
                    <TrendingDown size={12} /> on track
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline data={demoUser.weightSeries} tone="brand" height={64} />
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.08}>
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-ink-500">Body Fat</p>
                    <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                      <CountUp value={-3.8} decimals={1} />
                      <span className="text-sm font-medium text-ink-500 ml-1">%</span>
                    </p>
                    <p className="text-[11px] text-ink-500">since start</p>
                  </div>
                  <span className="chip chip-mint">
                    <TrendingDown size={12} /> improving
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline
                    data={demoUser.weightSeries.map((p, i) => ({ d: p.d, v: 28 - i * 0.6 }))}
                    tone="mint"
                    height={64}
                  />
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.12}>
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-ink-500">Lean Mass</p>
                    <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                      <CountUp value={1.2} decimals={1} prefix="+" />
                      <span className="text-sm font-medium text-ink-500 ml-1">lbs</span>
                    </p>
                    <p className="text-[11px] text-ink-500">since start</p>
                  </div>
                  <span className="chip">
                    <TrendingUp size={12} /> building
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline
                    data={demoUser.weightSeries.map((p, i) => ({ d: p.d, v: 140 + i * 0.2 }))}
                    tone="blush"
                    height={64}
                  />
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* Featured education */}
        <section>
          <Reveal>
            <div className="flex items-end justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ink-900">Learn today</h2>
                <p className="text-sm text-ink-500">Research-backed peptide breakdowns.</p>
              </div>
              <Link
                href="/explore"
                className="text-xs text-brand-700 hover:text-brand-800 inline-flex items-center gap-1"
              >
                Explore library <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={0.04 + i * 0.04}>
                <Link
                  href={`/peptide/${p.slug}`}
                  className="group surface-card transition-all hover:border-brand-200 hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.35)] hover:-translate-y-0.5 block"
                >
                  <div className="flex items-center justify-between">
                    <span className={`chip ${chipFor(p.color)}`}>{p.category}</span>
                    <span className="text-[11px] text-ink-400">{p.studyCount} studies</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <PeptideOrbit size={72} tone={p.color} />
                    <div className="min-w-0">
                      <p
                        className="text-base font-semibold text-ink-900 truncate"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.name}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-500 line-clamp-2">{p.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {p.targets.slice(0, 3).map((t) => (
                        <span key={t} className="chip chip-ink text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-brand-500 transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AI prompt card */}
        <Reveal>
          <Link
            href="/ai"
            className="group block relative overflow-hidden rounded-3xl p-6 md:p-8 bg-surface border border-border shadow-card hover:-translate-y-0.5 transition-transform"
          >
            <div className="absolute inset-0 gradient-brand-soft opacity-70" />
            <Grain opacity={0.035} />
            <CursorGlow size={480} opacity={0.25} />
            <div className="relative z-10 flex items-start gap-5">
              <div className="flex size-12 items-center justify-center rounded-2xl [background:linear-gradient(135deg,#a78bfa,#ec4899)] text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]">
                <Sparkles size={22} />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
                  AI Assistant
                </p>
                <h3
                  className="mt-1 text-xl md:text-2xl font-semibold text-ink-900 tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ask your peptide expert anything, 24/7.
                </h3>
                <p className="mt-2 text-sm text-ink-600 max-w-xl">
                  Side-effect tips, protocol comparisons, dose timing — answers backed by trusted
                  peptide research.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Suggestion>Compare retatrutide vs. semaglutide</Suggestion>
                  <Suggestion>How to manage week-1 nausea</Suggestion>
                  <Suggestion>When will I see results?</Suggestion>
                </div>
              </div>
              <ArrowRight className="mt-2 text-brand-600 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </Reveal>
      </div>
    </>
  );
}

function Suggestion({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface/80 backdrop-blur border border-brand-100 px-3 py-1 text-xs text-brand-700">
      {children}
    </span>
  );
}

function MiniStat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-sm px-3 py-2.5 border border-white/10">
      <p className="text-[10px] uppercase tracking-[0.12em] text-white/70 font-semibold flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
      {hint && <p className="text-[10px] text-white/60">{hint}</p>}
    </div>
  );
}

function chipFor(tone: string) {
  switch (tone) {
    case "mint":
      return "chip-mint";
    case "blush":
      return "chip-blush";
    case "amber":
      return "";
    default:
      return "";
  }
}
