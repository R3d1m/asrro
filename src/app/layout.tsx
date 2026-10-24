import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASRRO — Andromeda Space & Robotics Research Organization | CUET",
  description: "Official web portal of Andromeda Space and Robotics Research Organization (ASRRO) at Chittagong University of Engineering & Technology (CUET). World Champion at Global Space Challenge 2025 and creators of STARLAP, CUET's first student-built sounding rocket.",
  keywords: ["ASRRO", "CUET", "Sounding Rocket", "STARLAP", "Robotics", "Space Science", "Andromeda Galaxy", "Global Space Challenge", "Bangladesh Aerospace"],
  authors: [{ name: "ASRRO IT & Research Division" }],
  openGraph: {
    title: "ASRRO — Engineering Beyond Earth's Horizon | CUET",
    description: "Frontier student aerospace and robotics research organization at CUET, Bangladesh. Pioneers of the STARLAP sounding rocket and World Champions in Global Space Challenge 2025.",
    url: "https://www.asrrocuetbd.org",
    siteName: "ASRRO CUET",
    locale: "en_BD",
    type: "website",
  },
  icons: {
    icon: "/images/asrrologo.png",
    apple: "/images/asrrologo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-zinc-950 antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
