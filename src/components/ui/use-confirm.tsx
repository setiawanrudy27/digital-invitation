"use client";

import { useState, useCallback } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ConfirmOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default";
}

export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    description: string;
    resolve: (value: boolean) => void;
  } & ConfirmOptions | null>(null);

  const confirm = useCallback((description: string, options?: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        open: true,
        description,
        title: options?.title ?? "Konfirmasi",
        confirmText: options?.confirmText ?? "Hapus",
        cancelText: options?.cancelText ?? "Batal",
        variant: options?.variant ?? "danger",
        resolve,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state?.resolve(true);
    setState(null);
  }, [state]);

  const handleCancel = useCallback(() => {
    state?.resolve(false);
    setState(null);
  }, [state]);

  const confirmDialog = state ? (
    <ConfirmDialog
      open={state.open}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      title={state.title!}
      description={state.description}
      confirmText={state.confirmText}
      cancelText={state.cancelText}
      variant={state.variant}
    />
  ) : null;

  return { confirm, confirmDialog };
}
