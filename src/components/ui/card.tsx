import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "bordered" | "flat" | "gradient" | "glass";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
  const variants = {
    default:
      "rounded-2xl border border-[rgba(73,16,139,0.08)] bg-white text-[#1A1A2E] shadow-sm",
    elevated:
      "rounded-2xl border border-[rgba(73,16,139,0.08)] bg-white text-[#1A1A2E] shadow-md transition-all duration-300 hover:shadow-lg",
    interactive:
      "rounded-2xl border border-[rgba(73,16,139,0.08)] bg-white text-[#1A1A2E] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99]",
    bordered:
      "rounded-2xl border-2 border-[rgba(73,16,139,0.15)] bg-transparent text-[#2D2D44]",
    flat:
      "rounded-2xl bg-[#F5F0FA] text-[#2D2D44]",
    gradient:
      "rounded-2xl bg-gradient-to-br from-[#F5F0FA]/90 via-white/90 to-[#F5F0FA]/80 border border-[rgba(73,16,139,0.08)] text-[#1A1A2E] shadow-sm",
    glass:
      "rounded-2xl border border-[rgba(73,16,139,0.06)] bg-white/90 text-[#1A1A2E] shadow-sm backdrop-blur-xl",
  };

  return <div className={cn(variants[variant], className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-[#1A1A2E]", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-[#6B6B80]", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
