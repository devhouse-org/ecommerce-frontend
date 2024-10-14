import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartStore } from "../store/index"; // Import Zustand store
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart from Lucide
import CartPopup from "../components/CartPopup"; // Import the CartPopup component
import { Avatar } from "./Avatar";
import { useAuthStore } from "../store/index";

const Navbar = () => {
  const { cart } = useCartStore(); // Access the cart state from Zustand
  const [isPopupOpen, setPopupOpen] = useState(false); // State to manage popup visibility
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const togglePopup = () => setPopupOpen(!isPopupOpen); // Toggle popup visibility

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled more than 50px from the top
      setIsScrolled(window.scrollY > 50);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 py-4 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-black/85"
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center">
        <NavLink to="/">
          <div className="text-white text-2xl">MyApp</div>
        </NavLink>

        <div className="flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-green-600 hover:text-green-500 transition ease-in-out"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-green-600 hover:text-green-500 transition ease-in-out"
                : "text-gray-300 hover:text-white"
            }
          >
            Products
          </NavLink>
          {/* <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-green-600 hover:text-green-500 transition ease-in-out"
                : "text-gray-300 hover:text-white"
            }
          >
            Contact
          </NavLink> */}
          {/* <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-green-600 hover:text-green-500 transition ease-in-out"
                : "text-gray-300 hover:text-white"
            }
          >
            About
          </NavLink> */}
          {isAuthenticated && <Avatar />}
          {/* Cart Icon with item count */}
          <div className="relative">
            <button
              onClick={togglePopup} // Toggle popup on click
              className="text-white relative focus:outline-none"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-3 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Show CartPopup when the button is clicked */}
            {isPopupOpen && <CartPopup onClose={() => setPopupOpen(false)} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
