"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CursorGlowProps = {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
};

/**
 * Soft radial glow that follows the cursor. Desktop only — respects
 * prefers-reduced-motion. Absolute-positioned inside a container.
 */
export function CursorGlow({
  className,
  color = "139, 92, 246",
  size = 360,
  opacity = 0.35,
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    if (reduceMotion || !hoverCapable) return;

    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let targetX = -9999;
    let targetY = -9999;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    const onLeave = () => {
      targetX = -9999;
      targetY = -9999;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate3d(${currentX - size / 2}px, ${currentY - size / 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 left-0 rounded-full blur-3xl transition-opacity duration-300",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, rgba(${color}, ${opacity}), transparent 60%)`,
        willChange: "transform",
      }}
    />
  );
}
