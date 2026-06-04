"use client";

import { motion } from "framer-motion";
import type { LiveStreaming } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldBorderFrame, RoseOrnament } from "@/components/invite/decoratives";

export default function StreamingSection({
  stream,
}: {
  stream: LiveStreaming;
}) {
  if (!stream?.stream_url) return null;

  return (
    <section className="relative px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28 overflow-hidden vintage-bg watercolor-overlay"
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
                <rect x="2" y="7" width="14" height="11" rx="2" />
                <circle cx="9" cy="12.5" r="3" />
                <path d="M16 10l5-3v11l-5-3" />
                
              </svg>
            </motion.div>

            

            <h2 className="font-display text-2xl md:text-3xl italic" style={{ color: themeColors.charcoal }}>
              Live Streaming
            </h2>

            <OrnamentDivider variant="gold" className="mt-4" />
          </div>

          <p className="mb-8 text-center text-sm leading-relaxed md:text-base relative z-10" style={{ color: themeColors.muted }}>
            Momen kebahagiaan prosesi pernikahan akan kami tayangkan secara virtual melalui tautan berikut ini.
          </p>

          <div className="flex justify-center">
            <motion.a
              href={stream.stream_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium shadow-sm transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                color: themeColors.surface,
                boxShadow: `0 4px 20px rgba(139,58,66,0.3)`,
              }}
              whileHover={{ scale: 1.03, boxShadow: `0 8px 28px rgba(139,58,66,0.4)` }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Lihat Live Streaming
            </motion.a>
          </div>
        </GoldBorderFrame>
      </div>
    </section>
  );
}
