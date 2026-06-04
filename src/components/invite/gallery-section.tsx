"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryPhoto, GalleryVideo } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldBorderFrame, RoseOrnament } from "@/components/invite/decoratives";

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

interface GallerySectionProps {
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
}

export default function GallerySection({ photos, videos }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visiblePhotos = photos
    .filter((p) => p.is_visible)
    .sort((a, b) => a.display_order - b.display_order);

  const visibleVideos = videos.filter((v) => v.is_visible);

  const allCount = visiblePhotos.length + visibleVideos.length;
  const hasVideo = visibleVideos.length > 0;

  const open = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + visiblePhotos.length) % visiblePhotos.length : null
    );
  }, [visiblePhotos.length]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % visiblePhotos.length : null
    );
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, goPrev, goNext]);

  if (allCount === 0) return null;

  return (
    <section id="gallery" className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-4 overflow-hidden vintage-bg watercolor-overlay"
    >
      <FloatingLeaves />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
        
          <h2 className="font-display text-3xl md:text-3xl lg:text-4xl leading-tight italic" style={{ color: themeColors.charcoal }}>
            Momen Kami
          </h2>
          <p className="mt-5 max-w-lg mx-auto font-sans text-sm md:text-base leading-relaxed italic" style={{ color: themeColors.muted }}>
            &ldquo;Aku tidak tahu dimana ujung perjalanan ini, aku tidak bisa menjanjikan apapun. Tapi, selama aku mampu, mimpi-mimpi kita adalah prioritas.&rdquo;
          </p>
          <OrnamentDivider variant="gold" className="mt-5" />
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {visibleVideos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            >
              {visibleVideos.map((video) => {
                const id = getYoutubeId(video.youtube_url);
                return (
                  <div
                    key={video.id}
                    className="col-span-full aspect-video rounded-2xl overflow-hidden shadow-lg"
                    style={{
                      border: `1px solid rgba(201,168,76,0.2)`,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    {id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&rel=0&controls=1`}
                        title="YouTube video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm p-2 text-center"
                        style={{ backgroundColor: themeColors.bg, color: themeColors.muted }}>
                        Video
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

          {visiblePhotos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-3 gap-1.5"
            >
              {visiblePhotos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => open(index)}
                  className="group relative overflow-hidden rounded-xl focus-visible:outline-none aspect-[3/4]"
                  style={{
                    border: `1px solid rgba(201,168,76,0.2)`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={photo.photo_url}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Decorative corner overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <svg className="absolute left-0 top-0 w-8 h-8" viewBox="0 0 32 32" fill="none" style={{ color: themeColors.gold, opacity: 0.6 }}>
                      <path d="M0 0 L20 0 L20 3 L3 3 L3 20 L0 20 Z" fill="currentColor" />
                    </svg>
                    <svg className="absolute right-0 top-0 w-8 h-8" viewBox="0 0 32 32" fill="none" style={{ color: themeColors.gold, opacity: 0.6, transform: "scaleX(-1)" }}>
                      <path d="M0 0 L20 0 L20 3 L3 3 L3 20 L0 20 Z" fill="currentColor" />
                    </svg>
                    <svg className="absolute left-0 bottom-0 w-8 h-8" viewBox="0 0 32 32" fill="none" style={{ color: themeColors.gold, opacity: 0.6, transform: "scaleY(-1)" }}>
                      <path d="M0 0 L20 0 L20 3 L3 3 L3 20 L0 20 Z" fill="currentColor" />
                    </svg>
                    <svg className="absolute right-0 bottom-0 w-8 h-8" viewBox="0 0 32 32" fill="none" style={{ color: themeColors.gold, opacity: 0.6, transform: "scale(-1)" }}>
                      <path d="M0 0 L20 0 L20 3 L3 3 L3 20 L0 20 Z" fill="currentColor" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox - luxury style */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
              onClick={close}
            >
              <button
                onClick={(e) => { e.stopPropagation(); close(); }}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Close lightbox"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
                aria-label="Previous"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <motion.img
                key={selectedIndex}
                src={visiblePhotos[selectedIndex].photo_url}
                alt=""
                className="max-w-[80vw] max-h-[75vh] object-contain"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
                aria-label="Next"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium tracking-wide" style={{ color: `${themeColors.gold}CC` }}>
                {selectedIndex + 1} / {visiblePhotos.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
