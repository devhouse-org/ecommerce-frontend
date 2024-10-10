import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import { MyFooter } from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="mb2">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        

      </Routes>
      <MyFooter />
    </div>
  );
}

export default App;
