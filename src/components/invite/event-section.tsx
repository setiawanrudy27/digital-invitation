"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { Event, Invitation } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldBorderFrame, RoseOrnament } from "@/components/invite/decoratives";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalMidnight(iso: string): number {
  if (!iso) return NaN;
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  if (!y || !m || !d) return NaN;
  return new Date(y, m - 1, d).getTime();
}

function calcDiff(target: number) {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function useCountdown(targetISO: string) {
  const target = toLocalMidnight(targetISO);
  const [tl, setTl] = useState(() => calcDiff(target));

  useEffect(() => {
    const ts = toLocalMidnight(targetISO);
    if (isNaN(ts)) return;

    function tick() {
      setTl(calcDiff(ts));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return tl;
}

function CountdownItem({ val, label }: { val: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative flex size-16 md:size-20 items-center justify-center rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${themeColors.surface} 0%, ${themeColors.cream} 100%)`,
          border: `1px solid rgba(201,168,76,0.25)`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <motion.span
          key={val}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-2xl md:text-3xl font-bold tabular-nums"
          style={{ color: themeColors.primary }}
        >
          {pad(val)}
        </motion.span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.15em]" style={{ color: themeColors.secondary }}>
        {label}
      </span>
    </motion.div>
  );
}

function formatDateOnly(dateStr: string, tz: string) {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: tz,
  }).format(d);
}

function formatTime(dateStr: string, tz: string) {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  }).format(d);
}

function formatTZ(tz: string) {
  const map: Record<string, string> = {
    "Asia/Jakarta": "WIB",
    "Asia/Makassar": "WITA",
    "Asia/Jayapura": "WIT",
  };
  return map[tz] || tz;
}

function toISOlocal(dateStr: string, tz: string) {
  const d = new Date(dateStr);
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: tz,
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get("year")}${get("month")}${get("day")}T${get("hour")}${get("minute")}${get("second")}`;
}

function googleCalendarUrl(event: Event) {
  const startLocal = toISOlocal(event.start_date, event.timezone);
  const endLocal = event.end_date
    ? toISOlocal(event.end_date, event.timezone)
    : (() => {
        const d = new Date(event.start_date);
        d.setHours(d.getHours() + 2);
        const parts = new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: event.timezone,
          hour12: false,
        }).formatToParts(d);
        const get = (t: string) => parts.find((p) => p.type === t)!.value;
        return `${get("year")}${get("month")}${get("day")}T${get("hour")}${get("minute")}${get("second")}`;
      })();

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startLocal}/${endLocal}`,
    ctz: event.timezone,
    details: `${event.title}\n${event.address ?? ""}`,
    location: event.address ?? "",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

const fadeUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

function EventCard({ event: ev }: { event: Event }) {
  const dateOnly = useMemo(
    () => formatDateOnly(ev.start_date, ev.timezone),
    [ev.start_date, ev.timezone],
  );
  const startTime = useMemo(
    () => formatTime(ev.start_date, ev.timezone),
    [ev.start_date, ev.timezone],
  );
  const endTime = useMemo(
    () => ev.end_date ? formatTime(ev.end_date, ev.timezone) : null,
    [ev.end_date, ev.timezone],
  );
  const tzAbbr = useMemo(() => formatTZ(ev.timezone), [ev.timezone]);

  return (
    <GoldBorderFrame className="p-6 md:p-8">
      {/* Corner roses */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
        <RoseOrnament size={20} className="absolute left-3 top-3 opacity-60" />
        <RoseOrnament size={20} className="absolute right-3 top-3 opacity-60" />
        <RoseOrnament size={20} className="absolute left-3 bottom-3 opacity-60" />
        <RoseOrnament size={20} className="absolute right-3 bottom-3 opacity-60" />
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl md:text-2xl italic" style={{ color: themeColors.charcoal }}>
            {ev.title}
          </h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColors.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        <div className="space-y-3 text-sm md:text-base" style={{ color: themeColors.muted }}>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={themeColors.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div>
              <p style={{ color: themeColors.text }}>{dateOnly}</p>
              <p style={{ color: themeColors.secondary }}>
                {startTime}
                {ev.until_finish ? ` ${tzAbbr} - Sampai Selesai` : endTime ? ` - ${endTime} ${tzAbbr}` : ` ${tzAbbr}`}
              </p>
            </div>
          </div>

          {ev.place_name && (
            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={themeColors.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="font-medium" style={{ color: themeColors.text }}>{ev.place_name}</p>
                {ev.address && <p className="mt-0.5" style={{ color: themeColors.muted }}>{ev.address}</p>}
              </div>
            </div>
          )}
          {!ev.place_name && ev.address && (
            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={themeColors.secondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p style={{ color: themeColors.text }}>{ev.address}</p>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {ev.google_maps_link && (
            <a
              href={ev.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-all duration-200 hover:shadow-md"
              style={{
                background: themeColors.surface,
                border: `1px solid rgba(201,168,76,0.25)`,
                color: themeColors.primary,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lihat Lokasi
            </a>
          )}
        </div>
      </div>
    </GoldBorderFrame>
  );
}

export default function EventSection({
  events,
  invitation,
}: {
  events: Event[];
  invitation: Invitation;
}) {
  const targetDate = events?.[0]?.start_date || invitation.wedding_date;
  const countdown = useCountdown(targetDate);

  if (!events || events.length === 0) return null;

  return (
    <section id="events" className="relative px-4 pt-0 -mt-2 pb-20 md:px-8 md:pt-2 md:pb-28 overflow-hidden vintage-bg watercolor-overlay"
    >
      <FloatingLeaves />
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          className="mb-14 text-center"
          initial={fadeUpProps.initial}
          whileInView={fadeUpProps.whileInView}
          viewport={fadeUpProps.viewport}
          transition={fadeUpProps.transition}
        >
          
          <h2 className="font-display text-3xl md:text-3xl lg:text-4xl italic" style={{ color: themeColors.charcoal }}>
            Acara Pernikahan
          </h2>
          <OrnamentDivider variant="gold" className="mt-4" />

          <p className="mt-6 font-display text-lg md:text-xl italic" style={{ color: themeColors.primary }}>
            {new Date(targetDate).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mb-16 mt-10 grid grid-cols-4 gap-3 md:gap-5"
          initial={fadeUpProps.initial}
          whileInView={fadeUpProps.whileInView}
          viewport={fadeUpProps.viewport}
          transition={fadeUpProps.transition}
        >
          <CountdownItem val={countdown.days} label="Hari" />
          <CountdownItem val={countdown.hours} label="Jam" />
          <CountdownItem val={countdown.minutes} label="Menit" />
          <CountdownItem val={countdown.seconds} label="Detik" />
        </motion.div>

        {/* Add to Calendar */}
        <motion.div
          className="mb-12 flex justify-center"
          {...fadeUpProps}
        >
          <motion.a
            href={googleCalendarUrl(events[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base shadow-sm transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
              color: themeColors.surface,
              boxShadow: `0 4px 16px rgba(139,58,66,0.25)`,
            }}
            whileHover={{ boxShadow: `0 8px 24px rgba(139,58,66,0.35)`, scale: 1.02 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Simpan Tanggalnya
          </motion.a>
        </motion.div>

        {/* Event cards */}
        <div className="space-y-6">
          {events.map((ev, i) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </section>
  );
}
