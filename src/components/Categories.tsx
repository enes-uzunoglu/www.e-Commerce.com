'use client'
import React, { useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from '@/app/store';
import { categoriesThunk } from '@/lib/Redux-Toolkit/Thunks/CategoriesThunk';
import { Category } from '@/types/CategoryType';


const Categories: React.FC = () => {
  const dispatch=useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(categoriesThunk());
}, [dispatch]);

const categories: Category[] = useSelector((state: RootState) => state.product.categories);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories
        .slice() // orijinal diziyi bozmamak için // kopyası yapıyor yani başı yok sonu da yok ee hepsi dahil
        .sort((a, b) => b.rating - a.rating) // rating'e göre büyükten küçüğe sırala
        .slice(0, 5) // ilk 5 tanesini al // 0 dahil 5 dehıl degıl
        .map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id} // bunu eklemelıydım cunku categoryCard'da kullanıyorum ve bekliyor benden
          img={category.img}
          title={category.title}
          rating={category.rating} 
          code={category.code}
          gender={category.gender}
        />
      ))}
      
    </div>
  );
};

export default Categories;
