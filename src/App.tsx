import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import { MyNavbar } from './components/Navbar'
import { MyFooter } from './components/Footer'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <div className='mb-10'>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <MyFooter />
    </div>
  )
}

export default App
