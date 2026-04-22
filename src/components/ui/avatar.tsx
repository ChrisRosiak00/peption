import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  tone?: "brand" | "blush" | "mint" | "sky" | "amber";
};

const tones: Record<NonNullable<AvatarProps["tone"]>, string> = {
  brand: "from-brand-400 to-brand-600",
  blush: "from-blush-300 to-blush-500",
  mint: "from-mint-300 to-mint-600",
  sky: "from-sky-300 to-sky-500",
  amber: "from-amber-300 to-amber-500",
};

export function Avatar({ name, src, size = 36, tone = "brand", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white",
        `bg-gradient-to-br ${tones[tone]}`,
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}
