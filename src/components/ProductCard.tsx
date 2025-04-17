import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export interface ProductCardProps {
  imageUrl: string;
  title: string;
  department: string;
  originalPrice: number;
  discountedPrice: number;
  rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  department,
  originalPrice,
  discountedPrice,
  rating,
}) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <div className="relative w-full">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={400}
          className="object-cover w-full h-auto"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{department}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-sm line-through text-gray-500">${originalPrice.toFixed(2)}</span>
            <span className="ml-2 text-md font-bold text-indigo-600">${discountedPrice.toFixed(2)}</span>
          </div>
          {rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <button
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-200 active:bg-indigo-700 active:scale-95 cursor-pointer"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;