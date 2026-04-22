import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Create account · Peption" };

export default function SignupPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2
          className="text-2xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Create your account
        </h2>
        <p className="mt-1 text-sm text-ink-500">7-day free trial — cancel anytime.</p>
      </div>
      <div className="space-y-3">
        <SocialButton label="Continue with Apple" />
        <SocialButton label="Continue with Google" />
      </div>
      <div className="flex items-center gap-3 text-xs text-ink-400">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-3" action="/" method="get">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block">First name</label>
            <Input placeholder="Alex" autoComplete="given-name" />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-600 mb-1.5 block">Last name</label>
            <Input placeholder="Johnson" autoComplete="family-name" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1.5 block">Email</label>
          <Input type="email" placeholder="you@peption.app" autoComplete="email" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1.5 block">Password</label>
          <Input type="password" placeholder="At least 10 characters" autoComplete="new-password" />
        </div>
        <Button type="submit" variant="gradient" size="lg" className="w-full">
          Create account
        </Button>
        <p className="text-[11px] text-ink-400 leading-relaxed">
          By continuing you agree to our Terms and Privacy. Peption is an educational platform — always consult a licensed clinician before starting any protocol.
        </p>
      </form>
      <p className="text-center text-xs text-ink-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-brand-700 font-medium hover:text-brand-800">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-full h-11 text-sm font-medium bg-surface text-ink-900 border border-ink-200 hover:border-ink-300"
    >
      {label}
    </button>
  );
}
