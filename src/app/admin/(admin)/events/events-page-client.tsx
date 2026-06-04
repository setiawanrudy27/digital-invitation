// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, MapPin, Calendar, Globe, Map as MapIcon, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/components/ui/use-confirm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Database } from "@/lib/supabase/database.types";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface EventsPageProps {
  events: Event[];
  invitationId: string;
}

export default function EventsPageClient({ events: initialEvents, invitationId }: EventsPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    until_finish: false,
    timezone: "Asia/Jakarta",
    place_name: "",
    google_maps_link: "",
    address: "",
    is_visible: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      start_date: "",
      end_date: "",
      until_finish: false,
      timezone: "Asia/Jakarta",
      place_name: "",
      google_maps_link: "",
      address: "",
      is_visible: true,
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      start_date: event.start_date ? event.start_date.slice(0, 16) : "",
      end_date: event.end_date ? event.end_date.slice(0, 16) : "",
      until_finish: event.until_finish,
      timezone: event.timezone,
      place_name: event.place_name || "",
      google_maps_link: event.google_maps_link || "",
      address: event.address || "",
      is_visible: event.is_visible,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      const data = {
        invitation_id: invitationId,
        ...formData,
        start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
        end_date: formData.until_finish ? null : (formData.end_date ? new Date(formData.end_date).toISOString() : null),
      };

      if (editingEvent) {
        const { error } = await supabase.from("events").update(data).eq("id", editingEvent.id);
        if (!error) {
          const { data: updated } = await supabase
            .from("events")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("start_date", { ascending: true });
          if (updated) setEvents(updated);
          resetForm();
        }
      } else {
        const { error } = await supabase.from("events").insert(data);
        if (!error) {
          const { data: updated } = await supabase
            .from("events")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("start_date", { ascending: true });
          if (updated) setEvents(updated);
          resetForm();
        }
      }
      router.refresh();
    });
  };

  const handleDelete = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus acara ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("events").delete().eq("id", id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      router.refresh();
    });
  };

  const toggleVisibility = async (event: Event) => {
    const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
    await supabase
      .from("events")
      .update({ is_visible: !event.is_visible })
      .eq("id", event.id);
    setEvents((prev) =>
      prev.map((ev) => (ev.id === event.id ? { ...ev, is_visible: !ev.is_visible } : ev))
    );
    router.refresh();
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Acara</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola data acara pernikahan</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Tambah Acara
        </Button>
      </div>

      {showForm && (
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingEvent ? "Edit Acara" : "Tambah Acara Baru"}</CardTitle>
                <CardDescription>Lengkapi detail acara pernikahan</CardDescription>
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
                  <Label htmlFor="title">Judul Acara</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Akad Nikah / Resepsi"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Waktu</Label>
                  <Select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option value="Asia/Jakarta">WIB (Asia/Jakarta)</option>
                    <option value="Asia/Makassar">WITA (Asia/Makassar)</option>
                    <option value="Asia/Jayapura">WIT (Asia/Jayapura)</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_date">Tanggal & Waktu Mulai</Label>
                  <Input
                    id="start_date"
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">Tanggal & Waktu Selesai</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    disabled={formData.until_finish}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-1">
                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.until_finish}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      until_finish: !formData.until_finish,
                      end_date: !formData.until_finish ? "" : formData.end_date,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    formData.until_finish ? "bg-brand-600" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                      formData.until_finish ? "translate-x-[22px]" : "translate-x-[2px]"
                    }`}
                  />
                </button>
                <span className="text-sm text-muted-foreground">Sampai Selesai</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="place_name">Nama Tempat</Label>
                <Input
                  id="place_name"
                  value={formData.place_name}
                  onChange={(e) => setFormData({ ...formData, place_name: e.target.value })}
                  placeholder="Gedung / venue (misal: Gedung Serbaguna)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Jalan, kelurahan, kecamatan, kota"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google_maps_link">Link Google Maps</Label>
                <Input
                  id="google_maps_link"
                  value={formData.google_maps_link}
                  onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.is_visible}
                  onClick={() => setFormData({ ...formData, is_visible: !formData.is_visible })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    formData.is_visible ? "bg-brand-600" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                      formData.is_visible ? "translate-x-[22px]" : "translate-x-[2px]"
                    }`}
                  />
                </button>
                <span className="text-sm text-muted-foreground">Tampilkan di undangan</span>
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

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    {!event.is_visible && <Badge variant="secondary">Tersembunyi</Badge>}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      Mulai: {formatDate(event.start_date)} ({event.timezone})
                    </p>
                    <p>
                      Selesai: {event.until_finish ? "Sampai selesai" : formatDate(event.end_date)}
                    </p>
                    {event.place_name && (
                      <p className="flex items-start gap-1.5">
                        <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span className="font-medium">{event.place_name}</span>
                      </p>
                    )}
                    {event.address && (
                      <p className="flex items-start gap-1.5">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>{event.address}</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleVisibility(event)}>
                    {event.is_visible ? "Sembunyikan" : "Tampilkan"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)} disabled={isPending}>
                    <Trash2 className="h-3.5 w-3.5" />
                    Hapus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && !showForm && (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <Calendar className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada data acara</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Klik tombol &quot;Tambah Acara&quot; untuk memulai.</p>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
