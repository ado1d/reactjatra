import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ReactJatra — Master React in 7 Days (English + বাংলা)",
  description:
    "A complete interactive React course: 8-day curriculum, 30+ live-editable examples, a browser playground, timed coding challenges, and 20+ interview questions — in English and Bengali.",
  keywords: [
    "React",
    "learn React",
    "React tutorial",
    "React বাংলা",
    "React Bengali",
    "JavaScript",
    "hooks",
    "interview prep",
  ],
  icons: {
    icon:
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="6" fill="%2322d3ee"/><g fill="none" stroke="%2322d3ee" stroke-width="3"><ellipse cx="32" cy="32" rx="28" ry="12"/><ellipse cx="32" cy="32" rx="28" ry="12" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="28" ry="12" transform="rotate(120 32 32)"/></g></svg>'
      ),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
