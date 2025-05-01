// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos', 'via.placeholder.com', 'workintech-fe-ecommerce.onrender.com', 'cdn.dsmcdn.com'],
    unoptimized: true, // Statik dışa aktarma için gerekli
  },
  output: 'export',
};

export default nextConfig;