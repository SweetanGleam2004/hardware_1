import { create } from 'zustand';
import { getProducts, getProductsByCategory } from '../lib/api';
import type { Product } from '../types';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  fetchProducts: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  selectedCategory: 'All Products',
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProducts();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },
  setSelectedCategory: async (category) => {
    set({ selectedCategory: category, loading: true });
    try {
      const data = category === 'All Products'
        ? await getProducts()
        : await getProductsByCategory(category);
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },
}));