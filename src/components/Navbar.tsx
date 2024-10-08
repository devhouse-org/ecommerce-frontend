import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartStore } from "../utils/CartContext"; // Import Zustand store
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart from Lucide
import CartPopup from "../components/CartPopup"; // Import the CartPopup component

const Navbar = () => {
  const { cart } = useCartStore(); // Access the cart state from Zustand
  const [isPopupOpen, setPopupOpen] = useState(false); // State to manage popup visibility

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const togglePopup = () => setPopupOpen(!isPopupOpen); // Toggle popup visibility

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl">MyApp</div>
        <div className="flex space-x-4 items-center">
          {/* Cart Icon with item count */}
          <div className="relative">
            <button
              onClick={togglePopup} // Toggle popup on click
              className="text-white relative focus:outline-none"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Show CartPopup when the button is clicked */}
            {isPopupOpen && <CartPopup onClose={() => setPopupOpen(false)} />}
          </div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 hover:text-yellow-300"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 hover:text-yellow-300"
                : "text-gray-300 hover:text-white"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 hover:text-yellow-300"
                : "text-gray-300 hover:text-white"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 hover:text-yellow-300"
                : "text-gray-300 hover:text-white"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
