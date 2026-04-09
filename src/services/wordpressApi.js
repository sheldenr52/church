import axios from 'axios';

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Create axios instance for WordPress REST API
const wordpressApi = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wp/v2`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for WooCommerce REST API
const wooCommerceApi = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wc/v3`,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// WordPress API functions
export const wordpressService = {
  // Get all posts
  getPosts: async (params = {}) => {
    try {
      const response = await wordpressApi.get('/posts', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get single post by ID
  getPost: async (id) => {
    try {
      const response = await wordpressApi.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Get all pages
  getPages: async (params = {}) => {
    try {
      const response = await wordpressApi.get('/pages', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },

  // Get single page by ID
  getPage: async (id) => {
    try {
      const response = await wordpressApi.get(`/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },

  // Get categories
  getCategories: async (params = {}) => {
    try {
      const response = await wordpressApi.get('/categories', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get media/images
  getMedia: async (params = {}) => {
    try {
      const response = await wordpressApi.get('/media', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  },

  // Get custom post type
  getCustomPosts: async (postType, params = {}) => {
    try {
      const response = await wordpressApi.get(`/${postType}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${postType}:`, error);
      throw error;
    }
  },
};

// WooCommerce API functions
export const wooCommerceService = {
  // Get all products
  getProducts: async (params = {}) => {
    try {
      const response = await wooCommerceApi.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await wooCommerceApi.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get orders
  getOrders: async (params = {}) => {
    try {
      const response = await wooCommerceApi.get('/orders', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
};

// Authentication & User Service
export const authService = {
  // Register a new user (using WooCommerce customer endpoint)
  register: async (userData) => {
    try {
      const response = await wooCommerceApi.post('/customers', {
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username || userData.email.split('@')[0],
        password: userData.password,
        billing: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          address_1: userData.address || '',
          city: userData.city || '',
          postcode: userData.postalCode || '',
          country: userData.country || 'ZA',
          email: userData.email,
          phone: userData.phone || '',
        },
        shipping: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          address_1: userData.address || '',
          city: userData.city || '',
          postcode: userData.postalCode || '',
          country: userData.country || 'ZA',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Verify user credentials (check if customer exists)
  login: async (email, password) => {
    try {
      // Note: This is a simplified approach. For production, you should use JWT authentication
      // or WordPress's built-in authentication system with proper security measures.
      
      // Search for customer by email
      const response = await wooCommerceApi.get('/customers', {
        params: {
          email: email,
          per_page: 1
        }
      });
      
      if (response.data && response.data.length > 0) {
        const customer = response.data[0];
        // In a real implementation, you'd verify the password server-side
        // For now, we'll return the customer data
        return {
          id: customer.id,
          email: customer.email,
          firstName: customer.first_name,
          lastName: customer.last_name,
          username: customer.username,
          phone: customer.billing?.phone || '',
          address: customer.billing?.address_1 || '',
          city: customer.billing?.city || '',
          postalCode: customer.billing?.postcode || '',
          country: customer.billing?.country || 'ZA',
        };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.message === 'Invalid email or password') {
        throw error;
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  // Get customer by ID
  getCustomer: async (customerId) => {
    try {
      const response = await wooCommerceApi.get(`/customers/${customerId}`);
      const customer = response.data;
      return {
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
        username: customer.username,
        phone: customer.billing?.phone || '',
        address: customer.billing?.address_1 || '',
        city: customer.billing?.city || '',
        postalCode: customer.billing?.postcode || '',
        country: customer.billing?.country || 'ZA',
      };
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (customerId, userData) => {
    try {
      const response = await wooCommerceApi.put(`/customers/${customerId}`, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        billing: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          address_1: userData.address || '',
          city: userData.city || '',
          postcode: userData.postalCode || '',
          country: userData.country || 'ZA',
          email: userData.email,
          phone: userData.phone || '',
        },
        shipping: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          address_1: userData.address || '',
          city: userData.city || '',
          postcode: userData.postalCode || '',
          country: userData.country || 'ZA',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },
};

export default { wordpressService, wooCommerceService, authService };
