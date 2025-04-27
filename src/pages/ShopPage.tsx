'use client';

import Categories from '@/components/Categories'
import ProductList from '@/components/ProductList';


const ShopPage = () => {
  return (
    <div className="container mx-auto px-9 ">
      <h1 className="text-2xl font-bold mb-4">Our Categories</h1>
      <Categories />
      <ProductList />
    </div>
  );
};

export default ShopPage;