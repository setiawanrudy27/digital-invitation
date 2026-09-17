"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Couple } from "@/components/invite/types";
import { themeColors, FloatingLeaves } from "@/components/invite/decoratives";

function ProfileImage({ photo_url, full_name }: { photo_url: string | null; full_name: string }) {
  return (
    <div className="relative w-full aspect-[2/3] max-w-[145px] mx-auto">
      <div className="relative h-full w-full">
        {photo_url ? (
          <div className="absolute left-1/2 top-1/2 w-[150px] h-[198px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[50%] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <img
              src={photo_url}
              alt={full_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[50%]" />
          </div>
        ) : (
          <div
            className="absolute left-1/2 top-1/2 w-[104px] h-[152px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-[50%]"
            style={{ background: `linear-gradient(135deg, ${themeColors.blush}, ${themeColors.surface})` }}
          >
            <svg className="w-10 h-10" style={{ color: `${themeColors.secondary}80` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
        )}
        <img
          src="/images/framemempelai.png"
          alt="Frame mempelai"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

function ProfileContent({ person }: { person: Couple }) {
  return (
    <div className="space-y-3">
      <div>
        <h3
          className="font-italianno text-2xl md:text-3xl lg:text-4xl leading-tight"
          style={{ color: themeColors.primary }}
        >
          {person.full_name}
        </h3>
        {person.nickname && (
          <p className="font-sans text-sm md:text-base italic mt-3" style={{ color: "#000000" }}>
            &ldquo;{person.nickname}&rdquo;
          </p>
        )}
      </div>

      <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: "#000000" }}>
        {person.person_type === "bride" ? "Putri" : "Putra"}
        {person.child_order ? ` ${person.child_order}` : ""} dari
        <br />
        <span className="font-medium" style={{ color: "#000000" }}>
          {person.father_name || "-"}
        </span>
        {person.mother_name && (
          <>
            <br />
            <span style={{ color: "#000000" }}>&amp;</span>{" "}
            <span className="font-medium" style={{ color: "#000000" }}>
              {person.mother_name}
            </span>
          </>
        )}
      </p>

      {person.instagram_username && (
        <a
          href={`https://instagram.com/${person.instagram_username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors duration-300"
          style={{ color: themeColors.primary }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="font-sans text-sm">@{person.instagram_username}</span>
        </a>
      )}
    </div>
  );
}

export default function CoupleSection({ groom, bride, showPhoto = true }: {
  groom: Couple | null;
  bride: Couple | null;
  showPhoto?: boolean;
}) {
  return (
    <section id="couple" className="relative py-16 md:py-24 lg:py-28 px-4 overflow-hidden bg-white">
      <FloatingLeaves />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/bismillah-v3.png"
              alt="Bismillah"
              width={2160}
              height={703}
              className="mx-auto h-auto w-full max-w-md object-contain"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-xl font-sans text-xs md:text-sm leading-relaxed"
            style={{ color: "#000000" }}
          >
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami
          </motion.p>
        </motion.div>

        {/* Bride centered photo */}
        {bride && showPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <ProfileImage photo_url={bride.photo_url} full_name={bride.full_name} />
          </motion.div>
        )}

        {/* Couple name data below */}
        <div className="mx-auto mt-10 md:mt-14 flex max-w-xl flex-col items-center gap-5 md:gap-8 text-center">
          {bride && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <ProfileContent person={bride} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <span className="font-italianno text-4xl md:text-5xl lg:text-6xl" style={{ color: themeColors.primary }}>&amp;</span>
          </motion.div>

          {groom && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="w-full"
            >
              <ProfileContent person={groom} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
