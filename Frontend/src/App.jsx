import './App.css'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './components/navbar';
import PremiumFooter from './components/footer'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductListing';
import AddProductForm from './pages/AddProduct';
import ProductDescription from './pages/ProductDesc';
function App() {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Navbar/>
        <div style={{ height: '80px' }} />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/post" element={<AddProductForm/>} />
          <Route path="/products/:id" element={<ProductDescription />} />
        </Routes>
      </div>
      <PremiumFooter />
    </Router>
  )
}

export default App
