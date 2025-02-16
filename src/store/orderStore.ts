import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'order-storage',
    }
  )
);