"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Music2, Pause } from "lucide-react";
import { themeColors } from "@/components/invite/decoratives";

interface MusicPlayerProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ audioRef, isPlaying, setIsPlaying }: MusicPlayerProps) {
  const realPlaying = audioRef.current ? !audioRef.current.paused : isPlaying;

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audioRef, setIsPlaying]);

  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
        setIsPlaying(false);
      } else if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [audioRef, setIsPlaying]);

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        background: "rgba(250,246,239,0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid rgba(201,168,76,0.25)`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        color: realPlaying ? themeColors.primary : themeColors.gold,
      }}
      onClick={togglePlay}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={realPlaying ? "Pause music" : "Play music"}
    >
      {realPlaying ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="flex items-center justify-center"
        >
          <Pause size={20} strokeWidth={2} fill="none" />
        </motion.span>
      ) : (
        <Music2 size={20} strokeWidth={2} fill="none" />
      )}
    </motion.button>
  );
}
