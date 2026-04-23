import { cn } from "@/lib/utils";

type GrainProps = {
  className?: string;
  opacity?: number;
};

/**
 * Tiny SVG grain noise overlay. Adds texture depth. Pointer-events-none.
 */
export function Grain({ className, opacity = 0.035 }: GrainProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 w-full h-full mix-blend-overlay", className)}
      style={{ opacity }}
      aria-hidden
    >
      <filter id="grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}
