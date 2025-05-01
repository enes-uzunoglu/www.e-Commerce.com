'use client'
import React, {  useEffect } from 'react';
import ProductCard from './ProductCard'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/Redux-Toolkit/store';
import { productListThunk } from '@/lib/Redux-Toolkit/Thunks/ProductListThunk';


const BestSellerProducts: React.FC = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(productListThunk({limit: 587})); 
  }
, [dispatch]);

const productList = useSelector((state: RootState) => state.product.productList);

const sortedProductList = productList?.products 
  ? productList.products.slice().sort((a, b) => b.sell_count - a.sell_count)
  : [];
 // En çok satanları sıralıyoruz
  //slice()   bu orjinal diziyi değiştirmeden yeni bir dizi döndürür. Bu nedenle orijinal diziyi koruruz. önemli !!!!

  const BestSellerProductList = sortedProductList.slice(0, 10); // İlk 8 ürünü alıyoruz

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-shadow-black">BESTSELLER PRODUCTS</h2>
        <p className="text-gray-600">Problems trying to resolve the conflict between</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:px-0">
        {BestSellerProductList.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellerProducts;