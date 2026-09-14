import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://qorirudywedding.netlify.app"
  ),
  title: {
    default: "Digital Invitation Platform",
    template: "%s | Digital Invitation",
  },
  description: "Platform undangan digital pernikahan",
  icons: {
    icon: "/images/faviconlink.png",
    shortcut: "/images/faviconlink.png",
    apple: "/images/faviconlink.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
