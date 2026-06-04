import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import LoveStoriesPageClient from "./love-stories-page-client";

export default async function LoveStoriesPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: stories } = await supabase
    .from("love_stories")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("story_date", { ascending: true });

  return <LoveStoriesPageClient stories={stories || []} invitationId={invitation.id} />;
}
