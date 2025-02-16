import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import toast from 'react-hot-toast';

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export default function Cart({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleCheckout = async () => {
    if (!address.street || !address.city || !address.state || !address.pincode) {
      toast.error('Please fill in all address fields');
      return;
    }

    toast.loading('Processing payment...');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...items],
      total: total(),
      status: 'pending' as const,
      date: new Date().toISOString(),
      shippingAddress: address,
    };
    
    addOrder(order);
    clearCart();
    toast.success('Order placed successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-4 p-2 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {showAddressForm ? (
                  <div className="mt-4 p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Shipping Address</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="PIN Code"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                  >
                    Add Shipping Address
                  </button>
                )}
              </div>

              <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">₹{total().toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-navy-900 text-white py-3 rounded-lg hover:bg-navy-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}