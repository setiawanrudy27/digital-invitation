import { createClient } from "@/lib/supabase/server";
import InvitationPageClient from "./invitation-page-client";

export default async function InvitationPage() {
  const supabase = await createClient();

  const { data: invitations } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });

  return <InvitationPageClient invitations={invitations || []} />;
}
