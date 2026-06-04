import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-[#F5F0FA] text-[#49108B] border border-[rgba(73,16,139,0.12)]",
        secondary:
          "bg-[#F0F0F5] text-[#6B6B80] border border-[rgba(0,0,0,0.06)]",
        success:
          "bg-[#22A67E]/10 text-[#22A67E] border border-[#22A67E]/20",
        warning:
          "bg-[#E59845]/10 text-[#E59845] border border-[#E59845]/20",
        destructive:
          "bg-[#E54545]/10 text-[#E54545] border border-[#E54545]/20",
        info:
          "bg-[#F5F0FA] text-[#49108B] border border-[rgba(73,16,139,0.12)]",
        outline:
          "border border-input bg-background text-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  );
}
