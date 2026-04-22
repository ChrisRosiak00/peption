"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "overview" | "benefits" | "mechanism" | "research";

export function PeptideTabs({ children }: { children: Record<Tab, React.ReactNode> }) {
  const [tab, setTab] = useState<Tab>("overview");
  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    { id: "mechanism", label: "Mechanism" },
    { id: "research", label: "Research" },
  ];

  return (
    <div>
      <div className="border-b border-border px-4 md:px-8 overflow-x-auto scrollbar-hidden">
        <div className="flex gap-1 min-w-max">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative px-3 md:px-4 py-3 text-sm font-medium transition-colors",
                tab === t.id ? "text-brand-700" : "text-ink-500 hover:text-ink-900"
              )}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-3 md:inset-x-4 -bottom-px h-0.5 rounded-full bg-brand-600" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="animate-fade-up">{children[tab]}</div>
    </div>
  );
}
