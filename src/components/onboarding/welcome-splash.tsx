"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BarChart3, Sparkles, Users } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { PeptideOrbit } from "@/components/visuals/peptide-orbit";
import { Grain } from "@/components/effects/grain";

const STORAGE_KEY = "peption:welcomed";

const slides = [
  {
    key: "hello",
    eyebrow: "Welcome to Peption",
    title: "Your peptide journey,\npowered by knowledge.",
    body: "Science-backed education, beautiful tracking, and a community that actually gets it — in one calm, powerful home.",
    icon: Sparkles,
  },
  {
    key: "ai",
    eyebrow: "Meet your AI expert",
    title: "Ask anything.\nGet answers in seconds.",
    body: "Compare peptides, decode side effects, or plan a titration — like texting a peptide-obsessed friend who actually reads the studies.",
    icon: Sparkles,
  },
  {
    key: "track",
    eyebrow: "Track what matters",
    title: "Every shot. Every win.\nEvery subtle trend.",
    body: "Weight, body comp, energy, labs, photos. See exactly what's working — week by week.",
    icon: BarChart3,
  },
  {
    key: "community",
    eyebrow: "You're not alone",
    title: "A community in it with you.",
    body: "Join 50,000+ members sharing protocols, results, and honest stories. Post anonymously if you prefer.",
    icon: Users,
  },
];

export function WelcomeSplash() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 150);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  function next() {
    if (idx < slides.length - 1) setIdx((n) => n + 1);
    else dismiss();
  }

  const slide = slides[idx];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100]"
          aria-modal
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-xl"
            onClick={dismiss}
          />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center p-4 md:p-8"
          >
            <div className="relative w-full overflow-hidden rounded-[28px] bg-surface shadow-[0_40px_80px_-30px_rgba(76,29,149,0.6)]">
              <div className="relative grid md:grid-cols-2">
                {/* Gradient panel */}
                <div className="relative p-7 md:p-10 text-white overflow-hidden min-h-[320px] md:min-h-[520px] [background:linear-gradient(155deg,#8b5cf6_0%,#7c3aed_45%,#ec4899_140%)]">
                  <Grain opacity={0.08} />
                  <div className="pointer-events-none absolute -top-20 -left-10 size-72 rounded-full bg-white/20 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-0 right-0 size-80 rounded-full bg-blush-500/30 blur-3xl" />

                  <div className="relative z-10 flex items-center justify-between">
                    <Logo size="md" />
                    <button
                      onClick={dismiss}
                      className="text-xs font-medium text-white/80 hover:text-white"
                    >
                      Skip
                    </button>
                  </div>

                  <div className="relative z-10 mt-8 md:mt-14">
                    <motion.div
                      key={slide.key}
                      initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-center"
                    >
                      <PeptideOrbit size={220} tone="brand" className="drop-shadow-2xl" />
                    </motion.div>
                  </div>
                </div>

                {/* Copy panel */}
                <div className="relative flex flex-col p-7 md:p-10">
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all ${
                          i === idx ? "w-8 bg-brand-600" : "w-4 bg-ink-200"
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.key}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="mt-6 md:mt-8 flex-1"
                    >
                      <p className="text-xs uppercase tracking-[0.14em] text-brand-700 font-semibold">
                        {slide.eyebrow}
                      </p>
                      <h2
                        className="mt-3 whitespace-pre-line text-2xl md:text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {slide.title}
                      </h2>
                      <p className="mt-4 text-sm md:text-base text-ink-600 leading-relaxed max-w-md">
                        {slide.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => setIdx((n) => Math.max(0, n - 1))}
                      disabled={idx === 0}
                      className="text-sm text-ink-500 hover:text-ink-900 disabled:opacity-30"
                    >
                      Back
                    </button>
                    <button
                      onClick={next}
                      className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-white [background:linear-gradient(135deg,#a78bfa,#8b5cf6,#ec4899)] shadow-[0_10px_28px_-10px_rgba(124,58,237,0.6)] hover:brightness-[1.05] active:scale-[0.98] transition-all"
                    >
                      {idx < slides.length - 1 ? "Next" : "Enter Peption"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
