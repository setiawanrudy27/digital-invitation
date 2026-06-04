import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import GuestsPageClient from "./guests-page-client";

export default async function GuestsPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_id", invitation.id)
    .order("name", { ascending: true });

  const { data: settings } = await supabase
    .from("settings")
    .select("whatsapp_template")
    .eq("invitation_id", invitation.id)
    .maybeSingle() as any;

  return (
    <GuestsPageClient
      guests={guests || []}
      invitationSlug={invitation.slug}
      invitationId={invitation.id}
      whatsappTemplate={(settings as any)?.whatsapp_template ?? null}
    />
  );
}
