"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { InvitationPageData } from "@/components/invite/types";

import LoadingScreen from "@/components/invite/loading-screen";
import CoverSection from "@/components/invite/cover-section";
import MusicPlayer from "@/components/invite/music-player";
import FloatingNav from "@/components/invite/floating-nav";
import InvitationSections from "@/components/invite/invitation-sections";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    if (!isOpen || !scrollRef.current) return;

    const isDesktop = window.innerWidth >= 1024;
    const scroller = isDesktop ? scrollRef.current : undefined;
    const container = isDesktop ? scrollRef.current : document;

    const sections = container.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            scroller: scroller,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isOpen]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const heroImage = data.galleryPhotos?.[0]?.photo_url
    || data.coupleBride?.cover_photo_url
    || "/images/background_opening.jpg";

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
        <div className="h-screen overflow-hidden">
          <CoverSection data={data} onOpen={() => setIsOpen(true)} />
        </div>
      ) : (
        <div className="lg:flex lg:h-screen lg:bg-black lg:overflow-hidden">
          <div className="hidden lg:flex lg:flex-1 lg:relative lg:overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('${heroImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
              <div className="absolute bottom-10 left-10 z-10 text-white">
                <p className="font-quicksand text-xl tracking-[0.2em] uppercase opacity-90">
                  Undangan Pernikahan
                </p>
                <h1 className="font-italianno text-8xl md:text-9xl leading-none mt-2 text-white">
                  {data.coupleBride?.nickname || data.coupleBride?.full_name || ""} &amp; {data.coupleGroom?.nickname || data.coupleGroom?.full_name || ""}
                </h1>
                <p className="font-quicksand text-xl tracking-wider mt-3 opacity-80">
                  {formatDate(data.events?.[0]?.start_date || data.invitation.wedding_date)}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-[clamp(360px,30%,540px)] lg:h-screen">
            <div className="relative w-full h-full lg:flex lg:flex-col invitation-theme"
              style={{
                backgroundImage: "url('/images/background-invitation.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#F5ECE0]/20 pointer-events-none" />
              <div ref={scrollRef} className="lg:flex-1 lg:overflow-y-auto max-lg:min-h-screen">
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
