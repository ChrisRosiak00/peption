"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Command,
  Compass,
  Heart,
  Home,
  LineChart,
  MessageCircle,
  Plus,
  Search,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { CommandPalette } from "@/components/cmdk/command-palette";
import { ToastProvider } from "@/components/toast/toaster";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/track", label: "Track", icon: LineChart },
  { href: "/community", label: "Community", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

const HIDDEN_SHELL_PREFIXES = ["/auth", "/welcome"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = HIDDEN_SHELL_PREFIXES.some((p) => pathname?.startsWith(p));

  if (hideShell) {
    return (
      <ToastProvider>
        {children}
        <CommandPalette />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        {/* Desktop side nav */}
        <aside className="hidden lg:flex lg:w-[260px] xl:w-[280px] shrink-0 flex-col border-r border-border bg-surface/70 backdrop-blur-sm">
          <div className="flex flex-col gap-8 px-6 py-6 h-full sticky top-0">
            <Link href="/" className="flex items-center">
              <Logo size="md" />
            </Link>
            <nav className="flex flex-col gap-1">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-2">
              <p className="px-3.5 text-[11px] uppercase tracking-[0.12em] text-ink-400 font-semibold">
                Your tools
              </p>
              <div className="mt-2 flex flex-col gap-1">
                <SideLink href="/ai" icon={Sparkles} label="AI Assistant" accent />
                <SideLink href="/pricing" icon={Heart} label="Membership" />
                <SideLink href="/settings" icon={MessageCircle} label="Settings" />
              </div>
            </div>

            <div className="mt-auto">
              <UpgradeCard />
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex flex-col flex-1 min-w-0">
          <TopBar />
          <main className="flex-1 pb-28 lg:pb-0">{children}</main>
        </div>

        {/* Mobile bottom nav */}
        <MobileBottomNav pathname={pathname ?? "/"} />
      </div>

      <CommandPalette />
    </ToastProvider>
  );
}

function SideLink({
  href,
  icon: Icon,
  label,
  accent,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
        accent
          ? "text-brand-700 hover:bg-brand-50"
          : "text-ink-600 hover:text-ink-900 hover:bg-ink-50"
      )}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}

function TopBar() {
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/mac/i.test(navigator.platform) || /mac/i.test(navigator.userAgent));
    }
  }, []);

  function openPalette() {
    const e = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(e);
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-surface/80 backdrop-blur-md px-4 md:px-6 h-14 lg:h-16">
      <Link href="/" className="lg:hidden flex items-center">
        <Logo size="sm" />
      </Link>
      <button
        onClick={openPalette}
        className="hidden lg:inline-flex items-center gap-3 rounded-full border border-border bg-ink-50 hover:bg-ink-100 transition-colors px-3 h-9 text-xs text-ink-500"
      >
        <Search size={14} />
        <span>Search peptides, pages…</span>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-white px-1.5 py-0.5 text-[10px] font-medium text-ink-500">
          {isMac ? <Command size={10} /> : "Ctrl"} K
        </kbd>
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={openPalette}
          aria-label="Search"
          className="lg:hidden inline-flex items-center justify-center rounded-full size-9 text-ink-600 hover:text-ink-900 hover:bg-ink-100"
        >
          <Search size={18} />
        </button>
        <Link
          href="/ai"
          className="hidden md:inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 hover:bg-brand-100 transition-colors"
        >
          <Sparkles size={14} />
          Ask AI
        </Link>
        <button
          aria-label="Notifications"
          className="relative inline-flex items-center justify-center rounded-full size-9 text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-blush-500">
            <span className="absolute inset-0 rounded-full bg-blush-500 animate-ping" />
          </span>
        </button>
        <Link
          href="/profile"
          className="inline-flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white text-xs font-semibold"
        >
          AJ
        </Link>
      </div>
    </header>
  );
}

function MobileBottomNav({ pathname }: { pathname: string }) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-surface/90 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 pt-2 pb-[max(env(safe-area-inset-bottom),12px)]">
        {nav.slice(0, 2).map((item) => (
          <NavTab key={item.href} item={item} active={isActive(pathname, item.href)} />
        ))}
        <Link
          href="/ai"
          aria-label="AI Assistant"
          className="relative -mt-5 flex items-center justify-center size-12 rounded-full shadow-[0_12px_30px_-10px_rgba(124,58,237,0.7)] [background:linear-gradient(135deg,#a78bfa_0%,#8b5cf6_50%,#ec4899_120%)] text-white active:scale-95 transition-transform"
        >
          <Plus size={20} />
        </Link>
        {nav.slice(2, 4).map((item) => (
          <NavTab key={item.href} item={item} active={isActive(pathname, item.href)} />
        ))}
      </div>
    </nav>
  );
}

function NavTab({
  item,
  active,
}: {
  item: { href: string; label: string; icon: React.ComponentType<{ size?: number }> };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
        active ? "text-brand-700" : "text-ink-500"
      )}
    >
      <Icon size={20} />
      <span>{item.label}</span>
    </Link>
  );
}

function UpgradeCard() {
  return (
    <Link
      href="/pricing"
      className="group relative block overflow-hidden rounded-2xl p-4 text-white shadow-[0_18px_40px_-18px_rgba(124,58,237,0.55)] [background:linear-gradient(135deg,#a78bfa_0%,#8b5cf6_50%,#ec4899_120%)]"
    >
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.14em] text-white/80 font-semibold">
          Peption Pro
        </p>
        <p className="mt-2 text-sm font-semibold leading-snug">
          Unlock protocols, labs & the AI expert
        </p>
        <p className="mt-3 text-xs text-white/80">From $12/month</p>
      </div>
      <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/20 blur-xl" />
      <div className="absolute -bottom-8 -left-6 size-24 rounded-full bg-white/10 blur-xl" />
    </Link>
  );
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
