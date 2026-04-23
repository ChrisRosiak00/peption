import { cn } from "@/lib/utils";

type PeptideOrbitProps = {
  className?: string;
  size?: number;
  tone?: "brand" | "blush" | "mint" | "amber" | "sky";
};

const gradients: Record<NonNullable<PeptideOrbitProps["tone"]>, string[]> = {
  brand: ["#c4b5fd", "#a78bfa", "#8b5cf6", "#ec4899"],
  blush: ["#fbcfe8", "#f9a8d4", "#ec4899", "#a78bfa"],
  mint: ["#bbf7d0", "#6ee7b7", "#10b981", "#67e8f9"],
  amber: ["#fde68a", "#fcd34d", "#f59e0b", "#f472b6"],
  sky: ["#bae6fd", "#7dd3fc", "#38bdf8", "#a78bfa"],
};

/**
 * Peptide molecule visual — soft 3D sphere cluster with links.
 * Pure SVG with radial gradients for a glassy, glowing look.
 */
export function PeptideOrbit({ className, size = 220, tone = "brand" }: PeptideOrbitProps) {
  const [a, b, c, d] = gradients[tone];
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
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={b} stopOpacity="0.35" />
          <stop offset="70%" stopColor={b} stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`${id}-s1`} cx="32%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="14%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="55%" stopColor={a} />
          <stop offset="100%" stopColor={c} />
        </radialGradient>
        <radialGradient id={`${id}-s2`} cx="28%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="50%" stopColor={b} />
          <stop offset="100%" stopColor={d} />
        </radialGradient>
        <radialGradient id={`${id}-s3`} cx="30%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="50%" stopColor={c} />
          <stop offset="100%" stopColor={a} />
        </radialGradient>
        <radialGradient id={`${id}-s4`} cx="30%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="50%" stopColor={d} />
          <stop offset="100%" stopColor={b} />
        </radialGradient>

        <linearGradient id={`${id}-link`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.75" />
          <stop offset="100%" stopColor={d} stopOpacity="0.65" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="160" cy="160" r="150" fill={`url(#${id}-glow)`} />

      {/* links (behind spheres) */}
      <g
        stroke={`url(#${id}-link)`}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.8"
      >
        <line x1="94" y1="96" x2="176" y2="138" />
        <line x1="176" y1="138" x2="236" y2="92" />
        <line x1="176" y1="138" x2="206" y2="218" />
        <line x1="206" y1="218" x2="116" y2="238" />
        <line x1="116" y1="238" x2="94" y2="96" />
        <line x1="176" y1="138" x2="116" y2="238" opacity="0.5" />
      </g>

      {/* soft shadows beneath spheres */}
      <g fill="#16151f" opacity="0.18" filter={`url(#${id}-shadow)`}>
        <ellipse cx="94" cy="106" rx="28" ry="8" />
        <ellipse cx="176" cy="150" rx="40" ry="9" />
        <ellipse cx="236" cy="102" rx="22" ry="6" />
        <ellipse cx="206" cy="230" rx="32" ry="8" />
        <ellipse cx="116" cy="250" rx="24" ry="7" />
      </g>

      {/* spheres */}
      <circle cx="94" cy="96" r="34" fill={`url(#${id}-s1)`} />
      <circle cx="176" cy="138" r="46" fill={`url(#${id}-s2)`} />
      <circle cx="236" cy="92" r="28" fill={`url(#${id}-s3)`} />
      <circle cx="206" cy="218" r="38" fill={`url(#${id}-s4)`} />
      <circle cx="116" cy="238" r="30" fill={`url(#${id}-s1)`} />

      {/* specular highlights */}
      <circle cx="84" cy="84" r="7" fill="#fff" fillOpacity="0.75" />
      <circle cx="166" cy="124" r="9" fill="#fff" fillOpacity="0.7" />
      <circle cx="228" cy="80" r="5" fill="#fff" fillOpacity="0.75" />
      <circle cx="198" cy="208" r="7" fill="#fff" fillOpacity="0.7" />
      <circle cx="108" cy="228" r="6" fill="#fff" fillOpacity="0.7" />

      {/* inner tiny sparkle dots on links */}
      <g fill="#fff" fillOpacity="0.6">
        <circle cx="135" cy="117" r="1.6" />
        <circle cx="206" cy="115" r="1.4" />
        <circle cx="191" cy="178" r="1.4" />
        <circle cx="161" cy="228" r="1.4" />
      </g>
    </svg>
  );
}
