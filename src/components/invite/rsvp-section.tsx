"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RSVP, Quote } from "@/components/invite/types";
import { themeColors, FloatingLeaves, OrnamentDivider, GoldBorderFrame, RoseOrnament } from "@/components/invite/decoratives";

interface RsvpSectionProps {
  invitationId: string;
  rsvps: RSVP[];
  quotes?: Quote[];
}

interface FormData {
  guest_name: string;
  attending: boolean | null;
  guest_count: number;
  message: string;
}

const emptyForm: FormData = {
  guest_name: "",
  attending: null,
  guest_count: 1,
  message: "",
};

export default function RsvpSection({ invitationId, rsvps, quotes = [] }: RsvpSectionProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [localRsvps, setLocalRsvps] = useState(rsvps);

  useEffect(() => {
    setLocalRsvps(rsvps);
  }, [rsvps]);

  const visibleRsvps = localRsvps.filter((r) => r.is_visible !== false);

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.guest_name.trim()) {
      setError("Nama harus diisi");
      return;
    }
    if (form.attending === null) {
      setError("Pilih status kehadiran");
      return;
    }

    setLoading(true);
    try {
      const { createPublicClient } = await import("@/lib/supabase/public-client");
      const supabase = createPublicClient();

      const { error: insertError } = await supabase.from("rsvps").insert({
        invitation_id: invitationId,
        guest_name: form.guest_name.trim(),
        attending: form.attending,
        guest_count: form.attending ? form.guest_count : 0,
        message: form.message.trim() || null,
      } as any);

      if (insertError) {
        console.error("RSVP insert error:", insertError);
        throw insertError;
      }

      setLocalRsvps((prev) => [
        {
          id: crypto.randomUUID(),
          invitation_id: invitationId,
          guest_name: form.guest_name.trim(),
          guest_slug: null,
          attending: form.attending,
          guest_count: form.attending ? form.guest_count : 0,
          message: form.message.trim() || null,
          is_visible: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as any,
        ...prev,
      ]);

      setSubmitted(true);
      setForm(emptyForm);
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : typeof err === "string" ? err : JSON.stringify(err);
      setError(msg || "Gagal mengirim RSVP");
    } finally {
      setLoading(false);
    }
  }, [form, invitationId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="rsvp" className="relative px-6 -mt-6 pb-20 sm:-mt-5 sm:pb-28 overflow-hidden vintage-bg watercolor-overlay"
    >
      <FloatingLeaves />
      <div className="mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="font-display text-3xl tracking-wide sm:text-4xl italic" style={{ color: themeColors.charcoal }}>
            Doa &amp; Ucapan
          </h2>
          <OrnamentDivider variant="gold" className="mt-3" />
          <p className="mt-6 text-sm leading-relaxed" style={{ color: themeColors.muted }}>
            Sapa dan kirim ucapan beserta doa yang terbaik untuk mereka yang berbahagia, sembari mengkonfirmasi kehadiran anda pada acara pernikahan kedua mempelai.
          </p>
        </motion.div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-3xl p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${themeColors.bg} 0%, ${themeColors.blush} 50%, ${themeColors.bg} 100%)`,
              border: `1px solid ${themeColors.primary}30`,
            }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColors.surface} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="mt-3 font-display text-lg" style={{ color: themeColors.charcoal }}>
              Terima kasih!
            </p>
            <p className="mt-1 text-sm" style={{ color: themeColors.primary }}>
              Konfirmasi kehadiran Anda telah tercatat.
            </p>
          </motion.div>
        )}

        <GoldBorderFrame className="mt-8 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: themeColors.text }}>
                Nama <span style={{ color: themeColors.primary }}>*</span>
              </label>
              <input
                type="text"
                value={form.guest_name}
                onChange={(e) => updateField("guest_name", e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: themeColors.surface,
                  borderColor: `rgba(201,168,76,0.25)`,
                  color: themeColors.text,
                }}
                onFocus={(e) => { e.target.style.borderColor = themeColors.gold; e.target.style.boxShadow = `0 0 0 3px rgba(201,168,76,0.12)`; }}
                onBlur={(e) => { e.target.style.borderColor = `rgba(201,168,76,0.25)`; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: themeColors.text }}>
                Kehadiran <span style={{ color: themeColors.primary }}>*</span>
              </label>
              <div className="flex gap-3">
                {(["Hadir", "Tidak Hadir"] as const).map((label) => {
                  const value = label === "Hadir";
                  const selected = form.attending === value;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        updateField("attending", value);
                        if (!value) updateField("guest_count", 0);
                        else if (form.guest_count < 1) updateField("guest_count", 1);
                      }}
                      className={cn(
                        "flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                        selected ? "text-white shadow-sm" : "hover:shadow-sm"
                      )}
                      style={{
                        backgroundColor: selected ? undefined : themeColors.surface,
                        borderColor: selected ? themeColors.primary : `rgba(201,168,76,0.25)`,
                        color: selected ? themeColors.surface : themeColors.muted,
                        background: selected ? `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})` : undefined,
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {form.attending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="mb-1.5 block text-sm font-medium" style={{ color: themeColors.text }}>
                  Jumlah Tamu
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.guest_count}
                  onChange={(e) => updateField("guest_count", Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    backgroundColor: themeColors.surface,
                    borderColor: `rgba(201,168,76,0.25)`,
                    color: themeColors.text,
                  }}
                  onFocus={(e) => { e.target.style.borderColor = themeColors.gold; e.target.style.boxShadow = `0 0 0 3px rgba(201,168,76,0.12)`; }}
                  onBlur={(e) => { e.target.style.borderColor = `rgba(201,168,76,0.25)`; e.target.style.boxShadow = "none"; }}
                />
              </motion.div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: themeColors.text }}>
                Pesan &amp; Doa
              </label>
              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Tuliskan doa dan harapan untuk kedua mempelai..."
                rows={4}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 resize-y"
                style={{
                  backgroundColor: themeColors.surface,
                  borderColor: `rgba(201,168,76,0.25)`,
                  color: themeColors.text,
                }}
                onFocus={(e) => { e.target.style.borderColor = themeColors.gold; e.target.style.boxShadow = `0 0 0 3px rgba(201,168,76,0.12)`; }}
                onBlur={(e) => { e.target.style.borderColor = `rgba(201,168,76,0.25)`; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: themeColors.primary }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-lg disabled:opacity-60"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                color: themeColors.surface,
              }}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        </GoldBorderFrame>

        {visibleRsvps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-12"
          >
            <h3 className="mb-6 text-center font-display text-lg italic" style={{ color: themeColors.charcoal }}>
              Ucapan &amp; Doa
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="max-h-[420px] space-y-4 overflow-y-auto overscroll-contain pr-1 scrollbar-thin"
            >
              {visibleRsvps.map((rsvp) => (
                <motion.div
                  key={rsvp.id}
                  variants={itemVariants}
                  initial={false}
                  className="rounded-2xl p-5 transition-all duration-200"
                  style={{
                    backgroundColor: themeColors.surface,
                    border: `1px solid rgba(201,168,76,0.15)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm" style={{ color: themeColors.text }}>
                        {rsvp.guest_name}
                      </p>
                      {rsvp.message && (
                        <p className="mt-2 text-sm leading-relaxed italic" style={{ color: themeColors.muted }}>
                          &ldquo;{rsvp.message}&rdquo;
                        </p>
                      )}
                    </div>
                    <span
                      className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: rsvp.attending ? `${themeColors.primary}15` : `${themeColors.muted}15`,
                        color: rsvp.attending ? themeColors.primary : themeColors.muted,
                      }}
                    >
                      {rsvp.attending ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill={themeColors.primary} className="mr-0.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      ) : null}
                      {rsvp.attending ? "Hadir" : "Tidak Hadir"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs" style={{ color: themeColors.secondary }}>
                    {new Date(rsvp.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {quotes.length > 2 && quotes[2] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <GoldBorderFrame className="p-8">
              <div className="font-script text-6xl leading-none" style={{ color: `${themeColors.gold}20` }}>
                &ldquo;
              </div>
              <blockquote className="-mt-4 font-display text-xl leading-relaxed italic sm:text-2xl" style={{ color: themeColors.charcoal }}>
                {quotes[2].text}
              </blockquote>
              {quotes[2].source && (
                <cite className="mt-4 block not-italic text-xs tracking-widest uppercase" style={{ color: themeColors.muted }}>
                  &mdash; {quotes[2].source}
                </cite>
              )}
            </GoldBorderFrame>
          </motion.div>
        )}
      </div>
    </section>
  );
}
