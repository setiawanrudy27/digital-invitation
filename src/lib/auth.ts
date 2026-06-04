import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAuth() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function getInvitation() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let { data } = await supabase
    .from("invitations")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!data) {
    const baseSlug =
      user.email?.split("@")[0]?.toLowerCase().replace(/[^a-z0-9-]/g, "-") ||
      `wedding-${user.id.slice(0, 8)}`;

    let slug = baseSlug;
    let counter = 1;
    while (true) {
      const { data: existing } = await supabase
        .from("invitations")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const { data: newInvitation, error } = await supabase
      .from("invitations")
      .insert({
        title: "Undangan Pernikahan",
        slug,
        wedding_date: new Date().toISOString().split("T")[0],
        user_id: user.id,
      } as any)
      .select()
      .single();

    if (error) throw error;
    data = newInvitation;
  }

  return data as any;
}
