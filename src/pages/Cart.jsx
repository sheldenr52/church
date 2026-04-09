import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  };

  const handleCheckout = () => {
    // This could be integrated with WooCommerce checkout API
    alert('Redirecting to checkout... (Integration with WooCommerce checkout can be added)');
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="cart-page">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Add some items from our store to get started!</p>
            <Link to="/store" className="btn-continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="btn-clear-cart">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0].src} alt={item.name} />
                  ) : (
                    <div className="cart-item-placeholder">No Image</div>
                  )}
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  {item.categories && item.categories.length > 0 && (
                    <div className="cart-item-categories">
                      {item.categories.map(cat => (
                        <span key={cat.id} className="category-tag">
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                </div>

                <div className="cart-item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <p className="item-total-label">Total:</p>
                  <p className="item-total-price">
                    {formatPrice(parseFloat(item.price) * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>

            <button onClick={handleCheckout} className="btn-checkout">
              Proceed to Checkout
            </button>

            <Link to="/store" className="btn-continue-shopping-secondary">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
