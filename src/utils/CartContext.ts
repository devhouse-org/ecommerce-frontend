import { create } from "zustand";

// Define the type for a product in the cart
interface CartItem {
  id: number; // or string, depending on your product ID type
  title: string;
  description: string;
  price: number;
  imgSrc: string;
  quantity: number;
}

// Define the shape of the store's state
interface CartState {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void; // Use Omit to exclude quantity from product
  removeFromCart: (productId: number) => void; // or string
  clearCart: () => void;
}

// Create the Zustand store
export const useCartStore = create<CartState>((set) => ({
  cart: [],

  // Add product to cart
  addToCart: (product, quantity) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If the product exists in the cart, update its quantity
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // Otherwise, add the product to the cart
        return { cart: [...state.cart, { ...product, quantity }] };
      }
    }),

  // Remove product from cart
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  // Clear the cart
  clearCart: () => set({ cart: [] }),
}));
