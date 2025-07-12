import './App.css'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './components/navbar';
import PremiumFooter from './components/footer'
import Home from './pages/Home';
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
        </Routes>
      </div>
      <PremiumFooter />
    </Router>
  )
}

export default App
