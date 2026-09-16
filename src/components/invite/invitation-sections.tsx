"use client";

import dynamic from "next/dynamic";
import type { InvitationPageData } from "@/components/invite/types";
import PhotoboothSection from "@/components/invite/photobooth-section";

const ScrollProgress = dynamic(() => import("@/components/invite/scroll-progress"), { ssr: false });
const SaveTheDateSection = dynamic(() => import("@/components/invite/save-the-date-section"), { ssr: false });
const CoupleSection = dynamic(() => import("@/components/invite/couple-section"), { ssr: false });
const EventSection = dynamic(() => import("@/components/invite/event-section"), { ssr: false });
const StreamingSection = dynamic(() => import("@/components/invite/streaming-section"), { ssr: false });
const FrameSection = dynamic(() => import("@/components/invite/frame-section"), { ssr: false });
const LoveStorySection = dynamic(() => import("@/components/invite/love-story-section"), { ssr: false });
const GallerySection = dynamic(() => import("@/components/invite/gallery-section"), { ssr: false });
const CoupleQuoteSection = dynamic(() => import("@/components/invite/couple-quote-section"), { ssr: false });
const RSVPSection = dynamic(() => import("@/components/invite/rsvp-section"), { ssr: false });
const GiftSection = dynamic(() => import("@/components/invite/gift-section"), { ssr: false });
const ThankYouSection = dynamic(() => import("@/components/invite/thank-you-section"), { ssr: false });

interface Props {
  data: InvitationPageData;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function InvitationSections({ data, containerRef }: Props) {
  return (
    <>
      <ScrollProgress containerRef={containerRef} />
      <SaveTheDateSection data={data} />
      <CoupleSection groom={data.coupleGroom} bride={data.coupleBride} showPhoto={data.settings?.show_couple_photo ?? true} />
      <EventSection events={data.events} invitation={data.invitation} />
      {data.liveStreaming && <StreamingSection stream={data.liveStreaming} />}
      {data.weddingFrame && <FrameSection frame={data.weddingFrame} />}
      {data.settings?.show_love_story !== false && data.loveStories.length > 0 && <LoveStorySection stories={data.loveStories} />}
      <PhotoboothSection groom={data.coupleGroom} bride={data.coupleBride} />
      {data.galleryPhotos.length > 0 && <GallerySection photos={data.galleryPhotos} videos={data.galleryVideos} />}
      {data.quotes.length > 1 && <CoupleQuoteSection quotes={data.quotes} />}
      {data.settings?.show_rsvp !== false && <RSVPSection invitationId={data.invitation.id} rsvps={data.rsvps} quotes={data.quotes} />}
      {(data.bankAccounts.length > 0 || data.qris) && (
        <GiftSection bankAccounts={data.bankAccounts} qris={data.qris} settings={data.settings} />
      )}
      <ThankYouSection thankYou={data.thankYou} groom={data.coupleGroom} bride={data.coupleBride} />
    </>
  );
}
