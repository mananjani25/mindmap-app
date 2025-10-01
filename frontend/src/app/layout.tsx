import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers"; // Import the new provider
import "./globals.css";
import './globals.css';
import './cursor-fix.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindMap - AI-Powered Test & Document Management,updated by amit",
  description: "Professional platform for test creation, document processing, and mind map generation",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        {/* Wrap children with the Providers component */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}