import React from "react";
import { useCartStore } from "../utils/CartContext"; // Adjust the path as necessary
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart from Lucide

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cart } = useCartStore(); // Access the cart state from Zustand

  return (
    <div className="absolute right-0 z-10 w-80 mt-2 bg-white shadow-lg rounded-lg p-4">
      <h3 className="font-bold text-lg mb-2">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.title}</span>
              <span>
                {item.quantity} x ${item.price}
              </span>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default CartPopup;
