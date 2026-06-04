"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Heart, Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Fitur", href: "#features" },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Harga", href: "#pricing" },
];

export function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle admin bg pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,rgba(73,16,139,0.06)_0%,transparent_50%),radial-gradient(circle_at_82%_18%,rgba(226,110,229,0.04)_0%,transparent_50%)]" />

      {/* Admin-style top navigation */}
      <nav className="relative z-30 border-b border-border bg-surface/95 backdrop-blur-md supports-backdrop-blur:bg-surface/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-bold font-display text-foreground">
              Digital Invitation
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin/login">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-border bg-surface px-4 pb-4 pt-2 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <Link href="/admin/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href="/admin" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28">
        {/* Dashboard-like header row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface/70 px-6 py-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <LayoutDashboard className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Halo, Selamat Datang</p>
              <p className="text-xs text-muted-foreground">Platform Undangan Digital Terdepan</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Sistem Aktif
            </span>
            <Link href="/admin">
              <Button size="sm" className="gap-2">
                Mulai Sekarang
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 border border-primary/12 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Platform Undangan Digital #1 di Indonesia
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground"
            >
              Undangan Digital
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                yang Interaktif & Elegan
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Platform undangan digital berbasis AI yang memungkinkan Anda membuat
              pengalaman undangan yang personal, interaktif, dan tak terlupakan untuk
              setiap tamu spesial Anda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/admin">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Masuk ke Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Dashboard-like stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Card variant="glass" className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Pengguna</p>
                <p className="mt-1 text-3xl font-bold font-display text-foreground">1.000+</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  +12% minggu ini
                </div>
              </Card>
              <Card variant="glass" className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Undangan Dibuat</p>
                <p className="mt-1 text-3xl font-bold font-display text-foreground">5.000+</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  +8% minggu ini
                </div>
              </Card>
              <Card variant="glass" className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kepuasan</p>
                <p className="mt-1 text-3xl font-bold font-display text-foreground">98%</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  Rating 4.9/5
                </div>
              </Card>
              <Card variant="glass" className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Aktif Hari Ini</p>
                <p className="mt-1 text-3xl font-bold font-display text-foreground">2.4K</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  Online sekarang
                </div>
              </Card>
            </div>

            {/* Activity card */}
            <Card variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Aktivitas Terbaru</p>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Undangan Baru Dibuat", time: "2 menit lalu" },
                  { label: "RSVP Masuk", time: "15 menit lalu" },
                  { label: "Pembayaran Gifts", time: "1 jam lalu" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
