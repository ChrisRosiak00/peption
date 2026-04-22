import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-xl bg-surface border border-ink-200 px-4 text-sm text-ink-900 placeholder:text-ink-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl bg-surface border border-ink-200 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 resize-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
