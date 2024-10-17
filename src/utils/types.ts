// Define the type for a product in the cart
export interface CartItem {
  id: string; // or string, depending on your product ID type
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  ratings: {
    score: number;
    comment: string;
  }[];
}

// Define the shape of the store's state
export interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem, quantity: number) => void; // Use Omit to exclude quantity from product
  removeFromCart: (productId: string) => void; // or string
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void; // New function to update quantity
}

export type Category = {
  id: string;
  name: string;
};

export type ProductT = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export interface ProductListProps extends CartItem {}
