import React, { useState } from 'react';
import { X, User, Package, Heart, CreditCard, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthModal from './Auth/AuthModal';

export default function ProfileMenu({ onClose }: { onClose: () => void }) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (showAuthModal) {
    return <AuthModal onClose={() => setShowAuthModal(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">My Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-navy-900 text-white p-4 rounded-full">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.name}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
                  <Package className="h-5 w-5 text-navy-900" />
                  <span>My Orders</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
                  <Heart className="h-5 w-5 text-navy-900" />
                  <span>Wishlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-navy-900" />
                  <span>Payment Methods</span>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-red-600 py-2 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}