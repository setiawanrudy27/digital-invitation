"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Gift, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BankAccount, QRIS, Setting } from "@/components/invite/types";
import { themeColors, FloatingLeaves } from "@/components/invite/decoratives";

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

  return (
    <section id="gifts" className="relative px-6 pt-4 pb-20 sm:pt-6 sm:pb-28 overflow-hidden bg-white"
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
          <div className="mx-auto flex w-full max-w-[560px] items-center justify-center gap-3 sm:gap-5 md:gap-6">
            <motion.div
              className="h-[110px] w-auto shrink-0 sm:h-[140px] md:h-[136px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src="/images/gift.png"
                alt="Wedding Gift"
                width={988}
                height={957}
                className="h-full w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
              />
            </motion.div>

            <div className="relative flex h-[110px] w-[170px] shrink-0 flex-col items-center justify-center gap-0.5 sm:h-[140px] sm:w-[230px] md:h-[136px] md:w-[270px]">
              {["WEDDING", "GIFT"].map((w, i) => (
                <motion.span
                  key={w}
                  className="font-display italic leading-none tracking-[0.05em]"
                  style={{
                    color: themeColors.primary,
                    fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                    marginLeft: `-${i * 8}px`,
                  }}
                  initial={{ opacity: 0, y: 24, rotate: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 8 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: "easeOut" }}
                >
                  {w}
                </motion.span>
              ))}
            </div>
          </div>
          <h2 className="sr-only font-display text-3xl tracking-wide sm:text-4xl italic" style={{ color: themeColors.charcoal }}>
            Wedding Gift
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: "#000000" }}>
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, jika memberi adalah ungkapan tanda kasih Anda, kami akan senang hati menerimanya yang tentu akan semakin melengkapi kebahagiaan kami.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium shadow-sm transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
              color: themeColors.surface,
              boxShadow: `0 4px 16px rgba(139,58,66,0.25)`,
            }}
            whileHover={{ scale: 1.03, boxShadow: `0 8px 24px rgba(139,58,66,0.35)`, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          >
            <Gift className="h-4 w-4" />
            Tujuan Pengiriman
          </motion.button>
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
                {hasTransfer &&
                  bankAccounts.map((account, index) => (
                    <motion.div
                      key={account.id}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      <div className="relative mx-auto flex max-w-[420px] justify-center">
                        <Image
                          src={index === 0 ? "/images/rekening.png" : "/images/rekening2.png"}
                          alt="Rekening pembayaran"
                          width={760}
                          height={420}
                          className="h-auto w-full object-contain"
                          priority={index === 0}
                        />

                        <div className="absolute inset-0 flex flex-col justify-center gap-3 px-[14%] py-[18%] text-left sm:gap-4">
                          <div className="space-y-1">
                            <div className="font-bold uppercase tracking-[0.16em]" style={{ color: themeColors.primary, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
                              {account.bank_name}
                            </div>

                            <div className="font-mono text-[clamp(1rem,2.8vw,1.4rem)] tracking-[0.16em]" style={{ color: themeColors.charcoal }}>
                              {account.account_number}
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 sm:gap-4">
                            <div className="flex min-w-0 flex-col whitespace-nowrap text-[clamp(0.8rem,2.6vw,1.2rem)]" style={{ color: themeColors.charcoal }}>
                              <span className="font-semibold">Account name:</span>
                              <span className="translate-x-2 font-semibold">{account.account_holder}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(account)}
                              className={cn(
                                "inline-flex shrink-0 translate-x-1 -translate-y-3 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200",
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
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                {hasQris && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                  >
                    <p className="mb-4 font-display text-lg italic" style={{ color: themeColors.charcoal }}>
                      QRIS
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
