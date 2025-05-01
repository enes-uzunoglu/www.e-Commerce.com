import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 

import ProductCard from './ProductCard'; 
import { Product } from '@/types/ProductType';
import { Loader } from 'lucide-react';
import { productListThunk } from '@/lib/Redux-Toolkit/Thunks/ProductListThunk';
import { setOfset } from '@/lib/Redux-Toolkit/Slices/ProductSlice';
import { AppDispatch, RootState } from '@/lib/Redux-Toolkit/store';


type Props = {
  categoryName?: string;  //  propsu dikkattt burada tnaımladım
// TODO:  VAYY soru işareti ? koyunca props gondermeden yayınladıgım shoppage e musade ettı
};


const ProductList: React.FC<Props> = (props) => {  // TODO: BURADAN PROPS ALMAAYCAM YINE DE OLSUN

  const {categoryName} = props;

  const dispatch = useDispatch<AppDispatch>();

  /*
  const dispatch = useDispatch<>(); tip belirtmezsek default olarak any tipimiz olur.
  Böyle bir durumda dispatch(action) şeklinde kullanabiliriz. Burada tek kaybımız autocomplete özelliği olur.

  Fakat dispatch(thunk()) şeklinde kullanırsak, thunk fonksiyonunun tipini belirlememiz gerekir.
  Bu durumda thunk fonksiyonunun tipini belirlemek için AppDispatch tipini kullanıyoruz.
  Yoksa hata alırız...

  TODO:createAsyncThunk kullanınca,
  Otomatik olarak bir tipli "function" üretiliyor.
  (İçinde pending, fulfilled, rejected action'larının tipleri var.)

  createAsyncThunk bu bir fonksiyondur ve bir tipi vardır. boş olsa dahi default olarak. 
  örneğin:createAsyncThunk<ReturnedData>( 
*/

  const {productList, status, limit, offset } = useSelector((state: RootState) => state.product);
  
  const [siralamaSecenegi, setSiralamaSecenegi] = useState('default'); 
  const [filtrelemeKelimesi, setFiltrelemeKelimesi] = useState(categoryName || ''); // categoryName'i varsayılan değer olarak alıyoruz.
  // TODO: KENDİ BACKENDINDE BURAYI BOŞ STRİNG YAPACAKSIN GERİ

  
  
  const toplamSayfaSayisi = Math.ceil(productList.total / limit);
  const aktifSayfa = Math.floor(offset / limit) + 1;
 



  // Debug bilgisi - ne olduğunu görelim
  // useEffect(() => {
  //   console.log("Redux Store Durumu:", {
  //     categoryName,
  //     productList,
  //     status,
  //     limit,
  //     offset,
  //     toplamSayfaSayisi,
  //     aktifSayfa
  //   });
  // }, [productList, status, productList.total, limit, offset]);

  

  const SayfaDegisimiYapan = (sayfa: number) => {  // sayfa parametresini yerini paginationdan alacağız.
    const newOffset = (sayfa - 1) * limit;
    
    dispatch(setOfset(newOffset)); // initialState'deki offset değerini günceliyoruz böylece
    
    // Sayfa değiştikten sonra yeni ürünleri yükle
    setTimeout(() => {
      dispatch(productListThunk({ 
        limit, // bu limit:limit demek
        offset: newOffset, 
        filter: filtrelemeKelimesi 
      }));
    }, 100); // Redux state güncellemesi için küçük bir gecikme
  };

  

  /*
  React.ChangeEvent bir event tipidir ve belirli bir HTML elemanının değişim (change) olayını temsil eder.

  React.ChangeEvent'in Yapısı:

  React.ChangeEvent<T> şablon tipi, aşağıdaki gibi çalışır:
  T burada HTML eleman türü'dür. Örneğin, HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement gibi.
  Bu event, değişim işlemi (input, select, vb.) yapılırken target'i, yani hangi HTML elemanının değiştiğini, bilmenizi sağlar.

  örneğin a bir tip olsun a=TipAdi<HangiElemanaAitTip>

  TODO:not: React.ChangeEvent bir fonksiyon değil, aslında bir tip. ChangeEvent, React'in sağladığı ve bir değişiklik (change) olayını temsil eden bir tiptir. Bu tip, form elemanlarında (örneğin, <input>, <select>, <textarea>) gerçekleşen değişiklikleri yakalamak için kullanılır.
  */

  // const KategoriDegistiren = () => {
  //   dispatch(productListThunk({ 
  //     categoryName: categoryName // kategori adını güncelleyip gönderiyoruz.
  //   }));
  // }

  // useEffect(() => {KategoriDegistiren()}
  // , [categoryName]); // TODO: BU KISMI EKNDİ BACKENDİNDE YAPACAKSIN.

  const FiltrelemeYapan = (event: React.ChangeEvent<HTMLInputElement>) => { // event parametresi, input elemanının değişim olayını temsil eder.
   setFiltrelemeKelimesi(event.target.value);// input elemanının değişim olayınından odak değeri alıyorum.

    // TODO:event.preventDefault(); onChange olayında sayfa yenilemesi olmadığı için kullanmadım.
    
    dispatch(setOfset(0));
    
    setTimeout(() => { // Redux state güncellemesi için küçük bir gecikme  /*TODO: BU GECİKME aa aramasında a aramasını göstermesini engelledi.
      dispatch(productListThunk({ 
        limit, 
        offset: 0, 
        filter: event.target.value // filtreleme kelimesini güncelleyip gönderiyoruz.
      }));
    }, 100); // Redux state güncellemesi için küçük bir gecikme
   
  };

  //console.log("Filtreleme kelimesi:", filtrelemeKelimesi); // filtreleme kelimesini görmek için

    /* burada filtrelemeyi ben onchange ile yapmak istiyorum. submit butonu kullansaydım eğer input ile butonu birleştirip form kapsayıcısında yapardım. ve 

      const handleFilterSubmit = (event: React.FormEvent) => { 

      event.preventDefault(); sumbit olaylarında sayfa yenilemeyi önler tarayıcı gereksiz refleksini kırıyor yani 

      console.log("Filtre uygulanıyor:", filtrelemeKelimesi);
    
      dispatch(setOfset(0));
    
      dispatch(productListThunk({ 
      limit, 
      offset: 0, 
      filter: filtrelemeKelimesi 
    }));
  };
    */
    
  const SiralamaSecenegiBelirleyen = (event: React.ChangeEvent<HTMLSelectElement>) => { // event parametresi, select elemanının değişim olayını temsil ediyor
    setSiralamaSecenegi(event.target.value);
  };

  // Ürünleri sıralama fonksiyonu
  const SiralamaYapan = () => {
    const products = [...productList.products];
    
    switch (siralamaSecenegi) {
      case 'price-ascending':
        return products.sort((a, b) => a.price - b.price);   // TODO: hataya sebep olan şe yanlış bırakılan bir boşluk varmış. dikkat et 
      case 'price-descending':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return products.sort((a, b) => b.sell_count - a.sell_count);
      default:
        return products;
    }
  };

  const gorunurSayfalarıGetir = () => {
    const sayfalar = [];
    const enFazlaGoruntulenecekSayfaSayisi = 3; // Ortada gösterilecek maksimum sayfa sayısı
  
    if (toplamSayfaSayisi <= enFazlaGoruntulenecekSayfaSayisi) {
      // Toplam sayfa sayısı az ise hepsini göster
      for (let i = 1; i <= toplamSayfaSayisi; i++) {
        sayfalar.push(i);
      }
    } else if (aktifSayfa <= enFazlaGoruntulenecekSayfaSayisi) {
      // Başlangıç sayfalarındayız
      for (let i = 1; i <= enFazlaGoruntulenecekSayfaSayisi; i++) {
        sayfalar.push(i);
      }
    } else if (aktifSayfa >= toplamSayfaSayisi - 2) {
      // Son sayfalardayız
      for (let i = toplamSayfaSayisi - 2; i <= toplamSayfaSayisi; i++) {
        sayfalar.push(i);
      }
    } else {
      // Ortadaki sayfalardayız
      sayfalar.push(aktifSayfa - 1);
      sayfalar.push(aktifSayfa);
      sayfalar.push(aktifSayfa + 1);
    }
  
    return sayfalar;
  };

  /* başka bir alternatif pagination yapısı

  const gorunurSayfalarıGetir = () => {
  const sayfalar = [];
  const enFazlaSayfa = 3;

  // Gösterilecek ilk sayfayı bul
  let start = Math.max(1, aktifSayfa - 1); TODO:Math.max(a,b) a ve b sayılarından büyük olanı döner.
  // Gösterilecek son sayfayı bul
  let end = Math.min(toplamSayfaSayisi, start + enFazlaSayfa - 1);

  // Eğer sona çok yaklaşmışsak, başı kaydır
  if (end - start + 1 < enFazlaSayfa) {
    start = Math.max(1, end - enFazlaSayfa + 1);
  }

  for (let i = start; i <= end; i++) {
    sayfalar.push(i);
  }

  return sayfalar;
};

  */

  const sayfalandırma = () => {
    return (
      <div className="flex items-center justify-center mt-4 border border-gray-300 p-4 bg-gray-100 rounded-md">
        <button
          onClick={() => SayfaDegisimiYapan(1)}
          disabled={aktifSayfa === 1}
          className={`px-3 py-1 border border-gray-400 rounded-l-md ${
            aktifSayfa === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          İlk
        </button>
        
        <button
          onClick={() => SayfaDegisimiYapan(aktifSayfa - 1)}
          disabled={aktifSayfa === 1}
          className={`px-3 py-1 border-t border-b border-gray-400 ${
            aktifSayfa === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          Önceki
        </button>
  
        {gorunurSayfalarıGetir().map((page: number | '...', index) => (
          <button
            key={index}
            onClick={() => page !== '...' && SayfaDegisimiYapan(page as number)}
            disabled={page === '...'}
            className={`px-3 py-1 border-t border-b border-gray-400 ${
              page === aktifSayfa 
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
          onClick={() => SayfaDegisimiYapan(aktifSayfa + 1)}
          disabled={aktifSayfa === toplamSayfaSayisi}
          className={`px-3 py-1 border-t border-b border-gray-400 ${
            aktifSayfa === toplamSayfaSayisi ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
          }`}
        >
          Sonraki
        </button>
  
        <button
          onClick={() => SayfaDegisimiYapan(toplamSayfaSayisi)}
          disabled={aktifSayfa === toplamSayfaSayisi}
          className={`px-3 py-1 border border-gray-400 rounded-r-md ${
            aktifSayfa === toplamSayfaSayisi ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-200'
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
            value={siralamaSecenegi}
            onChange={SiralamaSecenegiBelirleyen}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Varsayılan Sıralama</option>
            <option value="price-ascending">Fiyat: Düşükten Yükseğe</option>
            <option value="price-descending">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating">En İyi Puan</option>
            <option value="popular">En Popüler</option>
          </select>
        </div>
        
        {/* <form onSubmit={FiltrelemeYapan} className="w-full md:w-1/3">
          <div className="flex"> */}
            <input
              type="text"
              value={filtrelemeKelimesi}
              onChange={FiltrelemeYapan}
              placeholder="Ürünleri ara..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {/* <button 
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
            >
              Filtrele
            </button>
          </div> 
        </form> */}
      </div> 
      
      {/* Debug bilgileri */}
      <div className="mb-4 p-2 bg-gray-100 border border-gray-300 rounded text-sm">
        <p><strong>Debug Bilgileri:</strong></p>
        <p>categoryName:{categoryName}</p>
        <p>Toplam Ürün: {productList.total || 'Bilinmiyor'}</p>
        <p>Limit: {limit}</p>
        <p>Offset: {offset}</p>
        <p>Toplam Sayfa: {toplamSayfaSayisi}</p>
        <p>Şu anki Sayfa: {aktifSayfa}</p>
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
            {SiralamaYapan().map((product: Product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          {/* {console.log(SiralamaYapan())} Debug için sıralı ürünleri görmek için */}

          {/* Her zaman görünür pagination */}
          <div className="mt-8">
            {sayfalandırma()} {/* TODO:burada bu component içindeki bir fonksiyonu alıyoruz. farklı yerdeki component da zaten bir fonksıyondan olusuyor. */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;