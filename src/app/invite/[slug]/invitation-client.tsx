"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { InvitationPageData } from "@/components/invite/types";

import LoadingScreen from "@/components/invite/loading-screen";
import CoverSection from "@/components/invite/cover-section";
import ScrollProgress from "@/components/invite/scroll-progress";
import MusicPlayer from "@/components/invite/music-player";
import OpeningSection from "@/components/invite/opening-section";
import CoupleSection from "@/components/invite/couple-section";
import QuoteSection from "@/components/invite/quote-section";
import EventSection from "@/components/invite/event-section";
import StreamingSection from "@/components/invite/streaming-section";
import FrameSection from "@/components/invite/frame-section";
import LoveStorySection from "@/components/invite/love-story-section";
import GallerySection from "@/components/invite/gallery-section";
import CoupleQuoteSection from "@/components/invite/couple-quote-section";
import RSVPSection from "@/components/invite/rsvp-section";
import GiftSection from "@/components/invite/gift-section";
import ThankYouSection from "@/components/invite/thank-you-section";
import FloatingNav from "@/components/invite/floating-nav";

gsap.registerPlugin(ScrollTrigger);

export default function InvitationClient(data: InvitationPageData) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const savedScrollRatio = useRef(0);

  useEffect(() => {
    setIsLoading(false);
    
    // Set initial mobile state and listen for resize
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 860;
      if (newIsMobile !== isMobile) {
        if (!newIsMobile && mainRef.current) {
          const el = mainRef.current;
          savedScrollRatio.current = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
        } else if (newIsMobile && desktopScrollRef.current) {
          const el = desktopScrollRef.current;
          savedScrollRatio.current = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
        }
        setIsMobile(newIsMobile);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Restore scroll position on mobile after switch from desktop
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    const el = mainRef.current;
    if (!el || savedScrollRatio.current <= 0) return;
    el.scrollTop = savedScrollRatio.current * (el.scrollHeight - el.clientHeight);
    savedScrollRatio.current = 0;
  }, [isMobile, isOpen]);

  // Restore scroll position on desktop after switch from mobile
  useEffect(() => {
    if (isMobile || !isOpen) return;
    const el = desktopScrollRef.current;
    if (!el || savedScrollRatio.current <= 0) return;
    el.scrollTop = savedScrollRatio.current * (el.scrollHeight - el.clientHeight);
    savedScrollRatio.current = 0;
  }, [isMobile, isOpen]);

  // Persistent audio ref — tidak terpengaruh remount MusicPlayer
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

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
    if (!isOpen) return;

    const container = isMobile ? mainRef.current : desktopScrollRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("section");
    const scroller = isMobile ? mainRef.current : desktopScrollRef.current;

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
  }, [isOpen, isMobile]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Mobile: fullscreen
  if (isMobile) {
    if (!isOpen) {
      return <CoverSection data={data} onOpen={() => setIsOpen(true)} />;
    }

    return (
      <>
        {isOpen && data.music && (
          <div className="fixed bottom-6 left-6 z-50">
            <MusicPlayer audioRef={audioRef} isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
          </div>
        )}
        <main ref={mainRef} className="relative invitation-theme w-screen h-screen overflow-y-auto"
          style={{
            backgroundImage: "url('/images/background-invitation.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#F5ECE0]/20 pointer-events-none" />
          <ScrollProgress containerRef={mainRef} />
          <OpeningSection data={data} />
          <CoupleSection groom={data.coupleGroom} bride={data.coupleBride} showPhoto={data.settings?.show_couple_photo ?? true} />
          {data.quotes.length > 0 && <QuoteSection quotes={data.quotes} />}
          <EventSection events={data.events} invitation={data.invitation} />
          {data.liveStreaming && <StreamingSection stream={data.liveStreaming} />}
          {data.weddingFrame && <FrameSection frame={data.weddingFrame} />}
          {data.settings?.show_love_story !== false && data.loveStories.length > 0 && <LoveStorySection stories={data.loveStories} />}
          {data.galleryPhotos.length > 0 && <GallerySection photos={data.galleryPhotos} videos={data.galleryVideos} />}
          {data.quotes.length > 1 && <CoupleQuoteSection quotes={data.quotes} />}
          {data.settings?.show_rsvp !== false && <RSVPSection invitationId={data.invitation.id} rsvps={data.rsvps} quotes={data.quotes} />}
          {(data.bankAccounts.length > 0 || data.qris) && (
            <GiftSection bankAccounts={data.bankAccounts} qris={data.qris} settings={data.settings} />
          )}
          <ThankYouSection thankYou={data.thankYou} groom={data.coupleGroom} bride={data.coupleBride} />
          <FloatingNav />
        </main>
      </>
    );
  }

  // Desktop/Tablet: Split screen layout
  return (
      <div className="flex h-screen bg-black overflow-hidden">
        {/* Left side: Hero image fullscreen — flex-1 mengisi sisa setelah panel */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: data.galleryPhotos?.[0]?.photo_url
                ? `url('${data.galleryPhotos[0].photo_url}')`
                : data.coupleBride?.cover_photo_url 
                  ? `url('${data.coupleBride.cover_photo_url}')` 
                  : "url('/images/background_opening.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
            {/* Overlay teks di pojok kiri bawah hero */}
            <div className="absolute bottom-10 left-10 z-10 text-white">
              <p className="font-quicksand text-xl tracking-[0.2em] uppercase opacity-90">
                Undangan Pernikahan
              </p>
              <h1 className="font-italianno text-8xl md:text-9xl lg:text-9xl leading-none mt-2 text-white">
                {data.coupleBride?.nickname || data.coupleBride?.full_name || ""} &amp; {data.coupleGroom?.nickname || data.coupleGroom?.full_name || ""}
              </h1>
              <p className="font-quicksand text-xl tracking-wider mt-3 opacity-80">
                {data.events?.[0]?.start_date
                  ? new Date(data.events[0].start_date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : data.invitation.wedding_date
                    ? new Date(data.invitation.wedding_date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Mobile invitation frame — responsive clamp width */}
        <div className="w-[clamp(360px,30%,540px)] flex items-stretch shrink-0 transition-[width] duration-300 ease-in-out">
          <div className="w-full h-full flex flex-col relative z-10 overflow-hidden"
            style={{
              backgroundImage: "url('/images/background-invitation.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#F5ECE0]/20 pointer-events-none" />
            <div ref={desktopScrollRef} className="flex-1 overflow-y-auto invitation-theme">
              {!isOpen ? (
                <CoverSection data={data} onOpen={() => setIsOpen(true)} isMobileFrame />
              ) : (
                <>
                  <ScrollProgress containerRef={desktopScrollRef} />
                  <OpeningSection data={data} />
                  <CoupleSection groom={data.coupleGroom} bride={data.coupleBride} showPhoto={data.settings?.show_couple_photo ?? true} />
                  {data.quotes.length > 0 && <QuoteSection quotes={data.quotes} />}
                  <EventSection events={data.events} invitation={data.invitation} />
                  {data.liveStreaming && <StreamingSection stream={data.liveStreaming} />}
                  {data.weddingFrame && <FrameSection frame={data.weddingFrame} />}
                  {data.settings?.show_love_story !== false && data.loveStories.length > 0 && <LoveStorySection stories={data.loveStories} />}
                  {data.galleryPhotos.length > 0 && <GallerySection photos={data.galleryPhotos} videos={data.galleryVideos} />}
                  {data.quotes.length > 1 && <CoupleQuoteSection quotes={data.quotes} />}
                  {data.settings?.show_rsvp !== false && <RSVPSection invitationId={data.invitation.id} rsvps={data.rsvps} quotes={data.quotes} />}
                  {(data.bankAccounts.length > 0 || data.qris) && (
                    <GiftSection bankAccounts={data.bankAccounts} qris={data.qris} settings={data.settings} />
                  )}
                  <ThankYouSection thankYou={data.thankYou} groom={data.coupleGroom} bride={data.coupleBride} />
                </>
              )}
            </div>
            {isOpen && data.music && (
              <div className="absolute bottom-6 left-6 z-50">
                <MusicPlayer audioRef={audioRef} isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
