// @ts-nocheck
"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff, X, MessageSquare, Users, UserCheck, UserX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/components/ui/use-confirm";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function RSVPPageClient({ rsvps: initialRsvps, invitationId }: RSVPPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [rsvps, setRsvps] = useState(initialRsvps);
  const [editingRsvp, setEditingRsvp] = useState<RSVP | null>(null);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    guest_name: "",
    attending: true,
    guest_count: 1,
    message: "",
  });
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

  const totalPages = Math.max(1, Math.ceil(filteredRsvps.length / pageSize));
  const paginatedRsvps = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRsvps.slice(start, start + pageSize);
  }, [filteredRsvps, page, pageSize]);

  const resetForm = () => {
    setFormData({ guest_name: "", attending: true, guest_count: 1, message: "" });
    setEditingRsvp(null);
  };

  const handleEdit = (rsvp: RSVP) => {
    setEditingRsvp(rsvp);
    setFormData({
      guest_name: rsvp.guest_name,
      attending: rsvp.attending,
      guest_count: rsvp.guest_count,
      message: rsvp.message || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());

      if (editingRsvp) {
        const { error } = await supabase
          .from("rsvps")
          .update(formData)
          .eq("id", editingRsvp.id);
        if (!error) {
          const { data } = await supabase
            .from("rsvps")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("created_at", { ascending: false });
          if (data) setRsvps(data);
          resetForm();
        }
      }
    });
  };

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

      {editingRsvp && (
        <Card variant="elevated">
          <CardHeader>
                <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                  <Pencil className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Edit RSVP</CardTitle>
                  <CardDescription>Edit konfirmasi kehadiran dan ucapan tamu</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm} className="shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="guest_name">Nama Tamu</Label>
                  <Input
                    id="guest_name"
                    value={formData.guest_name}
                    onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest_count">Jumlah Tamu</Label>
                  <Input
                    id="guest_count"
                    type="number"
                    value={formData.guest_count}
                    onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Konfirmasi Kehadiran</Label>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-input px-4 py-3 has-[:checked]:border-success has-[:checked]:bg-success/10 dark:has-[:checked]:border-success dark:has-[:checked]:bg-success/20 transition-all duration-200">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending}
                      onChange={() => setFormData({ ...formData, attending: true })}
                      className="h-4 w-4 text-success accent-success"
                    />
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">Hadir</span>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-input px-4 py-3 has-[:checked]:border-destructive has-[:checked]:bg-destructive/10 dark:has-[:checked]:border-destructive dark:has-[:checked]:bg-destructive/20 transition-all duration-200">
                    <input
                      type="radio"
                      name="attending"
                      checked={!formData.attending}
                      onChange={() => setFormData({ ...formData, attending: false })}
                      className="h-4 w-4 text-destructive accent-destructive"
                    />
                    <div className="flex items-center gap-2">
                      <UserX className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Tidak Hadir</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Ucapan</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ucapan dari tamu..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isPending} loading={isPending}>
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

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
                          onClick={() => handleEdit(rsvp)}
                          title="Edit"
                          className="text-muted-foreground/60 hover:text-warning hover:bg-warning/10 sm:max-lg:p-1.5"
                        >
                          <Pencil className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
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
