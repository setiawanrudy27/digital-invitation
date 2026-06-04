import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border bg-white px-5 py-4 text-sm text-[#2D2D44] placeholder:text-[#6B6B80] shadow-sm",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E26EE5]/30 focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F0FA]",
          "resize-y",
          error
            ? "border-[#E54545] focus-visible:ring-[#E54545]/30"
            : "border-[rgba(73,16,139,0.12)] hover:border-[rgba(73,16,139,0.25)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
