"use client";

import { useEffect, useRef, useState } from "react";
import { History, SendHorizontal, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type Message =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; content: React.ReactNode; time: string };

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "How does Retatrutide compare to other peptides for weight loss?",
  },
  {
    id: "m2",
    role: "assistant",
    time: "9:41 AM",
    content: (
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Great question!</span> <span aria-hidden>👋</span> Retatrutide is
          unique because it targets <strong>three</strong> receptors (GLP-1, GIP, and Glucagon) compared to
          other peptides that typically target one.
        </p>
        <ComparisonTable />
        <p className="text-xs text-ink-500">
          Keep in mind, individual results vary and protocols should be personalized.
        </p>
      </div>
    ),
  },
];

const suggestions = [
  "What's the best dose to start?",
  "Side effects to watch for?",
  "How long until I see results?",
  "Compare semaglutide vs. tirzepatide",
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const id = Date.now().toString();
    setMessages((m) => [...m, { id, role: "user", content: text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: `${id}-r`,
          role: "assistant",
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          content: sampleReply(text),
        },
      ]);
    }, 900);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-6 py-6 md:py-10">
      <div className="rounded-3xl border border-border bg-surface overflow-hidden shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl [background:linear-gradient(135deg,#a78bfa,#ec4899)] text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">AI Assistant</p>
              <p className="text-xs text-ink-500">Your peptide expert, 24/7</p>
            </div>
          </div>
          <button
            aria-label="Chat history"
            className="inline-flex size-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900"
          >
            <History size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[58vh] md:h-[62vh] overflow-y-auto px-4 md:px-6 py-4 md:py-6 space-y-4 bg-gradient-to-b from-brand-50/40 to-transparent">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {typing && <TypingBubble />}
          <div ref={endRef} />
        </div>

        {/* Suggestions + input */}
        <div className="px-4 md:px-6 pt-3 pb-4 md:pb-5 border-t border-border space-y-3 bg-surface">
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden -mx-1 px-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 rounded-full bg-brand-50 text-brand-700 border border-brand-100 px-3.5 py-1.5 text-xs font-medium hover:bg-brand-100"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="relative"
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask anything about peptides…"
              className="pr-12 h-12"
            />
            <button
              type="submit"
              aria-label="Send"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex size-9 items-center justify-center rounded-lg text-white [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] disabled:opacity-50"
              disabled={!draft.trim()}
            >
              <SendHorizontal size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-brand-600 text-white px-4 py-3 text-sm">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[88%] space-y-2">
        <div className="rounded-2xl rounded-tl-md bg-surface border border-border shadow-card px-4 py-3 text-sm text-ink-800">
          {message.content}
        </div>
        <div className="flex items-center gap-1 text-xs text-ink-400">
          <span>{message.time}</span>
          <button
            aria-label="Helpful"
            className="ml-2 inline-flex size-7 items-center justify-center rounded-full hover:bg-ink-100 text-ink-500"
          >
            <ThumbsUp size={12} />
          </button>
          <button
            aria-label="Not helpful"
            className="inline-flex size-7 items-center justify-center rounded-full hover:bg-ink-100 text-ink-500"
          >
            <ThumbsDown size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-md bg-surface border border-border px-4 py-3 text-sm flex gap-1.5 items-center">
        <Dot delay="0s" />
        <Dot delay="0.15s" />
        <Dot delay="0.3s" />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block size-1.5 rounded-full bg-brand-500/70 animate-pulse"
      style={{ animationDelay: delay, animationDuration: "1s" }}
    />
  );
}

function ComparisonTable() {
  const rows = [
    { p: "Retatrutide", t: "GLP-1, GIP, Glucagon", w: "High", o: "Metabolic, glycemic control, appetite" },
    { p: "Semaglutide", t: "GLP-1", w: "High", o: "Glycemic control, appetite" },
    { p: "Tirzepatide", t: "GLP-1, GIP", w: "High", o: "Glycemic control, weight loss" },
    { p: "Cagrilintide", t: "Amylin", w: "Moderate", o: "Appetite, gastric emptying" },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="bg-ink-50 text-ink-500">
            <th className="px-3 py-2 font-medium">Peptide</th>
            <th className="px-3 py-2 font-medium">Targets</th>
            <th className="px-3 py-2 font-medium">Weight Loss</th>
            <th className="px-3 py-2 font-medium hidden sm:table-cell">Other Benefits</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.p}>
              <td className="px-3 py-2 font-semibold text-ink-900">{r.p}</td>
              <td className="px-3 py-2 text-ink-700">{r.t}</td>
              <td className="px-3 py-2 text-ink-700">{r.w}</td>
              <td className="px-3 py-2 text-ink-700 hidden sm:table-cell">{r.o}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function sampleReply(prompt: string): React.ReactNode {
  const p = prompt.toLowerCase();
  if (p.includes("nausea")) {
    return (
      <div className="space-y-2">
        <p>Week-1 nausea is common on GLP-1s. A few practical tips:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Take your shot at night so you sleep through the peak</li>
          <li>Eat smaller, protein-forward meals</li>
          <li>Hydrate — electrolytes help</li>
          <li>Skip greasy/spicy foods for the first 48 hours</li>
        </ul>
        <p className="text-xs text-ink-500">Talk to your prescriber if it lasts past the first dose or two.</p>
      </div>
    );
  }
  if (p.includes("dose") || p.includes("start")) {
    return (
      <p>
        Most retatrutide users begin at <strong>2 mg / week</strong>, titrating up every 4 weeks
        based on tolerance. The sweet spot for most is 6–12 mg/week by month 3–4.
      </p>
    );
  }
  if (p.includes("result")) {
    return (
      <p>
        Most people see noticeable appetite reduction in the first 2–3 weeks, with visible body
        composition changes around weeks 6–8. The best outcomes come at month 4+.
      </p>
    );
  }
  return (
    <p>
      Here&apos;s what the research suggests — based on controlled trials, most metabolic peptides
      target GLP-1 receptors to reduce appetite and improve glycemic control. Would you like me to
      compare specific options or design a starter protocol?
    </p>
  );
}
