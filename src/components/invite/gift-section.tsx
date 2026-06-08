"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Gift, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankAccount, QRIS, Setting } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldBorderFrame, RoseOrnament } from "@/components/invite/decoratives";

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  qris: QRIS | null;
  settings: Setting | null;
}

export default function GiftSection({ bankAccounts, qris, settings }: GiftSectionProps) {
  const paymentMethod = settings?.payment_method ?? "transfer";
  const hasTransfer = bankAccounts.length > 0 && (paymentMethod === "transfer" || paymentMethod === "both");
  const hasQris = qris !== null && (paymentMethod === "qris" || paymentMethod === "both");

  if (!hasTransfer && !hasQris) return null;

  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback(async (account: BankAccount) => {
    try {
      await navigator.clipboard.writeText(account.account_number);
      setCopiedId(account.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = account.account_number;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(account.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="gifts" className="relative px-6 pt-4 pb-20 sm:pt-6 sm:pb-28 overflow-hidden vintage-bg watercolor-overlay"
    >
      <FloatingLeaves />
      <div className="mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})` }}
          >
            <Gift className="h-5 w-5" style={{ color: themeColors.surface }} />
          </div>
          <h2 className="font-display text-3xl tracking-wide sm:text-4xl italic" style={{ color: themeColors.charcoal }}>
            Hadiah Pernikahan
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: themeColors.muted }}>
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami akan senang hati menerimanya yang tentu akan semakin melengkapi kebahagiaan kami.
          </p>
          <OrnamentDivider variant="gold" className="mt-3" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
              color: themeColors.surface,
              boxShadow: `0 4px 16px rgba(139,58,66,0.25)`,
            }}
          >
            <Gift className="h-4 w-4" />
            Tampilkan Tujuan Pengiriman
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-3xl"
              style={{
                backgroundColor: themeColors.surface,
                border: `1px solid rgba(201,168,76,0.2)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl italic" style={{ color: themeColors.charcoal }}>
                  Tujuan Pengiriman
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                  style={{ color: themeColors.primary }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                {hasTransfer && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {bankAccounts.map((account) => (
                      <motion.div
                        key={account.id}
                        variants={itemVariants}
                        className="rounded-2xl p-5"
                        style={{
                          backgroundColor: themeColors.cream,
                          border: `1px solid rgba(201,168,76,0.15)`,
                        }}
                      >
                        <p className="text-xs font-medium uppercase tracking-widest" style={{ color: themeColors.primary }}>
                          {account.bank_name}
                        </p>
                        <p className="mt-2 font-display text-lg tracking-wide" style={{ color: themeColors.charcoal }}>
                          {account.account_holder}
                        </p>
                        <div className="mt-2 flex items-center gap-3" style={{ color: themeColors.muted }}>
                          <span className="font-mono text-sm tracking-wider">{account.account_number}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(account)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200",
                              copiedId === account.id ? "text-white" : "hover:shadow-sm"
                            )}
                            style={{
                              backgroundColor: copiedId === account.id ? themeColors.primary : `${themeColors.primary}15`,
                              color: copiedId === account.id ? themeColors.surface : themeColors.primary,
                            }}
                          >
                            {copiedId === account.id ? (
                              <>
                                <Check className="h-3 w-3" />
                                Tersalin
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Salin
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {hasQris && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                  >
                    <p className="mb-4 font-display text-lg italic" style={{ color: themeColors.charcoal }}>
                      Scan QRIS
                    </p>
                    <img
                      src={qris!.qris_url}
                      alt="QRIS Payment"
                      className="mx-auto h-48 w-48 rounded-xl object-cover shadow-sm sm:h-56 sm:w-56"
                      style={{ border: `1px solid rgba(201,168,76,0.15)` }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
