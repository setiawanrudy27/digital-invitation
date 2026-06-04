// @ts-nocheck
"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Image, Video, Radio, Music, Frame, Eye, EyeOff, Upload, ArrowUp, ArrowDown, Film, Link2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useConfirm } from "@/components/ui/use-confirm";
import type { Database } from "@/lib/supabase/database.types";

type Photo = Database["public"]["Tables"]["gallery_photos"]["Row"];
type Video = Database["public"]["Tables"]["gallery_videos"]["Row"];
type LiveStream = Database["public"]["Tables"]["live_streaming"]["Row"];
type MusicItem = Database["public"]["Tables"]["music"]["Row"];
type WeddingFrame = Database["public"]["Tables"]["wedding_frame"]["Row"];

interface GalleryPageProps {
  photos: Photo[];
  videos: Video[];
  liveStream: LiveStream | null;
  music: MusicItem[];
  weddingFrame: WeddingFrame | null;
  invitationId: string;
}

type Tab = "photos" | "videos" | "streaming" | "music" | "frame";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "photos", label: "Foto", icon: <Image className="h-4 w-4" /> },
  { id: "videos", label: "Video", icon: <Video className="h-4 w-4" /> },
  { id: "streaming", label: "Live Streaming", icon: <Radio className="h-4 w-4" /> },
  { id: "music", label: "Musik", icon: <Music className="h-4 w-4" /> },
  { id: "frame", label: "Wedding Frame", icon: <Frame className="h-4 w-4" /> },
];

