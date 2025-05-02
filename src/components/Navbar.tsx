"use client"; 

// Aslında React varsayılan olarak zaten csr'dir. Yani sunuducan aldığı html veriyi js-ts ile tarayıcıda render eder.
// Fakat Next.js kütüphanesi ile bunu ssr'ye ektarıyoruz ve sayfaların direkt olarak sunucuda render edilmesini sağlıyoruz.

// Bu sayede sayfalar daha hızlı yüklenir ve SEO açısından daha iyidir. Ancak bazı bileşenlerin csr ile çalışması gerekebilir. 
// Bu durumda bu bileşenlerin başına "use client" yazıyoruz.

/* ------------------------------------------------------------------------------------------------------------------------------ */

import React, { useEffect, useState, useRef } from 'react';


// useState: Değeri saklar, değişince render tetikler. Her renderda sıfırlanmaz.

// useRef: Değeri saklar, değişince render tetiklemez. Her renderda sıfırlanmaz. 
// DOM elemanlarına erişim sağlar. 📌 const cartRef = useRef<HTMLDivElement>(başlangıcDegeri); Not: <buranın içi> = fonskiyon çağırılırken dönecek tipi belirtir.
// Kullanım <div className="relative" ref={cartRef}> ⚡ ref attribuate ile cartRef'e atfediyor.

// let: Geçici değişken, render'ı etkilemez. Her renderda sıfırlanır.

/* ------------------------------------------------------------------------------------------------------------------------------ */

import { Search, ShoppingCart, Menu, Heart, User, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import TopBar from './TopBar';
import { AppDispatch, RootState } from '@/lib/Redux-Toolkit/store';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesThunk } from '@/lib/Redux-Toolkit/Thunks/CategoriesThunk';
import { Category } from '@/types/CategoryType';

/* ------------------------------------------------------------------------------------------------------------------------------ */

const Navbar: React.FC = () => {

// const Navbar: React.FC = () => { return() } ➡️ otomatik olarak tipi ile birlikte children verilir. Ekstra props'suz kullanım.
// Burada Navbar componentine tip olarak React.FC atadığımızda. React otomatik olarak children özelliğini React.ReactNode tipinde props'a ekler.

// const Navbar: React.FC = (props: NavbarPropsType) => { return() } ➡️ otomatik olarak tipi ile birlikte props'a children özelliği verilir. Ekstra props'lu kullanım.
// type NavbarPropsType = { title: string;}

// const Navbar = () => { return() } ➡️ children özelliği props'a verilmemiş. Ekstra props'suz kullanım.
// Otomarik olarak verememz çünkü componentin de tipini bilmediği için children özelliğini tipini bilemiyor.

// const Navbar = ({ title, children }: NavbarPropsType) => { return() }  ➡️ children özelliği props'a verilmiş. Ekstra props'lu kullanım.
// type NavbarPropsType = { title: string; children: React.ReactNode; };

/* ------------------------------------------------------------------------------------------------------------------------------ */

  const [isOpen, setIsOpen] = useState(false);
  // (Mobil) Açılır dropDown menü için açık-kapalı kontrolü.

/* ------------------------------------------------------------------------------------------------------------------------------ */

  const [isCartOpen, setIsCartOpen] = useState(false);
  // Sepet dropDown menüSÜ için açık-kapalı kontrolü. 

/* ------------------------------------------------------------------------------------------------------------------------------ */

  const cartRef = useRef<HTMLDivElement>(null); 
  // DOM(div,button,input vs.) elemanlarına ref attribuate ile atfedecek bir referans noktası oluşturuyoruz. 
  // 📍 cartRef.current = 5  bu şekilde değeri 5 ile değiştiririz.
  // 📍 cartRef.current?.focus(); bu şekilde de ilgili DOM elemanına focuslanırız.

/* ------------------------------------------------------------------------------------------------------------------------------ */ 
  
  const dispatch = useDispatch<AppDispatch>();
  // <AppDispatch> ile dispatch adındaki yönlendirmemize useDispatch hook'unun döneceği tipi belirtiyoruz.

/* ------------------------------------------------------------------------------------------------------------------------------ */

  const categories: Category[] = useSelector((state: RootState) => state.product.categories);
  // state:RootState ile store dosyamızda tutulan state için verilen RootState tipini kendi parametremiz olan state'e veriyoruz.

/* ------------------------------------------------------------------------------------------------------------------------------ */  

  const cartItems = useSelector((state: RootState) => state.shoppingCart.cart);
  // Sepetteki itemleri store dosyamızdaki state'den çekiyoruz.

/* ------------------------------------------------------------------------------------------------------------------------------ */

  useEffect(() => {
    dispatch(categoriesThunk());
  }, [dispatch]);

  // 📍 Bağımlılık olarak dispatch eklemek ⬇️
  // const dispatch = useDispatch<AppDispatch>()  const ile belirlediğimiz dispatch'i bir daha değiştirmiyoruz.
  // Bu bize useEffect'i sadece 1 defa çalıştırmak için güvenli bir seçenek.
  // 📌 Ve böylece sayfa her render edildiğinde gereksiz yönlendirmeleri engelleriz ve performansı arttırırız.

/* ------------------------------------------------------------------------------------------------------------------------------ */

  // useEffect(() => {

      // ⚡ Etki (effect): // Bir şey eklenir (örneğin event listener)
      // ⚡ return () => {} : // Temizlik (cleanup): O şey kaldırılır

  // }, []);

  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {
    // buradaki e bir parametredir ve event'i temsil eder.
    // MouseEvent,KeyboardEvent vb. ise eventin tipini belirtir. 

      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
      // 📌 cartRef.current && varsa gibi bir kontrol sağlar ve başlangıç değerinin null olduğu durumlarda veyahut çoğu durumda güvenli bölgede kalmamızı sağlar.
      // ⚡ as Node tipinin DOM elemanı olduğuna ben eminim demektir.
      // ➡️ e.target : Kullanıcının tıkladığı yerdir.
      // 📍 Diyelim ki ref bir div de ve biz o div içinde bir img e tıkladık. div elemanı img yi içerdiği için tetiklenecek.

        setIsCartOpen(false);
        // Sepet açık-kapalı kontolünü false yapıyoruz. Sepet açık mı? Hayır demektir.

      }

    };

    document.addEventListener('mousedown', handleClickOutside);
    // document = sayfadaki tüm DOM. Yani o sayfaya ait html yapısının bütünü
    // addEventListener('event' , fonksiyon) event= mousedown,mouseup,click,keyup,dblclick vb.

    return () => document.removeEventListener('mousedown', handleClickOutside);
    // 📍 removeEventListener('event' , fonksiyon); ile event dinlemesini siliyoruz. Bir sonraki sefer 

  }, []);
  // ⚡ Dikkat burada sayfa mount edildiğinde yani sadece  1 defa useEffecti çalıştırır.
  // Fonksiyonu defelarca çalıştırabiliriz.
  // Sayfa tekrar render edilirse listener siliniyor ve yeni render edilen sayfada tekrar oluşturuluyor.
  // Bu kod güvenliği için gereklidir. Yeni render edilen sayfada fonksiyonların karışma ihtimalini önler.

