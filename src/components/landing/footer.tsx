"use client";

import Link from "next/link";
import { Heart, Mail, ArrowUp } from "lucide-react";

const footerLinks = [
  {
    title: "Produk",
    links: [
      { label: "Fitur", href: "#features" },
      { label: "Cara Kerja", href: "#how-it-works" },
      { label: "Harga", href: "#pricing" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Hubungi Kami", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privasi", href: "#privacy" },
      { label: "Syarat & Ketentuan", href: "#terms" },
      { label: "Kebijakan Cookies", href: "#cookies" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-10">
          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold font-display text-white">
                Digital Invitation
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed mb-4">
              Platform undangan digital berbasis AI untuk menciptakan pengalaman yang
              personal, interaktif, dan tak terlupakan bagi setiap tamu spesial Anda.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Mail className="h-4 w-4" />
              hello@digitalinvitation.com
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white/90 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50">
          <p>
            &copy; {currentYear} Digital Invitation. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p>
              Made with{" "}
              <Heart
                className="inline h-3.5 w-3.5 text-accent"
                fill="currentColor"
              />{" "}
              for special moments
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowUp className="h-4 w-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
