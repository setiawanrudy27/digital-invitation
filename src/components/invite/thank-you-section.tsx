"use client";

import { motion } from "framer-motion";
import type { ThankYou, Couple } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldOrchid } from "@/components/invite/decoratives";

interface ThankYouSectionProps {
  thankYou?: ThankYou | null;
  groom?: Couple | null;
  bride?: Couple | null;
}

export default function ThankYouSection({ thankYou, groom, bride }: ThankYouSectionProps) {
  return (
    <motion.section
      id="thank-you"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 vintage-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {thankYou?.photo_url ? (
        <div className="absolute inset-0">
          <img
            src={thankYou.photo_url}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, rgba(250,246,239,0.3) 0%, rgba(245,240,232,0.6) 100%)` }}
          />
        </div>
      ) : null}

      <FloatingLeaves />

      {/* Decorative floating orchids */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[{ l: "15%", t: "20%" }, { l: "85%", t: "18%" }, { l: "20%", t: "75%" }, { l: "80%", t: "80%" }].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: item.l, top: item.t, color: themeColors.gold, opacity: 0.05 }}
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          >
            <GoldOrchid size={24} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="font-display text-4xl tracking-wide sm:text-5xl italic" style={{ color: themeColors.charcoal }}>
            Terima Kasih
          </h2>

          <OrnamentDivider variant="gold" className="mt-6" />
        </motion.div>

        <motion.p
          className="mt-8 font-display text-lg italic leading-relaxed tracking-wide sm:text-xl"
          style={{ color: themeColors.primary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          Atas Kehadiran dan Doa Restunya
        </motion.p>

        <motion.p
          className="mt-4 text-sm leading-relaxed max-w-lg mx-auto"
          style={{ color: themeColors.muted }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila
          Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm tracking-widest" style={{ color: themeColors.secondary }}>
            Kami yang Berbahagia
          </p>
          <p className="mt-3 font-display text-2xl tracking-wide sm:text-3xl italic" style={{ color: themeColors.charcoal }}>
            {bride?.nickname || bride?.full_name || "________"} &amp; {groom?.nickname || groom?.full_name || "________"}
          </p>
          <OrnamentDivider variant="gold" className="mt-8" />
        </motion.div>
      </div>
    </motion.section>
  );
}
