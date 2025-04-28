import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from './ProductCard';
import { Product } from '@/types/ProductType';
import { Loader } from 'lucide-react';
import { productListThunk } from '@/lib/Redux-Toolkit/Thunks/ProductListThunk';
import { setOfset } from '@/lib/Redux-Toolkit/Slices/ProductSlice';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { productList, status, total, limit, ofset } = useSelector((state: any) => state.product);
  
  const [sortOption, setSortOption] = useState('default');
  const [filterText, setFilterText] = useState('');
  
  // Force pagination to show at least 5 pages for testing
  const totalPages = Math.ceil(productList.total / limit);
  const currentPage = Math.floor(ofset / limit) + 1;

  // Komponentler yüklendiğinde
  useEffect(() => {
    console.log("Component yüklendi, ilk veri çekilecek");
    // @ts-ignore
    dispatch(productListThunk({ limit, offset: ofset, filter: filterText }));
  }, []);

  // Debug bilgisi - ne olduğunu görelim
  useEffect(() => {
    console.log("Redux Store Durumu:", {
      productList,
      status,
      total,
      limit,
      ofset,
      totalPages,
      currentPage
    });
  }, [productList, status, total, limit, ofset]);

  const handlePageChange = (page: number) => {
    console.log(`Sayfa değiştiriliyor: ${page}`);
    const newOffset = (page - 1) * limit;
    console.log(`Yeni offset: ${newOffset}`);
    
    // @ts-ignore
    dispatch(setOfset(newOffset));
    
    // Sayfa değiştikten sonra yeni ürünleri yükle
    setTimeout(() => {
      console.log(`Yeni ürünler yükleniyor - offset: ${newOffset}`);
      
      // @ts-ignore
      dispatch(productListThunk({ 
        limit, 
        offset: newOffset, 
        filter: filterText 
      }));
    }, 100); // Redux state güncellemesi için küçük bir gecikme
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Filtre uygulanıyor:", filterText);
    
    // @ts-ignore
    dispatch(setOfset(0));
    
    // @ts-ignore
    dispatch(productListThunk({ 
      limit, 
      offset: 0, 
      filter: filterText 
    }));
  };

  // Ürünleri sıralama fonksiyonu
  const getSortedProducts = () => {
    if (!productList || !productList.products || !Array.isArray(productList.products)) {
      console.log("Gösterilecek ürün yok veya veri yapısı hatalı:", productList);
      return [];
    }

    console.log(`${productList.products.length} ürün bulundu`);
    const products = [...productList.products];
    
    switch (sortOption) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return products.sort((a, b) => b.sell_count - a.sell_count);
      default:
        return products;
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 3; // Ortada gösterilecek maksimum sayfa sayısı
  
    if (totalPages <= maxVisiblePages) {
      // Toplam sayfa sayısı az ise hepsini göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // Başlangıç sayfalarındayız
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Son sayfalardayız
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Ortadaki sayfalardayız
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
    }
  
    return pages;
  };

  const renderAlwaysVisiblePagination = () => {
    return (
      <div className="flex items-center justify-center mt-4 border border-gray-300 p-4 bg-gray-100 rounded-md">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border border-gray-400 rounded-l-md ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          İlk
        </button>
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border-t border-b border-gray-400 ${
            currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          Önceki
        </button>
  
        {getVisiblePages().map((page: number | '...', index) => (
          <button
            key={index}
            onClick={() => page !== '...' && handlePageChange(page as number)}
            disabled={page === '...'}
            className={`px-3 py-1 border-t border-b border-gray-400 ${
              page === currentPage 
                ? 'bg-blue-600 text-white' 
                : page === '...' 
                  ? 'bg-white cursor-default' 
                  : 'bg-white hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
  
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border-t border-b border-gray-400 ${
            currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          Sonraki
        </button>
  
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border border-gray-400 rounded-r-md ${
            currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          Son
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row justify-end items-center gap-4">
        <div className="w-full md:w-1/4">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Varsayılan Sıralama</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating">En İyi Puan</option>
            <option value="popular">En Popüler</option>
          </select>
        </div>
        
        <form onSubmit={handleFilterSubmit} className="w-full md:w-1/3">
          <div className="flex">
            <input
              type="text"
              value={filterText}
              onChange={handleFilterChange}
              placeholder="Ürünleri ara..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
            >
              Filtrele
            </button>
          </div>
        </form>
      </div>
      
      {/* Debug bilgileri */}
      <div className="mb-4 p-2 bg-gray-100 border border-gray-300 rounded text-sm">
        <p><strong>Debug Bilgileri:</strong></p>
        <p>Toplam Ürün: {total || 'Bilinmiyor'}</p>
        <p>Limit: {limit}</p>
        <p>Offset: {ofset}</p>
        <p>Toplam Sayfa: {totalPages}</p>
        <p>Şu anki Sayfa: {currentPage}</p>
        <p>API Durumu: {status}</p>
        <p>Ürün Sayısı: {productList.total}</p>
      </div>
      
      {status === "Loading" ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
      ) : status === "Failed" ? (
        <div className="text-center text-red-500">
          <p>Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      ) : (
        <>
          {/* Ürün listesi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {getSortedProducts().map((product: Product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          {/* Her zaman görünür pagination */}
          <div className="mt-8">
            {renderAlwaysVisiblePagination()}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;