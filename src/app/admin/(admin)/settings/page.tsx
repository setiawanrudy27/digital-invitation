import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import SettingsPageClient from "./settings-page-client";

export default async function SettingsPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .eq("invitation_id", invitation.id)
    .limit(1)
    .maybeSingle();

  return <SettingsPageClient settings={settings} invitationId={invitation.id} />;
}
