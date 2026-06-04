import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import QuotesPageClient from "./quotes-page-client";

export default async function QuotesPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("created_at", { ascending: true });

  return <QuotesPageClient quotes={quotes || []} invitationId={invitation.id} />;
}
