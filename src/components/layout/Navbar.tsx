"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { ShoppingCart, Search, Menu, X, Phone, User } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold flex items-center">
              <span className="text-white">Bulk</span>
              <span className="text-green-300">Ease</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-green-200 transition"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-green-200 transition"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-green-200 transition"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-green-200 transition"
              >
                Contact Us
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/cart"
                className="hover:text-green-200 transition p-1"
              >
                <ShoppingCart className="h-5 w-5" />
              </Link>
              <button
                className="hover:text-green-200 transition p-1"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
              <div className="flex items-center ml-2">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">+91 94300 71336</span>
              </div>
              {user ? (
                <div className="relative group ml-2">
                  <button className="flex items-center hover:text-green-200 transition">
                    <User className="h-5 w-5 mr-1" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-10 hidden group-hover:block">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-green-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-green-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-white hover:text-green-200 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-white text-green-800 px-4 py-2 rounded hover:bg-green-100 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-white hover:text-green-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-white hover:text-green-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-white hover:text-green-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:text-green-200 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <div className="pt-4 border-t border-green-700">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="block py-2 hover:text-green-200 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block py-2 hover:text-green-200 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 hover:text-green-200 transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <Link
                        href="/login"
                        className="block py-2 hover:text-green-200 transition"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block bg-white text-green-800 px-4 py-2 rounded hover:bg-green-100 transition text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                  <Link
                    href="/cart"
                    className="flex items-center py-2 hover:text-green-200 transition mt-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span>Cart</span>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
