import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import { MyFooter } from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import OrdersPage from "./pages/orders";
import WishlistPage from "./pages/WishlistPage";
import Profile from "./pages/Profile"; // Import the new Profile component
import { useAuthStore } from "./store/index";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow pt-16 ${isAuthenticated ? 'pb-16 md:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<Profile />} /> {/* Add the new Profile route */}
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <MyFooter />
    </div>
  );
}

export default App;