/* ------------------------------------------------------------------------------------------------------------------------------ */  

  const toggleMenu = () => setIsOpen(!isOpen);
  // (Mobil) Açılır Menüyü tetikleyen fonksiyon. 
  // Çağırıldığında isOpen state'ini değiştirerek 📍 isOpen && ... ile birlikte kullanılan DOM elemanlarının varlığını belirler.

/* ------------------------------------------------------------------------------------------------------------------------------ */  

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  // Sepet'in açılıp kapanmasını tetikleyen fonksiyon. 
  // Çağırıldığında isCartOpen state'ini değiştirerek 📍 isCartOpen && ... ile birlikte kullanılan DOM elemanlarının varlığını belirler.

/* ------------------------------------------------------------------------------------------------------------------------------ */  

  return (
    <nav className='fixed z-50 w-full'>
      <TopBar />
      <div className="px-9 mx-auto bg-white py-3 flex md:flex-row items-center justify-between shadow-sm relative">
        <Link href="/" className="text-xl md:text-2xl font-bold text-gray-800 md:mr-8">Bandage</Link>

        <div className="hidden md:flex items-center justify-center flex-grow">
          <Link href="/" className="text-gray-700 hover:text-blue-500 font-semibold mx-4">Home</Link>
          <div className="relative group mx-4">
            <Link href="/shop" className="text-gray-700 hover:text-blue-500 flex items-center">Shop <ChevronDown className="w-4 h-4 ml-1" /></Link>
            <div className="absolute left-0 hidden group-hover:block bg-white shadow-md mt-2 rounded-md p-4">
              {categories.map((category: Category) => (
                <Link key={category.id} href={`/shop/${category.gender}/${category.title.toLowerCase()}/${category.id}`} className="block text-gray-700 hover:text-blue-500 py-1">{category.title}</Link>
              ))}
            </div>
          </div>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 mx-4">About</Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-500 mx-4">Blog</Link>
          <Link href="/pages" className="text-gray-700 hover:text-blue-500 mx-4">Pages</Link>
        </div>

        {/* Mobile Menü & Sepet */}
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/signup"><User className="h-6 w-6 text-gray-600 hover:text-blue-500" /></Link>
          <Search className="h-6 w-6 text-gray-600 hover:text-blue-500" />
          <button onClick={toggleCart} className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-500" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-1.5 rounded-full">{cartItems.length}</span>
          </button>
          <button onClick={toggleMenu}>{isOpen ? <ChevronUp className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>

        {/* Sağdaki ikonlar - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-[#637381] hover:text-blue-500 flex items-center"><User className="h-5 w-5 mr-1" />Login / Register</Link>
          <Search className="h-5 w-5 text-[#637381] hover:text-blue-500" />
          <div className="relative" ref={cartRef}>
            <button onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5 text-[#637381] hover:text-blue-500" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-1.5 rounded-full">{cartItems.length}</span>
            </button>
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50 p-4">
                <h3 className="font-semibold mb-2">Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty</p>
                ) : (
                  <ul className="space-y-2">
                    {cartItems.map((item: any, i: number) => (
                      <li key={i} className="text-sm text-gray-700">{item.name || "Unnamed item"}</li>
                    ))}
                  </ul>
                )}
                <Link href="/cart" className="block text-center mt-3 text-blue-500 hover:underline text-sm">Go to cart</Link>
              </div>
            )}
          </div>
          <Link href="/wishlist"><Heart className="h-5 w-5 text-[#637381] hover:text-blue-500" /></Link>
        </div>

        {/* Mobil Açılır Menü */}
        {isOpen && (
          <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white shadow-md z-10">
            <div className="py-6 flex flex-col items-center space-y-4">
              <Link href="/" className="text-2xl text-[#374754] hover:text-blue-500">Home</Link>
              <Link href="/product" className="text-2xl text-[#374754] hover:text-blue-500">Product</Link>
              <Link href="/pricing" className="text-2xl text-[#374754] hover:text-blue-500">Pricing</Link>
              <Link href="/contact" className="text-2xl text-[#374754] hover:text-blue-500">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
