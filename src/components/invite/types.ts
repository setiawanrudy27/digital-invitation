import type { Database } from "@/lib/supabase/database.types";

export type Invitation = Database["public"]["Tables"]["invitations"]["Row"];
export type Couple = Database["public"]["Tables"]["couples"]["Row"];
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type GalleryPhoto = Database["public"]["Tables"]["gallery_photos"]["Row"];
export type GalleryVideo = Database["public"]["Tables"]["gallery_videos"]["Row"];
export type LoveStory = Database["public"]["Tables"]["love_stories"]["Row"];
export type Quote = Database["public"]["Tables"]["quotes"]["Row"];
export type BankAccount = Database["public"]["Tables"]["bank_accounts"]["Row"];
export type QRIS = Database["public"]["Tables"]["qris"]["Row"];
export type Music = Database["public"]["Tables"]["music"]["Row"];
export type LiveStreaming = Database["public"]["Tables"]["live_streaming"]["Row"];
export type WeddingFrame = Database["public"]["Tables"]["wedding_frame"]["Row"];
export type ThankYou = Database["public"]["Tables"]["thank_you"]["Row"];
export type Setting = Database["public"]["Tables"]["settings"]["Row"];
export type RSVP = Database["public"]["Tables"]["rsvps"]["Row"];

export interface InvitationPageData {
  invitation: Invitation;
  coupleGroom: Couple | null;
  coupleBride: Couple | null;
  events: Event[];
  galleryPhotos: GalleryPhoto[];
  galleryVideos: GalleryVideo[];
  loveStories: LoveStory[];
  quotes: Quote[];
  bankAccounts: BankAccount[];
  qris: QRIS | null;
  music: Music | null;
  liveStreaming: LiveStreaming | null;
  weddingFrame: WeddingFrame | null;
  thankYou: ThankYou | null;
  settings: Setting | null;
  rsvps: RSVP[];
  guestName: string;
}
