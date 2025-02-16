import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import FeaturedProducts from './components/FeaturedProducts';
import Orders from './components/Orders';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Settings from './components/Settings';
import AdminLayout from './components/Admin/AdminLayout';
import { useSearchStore } from './store/searchStore';
import { useProductStore } from './store/productStore';
import { subscribeToProducts } from './lib/api';

function App() {
  const { filteredProducts } = useSearchStore();
  const { fetchProducts } = useProductStore();
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    fetchProducts();

    // Subscribe to real-time product updates
    const subscription = subscribeToProducts(() => {
      fetchProducts();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProducts]);

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return <AdminLayout />;
      case 'orders':
        return <Orders />;
      case 'contact':
        return <Contact />;
      case 'terms':
        return <Terms />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <>
            <FeaturedProducts />
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No products found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar setCurrentView={setCurrentView} />
      {currentView === 'home' && <CategoryBar />}
      {renderContent()}
    </div>
  );
}

export default App;