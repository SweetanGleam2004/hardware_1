import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) => set((state) => ({ items: [...state.items, id] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item !== id) })),
      isWishlisted: (id) => get().items.includes(id),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);