export default function GalleryPageClient({
  photos: initialPhotos,
  videos: initialVideos,
  liveStream,
  music,
  weddingFrame,
  invitationId,
}: GalleryPageProps) {
  const router = useRouter();
  const { confirm, confirmDialog } = useConfirm();
  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [photos, setPhotos] = useState(initialPhotos);
  const [videos, setVideos] = useState(initialVideos);
  const [currentStream, setCurrentStream] = useState(liveStream);
  const [musicList, setMusicList] = useState(music);
  const [currentFrame, setCurrentFrame] = useState(weddingFrame);
  const [isPending, startTransition] = useTransition();

  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [streamUrl, setStreamUrl] = useState(currentStream?.stream_url || "");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [frameUrl, setFrameUrl] = useState(currentFrame?.frame_url || "");
  const [frameUrlInstagram, setFrameUrlInstagram] = useState(currentFrame?.frame_url_instagram || "");
  const photoInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);

  const openPhotoFileDialog = () => photoInputRef.current?.click();
  const openMusicFileDialog = () => musicInputRef.current?.click();

  const uploadToStorage = async (file: File, bucket: string): Promise<string> => {
    const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const addPhotos = async () => {
    if (photoFiles.length === 0) return;
    setUploading(true);

    startTransition(async () => {
      try {
        const fileUrls = await Promise.all(
          photoFiles.map(async (file) => ({ photo_url: await uploadToStorage(file, "photos") }))
        );

        const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
        const insertItems = fileUrls.map((item, index) => ({
          ...item,
          display_order: photos.length + index,
          invitation_id: invitationId,
        }));

        const { error } = await supabase.from("gallery_photos").insert(insertItems);
        if (!error) {
          const { data } = await supabase
            .from("gallery_photos")
            .select("*")
            .eq("invitation_id", invitationId)
            .order("display_order");
          if (data) setPhotos(data);
          setPhotoFiles([]);
        }
      } catch (err) {
        alert("Gagal upload foto: " + err);
      }
      setUploading(false);
      router.refresh();
    });
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPhotoFiles(files);
    }
  };

  const deletePhoto = async (id: string) => {
    if (!(await confirm("Hapus foto ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("gallery_photos").delete().eq("id", id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    });
  };

  const togglePhotoVisibility = async (photo: Photo) => {
    const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
    await supabase
      .from("gallery_photos")
      .update({ is_visible: !photo.is_visible })
      .eq("id", photo.id);
    setPhotos((prev) =>
      prev.map((p) => (p.id === photo.id ? { ...p, is_visible: !p.is_visible } : p))
    );
    router.refresh();
  };

  const reorderPhoto = async (id: string, direction: "up" | "down") => {
    const index = photos.findIndex((photo) => photo.id === id);
    if (index === -1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const current = photos[index];
    const target = photos[targetIndex];

    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("gallery_photos").update({ display_order: target.display_order }).eq("id", current.id);
      await supabase.from("gallery_photos").update({ display_order: current.display_order }).eq("id", target.id);

      setPhotos((prev) => {
        const next = [...prev];
        [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
        return next;
      });
      router.refresh();
    });
  };

  const addVideo = async () => {
    if (!videoUrl.trim()) return;
    if (videos.length >= 1) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      const { error } = await supabase
        .from("gallery_videos")
        .insert({ youtube_url: videoUrl, invitation_id: invitationId });
      if (!error) {
        const { data } = await supabase
          .from("gallery_videos")
          .select("*")
          .eq("invitation_id", invitationId)
          .order("created_at");
        if (data) setVideos(data);
        setVideoUrl("");
      }
      router.refresh();
    });
  };

  const deleteVideo = async (id: string) => {
    if (!(await confirm("Hapus video ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("gallery_videos").delete().eq("id", id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
      router.refresh();
    });
  };

  const saveStreaming = async () => {
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      if (currentStream) {
        await supabase.from("live_streaming").update({ stream_url: streamUrl }).eq("id", currentStream.id);
      } else {
        const { data } = await supabase
          .from("live_streaming")
          .insert({ stream_url: streamUrl, invitation_id: invitationId })
          .select()
          .single();
        setCurrentStream(data);
      }
      router.refresh();
    });
  };

  const addMusic = async () => {
    if (!musicFile) return;
    setUploading(true);

    startTransition(async () => {
      try {
        const finalUrl = await uploadToStorage(musicFile, "music");
        const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
        const isVisible = !musicList.some((item) => item.is_visible);

        await supabase
          .from("music")
          .insert({ music_url: finalUrl, invitation_id: invitationId, is_visible: isVisible });

        const { data } = await supabase
          .from("music")
          .select("*")
          .eq("invitation_id", invitationId)
          .order("created_at");

        if (data) setMusicList(data);
        setMusicFile(null);
      } catch (err) {
        alert("Gagal upload musik: " + err);
      }
      setUploading(false);
      router.refresh();
    });
  };

  const deleteMusic = async (id: string) => {
    if (!(await confirm("Hapus musik ini?"))) return;
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("music").delete().eq("id", id);

      const { data } = await supabase
        .from("music")
        .select("*")
        .eq("invitation_id", invitationId)
        .order("created_at");

      if (data) setMusicList(data);
      router.refresh();
    });
  };

  const setActiveMusic = async (id: string) => {
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      await supabase.from("music").update({ is_visible: false }).eq("invitation_id", invitationId);
      await supabase.from("music").update({ is_visible: true }).eq("id", id);
      setMusicList((prev) => prev.map((item) => ({ ...item, is_visible: item.id === id })));
      router.refresh();
    });
  };

  const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMusicFile(file);
    }
  };

  const saveFrame = async () => {
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      if (currentFrame) {
        const { error } = await supabase
          .from("wedding_frame")
          .update({ frame_url: frameUrl, frame_url_instagram: frameUrlInstagram || null })
          .eq("id", currentFrame.id)
          .select()
          .single();
        if (!error) {
          setCurrentFrame((prev) => prev ? {
            ...prev,
            frame_url: frameUrl,
            frame_url_instagram: frameUrlInstagram || null,
          } : prev);
        } else {
          alert("Gagal menyimpan: " + error.message);
        }
      } else {
        const { data, error } = await supabase
          .from("wedding_frame")
          .insert({ frame_url: frameUrl, frame_url_instagram: frameUrlInstagram || null, invitation_id: invitationId })
          .select()
          .single();
        if (!error && data) {
          setCurrentFrame(data);
        } else {
          alert("Gagal menyimpan: " + (error?.message || "Unknown error"));
        }
      }
      router.refresh();
    });
  };

  const toggleVisibility = async (
    type: "stream" | "frame",
    current: LiveStream | WeddingFrame
  ) => {
    startTransition(async () => {
      const supabase = await import("@/lib/supabase/client").then((m) => m.createClient());
      const table = type === "stream" ? "live_streaming" : "wedding_frame";
      await supabase.from(table).update({ is_visible: !current.is_visible }).eq("id", current.id);
      if (type === "stream") setCurrentStream({ ...current, is_visible: !current.is_visible });
      if (type === "frame") setCurrentFrame({ ...current, is_visible: !current.is_visible });
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Galeri Undangan</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola foto, video, streaming, musik, dan wedding frame</p>
      </div>

      <div className="flex flex-wrap gap-1.5 rounded-2xl border bg-card p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 sm:py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              activeTab === tab.id
                ? "bg-brand-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "photos" && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1">
                  <Label className="mb-2 block">Pilih Foto</Label>
                  <div className="flex gap-3">
                    <Button variant="outline" type="button" onClick={openPhotoFileDialog}>
                      <Upload className="h-4 w-4" />
                      Pilih Foto
                    </Button>
                    <Button onClick={addPhotos} disabled={isPending || uploading || photoFiles.length === 0} loading={uploading}>
                      <Plus className="h-4 w-4" />
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoFileChange}
                  />
                </div>
              </div>
              {photoFiles.length > 0 && (
                <div className="mt-4 rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm font-medium text-foreground">{photoFiles.length} foto siap diunggah</p>
                  <ul className="mt-2 space-y-1">
                    {photoFiles.map((file) => (
                      <li key={`${file.name}-${file.lastModified}`} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Image className="h-3.5 w-3.5 shrink-0" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {photos.map((photo, index) => (
                <Card key={photo.id} className="group overflow-hidden">
                  <CardContent className="p-3">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                      <img
                        src={photo.photo_url}
                        alt="Gallery"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {!photo.is_visible && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                          <EyeOff className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2.5 sm:gap-1.5">
                      <Button variant="ghost" size="icon-sm" disabled={isPending || index === 0} onClick={() => reorderPhoto(photo.id, "up")} title="Geser ke atas" className="sm:max-lg:p-1.5">
                        <ArrowUp className="h-4 w-4 sm:h-3 sm:w-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" disabled={isPending || index === photos.length - 1} onClick={() => reorderPhoto(photo.id, "down")} title="Geser ke bawah" className="sm:max-lg:p-1.5">
                        <ArrowDown className="h-4 w-4 sm:h-3 sm:w-3" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => togglePhotoVisibility(photo)} title={photo.is_visible ? "Sembunyikan" : "Tampilkan"} className="sm:max-lg:p-1.5">
                        {photo.is_visible ? <Eye className="h-4 w-4 sm:h-3 sm:w-3" /> : <EyeOff className="h-4 w-4 sm:h-3 sm:w-3" />}
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => deletePhoto(photo.id)} disabled={isPending} title="Hapus" className="sm:max-lg:p-1.5">
                        <Trash2 className="h-4 w-4 sm:h-3 sm:w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="flat">
              <CardContent className="py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
                  <Image className="h-6 w-6 text-brand-500" />
                </div>
                <p className="text-sm font-medium text-foreground dark:text-white">Belum ada foto</p>
                <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Unggah beberapa foto untuk memulai.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "videos" && (
        <div className="space-y-5">
          {videos.length === 0 ? (
            <>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-end gap-3">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="video-url">URL YouTube</Label>
                      <Input
                        id="video-url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addVideo()}
                        icon={<Film className="h-4 w-4" />}
                      />
                    </div>
                    <Button onClick={addVideo} disabled={isPending}>
                      <Plus className="h-4 w-4" />
                      Tambah
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card variant="flat">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
                    <Video className="h-6 w-6 text-brand-500" />
                  </div>
                  <p className="text-sm font-medium text-foreground dark:text-white">Belum ada video</p>
                  <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Tambahkan URL YouTube untuk memulai.</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="space-y-3">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <Play className="h-4 w-4 text-destructive" />
                      </div>
                      <p className="text-sm text-foreground truncate">{video.youtube_url}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Hanya 1 video diperbolehkan. Hapus untuk mengganti.</span>
                      <Button variant="ghost" size="icon-sm" onClick={() => deleteVideo(video.id)} disabled={isPending}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "streaming" && (
        <Card>
          <CardContent className="p-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="stream-url">URL Live Streaming</Label>
              <Input
                id="stream-url"
                placeholder="https://zoom.us/... atau https://meet.google.com/..."
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                icon={<Radio className="h-4 w-4" />}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={saveStreaming} disabled={isPending} loading={isPending}>
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
              {currentStream && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    role="switch"
                    aria-checked={currentStream.is_visible}
                    onClick={() => toggleVisibility("stream", currentStream)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      currentStream.is_visible ? "bg-brand-600" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                        currentStream.is_visible ? "translate-x-[22px]" : "translate-x-[2px]"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-muted-foreground">Tampilkan di undangan</span>
                </label>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "music" && (
        <div className="space-y-5">
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="space-y-2">
                <Label>Unggah Musik</Label>
                <div className="flex gap-3">
                  <Button variant="outline" type="button" onClick={openMusicFileDialog}>
                    <Upload className="h-4 w-4" />
                    Pilih Musik
                  </Button>
                  <Button onClick={addMusic} disabled={isPending || uploading || !musicFile} loading={uploading}>
                    <Plus className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Tambah"}
                  </Button>
                </div>
                <input
                  ref={musicInputRef}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleMusicFileChange}
                />
                {musicFile && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                    <Music className="h-3.5 w-3.5" />
                    {musicFile.name}
                  </p>
                )}
              </div>
              <div className="rounded-xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
                <Music className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                <span>Musik akan otomatis diputar ketika undangan dibuka. Pilih satu lagu sebagai musik utama.</span>
              </div>
            </CardContent>
          </Card>

          {musicList.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {musicList.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20">
                          <Music className="h-4 w-4 text-brand-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{item.music_url.split("/").pop()}</p>
                          {item.is_visible && <Badge variant="success" size="sm" className="mt-0.5">Musik utama</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {!item.is_visible && (
                          <Button size="sm" variant="outline" onClick={() => setActiveMusic(item.id)}>
                            Pilih
                          </Button>
                        )}
                        <Button size="sm" variant="destructive" onClick={() => deleteMusic(item.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <audio controls className="w-full h-10" src={item.music_url} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="flat">
              <CardContent className="py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 mb-4">
                  <Music className="h-6 w-6 text-brand-500" />
                </div>
                <p className="text-sm font-medium text-foreground dark:text-white">Belum ada musik</p>
                <p className="text-sm text-muted-foreground dark:text-brand-200/75 mt-1">Unggah file audio untuk menambah musik undangan.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "frame" && (
        <Card>
          <CardContent className="p-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="frame-url" className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-black/5 text-[10px] font-bold">T</span>
                URL Frame TikTok
              </Label>
              <Input
                id="frame-url"
                placeholder="https://www.tiktok.com/..."
                value={frameUrl}
                onChange={(e) => setFrameUrl(e.target.value)}
                icon={<Link2 className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frame-url-instagram" className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-[10px] font-bold text-white">IG</span>
                URL Frame Instagram
              </Label>
              <Input
                id="frame-url-instagram"
                placeholder="https://www.instagram.com/..."
                value={frameUrlInstagram}
                onChange={(e) => setFrameUrlInstagram(e.target.value)}
                icon={<Link2 className="h-4 w-4" />}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={saveFrame} disabled={isPending} loading={isPending}>
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
              {currentFrame && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    role="switch"
                    aria-checked={currentFrame.is_visible}
                    onClick={() => toggleVisibility("frame", currentFrame)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      currentFrame.is_visible ? "bg-brand-600" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                        currentFrame.is_visible ? "translate-x-[22px]" : "translate-x-[2px]"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-muted-foreground">Tampilkan di undangan</span>
                </label>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {confirmDialog}
    </div>
  );
}
