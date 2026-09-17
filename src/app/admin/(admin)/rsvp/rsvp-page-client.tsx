// @ts-nocheck
"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye, EyeOff, MessageSquare, Users, UserCheck, UserX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/components/ui/use-confirm";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type RSVP = Database["public"]["Tables"]["rsvps"]["Row"];

interface RSVPPageProps {
  rsvps: RSVP[];
  invitationId: string;
}

export default function RSVPPageClient({ rsvps: initialRsvps }: RSVPPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [rsvps, setRsvps] = useState(initialRsvps);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredRsvps = useMemo(() => {
    if (!searchQuery.trim()) return rsvps;
    const q = searchQuery.toLowerCase();
    return rsvps.filter(
      (r) =>
        r.guest_name.toLowerCase().includes(q) ||
        (r.message || "").toLowerCase().includes(q)
    );
  }, [rsvps, searchQuery]);

  const paginatedRsvps = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRsvps.slice(start, start + pageSize);
  }, [filteredRsvps, page, pageSize]);

  const handleDelete = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus RSVP ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("rsvps").delete().eq("id", id);
      setRsvps((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    });
  };

  const [success, setSuccess] = useState(false);

  const toggleVisibility = async (rsvp: RSVP) => {
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      const { error } = await supabase
        .from("rsvps")
        .update({ is_visible: !rsvp.is_visible })
        .eq("id", rsvp.id);
      if (error) {
        alert("Gagal mengubah visibilitas: " + error.message);
        return;
      }
      setRsvps((prev) =>
        prev.map((r) => (r.id === rsvp.id ? { ...r, is_visible: !r.is_visible } : r))
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    });
  };

  const attending = rsvps?.filter((r) => r.attending).length ?? 0;
  const notAttending = rsvps?.filter((r) => !r.attending).length ?? 0;

  const statCards = [
    {
      label: "Total RSVP",
      value: rsvps?.length ?? 0,
      icon: Users,
      gradient: "from-brand-500 to-brand-600",
    },
    {
      label: "Hadir",
      value: attending,
      icon: UserCheck,
      gradient: "from-brand-400 to-brand-500",
    },
    {
      label: "Tidak Hadir",
      value: notAttending,
      icon: UserX,
      gradient: "from-brand-600 to-brand-700",
    },
  ];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">RSVP & Buku Tamu</h1>
        <p className="text-sm text-muted-foreground mt-1">Data konfirmasi kehadiran dan ucapan tamu</p>
      </div>

      {success && (
        <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success dark:border-success/40 dark:bg-success/20 dark:text-success">
          Visibilitas ucapan berhasil diperbarui
        </div>
      )}

      <motion.div
        className="grid gap-5 sm:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } }}
            >
            <Card variant="elevated" className="group relative overflow-hidden">
              <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${stat.gradient} opacity-5 blur-3xl`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm shadow-current/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground/40 transition-opacity duration-200 group-hover:opacity-100">
                    {stat.label.toLowerCase()}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</span>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {rsvps && rsvps.length > 0 ? (
        <DataTable
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari nama tamu atau ucapan..."
          total={filteredRsvps.length}
          page={page}
          onPageChange={setPage}
          pageSize={pageSize}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kehadiran</TableHead>
                  <TableHead className="hidden md:table-cell">Ucapan</TableHead>
                  <TableHead className="text-right w-40">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRsvps.length > 0 ? (
                paginatedRsvps.map((rsvp, index) => (
                  <TableRow key={rsvp.id}>
                    <TableCell className="text-xs text-muted-foreground/50">
                      {(page - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20 text-xs font-medium text-brand-600 dark:text-brand-400">
                          {rsvp.guest_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">{rsvp.guest_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rsvp.attending ? "success" : "destructive"} size="sm">
                        {rsvp.attending ? "Hadir" : "Tidak Hadir"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs hidden md:table-cell">
                      <span className="line-clamp-2">
                        {rsvp.message || <span className="text-muted-foreground/30">&mdash;</span>}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => toggleVisibility(rsvp)}
                          title={rsvp.is_visible ? "Sembunyikan" : "Tampilkan"}
                          className="text-muted-foreground/60 hover:text-foreground hover:bg-accent sm:max-lg:p-1.5"
                        >
                          {rsvp.is_visible ? <EyeOff className="h-4 w-4 sm:h-3.5 sm:w-3.5" /> : <Eye className="h-4 w-4 sm:h-3.5 sm:w-3.5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(rsvp.id)}
                          disabled={isPending}
                          title="Hapus"
                          className="text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 sm:max-lg:p-1.5"
                        >
                          <Trash2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
                      <Search className="h-6 w-6 text-brand-500" />
                    </div>
                    <p className="text-sm font-medium text-foreground">RSVP tidak ditemukan</p>
                    <p className="text-sm text-muted-foreground mt-1">Coba ubah kata kunci pencarian</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DataTable>
      ) : (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <MessageSquare className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada RSVP dari tamu</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Data RSVP akan muncul setelah tamu mengirimkan konfirmasi.</p>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
