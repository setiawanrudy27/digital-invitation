"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const themeColors = {
  primary: "#8B3A42",
  secondary: "#C97A7E",
  bg: "#F5F0E8",
  green: "#7A8B6F",
  gold: "#C9A84C",
  surface: "#FAF6EF",
  text: "#3C2A2A",
  muted: "#8C7575",
  cream: "#FDF8F0",
  blush: "#E8C4C8",
  sage: "#A3B39A",
  ivory: "#F2ECE4",
  charcoal: "#2C1E1E",
};

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function useInviteColors() {
  return themeColors;
}

export function GoldOrchid({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M50 50 C45 30 35 20 30 30 C25 40 35 55 50 50Z" fill="currentColor" opacity="0.15" />
      <path d="M50 50 C55 30 65 20 70 30 C75 40 65 55 50 50Z" fill="currentColor" opacity="0.15" />
      <path d="M50 50 C35 55 20 65 30 70 C40 75 55 65 50 50Z" fill="currentColor" opacity="0.15" />
      <path d="M50 50 C65 55 80 65 70 70 C60 75 45 65 50 50Z" fill="currentColor" opacity="0.15" />
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.2" />
      <path d="M50 50 L50 20 M50 50 L50 80 M50 50 L20 50 M50 50 L80 50" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    </svg>
  );
}

export function RoseOrnament({ className = "", size = 36 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="18" fill="currentColor" opacity="0.08" />
      <circle cx="40" cy="40" r="12" fill="currentColor" opacity="0.12" />
      <circle cx="40" cy="40" r="6" fill="currentColor" opacity="0.18" />
      <path d="M40 22 C30 22 22 30 22 40 C22 50 30 58 40 58" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none" />
      <path d="M40 22 C50 22 58 30 58 40 C58 50 50 58 40 58" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none" />
    </svg>
  );
}

export function BotanicalLeaf({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 60" fill="none" className={className} aria-hidden="true">
      <path d="M20 2 C8 12 2 28 20 58 C38 28 32 12 20 2Z" fill="currentColor" opacity="0.12" />
      <path d="M20 2 C10 18 10 38 20 58" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
      <path d="M20 15 C14 22 12 32 20 45" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
      <path d="M20 15 C26 22 28 32 20 45" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
    </svg>
  );
}

export function FloralCorner({ position = "top-left", className = "" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; className?: string }) {
  const rotations: Record<string, string> = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90deg)",
    "bottom-left": "rotate(-90deg)",
    "bottom-right": "rotate(180deg)",
  };

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={{
        [position.includes("top") ? "top" : "bottom"]: -8,
        [position.includes("left") ? "left" : "right"]: -8,
        transform: rotations[position],
        color: themeColors.gold,
        opacity: 0.12,
      }}
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M80 0 C60 4 40 16 24 32 C16 40 8 52 4 68 L0 80 L12 72 C28 62 44 46 56 28 C64 16 72 6 80 0Z" fill="currentColor" />
        <path d="M80 0 C64 8 48 24 36 44 C28 58 22 72 20 80" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="56" cy="20" r="4" fill="currentColor" opacity="0.6" />
        <circle cx="70" cy="8" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

const leafPositions = [
  { left: "5%", top: "15%", size: 28, delay: 0 },
  { left: "92%", top: "10%", size: 22, delay: 0.5 },
  { left: "8%", top: "80%", size: 24, delay: 1 },
  { left: "88%", top: "85%", size: 20, delay: 1.5 },
  { left: "50%", top: "5%", size: 18, delay: 0.8 },
  { left: "3%", top: "50%", size: 16, delay: 2 },
  { left: "95%", top: "55%", size: 16, delay: 2.5 },
];

