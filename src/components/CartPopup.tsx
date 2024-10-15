import React, { useEffect, useRef } from "react";
import { useCartStore } from "../store/index";
import { X } from "lucide-react"; // Import ShoppingCart from Lucide
import { Link } from "react-router-dom";

interface CartPopupProps {
  onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore(); // Access the cart state from Zustand
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
      className="absolute right-0 z-10 w-96 mt-2 bg-white shadow-lg rounded-lg p-4 "
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Shopping Cart</h3>
        {cart.length > 0 && (
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => clearCart()}
          >
            Clear All
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center mb-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-2"
              />
              <div className="flex flex-grow justify-between items-center">
                <div>
                  <p>{item.name}</p>
                  {/* Price */}
                  <span className="font-semibold mr-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center">
                  {/* Quantity control and price */}
                  <div className="flex items-center mr-2 bg-gray-200">
                    <button
                      className="mr-2 bg-gray-200 hover:bg-gray-300 hover:text-green-600 text-xl px-2 py-1"
                      onClick={() => {
                        {
                          item.quantity == 1
                            ? removeFromCart(item.id)
                            : updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="mx-1">{item.quantity}</span>
                    <button
                      className="ml-2 bg-gray-200 hover:bg-gray-300 hover:text-green-600 text-xl px-2 py-1"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X size={18} />
                  </button>
                </div>
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
