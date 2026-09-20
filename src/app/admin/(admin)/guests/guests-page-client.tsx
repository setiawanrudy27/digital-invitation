// @ts-nocheck
"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, MessageCircle, Upload, Copy, Download, UserPlus, Search, Mail, Phone, MapPin, Check, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useConfirm } from "@/components/ui/use-confirm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";
import * as XLSX from "xlsx";

type Guest = Database["public"]["Tables"]["guests"]["Row"];

interface GuestsPageProps {
  guests: Guest[];
  invitationSlug: string;
  invitationId: string;
  whatsappTemplate: string | null;
}

export default function GuestsPageClient({ guests: initialGuests, invitationId, whatsappTemplate }: GuestsPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [guests, setGuests] = useState(initialGuests);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showImport, setShowImport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [copiedGuestId, setCopiedGuestId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    guest_from: "",
  });
  const pageSize = 20;

  const GUEST_SOURCE_COLORS: string[] = [
    "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/60 dark:text-red-200 dark:border-red-800",
    "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800",
    "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-950/60 dark:text-yellow-200 dark:border-yellow-800",
    "bg-green-100 text-green-700 border-green-300 dark:bg-green-950/60 dark:text-green-200 dark:border-green-800",
    "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800",
    "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-200 dark:border-purple-800",
    "bg-[#e9dcc8] text-[#7c5a34] border-[#d8c4a3] dark:bg-[#3d2c16]/70 dark:text-[#e5cfa8] dark:border-[#5a4222]",
    "bg-pink-200 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-200 dark:border-pink-800",
    "bg-neutral-700 text-neutral-100 border-neutral-500 dark:bg-neutral-200 dark:text-neutral-800 dark:border-neutral-400",
    "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
  ];

  const getSourceColorClass = (source: string) => {
    if (source === "Tidak Diketahui") {
      return "border-dashed border-border bg-muted/40 text-muted-foreground";
    }
    let hash = 0;
    for (let i = 0; i < source.length; i++) {
      hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
    }
    return GUEST_SOURCE_COLORS[hash % GUEST_SOURCE_COLORS.length];
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const filteredGuests = useMemo(() => {
    let result = guests;
    if (selectedSources.length > 0) {
      result = result.filter((g) => selectedSources.includes((g.guest_from || "").trim()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          (g.email || "").toLowerCase().includes(q) ||
          (g.address || "").toLowerCase().includes(q) ||
          (g.guest_from || "").toLowerCase().includes(q) ||
          (g.phone || "").includes(q)
      );
    }
    return result;
  }, [guests, searchQuery, selectedSources]);

  const sourceOptions = useMemo(() => {
    const set = new Set<string>();
    guests.forEach((g) => {
      const s = (g.guest_from || "").trim();
      if (s) set.add(s);
    });
    return Array.from(set).sort();
  }, [guests]);

  const paginatedGuests = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredGuests.slice(start, start + pageSize);
  }, [filteredGuests, page, pageSize]);

  const guestRecap = useMemo(() => {
    const sourceMap = new Map<string, number>();
    guests.forEach((g) => {
      const source = (g.guest_from || "").trim() || "Tidak Diketahui";
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    });
    const bySource = Array.from(sourceMap.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);
    return { total: guests.length, bySource };
  }, [guests]);

  const generateInviteLink = (guest: Guest) => {
    return `${siteUrl}/invite/g/${guest.slug}`;
  };

  const generateWhatsAppMessage = (guest: Guest) => {
    const link = generateInviteLink(guest);
    if (whatsappTemplate) {
      let message = whatsappTemplate;
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;left:-9999px;top:-9999px";
      el.innerHTML = message;
      document.body.appendChild(el);
      message = el.innerText || el.textContent || "";
      document.body.removeChild(el);
      message = message
        .replace(/{{guest_name}}/g, guest.name)
        .replace(/{{invite_link}}/g, link);
      return message;
    }
    return `Halo ${guest.name}, kami mengundang Anda ke pernikahan kami. Lihat undangan di: ${link}`;
  };

  const encodeUTF8 = (str: string) => {
    let encoded = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code >= 0x41 && code <= 0x5A || code >= 0x61 && code <= 0x7A || code >= 0x30 && code <= 0x39 || code === 0x2D || code === 0x5F || code === 0x2E || code === 0x7E) {
        encoded += str[i];
      } else if (code < 128) {
        encoded += "%" + code.toString(16).toUpperCase().padStart(2, "0");
      } else if (code < 2048) {
        encoded += "%" + (192 | (code >> 6)).toString(16).toUpperCase();
        encoded += "%" + (128 | (code & 63)).toString(16).toUpperCase();
      } else if (code >= 55296 && code <= 56319) {
        const high = code;
        const low = str.charCodeAt(++i);
        const full = ((high - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        encoded += "%" + (240 | ((full >> 18) & 0x07)).toString(16).toUpperCase();
        encoded += "%" + (128 | ((full >> 12) & 0x3F)).toString(16).toUpperCase();
        encoded += "%" + (128 | ((full >> 6) & 0x3F)).toString(16).toUpperCase();
        encoded += "%" + (128 | (full & 0x3F)).toString(16).toUpperCase();
      } else {
        encoded += "%" + (224 | (code >> 12)).toString(16).toUpperCase();
        encoded += "%" + (128 | ((code >> 6) & 63)).toString(16).toUpperCase();
        encoded += "%" + (128 | (code & 63)).toString(16).toUpperCase();
      }
    }
    return encoded;
  };

  const trackShare = async (guest: Guest) => {
    const newCount = (guest.shared_count || 0) + 1;
    setGuests((prev) =>
      prev.map((g) => (g.id === guest.id ? { ...g, shared_count: newCount } : g))
    );
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("guests").update({ shared_count: newCount }).eq("id", guest.id);
    });
  };

  const sendWhatsApp = (guest: Guest) => {
    const message = generateWhatsAppMessage(guest);
    const phone = guest.phone?.replace(/[^0-9]/g, "");
    const formattedPhone = phone?.startsWith("0") ? "62" + phone.slice(1) : phone;
    const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeUTF8(message)}`;
    window.open(url, "_blank");
    trackShare(guest);
  };

  const copyInviteLink = (guest: Guest) => {
    const link = generateInviteLink(guest);
    navigator.clipboard.writeText(link);
    setCopiedGuestId(guest.id);
    setTimeout(() => setCopiedGuestId(null), 2000);
    trackShare(guest);
  };

  const generateSlug = (name: string) => {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 45);
    const suffix = Math.random().toString(36).substring(2, 6);
    return `${base}-${suffix}`;
  };

  const resetForm = () => {
    setFormData({ name: "", address: "", phone: "", email: "", guest_from: "" });
    setEditingGuest(null);
    setShowForm(false);
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest);
    setFormData({
      name: guest.name,
      address: guest.address || "",
      phone: guest.phone || "",
      email: guest.email || "",
      guest_from: guest.guest_from || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());

      if (editingGuest) {
        const slug = formData.name !== editingGuest.name
          ? generateSlug(formData.name)
          : editingGuest.slug;
        const updatedData = {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          guest_from: formData.guest_from,
          slug: slug,
        };
        const { error } = await supabase
          .from("guests")
          .update(updatedData)
          .eq("id", editingGuest.id);
        if (!error) {
          const { data } = await supabase
            .from("guests")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("name", { ascending: true });
          if (data) setGuests(data);
          resetForm();
        }
      } else {
        const slug = generateSlug(formData.name);
        if (!slug) {
          alert("Nama tamu tidak valid untuk membuat slug");
          return;
        }
        const { error } = await supabase
          .from("guests")
          .insert({ ...formData, slug, invitation_id: invitationId });
        if (!error) {
          const { data } = await supabase
            .from("guests")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("name", { ascending: true });
          if (data) setGuests(data);
          resetForm();
        }
      }
      router.refresh();
    });
  };

  const handleDelete = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus tamu ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("guests").delete().eq("id", id);
      setGuests((prev) => prev.filter((g) => g.id !== id));
      router.refresh();
    });
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      const reader = new FileReader();
      reader.onload = async (event) => {
        const workbook = XLSX.read(event.target?.result, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data: Array<{ Nama?: string; Alamat?: string; Telepon?: string; Email?: string; "Tamu Dari"?: string }> =
          XLSX.utils.sheet_to_json(worksheet);

        const guestsToInsert = data
          .filter((row) => row.Nama)
          .map((row) => ({
            name: row.Nama,
            address: row.Alamat || "",
            phone: row.Telepon || "",
            email: row.Email || "",
            guest_from: row["Tamu Dari"] || "",
            slug: generateSlug(row.Nama),
            invitation_id: invitationId,
          }));

        if (guestsToInsert.length > 0) {
          await supabase.from("guests").insert(guestsToInsert);
          const { data: updated } = await supabase
            .from("guests")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("name", { ascending: true });
          if (updated) setGuests(updated);
          setShowImport(false);
        }
      };
      reader.readAsArrayBuffer(file);
      router.refresh();
    });
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { Nama: "", Alamat: "", Telepon: "", Email: "", "Tamu Dari": "" },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tamu");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "template_tamu.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleSourceFilterChange = (value: string) => {
    setSelectedSources((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
    setPage(1);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tamu Undangan</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola daftar tamu undangan</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={downloadTemplate}>
            <Download className="h-4 w-4" />
            Download Template
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowImport(true)}>
            <Upload className="h-4 w-4" />
            Import Excel
          </Button>
          <Button onClick={() => {
            setShowForm(true);
            setShowImport(false);
          }}>
            <Plus className="h-4 w-4" />
            Tambah Tamu
          </Button>
        </div>
      </div>

      {showImport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Import Tamu dari Excel</CardTitle>
                <CardDescription>
                  Format Excel: Kolom <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Nama</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Alamat</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Telepon</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Email</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Tamu Dari</code>
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowImport(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-input bg-background p-8 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/30 dark:hover:border-brand-700 dark:hover:bg-brand-900/10">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImportExcel}
                disabled={isPending}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Klik untuk upload file Excel</p>
                <p className="text-xs text-muted-foreground">.xlsx atau .xls</p>
              </div>
            </label>
          </CardContent>
        </Card>
      )}

      {showForm && (
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingGuest ? "Edit Tamu" : "Tambah Tamu Baru"}</CardTitle>
                <CardDescription>Lengkapi data tamu undangan</CardDescription>
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
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest_from">Tamu Dari</Label>
                  <Input
                    id="guest_from"
                    value={formData.guest_from}
                    onChange={(e) => setFormData({ ...formData, guest_from: e.target.value })}
                    placeholder="Misal: Sisi mempelai pria"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
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

      {guests.length > 0 && (
        <Card variant="flat">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20">
                <Users className="h-4 w-4 text-brand-500" />
              </div>
              <h2 className="text-sm font-semibold">Rekapan Tamu</h2>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-xl bg-brand-600 dark:bg-brand-500 px-4 py-2.5 text-center">
                <p className="text-lg font-bold leading-none text-white">{guestRecap.total}</p>
                <p className="mt-1 text-[11px] font-medium text-white/80">Total Tamu</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">Tamu Dari:</span>
              {guestRecap.bySource.map((item) => (
                <div
                  key={item.source}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 ${getSourceColorClass(item.source)}`}
                >
                  <span className="rounded bg-white/70 px-1.5 py-px text-xs font-bold leading-tight dark:bg-black/25">
                    {item.count}
                  </span>
                  <span className="text-xs font-medium">{item.source}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {guests.length > 0 && sourceOptions.length > 0 && (
        <Card variant="flat">
          <CardContent className="py-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20">
                <Users className="h-4 w-4 text-brand-500" />
              </div>
              <h2 className="text-sm font-semibold">Filter Tamu Dari</h2>
              {selectedSources.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedSources([]);
                    setPage(1);
                  }}
                  className="ml-auto h-8 text-xs text-muted-foreground hover:text-destructive"
                >
                  Hapus Filter ({selectedSources.length})
                </Button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sourceOptions.map((source) => {
                const active = selectedSources.includes(source);
                return (
                  <button
                    key={source}
                    type="button"
                    role="checkbox"
                    aria-checked={active}
                    onClick={() => handleSourceFilterChange(source)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      active
                        ? `${getSourceColorClass(source)} shadow-sm`
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-muted-foreground/50 bg-white dark:bg-background"
                      }`}
                    >
                      {active && <Check className="h-3 w-3" />}
                    </span>
                    {source}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {guests.length > 0 ? (
        <DataTable
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari nama, email, atau alamat..."
          total={filteredGuests.length}
          page={page}
          onPageChange={setPage}
          pageSize={pageSize}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">No Telepon</TableHead>
                <TableHead className="hidden lg:table-cell">Tamu Dari</TableHead>
                <TableHead className="w-44 text-left">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedGuests.length > 0 ? (
                paginatedGuests.map((guest, index) => (
                  <TableRow key={guest.id}>
                    <TableCell className="text-xs text-muted-foreground/50">
                      {(page - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20 text-xs font-medium text-brand-600 dark:text-brand-400">
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-foreground">{guest.name}</span>
                          <div className="mt-1 flex flex-col gap-0.5 lg:hidden">
                            {guest.phone && (
                              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3 shrink-0" />
                                <span className="truncate">{guest.phone}</span>
                              </span>
                            )}
                            {guest.guest_from && (
                              <span
                                className={`inline-flex items-center gap-1 truncate rounded px-1.5 py-0.5 text-[11px] font-medium border ${getSourceColorClass(guest.guest_from)}`}
                              >
                                <Users className="h-3 w-3 shrink-0" />
                                <span className="truncate">{guest.guest_from}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.address ? (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                          <span className="truncate max-w-48">{guest.address}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {guest.email ? (
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                          <span className="truncate max-w-36">{guest.email}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                      {guest.phone ? (
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                          <span>{guest.phone}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                      {guest.guest_from ? (
                        <span
                          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium border truncate max-w-36 ${getSourceColorClass(guest.guest_from)}`}
                        >
                          <span className="truncate">{guest.guest_from}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1.5">
                        {(guest.shared_count || 0) > 0 && (
                          <Badge
                            variant="success"
                            size="sm"
                            title={`Link undangan telah dikirim sebanyak ${guest.shared_count}x`}
                            className="gap-0.5 shrink-0"
                          >
                            {guest.shared_count}x
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => sendWhatsApp(guest)}
                          disabled={!guest.phone}
                          title="Kirim WhatsApp"
                          className="text-muted-foreground/60 hover:text-success hover:bg-success/10 sm:max-lg:p-1.5"
                        >
                          <MessageCircle className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => copyInviteLink(guest)}
                          title={copiedGuestId === guest.id ? "Tersalin" : "Salin Link"}
                          className="text-muted-foreground/60 hover:text-foreground hover:bg-accent sm:max-lg:p-1.5"
                        >
                          {copiedGuestId === guest.id ? (
                            <Check className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-success" />
                          ) : (
                            <Copy className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleEdit(guest)}
                          title="Edit"
                          className="text-muted-foreground/60 hover:text-warning hover:bg-warning/10 sm:max-lg:p-1.5"
                        >
                          <Pencil className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(guest.id)}
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
                  <TableCell colSpan={7} className="py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
                      <Search className="h-6 w-6 text-brand-500" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Tamu tidak ditemukan</p>
                    <p className="text-sm text-muted-foreground mt-1">Coba ubah kata kunci pencarian</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DataTable>
      ) : !showForm ? (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <UserPlus className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada data tamu</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Klik tombol &quot;Tambah Tamu&quot; atau &quot;Import Excel&quot; untuk memulai.</p>
          </CardContent>
        </Card>
      ) : null}
      {confirmDialog}
    </div>
  );
}
