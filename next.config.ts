import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['picsum.photos', 'via.placeholder.com', 'workintech-fe-ecommerce.onrender.com', 'cdn.dsmcdn.com'], // Picsum photos domaini eklendi
  },
  // SSR sırasında Redux sorunlarını çözmek için:
  output: "export", // veya bu satırı kaldırıp sadece mevcut ayarları kullanabilirsiniz
};

export default nextConfig;