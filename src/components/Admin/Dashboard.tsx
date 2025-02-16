import React, { useState, useEffect } from 'react';
import { BarChart3, Package, ShoppingBag, Users } from 'lucide-react';
import { getOrders, getProducts } from '../../lib/api';
import type { Order, Product } from '../../types';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStock: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [orders, products] = await Promise.all([
        getOrders(),
        getProducts(),
      ]);

      setStats({
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
        totalProducts: products.length,
        lowStock: products.filter((p) => p.stock < 10).length,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <Package className="h-8 w-8 text-navy-900" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-navy-900" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-navy-900" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold">{stats.lowStock}</p>
            </div>
            <Users className="h-8 w-8 text-navy-900" />
          </div>
        </div>
      </div>

      {/* Add more dashboard widgets here */}
    </div>
  );
}