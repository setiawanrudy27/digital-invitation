import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import EventsPageClient from "./events-page-client";

export default async function EventsPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("start_date", { ascending: true });

  return <EventsPageClient events={events || []} invitationId={invitation.id} />;
}
