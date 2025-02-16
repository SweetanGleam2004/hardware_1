import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, User, Heart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useSearchStore } from '../store/searchStore';
import { useWishlistStore } from '../store/wishlistStore';
import Cart from './Cart';
import SideMenu from './SideMenu';
import ProfileMenu from './ProfileMenu';

interface NavbarProps {
  setCurrentView: (view: string) => void;
}

export default function Navbar({ setCurrentView }: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { setQuery } = useSearchStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-navy-900/95 backdrop-blur-sm' : 'bg-navy-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center hover:text-yellow-400 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold text-yellow-400">BuildMart</span>
              </button>
              <div className="hidden md:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    aria-label="Search products"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button
                className="hidden md:flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsProfileOpen(true)}
                aria-label="Account"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </button>
              <button
                className="relative text-white hover:text-yellow-400 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button 
                className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="bg-yellow-400 text-navy-900 rounded-full px-2 text-sm font-medium">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed navbar */}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} onNavigate={setCurrentView} />}
      {isProfileOpen && <ProfileMenu onClose={() => setIsProfileOpen(false)} />}
    </>
  );
}