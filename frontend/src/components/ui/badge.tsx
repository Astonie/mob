import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors", {
  variants: {
    variant: {
      default: "bg-slate-900 text-white",
      primary: "bg-[#0F4A6B] text-white",
      secondary: "bg-slate-100 text-slate-900",
      accent: "bg-[#e6f0f6] text-[#0F4A6B] border border-[#0F4A6B]/20",
      success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      warning: "bg-amber-100 text-amber-900 border border-amber-200",
      destructive: "bg-red-100 text-red-800 border border-red-200",
      outline: "border border-slate-200 text-slate-700",
    },
  },
  defaultVariants: { variant: "secondary" },
});

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
