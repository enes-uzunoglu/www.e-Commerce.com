import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export interface ProductCardProps {
  size?: 'large' | 'small';
  title: string;
  exploreText: string;
  exploreLink: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  size = 'small',
  title,
  exploreText,
  exploreLink,
  imageUrl,
}) => {
  const largeCardClasses = size === 'large' ? 'md:col-span-2' : '';
  const smallOverlayClasses = size === 'small' ? 'p-3' : 'p-4';
  const smallTitleClasses = size === 'small' ? 'text-sm' : 'text-base';
  const smallButtonClasses = size === 'small' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm';

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-md ${largeCardClasses} bg-white`}>
      <div className="relative w-full">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full h-auto"
        />
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full bg-blue-600 bg-opacity-80 text-white flex flex-col items-start ${smallOverlayClasses}`}
      >
        <h3 className={`font-semibold mb-2 ${smallTitleClasses}`}>{title}</h3>
        <a
          href={exploreLink}
          className={`bg-white text-blue-600 font-bold rounded-md transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200 active:scale-95 cursor-pointer ${smallButtonClasses}`}
        >
          {exploreText}
        </a>
      </div>
    </div>
  );
};

const TopProduct: React.FC = () => {
  const placeholderLargeUrl = 'https://picsum.photos/1200/600';
  const placeholderSmallUrl1 = 'https://picsum.photos/600/400';
  const placeholderSmallUrl2 = 'https://picsum.photos/600/400?random=1';

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 row-span-2 relative rounded-lg overflow-hidden shadow-md bg-white">
          <div className="relative w-full">
            <Image
              src={placeholderLargeUrl}
              alt="Large Placeholder"
              width={1200}
              height={600}
              className="object-cover w-full h-auto"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-1/4 bg-blue-600 bg-opacity-80 text-white p-6 flex flex-col justify-center items-start">
            <h3 className="font-semibold mb-3 text-xl">Top Product Of the Week</h3>
            <a
              href="#"
              className="bg-white text-blue-600 font-bold rounded-md transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200 active:scale-95 cursor-pointer px-6 py-3 text-sm"
            >
              EXPLORE ITEMS
            </a>
          </div>
        </div>

        <ProductCard
          title="Top Product Of the Week"
          exploreText="EXPLORE ITEMS"
          exploreLink="#"
          imageUrl={placeholderSmallUrl1}
        />
        <ProductCard
          title="Top Product Of the Week"
          exploreText="EXPLORE ITEMS"
          exploreLink="#"
          imageUrl={placeholderSmallUrl2}
        />
      </div>
    </div>
  );
};

export default TopProduct;