"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Heart,
  CalendarDays,
  Users,
  Image,
  BookOpen,
  Quote,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "@/app/admin/actions";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: "Konten Undangan",
    items: [
      { href: "/admin/couples", label: "Mempelai", icon: Heart },
      { href: "/admin/events", label: "Acara", icon: CalendarDays },
    ],
  },
  {
    label: "Tamu & Interaksi",
    items: [
      { href: "/admin/guests", label: "Tamu Undangan", icon: Users },
      { href: "/admin/rsvp", label: "RSVP & Buku Tamu", icon: MessageSquare },
    ],
  },
  {
    label: "Media & Informasi",
    items: [
      { href: "/admin/gallery", label: "Galeri", icon: Image },
      { href: "/admin/love-stories", label: "Cerita Cinta", icon: BookOpen },
      { href: "/admin/quotes", label: "Quote", icon: Quote },
    ],
  },
  {
    label: "Administrasi",
    items: [
      { href: "/admin/gifts", label: "Rekening / Gift", icon: CreditCard },
      { href: "/admin/settings", label: "Pengaturan", icon: Settings },
    ],
  },
];

const dashboardItem: SidebarItem = {
  href: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
};

interface SidebarProps {
  userEmail: string;
}

export function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const timer = window.setTimeout(closeMobile, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, closeMobile]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, closeMobile]);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden flex items-center justify-center h-11 w-11 rounded-3xl bg-[#49108B] text-white shadow-lg hover:bg-[#5D209C] transition-all duration-200"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#1A1A2E]/70 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#49108B] border-r border-white/[0.06] shadow-[4px_0_24px_-8px_rgba(0,0,0,0.20)] transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex h-24 items-center justify-between px-6 border-b border-white/[0.08]">
          <Link href="/admin" className="flex items-center gap-3" onClick={closeMobile}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#49108B] shadow-lg">
              <Heart className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">Invitation</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">Maison</span>
            </div>
          </Link>
          <button
            onClick={closeMobile}
            className="flex lg:hidden items-center justify-center h-10 w-10 rounded-xl border border-white/15 bg-white/8 text-white/70 hover:text-white hover:bg-white/12 transition-all duration-200"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-5">
          <motion.div
            className="space-y-1"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}>
              <Link
                href={dashboardItem.href}
                onClick={closeMobile}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(dashboardItem.href)
                    ? "bg-[#E26EE5]/20 text-white shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/8"
                }`}
              >
                <dashboardItem.icon className={`h-4.5 w-4.5 transition-colors ${
                  isActive(dashboardItem.href)
                    ? "text-[#E26EE5]"
                    : "text-white/50 group-hover:text-[#E26EE5]"
                }`} />
                <span>{dashboardItem.label}</span>
              </Link>
            </motion.div>
          </motion.div>

          {sidebarGroups.map((group) => (
            <motion.div
              key={group.label}
              className="space-y-1"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.07 } },
              }}
            >
              <motion.div
                className="px-4 pt-1"
                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40 select-none">
                  {group.label}
                </p>
              </motion.div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-[#E26EE5]/20 text-white shadow-sm"
                          : "text-white/70 hover:text-white hover:bg-white/8"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-1 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-[#E26EE5]" />
                      )}
                      <Icon className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                        active ? "text-[#E26EE5]" : "text-white/50 group-hover:text-[#E26EE5]"
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </nav>

        <div className="border-t border-white/[0.08] px-3 py-5">
          <div className="rounded-xl border border-white/10 bg-white/8 p-3.5">
            <p className="text-sm font-medium text-white truncate leading-tight">{userEmail}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-white/40">Admin account</p>
          </div>
          <form action={logout} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/12 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
