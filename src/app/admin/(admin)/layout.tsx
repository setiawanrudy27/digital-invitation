import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/sidebar";
import { PageTransition } from "@/components/admin/page-transition";

export const metadata: Metadata = {
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='6' fill='%238B3A42'/%3E%3Cpath d='M16 2v4M16 26v4M4.7 4.7l2.8 2.8M24.5 24.5l2.8 2.8M2 16h4M26 16h4M4.7 27.3l2.8-2.8M24.5 7.5l2.8-2.8' stroke='%238B3A42' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="admin-theme min-h-screen bg-background text-foreground">
      <Sidebar userEmail={user?.email ?? ""} />

      <div className="flex flex-1 flex-col lg:pl-72 bg-background">
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
}
