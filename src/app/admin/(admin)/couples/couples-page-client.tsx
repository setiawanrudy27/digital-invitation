// @ts-nocheck
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useConfirm } from "@/components/ui/use-confirm";
import type { Database } from "@/lib/supabase/database.types";

type Couple = Database["public"]["Tables"]["couples"]["Row"];
type PersonType = "groom" | "bride";

interface CouplesPageProps {
  couples: Couple[];
  invitationId: string;
}

interface CoupleFormData {
  full_name: string;
  nickname: string;
  parent_name: string;
  child_order: string;
  instagram_username: string;
  photo_url: string;
  photoFile: File | null;
  cover_photo_url: string;
  coverPhotoFile: File | null;
}

const emptyForm: CoupleFormData = {
  full_name: "",
  nickname: "",
  parent_name: "",
  child_order: "",
  instagram_username: "",
  photo_url: "",
  photoFile: null,
  cover_photo_url: "",
  coverPhotoFile: null,
};

const loadClient = async () => {
  const m = await import("@/lib/supabase/client");
  return m.createClient();
};

export default function CouplesPageClient({ couples: initialCouples, invitationId }: CouplesPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [couples, setCouples] = useState(initialCouples);
  const [forms, setForms] = useState<{ groom: CoupleFormData; bride: CoupleFormData }>({
    groom: { ...emptyForm },
    bride: { ...emptyForm },
  });
  const [showPhoto, setShowPhoto] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const groom = initialCouples.find((couple) => couple.person_type === "groom");
    const bride = initialCouples.find((couple) => couple.person_type === "bride");

    setForms({
      groom: groom
        ? {
            full_name: groom.full_name,
            nickname: groom.nickname || "",
            parent_name: groom.father_name || groom.mother_name || "",
            child_order: groom.child_order || "",
            instagram_username: groom.instagram_username || "",
            photo_url: groom.photo_url || "",
            photoFile: null,
            cover_photo_url: (groom as any).cover_photo_url || "",
            coverPhotoFile: null,
          }
        : { ...emptyForm },
      bride: bride
        ? {
            full_name: bride.full_name,
            nickname: bride.nickname || "",
            parent_name: bride.father_name || bride.mother_name || "",
            child_order: bride.child_order || "",
            instagram_username: bride.instagram_username || "",
            photo_url: bride.photo_url || "",
            photoFile: null,
            cover_photo_url: (bride as any).cover_photo_url || "",
            coverPhotoFile: null,
          }
        : { ...emptyForm },
    });
  }, [initialCouples]);

  const uploadToStorage = async (file: File): Promise<string> => {
    const supabase = await loadClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage.from("photos").upload(fileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from("photos").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const setFormField = (personType: PersonType, field: keyof CoupleFormData, value: string | boolean | File | null) => {
    setForms((prev) => ({
      ...prev,
      [personType]: {
        ...prev[personType],
        [field]: value,
      },
    }));
  };

  const handlePhotoFileChange = (personType: PersonType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormField(personType, "photoFile", file);
      setFormField(personType, "photo_url", "");
    }
  };

  const handleCoverPhotoFileChange = (personType: PersonType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormField(personType, "coverPhotoFile", file);
      setFormField(personType, "cover_photo_url", "");
    }
  };

  const getCoupleByType = (personType: PersonType) => couples.find((couple) => couple.person_type === personType);

  const saveAll = async () => {
    startTransition(async () => {
      try {
        const supabase = await loadClient();

        for (const personType of ["bride", "groom"] as PersonType[]) {
          const form = forms[personType];
          const existingCouple = getCoupleByType(personType);
          let finalUrl = form.photo_url;
          let finalCoverUrl = form.cover_photo_url;

          if (form.photoFile) {
            try {
              finalUrl = await uploadToStorage(form.photoFile);
            } catch (err) {
              alert("Gagal upload foto: " + err);
              return;
            }
          }

          if (form.coverPhotoFile) {
            try {
              finalCoverUrl = await uploadToStorage(form.coverPhotoFile);
            } catch (err) {
              alert("Gagal upload foto cover: " + err);
              return;
            }
          }

          const payload = {
            invitation_id: invitationId,
            person_type: personType,
            full_name: form.full_name,
            nickname: form.nickname || null,
            father_name: form.parent_name || null,
            mother_name: null,
            child_order: form.child_order || null,
            instagram_username: form.instagram_username || null,
            photo_url: finalUrl || null,
            cover_photo_url: finalCoverUrl || null,
          };

          if (existingCouple) {
            const { error } = await supabase.from("couples").update(payload).eq("id", existingCouple.id);
            if (error) {
              alert("Gagal menyimpan data " + (personType === "bride" ? "mempelai wanita" : "mempelai pria") + ": " + error.message);
              return;
            }
          } else {
            const { error } = await supabase.from("couples").insert(payload);
            if (error) {
              alert("Gagal menyimpan data " + (personType === "bride" ? "mempelai wanita" : "mempelai pria") + ": " + error.message);
              return;
            }
          }

          if (finalUrl) {
            setFormField(personType, "photo_url", finalUrl);
          }
          if (finalCoverUrl) {
            setFormField(personType, "cover_photo_url", finalCoverUrl);
          }
          setFormField(personType, "photoFile", null);
          setFormField(personType, "coverPhotoFile", null);
        }

        const { data: existingSettings } = await supabase
          .from("settings")
          .select("id")
          .eq("invitation_id", invitationId)
          .maybeSingle();

        if (existingSettings) {
          await supabase.from("settings").update({ show_couple_photo: showPhoto }).eq("id", existingSettings.id);
        } else {
          await supabase.from("settings").insert({ invitation_id: invitationId, show_couple_photo: showPhoto });
        }

        const { data: updatedData } = await supabase
          .from("couples")
          .select("*")
          .eq("invitation_id", invitationId)
          .order("created_at", { ascending: true });

        if (updatedData) setCouples(updatedData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } catch (err) {
        setSuccess(false);
        alert("Terjadi kesalahan: " + err);
      }
    });
  };

  const deletePerson = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus data ini?"))) return;
    startTransition(async () => {
      const supabase = await loadClient();
      await supabase.from("couples").delete().eq("id", id);
      setCouples((prev) => prev.filter((couple) => couple.id !== id));
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mempelai</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola data mempelai pria dan wanita</p>
      </div>

      {success && (
        <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success dark:border-success/40 dark:bg-success/20 dark:text-success">
          Data mempelai berhasil disimpan
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {(["bride", "groom"] as PersonType[]).map((personType) => {
          const label = personType === "bride" ? "Mempelai Wanita" : "Mempelai Pria";
          const form = forms[personType];
          const couple = getCoupleByType(personType);

          return (
            <Card key={personType}>
              <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>Lengkapi data di bawah ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Unggah Foto Cover</Label>
                  <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-input bg-background p-6 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/30 dark:hover:border-brand-700 dark:hover:bg-brand-900/10">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleCoverPhotoFileChange(personType, e)}
                    />
                    {form.cover_photo_url ? (
                      <div className="relative w-full">
                        <img
                          src={form.cover_photo_url}
                          alt={`Cover ${label}`}
                          className="h-40 w-full rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Klik untuk upload foto cover</p>
                        <p className="text-xs text-muted-foreground">JPEG, PNG, WebP</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="space-y-2">
                  <Label>Unggah Foto</Label>
                  <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-input bg-background p-6 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/30 dark:hover:border-brand-700 dark:hover:bg-brand-900/10">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handlePhotoFileChange(personType, e)}
                    />
                    {form.photo_url ? (
                      <div className="relative w-full">
                        <img
                          src={form.photo_url}
                          alt={label}
                          className="h-40 w-full rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">Klik untuk upload</p>
                        <p className="text-xs text-muted-foreground">JPEG, PNG, WebP</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${personType}-full_name`}>Nama Mempelai</Label>
                  <Input
                    id={`${personType}-full_name`}
                    value={form.full_name}
                    onChange={(e) => setFormField(personType, "full_name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${personType}-nickname`}>Nama Panggilan</Label>
                  <Input
                    id={`${personType}-nickname`}
                    value={form.nickname}
                    onChange={(e) => setFormField(personType, "nickname", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${personType}-child_order`}>Anak Ke-</Label>
                  <Input
                    id={`${personType}-child_order`}
                    value={form.child_order}
                    onChange={(e) => setFormField(personType, "child_order", e.target.value)}
                    placeholder="contoh: 1, 2, pertama, kedua"
                  />
                  <p className="text-xs text-muted-foreground">Akan tampil sebagai "Putra pertama dari" atau "Putri kedua dari"</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${personType}-parent_name`}>Nama Orang Tua</Label>
                  <Input
                    id={`${personType}-parent_name`}
                    value={form.parent_name}
                    onChange={(e) => setFormField(personType, "parent_name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${personType}-instagram_username`}>Instagram</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground text-sm">@</div>
                    <Input
                      id={`${personType}-instagram_username`}
                      value={form.instagram_username}
                      onChange={(e) => setFormField(personType, "instagram_username", e.target.value)}
                      placeholder="username"
                      className="pl-7"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border bg-card p-5">
        <p className="text-sm font-medium text-foreground">Tampilkan Foto Mempelai</p>
        <div className="flex items-center gap-4">
          <button
            role="switch"
            aria-checked={showPhoto}
            onClick={() => setShowPhoto(!showPhoto)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              showPhoto ? "bg-brand-600" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                showPhoto ? "translate-x-[22px]" : "translate-x-[2px]"
              }`}
            />
          </button>
          <Button onClick={saveAll} disabled={isPending} loading={isPending}>
            {isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {couples.map((couple) => (
          <Card key={couple.id}>
            <CardContent className="flex items-start gap-4 p-5">
              {couple.photo_url ? (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <img src={couple.photo_url} alt={couple.full_name} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl font-medium text-muted-foreground">
                  {couple.person_type === "groom" ? "??" : "??"}
                </div>
              )}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{couple.full_name}</h3>
                  <Badge variant={couple.person_type === "groom" ? "info" : "default"}>
                    {couple.person_type === "groom" ? "Pria" : "Wanita"}
                  </Badge>

                </div>
                {couple.nickname && <p className="text-sm text-muted-foreground">{couple.nickname}</p>}
                {couple.child_order && <p className="text-sm text-muted-foreground">Anak ke-{couple.child_order}</p>}
                <p className="text-sm text-muted-foreground">{couple.father_name || couple.mother_name || "-"}</p>
                {couple.instagram_username && (
                  <p className="text-sm text-muted-foreground">@{couple.instagram_username}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="destructive" size="sm" onClick={() => deletePerson(couple.id)} disabled={isPending} title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {couples.length === 0 && (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <Camera className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada data mempelai</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Isi form di atas untuk menambahkan data mempelai.</p>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
