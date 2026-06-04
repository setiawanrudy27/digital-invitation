"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Siti & Ahmad",
    role: "Pengantin",
    initials: "SA",
    rating: 5,
    content:
      "Platform ini membuat acara pernikahan kami menjadi lebih berkesan. Tamu-tamu sangat menyukai undangan digital yang interaktif dan elegan!",
  },
  {
    name: "Putri Wijaya",
    role: "Wedding Organizer",
    initials: "PW",
    rating: 5,
    content:
      "Saya merekomendasikan Digital Invitation kepada semua klien saya. Fitur-fiturnya sangat lengkap dan mudah digunakan oleh siapa saja.",
  },
  {
    name: "Rudi Hartono",
    role: "Pengantin",
    initials: "RH",
    rating: 5,
    content:
      "Desainnya mewah dan pengalaman usernya smooth. Tidak perlu cetak undangan lagi, hemat biaya dan ramah lingkungan!",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
                Testimonials
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Testimoni dari Pengguna Kami
              </h2>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right max-w-sm">
              Ribuan pengguna puas telah membuat pengalaman undangan digital yang tak
              terlupakan
            </p>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                variant="glass"
                className="p-6 h-full flex flex-col relative overflow-hidden"
              >
                {/* Quote icon decoration */}
                <Quote className="absolute -top-2 -right-2 h-16 w-16 text-primary/5" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-foreground leading-relaxed mb-6 flex-1 relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-sm font-semibold text-primary">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border bg-surface/70 px-6 py-4 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <Star className="h-4 w-4 fill-warning text-warning" />
            <Star className="h-4 w-4 fill-warning text-warning" />
            <Star className="h-4 w-4 fill-warning text-warning" />
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="ml-1 font-semibold text-foreground">4.9</span> dari 5
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span>2.000+ ulasan positif</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>98% kepuasan pengguna</span>
        </motion.div>
      </div>
    </section>
  );
}
