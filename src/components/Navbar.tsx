"use client";

import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Heart, User, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import TopBar from './TopBar'; // TopBar componentini import ettik

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TopBar /> {/* TopBar componentini buraya ekledik */}

      {/*TODO: CONTAİNER İKEN MOBİLEDE BOŞLUK OLMADIGI ICIN ORTALAMA YAPAMIYORDU. YER ACTIM PX-9 İLE OLDU. DESKTOP KENDILIGINDEN ICERIKTEN GENIS OLDUGUNDAN BOSLUK KALMISTI. */}
      <nav className="px-9 mx-auto bg-white py-3  flex md:flex-row items-center justify-between shadow-sm relative">
        {/* Marka Adı (Ortalanmış - Mobile, Sola Yaslı - Desktop) */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-gray-800 md:mr-8">
          Bandage
        </Link>

        {/* Geniş Ekran Linkleri - Ortalama (Sadece Desktop) */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <Link href="/" className="text-gray-700 hover:text-blue-500 font-semibold mx-4">
            Home
          </Link>
          <div className="relative group mx-4">
            <Link href="/shop" className="text-gray-700 hover:text-blue-500 flex items-center">
              Shop <ChevronDown className="w-4 h-4 ml-1" />
            </Link>
            {/* Dropdown Menü (Şimdilik Boş) */}
          </div>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 mx-4">
            About
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-500 mx-4">
            Blog
          </Link>
          <Link href="/pages" className="text-gray-700 hover:text-blue-500 mx-4">
            Pages
          </Link>
        </div>

        {/* Mobil Menü ve İkonlar (Sadece Küçük Ekran) */}
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/login" className="hover:text-blue-500">
            <User className="h-6 w-6 text-gray-600 hover:text-blue-500 cursor-pointer" />
          </Link>
          <Search className="h-6 w-6 text-gray-600 hover:text-blue-500 cursor-pointer" />
          <Link href="/cart" className="relative hover:text-blue-500">
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {/* Sepet Sayısı (Mobil) */}
          </Link>
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isOpen ? <ChevronUp className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Sağdaki İkonlar ve Login (Sadece Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-[#637381] hover:text-blue-500 flex items-center">
            <User className="h-5 w-5 mr-1" />
            Login / Register
          </Link>
          <Search className="h-5 w-5 text-[#637381] hover:text-blue-500 cursor-pointer" />
          <Link href="/cart" className="relative hover:text-blue-500">
            <ShoppingCart className="h-5 w-5 text-[#637381]" />
            <span className="absolute top-[-6px] right-[-8px] bg-blue-500 text-white rounded-full px-[6px] text-[10px]">2</span> {/* Örnek Sepet Sayısı */}
          </Link>
          <Link href="/wishlist" className="relative hover:text-blue-500">
            <Heart className="h-5 w-5 text-[#637381]" />
          </Link>
        </div>

        {/* Mobil Menü (Açılır Kapanır - Yukarıdan) */}
        {isOpen && (
          <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white shadow-md z-10">
            <div className="py-6 flex flex-col items-center space-y-4">
              <Link href="/" className="text-2xl text-[#374754] hover:text-blue-500 block text-center">
                Home
              </Link>
              <Link href="/product" className="text-2xl text-[#374754] hover:text-blue-500 block text-center">
                Product
              </Link>
              <Link href="/pricing" className="text-2xl text-[#374754] hover:text-blue-500 block text-center">
                Pricing
              </Link>
              <Link href="/contact" className="text-2xl text-[#374754] hover:text-blue-500 block text-center">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;