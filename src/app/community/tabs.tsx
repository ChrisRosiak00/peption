"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "feed" | "groups" | "qa" | "stories";

const items: { id: Tab; label: string }[] = [
  { id: "feed", label: "Feed" },
  { id: "groups", label: "Groups" },
  { id: "qa", label: "Q&A" },
  { id: "stories", label: "Stories" },
];

export function CommunityTabs({ children }: { children: Record<Tab, React.ReactNode> }) {
  const [tab, setTab] = useState<Tab>("feed");
  return (
    <section>
      <div className="border-b border-border mb-6 overflow-x-auto scrollbar-hidden">
        <div className="flex gap-1 min-w-max">
          {items.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors",
                tab === t.id ? "text-brand-700" : "text-ink-500 hover:text-ink-900"
              )}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-brand-600" />
              )}
            </button>
          ))}
        </div>
      </div>
      {children[tab]}
    </section>
  );
}
