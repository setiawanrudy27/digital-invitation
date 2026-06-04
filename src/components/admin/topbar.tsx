"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageNames: Record<string, string> = {
  admin: "Dashboard",
  couples: "Mempelai",
  events: "Acara",
  guests: "Tamu",
  rsvp: "RSVP",
  gallery: "Galeri",
  "love-stories": "Cerita Cinta",
  quotes: "Quote",
  gifts: "Gift",
  settings: "Pengaturan",
};

function formatBreadcrumb(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Dashboard", href: "/admin" }];

  if (segments.length > 1) {
    const page = segments[1];
    crumbs.push({ label: pageNames[page] ?? page.replace("-", " "), href: pathname });
  }

  return crumbs;
}

export function AdminTopbar() {
  const pathname = usePathname();
  const breadcrumbs = formatBreadcrumb(pathname);
  const current = breadcrumbs[breadcrumbs.length - 1];

  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-[#C3ACD0]/20 bg-[#FFFBF5]/95 backdrop-blur-xl shadow-[0_10px_30px_-22px_rgba(103,65,136,0.14)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mx-auto flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#9CA3AF]">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="inline-flex items-center gap-2">
                {index > 0 && <span className="text-[#C3ACD0]">/</span>}
                {index === 0 ? (
                  <Link href={crumb.href} className="text-[#5E548E] transition hover:text-[#4B3F72]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#5B5563]">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-[#4B3F72] sm:text-4xl">
              {current.label}
            </h2>
            <span className="rounded-full border border-[#C3ACD0]/40 bg-[#FFFBF5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#674188]">
              Premium
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 text-[#9CA3AF] -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search admin"
              placeholder="Search guests, events, or gallery"
              className="h-11 min-w-[240px] rounded-full border border-[#C3ACD0]/35 bg-[#FFFBF5] px-4 pl-11 text-sm text-[#5B5563] placeholder:text-[#9CA3AF] shadow-sm transition focus:border-[#674188] focus:outline-none focus:ring-2 focus:ring-[#674188]/15"
            />
          </div>
          <Button variant="secondary" size="sm" className="rounded-full px-5 py-3 text-[#5B5563] border border-[#C3ACD0]/35 bg-[#FFFBF5] hover:bg-[#F3EDF8] shadow-sm">
            New section
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C3ACD0]/35 bg-[#FFFBF5] text-[#674188] shadow-sm transition hover:shadow-md"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#C3ACD0]/35 bg-[#FFFBF5] px-4 py-3 text-sm font-medium text-[#5B5563] shadow-sm transition hover:shadow-md"
          >
            <span>Admin</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
