import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../lib/api';
import type { Order } from '../../types';
import toast from 'react-hot-toast';
import { Package, Truck, Check } from 'lucide-react';

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success('Order status updated');
      loadOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(order.id, 'processing')}
                  className={`p-2 rounded-full ${
                    order.status === 'processing'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <Package className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleStatusUpdate(order.id, 'shipped')}
                  className={`p-2 rounded-full ${
                    order.status === 'shipped'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                  }`}
                >
                  <Truck className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleStatusUpdate(order.id, 'delivered')}
                  className={`p-2 rounded-full ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <Check className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Order Items</h3>
              <div className="space-y-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.product?.image_url}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × ₹
                        {item.price_at_time.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Shipping Address:</p>
                  <p className="text-sm text-gray-600">
                    {order.shipping_address.street}, {order.shipping_address.city}
                    <br />
                    {order.shipping_address.state} - {order.shipping_address.pincode}
                  </p>
                </div>
                <p className="text-xl font-bold">
                  ₹{order.total_amount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}