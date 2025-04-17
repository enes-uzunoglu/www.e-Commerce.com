import React from 'react';
import ProductCard, { ProductCardProps } from './ProductCard'; // Path'i kendi dosya yapınıza göre ayarlayın


const BestSellerProducts: React.FC = () => {
  const fakeBestSellerProducts: ProductCardProps[] = [
    {
      imageUrl: 'https://picsum.photos/400/500?random=1',
      title: 'Şık Desenli Elbise',
      department: 'Kadın Giyim',
      originalPrice: 89.99,
      discountedPrice: 69.99,
      rating: 4.6,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=2',
      title: 'Basic Pamuklu Tişört',
      department: 'Erkek Giyim',
      originalPrice: 39.99,
      discountedPrice: 29.99,
      rating: 4.2,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=3',
      title: 'Rahat Kesim Pantolon',
      department: 'Çocuk Giyim',
      originalPrice: 59.99,
      discountedPrice: 49.99,
      // rating prop'u isteğe bağlı olduğu için burada yok
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=4',
      title: 'Modern Spor Ayakkabı',
      department: 'Ayakkabı',
      originalPrice: 129.99,
      discountedPrice: 99.99,
      rating: 4.9,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=5',
      title: 'Trend Kol Çantası',
      department: 'Aksesuar',
      originalPrice: 79.99,
      discountedPrice: 59.99,
      rating: 4.7,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=6',
      title: 'Akıllı Bluetooth Kulaklık',
      department: 'Elektronik',
      originalPrice: 149.99,
      discountedPrice: 119.99,
      rating: 4.5,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=7',
      title: 'Organik Kahve Çekirdekleri',
      department: 'Gıda',
      originalPrice: 24.99,
      discountedPrice: 19.99,
      rating: 4.3,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=8',
      title: 'Yumuşak Polar Battaniye',
      department: 'Ev Tekstili',
      originalPrice: 49.99,
      discountedPrice: 34.99,
      rating: 4.8,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=9',
      title: 'Macera Dolu Kitap Seti',
      department: 'Kitap',
      originalPrice: 69.99,
      discountedPrice: 49.99,
      rating: 4.4,
    },
    {
      imageUrl: 'https://picsum.photos/400/500?random=10',
      title: 'Profesyonel Makyaj Fırçaları',
      department: 'Kozmetik',
      originalPrice: 54.99,
      discountedPrice: 39.99,
      rating: 4.9,
    },
    // İstediğiniz kadar fake ürün ekleyebilirsiniz (toplam 10 tane oldu)
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-shadow-black">BESTSELLER PRODUCTS</h2>
        <p className="text-gray-600">Problems trying to resolve the conflict between</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:px-0">
        {fakeBestSellerProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellerProducts;