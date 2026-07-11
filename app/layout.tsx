import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Mental Trening — mental training for young athletes",
  description:
    "Beginner mental training for young athletes: science-backed lessons, exercises, and an AI coach grounded in peer-reviewed sport psychology research.",
};

export const viewport: Viewport = {
  themeColor: "#0da8a0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white">
        <LanguageProvider>
          <Header />
          <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-4">
            {children}
          </main>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
