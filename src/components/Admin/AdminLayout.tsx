import React, { useEffect, useState } from 'react';
import { isAdmin } from '../../lib/api';
import Dashboard from './Dashboard';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import { LayoutGrid, Package, ShoppingBag } from 'lucide-react';

export default function AdminLayout() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const admin = await isAdmin();
      setAuthorized(admin);
    } catch (error) {
      console.error('Failed to check admin status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this area.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`py-4 px-2 border-b-2 ${
                currentView === 'dashboard'
                  ? 'border-navy-900 text-navy-900'
                  : 'border-transparent text-gray-500 hover:text-navy-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <LayoutGrid className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('products')}
              className={`py-4 px-2 border-b-2 ${
                currentView === 'products'
                  ? 'border-navy-900 text-navy-900'
                  : 'border-transparent text-gray-500 hover:text-navy-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Products</span>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('orders')}
              className={`py-4 px-2 border-b-2 ${
                currentView === 'orders'
                  ? 'border-navy-900 text-navy-900'
                  : 'border-transparent text-gray-500 hover:text-navy-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Orders</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}