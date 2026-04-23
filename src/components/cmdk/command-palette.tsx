"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Compass,
  Home,
  LineChart,
  Search,
  Sparkles,
  Users,
  User,
  Heart,
  Settings,
  CreditCard,
  FlaskConical,
} from "lucide-react";
import { peptides } from "@/lib/data/peptides";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  hint?: string;
  kind: "page" | "peptide" | "action";
  icon: React.ComponentType<{ size?: number }>;
  href?: string;
  action?: () => void;
  keywords?: string;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const items: Item[] = useMemo(
    () => [
      { id: "home", label: "Home", kind: "page", icon: Home, href: "/", hint: "Dashboard" },
      { id: "explore", label: "Explore peptides", kind: "page", icon: Compass, href: "/explore" },
      { id: "track", label: "Tracking", kind: "page", icon: LineChart, href: "/track" },
      { id: "community", label: "Community", kind: "page", icon: Users, href: "/community" },
      { id: "profile", label: "Profile", kind: "page", icon: User, href: "/profile" },
      { id: "ai", label: "Ask AI Assistant", kind: "action", icon: Sparkles, href: "/ai", hint: "Peptide expert" },
      { id: "pricing", label: "Membership", kind: "page", icon: Heart, href: "/pricing" },
      { id: "settings", label: "Settings", kind: "page", icon: Settings, href: "/settings" },
      { id: "billing", label: "Billing", kind: "page", icon: CreditCard, href: "/pricing" },
      { id: "welcome", label: "Visit landing page", kind: "page", icon: FlaskConical, href: "/welcome" },
      ...peptides.map<Item>((p) => ({
        id: `pep-${p.slug}`,
        label: p.name,
        hint: p.tagline,
        kind: "peptide",
        icon: FlaskConical,
        href: `/peptide/${p.slug}`,
        keywords: `${p.targets.join(" ")} ${p.category} ${p.benefits.join(" ")}`,
      })),
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items.filter((it) => {
      const hay = `${it.label} ${it.hint ?? ""} ${it.keywords ?? ""}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [items, q]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  function runItem(it: Item | undefined) {
    if (!it) return;
    setOpen(false);
    if (it.href) router.push(it.href);
    it.action?.();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[active]);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-md" />
          <motion.div
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 mt-[10vh] w-full max-w-xl overflow-hidden rounded-2xl bg-surface shadow-[0_30px_60px_-20px_rgba(76,29,149,0.5)] border border-border"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 h-14">
              <Search size={16} className="text-ink-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search peptides, pages, actions…"
                className="flex-1 bg-transparent text-sm placeholder:text-ink-400 text-ink-900 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-ink-50 px-1.5 py-0.5 text-[10px] font-medium text-ink-500">
                ESC
              </kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="p-6 text-center text-sm text-ink-500">No matches</div>
              )}
              {filtered.map((it, i) => {
                const Icon = it.icon;
                return (
                  <button
                    key={it.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runItem(it)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-brand-50" : "hover:bg-ink-50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg",
                        i === active ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-600"
                      )}
                    >
                      <Icon size={14} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink-900 truncate">{it.label}</p>
                      {it.hint && <p className="text-xs text-ink-500 truncate">{it.hint}</p>}
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-ink-400">
                      {it.kind === "peptide" ? "Peptide" : it.kind === "action" ? "Action" : "Page"}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-ink-500">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-border bg-ink-50 px-1.5 py-0.5 text-[10px]">↑</kbd>
                  <kbd className="rounded border border-border bg-ink-50 px-1.5 py-0.5 text-[10px]">↓</kbd>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-border bg-ink-50 px-1.5 py-0.5 text-[10px]">↵</kbd>
                  select
                </span>
              </div>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-border bg-ink-50 px-1.5 py-0.5 text-[10px]">⌘</kbd>
                <kbd className="rounded border border-border bg-ink-50 px-1.5 py-0.5 text-[10px]">K</kbd>
                toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
