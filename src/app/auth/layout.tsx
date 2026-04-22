import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden gradient-mesh">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 md:px-6 py-10">
        <div className="grid w-full gap-10 md:grid-cols-2 md:items-center">
          {/* Brand side */}
          <div className="hidden md:flex flex-col gap-8">
            <Link href="/" className="inline-flex">
              <Logo size="lg" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
                Science. Support. Community.
              </p>
              <h1
                className="mt-4 text-4xl font-semibold tracking-tight text-ink-900 leading-[1.05]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your peptide journey,
                <br />
                <span className="text-gradient">powered by knowledge.</span>
              </h1>
              <p className="mt-4 max-w-md text-sm text-ink-600 leading-relaxed">
                Track protocols, join an obsessed community, and ask the AI peptide expert
                anything — all in one beautifully simple place.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-ink-700">
              {[
                "Every major peptide, explained by research",
                "Progress tracking with photos, labs, measurements",
                "Community support that actually gets it",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Form side */}
          <div>
            <div className="md:hidden mb-8 flex justify-center">
              <Logo size="lg" />
            </div>
            <div className="surface-card p-6 md:p-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
