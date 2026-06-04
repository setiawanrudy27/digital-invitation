"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Palette,
  Users,
  Music,
  Image,
  Gift,
  MessageCircle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Powered by AI",
    description: "Teknologi AI terdepan untuk membuat undangan yang personal dan unik",
    stat: "AI Generatif",
  },
  {
    icon: Palette,
    title: "Desain Customizable",
    description: "Pilih dari berbagai template atau buat desain sendiri dengan mudah",
    stat: "50+ Template",
  },
  {
    icon: Users,
    title: "Management Tamu",
    description: "Kelola daftar tamu dan tracking RSVP dengan dashboard yang intuitif",
    stat: "RSVP Otomatis",
  },
  {
    icon: Music,
    title: "Background Music",
    description: "Tambahkan musik latar untuk menciptakan suasana yang sempurna",
    stat: "Audio Player",
  },
  {
    icon: Image,
    title: "Galeri Mewah",
    description: "Tampilkan foto dan video dengan galeri yang indah dan responsif",
    stat: "HD Gallery",
  },
  {
    icon: Gift,
    title: "Gift Registry",
    description: "Kelola daftar hadiah dan kirim undangan ke vendor pilihan",
    stat: "QRIS Support",
  },
  {
    icon: MessageCircle,
    title: "Ucapan Tamu",
    description: "Buat halaman ucapan dan cerita untuk kenangan bersama tamu",
    stat: "Guestbook",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Pantau metrik penting dan engagement dengan analitik real-time",
    stat: "Live Report",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — admin panel style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                Platform Features
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Fitur Lengkap untuk Undangan Sempurna
              </h2>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right max-w-sm">
              Semua alat yang Anda butuhkan untuk menciptakan pengalaman undangan yang
              tak terlupakan
            </p>
          </div>
        </motion.div>

        {/* Features grid — admin card style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {feature.description}
                </p>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-primary">
                  {feature.stat}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
