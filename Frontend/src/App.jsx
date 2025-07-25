import './App.css'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './components/navbar';
import PremiumFooter from './components/footer'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductListing';
import AddProductForm from './pages/AddProduct';

import About from './pages/About';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import ProductDescription from './pages/ProductDesc';
import SwapPage from './pages/SwapPage';
import AdminDashboard from './pages/AdminDashboard';
import ShoppingBot from './pages/ShopingBot';

function App() {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Navbar />
        <div style={{ height: "80px" }} />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/products" element={<ProductList/>} />
          <Route path="/post" element={<AddProductForm/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />         

          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/products/:id" element={<ProductDescription />} />
          <Route path="/swap/:id" element={<SwapPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          

        </Routes>
        <ShoppingBot/>
      </div>
      <PremiumFooter />
    </Router>
  );
}

export default App;
