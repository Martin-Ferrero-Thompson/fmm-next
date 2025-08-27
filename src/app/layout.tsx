// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- Import Navbar
import Footer from "@/components/Footer"; // <-- Import Footer

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
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
        <Navbar /> {/* <-- Add Navbar here */}
        <main className="min-h-screen">
          {children}
        </main>
        <Footer /> {/* <-- Add Footer here */}
      </body>
    </html>
  );
}