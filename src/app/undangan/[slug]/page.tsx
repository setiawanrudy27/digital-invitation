import { notFound } from "next/navigation";
import { createPublicClient } from "@/lib/supabase/public-client";
import { fetchInvitationData } from "@/lib/invitation-data";
import InvitationClient from "@/app/invite/[slug]/invitation-client";

export const dynamic = "force-dynamic";

export default async function UndanganPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ guest?: string }>;
}) {
  const { slug } = await params;
  const { guest: guestName = "" } = await searchParams;
  const supabase = createPublicClient();

  const invitation = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()
    .then((r) => r.data) as any;

  if (!invitation) {
    notFound();
  }

  const data = await fetchInvitationData(invitation.id, guestName);

  return (
    <InvitationClient
      invitation={invitation}
      {...data}
    />
  );
}
