"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Buat Akun",
    description: "Daftar dengan email Anda dan mulai membuat undangan digital pertama",
    items: ["Daftar gratis 14 hari", "Tidak perlu kartu kredit", "Setup 2 menit"],
  },
  {
    number: "02",
    title: "Pilih Template",
    description: "Pilih dari koleksi template indah atau mulai dari awal dengan editor kustom",
    items: ["50+ template premium", "Editor drag-and-drop", "Kustomisasi penuh"],
  },
  {
    number: "03",
    title: "Personalisasi",
    description: "Tambahkan foto, musik, cerita, dan detail acara Anda dengan mudah",
    items: ["Upload foto & video", "Musik latar", "Love story timeline"],
  },
  {
    number: "04",
    title: "Bagikan",
    description: "Bagikan link undangan ke tamu melalui WhatsApp, email, atau media sosial",
    items: ["Link unik per tamu", "RSVP otomatis", "Tracking real-time"],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-secondary/50">
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
                Quick Start Guide
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Cara Menggunakan Platform Kami
              </h2>
            </div>
            <p className="text-sm text-muted-foreground sm:text-right max-w-sm">
              Proses yang sederhana dan cepat untuk membuat undangan digital yang memukau
            </p>
          </div>
        </motion.div>

        {/* Steps as admin setup wizard */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="absolute left-6 top-0 bottom-0 hidden lg:block w-px bg-gradient-to-b from-primary/20 via-accent/20 to-primary/20" />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" className="relative lg:ml-16 p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    {/* Step number badge */}
                    <div className="flex-shrink-0">
                      <div className="hidden lg:flex absolute -left-16 top-6 h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-md">
                        {step.number}
                      </div>
                      <div className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      <ul className="space-y-1.5">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connector arrow */}
                    {index < steps.length - 1 && (
                      <div className="hidden sm:flex flex-shrink-0 self-center sm:self-start mt-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link href="/admin">
            <Button size="lg" className="gap-2">
              Mulai Sekarang — Gratis 14 Hari
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
