'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/CategoryType';

const CategoryCard: React.FC<Category> = ({
  id,
  code,
  img,
  title,
  rating,
  gender,
}) => {
  
  console.log(title)
  return (
    <Link href={`/shop/${title}`} className="block">
    <div className="relative w-full aspect-[1/1] overflow-hidden rounded-xl shadow-md group">
      <Image
        src={img}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover transition-opacity duration-300 group-hover:opacity-80"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-gradient-to-b from-transparent to-black bg-opacity-50">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mt-1">Code: {code}</p>
        <p className="text-sm mt-1">Rating: {rating}</p>
        <p className="text-sm">{gender === 'k' ? 'Kadın' : 'Erkek'}</p>
      </div>
    </div>
    </Link>
  );
};

export default CategoryCard;
