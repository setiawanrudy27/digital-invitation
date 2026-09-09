import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invitation_id, guest_name, attending, guest_count, message } = body;

    if (!invitation_id || !guest_name?.trim()) {
      return NextResponse.json(
        { error: "invitation_id dan nama tamu diperlukan." },
        { status: 400 }
      );
    }

    if (attending === null || attending === undefined) {
      return NextResponse.json(
        { error: "Status kehadiran harus dipilih." },
        { status: 400 }
      );
    }

    const supabase = createPublicClient();
    const { error } = await supabase.from("rsvps").insert({
      invitation_id,
      guest_name: guest_name.trim(),
      attending,
      guest_count: attending ? (guest_count || 1) : 0,
      message: message?.trim() || null,
    } as any);

    if (error) {
      console.error("RSVP insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (err) {
    console.error("RSVP API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
