"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { InvitationPageData } from "@/components/invite/types";
import { themeColors, GoldOrchid, RoseOrnament, BotanicalLeaf } from "@/components/invite/decoratives";

interface CoverSectionProps {
  data: InvitationPageData;
  onOpen: () => void;
  isMobileFrame?: boolean;
}

function formatWeddingDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getGreeting(guestName: string | undefined | null): string[] {
  const name = guestName?.trim() || "Tamu Undangan";
  return ["Yth. Bapak/Ibu/Saudara/i", name, "Tanpa mengurangi rasa hormat,", "kami mengundang anda untuk menghadiri", "acara pernikahan kami."];
}

export default function CoverSection({ data, onOpen, isMobileFrame = false }: CoverSectionProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleOpen = () => {
    setIsExiting(true);
    setTimeout(() => onOpen(), 900);
  };

  const greeting = useMemo(() => getGreeting(data.guestName), [data.guestName]);
  const formattedDate = useMemo(() => formatWeddingDate(data.events[0]?.start_date || data.invitation.wedding_date), [data.events[0]?.start_date, data.invitation.wedding_date]);

  const brideName = data.coupleBride?.nickname || data.coupleBride?.full_name || "";
  const groomName = data.coupleGroom?.nickname || data.coupleGroom?.full_name || "";
  const couplePhoto = data.coupleBride?.cover_photo_url || data.coupleBride?.photo_url;

  // Desktop split-screen: only render mobile frame
  if (isMobileFrame) {
    return (
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/background-invitation.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={isExiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {/* Overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-[#F5ECE0]/30" aria-hidden="true" />

        {/* Main content */}
        <motion.div
          className="relative z-10 flex flex-col items-center px-8 text-center max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p
            className="font-quicksand text-xl -mt-6"
            style={{ color: themeColors.primary, fontWeight: 200 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Undangan Pernikahan
          </motion.p>

          {/* Names with gold ornament */}
          <motion.div
            className="mt-7 space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1
              className="font-italianno text-7xl leading-[0.8]"
              style={{ color: themeColors.primary }}
            >
              {brideName}
            </h1>
            <div className="flex items-center justify-center gap-4 py-1">
              <span className="block h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${themeColors.secondary}, transparent)` }} />
              <span className="font-italianno text-3xl" style={{ color: themeColors.primary }}>&amp;</span>
              <span className="block h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${themeColors.secondary}, transparent)` }} />
            </div>
            <h1
              className="font-italianno text-7xl leading-[0.8]"
              style={{ color: themeColors.primary }}
            >
              {groomName}
            </h1>
          </motion.div>

          {/* Date */}
          {formattedDate && (
            <motion.p
              className="mt-4 font-display text-sm tracking-widest italic"
              style={{ color: themeColors.primary }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {formattedDate}
            </motion.p>
          )}

          {/* Greeting card */}
          <motion.div
            className="mt-9 px-6 py-4 text-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(250,246,239,0.9) 0%, rgba(242,236,228,0.8) 100%)",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {greeting.map((line, i) => (
              <p
                key={i}
                className={
                  i === 1
                    ? "font-display text-sm mt-1 mb-1 font-bold tracking-wide"
                    : i >= 2
                    ? "text-[10px] leading-relaxed"
                    : "text-xs"
                }
                style={{ color: themeColors.primary }}
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* Open button */}
          <motion.button
            className="group relative mt-7 overflow-hidden rounded-full"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
              boxShadow: `0 4px 24px rgba(139,58,66,0.3)`,
            }}
            whileHover={{ boxShadow: `0 8px 32px rgba(139,58,66,0.45)`, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span className="relative z-10 flex items-center gap-2 px-8 py-3 font-sans text-xs font-medium tracking-[0.2em] text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,7 12,13 2,7" />
              </svg>
              BUKA UNDANGAN
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Mobile fullscreen version
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/background_opening.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      animate={isExiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* Overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-8 text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.p
          className="font-quicksand text-2xl md:text-3xl -mt-6"
          style={{ color: themeColors.primary, fontWeight: 200 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The Wedding Of
        </motion.p>

        {/* Names with gold ornament */}
        <motion.div
          className="mt-7 space-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h1
            className="font-italianno text-8xl leading-[0.8]"
            style={{ color: themeColors.primary, letterSpacing: '-0.02em' }}
          >
            {brideName}
          </h1>
          <div className="flex items-center justify-center gap-4 py-1">
            <span className="block h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${themeColors.secondary}, transparent)` }} />
<span className="font-italianno text-4xl md:text-5xl" style={{ color: themeColors.primary }}>&amp;</span>
              <span className="block h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${themeColors.secondary}, transparent)` }} />
            </div>
            <h1
              className="font-italianno text-8xl leading-[0.8]"
            style={{ color: themeColors.primary, letterSpacing: '-0.02em' }}
          >
            {groomName}
          </h1>
        </motion.div>

        {/* Date */}
        {formattedDate && (
          <motion.p
            className="mt-6 font-display text-xl md:text-2xl tracking-widest italic"
            style={{ color: themeColors.primary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {formattedDate}
          </motion.p>
        )}

        {/* Greeting card */}
        <motion.div
          className="mt-12 px-8 py-6 text-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(250,246,239,0.9) 0%, rgba(242,236,228,0.8) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {greeting.map((line, i) => (
            <p
              key={i}
              className={
                i === 1
                  ? "font-display text-lg mt-2 mb-1.5 font-bold tracking-wide"
                  : i >= 2
                  ? "text-[10px] leading-relaxed"
                  : "text-xs"
              }
              style={{ color: themeColors.primary }}
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* Open button */}
        <motion.button
          className="group relative mt-11 overflow-hidden rounded-full"
          style={{
            background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
            boxShadow: `0 4px 24px rgba(139,58,66,0.3)`,
          }}
          whileHover={{ boxShadow: `0 8px 32px rgba(139,58,66,0.45)`, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <span className="relative z-10 flex items-center gap-2 px-10 py-3.5 font-sans text-sm font-medium tracking-[0.2em] text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,7 12,13 2,7" />
            </svg>
            BUKA UNDANGAN
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
