'use client';

import CategoryPage from "@/pages/CategoryPage";

import { useParams } from "next/navigation"; // next.js13 için next.navigation'dan useParams() import ediyoruz. next/router dan değil. eğer varsa bile

export default function Category() {
  
  const params = useParams();
  const categoryName:string | string[] | undefined = params?.categoryName;     
  /*TODO: ÇOOOK DİKKKAT 
  router.query.categoryname veya params.categoryname şu tiptedir:   -----string | string[] | undefined-----


  /* TODO: params? neden. params nasıl undifined vey null olabilir? 
  önceden next.js 12 de falan const router = useRouter(); ile bir router objesi alıyorduk.
  router.query dediğimizde bize bir query objesi veriyordu. bu query objesi içinde
  dinamik parametrelerimizi alıyorduk. 

  peki sayfa ilk yüklendiğinde router.query kısa bir sürede olsa undefined oluyordu. bu yüzden ? işareti kontrolü var.
  ? yani params? params eğer varsa demek

  next.js 13 ile birlikte useParams() kullanmaya başladık. bu da bir hook. fakat sadece parametredeki dinamikleri ATAMAK için
  alma işi (yani eskiden yapılan router.query artık OTOMATİK olarak yapılıyor.)

   ----------OTOMATİK DAHİ OLSA HALA SAYFA AÇILIRKEN UNDEFINED OLABİLİR. BU YÜZDEN ? İLE KONTROL EDİYORUZ.

  next.js 12 de de useParams'a ihtiyaç yok çünkü router.query'i --ELLE-- yaptıgımız ıcın donen objeden dırekt destructurın ıle alabılıyoruz.
  next.js 13 ve sonrasında otomatik yapıldıgından obje elımızın altında degıl mecbur bır params olusturmamız gerekıyor bunu saglıyor useParams.

  TODO: kısa not  
      --app-- > shop > [categoryName] > page.tsx  // next.js 13 ve sonrası için dinamik yol
      --pages-- > shop > [categoryName] page.tsx  // next.js 12 ve öncesi için dinamik yol



  /*
  const router = useRouter(); 

// router  next.js12   burada zaten dırekt destructurıng ettıgımızden gerek klamıyor params yapmaya
{
  query: {
    categoryName: 'elbise',  // URL'deki dinamik parametre
  },
  pathname: '/shop/[categoryName]',  // Yönlendirme yapılan path
  asPath: '/shop/elbise',  // Gerçekleşen URL
  push: (url: string) => void,  // URL'yi değiştirme işlevi
  replace: (url: string) => void,  // URL'yi değiştirme, geçmişi kaydetmez
  back: () => void,  // Geçerli sayfaya geri git
  prefetch: (url: string) => void,  // Sayfayı önceden yüklemek
  isFallback: false,  // Sayfa yedeği durumu (dynamic route kullanıyorsanız)
}

// params next.js13 sonrası    router.query otomatik ama params ile dınamıgı alıyoruz
{
  categoryName: 'elbise',  // URL parametresi olarak alınan dinamik değer
  categoryId: '42',  // Başka bir dinamik parametre
}

  */
  
  return (
    <>
      <CategoryPage categoryName={categoryName} />
    </>
  );
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