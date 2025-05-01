import { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { Geist, Protest_Guerrilla } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/lib/Redux-Toolkit/Providers';

// İstediğin fontları değişkene atıyorsun.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const protestGuerrilla = Protest_Guerrilla({
  variable: '--font-protest-guerrilla',
  subsets: ['latin'],
  weight: '400', // Bazı fontlar için weight ayarı zorunludur.
});

// Metadata, SEO optimizasyonu için açıklama ve başlık eklemek.
export const metadata: Metadata = {
  title: 'website adı',
  description: 'SEO optimizasyonu yüksek açıklama.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  // Sunucu tarafı render'da Navbar ve Footer'ı engellemek için kullanıyoruz.
  useEffect(() => {
    setIsClient(true); // component mount olduktan sonra true yapıyoruz
  }, []);

  if (!isClient) {
    return (
      <html lang="tr">
        <body
          className={`${geistSans.variable} ${protestGuerrilla.variable} antialiased`}
        />
      </html>
    );
  }

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${protestGuerrilla.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="pt-28 pb-72">
            {/* örnek değerler */}
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
