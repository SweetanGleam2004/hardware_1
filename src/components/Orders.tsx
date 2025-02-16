import React from 'react';
import { Package } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';

export default function Orders() {
  const { orders } = useOrderStore();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
        <p className="text-gray-500">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium capitalize" 
                style={{
                  backgroundColor: 
                    order.status === 'pending' ? '#FEF3C7' :
                    order.status === 'processing' ? '#DBEAFE' :
                    order.status === 'shipped' ? '#D1FAE5' :
                    '#F3F4F6',
                  color:
                    order.status === 'pending' ? '#92400E' :
                    order.status === 'processing' ? '#1E40AF' :
                    order.status === 'shipped' ? '#065F46' :
                    '#1F2937'
                }}>
                {order.status}
              </span>
            </div>
            
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">
                      Quantity: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Shipping Address:</span>
                <span className="font-bold text-lg">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-gray-600 mt-2">
                {order.shippingAddress.street}, {order.shippingAddress.city},
                <br />
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}