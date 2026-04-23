"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number;
  ttl: number;
  shape: "square" | "circle" | "strip";
};

type Ctx = { fire: (opts?: { x?: number; y?: number; count?: number }) => void };

const ConfettiContext = createContext<Ctx | null>(null);

const PALETTE = ["#8b5cf6", "#a78bfa", "#ec4899", "#f9a8d4", "#10b981", "#6ee7b7", "#f59e0b", "#38bdf8"];

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gravity = 0.42;
      const drag = 0.992;
      const next: Particle[] = [];
      for (const p of particlesRef.current) {
        p.vx *= drag;
        p.vy = p.vy * drag + gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life += 1;
        if (p.life > p.ttl || p.y > window.innerHeight + 30) continue;

        const alpha = Math.max(0, 1 - p.life / p.ttl);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        if (p.shape === "square") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === "strip") {
          ctx.fillRect(-p.size / 2, -p.size * 0.15, p.size, p.size * 0.3);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        next.push(p);
      }
      particlesRef.current = next;
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const fire = useCallback(
    (opts?: { x?: number; y?: number; count?: number }) => {
      const x = opts?.x ?? window.innerWidth / 2;
      const y = opts?.y ?? window.innerHeight / 3;
      const count = opts?.count ?? 140;
      const newParts: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const speed = 6 + Math.random() * 8;
        const color = PALETTE[(Math.random() * PALETTE.length) | 0];
        const shape = (["square", "circle", "strip"] as const)[(Math.random() * 3) | 0];
        newParts.push({
          x,
          y,
          vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
          vy: Math.sin(angle) * speed * (0.6 + Math.random() * 0.8) - 4,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.35,
          size: 6 + Math.random() * 8,
          color,
          life: 0,
          ttl: 90 + Math.random() * 90,
          shape,
        });
      }
      particlesRef.current.push(...newParts);
    },
    []
  );

  return (
    <ConfettiContext.Provider value={{ fire }}>
      {children}
      {mounted && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[95]"
          aria-hidden
        />
      )}
    </ConfettiContext.Provider>
  );
}

export function useConfetti() {
  const ctx = useContext(ConfettiContext);
  if (!ctx) return { fire: () => {} };
  return ctx;
}
