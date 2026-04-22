import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CreditCard,
  FileLock2,
  Globe,
  HeartHandshake,
  LogOut,
  Mail,
  Moon,
  Shield,
  User,
} from "lucide-react";

export const metadata = { title: "Settings · Peption" };

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-6 py-6 md:py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1
          className="text-2xl md:text-3xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Settings
        </h1>
      </div>

      <Section title="Account">
        <Row icon={User} label="Profile details" caption="Name, handle, avatar" />
        <Row icon={Mail} label="Email" caption="alex@peption.app" />
        <Row icon={CreditCard} label="Billing" caption="Pro · annual" href="/pricing" />
      </Section>

      <Section title="Protocol & tracking">
        <Toggle label="Dose reminders" caption="Push notifications before your shot" defaultOn />
        <Toggle label="Check-in nudges" caption="Gentle daily mood reminders" defaultOn />
        <Toggle label="Weekly summary" caption="Friday recap of your progress" defaultOn />
      </Section>

      <Section title="Privacy">
        <Row icon={Shield} label="Privacy & sharing" caption="Posts, progress, labs" />
        <Row icon={FileLock2} label="Export my data" caption="Download everything as JSON" />
        <Toggle label="Anonymize community posts" caption="Hide your handle from public feeds" />
      </Section>

      <Section title="Preferences">
        <Row icon={Globe} label="Language" caption="English" />
        <Toggle label="Dark mode" caption="Coming soon" disabled />
        <Row icon={HeartHandshake} label="Referral program" caption="Give $20, get $20" />
      </Section>

      <Section title="Notifications">
        <Toggle label="New community replies" defaultOn />
        <Toggle label="Weekly research digest" defaultOn />
        <Toggle label="AI assistant suggestions" />
      </Section>

      <div className="rounded-2xl border border-red-200 bg-red-50/40 p-4">
        <button className="w-full flex items-center justify-between text-red-600 text-sm font-medium">
          <span className="inline-flex items-center gap-3">
            <LogOut size={16} />
            Sign out
          </span>
          <ChevronRight size={16} />
        </button>
      </div>
      <p className="text-center text-xs text-ink-400 pt-2">Peption v0.1 · Made with care.</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold px-2 mb-2">
        {title}
      </h2>
      <div className="surface-card !p-0 overflow-hidden">
        <ul className="divide-y divide-border">{children}</ul>
      </div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  caption,
  href,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  caption?: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-ink-50/70">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon size={16} />
        </span>
        <div>
          <p className="text-sm font-medium text-ink-900">{label}</p>
          {caption && <p className="text-xs text-ink-500 mt-0.5">{caption}</p>}
        </div>
      </div>
      <ChevronRight size={16} className="text-ink-400" />
    </div>
  );
  return <li>{href ? <Link href={href}>{body}</Link> : body}</li>;
}

function Toggle({
  label,
  caption,
  defaultOn,
  disabled,
}: {
  label: string;
  caption?: string;
  defaultOn?: boolean;
  disabled?: boolean;
}) {
  return (
    <li>
      <label className={`flex items-center justify-between gap-3 px-5 py-4 ${disabled ? "opacity-60" : "hover:bg-ink-50/70 cursor-pointer"}`}>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Bell size={16} />
          </span>
          <div>
            <p className="text-sm font-medium text-ink-900">{label}</p>
            {caption && <p className="text-xs text-ink-500 mt-0.5">{caption}</p>}
          </div>
        </div>
        <input
          type="checkbox"
          defaultChecked={defaultOn}
          disabled={disabled}
          className="peer sr-only"
        />
        <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-ink-200 peer-checked:bg-brand-600 transition-colors">
          <span className="size-5 rounded-full bg-white shadow transition-transform translate-x-0.5 peer-checked:translate-x-[22px]" />
        </span>
      </label>
    </li>
  );
}
