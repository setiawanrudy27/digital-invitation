"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themeColors } from "@/components/invite/decoratives";

interface MusicPlayerProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ audioRef, isPlaying, setIsPlaying }: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, audioRef, setIsPlaying]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mb-3 overflow-hidden rounded-2xl px-4 py-3"
            style={{
              background: "rgba(250,246,239,0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid rgba(201,168,76,0.2)`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, y: 10, height: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto", paddingTop: 12, paddingBottom: 12 }}
            exit={{ opacity: 0, y: 10, height: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="font-script text-sm tracking-wide" style={{ color: themeColors.charcoal }}>
              Wedding Music
            </p>
            <p className="mt-0.5 text-[11px] font-medium" style={{ color: themeColors.gold }}>
              {isPlaying ? "Now Playing" : "Paused"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: "rgba(250,246,239,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid rgba(201,168,76,0.25)`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          color: isPlaying ? themeColors.primary : themeColors.gold,
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </motion.svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
