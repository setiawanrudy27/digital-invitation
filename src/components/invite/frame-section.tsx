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
          <div className="p-8 md:p-10">

          <div className="mb-6">
            <div className="flex items-stretch gap-6 md:gap-11">
              <motion.div
                className="h-[104px] w-auto shrink-0 -mt-6 -ml-6 sm:h-[134px] md:h-[94px] lg:h-[114px] md:-mt-6 md:-ml-10"
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

              <div className="relative flex h-[104px] flex-1 flex-col items-center justify-center gap-0.5 -ml-4 md:-ml-10 sm:h-[134px] md:h-[94px] lg:h-[114px]">
                {["WEDDING", "FRAME"].map((w, i) => (
                  <motion.span
                    key={w}
                    className="font-display italic leading-none tracking-[0.05em]"
                    style={{
                      color: themeColors.primary,
                      fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)",
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

          <p className="mb-8 text-center text-sm leading-relaxed md:text-base relative z-10" style={{ color: themeColors.muted }}>
            Abadikan momen spesial Anda dengan bingkai foto pernikahan kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            {frame.frame_url_instagram && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={frame.frame_url_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium shadow-sm transition-all duration-200"
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
                  Frame Instagram
                </a>
              </motion.div>
            )}
            {frame.frame_url && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={frame.frame_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium shadow-sm transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                    color: themeColors.surface,
                    boxShadow: `0 4px 20px rgba(139,58,66,0.3)`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Frame TikTok
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
