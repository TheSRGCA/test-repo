import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MatrixBackground from "./components/MatrixBackground";

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
  title: "Sergio Armando (SRGCA) — Brand Strategy | E-Commerce | Digital Marketing | Analytics",
  description: "Sergio Armando (SRGCA) — Building brands, developing digital commerce experiences, and connecting creative strategy with technology and data-driven business growth.",
  keywords: ["Sergio Armando", "SRGCA", "project management", "brand strategy", "digital media", "entertainment", "product management"],
  authors: [{ name: "Sergio Armando" }],
  creator: "Sergio Armando",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srgca.online",
    siteName: "SRGCA",
    title: "Sergio Armando (SRGCA) — Brand Strategy | E-Commerce | Digital Marketing | Analytics",
    description: "Building brands, developing digital commerce experiences, and connecting creative strategy with technology and data-driven business growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergio Armando (SRGCA) — Brand Strategy | E-Commerce | Digital Marketing | Analytics",
    description: "Building brands, developing digital commerce experiences, and connecting creative strategy with technology and data-driven business growth.",
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
      <body className="min-h-screen flex flex-col bg-black text-zinc-100">
        <MatrixBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
