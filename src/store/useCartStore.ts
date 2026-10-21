import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addToCart: (item) => set((state) => ({ items: [...state.items, item], isOpen: true })),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));