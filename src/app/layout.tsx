import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// 1. Luxury Serif for Headings
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// 2. Clean Sans-Serif for UI and Data
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goshen OS | Admin",
  description: "Reservations and Operations Management for Goshen Laikipia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-[#F4F1EB] text-[#2C2A25] antialiased selection:bg-[#591C27] selection:text-[#F4F1EB]">
        {children}
      </body>
    </html>
  );
}