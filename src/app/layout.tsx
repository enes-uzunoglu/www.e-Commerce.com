// Metadata türünü "next" paketinden import ediyorsun.
import type { Metadata } from "next";
// TODO:İstediğin fontları "next/font/google" paketinden import ediyorsun.
import { Geist, Protest_Guerrilla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// İstediğin fontları değişkene atıyorsun.
// Bu şekilde font yüklemesine dinamik yükleme denir.
// Yani fontlar sadece ihtiyaç duyulduğunda yüklenir.
// Bu, sayfa yükleme süresini iyileştirebilir.
// Ayrıca, fontların değişkenlerini CSS'de kullanabilirsin.
// Örneğin: font-family: var(--font-geist-sans);

// TODO: Bu yapıyı kullanarak istediğin fontları ekleyebilirsin.
// Object türünde bir değişken oluşturuyorsun.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Örnek
const protestGuerrilla = Protest_Guerrilla({
  variable: "--font-protest-guerrilla",
  subsets: ["latin"],
  weight: "400" // Bazı fontlar için weight ayarı zorunludur.
});

// Metadata, bir içeriğin (örneğin bir web sayfası, doküman, görsel vb.) hakkında bilgi sağlayan veridir.
// TODO: Burada SEO optimizasyonu için açıklama ve başlık ekleyin.
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
      {/* TODO:Bunu "en" iken "tr" yapıyoruz. 
          Sayfanın Türkçe içerik barındırabilmesi için.
      */}

      {/* 
          <meta charset="UTF-8" />

              // Default olarak zaten eklenir.

          <link rel="icon" type="image/png" href="/cerezmalatyalogo.png" />

              // Direkt favicon.ico olarak src/app içinde ekliyoruz.

          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"> 
          
              // Font yüklemesini dinamik olarka yapıyoruz artık.

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

              // Default olarak zaten eklenir.

          <meta name="description" content="Çerez Malatya, Malatya'nın en iyi çerez markasıdır." />

              // Metadata'da description ekliyoruz.

          <title>Çerez Malatya</title>

              // Metadata'da title ekliyoruz.
      */}
          
      {/* <head>
            Spesifik bir sayfaya özel meta tag'ler eklemek için 'head' kullanılır.
          </head> 
      */}
      
      <body
        className={`${geistSans.variable} ${protestGuerrilla.variable} antialiased`}
        // TODO: antialiased: Bu, CSS'te antialiasing (kenar yumuşatma) uygulamak için kullanılan bir sınıftır.
        // Yazıların daha pürüzsüz görünmesini sağlamak için kullanılır. Genellikle daha estetik bir font görünümü elde etmek için eklenir.
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
