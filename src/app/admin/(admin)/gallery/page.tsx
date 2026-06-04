import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import GalleryPageClient from "./gallery-page-client";

export default async function GalleryPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const [
    { data: photos },
    { data: videos },
    { data: liveStream },
    { data: music },
    { data: weddingFrame },
  ] = await Promise.all([
    supabase.from("gallery_photos").select("*").eq("invitation_id", invitation.id).order("display_order"),
    supabase.from("gallery_videos").select("*").eq("invitation_id", invitation.id).order("created_at"),
    supabase.from("live_streaming").select("*").eq("invitation_id", invitation.id).limit(1).maybeSingle(),
    supabase.from("music").select("*").eq("invitation_id", invitation.id).order("created_at"),
    supabase.from("wedding_frame").select("*").eq("invitation_id", invitation.id).limit(1).maybeSingle(),
  ]);

  return (
    <GalleryPageClient
      photos={photos || []}
      videos={videos || []}
      liveStream={liveStream}
      music={music || []}
      weddingFrame={weddingFrame}
      invitationId={invitation.id}
    />
  );
}
