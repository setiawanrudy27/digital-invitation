"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { WeddingFrame } from "@/components/invite/types";
import { themeColors, FloatingLeaves } from "@/components/invite/decoratives";

export default function FrameSection({
  frame,
}: {
  frame: WeddingFrame;
}) {
  if (!frame?.frame_url && !frame?.frame_url_instagram) return null;

  return (
    <section className="relative px-4 pt-6 pb-20 md:px-8 md:pt-8 md:pb-28 overflow-hidden bg-white"
    >
      <FloatingLeaves count={5} />
      <div className="mx-auto max-w-3xl relative z-10">
          <div className="p-4 sm:p-6 md:p-8">

          <div className="mb-6">
              <div className="mx-auto flex w-full max-w-[560px] items-center justify-center gap-3 sm:gap-5 md:gap-6">
              <motion.div
                  className="h-[104px] w-auto shrink-0 sm:h-[128px] md:h-[136px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Image
                  src="/images/frame.png"
                  alt="Wedding Frame"
                  width={1068}
                  height={859}
                  className="h-full w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
                />
              </motion.div>

              <div className="relative flex h-[104px] w-[190px] shrink-0 flex-col items-center justify-center gap-0.5 sm:h-[128px] sm:w-[230px] md:h-[136px] md:w-[270px]">
                {["WEDDING", "FRAME"].map((w, i) => (
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
          </div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 text-center text-sm leading-relaxed md:text-base relative z-10"
            style={{ color: "#000000" }}
          >
            Abadikan momen spesial Anda dengan bingkai foto pernikahan kami.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            {frame.frame_url_instagram && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-36">
                <a
                  href={frame.frame_url_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium shadow-sm transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                    color: themeColors.surface,
                    boxShadow: `0 4px 20px rgba(139,58,66,0.3)`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </a>
              </motion.div>
            )}
            {frame.frame_url && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-36">
                <a
                  href={frame.frame_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium shadow-sm transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                    color: themeColors.surface,
                    boxShadow: `0 4px 20px rgba(139,58,66,0.3)`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                  TikTok
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
