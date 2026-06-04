"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  id?: string;
}

export function Toggle({
  checked,
  onChange,
  disabled,
  label,
  description,
  id,
}: ToggleProps) {
  const toggleId = id || React.useId();

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        "flex items-center justify-between rounded-xl border border-[rgba(73,16,139,0.10)] bg-white p-4 transition-all duration-200",
        "hover:border-[rgba(73,16,139,0.20)]",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer"
      )}
    >
      <div className="space-y-0.5">
        {label && <p className="text-sm font-medium text-[#2D2D44]">{label}</p>}
        {description && <p className="text-sm text-[#6B6B80]">{description}</p>}
      </div>
      <div className="relative ml-4 shrink-0">
        <input
          type="checkbox"
          id={toggleId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={cn(
            "h-6 w-11 rounded-full transition-all duration-300 relative",
            "after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:duration-300",
            checked
              ? "bg-[#49108B] after:translate-x-5 after:shadow-md"
              : "bg-[#D0D0D8]"
          )}
        />
      </div>
    </label>
  );
}
