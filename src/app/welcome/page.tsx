import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FlaskConical,
  Heart,
  LineChart,
  MessageCircle,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { PeptideOrbit } from "@/components/visuals/peptide-orbit";
import { Floating } from "@/components/effects/floating";
import { Reveal } from "@/components/effects/reveal";
import { CountUp } from "@/components/effects/count-up";
import { Grain } from "@/components/effects/grain";
import { peptides } from "@/lib/data/peptides";
import { Avatar } from "@/components/ui/avatar";

export const metadata = {
  title: "Peption — Your peptide journey, powered by knowledge",
  description:
    "The most beautiful way to learn, track, and master peptide protocols. Science. Support. Community.",
};

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAurora />

      <MarketingNav />

      {/* HERO */}
      <section className="relative pt-10 md:pt-20 pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-brand-700">
                <Sparkles size={12} /> Beta — 50,000+ members &amp; growing
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="mt-5 text-4xl sm:text-5xl md:text-[64px] font-semibold tracking-[-0.02em] leading-[1.02] text-ink-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your peptide journey,
                <br />
                <span className="text-gradient">powered by knowledge.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base md:text-lg text-ink-600 leading-relaxed">
                Learn every protocol from the research up. Track what matters. Talk to an AI expert.
                Join a community in it with you. All in one obsessively calm app.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/auth/signup"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-white [background:linear-gradient(135deg,#a78bfa,#8b5cf6_45%,#ec4899_120%)] shadow-[0_16px_32px_-14px_rgba(124,58,237,0.7)] hover:brightness-[1.06] active:scale-[0.98] transition-all"
                >
                  Start free <ArrowRight size={16} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium text-ink-900 border border-ink-200 bg-white/70 backdrop-blur hover:border-ink-300"
                >
                  <Play size={14} />
                  See the app
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[
                    { n: "Jess", t: "blush" as const },
                    { n: "Amara", t: "mint" as const },
                    { n: "Mark", t: "sky" as const },
                    { n: "Kenji", t: "amber" as const },
                    { n: "Alex", t: "brand" as const },
                  ].map((a) => (
                    <Avatar
                      key={a.n}
                      name={a.n}
                      tone={a.t}
                      size={32}
                      className="ring-2 ring-background"
                    />
                  ))}
                </div>
                <div className="text-xs text-ink-600">
                  Loved by <strong className="text-ink-900">50,000+</strong> members
                  <br />
                  <span className="text-ink-400">Avg rating 4.9 / 5</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Hero visual */}
          <div className="relative z-10 flex items-center justify-center min-h-[360px] md:min-h-[480px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="size-[360px] md:size-[520px] rounded-full [background:radial-gradient(closest-side,rgba(167,139,250,0.55),transparent_70%)] blur-3xl" />
            </div>
            <Floating distance={10} duration={7}>
              <PeptideOrbit size={360} tone="brand" className="drop-shadow-[0_30px_60px_rgba(124,58,237,0.35)]" />
            </Floating>
            {/* Orbital floating chips */}
            <Floating className="absolute top-10 right-6 md:right-0" distance={6} duration={5}>
              <FloatingChip icon={FlaskConical} title="GLP-1 · GIP · Glucagon" subtitle="Retatrutide" />
            </Floating>
            <Floating className="absolute bottom-12 left-2 md:left-0" distance={8} duration={6} delay={1}>
              <FloatingChip icon={LineChart} title="–12.4 lbs" subtitle="Week 6" tone="mint" />
            </Floating>
            <Floating className="absolute top-1/2 right-0 -translate-y-1/2" distance={5} duration={6.5} delay={0.6}>
              <FloatingChip icon={Heart} title="Energy 8/10" subtitle="Today" tone="blush" />
            </Floating>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_-24px_rgba(76,29,149,0.25)] p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat label="Active members" value={52148} suffix="+" />
            <Stat label="Protocols tracked" value={128000} suffix="+" />
            <Stat label="Lbs collectively lost" value={1200000} suffix="+" />
            <Stat label="Avg member rating" value={4.9} decimals={1} suffix=" / 5" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="chip">The platform</span>
              <h2
                className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Every tool you need. <span className="text-gradient">None of the noise.</span>
              </h2>
              <p className="mt-4 text-ink-600 text-base md:text-lg">
                Built for people who take this seriously — and deserve something that looks like they do.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {/* AI assistant */}
            <Reveal delay={0.04}>
              <FeatureCard
                icon={Sparkles}
                tone="brand"
                label="AI Assistant"
                title="A peptide expert, on tap."
                body="Compare compounds, decode side effects, or design a titration. Grounded in trusted research — not Reddit rumors."
              >
                <div className="mt-5 rounded-2xl bg-surface-muted/60 border border-border p-3 space-y-2">
                  <ChatLine role="user">How should I handle week-1 nausea?</ChatLine>
                  <ChatLine role="assistant">
                    Take your shot at night, lean protein-forward, and keep electrolytes up…
                  </ChatLine>
                </div>
              </FeatureCard>
            </Reveal>

            {/* Tracking */}
            <Reveal delay={0.08}>
              <FeatureCard
                icon={LineChart}
                tone="mint"
                label="Tracking"
                title="Every shot. Every trend."
                body="Weight, body comp, energy, labs, photos — visualized in a way that actually shows what's working."
              >
                <div className="mt-5 rounded-2xl bg-surface-muted/60 border border-border p-3">
                  <TrendMini />
                </div>
              </FeatureCard>
            </Reveal>

            {/* Community */}
            <Reveal delay={0.12}>
              <FeatureCard
                icon={Users}
                tone="blush"
                label="Community"
                title="Finally, a place that gets it."
                body="Support, honest stories, and protocols from 50,000+ members. Post anonymously if you want."
              >
                <div className="mt-5 rounded-2xl bg-surface-muted/60 border border-border p-3 space-y-2">
                  <CommunityLine name="Jessica" color="blush" text="Week 8 — down 18 lbs ✨" />
                  <CommunityLine name="Amara" color="mint" text="A1C 6.4 → 5.4 🙌" />
                </div>
              </FeatureCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PEPTIDE SHOWCASE */}
      <section className="relative py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-xl">
                <span className="chip">The library</span>
                <h2
                  className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Every peptide. <span className="text-gradient">Every study.</span>
                </h2>
                <p className="mt-4 text-ink-600">
                  Mechanism, benefits, dosing, side effects, and research — in a format that respects your time.
                </p>
              </div>
              <Link
                href="/explore"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                Open the library <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="flex gap-4 overflow-x-auto scrollbar-hidden snap-x snap-mandatory scroll-smooth pb-4">
              {peptides.map((p) => (
                <Link
                  key={p.slug}
                  href={`/peptide/${p.slug}`}
                  className="snap-start shrink-0 w-[280px] rounded-3xl border border-border bg-surface p-5 shadow-card hover:border-brand-200 hover:shadow-[0_24px_40px_-20px_rgba(124,58,237,0.3)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="chip">{p.category}</span>
                    <span className="text-[11px] text-ink-400">{p.studyCount} studies</span>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <PeptideOrbit size={120} tone={p.color} />
                  </div>
                  <p
                    className="mt-2 text-lg font-semibold text-ink-900 tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </p>
                  <p className="mt-1 text-xs text-ink-500 line-clamp-2">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.targets.slice(0, 3).map((t) => (
                      <span key={t} className="chip chip-ink text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-12 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="chip">What members say</span>
              <h2
                className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Loved by the people <span className="text-gradient">actually doing this.</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.quote} delay={0.05 * i}>
                <figure className="relative h-full rounded-3xl border border-border bg-surface p-6 shadow-card">
                  <Quote size={18} className="text-brand-300" />
                  <blockquote className="mt-4 text-sm md:text-base text-ink-800 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar name={t.name} tone={t.tone} size={36} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                      <p className="text-xs text-ink-500">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-12 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="chip">How it works</span>
              <h2
                className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get set up in <span className="text-gradient">under 60 seconds.</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={0.06 * i}>
                <div className="relative h-full rounded-3xl border border-border bg-surface p-6">
                  <span
                    className="inline-flex size-10 items-center justify-center rounded-2xl text-white text-sm font-semibold [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="mt-4 text-lg font-semibold text-ink-900 tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="relative py-12 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] p-8 md:p-14 text-white [background:linear-gradient(160deg,#8b5cf6_0%,#7c3aed_45%,#ec4899_140%)]">
              <Grain opacity={0.06} />
              <div className="pointer-events-none absolute -top-24 -right-10 size-96 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 size-96 rounded-full bg-blush-300/30 blur-3xl" />

              <div className="relative z-10 grid md:grid-cols-5 gap-10 items-center">
                <div className="md:col-span-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    <Sparkles size={12} /> Memberships
                  </span>
                  <h3
                    className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Start free.
                    <br />
                    Upgrade when it&apos;s time.
                  </h3>
                  <p className="mt-4 max-w-lg text-white/85">
                    The Starter plan gets you real education, the community feed, and basic tracking.
                    Pro unlocks the expert library, full tracking suite, and unlimited AI.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/auth/signup"
                      className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-medium text-brand-700 bg-white hover:bg-ink-50"
                    >
                      Start free <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/pricing"
                      className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium text-white border border-white/30 hover:bg-white/10"
                    >
                      See plans
                    </Link>
                  </div>
                </div>
                <ul className="md:col-span-2 grid gap-3 text-sm text-white/90">
                  {[
                    "Full research library",
                    "Beautiful progress tracking",
                    "Unlimited AI with Pro",
                    "Community rooms & groups",
                    "Private by default, encrypted at rest",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-0.5 text-white/90" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SAFETY */}
      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="rounded-3xl border border-border bg-white/70 backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-mint-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.6)]">
                <ShieldCheck size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink-900">
                  Educational platform — not a pharmacy.
                </p>
                <p className="mt-1 text-xs md:text-sm text-ink-600 leading-relaxed">
                  Peption doesn&apos;t sell peptides. We help you learn, track, and connect. Always consult a licensed clinician before starting any protocol. Your data is encrypted at rest and never sold.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-14 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <Reveal>
            <h2
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-ink-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to meet the platform
              <br />
              <span className="text-gradient">your protocol deserves?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base md:text-lg text-ink-600">
              Takes 60 seconds. First 7 days of Pro on us.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex h-14 items-center gap-2 rounded-full px-7 text-base font-medium text-white [background:linear-gradient(135deg,#a78bfa,#8b5cf6_45%,#ec4899_120%)] shadow-[0_20px_40px_-14px_rgba(124,58,237,0.7)] hover:brightness-[1.06] active:scale-[0.98] transition-all"
              >
                Start free <ArrowRight size={18} />
              </Link>
              <Link
                href="/"
                className="inline-flex h-14 items-center gap-2 rounded-full px-6 text-base font-medium text-ink-900 border border-ink-200 bg-white/80 backdrop-blur hover:border-ink-300"
              >
                Explore the app
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function BackgroundAurora() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 gradient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-20 size-[480px] rounded-full bg-brand-300/40 blur-[120px]" />
        <div className="absolute top-[20%] -right-24 size-[500px] rounded-full bg-blush-300/35 blur-[120px]" />
        <div className="absolute top-[60%] left-1/3 size-[420px] rounded-full bg-mint-300/25 blur-[120px]" />
      </div>
      <Grain opacity={0.025} className="fixed" />
    </>
  );
}

function MarketingNav() {
  return (
    <header className="relative z-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/welcome" className="flex items-center">
          <Logo size="md" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-600">
          <Link href="/explore" className="hover:text-ink-900">Peptides</Link>
          <Link href="/ai" className="hover:text-ink-900">AI</Link>
          <Link href="/community" className="hover:text-ink-900">Community</Link>
          <Link href="/pricing" className="hover:text-ink-900">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex h-10 items-center px-4 rounded-full text-sm font-medium text-ink-900 hover:bg-ink-100"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex h-10 items-center gap-1.5 px-4 rounded-full text-sm font-medium text-white [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)] hover:brightness-[1.05]"
          >
            Start free <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}

function MarketingFooter() {
  return (
    <footer className="relative border-t border-border mt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14 grid gap-8 md:grid-cols-4">
        <div>
          <Logo size="md" />
          <p className="mt-3 text-sm text-ink-500 max-w-xs">
            Your peptide journey, powered by knowledge.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { href: "/", label: "Dashboard" },
            { href: "/explore", label: "Peptide library" },
            { href: "/ai", label: "AI Assistant" },
            { href: "/track", label: "Tracking" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/community", label: "Community" },
            { href: "/pricing", label: "Pricing" },
            { href: "/auth/signup", label: "Create account" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { href: "/settings", label: "Privacy" },
            { href: "/settings", label: "Terms" },
            { href: "/settings", label: "Data export" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-5 flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs text-ink-500">
          <p>© {new Date().getFullYear()} Peption. Made with care.</p>
          <p>Educational content only. Always consult a licensed clinician.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-ink-700">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-ink-900">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
  decimals,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  return (
    <div>
      <p
        className="text-3xl md:text-4xl font-semibold tracking-tight text-ink-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <CountUp value={value} decimals={decimals ?? 0} suffix={suffix ?? ""} />
      </p>
      <p className="mt-1 text-xs text-ink-500">{label}</p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  label,
  title,
  body,
  tone,
  children,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  title: string;
  body: string;
  tone: "brand" | "mint" | "blush";
  children?: React.ReactNode;
}) {
  const toneClass =
    tone === "mint"
      ? "bg-mint-500"
      : tone === "blush"
        ? "[background:linear-gradient(135deg,#f9a8d4,#ec4899)]"
        : "[background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)]";
  return (
    <article className="relative h-full rounded-3xl border border-border bg-surface p-6 shadow-card overflow-hidden">
      <div className={`flex size-11 items-center justify-center rounded-2xl text-white ${toneClass}`}>
        <Icon size={18} />
      </div>
      <p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">{label}</p>
      <h3
        className="mt-2 text-xl font-semibold text-ink-900 tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{body}</p>
      {children}
    </article>
  );
}

function ChatLine({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <span className="inline-block rounded-2xl rounded-tr-sm bg-brand-600 text-white text-xs px-3 py-1.5 max-w-[80%]">
          {children}
        </span>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <span className="inline-block rounded-2xl rounded-tl-sm bg-white border border-border text-ink-800 text-xs px-3 py-1.5 max-w-[85%]">
        {children}
      </span>
    </div>
  );
}

function TrendMini() {
  const pts = [
    { x: 0, y: 35 },
    { x: 12, y: 34 },
    { x: 24, y: 30 },
    { x: 36, y: 28 },
    { x: 48, y: 24 },
    { x: 60, y: 22 },
    { x: 72, y: 19 },
    { x: 84, y: 17 },
    { x: 96, y: 14 },
    { x: 108, y: 12 },
    { x: 120, y: 10 },
  ];
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx1 = (prev.x + p.x) / 2;
      return `C ${cx1} ${prev.y}, ${cx1} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 120 40" className="w-full h-14" aria-hidden>
      <defs>
        <linearGradient id="trend-stroke" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.35" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L 120 40 L 0 40 Z`} fill="url(#trend-fill)" />
      <path d={d} stroke="url(#trend-stroke)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.4} fill="#8b5cf6" />
      ))}
    </svg>
  );
}

function CommunityLine({
  name,
  color,
  text,
}: {
  name: string;
  color: "brand" | "blush" | "mint" | "sky" | "amber";
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Avatar name={name} tone={color} size={24} />
      <div className="flex-1 min-w-0 text-xs">
        <p className="font-semibold text-ink-900 truncate">{name}</p>
        <p className="text-ink-500 truncate">{text}</p>
      </div>
      <Heart size={12} className="text-blush-500 fill-blush-500" />
    </div>
  );
}

function FloatingChip({
  icon: Icon,
  title,
  subtitle,
  tone = "brand",
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  tone?: "brand" | "mint" | "blush";
}) {
  const toneClass =
    tone === "mint"
      ? "bg-mint-500 text-white"
      : tone === "blush"
        ? "bg-blush-500 text-white"
        : "bg-brand-600 text-white";
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-white/90 backdrop-blur px-3 py-2 shadow-[0_14px_30px_-14px_rgba(76,29,149,0.35)]">
      <span className={`flex size-8 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={14} />
      </span>
      <div>
        <p className="text-[11px] font-semibold text-ink-900 leading-tight">{title}</p>
        <p className="text-[10px] text-ink-500 leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}

const steps = [
  {
    title: "Create your account",
    body: "Takes 60 seconds. We never sell your data, and you can export or delete everything any time.",
  },
  {
    title: "Pick a protocol",
    body: "Browse the library, or describe your goal — the AI will recommend a shortlist and explain why.",
  },
  {
    title: "Track & learn weekly",
    body: "Log shots, measurements, and how you feel. We turn it into trends that actually make sense.",
  },
];

const testimonials = [
  {
    name: "Jessica R.",
    role: "Retatrutide · 16 weeks",
    tone: "blush" as const,
    quote:
      "Peption turned my protocol from a guessing game into something I actually understand. Down 28 lbs, and the food noise is finally gone.",
  },
  {
    name: "Amara L.",
    role: "Tirzepatide · 9 months",
    tone: "mint" as const,
    quote:
      "The tracking is unreal — I finally see the trends. My labs dropped across the board and my coach uses Peption reports with me now.",
  },
  {
    name: "Kenji S.",
    role: "Semaglutide → Pro member",
    tone: "brand" as const,
    quote:
      "The AI feels like having a pharmacist in your pocket. It caught a dosage question my own doctor missed. Worth every cent.",
  },
];
