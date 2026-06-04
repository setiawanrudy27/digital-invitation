// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Quote as QuoteIcon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/components/ui/use-confirm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Database } from "@/lib/supabase/database.types";

type Quote = Database["public"]["Tables"]["quotes"]["Row"];

interface QuotesPageProps {
  quotes: Quote[];
  invitationId: string;
}

export default function QuotesPageClient({ quotes: initialQuotes, invitationId }: QuotesPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [showForm, setShowForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ text: "", source: "", is_visible: true });

  const resetForm = () => {
    setFormData({ text: "", source: "", is_visible: true });
    setEditingQuote(null);
    setShowForm(false);
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setFormData({ text: quote.text, source: quote.source || "", is_visible: quote.is_visible });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());

      const data = { invitation_id: invitationId, ...formData };

      if (editingQuote) {
        const { error } = await supabase
          .from("quotes")
          .update(formData)
          .eq("id", editingQuote.id);
        if (!error) {
          const { data } = await supabase
            .from("quotes")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("created_at");
          if (data) setQuotes(data);
          resetForm();
        }
      } else {
        const { error } = await supabase.from("quotes").insert(data);
        if (!error) {
          const { data } = await supabase
            .from("quotes")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("created_at");
          if (data) setQuotes(data);
          resetForm();
        }
      }
      router.refresh();
    });
  };

  const handleDelete = async (id: string) => {
    if (!(await confirm("Yakin ingin menghapus quote ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("quotes").delete().eq("id", id);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      router.refresh();
    });
  };

  const toggleVisibility = async (quote: Quote) => {
    const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
    await supabase.from("quotes").update({ is_visible: !quote.is_visible }).eq("id", quote.id);
    setQuotes((prev) =>
      prev.map((q) => (q.id === quote.id ? { ...q, is_visible: !q.is_visible } : q))
    );
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quote</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola kutipan untuk undangan</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Tambah Quote
        </Button>
      </div>

      {showForm && (
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{editingQuote ? "Edit Quote" : "Tambah Quote Baru"}</CardTitle>
                <CardDescription>Kutipan akan ditampilkan di halaman undangan</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={resetForm} className="shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="text">Teks Quote</Label>
                <Textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Tuliskan kutipan ayat, hadits, atau kata mutiara..."
                  className="min-h-32 text-base leading-relaxed italic text-foreground/90"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Sumber (opsional)</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="QS. Ar-Rum: 21"
                />
                <p className="text-xs text-muted-foreground">Contoh: QS. Ar-Rum: 21, Ali bin Abi Thalib, dll.</p>
              </div>
              <div>
                <Toggle
                  id="is_visible"
                  label="Tampilkan di undangan"
                  description="Quote akan terlihat oleh tamu undangan"
                  checked={formData.is_visible}
                  onChange={(checked) => setFormData({ ...formData, is_visible: checked })}
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
        {quotes.map((quote, index) => {
          const visibleIndex = quotes.filter(q => q.is_visible).indexOf(quote);
          const positionLabel = quote.is_visible
            ? visibleIndex === 0 ? "Quote 1 — Pembuka" : visibleIndex === 1 ? "Quote 2 — Setelah Mempelai" : visibleIndex === 2 ? "Quote 3 — Penutup (di RSVP)" : `Quote ${visibleIndex + 1}`
            : null;

          return (
          <Card key={quote.id} variant="interactive">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/20">
                    <QuoteIcon className="h-5 w-5 text-brand-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  {positionLabel && (
                    <Badge variant="outline" size="sm" className="mb-2">
                      {positionLabel}
                    </Badge>
                  )}
                  <blockquote className="text-base leading-relaxed italic text-foreground">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                  {quote.source && (
                    <p className="text-sm text-muted-foreground">— {quote.source}</p>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    {!quote.is_visible ? (
                      <Badge variant="warning" size="sm">
                        <EyeOff className="mr-1 h-3 w-3" />
                        Tersembunyi
                      </Badge>
                    ) : (
                      <Badge variant="success" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        Tampil
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Button variant="outline" size="sm" onClick={() => toggleVisibility(quote)}>
                    {quote.is_visible ? (
                      <><EyeOff className="h-3.5 w-3.5" /> Sembunyikan</>
                    ) : (
                      <><Eye className="h-3.5 w-3.5" /> Tampilkan</>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(quote)} title="Edit">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(quote.id)}
                    disabled={isPending}
                    title="Hapus"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      {quotes.length === 0 && !showForm && (
        <Card variant="flat">
          <CardContent className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
              <QuoteIcon className="h-6 w-6 text-brand-500" />
            </div>
            <p className="text-sm font-medium text-foreground dark:text-white">Belum ada quote</p>
            <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Klik tombol &quot;Tambah Quote&quot; untuk memulai.</p>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
