"use client";

import { useState, useEffect, useRef } from "react";
import type { InvitationPageData } from "@/components/invite/types";

import LoadingScreen from "@/components/invite/loading-screen";
import CoverSection from "@/components/invite/cover-section";
import MusicPlayer from "@/components/invite/music-player";
import FloatingNav from "@/components/invite/floating-nav";
import InvitationSections from "@/components/invite/invitation-sections";

export default function InvitationClient(data: InvitationPageData) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !data.music?.music_url) return;
    const audio = new Audio(data.music.music_url);
    audio.loop = true;
    audioRef.current = audio;
    audio.play().then(() => setIsMusicPlaying(true)).catch(() => {});
    return () => {
      audio.pause();
      audioRef.current = null;
      setIsMusicPlaying(false);
    };
  }, [isOpen, data.music?.music_url]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const heroImage = data.galleryPhotos?.[0]?.photo_url
    || data.coupleBride?.cover_photo_url
    || "";

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {isOpen && data.music && (
        <div className="fixed bottom-6 left-6 z-50">
          <MusicPlayer audioRef={audioRef} isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
        </div>
      )}

      {!isOpen ? (
        <div className="h-dvh overflow-hidden overscroll-none">
          <CoverSection data={data} onOpen={() => setIsOpen(true)} />
        </div>
      ) : (
        <div className="lg:flex lg:h-screen lg:overflow-hidden">
          <div className="hidden lg:flex lg:flex-1 lg:relative lg:overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-white"
              style={heroImage ? {
                backgroundImage: `url('${heroImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              } : undefined}
            >
              {heroImage && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />}
              <div className="absolute bottom-10 left-10 z-10 text-white">
                <p className="font-quicksand text-xl tracking-[0.2em] uppercase opacity-80">
                  Undangan Pernikahan
                </p>
                <h1 className="font-italianno text-8xl md:text-9xl leading-none mt-2">
                  {data.coupleBride?.nickname || data.coupleBride?.full_name || ""} &amp; {data.coupleGroom?.nickname || data.coupleGroom?.full_name || ""}
                </h1>
                <p className="font-quicksand text-xl tracking-wider mt-3 opacity-80">
                  {formatDate(data.events?.[0]?.start_date || data.invitation.wedding_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-[clamp(360px,30%,540px)] lg:h-screen">
            <div className="relative w-full h-full bg-white lg:flex lg:flex-col invitation-theme">
              <div ref={scrollRef} className="lg:flex-1 lg:overflow-y-auto max-lg:min-h-screen bg-white">
                <InvitationSections data={data} containerRef={scrollRef} />
              </div>
              <div className="lg:hidden">
                <FloatingNav />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
