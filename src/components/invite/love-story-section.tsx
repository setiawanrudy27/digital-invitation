"use client";

import { motion } from "framer-motion";
import type { LoveStory } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, RoseOrnament } from "@/components/invite/decoratives";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

interface LoveStorySectionProps {
  stories: LoveStory[];
}

export default function LoveStorySection({ stories }: LoveStorySectionProps) {
  if (!stories || stories.length === 0) return null;

  const sorted = [...stories].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-4 overflow-hidden vintage-bg watercolor-overlay"
    >
      <FloatingLeaves />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          
          <h2 className="font-display text-3xl md:text-3xl lg:text-4xl leading-tight italic mt-3" style={{ color: themeColors.charcoal }}>
            Cerita Kami
          </h2>
          <p className="text-sm md:text-base mt-3 italic font-light tracking-wide" style={{ color: themeColors.muted }}>
            &ldquo;Menikah bukan perlombaan, bukan soal cepat atau lambat. Tetapi, siapa yang siap mengemban amanah yang besar.&rdquo;
          </p>
          <OrnamentDivider variant="gold" className="mt-5" />
        </motion.div>

        <div className="relative">
          {/* Timeline line — selalu di kiri */}
          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] rounded-full"
            style={{ background: `linear-gradient(180deg, ${themeColors.gold}40 0%, ${themeColors.primary}30 50%, ${themeColors.gold}40 100%)` }}
          />

          {sorted.map((story, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={story.id} className="relative flex items-start mb-8 last:mb-0">
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                  className="absolute top-[18px] left-0 z-10 w-[38px] h-[38px] rounded-full border-[3px] shadow-[0_0_0_4px_rgba(255,255,255,0.8)] flex items-center justify-center"
                  style={{
                    borderColor: isEven ? themeColors.primary : themeColors.gold,
                    backgroundColor: themeColors.surface,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: isEven ? themeColors.primary : themeColors.gold }}
                  />
                </motion.div>

                {/* Content card — full width */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
                  className="w-full pl-14"
                >
                  <div className="rounded-2xl p-4 shadow-md border transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: themeColors.surface,
                      borderColor: `rgba(201,168,76,0.15)`,
                    }}
                  >
                    {story.photo_url && (
                      <div className="mb-3">
                        <img
                          src={story.photo_url}
                          alt=""
                          loading="lazy"
                          className="w-full h-48 object-cover rounded-xl shadow-sm"
                        />
                      </div>
                    )}
                    <time className="inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: themeColors.primary }}>
                      {formatDate(story.story_date)}
                    </time>
                    <p className="text-sm leading-relaxed" style={{ color: themeColors.text }}>
                      {story.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
