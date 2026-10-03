import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syncopate } from "next/font/google";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-syncopate",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nazmul Huda | Full Stack Developer",
  description:
    "Portfolio of Nazmul Huda - Full Stack Developer specializing in modern web applications with React, Next.js, and the MERN stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetBrainsMono.variable} ${syncopate.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "oklch(var(--b1))",
              color: "oklch(var(--bc))",
              border: "1px solid oklch(var(--b3))",
            },
          }}
        />
      </body>
    </html>
  );
}
