"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "info" | "brand";
type Toast = {
  id: string;
  title: string;
  description?: string;
  kind?: ToastKind;
  duration?: number;
};

type Ctx = {
  toast: (t: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const remove = useCallback((id: string) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback<Ctx["toast"]>(
    ({ duration = 3600, ...rest }) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((list) => [...list, { id, duration, ...rest }]);
      const timer = window.setTimeout(() => remove(id), duration);
      timers.current.set(id, timer);
    },
    [remove]
  );

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed z-[90] inset-0 flex flex-col items-end justify-end gap-2 p-4 sm:p-6"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 460, damping: 34 }}
              className={cn(
                "pointer-events-auto w-full max-w-sm rounded-2xl border bg-surface/95 backdrop-blur-xl px-4 py-3.5 shadow-[0_24px_40px_-16px_rgba(76,29,149,0.35)] flex items-start gap-3",
                t.kind === "brand"
                  ? "border-brand-100"
                  : t.kind === "success"
                    ? "border-mint-300/60"
                    : "border-border"
              )}
            >
              <ToastIcon kind={t.kind ?? "info"} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-900">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-xs text-ink-600">{t.description}</p>
                )}
              </div>
              <button
                aria-label="Dismiss"
                onClick={() => remove(t.id)}
                className="shrink-0 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastIcon({ kind }: { kind: ToastKind }) {
  if (kind === "success") {
    return (
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-mint-500 text-white">
        <CheckCircle2 size={16} />
      </span>
    );
  }
  if (kind === "brand") {
    return (
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl [background:linear-gradient(135deg,#a78bfa,#ec4899)] text-white">
        <Sparkles size={16} />
      </span>
    );
  }
  return (
    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white">
      <Info size={16} />
    </span>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
