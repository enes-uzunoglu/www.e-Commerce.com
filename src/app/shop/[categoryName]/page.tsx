'use client';

import CategoryPage from "@/ewqeq/CategoryPage";
import { useParams } from "next/navigation";

export default function Category() {
  // Params tipini daha spesifik hale getiriyoruz
  type Params = {
    categoryName: string
  };
  
  const params = useParams() as Params;
  const categoryName = params.categoryName;
  
  // Null check ekleyerek daha güvenli hale getiriyoruz
  if (!categoryName) {
    return <div>Category not found</div>;
  }

  return <CategoryPage categoryName={categoryName} />;
}

/* TODO:buraya bir mimar selim dokunuşu ekliyorum.

 öncelikle bu kısım biraz kafamı karıştırdı. sonradan farkettim ki ben link ile shop/dinamik yol eklediğimde
 bu yolu paylaşan tek bir dosya olmalı 2.si olamaz. yani [categoryName] yenine istersen [ali] koy.

shop
page.tsx
  [categoryName]
    page.tsx 
  [ali]
    page.tsx           böyle bir şey yok shop altında sadece 1 yol olur. 2 yol olmazzz.  haa illa uzatacaksan

/shop
    /[gender] // burada page.tsx olmazsa shop/[gender] diye bir sayfan olmaz ama yol devam eder
      /[categoryName] // burada page.tsx olmazsa shop/[gender]/[categoryName] diye bir sayfan olmaz ama yol devam eder
        /[categoryId]
          page.tsx ✅  // ve burada shop/[categoryName]/[categoryId] diye bir sayfa olur. yani 3 tane dinamik yol var.

*/

/* TODO:

peki const params = useParams();  ile ne yapıyorum cok basit
params.categoryName  ile dinamik yolun taşıdığı şeyi ilgili category ealıyorum. yanı şöyle diyelim ki
ayakkabı olarak title seçildi. shop/altında sadece 1 tane yol olacağı için (alternatifsiz 2 yol bile olmaz)
categoryName ilgili title oluyor ve sen paramstan categoryName i aldıgında doğal oalrak seçili title ı alıyorsun bir değişkene

const degisken = params.categoryName; // bu bana title ı veriyor. yani ayakkabı

*/