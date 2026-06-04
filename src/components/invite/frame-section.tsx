"use client";

import { motion } from "framer-motion";
import type { WeddingFrame } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldBorderFrame, RoseOrnament } from "@/components/invite/decoratives";

export default function FrameSection({
  frame,
}: {
  frame: WeddingFrame;
}) {
  if (!frame?.frame_url && !frame?.frame_url_instagram) return null;

  return (
    <section className="relative px-4 pt-6 pb-20 md:px-8 md:pt-8 md:pb-28 overflow-hidden vintage-bg watercolor-overlay"
    >
      <FloatingLeaves count={5} />
      <div className="mx-auto max-w-3xl relative z-10">
        <GoldBorderFrame className="p-8 md:p-10">
          <RoseOrnament size={20} className="absolute left-4 top-4" />
          <RoseOrnament size={20} className="absolute right-4 top-4" />
          <RoseOrnament size={20} className="absolute left-4 bottom-4" />
          <RoseOrnament size={20} className="absolute right-4 bottom-4" />

          <div className="mb-6 text-center relative z-10">
            <motion.div
              className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                boxShadow: `0 4px 16px rgba(139,58,66,0.2)`,
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </motion.div>


            <h2 className="font-display text-2xl md:text-3xl italic" style={{ color: themeColors.charcoal }}>
              Wedding Frame
            </h2>

            <OrnamentDivider variant="gold" className="mt-4" />
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
        </GoldBorderFrame>
      </div>
    </section>
  );
}
