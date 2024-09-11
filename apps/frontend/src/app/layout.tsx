import type { Metadata } from "next";
import { NextAuthProvider, ThemeProvider } from "./providers";
import "./globals.scss";
import "./prosemirror.css";
import "react-loading-skeleton/dist/skeleton.css";
import NavBar from "@/components/common/Navigation/NavBar";
import Footer from "@/components/common/Footer";
import { playfair_display, source_serif_4 } from "./fonts";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Neko",
  description: "Serverless blog website with notion like editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${playfair_display.variable} ${source_serif_4.variable} ${GeistMono.variable}`}
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <main className="flex min-h-screen flex-col items-center justify-between">
              <div className="w-full max-w-[1400px]">
                <NavBar />
                {children}
                <Footer />
              </div>
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
