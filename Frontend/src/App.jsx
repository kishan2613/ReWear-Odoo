import './App.css'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Navbar from './components/navbar';;
import Home from './pages/Home';
function App() {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Navbar/>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
