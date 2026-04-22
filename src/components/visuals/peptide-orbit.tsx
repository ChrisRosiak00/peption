import { cn } from "@/lib/utils";

type PeptideOrbitProps = {
  className?: string;
  size?: number;
  tone?: "brand" | "blush" | "mint" | "amber" | "sky";
};

const gradients: Record<NonNullable<PeptideOrbitProps["tone"]>, string[]> = {
  brand: ["#a78bfa", "#8b5cf6", "#ec4899"],
  blush: ["#f9a8d4", "#ec4899", "#a78bfa"],
  mint: ["#6ee7b7", "#10b981", "#67e8f9"],
  amber: ["#fcd34d", "#f59e0b", "#f472b6"],
  sky: ["#7dd3fc", "#38bdf8", "#a78bfa"],
};

/**
 * Abstract peptide molecule visual — orbiting spheres with soft lighting.
 */
export function PeptideOrbit({ className, size = 220, tone = "brand" }: PeptideOrbitProps) {
  const [a, b, c] = gradients[tone];
  const id = `po-${tone}`;
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={cn("block", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-1`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </radialGradient>
        <radialGradient id={`${id}-2`} cx="30%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="45%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </radialGradient>
        <radialGradient id={`${id}-3`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="45%" stopColor={c} />
          <stop offset="100%" stopColor={a} />
        </radialGradient>
        <linearGradient id={`${id}-link`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* links */}
      <g stroke={`url(#${id}-link)`} strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <line x1="94" y1="96" x2="176" y2="138" />
        <line x1="176" y1="138" x2="236" y2="92" />
        <line x1="176" y1="138" x2="206" y2="218" />
        <line x1="206" y1="218" x2="116" y2="238" />
        <line x1="116" y1="238" x2="94" y2="96" />
      </g>

      {/* spheres */}
      <circle cx="94" cy="96" r="34" fill={`url(#${id}-1)`} />
      <circle cx="176" cy="138" r="46" fill={`url(#${id}-2)`} />
      <circle cx="236" cy="92" r="28" fill={`url(#${id}-3)`} />
      <circle cx="206" cy="218" r="38" fill={`url(#${id}-1)`} />
      <circle cx="116" cy="238" r="30" fill={`url(#${id}-2)`} />

      {/* accent highlights */}
      <circle cx="84" cy="84" r="6" fill="#fff" fillOpacity="0.7" />
      <circle cx="166" cy="124" r="8" fill="#fff" fillOpacity="0.65" />
      <circle cx="228" cy="80" r="5" fill="#fff" fillOpacity="0.7" />
    </svg>
  );
}
