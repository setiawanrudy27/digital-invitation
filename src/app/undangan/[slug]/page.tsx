import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public-client";
import { fetchInvitationData } from "@/lib/invitation-data";
import InvitationClient from "@/app/invite/[slug]/invitation-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createPublicClient();

  const invitation = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()
    .then((r) => r.data) as any;

  if (!invitation) return { title: "Not Found" };

  const [couples, galleryPhotos] = await Promise.all([
    supabase.from("couples").select("cover_photo_url, person_type").eq("invitation_id", invitation.id) as any,
    supabase.from("gallery_photos").select("photo_url").eq("invitation_id", invitation.id).eq("is_visible", true).order("display_order").limit(1) as any,
  ]);

  const bride = couples.data?.find((c: any) => c.person_type === "bride");
  const ogImage = galleryPhotos.data?.[0]?.photo_url || bride?.cover_photo_url || "/images/background_opening.jpg";

  return {
    title: invitation.title,
    description: "Wedding Invitation",
    openGraph: {
      title: invitation.title,
      description: "Wedding Invitation",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

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
