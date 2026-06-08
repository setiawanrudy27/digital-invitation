"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { themeColors } from "@/components/invite/decoratives";

interface MusicPlayerProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ audioRef, isPlaying, setIsPlaying }: MusicPlayerProps) {
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
  );
}
