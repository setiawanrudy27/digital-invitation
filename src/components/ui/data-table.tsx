"use client";

import * as React from "react";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DataTableProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  emptyState?: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export function DataTable({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  toolbar,
  children,
  total,
  page = 1,
  onPageChange,
  pageSize = 10,
  emptyState,
  className,
  headerClassName,
}: DataTableProps) {
  const totalPages = total ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const hasSearch = searchValue !== undefined && onSearchChange !== undefined;
  const hasPagination = total !== undefined && onPageChange !== undefined && totalPages > 1;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Card className={cn("overflow-hidden shadow-sm", className)}>
      {(hasSearch || toolbar) && (
        <div
          className={cn(
            "flex flex-wrap items-center gap-3 border-b border-[rgba(73,16,139,0.06)] px-4 py-3 bg-white",
            headerClassName
          )}
        >
          {hasSearch && (
            <motion.div
              className="relative flex-1 min-w-0 max-w-full sm:max-w-xs"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B80]/40" />
              <Input
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-12 pl-12 text-sm"
              />
            </motion.div>
          )}
          {toolbar && (
            <div className="flex items-center gap-2 ml-auto">{toolbar}</div>
          )}
        </div>
      )}

      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        {children}
      </motion.div>

      {hasPagination && (
        <motion.div
          className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(73,16,139,0.06)] px-4 py-3 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <p className="text-xs text-[#6B6B80]/70 whitespace-nowrap">
            {total} data
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange?.(1)}
              disabled={page <= 1}
              className="h-9 w-9 sm:h-8 sm:w-8"
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              className="h-9 w-9 sm:h-8 sm:w-8"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            {getPageNumbers().map((p, i) =>
              p === "ellipsis" ? (
                <span key={`e-${i}`} className="px-1 text-xs text-[#6B6B80]/40">
                  ...
                </span>
              ) : (
                <Button
                  key={p}
                  variant={p === page ? "default" : "ghost"}
                  size="icon-sm"
                  onClick={() => onPageChange?.(p as number)}
                  className={cn(
                    "h-9 min-w-9 sm:h-8 sm:min-w-8 px-1 text-xs font-medium",
                    p === page && "bg-[#49108B] text-white hover:bg-[#5D209C]"
                  )}
                >
                  {p}
                </Button>
              )
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="h-9 w-9 sm:h-8 sm:w-8"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange?.(totalPages)}
              disabled={page >= totalPages}
              className="h-9 w-9 sm:h-8 sm:w-8"
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
