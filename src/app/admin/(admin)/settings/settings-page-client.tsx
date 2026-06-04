// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Image, CalendarDays, Heart, Images, Quote, Wallet, MessageSquare, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import RichEditor from "@/components/ui/rich-editor";
import type { Database } from "@/lib/supabase/database.types";

type Settings = Database["public"]["Tables"]["settings"]["Row"];

interface SettingsPageProps {
  settings: Settings | null;
  invitationId: string;
}

export default function SettingsPageClient({ settings, invitationId }: SettingsPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    show_couple_photo: settings?.show_couple_photo ?? true,
    show_events: settings?.show_events ?? true,
    show_love_story: settings?.show_love_story ?? true,
    show_gallery: settings?.show_gallery ?? true,
    show_quote: settings?.show_quote ?? true,
    show_rsvp: settings?.show_rsvp ?? true,
    payment_method: settings?.payment_method ?? "both" as "transfer" | "qris" | "both",
    whatsapp_template: settings?.whatsapp_template ?? "",
  });

  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());

      try {
        if (settings) {
          const { error } = await supabase.from("settings").update(formData).eq("id", settings.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("settings").insert({ ...formData, invitation_id: invitationId });
          if (error) throw error;
        }
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setSuccess(false);
        alert("Gagal menyimpan: " + (err instanceof Error ? err.message : "Unknown error"));
      }
      router.refresh();
    });
  };

  const sectionToggles = [
    {
      id: "show_couple_photo",
      label: "Foto Mempelai",
      description: "Tampilkan foto mempelai di undangan",
      icon: Image,
      checked: formData.show_couple_photo,
    },
    {
      id: "show_events",
      label: "Acara",
      description: "Tampilkan informasi acara",
      icon: CalendarDays,
      checked: formData.show_events,
    },
    {
      id: "show_love_story",
      label: "Cerita Cinta",
      description: "Tampilkan timeline cerita cinta",
      icon: Heart,
      checked: formData.show_love_story,
    },
    {
      id: "show_gallery",
      label: "Galeri",
      description: "Tampilkan galeri foto dan video",
      icon: Images,
      checked: formData.show_gallery,
    },
    {
      id: "show_quote",
      label: "Quote",
      description: "Tampilkan kutipan di undangan",
      icon: Quote,
      checked: formData.show_quote,
    },
    {
      id: "show_rsvp",
      label: "Ucapan",
      description: "Tampilkan form ucapan dan RSVP di undangan",
      icon: MessageCircle,
      checked: formData.show_rsvp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-sm text-muted-foreground mt-1">Konfigurasi tampilan dan fitur undangan</p>
      </div>

      {success && (
        <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success dark:border-success/40 dark:bg-success/20 dark:text-success">
          Pengaturan berhasil disimpan
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20">
              <Image className="h-4.5 w-4.5 text-brand-500" />
            </div>
            <div>
              <CardTitle>Tampilan Section</CardTitle>
              <CardDescription>
                Pilih section mana yang ingin ditampilkan di undangan
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {sectionToggles.map((section) => (
            <Toggle
              key={section.id}
              id={section.id}
              label={section.label}
              description={section.description}
              checked={section.checked}
              onChange={(checked) => setFormData({ ...formData, [section.id]: checked })}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20">
              <Wallet className="h-4.5 w-4.5 text-brand-500" />
            </div>
            <div>
              <CardTitle>Metode Pembayaran</CardTitle>
              <CardDescription>
                Pilih metode hadiah yang ditampilkan
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment_method">Metode Pembayaran</Label>
            <Select
              id="payment_method"
              value={formData.payment_method}
              onChange={(e) =>
                setFormData({ ...formData, payment_method: e.target.value as "transfer" | "qris" | "both" })
              }
            >
              <option value="both">Transfer & QRIS</option>
              <option value="transfer">Transfer Bank Saja</option>
              <option value="qris">QRIS Saja</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20">
              <MessageSquare className="h-4.5 w-4.5 text-brand-500" />
            </div>
            <div>
              <CardTitle>Template WhatsApp</CardTitle>
              <CardDescription>
                Template pesan untuk pengiriman undangan via WhatsApp
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp_template">Pesan</Label>
            <RichEditor
              value={formData.whatsapp_template}
              onChange={(value) => setFormData({ ...formData, whatsapp_template: value })}
              placeholder="Halo {{guest_name}}, kami mengundang Anda ke pernikahan kami. Lihat undangan di: {{invite_link}}"
            />
          </div>
          <div className="rounded-lg bg-muted/50 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Gunakan <code className="rounded bg-background px-1 py-0.5 text-[11px] font-mono font-semibold">{`{{guest_name}}`}</code> untuk nama tamu dan <code className="rounded bg-background px-1 py-0.5 text-[11px] font-mono font-semibold">{`{{invite_link}}`}</code> untuk link undangan
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isPending} loading={isPending} size="lg">
          <Save className="h-4 w-4" />
          {isPending ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
      </div>
    </div>
  );
}
