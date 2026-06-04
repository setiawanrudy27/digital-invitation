import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import RSVPPageClient from "./rsvp-page-client";

export default async function RSVPPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("created_at", { ascending: false });

  return <RSVPPageClient rsvps={rsvps || []} invitationId={invitation.id} />;
}
