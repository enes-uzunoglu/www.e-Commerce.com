'use client';

import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/ProductType';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/Redux-Toolkit/store';
import { addToCart } from '@/lib/Redux-Toolkit/Slices/ShoppingCartSlice';

const ProductCard: React.FC<Product> = ({
  id,
  name,
  description,
  price,
  stock,
  store_id,
  category_id,
  rating,
  sell_count,
  images,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        image: images?.[0]?.url || '',
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden">
      <Link href={`/products/${id}`}>
        <div className="relative w-full cursor-pointer">
          <Image
            src={images?.[0]?.url || '/placeholder.jpg'}
            alt={name}
            width={300}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-md font-bold text-indigo-600">${price.toFixed(2)}</span>
          {rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-200 active:bg-indigo-700 active:scale-95 cursor-pointer"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
