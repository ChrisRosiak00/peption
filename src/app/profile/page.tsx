import Link from "next/link";
import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  FlaskConical,
  Library,
  Settings,
  Shield,
  Sparkles,
  Syringe,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { demoUser } from "@/lib/data/user";

export const metadata = { title: "Profile · Peption" };

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 py-6 md:py-10 space-y-6">
      {/* Header card */}
      <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-white [background:linear-gradient(135deg,#8b5cf6_0%,#7c3aed_55%,#ec4899_140%)] animate-fade-up">
        <div className="pointer-events-none absolute -top-12 -right-12 size-60 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 size-60 rounded-full bg-blush-300/40 blur-3xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={demoUser.name} tone="brand" size={72} />
            <div>
              <h1
                className="text-2xl md:text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {demoUser.name}
              </h1>
              <p className="text-sm text-white/80">@{demoUser.handle}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                <Sparkles size={12} /> {demoUser.tier}
              </span>
            </div>
          </div>
          <Link
            href="/settings"
            aria-label="Settings"
            className="hidden md:inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
          >
            <Settings size={18} />
          </Link>
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 text-center">
          <Stat value={`${demoUser.protocolsCount}`} label="Protocols" />
          <Stat value={`${demoUser.checkinsCount}`} label="Check-ins" />
          <Stat value={`${demoUser.badgesCount}`} label="Badges" />
        </div>
      </section>

      {/* Current protocol */}
      <Link
        href="/peptide/retatrutide"
        className="group surface-card flex items-center justify-between p-5 md:p-6 hover:border-brand-200 transition-colors animate-fade-up"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">
            Current Protocol
          </p>
          <p className="mt-1 text-xl font-semibold text-ink-900" style={{ fontFamily: "var(--font-display)" }}>
            {demoUser.currentProtocol.name}
          </p>
          <p className="text-xs text-ink-500">{demoUser.currentProtocol.dose}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="chip">{demoUser.currentProtocol.weekOf}</span>
          <ChevronRight size={16} className="text-ink-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* My tools */}
      <section className="animate-fade-up">
        <h2 className="text-lg font-semibold text-ink-900 tracking-tight">My Tools</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <ToolLink icon={Target} label="Protocol Planner" href="/track" />
          <ToolLink icon={Syringe} label="Shot & Dose Tracker" href="/track" />
          <ToolLink icon={FlaskConical} label="Side Effect Tracker" href="/track" />
          <ToolLink icon={FileText} label="Lab Results" href="/track" />
          <ToolLink icon={Bell} label="Reminders" href="/settings" />
          <ToolLink icon={Library} label="Peptide Library" href="/explore" />
        </div>
      </section>

      {/* Badges */}
      <section className="animate-fade-up">
        <h2 className="text-lg font-semibold text-ink-900 tracking-tight">Badges</h2>
        <Card className="mt-3">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {demoUser.badges.map((b) => (
              <div key={b.id} className="flex flex-col items-center text-center gap-2">
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.35)] ${
                    b.tone === "mint"
                      ? "bg-mint-500"
                      : b.tone === "blush"
                        ? "bg-blush-500"
                        : b.tone === "amber"
                          ? "bg-amber-500"
                          : b.tone === "sky"
                            ? "bg-sky-500"
                            : "bg-brand-600"
                  }`}
                >
                  <Sparkles size={22} />
                </div>
                <p className="text-[11px] font-medium text-ink-700 leading-tight">{b.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Resources */}
      <section className="animate-fade-up">
        <h2 className="text-lg font-semibold text-ink-900 tracking-tight">Account</h2>
        <Card className="mt-3 !p-0">
          <ul className="divide-y divide-border">
            <AccountRow icon={CreditCard} label="Membership" href="/pricing" caption={demoUser.tier} />
            <AccountRow icon={Shield} label="Privacy & Data" href="/settings" />
            <AccountRow icon={Bell} label="Notifications" href="/settings" />
            <AccountRow icon={Settings} label="Settings" href="/settings" />
          </ul>
        </Card>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/15 px-3 py-3 backdrop-blur-sm">
      <p className="text-2xl font-semibold leading-none tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-white/80">{label}</p>
    </div>
  );
}

function ToolLink({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 hover:border-brand-200 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon size={16} />
        </span>
        <span className="text-sm font-medium text-ink-900">{label}</span>
      </div>
      <ChevronRight size={16} className="text-ink-400 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

function AccountRow({
  icon: Icon,
  label,
  href,
  caption,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
  caption?: string;
}) {
  return (
    <li>
      <Link href={href} className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-ink-50/80">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon size={16} />
          </span>
          <span className="text-sm font-medium text-ink-900">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {caption && <span className="text-xs text-ink-500">{caption}</span>}
          <ChevronRight size={16} className="text-ink-400" />
        </div>
      </Link>
    </li>
  );
}
