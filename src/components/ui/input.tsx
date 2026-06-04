import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#6B6B80]">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border bg-white px-5 py-2 text-sm text-[#2D2D44] placeholder:text-[#6B6B80] shadow-sm",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E26EE5]/30 focus-visible:ring-offset-0 focus-visible:border-[#E26EE5]/50",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F0FA]",
            error
              ? "border-[#E54545] focus-visible:ring-[#E54545]/30"
              : "border-[rgba(73,16,139,0.12)] hover:border-[rgba(73,16,139,0.25)]",
            icon && "pl-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg
              className="h-4 w-4 text-[#E54545]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
