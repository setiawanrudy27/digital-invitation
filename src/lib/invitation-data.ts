import { createPublicClient } from "@/lib/supabase/public-client";

export async function fetchInvitationData(invitationId: string, guestName: string) {
  const supabase = createPublicClient();

  const [
    couples,
    events,
    galleryPhotos,
    galleryVideos,
    loveStories,
    quotes,
    bankAccounts,
    qris,
    music,
    liveStreaming,
    weddingFrame,
    thankYou,
    settings,
    rsvps,
  ] = await Promise.all([
    supabase.from("couples").select("*").eq("invitation_id", invitationId).then((r) => r.data as any),
    supabase.from("events").select("*").eq("invitation_id", invitationId).eq("is_visible", true).order("start_date").then((r) => r.data as any),
    supabase.from("gallery_photos").select("*").eq("invitation_id", invitationId).eq("is_visible", true).order("display_order").then((r) => r.data as any),
    supabase.from("gallery_videos").select("*").eq("invitation_id", invitationId).eq("is_visible", true).then((r) => r.data as any),
    supabase.from("love_stories").select("*").eq("invitation_id", invitationId).order("story_date").then((r) => r.data as any),
    supabase.from("quotes").select("*").eq("invitation_id", invitationId).eq("is_visible", true).order("created_at").then((r) => r.data as any),
    supabase.from("bank_accounts").select("*").eq("invitation_id", invitationId).eq("is_visible", true).then((r) => r.data as any),
    supabase.from("qris").select("*").eq("invitation_id", invitationId).maybeSingle().then((r) => r.data as any),
    supabase.from("music").select("*").eq("invitation_id", invitationId).eq("is_visible", true).maybeSingle().then((r) => r.data as any),
    supabase.from("live_streaming").select("*").eq("invitation_id", invitationId).eq("is_visible", true).maybeSingle().then((r) => r.data as any),
    supabase.from("wedding_frame").select("*").eq("invitation_id", invitationId).eq("is_visible", true).maybeSingle().then((r) => r.data as any),
    supabase.from("thank_you").select("*").eq("invitation_id", invitationId).maybeSingle().then((r) => r.data as any),
    supabase.from("settings").select("*").eq("invitation_id", invitationId).maybeSingle().then((r) => r.data as any),
    supabase.from("rsvps").select("*").eq("invitation_id", invitationId).eq("is_visible", true).order("created_at", { ascending: false }).then((r) => r.data as any),
  ]);

  const coupleGroom = couples?.find((c: any) => c.person_type === "groom") ?? null;
  const coupleBride = couples?.find((c: any) => c.person_type === "bride") ?? null;

  return {
    coupleGroom,
    coupleBride,
    events: events ?? [],
    galleryPhotos: galleryPhotos ?? [],
    galleryVideos: galleryVideos ?? [],
    loveStories: loveStories ?? [],
    quotes: quotes ?? [],
    bankAccounts: bankAccounts ?? [],
    qris: qris ?? null,
    music: music ?? null,
    liveStreaming: liveStreaming ?? null,
    weddingFrame: weddingFrame ?? null,
    thankYou: thankYou ?? null,
    settings: settings ?? null,
    rsvps: rsvps ?? [],
    guestName,
  };
}
