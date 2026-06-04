"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#49108B] text-white shadow-sm hover:bg-[#5D209C] hover:shadow-md active:scale-[0.98]",
        primary:
          "bg-[#49108B] text-white shadow-sm hover:bg-[#5D209C] hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-white text-[#49108B] border border-[rgba(73,16,139,0.15)] shadow-sm hover:bg-[#F5F0FA]",
        outline:
          "border border-[rgba(73,16,139,0.15)] bg-transparent text-[#49108B] hover:bg-[#F5F0FA]",
        ghost:
          "text-[#49108B] hover:bg-[#F5F0FA]",
        destructive:
          "bg-[#E54545] text-white shadow-sm hover:bg-[#D43B3B]",
        "destructive-ghost":
          "text-[#E54545] hover:bg-[#E54545]/10",
        link:
          "text-[#49108B] underline-offset-4 hover:underline",
        "gradient-brand":
          "bg-gradient-to-r from-[#49108B] to-[#E26EE5] text-white shadow-sm hover:shadow-lg hover:shadow-[#49108B]/20 active:scale-[0.98]",
        "gradient-warm":
          "bg-gradient-to-r from-[#49108B] to-[#E26EE5] text-white shadow-sm hover:shadow-lg hover:shadow-[#49108B]/20 active:scale-[0.98]",
        "gradient-subtle":
          "bg-gradient-to-r from-[#F5F0FA] to-white text-[#49108B] border border-[rgba(73,16,139,0.12)] shadow-sm hover:shadow-md hover:from-white hover:to-[#F5F0FA]",
      },
      size: {
        xs: "h-9 px-3 text-xs rounded-xl",
        sm: "h-10 px-4 text-sm rounded-xl",
        default: "h-11 px-5 text-sm rounded-xl",
        lg: "h-12 px-7 text-base rounded-xl",
        xl: "h-14 px-9 text-lg rounded-xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-9 w-9 rounded-xl",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "variant" | "size" | "children">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  children?: React.ReactNode;
}

const motionButtonProps = {
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
} as const;

export function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      whileTap={disabled || loading ? undefined : motionButtonProps.whileTap}
      transition={motionButtonProps.transition}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}

export { buttonVariants };
