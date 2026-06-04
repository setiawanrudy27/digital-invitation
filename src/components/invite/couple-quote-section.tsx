"use client";

import { motion } from "framer-motion";
import type { Quote } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider } from "@/components/invite/decoratives";

export default function CoupleQuoteSection({ quotes }: { quotes: Quote[] }) {
  const quote = quotes[1];
  if (!quote) return null;

  return (
    <section className="relative pt-6 pb-24 md:pt-8 md:pb-32 px-4 overflow-hidden vintage-bg"
    >
      <FloatingLeaves count={4} />
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className="font-script text-2xl md:text-3xl leading-none select-none"
            style={{ color: `${themeColors.gold}30` }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            &ldquo;
          </motion.div>

          <blockquote
            className="font-display text-[10px] md:text-xs lg:text-sm leading-relaxed italic -mt-6 md:-mt-10"
            style={{ color: themeColors.charcoal }}
          >
            {quote.text}
          </blockquote>

          {quote.source && (
            <div className="mt-4 space-y-1">
              <OrnamentDivider variant="gold" className="scale-75" />
              <cite className="font-sans text-[8px] md:text-[10px] not-italic block" style={{ color: themeColors.muted }}>
                &mdash; {quote.source}
              </cite>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
