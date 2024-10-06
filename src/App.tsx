import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import { MyNavbar } from './components/Navbar'
import { MyFooter } from './components/Footer'
import Checkout from './pages/Checkout'

function App() {
  return (
    <div className='mb-10'>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        
      </Routes>
      <MyFooter />
    </div>
  )
}

export default App
