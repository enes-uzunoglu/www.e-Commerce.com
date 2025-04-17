import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="hidden md:flex bg-[#192334] text-white px-9 py-4 justify-between items-center text-sm">
      <div className="flex items-center space-x-4">
        <a href="tel:(225) 555-0118">📞 (225) 555-0118</a>
        <a href="mailto:michelle.rivera@example.com">✉️ michelle.rivera@example.com</a>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-center flex-grow">Follow Us and get a chance to win <span className="font-semibold">80% off</span></span>
        <span>Follow Us :</span>
        <div className="flex items-center space-x-2 ml-2">
          <a href="#" className="hover:text-blue-300">
            <Instagram className="w-4 h-4 text-blue-300" />
          </a>
          <a href="#" className="hover:text-blue-500">
            <Facebook className="w-4 h-4 text-blue-500" />
          </a>
          <a href="#" className="hover:text-blue-400">
            <Twitter className="w-4 h-4 text-blue-400" />
          </a>
          <a href="#" className="hover:text-red-500">
            <Youtube className="w-4 h-4 text-red-500" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;