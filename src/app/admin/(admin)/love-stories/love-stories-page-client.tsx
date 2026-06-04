// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Upload, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useConfirm } from "@/components/ui/use-confirm";
import type { Database } from "@/lib/supabase/database.types";

type LoveStory = Database["public"]["Tables"]["love_stories"]["Row"];

interface LoveStoriesPageProps {
  stories: LoveStory[];
  invitationId: string;
}

export default function LoveStoriesPageClient({ stories: initialStories, invitationId }: LoveStoriesPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [stories, setStories] = useState(initialStories);
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState<LoveStory | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    story_date: "",
    photo_url: "",
    description: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const resetForm = () => {
    setFormData({ story_date: "", photo_url: "", description: "" });
    setPhotoFile(null);
    setPhotoPreview("");
    setEditingStory(null);
    setShowForm(false);
  };

  const handleEdit = (story: LoveStory) => {
    setEditingStory(story);
    setFormData({
      story_date: story.story_date,
      photo_url: story.photo_url || "",
      description: story.description,
    });
    setPhotoFile(null);
    setPhotoPreview("");
    setShowForm(true);
  };

  const uploadToStorage = async (file: File, bucket: string): Promise<string> => {
    const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      let photoUrl = formData.photo_url;
      if (photoFile) {
        photoUrl = await uploadToStorage(photoFile, "photos");
      }
      const data = {
        invitation_id: invitationId,
        story_date: formData.story_date,
        photo_url: photoUrl || null,
        description: formData.description,
        display_order: stories.length,
      };

      if (editingStory) {
        const { error } = await supabase
          .from("love_stories")
          .update(data)
          .eq("id", editingStory.id);
        if (!error) {
          const { data: updated } = await supabase
            .from("love_stories")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("story_date", { ascending: true });
          if (updated) setStories(updated);
          resetForm();
        }
      } else {
        const { error } = await supabase.from("love_stories").insert(data);
        if (!error) {
          const { data: updated } = await supabase
            .from("love_stories")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("story_date", { ascending: true });
          if (updated) setStories(updated);
          resetForm();
        }
      }
      router.refresh();
    });
  };

  const handleDelete = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus cerita ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("love_stories").delete().eq("id", id);
      setStories((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cerita Cinta</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola timeline perjalanan hubungan</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Tambah Cerita
        </Button>
      </div>

      {showForm && (
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingStory ? "Edit Cerita" : "Tambah Cerita Baru"}</CardTitle>
                <CardDescription>Bagikan momen spesial perjalanan cinta</CardDescription>
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
                  <Label htmlFor="story_date">Tanggal</Label>
                  <Input
                    id="story_date"
                    type="date"
                    value={formData.story_date}
                    onChange={(e) => setFormData({ ...formData, story_date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo_file">Foto (opsional)</Label>
                <div className="relative">
                  <input
                    id="photo_file"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-background px-4 py-8 transition-colors hover:border-muted-foreground/30">
                    {photoPreview || formData.photo_url ? (
                      <div className="relative w-full max-w-40">
                        <img
                          src={photoPreview || formData.photo_url}
                          alt="Preview"
                          className="h-28 w-full rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20">
                          <Upload className="h-5 w-5 text-brand-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Klik untuk unggah foto
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {photoFile ? (
                  <p className="text-xs text-muted-foreground">{photoFile.name}</p>
                ) : formData.photo_url ? (
                  <p className="text-xs text-muted-foreground">Foto saat ini akan tetap digunakan jika tidak diganti.</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Cerita</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tuliskan momen spesial di hari ini..."
                  className="min-h-32"
                  required
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

      <div className="space-y-4">
        {stories.map((story, index) => (
          <Card key={story.id} variant="interactive">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20">
                    <Heart className="h-4 w-4 text-brand-500" />
                  </div>
                  {index < stories.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-secondary to-border dark:from-sidebar" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(story.story_date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {story.photo_url && (
                    <div className="mb-3 overflow-hidden rounded-lg">
                      <img
                        src={story.photo_url}
                        alt="Story"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap text-foreground">{story.description}</p>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(story)} title="Edit">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(story.id)}
                    disabled={isPending}
                    title="Hapus"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stories.length === 0 && !showForm && (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <Heart className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada cerita cinta</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Klik tombol &quot;Tambah Cerita&quot; untuk memulai.</p>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
