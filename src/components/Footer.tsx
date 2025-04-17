import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 md:py-12 text-sm text-gray-600">
      <div className="container mx-auto px-9 md:px-0">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <Link href="/" className="text-lg font-semibold text-gray-800">
              Bandage
            </Link>
          </div>
          <div className="flex space-x-3 md:space-x-4">
            <Link href="#" className="text-blue-500 hover:opacity-80">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-purple-500 hover:opacity-80">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-blue-400 hover:opacity-80">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-red-500 hover:opacity-80">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-4 mb-6 md:mb-8">
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">Company Info</h6>
            <ul className="text-gray-600">
              <li><Link href="#" className="hover:text-blue-500">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Carrier</Link></li>
              <li><Link href="#" className="hover:text-blue-500">We are hiring</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">Legal</h6>
            <ul className="text-gray-600">
              <li><Link href="#" className="hover:text-blue-500">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Carrier</Link></li>
              <li><Link href="#" className="hover:text-blue-500">We are hiring</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">Features</h6>
            <ul className="text-gray-600">
              <li><Link href="#" className="hover:text-blue-500">Business Marketing</Link></li>
              <li><Link href="#" className="hover:text-blue-500">User Analytic</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Live Chat</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Unlimited Support</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">Resources</h6>
            <ul className="text-gray-600">
              <li><Link href="#" className="hover:text-blue-500">IOS & Android</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Watch a Demo</Link></li>
              <li><Link href="#" className="hover:text-blue-500">Customers</Link></li>
              <li><Link href="#" className="hover:text-blue-500">API</Link></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-gray-700 mb-2">Get In Touch</h6>
            <div className="flex flex-col md:block">
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-md px-3 py-2 mb-2 md:mb-0 md:mr-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="bg-blue-500 text-white rounded-md px-3 py-2 focus:outline-none hover:bg-blue-600 w-full md:w-auto text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2">Lore imp sum dolor Amit</p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;