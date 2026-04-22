import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata = { title: "Membership · Peption" };

const plans = [
  {
    name: "Starter",
    price: "Free",
    blurb: "Explore the library and join the community.",
    cta: "Start free",
    href: "/auth/signup",
    features: [
      "Full peptide library (Free tier)",
      "Community feed + groups",
      "Basic tracking (weight + shots)",
      "3 AI questions / week",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/ month",
    blurb: "For the serious protocol runner.",
    cta: "Start 7-day free trial",
    href: "/auth/signup",
    features: [
      "Everything in Starter",
      "All Pro peptides & protocols",
      "Unlimited AI assistant",
      "Full tracking suite + photos",
      "Lab results import",
      "Pro-only community rooms",
    ],
    highlighted: true,
  },
  {
    name: "Expert",
    price: "$29",
    period: "/ month",
    blurb: "Clinicians, coaches, and power users.",
    cta: "Talk to our team",
    href: "/auth/signup",
    features: [
      "Everything in Pro",
      "Expert-tier peptides",
      "Advanced stacking & cycling tools",
      "1:1 with certified peptide coaches",
      "Priority AI (deeper context)",
      "Export-ready client reports",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-8 md:py-14 space-y-10">
      <header className="text-center max-w-2xl mx-auto animate-fade-up">
        <span className="chip">Membership</span>
        <h1
          className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A membership for every stage of your journey.
        </h1>
        <p className="mt-4 text-sm md:text-base text-ink-500">
          Start free. Upgrade when you&apos;re ready for deeper protocols, unlimited AI, and tools that track it all.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3 animate-fade-up">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl border p-7 md:p-8 ${
              p.highlighted
                ? "border-transparent text-white [background:linear-gradient(160deg,#8b5cf6_0%,#7c3aed_50%,#ec4899_140%)] shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)]"
                : "border-border bg-surface shadow-card"
            }`}
          >
            {p.highlighted && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-white px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold">
                <Sparkles size={12} /> Most popular
              </span>
            )}
            <p className={`text-sm font-medium ${p.highlighted ? "text-white/80" : "text-ink-500"}`}>
              {p.name}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span
                className={`text-4xl font-semibold tracking-tight ${p.highlighted ? "text-white" : "text-ink-900"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.price}
              </span>
              {p.period && (
                <span className={`text-sm ${p.highlighted ? "text-white/80" : "text-ink-500"}`}>{p.period}</span>
              )}
            </div>
            <p className={`mt-2 text-sm ${p.highlighted ? "text-white/85" : "text-ink-500"}`}>{p.blurb}</p>
            <ul className={`mt-6 space-y-2.5 text-sm ${p.highlighted ? "text-white/90" : "text-ink-700"}`}>
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                      p.highlighted ? "bg-white/20 text-white" : "bg-mint-100 text-mint-600"
                    }`}
                  >
                    <Check size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 h-12 text-sm font-medium transition-all ${
                p.highlighted
                  ? "bg-white text-brand-700 hover:bg-ink-50"
                  : "bg-brand-600 text-white hover:bg-brand-700"
              }`}
            >
              {p.cta} <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      <section className="rounded-3xl surface-card p-6 md:p-10 animate-fade-up">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-ink-900" style={{ fontFamily: "var(--font-display)" }}>
          Questions, answered.
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-border p-5">
              <p className="text-sm font-semibold text-ink-900">{f.q}</p>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const faqs = [
  {
    q: "Do you sell peptides?",
    a: "No — Peption is an education and community platform. We help you learn, track, and connect with others. Always consult a licensed clinician for any medication decision.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel in one click from Settings → Billing. Your plan stays active through the end of the billing period.",
  },
  {
    q: "What makes Pro worth it?",
    a: "Pro unlocks the full research library, unlimited AI assistant, advanced tracking, photo progress, lab-results import, and exclusive community rooms.",
  },
  {
    q: "Is my health data private?",
    a: "Always. Your tracking data is encrypted at rest, never sold, and can be exported or deleted at any time from your settings.",
  },
];
