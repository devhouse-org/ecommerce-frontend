import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { MyNavbar } from "./components/Navbar";
import { MyFooter } from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div className="mb-10">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <MyFooter />
    </div>
  );
}

export default App;
