"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themeColors } from "@/components/invite/decoratives";

const sections = [
  { id: "opening", icon: "home", label: "Home" },
  { id: "couple", icon: "heart", label: "Couple" },
  { id: "events", icon: "calendar", label: "Event" },
  { id: "gallery", icon: "image", label: "Gallery" },
  { id: "rsvp", icon: "message", label: "RSVP" },
];

const iconPaths: Record<string, string> = {
  home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  message: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
};

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleObserver = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const offsetBottom = offsetTop + rect.height;
          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleObserver, { passive: true });
    return () => window.removeEventListener("scroll", handleObserver);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pb-safe-or-4 pt-2"
          style={{
            background: `linear-gradient(180deg, rgba(250,246,239,0.85) 0%, rgba(242,236,228,0.95) 100%)`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: `1px solid rgba(201,168,76,0.2)`,
            boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const Icon = section.icon;

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200"
                whileTap={{ scale: 0.92 }}
                aria-label={section.label}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isActive ? themeColors.primary : "none"}
                  stroke={isActive ? themeColors.primary : themeColors.muted}
                  strokeWidth={isActive ? 1.5 : 1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "all 0.2s ease",
                  }}
                >
                  <path d={iconPaths[section.icon]} />
                </svg>
                <span
                  className="text-[9px] font-medium uppercase tracking-wider"
                  style={{
                    color: isActive ? themeColors.primary : themeColors.muted,
                    opacity: isActive ? 1 : 0.7,
                    transition: "all 0.2s ease",
                  }}
                >
                  {section.label}
                </span>
                {isActive && (
                  <motion.div
                    className="h-[2px] rounded-full w-4"
                    style={{ backgroundColor: themeColors.primary }}
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
