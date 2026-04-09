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

export default { wordpressService, wooCommerceService };
