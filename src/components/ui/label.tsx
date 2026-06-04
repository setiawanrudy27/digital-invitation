import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-[#2D2D44]",
        muted: "text-[#6B6B80]",
        brand: "text-[#49108B]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

export function Label({ className, variant, ...props }: LabelProps) {
  return <label className={cn(labelVariants({ variant, className }))} {...props} />;
}
