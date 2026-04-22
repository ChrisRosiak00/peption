import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MoodCheckIn } from "@/components/home/mood-check-in";
import { Sparkline } from "@/components/charts/sparkline";
import { demoUser } from "@/lib/data/user";
import { peptides } from "@/lib/data/peptides";
import { PeptideOrbit } from "@/components/visuals/peptide-orbit";

export default function HomePage() {
  const featured = peptides.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-10 space-y-8">
      {/* Greeting */}
      <section className="animate-fade-up">
        <p className="text-sm text-ink-500">
          Good morning, {demoUser.name.split(" ")[0]} <span aria-hidden>👋</span>
        </p>
        <h1
          className="mt-2 text-2xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your peptide journey,
          <br />
          powered by knowledge.
        </h1>
        <p className="mt-3 text-sm md:text-base text-ink-500 max-w-xl">
          Science. Support. Community. All in one place.
        </p>
      </section>

      {/* Protocol + check-in grid */}
      <section className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-12 animate-fade-up">
        <Link
          href="/peptide/retatrutide"
          className="lg:col-span-6 group rounded-3xl p-6 md:p-7 text-white overflow-hidden relative [background:linear-gradient(135deg,#8b5cf6_0%,#7c3aed_40%,#ec4899_120%)] shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)]"
        >
          <div className="relative z-10 flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/80 font-semibold">
                Current Protocol
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {demoUser.currentProtocol.name}
              </p>
              <p className="mt-1 text-sm text-white/80">
                {demoUser.currentProtocol.dose}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
                {demoUser.currentProtocol.weekOf}
              </span>
            </div>
            <PeptideOrbit size={150} tone="brand" className="shrink-0 opacity-95 drop-shadow-2xl" />
          </div>
          <div className="relative z-10 mt-6 flex items-center justify-between text-sm text-white/90">
            <span>View full protocol</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
          <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-16 size-60 rounded-full bg-blush-300/40 blur-3xl" />
        </Link>

        <Card className="lg:col-span-6">
          <MoodCheckIn />
        </Card>
      </section>

      {/* Progress overview */}
      <section className="animate-fade-up">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-lg font-semibold tracking-tight text-ink-900">Progress Overview</h2>
          <Link href="/track" className="text-xs text-brand-700 hover:text-brand-800 inline-flex items-center gap-1">
            Details <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-500">Weight</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                  {demoUser.metrics.weightLoss}
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

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-500">Body Fat</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                  {demoUser.metrics.bodyFat}
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

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-ink-500">Lean Mass</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-900">
                  {demoUser.metrics.leanMass}
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
        </div>
      </section>

      {/* Featured education */}
      <section className="animate-fade-up">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink-900">Learn today</h2>
            <p className="text-sm text-ink-500">Research-backed peptide breakdowns.</p>
          </div>
          <Link href="/explore" className="text-xs text-brand-700 hover:text-brand-800 inline-flex items-center gap-1">
            Explore library <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/peptide/${p.slug}`}
              className="group surface-card p-5 transition-all hover:border-brand-200 hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.35)]"
            >
              <div className="flex items-center justify-between">
                <span className={`chip ${chipFor(p.color)}`}>{p.category}</span>
                <span className="text-[11px] text-ink-400">{p.studyCount} studies</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <PeptideOrbit size={72} tone={p.color} />
                <div className="min-w-0">
                  <p className="text-base font-semibold text-ink-900 truncate" style={{ fontFamily: "var(--font-display)" }}>
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
                <ArrowRight size={14} className="text-brand-500 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI prompt card */}
      <section className="animate-fade-up">
        <Link
          href="/ai"
          className="group block relative overflow-hidden rounded-3xl p-6 md:p-8 bg-surface border border-border shadow-card"
        >
          <div className="absolute inset-0 gradient-brand-soft opacity-70" />
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex size-12 items-center justify-center rounded-2xl [background:linear-gradient(135deg,#a78bfa,#ec4899)] text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]">
              <Sparkles size={22} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">AI Assistant</p>
              <h3 className="mt-1 text-xl md:text-2xl font-semibold text-ink-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Ask your peptide expert anything, 24/7.
              </h3>
              <p className="mt-2 text-sm text-ink-600 max-w-xl">
                Side-effect tips, protocol comparisons, dose timing — answers backed by trusted peptide research.
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
      </section>
    </div>
  );
}

function Suggestion({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur border border-brand-100 px-3 py-1 text-xs text-brand-700">
      {children}
    </span>
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
