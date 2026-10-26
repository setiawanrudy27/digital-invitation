"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { InvitationPageData } from "@/components/invite/types";
import { themeColors, FloatingLeaves } from "@/components/invite/decoratives";

export default function SaveTheDateSection({ data }: { data: InvitationPageData }) {
  const brideName = data.coupleBride?.nickname || data.coupleBride?.full_name || "";
  const groomName = data.coupleGroom?.nickname || data.coupleGroom?.full_name || "";

  return (
    <section
      id="save-the-date"
      className="relative px-4 pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-white"
    >
      <FloatingLeaves />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl italic leading-none"
          style={{ color: themeColors.charcoal, letterSpacing: "-0.06em", lineHeight: 1.25 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {(() => {
            let charIndex = 0;
            return ["SAVE", "THE", "DATE"].map((word) => (
              <div key={word} className="block">
                {word.split("").map((char) => {
                  const delay = 0.06 + charIndex * 0.05;
                  charIndex++;
                  return (
                    <motion.span
                      key={char + charIndex}
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0, rotate: charIndex % 2 === 0 ? -12 : 12 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 13, delay }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>
            ));
          })()}
        </motion.h1>

        <motion.div
          className="mt-8 w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Image
            src="/images/savethedate.png"
            alt="Save the date"
            width={2160}
            height={898}
            priority
            className="h-auto w-full object-contain"
          />
        </motion.div>

        <motion.h2
          className="mt-10 font-italianno text-4xl sm:text-5xl lg:text-6xl leading-tight"
          style={{ color: themeColors.primary }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {brideName} <span className="font-italianno text-2xl sm:text-3xl lg:text-4xl">&amp;</span> {groomName}
        </motion.h2>

        {data.quotes[0] && (
          <motion.blockquote
            className="mt-8 max-w-xl font-display text-xs sm:text-sm lg:text-base leading-relaxed italic"
            style={{ color: themeColors.charcoal }}
            whileHover={{ scale: 1.02 }}
          >
            &ldquo;
            {(() => {
              let wordIndex = 0;
              const renderText = (text: string, startDelay: number) =>
                text.split(" ").map((word) => {
                  const delay = startDelay + wordIndex * 0.08;
                  wordIndex++;
                  return (
                    <motion.span
                      key={word + wordIndex}
                      className="inline-block"
                      initial={{ opacity: 0, scale: 0, rotate: wordIndex % 2 === 0 ? -8 : 8 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 13, delay }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  );
                });
              return renderText(data.quotes[0].text, 0.3);
            })()}
            &rdquo;
            {data.quotes[0].source && (
              <cite className="mt-3 block font-sans text-[10px] sm:text-xs not-italic tracking-wide" style={{ color: themeColors.muted }}>
                &mdash;{" "}
                {(() => {
                  let wordIndex = 0;
                  return data.quotes[0].source!.split(" ").map((word) => {
                    const delay = 0.3 + wordIndex * 0.1;
                    wordIndex++;
                    return (
                      <motion.span
                        key={"src" + wordIndex}
                        className="inline-block"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 13, delay }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    );
                  });
                })()}
              </cite>
            )}
          </motion.blockquote>
        )}
      </div>
    </section>
  );
}