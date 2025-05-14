import { ReactNode } from 'react';
import Navbar from './Navbar';
import Link from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BulkEase</h3>
              <p className="mb-4">Your platform for bulk purchases and shared savings. Join hands with others and unlock incredible deals together.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-green-200 transition">Home</Link></li>
                <li><Link href="/products" className="hover:text-green-200 transition">Shop</Link></li>
                <li><Link href="/about" className="hover:text-green-200 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-green-200 transition">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-green-200 transition">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-green-200 transition">Shipping Policy</Link></li>
                <li><Link href="/returns" className="hover:text-green-200 transition">Returns Policy</Link></li>
                <li><Link href="/privacy" className="hover:text-green-200 transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="mb-2">+91 94300 71336</p>
              <p className="mb-2">support@bulkease.com</p>
              <p>123 Business Avenue, Suite 100</p>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-6 text-center">
            <p>© 2024 BulkEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 