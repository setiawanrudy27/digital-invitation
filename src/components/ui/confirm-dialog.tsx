"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default";
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  description,
  confirmText = "Hapus",
  cancelText = "Batal",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} size="sm">
      <div className="p-6">
        <div
          className={cn(
            "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl mb-5",
            variant === "danger"
              ? "bg-destructive/10"
              : "bg-brand-50 dark:bg-brand-900/20"
          )}
        >
          {variant === "danger" ? (
            <AlertTriangle className="h-6 w-6 text-destructive" />
          ) : (
            <Info className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          )}
        </div>
        <DialogHeader className="text-center pr-0 mb-2">
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row justify-center mt-6 pt-0 border-t-0">
          <Button variant="outline" onClick={onCancel} disabled={loading} className="flex-1 sm:flex-none">
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={loading}
            loading={loading}
            className="flex-1 sm:flex-none"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
