import { notFound } from "next/navigation";
import { createPublicClient } from "@/lib/supabase/public-client";
import { fetchInvitationData } from "@/lib/invitation-data";
import InvitationClient from "../../[slug]/invitation-client";

export const dynamic = "force-dynamic";

export default async function GuestInvitePage({
  params,
}: {
  params: Promise<{ to: string }>;
}) {
  const { to } = await params;
  const supabase = createPublicClient();

  const guest = await supabase
    .from("guests")
    .select("invitation_id, name")
    .eq("slug", to)
    .maybeSingle()
    .then((r) => r.data) as any;

  if (!guest) {
    notFound();
  }

  const invitation = await supabase
    .from("invitations")
    .select("*")
    .eq("id", guest.invitation_id)
    .maybeSingle()
    .then((r) => r.data) as any;

  if (!invitation) {
    notFound();
  }

  const data = await fetchInvitationData(invitation.id, guest.name);

  return (
    <InvitationClient
      invitation={invitation}
      {...data}
    />
  );
}
