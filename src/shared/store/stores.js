// ─── Zustand Stores ────────────────────────────────────────────────────────
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import logger from '../../utils/logger.js';

// ── Cart Store ─────────────────────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],   // [{ ...product, quantity }]

      addItem: (product, quantity = 1) => {
        set(state => {
          const existing = state.items.find(i => i.id === product.id);
          if (existing) {
            logger.info('Cart: quantity bumped', { id: product.id });
            return {
              items: state.items.map(i =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          logger.info('Cart: item added', { id: product.id });
          return { items: [...state.items, { ...product, quantity }] };
        });
      },

      removeItem: (productId) => {
        logger.info('Cart: item removed', { id: productId });
        set(state => ({ items: state.items.filter(i => i.id !== productId) }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) { get().removeItem(productId); return; }
        set(state => ({
          items: state.items.map(i =>
            i.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        logger.info('Cart: cleared');
        set({ items: [] });
      },

      get totalItems() { return get().items.reduce((s, i) => s + i.quantity, 0); },
      get totalPrice() { return get().items.reduce((s, i) => s + i.price * i.quantity, 0); },
    }),
    { name: 'aratat-cart' }
  )
);

// ── Filter Store ────────────────────────────────────────────────────────────
export const useFilterStore = create((set) => ({
  category:   'all',
  subcategory: 'all',
  sort:        'newest',
  minPrice:    0,
  maxPrice:    50000,
  searchQuery: '',

  setCategory:    (category)    => set({ category, subcategory: 'all' }),
  setSubcategory: (subcategory) => set({ subcategory }),
  setSort:        (sort)        => set({ sort }),
  setPriceRange:  (min, max)    => set({ minPrice: min, maxPrice: max }),
  setSearch:      (searchQuery) => set({ searchQuery }),
  clearFilters:   ()            => set({ category: 'all', subcategory: 'all', sort: 'newest', minPrice: 0, maxPrice: 50000, searchQuery: '' }),
}));

// ── Orders Store ────────────────────────────────────────────────────────────
export const useOrdersStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        logger.info('Order: new order placed', { orderId: orderData.id });
        set(state => ({ orders: [orderData, ...state.orders] }));
        return orderData.id;
      },

      getOrder: (orderId) => get().orders.find(o => o.id === orderId),

      getAllOrders: () => get().orders,
    }),
    { name: 'aratat-orders' }
  )
);
