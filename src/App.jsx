import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Contact from './pages/Contact';
import EventUpdates from './pages/EventUpdates';
import './styles/globals.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/eventupdates" element={<EventUpdates />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
