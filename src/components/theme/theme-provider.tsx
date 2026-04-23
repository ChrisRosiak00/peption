"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Mode = Theme | "system";

type Ctx = {
  theme: Theme;
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "peption:theme";

function resolveSystem(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.dataset.theme = t;
  root.style.colorScheme = t;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("system");
  const [theme, setTheme] = useState<Theme>("light");

  // Hydrate from storage
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? "system";
    setModeState(stored);
    const resolved = stored === "system" ? resolveSystem() : stored;
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  // Track system changes while in system mode
  useEffect(() => {
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const t: Theme = mql.matches ? "dark" : "light";
      setTheme(t);
      applyTheme(t);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [mode]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    if (m === "system") {
      localStorage.removeItem(STORAGE_KEY);
      const t = resolveSystem();
      setTheme(t);
      applyTheme(t);
    } else {
      localStorage.setItem(STORAGE_KEY, m);
      setTheme(m);
      applyTheme(m);
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(theme === "dark" ? "light" : "dark");
  }, [theme, setMode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
