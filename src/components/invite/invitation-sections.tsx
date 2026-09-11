"use client";

import type { InvitationPageData } from "@/components/invite/types";
import ScrollProgress from "@/components/invite/scroll-progress";
import SaveTheDateSection from "@/components/invite/save-the-date-section";
import CoupleSection from "@/components/invite/couple-section";
import EventSection from "@/components/invite/event-section";
import StreamingSection from "@/components/invite/streaming-section";
import FrameSection from "@/components/invite/frame-section";
import LoveStorySection from "@/components/invite/love-story-section";
import PhotoboothSection from "@/components/invite/photobooth-section";
import GallerySection from "@/components/invite/gallery-section";
import CoupleQuoteSection from "@/components/invite/couple-quote-section";
import RSVPSection from "@/components/invite/rsvp-section";
import GiftSection from "@/components/invite/gift-section";
import ThankYouSection from "@/components/invite/thank-you-section";

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
