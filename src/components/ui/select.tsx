import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-12 w-full rounded-xl border bg-white px-5 py-2 pr-11 text-sm text-[#2D2D44] appearance-none cursor-pointer shadow-sm",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E26EE5]/30 focus-visible:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F0FA]",
            error
              ? "border-[#E54545] focus-visible:ring-[#E54545]/30"
              : "border-[rgba(73,16,139,0.12)] hover:border-[rgba(73,16,139,0.25)]",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg className="h-4 w-4 text-[#6B6B80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
