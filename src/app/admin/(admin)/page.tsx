import { createClient } from "@/lib/supabase/server";
import { requireAuth, getInvitation } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, CalendarDays, Users, Image, ArrowRight, Sparkles, ExternalLink, BookOpen, Lightbulb } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/admin/stagger-grid";

export default async function AdminDashboard() {
  await requireAuth();
  const invitation = await getInvitation();
  const supabase = await createClient();

  if (!invitation) {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600/70">Wedding studio</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Start your first luxury invitation.
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Create your first celebration experience and guide every guest with effortless romance.
          </p>
        </div>

        <Card variant="glass" className="relative overflow-hidden border border-brand-100 bg-brand-50/90 shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,30,84,0.08),transparent_35%)]" />
          <CardContent className="relative py-16 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-brand-400 via-brand-500 to-brand-600 text-white shadow-xl shadow-brand-500/25">
              <Heart className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">No invitations yet</h3>
              <p className="text-sm text-muted-foreground">Launch your first wedding invitation and host every detail with grace.</p>
            </div>
            <Button variant="gradient-brand" size="lg" className="mx-auto">
              <Sparkles className="h-4 w-4" />
              Create New Invitation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [
    { count: couplesCount },
    { count: eventsCount },
    { count: guestsCount },
    { count: photosCount },
  ] = await Promise.all([
    supabase.from("couples").select("*", { count: "exact", head: true }).eq("invitation_id", invitation.id),
    supabase.from("events").select("*", { count: "exact", head: true }).eq("invitation_id", invitation.id),
    supabase.from("guests").select("*", { count: "exact", head: true }).eq("invitation_id", invitation.id),
    supabase.from("gallery_photos").select("*", { count: "exact", head: true }).eq("invitation_id", invitation.id),
  ]);

  const stats = [
    {
      label: "Mempelai",
      value: couplesCount ?? 0,
      icon: Heart,
      gradient: "from-brand-400 via-brand-500 to-brand-600",
    },
    {
      label: "Acara",
      value: eventsCount ?? 0,
      icon: CalendarDays,
      gradient: "from-brand-500 via-brand-600 to-brand-700",
    },
    {
      label: "Tamu",
      value: guestsCount ?? 0,
      icon: Users,
      gradient: "from-brand-400 via-brand-500 to-brand-600",
    },
    {
      label: "Galeri",
      value: photosCount ?? 0,
      icon: Image,
      gradient: "from-brand-500 via-brand-600 to-brand-700",
    },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const inviteUrl = `${siteUrl}/invite/${invitation.slug}`;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-600/70">Luxury wedding dashboard</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          A refined view of every wedding detail.
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Manage your invitation, guests, events and gallery in a soft, modern control center crafted for premium celebrations.
        </p>
      </div>

      <Card variant="glass" className="relative overflow-hidden border border-brand-100 bg-brand-50/90 shadow-glow">
        <div className="absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-300/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-600/70">Undangan Digital</p>
              <p className="text-sm text-muted-foreground break-all">{inviteUrl}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm font-medium transition-all duration-200 border border-brand-300 bg-brand-800 text-white hover:bg-brand-700"
              >
                <ExternalLink className="h-4 w-4" />
                Buka Undangan
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StaggerItem key={stat.label}>
              <Card variant="glass" className="relative overflow-hidden border border-brand-200/25 bg-surface/95 shadow-glow">
                <div className={`absolute -right-12 -top-10 h-32 w-32 rounded-full bg-linear-to-br ${stat.gradient} opacity-20 blur-3xl`} />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-linear-to-br ${stat.gradient} text-white shadow-xl shadow-current/20`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground dark:text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-secondary-foreground">Key count for your celebration flow</p>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGrid>



      <div className="grid gap-5 lg:grid-cols-2">
        <Card variant="glass" className="border border-brand-200 bg-brand-50/90 shadow-glow">
          <CardContent className="p-7">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-brand-100 text-brand-800">
                <BookOpen className="h-5 w-5" />
              </div>
              <ArrowRight className="h-5 w-5 text-brand-600/70" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Need help?</h3>
            <p className="text-sm text-muted-foreground mb-4">Explore documentation and best practices for crafting the perfect wedding experience.</p>
            <Button variant="ghost" className="text-foreground border border-brand-200 bg-brand-50/90 hover:bg-brand-100">
              Read Documentation
            </Button>
          </CardContent>
        </Card>
        <Card variant="glass" className="border border-brand-200 bg-brand-50/90 shadow-glow">
          <CardContent className="p-7">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-brand-100 text-brand-800">
                <Lightbulb className="h-5 w-5" />
              </div>
              <ArrowRight className="h-5 w-5 text-brand-600/70" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Tips &amp; best practices</h3>
            <p className="text-sm text-muted-foreground mb-4">Create a memorable invitation with thoughtful pacing, styling, and guest touches.</p>
            <Button variant="ghost" className="text-foreground border border-brand-200 bg-brand-50/90 hover:bg-brand-100">
              View Tips
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
