import { createClient } from "@/lib/supabase/server";
import { getInvitation } from "@/lib/auth";
import GiftsPageClient from "./gifts-page-client";

export default async function GiftsPage() {
  const invitation = await getInvitation();
  const supabase = await createClient();

  const [{ data: bankAccounts }, { data: qris }, { data: shippingAddresses }] = await Promise.all([
    supabase.from("bank_accounts").select("*").eq("invitation_id", invitation.id).order("created_at"),
    supabase.from("qris").select("*").eq("invitation_id", invitation.id).limit(1).maybeSingle(),
    supabase.from("shipping_addresses").select("*").eq("invitation_id", invitation.id).order("created_at"),
  ]);

  return <GiftsPageClient bankAccounts={bankAccounts || []} qris={qris} shippingAddresses={shippingAddresses || []} invitationId={invitation.id} />;
}
