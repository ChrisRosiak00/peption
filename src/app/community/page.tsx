import { Heart, MessageCircle, Plus, Bookmark, BarChart3, ImagePlus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CommunityTabs } from "./tabs";
import { groups, posts, qaItems, stories } from "@/lib/data/community";

export const metadata = { title: "Community · Peption" };

export default function CommunityPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 md:px-6 py-6 md:py-10 space-y-6">
      <header className="animate-fade-up flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">Community</p>
          <h1
            className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight text-ink-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            You&apos;re not alone on this.
          </h1>
          <p className="mt-2 text-sm text-ink-500 max-w-xl">
            Real stories, real progress, real support — from people running similar protocols.
          </p>
        </div>
      </header>

      <CommunityTabs>
        {{
          feed: (
            <div className="space-y-5 animate-fade-up">
              <Composer />
              {posts.map((p) => (
                <Card key={p.id} className="!p-0 overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <Avatar name={p.author.name} tone={p.author.tone} size={40} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-ink-900">{p.author.name}</p>
                          {p.author.badge && <span className="chip text-[10px]">{p.author.badge}</span>}
                        </div>
                        <p className="text-xs text-ink-400">{p.time}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-ink-800 leading-relaxed">{p.body}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`chip ${
                            t.tone === "mint"
                              ? "chip-mint"
                              : t.tone === "blush"
                                ? "chip-blush"
                                : t.tone === "brand"
                                  ? ""
                                  : "chip-ink"
                          }`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {p.highlight && (
                    <div className="relative grid grid-cols-2 gap-px bg-border">
                      <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-100 via-blush-100 to-mint-100 flex items-end p-3">
                        <span className="chip bg-white/90 text-ink-800 border-white/80">Before</span>
                      </div>
                      <div className="relative aspect-[4/5] bg-gradient-to-br from-mint-100 via-brand-100 to-amber-100 flex items-end p-3">
                        <span className="chip chip-blush">{p.highlight}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 px-5 py-3 border-t border-border text-ink-500">
                    <button className="flex items-center gap-1.5 text-xs hover:text-blush-500">
                      <Heart size={16} /> {p.stats.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-brand-600">
                      <MessageCircle size={16} /> {p.stats.comments}
                    </button>
                    <button className="ml-auto hover:text-ink-900">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ),
          groups: (
            <div className="grid gap-4 sm:grid-cols-2 animate-fade-up">
              {groups.map((g) => (
                <Card key={g.id} className="hover:border-brand-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl text-white ${
                        g.color === "brand"
                          ? "bg-brand-600"
                          : g.color === "mint"
                            ? "bg-mint-500"
                            : g.color === "blush"
                              ? "bg-blush-500"
                              : g.color === "amber"
                                ? "bg-amber-500"
                                : "bg-sky-500"
                      }`}
                    >
                      <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                        {g.name[0]}
                      </span>
                    </div>
                    <span className="chip chip-ink">{formatCompact(g.members)} members</span>
                  </div>
                  <p className="mt-4 text-base font-semibold text-ink-900">{g.name}</p>
                  <p className="mt-1 text-xs text-ink-500">{g.description}</p>
                  <button className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 px-3.5 py-1.5 text-xs font-medium hover:bg-brand-100">
                    <Plus size={14} /> Join
                  </button>
                </Card>
              ))}
            </div>
          ),
          qa: (
            <div className="space-y-3 animate-fade-up">
              {qaItems.map((q) => (
                <Card key={q.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{q.question}</p>
                    <p className="mt-1 text-xs text-ink-500">{q.answers} answers · {q.tag}</p>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 px-3.5 py-1.5 text-xs font-medium hover:bg-brand-100">
                    Answer
                  </button>
                </Card>
              ))}
            </div>
          ),
          stories: (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-up">
              {stories.map((s) => (
                <div
                  key={s.id}
                  className={`relative aspect-[3/4] rounded-3xl overflow-hidden p-4 flex flex-col justify-end text-white ${
                    s.tone === "brand"
                      ? "[background:linear-gradient(135deg,#a78bfa_0%,#8b5cf6_60%,#ec4899_140%)]"
                      : s.tone === "mint"
                        ? "[background:linear-gradient(135deg,#6ee7b7_0%,#10b981_55%,#38bdf8_140%)]"
                        : s.tone === "blush"
                          ? "[background:linear-gradient(135deg,#f9a8d4_0%,#ec4899_55%,#a78bfa_140%)]"
                          : s.tone === "amber"
                            ? "[background:linear-gradient(135deg,#fcd34d_0%,#f59e0b_55%,#f472b6_140%)]"
                            : "[background:linear-gradient(135deg,#7dd3fc_0%,#38bdf8_55%,#a78bfa_140%)]"
                  }`}
                >
                  <span className="inline-flex self-start rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">
                    {s.progress}
                  </span>
                  <p className="mt-3 text-base font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {s.title}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">by {s.author}</p>
                  <div className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-white/20 blur-2xl" />
                </div>
              ))}
            </div>
          ),
        }}
      </CommunityTabs>
    </div>
  );
}

function Composer() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Avatar name="Alex Johnson" tone="brand" />
        <button className="flex-1 text-left h-11 rounded-xl bg-ink-50 px-4 text-sm text-ink-500 hover:bg-ink-100">
          What&apos;s on your mind?
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <ComposerChip icon={ImagePlus} label="Photo" />
        <ComposerChip icon={BarChart3} label="Poll" />
        <ComposerChip icon={Heart} label="Milestone" />
      </div>
    </Card>
  );
}

function ComposerChip({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number }>; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 text-ink-700 px-3 py-1.5 text-xs hover:bg-ink-200/60">
      <Icon size={14} />
      {label}
    </button>
  );
}

function formatCompact(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return `${n}`;
}
