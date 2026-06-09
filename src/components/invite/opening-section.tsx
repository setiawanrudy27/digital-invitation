"use client";

import { motion } from "framer-motion";
import type { InvitationPageData } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldOrchid } from "@/components/invite/decoratives";

export default function OpeningSection({ data }: { data: InvitationPageData }) {
  const brideName = data.coupleBride?.nickname || data.coupleBride?.full_name || "";
  const groomName = data.coupleGroom?.nickname || data.coupleGroom?.full_name || "";

  return (
    <section id="opening" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 pb-24 overflow-hidden bg-white"
    >
      <FloatingLeaves />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[{ l: "8%", t: "10%" }, { l: "92%", t: "10%" }, { l: "8%", t: "85%" }, { l: "92%", t: "85%" }, { l: "50%", t: "5%" }].map((item, i) => (
          <motion.div key={i} className="absolute" style={{ left: item.l, top: item.t, color: themeColors.gold, opacity: 0.06 }}
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          >
            <GoldOrchid size={28} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <motion.p
          className="font-parisienne text-3xl md:text-4xl leading-none tracking-wide"
          style={{ color: themeColors.primary }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          These kids<br />are getting married!
        </motion.p>

        {/* Cover photos */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mt-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Bride cover photo */}
          {data.coupleBride?.cover_photo_url ? (
            <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <img
                src={data.coupleBride.cover_photo_url}
                alt={data.coupleBride.full_name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : data.coupleBride?.photo_url ? (
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <img
                src={data.coupleBride.photo_url}
                alt={data.coupleBride.full_name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {/* Heart icon gemuk di antara foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, type: "spring", stiffness: 200 }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill={themeColors.primary} stroke={themeColors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 28.5C17 28.5 4.5 20.5 3.5 12.5C3 8.5 5.5 5 9.5 5C13 5 15.5 7.5 17 10C18.5 7.5 21 5 24.5 5C28.5 5 31 8.5 30.5 12.5C29.5 20.5 17 28.5 17 28.5Z" />
              <path d="M6.5 11C7 9 9 7 11 7" stroke="white" strokeWidth="1.2" fill="none" />
              <path d="M27.5 11C27 9 25 7 23 7" stroke="white" strokeWidth="1.2" fill="none" />
            </svg>
          </motion.div>

          {/* Groom cover photo */}
          {data.coupleGroom?.cover_photo_url ? (
            <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <img
                src={data.coupleGroom.cover_photo_url}
                alt={data.coupleGroom.full_name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : data.coupleGroom?.photo_url ? (
            <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <img
                src={data.coupleGroom.photo_url}
                alt={data.coupleGroom.full_name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
        </motion.div>

        {/* Wedding title */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: themeColors.muted }}>
            Welcome To
          </p>
          <p className="font-quicksand text-lg md:text-xl tracking-wide" style={{ color: themeColors.primary, fontWeight: 200 }}>
            The Wedding Of
          </p>
        </motion.div>

        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="font-italianno text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-nowrap" style={{ color: themeColors.charcoal }}>
            {brideName} &amp; {groomName}
          </h1>
        </motion.div>

        <OrnamentDivider variant="gold" />

        {/* Greeting */}
        <motion.p
          className="font-sans text-xs md:text-sm max-w-lg leading-relaxed -mt-2"
          style={{ color: themeColors.primary }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          We would be honored by your presence and grateful for your prayers and blessings on our special day
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#000000" }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="16" height="20" viewBox="0 0 24 28" fill="none" style={{ color: "#000000" }}>
            <path d="M12 22V4m0 0-5 5m5-5 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 24h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
