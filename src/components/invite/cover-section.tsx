"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { InvitationPageData } from "@/components/invite/types";
import { themeColors } from "@/components/invite/decoratives";

interface CoverSectionProps {
  data: InvitationPageData;
  onOpen: () => void;
}

function formatWeddingDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function getGreeting(guestName: string | undefined | null): string[] {
  const name = guestName?.trim() || "Tamu Undangan";
  return ["Yth. Bapak/Ibu/Saudara/i", name, "Tanpa mengurangi rasa hormat,", "kami mengundang anda untuk menghadiri", "acara pernikahan kami."];
}

export default function CoverSection({ data, onOpen }: CoverSectionProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleOpen = () => {
    setIsExiting(true);
    setTimeout(() => onOpen(), 900);
  };

  const greeting = useMemo(() => getGreeting(data.guestName), [data.guestName]);
  const formattedDate = useMemo(() => formatWeddingDate(data.events[0]?.start_date || data.invitation.wedding_date), [data.events[0]?.start_date, data.invitation.wedding_date]);

  const brideName = data.coupleBride?.nickname || data.coupleBride?.full_name || "";
  const groomName = data.coupleGroom?.nickname || data.coupleGroom?.full_name || "";
  const brideHeadPhoto = data.coupleBride?.cover_photo_url || data.coupleBride?.photo_url || "";
  const groomHeadPhoto = data.coupleGroom?.cover_photo_url || data.coupleGroom?.photo_url || "";
  const coverSilhouetteSrc = "/images/fotocover-v2.png";

  return (
    <motion.div
      className="invitation-theme fixed inset-0 z-40 w-full min-h-dvh overflow-y-auto overscroll-y-contain bg-white px-2 py-5 sm:px-0 sm:py-10 lg:relative lg:inset-auto lg:z-auto lg:py-8"
      animate={isExiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >

      <motion.div
        className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[420px] flex-col items-center justify-start px-2 pb-6 text-center sm:px-8 sm:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <motion.div
          className="pointer-events-none absolute left-4 bottom-64 sm:left-11 sm:bottom-124"
          animate={{ rotate: [-10, 8, -10], x: [0, 5, 0], y: [0, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/blink.png" alt="Blink decoration left" width={64} height={64} className="h-auto w-8 sm:w-10 md:w-14" />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute right-11 top-30 sm:right-15 sm:top-40"
          animate={{ rotate: [10, -8, 10], x: [0, -5, 0], y: [0, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <Image src="/images/blink.png" alt="Blink decoration right" width={64} height={64} className="h-auto w-8 sm:w-10 md:w-14" />
        </motion.div>
        <motion.div
          className="mt-7 mb-0 sm:-mt-1 sm:mb-4 flex w-full justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Image
            src="/images/frameatascover-v2.png"
            alt="Wedding cover frame"
            width={520}
            height={160}
            priority
            className="h-auto w-[21vw] max-w-[105px] sm:w-[24vw] sm:max-w-[130px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
          />
        </motion.div>
        <motion.p
          className="relative max-w-full font-quicksand text-[clamp(0.95rem,5vw,2rem)] uppercase tracking-[0.1em] sm:tracking-[0.2em] leading-tight"
          style={{ color: themeColors.primary, fontWeight: 500 }}
        >
          <span className="block">
            {"THESE KIDS ARE".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                initial={{ opacity: 0, scale: 0, y: i % 2 === 0 ? -16 : 16, rotate: i % 2 === 0 ? -10 : 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 11,
                  delay: 0.4 + i * 0.05,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span className="relative inline-block">
            <span className="block whitespace-normal break-words">
              {"GETTING MARRIED!".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block whitespace-pre"
                  initial={{ opacity: 0, scale: 0, y: i % 2 === 0 ? -16 : 16, rotate: i % 2 === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 11,
                    delay: 0.6 + i * 0.045,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </span>
        </motion.p>

        {(brideHeadPhoto || groomHeadPhoto) && (
          <motion.div
            className="relative mt-3 flex items-center justify-center sm:mt-8 lg:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative aspect-square w-[clamp(170px,58vw,320px)]">
              <div className="relative h-full w-full">
                <Image
                  src={coverSilhouetteSrc}
                  alt="Couple silhouette cover"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />

                {groomHeadPhoto && (
                  <div
                    className="absolute overflow-hidden border-[3px] border-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                    style={{
                      left: "20%",
                      top: "-11.5%",
                      width: "28%",
                      height: "28%",
                      borderRadius: "50%",
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={groomHeadPhoto}
                      alt="Groom cover portrait"
                      className="h-full w-full object-cover object-center"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
                )}

                {brideHeadPhoto && (
                  <div
                    className="absolute overflow-hidden border-[3px] border-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                    style={{
                      right: "24%",
                      top: "-4.8%",
                      width: "28%",
                      height: "28%",
                      borderRadius: "50%",
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={brideHeadPhoto}
                      alt="Bride cover portrait"
                      className="h-full w-full object-cover object-center"
                      style={{ objectPosition: "center top" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-5 flex w-full max-w-full flex-wrap items-center justify-center gap-x-1 gap-y-0.5 sm:mt-8 sm:gap-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h1
            className="min-w-0 max-w-[46%] break-words font-italianno text-[clamp(1.9rem,9vw,4.5rem)] leading-none"
            style={{ color: themeColors.primary, letterSpacing: "-0.04em", textAlign: "center" }}
          >
            {brideName}
          </h1>
          <span className="shrink-0 font-italianno text-lg sm:text-xl md:text-3xl" style={{ color: themeColors.primary, lineHeight: 1, transform: "translateY(-2px)" }}>
            &amp;
          </span>
          <h1
            className="min-w-0 max-w-[46%] break-words font-italianno text-[clamp(1.9rem,9vw,4.5rem)] leading-none"
            style={{ color: themeColors.primary, letterSpacing: "-0.04em", textAlign: "center" }}
          >
            {groomName}
          </h1>
        </motion.div>

        {formattedDate && (
          <motion.p
            className="mt-1 sm:mt-2 lg:mt-1 font-display text-sm sm:text-xl md:text-[2.2rem] tracking-widest italic"
            style={{ color: themeColors.primary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {formattedDate}
          </motion.p>
        )}

        <motion.div
          className="mt-3 mb-5 w-full max-w-[360px] rounded-2xl px-3 py-3 text-center sm:mt-4 sm:mb-6 sm:px-6 sm:py-6 lg:py-4"
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
                  ? "font-display text-sm md:text-lg mt-1 md:mt-2 mb-1 md:mb-1.5 font-bold tracking-wide"
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

        <motion.button
          className="group relative w-full max-w-[360px] overflow-hidden rounded-full"
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
          <span className="relative z-10 flex items-center justify-center gap-2 px-5 py-3 text-center font-sans text-xs font-medium tracking-[0.16em] text-white sm:px-8 md:py-3.5 md:text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4">
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
