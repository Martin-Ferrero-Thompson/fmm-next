// src/app/layout.tsx
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from '@vercel/speed-insights/next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fleet Mucky Mayhem",
  description: "A social cycling group in Fleet, Hampshire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-200 flex flex-col min-h-screen`}>
        <Navbar />

        <main className="flex-grow bg-gray-900">
          {children}
        </main>
        
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}