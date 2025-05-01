import ProductList from '@/components/ProductList'
import React from 'react'

type Props = {
    categoryName: string | string[] | undefined;
  };

  /**
   TODO:
 */

function CategoryPage(props: Props) {
    const {categoryName}  = props; // destructure yaparak categoryName'i alıyoruz
    /**
TODO:
     */
    const categoryNameDecoded = decodeURIComponent(categoryName as string); // URL'den gelen categoryName'i decode ediyoruz  as string demezsen  
    // type için if yazacaksın string ise decode yapacaksın cunku decodeURIComponent sadece string alır.    
  return (
    <div>
      <ProductList categoryName={categoryNameDecoded}/>
    </div>
  )
}

export default CategoryPage
