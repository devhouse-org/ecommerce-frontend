import React, { useEffect, useRef } from "react";
import { useCartStore } from "../utils/CartContext"; // Adjust the path as necessary
import { ShoppingCart, Trash2 } from "lucide-react"; // Import ShoppingCart from Lucide
import { Link } from "react-router-dom";

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart } = useCartStore(); // Access the cart state from Zustand
  const popupRef = useRef<HTMLDivElement>(null); // Create a ref for the popup

  useEffect(() => {
    // Handler to close the popup if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the popup
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div
      ref={popupRef}
      className="absolute right-0 z-10 w-80 mt-2 bg-white shadow-lg rounded-lg p-4"
    >
      <h3 className="font-bold text-lg mb-2">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center mb-2">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded mr-2"
              />
              <div className="flex justify-between w-full">
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 p-1 rounded-l"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1} // Disable if quantity is 1
                    >
                      -
                    </button>
                    <span className="mx-2 ">{item.quantity}</span>
                    <button
                      className="bg-gray-200 p-1 rounded-r"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="self-center">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="ml-2 text-red-600 hover:text-red-800"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
          <Link to={"/checkout"}>
            <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500">
              Checkout
            </button>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default CartPopup;
