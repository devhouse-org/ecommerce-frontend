import { useEffect, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCartStore, useAuthStore, useWishlistStore } from "../store/index";
import { ShoppingCart, Heart, Menu, X, Home, Package, User, Trash2 } from "lucide-react";
import CartPopup from "./CartPopup";
import UserProfileAvatar from "./UserProfileAvatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const Navbar = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const { wishlist } = useWishlistStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  const togglePopup = () => setPopupOpen(!isPopupOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg font-medium transition duration-300 ease-in-out relative ${isActive
          ? "text-green-400"
          : "text-gray-300 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 transform scale-x-100 transition-transform duration-300 ease-in-out"></span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black py-2" : "bg-black/85 py-4"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="text-white text-2xl font-bold">
              MyApp
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/products">Products</NavItem>
              {isAuthenticated && (
                <>
                  <NavItem to="/profile">Profile</NavItem>
                  <UserProfileAvatar />
                </>
              )}
              <NavLink to="/wishlist" className="text-white relative focus:outline-none hover:text-green-400 transition duration-300">
                <Heart size={24} />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </NavLink>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-white relative focus:outline-none hover:text-green-400 transition duration-300">
                    <ShoppingCart size={24} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side={"right"} className="bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    {cart.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border rounded p-2 shadow">
                          <div className="flex items-center space-x-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-gray-400">$ {item.price.toLocaleString("en-US")}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {/* Quantity control and price */}
                            <div className="flex items-center mr-2 bg-gray-200 rounded-full">
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
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-6">
                    <p className="text-lg font-semibold">
                      Total: $ {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString("en-US")}
                    </p>
                  </div>
                  {
                    cart.length > 0 && (
                      <div className="mt-6 w-full">
                      <Link className="bg-green-500 block text-center hover:bg-green-600 transition duration-300 text-white px-4 py-2 rounded-full w-full" to="/checkout">
                        Proceed to Checkout
                      </Link>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white focus:outline-none hover:text-green-400 transition duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 right-0 w-64 bg-black transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex flex-col h-full justify-start pt-20 items-center space-y-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/products">Products</NavItem>
            {isAuthenticated && <NavItem to="/profile">Profile</NavItem>}
            <NavLink to="/wishlist" className="text-white relative focus:outline-none hover:text-green-400 transition duration-300">
              <Heart size={24} />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/checkout" className="text-white relative focus:outline-none hover:text-green-400 transition duration-300">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Cart Popup */}
        {isPopupOpen && <CartPopup onClose={() => setPopupOpen(false)} />}
      </nav>

      {/* Bottom Bar for Authenticated Users on Small Screens */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 py-2 md:hidden">
          <div className="flex justify-around items-center">
            <NavLink to="/" className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? 'text-green-400' : ''}`}>
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? 'text-green-400' : ''}`}>
              <Package size={24} />
              <span className="text-xs mt-1">Orders</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `text-white flex flex-col items-center ${isActive ? 'text-green-400' : ''}`}>
              <User size={24} />
              <span className="text-xs mt-1">Profile</span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
