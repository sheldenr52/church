import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/adventist-symbol-tm--black.svg" alt="QSDA Church Logo" />
          <span>QSDA Church</span>
        </Link>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/videos" onClick={closeMenu}>Videos</Link>
          <Link to="/store" onClick={closeMenu}>Store</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/cart" onClick={closeMenu} className="nav-cart">
            🛒
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>
          <Link to="/profile" onClick={closeMenu} className="nav-profile">
            👤
          </Link>
        </div>
      </div>
    </nav>
  );
}
