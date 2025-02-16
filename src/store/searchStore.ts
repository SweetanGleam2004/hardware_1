import { create } from 'zustand';
import { products } from '../data/products';

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
  filteredProducts: typeof products;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  query: '',
  selectedCategory: 'All Products',
  setQuery: (query) => {
    set({ query });
  },
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
  get filteredProducts() {
    const state = get();
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(state.query.toLowerCase()) ||
                         product.description.toLowerCase().includes(state.query.toLowerCase());
      const matchesCategory = state.selectedCategory === 'All Products' || 
                            product.category === state.selectedCategory;
      return matchesQuery && matchesCategory;
    });
  },
}));