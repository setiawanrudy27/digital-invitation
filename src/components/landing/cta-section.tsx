"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

const perks = [
  { icon: Clock, text: "Gratis 14 hari, tanpa komitmen" },
  { icon: Shield, text: "Data aman & terenkripsi" },
  { icon: Zap, text: "Setup dalam 2 menit" },
];

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-background">
      {/* Gradient background similar to admin brand area */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(73,16,139,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(226,110,229,0.06)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 border border-primary/12 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            Penawaran Terbatas
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Siap Membuat Undangan Digital{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Impian Anda?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Bergabunglah dengan ribuan pengguna yang telah menciptakan pengalaman
            undangan yang tak terlupakan. Mulai gratis hari ini!
          </p>

          {/* Perks row */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {perk.text}
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/admin">
              <Button size="lg" variant="gradient-brand" className="gap-2 px-8 w-full sm:w-auto">
                Mulai Gratis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 w-full sm:w-auto"
              >
                Sudah punya akun? Masuk
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
