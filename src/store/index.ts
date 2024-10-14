import { CartState } from "@/utils/types";
import { create } from "zustand";

// Create the Zustand store
export const useCartStore = create<CartState>((set) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]"), // Load initial state from localStorage

  // Add product to cart
  addToCart: (product, quantity) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If the product exists in the cart, update its quantity
        const updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist updated cart
        return { cart: updatedCart };
      } else {
        // Otherwise, add the product to the cart
        const newCart = [...state.cart, { ...product, quantity }];
        localStorage.setItem("cart", JSON.stringify(newCart)); // Persist new cart
        return { cart: newCart };
      }
    }),

  // Remove product from cart
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist updated cart
      return { cart: updatedCart };
    }),

  // Update product quantity in cart
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: quantity >= 0 ? quantity : 0 }; // Prevent negative quantity
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist updated cart
      return { cart: updatedCart };
    }),

  // Clear the cart
  clearCart: () => {
    localStorage.removeItem("cart"); // Clear localStorage
    set({ cart: [] }); // This updates the store state immediately
  },
}));

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string, userId: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("jwtToken"), // Check if authenticated based on localStorage
  login: (token, userId, email) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    set({ isAuthenticated: false });
  },
}));
