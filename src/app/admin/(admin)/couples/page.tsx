import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import CouplesPageClient from "./couples-page-client";

export default async function CouplesPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: couples } = await supabase
    .from("couples")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("created_at", { ascending: true });

  return <CouplesPageClient couples={couples || []} invitationId={invitation.id} />;
}

