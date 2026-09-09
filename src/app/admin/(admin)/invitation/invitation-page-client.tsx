// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, ExternalLink, Link2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useConfirm } from "@/components/ui/use-confirm";
import type { Database } from "@/lib/supabase/database.types";

type Invitation = Database["public"]["Tables"]["invitations"]["Row"];

interface InvitationPageProps {
  invitations: Invitation[];
}

export default function InvitationPageClient({ invitations: initialInvitations }: InvitationPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [invitations, setInvitations] = useState(initialInvitations);
  const [showForm, setShowForm] = useState(false);
  const [editingInvitation, setEditingInvitation] = useState<Invitation | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    wedding_date: "",
  });

  const resetForm = () => {
    setFormData({ title: "", slug: "", wedding_date: "" });
    setEditingInvitation(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50);
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: editingInvitation ? formData.slug : generateSlug(value),
    });
  };

  const handleEdit = (invitation: Invitation) => {
    setEditingInvitation(invitation);
    setFormData({
      title: invitation.title,
      slug: invitation.slug,
      wedding_date: invitation.wedding_date,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());

      if (editingInvitation) {
        const { error } = await supabase
          .from("invitations")
          .update(formData)
          .eq("id", editingInvitation.id);
        if (!error) {
          const { data } = await supabase.from("invitations").select("*").order("created_at", { ascending: false });
          if (data) setInvitations(data);
          resetForm();
        }
      } else {
        const { error } = await supabase.from("invitations").insert(formData);
        if (!error) {
          const { data } = await supabase.from("invitations").select("*").order("created_at", { ascending: false });
          if (data) setInvitations(data);
          resetForm();
        }
      }
      router.refresh();
    });
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm("Yakin ingin menghapus undangan ini? Semua data terkait akan ikut terhapus.");
    if (!ok) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("invitations").delete().eq("id", id);
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      router.refresh();
    });
  };

  const copyInviteLink = (slug: string) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    const link = `${siteUrl}/invite/${slug}`;
    navigator.clipboard.writeText(link);
    alert("Link undangan disalin!");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Undangan</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola data undangan pernikahan</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Buat Undangan
        </Button>
      </div>

      {showForm && (
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingInvitation ? "Edit Undangan" : "Buat Undangan Baru"}</CardTitle>
                <CardDescription>Lengkapi detail undangan pernikahan</CardDescription>
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
                  <Label htmlFor="title">Judul Undangan</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Pernikahan Ahmad & Bunga"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 text-sm text-muted-foreground has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring has-[input:focus-visible]:border-ring transition-all duration-200 hover:border-foreground/20">
                    <span className="shrink-0">/invite/</span>
                    <input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                      className="flex h-10 w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="wedding_date">Tanggal Pernikahan</Label>
                  <Input
                    id="wedding_date"
                    type="date"
                    value={formData.wedding_date}
                    onChange={(e) => setFormData({ ...formData, wedding_date: e.target.value })}
                    required
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

      <div className="space-y-4">
        {invitations.map((invitation) => (
          <Card key={invitation.id} variant="interactive">
            <CardContent className="flex items-start justify-between p-5">
              <div className="space-y-1.5 min-w-0 flex-1">
                <h3 className="font-semibold text-foreground">{invitation.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(invitation.wedding_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Link2 className="h-3 w-3" />
                  <span className="truncate">/invite/{invitation.slug}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button variant="outline" size="sm" onClick={() => copyInviteLink(invitation.slug)}>
                  <Copy className="h-3.5 w-3.5" />
                  Salin Link
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEdit(invitation)}>
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(invitation.id)} disabled={isPending}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {invitations.length === 0 && !showForm && (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <ExternalLink className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada undangan</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Klik tombol &quot;Buat Undangan&quot; untuk memulai.</p>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
