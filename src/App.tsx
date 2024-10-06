import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import { MyNavbar } from './components/Navbar'
import { MyFooter } from './components/Footer'

function App() {
  return (
    <div className=''>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <MyFooter />
    </div>
  )
}

export default App
