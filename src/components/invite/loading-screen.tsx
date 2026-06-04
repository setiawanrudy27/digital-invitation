"use client";

import { motion } from "framer-motion";
import { themeColors } from "@/components/invite/decoratives";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: themeColors.bg }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Vintage paper texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(60,42,42,0.015) 2px, rgba(60,42,42,0.015) 4px)` }}
      />

      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Ornate loading ring */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="absolute">
          <motion.circle cx="50" cy="50" r="45" stroke={themeColors.gold} strokeWidth="1" strokeDasharray="280" strokeLinecap="round"
            animate={{ rotate: 360, strokeDashoffset: [0, 280] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center", opacity: 0.3 }}
          />
          <motion.circle cx="50" cy="50" r="30" stroke={themeColors.primary} strokeWidth="1" strokeDasharray="188" strokeLinecap="round"
            animate={{ rotate: -360, strokeDashoffset: [0, 188] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center", opacity: 0.2 }}
          />
        </svg>

        {/* Center flower */}
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" style={{ color: themeColors.gold }}>
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
            <circle cx="20" cy="20" r="12" fill="currentColor" opacity="0.1" />
            <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.25" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-16 font-script text-xl tracking-wide"
        style={{ color: themeColors.muted }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        Opening invitation...
      </motion.p>

      <motion.div
        className="mt-6 flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: 6, height: 6, backgroundColor: themeColors.gold }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
