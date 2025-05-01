
import type { Metadata } from "next";
import { Geist, Protest_Guerrilla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/lib/Redux-Toolkit/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const protestGuerrilla = Protest_Guerrilla({
  variable: "--font-protest-guerrilla",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "website adı",
  description: " 'website adı' isimli websitesi için Türkçe dilinde SEO optimizasyonu yüksek açıklama oluştur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${protestGuerrilla.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="pt-28 pb-72">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}