export function FloatingLeaves({ count = 7, color }: { count?: number; color?: string }) {
  const c = color || themeColors.green;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {leafPositions.slice(0, count).map((leaf, i) => (
        <div
          key={i}
          className="absolute leaf-float"
          style={{
            left: leaf.left,
            top: leaf.top,
            color: c,
            opacity: 0.08,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${10 + i}s`,
          }}
        >
          <BotanicalLeaf size={leaf.size} />
        </div>
      ))}
    </div>
  );
}

export function OrnamentDivider({ className = "", variant = "gold" }: { className?: string; variant?: "gold" | "rose" }) {
  const accent = variant === "gold" ? themeColors.gold : themeColors.primary;
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="block h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" style={{ color: accent }} aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
      </svg>
      <span className="block h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
    </div>
  );
}

export function CornerOrnaments({ color }: { color?: string }) {
  const c = color || themeColors.gold;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />
      <motion.div className="absolute left-4 top-4" style={{ color: c, opacity: 0.06 }} animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <RoseOrnament size={32} />
      </motion.div>
      <motion.div className="absolute right-4 top-4" style={{ color: c, opacity: 0.06 }} animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <RoseOrnament size={32} />
      </motion.div>
      <motion.div className="absolute left-4 bottom-4" style={{ color: c, opacity: 0.06 }} animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <RoseOrnament size={32} />
      </motion.div>
      <motion.div className="absolute right-4 bottom-4" style={{ color: c, opacity: 0.06 }} animate={{ rotate: [0, -4, 4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
        <RoseOrnament size={32} />
      </motion.div>
    </div>
  );
}

export function BotanicalFrame({ children, className = "", gold = false }: { children: ReactNode; className?: string; gold?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden" aria-hidden="true">
        <svg className="absolute left-0 top-0" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ color: gold ? themeColors.gold : themeColors.green, opacity: 0.08 }}>
          <path d="M0 0 C40 10 80 40 100 80 L120 120 L80 100 C40 80 10 40 0 0Z" fill="currentColor" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
        </svg>
        <svg className="absolute right-0 top-0" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ color: gold ? themeColors.gold : themeColors.green, opacity: 0.08, transform: "scaleX(-1)" }}>
          <path d="M0 0 C40 10 80 40 100 80 L120 120 L80 100 C40 80 10 40 0 0Z" fill="currentColor" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
        </svg>
        <svg className="absolute left-0 bottom-0" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ color: gold ? themeColors.gold : themeColors.green, opacity: 0.08, transform: "scaleY(-1)" }}>
          <path d="M0 0 C40 10 80 40 100 80 L120 120 L80 100 C40 80 10 40 0 0Z" fill="currentColor" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
        </svg>
        <svg className="absolute right-0 bottom-0" width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ color: gold ? themeColors.gold : themeColors.green, opacity: 0.08, transform: "scale(-1)" }}>
          <path d="M0 0 C40 10 80 40 100 80 L120 120 L80 100 C40 80 10 40 0 0Z" fill="currentColor" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
      {children}
    </div>
  );
}

export function SectionBackground({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative vintage-bg watercolor-overlay ${className}`}>
      <FloatingLeaves />
      <CornerOrnaments />
      {children}
    </div>
  );
}

export function GoldBorderFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-3xl ${className}`}
      style={{
        border: "2px solid rgba(201,168,76,0.25)",
        boxShadow: "0 0 0 3px rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.06)",
        background: "linear-gradient(135deg, rgba(250,246,239,0.95) 0%, rgba(245,240,232,0.9) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden" aria-hidden="true">
        <svg className="absolute -left-4 -top-4" width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ color: themeColors.gold, opacity: 0.15 }}>
          <path d="M0 0 C20 4 36 16 48 32 L60 60 L32 48 C16 36 4 20 0 0Z" fill="currentColor" />
        </svg>
        <svg className="absolute -right-4 -top-4" width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ color: themeColors.gold, opacity: 0.15, transform: "scaleX(-1)" }}>
          <path d="M0 0 C20 4 36 16 48 32 L60 60 L32 48 C16 36 4 20 0 0Z" fill="currentColor" />
        </svg>
        <svg className="absolute -left-4 -bottom-4" width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ color: themeColors.gold, opacity: 0.15, transform: "scaleY(-1)" }}>
          <path d="M0 0 C20 4 36 16 48 32 L60 60 L32 48 C16 36 4 20 0 0Z" fill="currentColor" />
        </svg>
        <svg className="absolute -right-4 -bottom-4" width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ color: themeColors.gold, opacity: 0.15, transform: "scale(-1)" }}>
          <path d="M0 0 C20 4 36 16 48 32 L60 60 L32 48 C16 36 4 20 0 0Z" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
}

export function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      <svg width="40" height="2" viewBox="0 0 40 2" fill="none">
        <line x1="0" y1="1" x2="40" y2="1" stroke={themeColors.gold} strokeWidth="0.5" opacity="0.3" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 40 40" fill="none" style={{ color: themeColors.gold, opacity: 0.3 }}>
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.4" />
      </svg>
      <svg width="40" height="2" viewBox="0 0 40 2" fill="none">
        <line x1="0" y1="1" x2="40" y2="1" stroke={themeColors.gold} strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
}
