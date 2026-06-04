// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Upload, Banknote, QrCode, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useConfirm } from "@/components/ui/use-confirm";
import type { Database } from "@/lib/supabase/database.types";

type BankAccount = Database["public"]["Tables"]["bank_accounts"]["Row"];
type Qris = Database["public"]["Tables"]["qris"]["Row"];

interface GiftsPageProps {
  bankAccounts: BankAccount[];
  qris: Qris | null;
  invitationId: string;
}

export default function GiftsPageClient({ bankAccounts: initialAccounts, qris: initialQris, invitationId }: GiftsPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [bankAccounts, setBankAccounts] = useState(initialAccounts);
  const [currentQris, setCurrentQris] = useState(initialQris);
  const [showBankForm, setShowBankForm] = useState(false);
  const [showQrisForm, setShowQrisForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [isPending, startTransition] = useTransition();

  const [bankForm, setBankForm] = useState({
    bank_name: "",
    account_number: "",
    account_holder: "",
  });
  const [qrisFile, setQrisFile] = useState<File | null>(null);
  const [qrisPreview, setQrisPreview] = useState<string>("");

  const resetBankForm = () => {
    setBankForm({ bank_name: "", account_number: "", account_holder: "" });
    setEditingAccount(null);
    setShowBankForm(false);
  };

  const handleEditBank = (account: BankAccount) => {
    setEditingAccount(account);
    setBankForm({
      bank_name: account.bank_name,
      account_number: account.account_number,
      account_holder: account.account_holder,
    });
    setShowBankForm(true);
  };

  const handleSubmitBank = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());

      if (editingAccount) {
        const { error } = await supabase
          .from("bank_accounts")
          .update(bankForm)
          .eq("id", editingAccount.id);
        if (!error) {
          const { data } = await supabase
            .from("bank_accounts")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("created_at");
          if (data) setBankAccounts(data);
          resetBankForm();
        }
      } else {
        const { error } = await supabase
          .from("bank_accounts")
          .insert({ ...bankForm, invitation_id: invitationId });
        if (!error) {
          const { data } = await supabase
            .from("bank_accounts")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("created_at");
          if (data) setBankAccounts(data);
          resetBankForm();
        }
      }
      router.refresh();
    });
  };

  const handleDeleteBank = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus rekening ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("bank_accounts").delete().eq("id", id);
      setBankAccounts((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    });
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

  const saveQris = async () => {
    if (!qrisFile && !currentQris) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      let finalUrl = currentQris?.qris_url || "";

      if (qrisFile) {
        finalUrl = await uploadToStorage(qrisFile, "qris");
      }

      if (currentQris) {
        const { data } = await supabase
          .from("qris")
          .update({ qris_url: finalUrl })
          .eq("id", currentQris.id)
          .select()
          .single();
        if (data) setCurrentQris(data);
      } else {
        const { data } = await supabase
          .from("qris")
          .insert({ qris_url: finalUrl, invitation_id: invitationId })
          .select()
          .single();
        setCurrentQris(data);
      }

      setQrisFile(null);
      setQrisPreview("");
      setShowQrisForm(false);
      router.refresh();
    });
  };

  const handleQrisFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setQrisFile(file);
    setQrisPreview(file ? URL.createObjectURL(file) : "");
  };

  const deleteQris = async () => {
    if (!currentQris || !(await confirm("Hapus QRIS ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("qris").delete().eq("id", currentQris.id);
      setCurrentQris(null);
      setShowQrisForm(false);
      setQrisFile(null);
      setQrisPreview("");
      router.refresh();
    });
  };

  const displayedQrisUrl = qrisPreview || currentQris?.qris_url;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-muted/30 p-6 shadow-sm dark:bg-muted/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Rekening & QRIS</h1>
            <p className="text-sm text-muted-foreground dark:text-brand-200/60 mt-1">
              Atur semua metode pembayaran hadiah agar tamu Anda bisa memilih dengan jelas dan nyaman.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-100/50 px-4 py-3 text-sm text-muted-foreground dark:bg-brand-950 dark:text-brand-200/80">
            Tips: klik <span className="font-semibold">Tambah</span> untuk menambahkan rekening baru dan tombol
            <span className="font-semibold">Ubah</span> untuk mengganti foto QRIS.
          </div>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20">
                <Building2 className="h-4 w-4 text-brand-500" />
              </div>
              <h2 className="text-lg font-semibold">Transfer Bank</h2>
            </div>
            <Button size="sm" onClick={() => setShowBankForm(true)}>
              <Plus className="h-4 w-4" />
              Tambah
            </Button>
          </div>

          {showBankForm && (
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{editingAccount ? "Edit Rekening" : "Tambah Rekening"}</CardTitle>
                    <CardDescription>Data rekening bank untuk hadiah tamu</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={resetBankForm} className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitBank} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="bank_name">Nama Bank</Label>
                    <Input
                      id="bank_name"
                      value={bankForm.bank_name}
                      onChange={(e) => setBankForm({ ...bankForm, bank_name: e.target.value })}
                      placeholder="BCA, BNI, Mandiri"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account_number">Nomor Rekening</Label>
                    <Input
                      id="account_number"
                      value={bankForm.account_number}
                      onChange={(e) => setBankForm({ ...bankForm, account_number: e.target.value })}
                      placeholder="1234567890"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account_holder">Nama Pemilik</Label>
                    <Input
                      id="account_holder"
                      value={bankForm.account_holder}
                      onChange={(e) => setBankForm({ ...bankForm, account_holder: e.target.value })}
                      placeholder="Ahmad & Bunga"
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" disabled={isPending} loading={isPending}>
                      {isPending ? "Menyimpan..." : "Simpan"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetBankForm}>
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <Card key={account.id} variant="interactive">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20">
                      <Banknote className="h-5 w-5 text-brand-500" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{account.bank_name}</h3>
                      </div>
                      <p className="text-sm font-mono text-foreground">{account.account_number}</p>
                      <p className="text-sm text-muted-foreground">{account.account_holder}</p>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditBank(account)} title="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBank(account.id)}
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
            {bankAccounts.length === 0 && !showBankForm && (
              <Card variant="flat">
                <CardContent className="py-12 text-center">
                  <p className="text-sm text-muted-foreground dark:text-brand-200/75">Belum ada rekening bank.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20">
                <QrCode className="h-4 w-4 text-brand-500" />
              </div>
              <h2 className="text-lg font-semibold">QRIS</h2>
            </div>
            {!currentQris && (
              <Button size="sm" onClick={() => setShowQrisForm(true)}>
                <Upload className="h-4 w-4" />
                Tambah
              </Button>
            )}
          </div>

          {showQrisForm && (
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentQris ? "Ubah QRIS" : "Tambah QRIS"}</CardTitle>
                    <CardDescription>Unggah gambar QRIS untuk pembayaran</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => { setShowQrisForm(false); setQrisFile(null); setQrisPreview(""); }} className="shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Gambar QRIS</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrisFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-input bg-background px-4 py-8 transition-colors hover:border-muted-foreground/30">
                      {displayedQrisUrl ? (
                        <img
                          key={displayedQrisUrl}
                          src={displayedQrisUrl}
                          alt="QRIS Preview"
                          className="h-36 w-36 rounded-lg object-contain"
                        />
                      ) : (
                        <>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20">
                            <Upload className="h-5 w-5 text-brand-500" />
                          </div>
                          <p className="text-sm text-muted-foreground">Klik untuk unggah gambar QRIS</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={saveQris} disabled={isPending || (!qrisFile && !currentQris)} loading={isPending}>
                    {isPending ? "Menyimpan..." : "Simpan"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowQrisForm(false); setQrisFile(null); setQrisPreview(""); }}>
                    Batal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentQris && !showQrisForm && (
            <Card variant="interactive">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="mx-auto max-w-40 overflow-hidden rounded-xl">
                    <img src={currentQris.qris_url} alt="QRIS" className="w-full" />
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setShowQrisForm(true)}>
                        <Upload className="mr-1 h-3.5 w-3.5" />
                        Ubah
                      </Button>
                      <Button size="sm" variant="destructive" onClick={deleteQris}>
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!currentQris && !showQrisForm && (
            <Card variant="flat">
              <CardContent className="py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
                  <QrCode className="h-6 w-6 text-brand-500" />
                </div>
                <p className="text-sm font-medium text-foreground dark:text-white">Belum ada QRIS</p>
                <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {confirmDialog}
    </div>
  );
}
