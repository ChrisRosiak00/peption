"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories, peptides, type Peptide } from "@/lib/data/peptides";
import { PeptideOrbit } from "@/components/visuals/peptide-orbit";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Peptide["category"] | "All">("All");

  const filtered = useMemo(() => {
    return peptides.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.targets.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, cat]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-10 space-y-8">
      <header className="space-y-3 animate-fade-up">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
          Peptide Library
        </p>
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Explore the science, one peptide at a time.
        </h1>
        <p className="text-sm md:text-base text-ink-500 max-w-2xl">
          Every entry includes mechanism, benefits, common doses, and research citations so you can make informed decisions.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-3 animate-fade-up">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, target, or benefit…"
            className="pl-10"
          />
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface px-4 text-sm text-ink-700 hover:border-ink-300">
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hidden -mx-2 px-2 animate-fade-up">
        <CategoryChip label="All" active={cat === "All"} onClick={() => setCat("All")} />
        {categories.map((c) => (
          <CategoryChip
            key={c.value}
            label={c.label}
            active={cat === c.value}
            onClick={() => setCat(c.value)}
          />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/peptide/${p.slug}`}
            className="group surface-card p-5 transition-all hover:border-brand-200 hover:shadow-[0_20px_40px_-24px_rgba(124,58,237,0.35)]"
          >
            <div className="flex items-center justify-between">
              <span className="chip">{p.category}</span>
              <TierPill tier={p.tier} />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <PeptideOrbit size={80} tone={p.color} />
              <div className="min-w-0">
                <p
                  className="text-lg font-semibold tracking-tight text-ink-900 truncate"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.name}
                </p>
                <p className="text-xs text-ink-500 line-clamp-2 mt-0.5">{p.tagline}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.targets.map((t) => (
                <span key={t} className="chip chip-ink text-[10px]">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-ink-400">Common dose</p>
                <p className="mt-0.5 font-medium text-ink-800">{p.commonDose}</p>
              </div>
              <div>
                <p className="text-ink-400">Studies</p>
                <p className="mt-0.5 font-medium text-ink-800">{p.studyCount}</p>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-ink-500 text-sm">
            No peptides match your search. Try a different term.
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 h-9 text-sm font-medium border transition-colors",
        active
          ? "bg-brand-600 text-white border-brand-600 shadow-[0_6px_16px_-8px_rgba(124,58,237,0.6)]"
          : "bg-surface text-ink-700 border-ink-200 hover:border-ink-300"
      )}
    >
      {label}
    </button>
  );
}

function TierPill({ tier }: { tier: Peptide["tier"] }) {
  if (tier === "Free") return <span className="chip chip-mint">Free</span>;
  if (tier === "Pro") return <span className="chip">Pro</span>;
  return <span className="chip chip-blush">Expert</span>;
}
