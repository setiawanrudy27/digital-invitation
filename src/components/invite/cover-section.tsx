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
      className="fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto w-full h-full bg-white flex flex-col items-center justify-center px-2 sm:px-0 pt-2 pb-2 sm:pt-20 sm:pb-6 lg:pt-8 overflow-hidden"
      animate={isExiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >

      <motion.div
        className="relative z-10 flex w-full max-w-[420px] flex-col items-center px-2 text-center sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="pointer-events-none absolute left-10 bottom-70 sm:left-17 sm:bottom-130"
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
          className="-mt-2 mb-0 sm:-mt-10 sm:mb-4 flex w-full justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Image
            src="/images/frameatascover.png"
            alt="Wedding cover frame"
            width={520}
            height={160}
            priority
            className="h-auto w-[72vw] max-w-[360px] sm:w-[85vw] sm:max-w-[420px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
          />
        </motion.div>

        <motion.p
          className="font-quicksand text-xl sm:text-2xl md:text-[2rem] uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight"
          style={{ color: themeColors.primary, fontWeight: 500 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block">THESE KIDS</span>
          <span className="relative inline-block">
            <span className="block">ARE GETTING MARRIED!</span>
            <Image
              src="/images/cincincover.png"
              alt="Ring decoration"
              width={36}
              height={36}
              className="pointer-events-none absolute -top-6 left-[15%] h-auto w-5 sm:w-6 md:w-8"
            />
            <Image
              src="/images/lovecover.png"
              alt="Love decoration"
              width={40}
              height={40}
              className="pointer-events-none absolute -top-5 left-[90%] h-auto w-5 sm:w-6 md:w-8"
            />
          </span>
        </motion.p>

        {(brideHeadPhoto || groomHeadPhoto) && (
          <motion.div
            className="relative mt-0 flex items-center justify-center translate-y-10 sm:translate-y-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px]">
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
                      top: "-30px",
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
                      top: "-15px",
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
          className="mt-14 sm:mt-48 lg:mt-48 flex w-full max-w-xl items-center justify-center gap-0.5 sm:gap-1 md:gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h1
            className="font-italianno text-[2.2rem] leading-none sm:text-4xl md:text-6xl lg:text-7xl"
            style={{ color: themeColors.primary, letterSpacing: "-0.04em", textAlign: "center" }}
          >
            {brideName}
          </h1>
          <span className="font-italianno text-lg sm:text-xl md:text-3xl" style={{ color: themeColors.primary, lineHeight: 1, transform: "translateY(-2px)" }}>
            &amp;
          </span>
          <h1
            className="font-italianno text-[2.2rem] leading-none sm:text-4xl md:text-6xl lg:text-7xl"
            style={{ color: themeColors.primary, letterSpacing: "-0.04em", textAlign: "center" }}
          >
            {groomName}
          </h1>
        </motion.div>

        {formattedDate && (
          <motion.p
            className="mt-1 sm:mt-2 lg:mt-1 font-display text-base sm:text-xl md:text-[2.2rem] tracking-widest italic"
            style={{ color: themeColors.primary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {formattedDate}
          </motion.p>
        )}

        <motion.div
          className="translate-y-6 sm:translate-y-32 lg:translate-y-32 mb-6 sm:mb-10 lg:mb-10 px-3 py-3 sm:px-6 sm:py-6 lg:py-4 text-center rounded-2xl"
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
          className="group relative translate-y-5 sm:translate-y-56 lg:translate-y-56 overflow-hidden rounded-full"
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
          <span className="relative z-10 flex items-center gap-2 px-8 md:px-10 py-3 md:py-3.5 font-sans text-xs md:text-sm font-medium tracking-[0.2em] text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,7 12,13 2,7" />
            </svg>
            BUKA UNDANGAN
          </span>
        </motion.button>

        <motion.div
          className="mt-2 sm:mt-6 flex w-full justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          <Image
            src="/images/framebawahcover.png"
            alt="Wedding cover bottom frame"
            width={520}
            height={120}
            className="h-auto w-[78vw] max-w-[360px] sm:w-[85vw] sm:max-w-[420px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
