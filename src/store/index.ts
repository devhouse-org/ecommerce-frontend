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
  updateQuantity: (productId: number, quantity: number) => void; // New function to update quantity
  getTotalPrice: () => number; // Add a method to get total price
}

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

  // Get total price of items in cart
  getTotalPrice: () =>
    set((state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    ),
}));
