"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { themeColors } from "@/components/invite/decoratives";
import type { Couple } from "@/components/invite/types";

interface Props {
  groom: Couple | null;
  bride: Couple | null;
}

export default function PhotoboothSection({ groom, bride }: Props) {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      <div className="mx-auto flex w-full max-w-[520px] items-center justify-end gap-2 px-2 sm:px-4">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 w-[42%] shrink-0 self-start translate-x-[1.25rem] text-right font-display leading-[0.85] italic sm:mt-24 sm:translate-x-[3.25rem] md:mt-28 md:translate-x-[5.25rem]"
          style={{ color: themeColors.primary, fontSize: "clamp(2rem, 6vw, 4rem)", textAlign: "right" }}
        >
          <span className="block whitespace-nowrap">We can&apos;t</span>
          <span className="block whitespace-nowrap">wait to</span>
          <span className="block whitespace-nowrap">celebrate</span>
          <span className="block whitespace-nowrap">with you!</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-[62%] max-w-[320px] shrink-0 translate-x-[4.25rem] sm:translate-x-[5.25rem] md:translate-x-[6.25rem]"
        >
          <Image
            src="/images/photobooth.png"
            alt="Photo Booth"
            width={1291}
            height={2512}
            sizes="(max-width: 640px) 62vw, 320px"
            className="h-auto w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
          />
        </motion.div>
      </div>
      <p className="mt-4 -translate-x-12 -translate-y-16 text-center font-italianno leading-none" style={{ color: themeColors.primary, letterSpacing: "-0.02em", fontSize: "clamp(2rem, 6vw, 4rem)" }}>
        {bride?.nickname || bride?.full_name || "________"} &amp; {groom?.nickname || groom?.full_name || "________"}
      </p>
      <Image
        src="/images/hiasanphoto.png"
        alt=""
        width={798}
        height={686}
        className="ml-16 -mt-6 w-24 object-contain sm:ml-32 sm:w-32"
      />
    </section>
  );
}