'use client';

import Categories from '@/components/Categories';
import { Category } from '@/types/category';

const fakeCategoryData: Category[] = [
  {
    imageUrl: 'https://picsum.photos/id/10/300/300',
    categoryName: 'Category 1',
    itemCount: 15,
  },
  {
    imageUrl: 'https://picsum.photos/id/11/300/300',
    categoryName: 'Category 2',
    itemCount: 22,
  },
  {
    imageUrl: 'https://picsum.photos/id/12/300/300',
    categoryName: 'Category 3',
    itemCount: 18,
  },
  {
    imageUrl: 'https://picsum.photos/id/13/300/300',
    categoryName: 'Category 4',
    itemCount: 30,
  },
  {
    imageUrl: 'https://picsum.photos/id/14/300/300',
    categoryName: 'Category 5',
    itemCount: 12,
  },
  {
    imageUrl: 'https://picsum.photos/id/15/300/300',
    categoryName: 'Category 6',
    itemCount: 25,
  },
];

const ShopPage = () => {
  return (
    <div className="container mx-auto px-9 ">
      <h1 className="text-2xl font-bold mb-4">Our Categories</h1>
      <Categories categories={fakeCategoryData} />
    </div>
  );
};

export default ShopPage;