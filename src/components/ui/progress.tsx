import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  max?: number;
  className?: string;
  tone?: "brand" | "mint" | "blush" | "amber";
  size?: "sm" | "md";
};

const toneClass: Record<NonNullable<ProgressProps["tone"]>, string> = {
  brand: "bg-brand-500",
  mint: "bg-mint-500",
  blush: "bg-blush-500",
  amber: "bg-amber-500",
};

export function Progress({ value, max = 100, tone = "brand", size = "md", className }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={cn(
        "w-full rounded-full bg-ink-100 overflow-hidden",
        size === "sm" ? "h-1.5" : "h-2",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all", toneClass[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
