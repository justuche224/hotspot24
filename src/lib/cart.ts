import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productSlug: string;
  branchSlug: string;
  foodItemId: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

interface LegacyCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productSlug: string;
  branchSlug: string;
}

interface LegacyCartState {
  items: LegacyCartItem[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem: CartItem) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === newItem.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },
      removeItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItemQuantity: (id: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          const legacyState = persistedState as LegacyCartState;
          const items = legacyState?.items || [];
          const migratedItems: CartItem[] = items.map((item) => ({
            ...item,
            foodItemId: item.productSlug,
          }));
          return { ...legacyState, items: migratedItems };
        }
        return persistedState as CartState;
      },
    }
  )
);
