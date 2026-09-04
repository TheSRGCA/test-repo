import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sergio Armando (SRGCA) — Brand & Product Leader",
  description: "Sergio Armando (SRGCA) — Founder of Doomsday Brand. Product, brand, and creative strategy for global music and lifestyle brands.",
  keywords: ["Sergio Armando", "SRGCA", "Doomsday Brand", "hardstyle", "product management", "brand strategy", "electronic music"],
  authors: [{ name: "Sergio Armando" }],
  creator: "Sergio Armando",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srgca.online",
    siteName: "SRGCA",
    title: "Sergio Armando (SRGCA) — Brand & Product Leader",
    description: "Founder of Doomsday Brand. Product, brand, and creative strategy for global music and lifestyle brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergio Armando (SRGCA) — Brand & Product Leader",
    description: "Founder of Doomsday Brand. Product, brand, and creative strategy for global music and lifestyle brands.",
    creator: "@TheSRG_CA",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://srgca.online"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}
    >
      <body className="min-h-screen flex flex-col bg-black text-zinc-100">{children}</body>
    </html>
  );
}
