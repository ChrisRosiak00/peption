import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Brain, Check, Flame, Heart, Shield, Target } from "lucide-react";
import { getPeptide, peptides } from "@/lib/data/peptides";
import { PeptideOrbit } from "@/components/visuals/peptide-orbit";
import { PeptideTabs } from "./tabs";

type Params = { slug: string };

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

export default async function PeptidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const peptide = getPeptide(slug);
  if (!peptide) notFound();

  const iconMap = { brain: Brain, target: Target, flame: Flame, shield: Shield };

  return (
    <div className="mx-auto w-full max-w-5xl pb-10">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            peptide.color === "mint"
              ? "[background:linear-gradient(135deg,#a7f3d0_0%,#10b981_55%,#38bdf8_140%)]"
              : peptide.color === "blush"
                ? "[background:linear-gradient(135deg,#f9a8d4_0%,#ec4899_55%,#a78bfa_140%)]"
                : peptide.color === "amber"
                  ? "[background:linear-gradient(135deg,#fcd34d_0%,#f59e0b_55%,#f472b6_140%)]"
                  : peptide.color === "sky"
                    ? "[background:linear-gradient(135deg,#7dd3fc_0%,#38bdf8_55%,#a78bfa_140%)]"
                    : "[background:linear-gradient(135deg,#a78bfa_0%,#8b5cf6_55%,#ec4899_140%)]"
          }`}
        />
        <div className="relative z-10 px-4 md:px-8 pt-6 pb-14 md:pt-10 md:pb-20">
          <div className="flex items-center justify-between text-white">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm/6 text-white/90 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <button className="inline-flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
              <Heart size={16} />
            </button>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <PeptideOrbit size={220} tone={peptide.color} className="drop-shadow-2xl shrink-0" />
            <div className="text-white">
              <h1
                className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {peptide.name}
              </h1>
              <span className="mt-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                Peptide · {peptide.category}
              </span>
              <p className="mt-4 max-w-xl text-sm md:text-base text-white/90">
                {peptide.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 md:px-8 -mt-6">
        <div className="rounded-3xl bg-surface border border-border shadow-card overflow-hidden">
          <PeptideTabs>
            {{
              overview: (
                <div className="p-6 md:p-8 space-y-6">
                  <p className="text-sm md:text-base text-ink-700 leading-relaxed">
                    {peptide.description}
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    {peptide.mechanism.map((m) => {
                      const Icon = iconMap[m.icon];
                      return (
                        <div key={m.title} className="rounded-2xl border border-border bg-surface-muted/60 p-4">
                          <div
                            className={`flex size-10 items-center justify-center rounded-xl text-white ${
                              m.icon === "brain"
                                ? "bg-brand-500"
                                : m.icon === "target"
                                  ? "bg-mint-500"
                                  : m.icon === "flame"
                                    ? "bg-blush-500"
                                    : "bg-amber-500"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <p className="mt-3 text-sm font-semibold text-ink-900">{m.title}</p>
                          <p className="mt-1 text-xs text-ink-500 leading-relaxed">{m.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-2xl bg-brand-50/70 border border-brand-100 p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
                      Key Potential Benefits
                    </p>
                    <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                      {peptide.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-ink-800">
                          <span className="flex size-5 items-center justify-center rounded-full bg-brand-600 text-white">
                            <Check size={12} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <Stat label="Common dose" value={peptide.commonDose} />
                    <Stat label="Half life" value={peptide.halfLife} />
                    <Stat label="Studies" value={`${peptide.studyCount}`} />
                  </div>
                </div>
              ),
              benefits: (
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-base font-semibold text-ink-900">What users report</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {peptide.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-3 rounded-2xl border border-border bg-surface-muted/60 p-4">
                        <span className="flex size-8 items-center justify-center rounded-xl bg-mint-100 text-mint-600">
                          <Check size={16} />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{b}</p>
                          <p className="mt-0.5 text-xs text-ink-500">Consistently reported across studies.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-border p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500 font-semibold">
                      Things to watch for
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {peptide.sideEffects.map((s) => (
                        <li key={s} className="chip chip-blush">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
              mechanism: (
                <div className="p-6 md:p-8 space-y-5">
                  {peptide.mechanism.map((m) => {
                    const Icon = iconMap[m.icon];
                    return (
                      <div key={m.title} className="flex items-start gap-4 rounded-2xl border border-border p-5">
                        <div
                          className={`flex size-12 items-center justify-center rounded-2xl text-white ${
                            m.icon === "brain"
                              ? "bg-brand-500"
                              : m.icon === "target"
                                ? "bg-mint-500"
                                : m.icon === "flame"
                                  ? "bg-blush-500"
                                  : "bg-amber-500"
                          }`}
                        >
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-ink-900">{m.title}</p>
                          <p className="mt-1 text-sm text-ink-600 leading-relaxed">{m.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ),
              research: (
                <div className="p-6 md:p-8 space-y-4">
                  {peptide.research.map((r) => (
                    <div key={r.title} className="rounded-2xl border border-border p-5">
                      <div className="flex items-center justify-between">
                        <span className="chip">{r.publisher}</span>
                        <span className="text-xs text-ink-400">{r.year}</span>
                      </div>
                      <p className="mt-3 text-base font-semibold text-ink-900 leading-snug">
                        {r.title}
                      </p>
                      <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{r.summary}</p>
                    </div>
                  ))}
                  <p className="text-xs text-ink-400">
                    Citations sourced from peer-reviewed publications. Results may vary — consult a licensed clinician.
                  </p>
                </div>
              ),
            }}
          </PeptideTabs>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-muted/60 border border-border p-4">
      <p className="text-[11px] uppercase tracking-[0.12em] text-ink-400 font-semibold">{label}</p>
      <p className="mt-1.5 text-sm font-semibold text-ink-900">{value}</p>
    </div>
  );
}
