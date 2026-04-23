"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, X } from "lucide-react";

const sections: { title: string; shortcuts: { keys: string[]; label: string }[] }[] = [
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["⌘", "K"], label: "Open command palette" },
      { keys: ["G", "H"], label: "Go to Home" },
      { keys: ["G", "E"], label: "Go to Explore" },
      { keys: ["G", "T"], label: "Go to Tracking" },
      { keys: ["G", "C"], label: "Go to Community" },
      { keys: ["G", "P"], label: "Go to Profile" },
    ],
  },
  {
    title: "Quick actions",
    shortcuts: [
      { keys: ["N"], label: "New check-in" },
      { keys: ["A"], label: "Ask AI" },
      { keys: ["S"], label: "Log a shot" },
      { keys: ["?"], label: "Toggle this overlay" },
      { keys: ["ESC"], label: "Close modals" },
    ],
  },
];

export function ShortcutsOverlay() {
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);
  const [bufferTimer, setBufferTimer] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const active = document.activeElement;
      const isTyping =
        active?.tagName === "INPUT" ||
        active?.tagName === "TEXTAREA" ||
        (active as HTMLElement | null)?.isContentEditable;
      if (isTyping) return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Chord detection: g h, g e, etc.
      const k = e.key.toLowerCase();
      if (k === "g") {
        e.preventDefault();
        setBuffer(["g"]);
        if (bufferTimer) clearTimeout(bufferTimer);
        const t = window.setTimeout(() => setBuffer([]), 900);
        setBufferTimer(t);
        return;
      }

      if (buffer[0] === "g") {
        const map: Record<string, string> = {
          h: "/",
          e: "/explore",
          t: "/track",
          c: "/community",
          p: "/profile",
          l: "/welcome",
        };
        if (map[k]) {
          e.preventDefault();
          window.location.href = map[k];
        }
        setBuffer([]);
        if (bufferTimer) clearTimeout(bufferTimer);
        return;
      }

      if (k === "a" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        window.location.href = "/ai";
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buffer, bufferTimer]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-md" />
          <motion.div
            initial={{ y: 14, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-xl rounded-3xl bg-surface border border-border shadow-[0_30px_60px_-20px_rgba(76,29,149,0.5)] overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-xl [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] text-white">
                  <Keyboard size={16} />
                </span>
                <p className="text-sm font-semibold text-ink-900">Keyboard shortcuts</p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900"
              >
                <X size={14} />
              </button>
            </div>
            <div className="p-5 grid gap-5 sm:grid-cols-2">
              {sections.map((s) => (
                <div key={s.title}>
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-400 font-semibold">
                    {s.title}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {s.shortcuts.map((sc) => (
                      <li key={sc.label} className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-ink-700">{sc.label}</span>
                        <span className="flex items-center gap-1">
                          {sc.keys.map((k) => (
                            <kbd
                              key={k}
                              className="inline-flex min-w-[22px] justify-center rounded-md border border-border bg-ink-50 px-1.5 py-0.5 text-[10px] font-semibold text-ink-700"
                            >
                              {k}
                            </kbd>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[11px] text-ink-500">
              <span>Press ? anywhere to toggle</span>
              <span>Type &ldquo;g&rdquo; then a letter to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
