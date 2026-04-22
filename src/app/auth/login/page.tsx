import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Sign in · Peption" };

export default function LoginPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2
          className="text-2xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-ink-500">Sign in to continue your protocol.</p>
      </div>
      <div className="space-y-3">
        <SocialButton label="Continue with Apple" emoji="" />
        <SocialButton label="Continue with Google" emoji="" />
      </div>
      <div className="flex items-center gap-3 text-xs text-ink-400">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-3" action="/" method="get">
        <div>
          <label className="text-xs font-medium text-ink-600 mb-1.5 block">Email</label>
          <Input type="email" placeholder="you@peption.app" autoComplete="email" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-ink-600">Password</label>
            <a href="#" className="text-xs text-brand-700 hover:text-brand-800">
              Forgot?
            </a>
          </div>
          <Input type="password" placeholder="••••••••" autoComplete="current-password" />
        </div>
        <Button type="submit" variant="gradient" size="lg" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="text-center text-xs text-ink-500">
        New to Peption?{" "}
        <Link href="/auth/signup" className="text-brand-700 font-medium hover:text-brand-800">
          Create an account
        </Link>
      </p>
    </div>
  );
}

function SocialButton({ label }: { label: string; emoji?: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-full h-11 text-sm font-medium bg-surface text-ink-900 border border-ink-200 hover:border-ink-300"
    >
      {label}
    </button>
  );
}
