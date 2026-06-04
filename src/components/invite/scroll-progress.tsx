"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { themeColors } from "@/components/invite/decoratives";
import type { RefObject } from "react";

interface ScrollProgressProps {
  containerRef?: RefObject<HTMLDivElement | null>;
}

export default function ScrollProgress({ containerRef }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined
  );
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${themeColors.secondary} 0%, ${themeColors.gold} 30%, ${themeColors.primary} 60%, ${themeColors.gold} 100%)`,
      }}
    />
  );
}
