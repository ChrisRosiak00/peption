"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getGreeting(hour: number) {
  if (hour < 5) return { text: "Still up", emoji: "🌙" };
  if (hour < 12) return { text: "Good morning", emoji: "👋" };
  if (hour < 17) return { text: "Good afternoon", emoji: "☀️" };
  if (hour < 21) return { text: "Good evening", emoji: "🌆" };
  return { text: "Good night", emoji: "🌙" };
}

const container = {
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};
const word = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function HeroGreeting({ name }: { name: string }) {
  const [greeting, setGreeting] = useState({ text: "Welcome", emoji: "👋" });
  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <section>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm text-ink-500"
      >
        {greeting.text}, {name} <span aria-hidden>{greeting.emoji}</span>
      </motion.p>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-2 text-2xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <motion.span variants={word} className="inline-block">
          Your&nbsp;
        </motion.span>
        <motion.span variants={word} className="inline-block">
          peptide&nbsp;
        </motion.span>
        <motion.span variants={word} className="inline-block">
          journey,
        </motion.span>
        <br />
        <motion.span variants={word} className="inline-block">
          powered&nbsp;
        </motion.span>
        <motion.span variants={word} className="inline-block">
          by&nbsp;
        </motion.span>
        <motion.span variants={word} className="inline-block text-gradient">
          knowledge.
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-3 text-sm md:text-base text-ink-500 max-w-xl"
      >
        Science. Support. Community. All in one place.
      </motion.p>
    </section>
  );
}
