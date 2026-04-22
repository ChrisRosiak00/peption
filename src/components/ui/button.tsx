import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white hover:bg-brand-700 shadow-[0_6px_20px_-8px_rgba(124,58,237,0.6)]",
        gradient:
          "text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)] [background:linear-gradient(135deg,#a78bfa_0%,#8b5cf6_45%,#ec4899_120%)] hover:brightness-[1.05]",
        secondary:
          "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100",
        outline:
          "bg-surface text-ink-900 border border-ink-200 hover:border-ink-300 hover:bg-ink-50",
        ghost: "text-ink-700 hover:bg-ink-100",
        subtle: "bg-ink-100 text-ink-800 hover:bg-ink-200/60",
        danger: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
