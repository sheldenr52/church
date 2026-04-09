import axios from 'axios';

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Create axios instance for WooCommerce Store API (for cart)
const storeApi = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wc/store/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for custom abandoned cart endpoint
const abandonedCartApi = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Abandoned Cart Service for WooCommerce
 * 
 * This service syncs your frontend cart with WordPress/WooCommerce
 * to enable the Abandoned Cart Lite plugin to track cart abandonment.
 */
export const abandonedCartService = {
  
  /**
   * Track cart for abandoned cart plugin
   * This sends cart data to WordPress so the abandoned cart plugin can track it
   */
  trackCart: async (cartData) => {
    try {
      const { items, user, sessionId } = cartData;
      
      // Build cart items for WooCommerce format
      const cartItems = items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        product_name: item.name,
        product_price: parseFloat(item.price || 0),
        line_total: parseFloat(item.price || 0) * item.quantity,
      }));

      // Calculate totals
      const cartTotal = cartItems.reduce((sum, item) => sum + item.line_total, 0);

      // Prepare data for abandoned cart tracking
      const trackingData = {
        session_id: sessionId || generateSessionId(),
        user_email: user?.email || '',
        user_first_name: user?.firstName || '',
        user_last_name: user?.lastName || '',
        cart_items: cartItems,
        cart_total: cartTotal,
        cart_currency: 'ZAR',
        cart_timestamp: new Date().toISOString(),
      };

      // Send to custom endpoint (you'll need to create this in WordPress)
      // Or use WooCommerce's session API
      const response = await abandonedCartApi.post('/wc/v3/cart/track', trackingData, {
        auth: {
          username: WC_CONSUMER_KEY,
          password: WC_CONSUMER_SECRET,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error tracking cart:', error);
      // Don't throw - cart tracking shouldn't block the user experience
      return null;
    }
  },

  /**
   * Capture email for abandoned cart (for guest users)
   * Call this when user enters email in checkout or any form
   */
  captureEmail: async (email, cartItems, sessionId) => {
    try {
      const captureData = {
        email: email,
        session_id: sessionId || generateSessionId(),
        cart_items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          product_name: item.name,
          product_price: parseFloat(item.price || 0),
        })),
        timestamp: new Date().toISOString(),
      };

      await abandonedCartApi.post('/abandoned-cart/capture-email', captureData);
      
      return true;
    } catch (error) {
      console.error('Error capturing email:', error);
      return false;
    }
  },

  /**
   * Mark cart as recovered (when user completes purchase)
   */
  markCartRecovered: async (sessionId) => {
    try {
      await abandonedCartApi.post('/abandoned-cart/recovered', {
        session_id: sessionId,
      });
      return true;
    } catch (error) {
      console.error('Error marking cart as recovered:', error);
      return false;
    }
  },

  /**
   * Update cart in WordPress session
   * This keeps the WordPress cart in sync with frontend
   */
  syncCartWithWordPress: async (cartItems, user) => {
    try {
      // Generate or retrieve session ID
      const sessionId = getOrCreateSessionId();

      // Track the cart for abandoned cart plugin
      await abandonedCartService.trackCart({
        items: cartItems,
        user: user,
        sessionId: sessionId,
      });

      return sessionId;
    } catch (error) {
      console.error('Error syncing cart with WordPress:', error);
      return null;
    }
  },
};

/**
 * Generate a unique session ID for tracking
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get existing session ID or create new one
 */
function getOrCreateSessionId() {
  let sessionId = localStorage.getItem('wc_cart_session_id');
  
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('wc_cart_session_id', sessionId);
  }
  
  return sessionId;
}

/**
 * Clear session ID (call when cart is completed or cleared)
 */
export function clearCartSession() {
  localStorage.removeItem('wc_cart_session_id');
}

export default abandonedCartService;
