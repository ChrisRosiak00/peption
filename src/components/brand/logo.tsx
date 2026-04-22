import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showMark?: boolean;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

export function Logo({
  className,
  showMark = true,
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const markSize = size === "sm" ? 22 : size === "lg" ? 34 : 28;
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {showMark && (
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="peption-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="0.55" stopColor="#8b5cf6" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            d="M9 6.5c2.2-2 5-3 8-3 5 0 9 4 9 9 0 3-1.4 5.6-3.7 7.3l-6.2 4.6c-2.2 1.6-5.4 0-5.4-2.7v-5.3M23 25.5c-2.2 2-5 3-8 3-5 0-9-4-9-9 0-3 1.4-5.6 3.7-7.3l6.2-4.6c2.2-1.6 5.4 0 5.4 2.7v5.3"
            stroke="url(#peption-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {showWordmark && (
        <span className={cn("font-semibold tracking-tight", textSize)} style={{ fontFamily: "var(--font-display)" }}>
          peption
        </span>
      )}
    </span>
  );
}
