"use client";

import { useEffect, useRef, useState } from "react";
import { PeptideOrbit } from "./peptide-orbit";

type Props = {
  size?: number;
  tone?: "brand" | "blush" | "mint" | "amber" | "sky";
  className?: string;
};

/**
 * Mouse/touch drag to rotate, auto-drifts when idle. Uses CSS 3D transforms.
 */
export function InteractiveMolecule({ size = 320, tone = "brand", className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(-12);
  const [rotY, setRotY] = useState(18);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const [idle, setIdle] = useState(true);

  // Auto-drift while idle
  useEffect(() => {
    if (!idle) return;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const elapsed = (t - t0) / 1000;
      setRotY(18 + Math.sin(elapsed * 0.6) * 10);
      setRotX(-12 + Math.cos(elapsed * 0.4) * 5);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [idle]);

  function onPointerDown(e: React.PointerEvent) {
    const el = wrapRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: rotX,
      baseY: rotY,
    };
    setIdle(false);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setRotY(dragRef.current.baseY + dx * 0.4);
    setRotX(Math.max(-55, Math.min(55, dragRef.current.baseX - dy * 0.4)));
  }
  function onPointerUp(e: React.PointerEvent) {
    const el = wrapRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    dragRef.current.dragging = false;
    // resume idle drift after a breath
    setTimeout(() => setIdle(true), 1400);
  }

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`relative cursor-grab active:cursor-grabbing select-none touch-none ${className ?? ""}`}
      style={{ width: size, height: size, perspective: "1000px" }}
      aria-label="Draggable molecule"
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
          transition: idle ? "transform 0.1s linear" : "none",
        }}
      >
        <PeptideOrbit size={size} tone={tone} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-6 w-[60%] rounded-[50%] bg-black/20 blur-lg dark:bg-black/40" />
    </div>
  );
}
