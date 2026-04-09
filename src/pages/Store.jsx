import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { wooCommerceService } from '../services/wordpressApi';
import { useCart } from '../context/CartContext';

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await wooCommerceService.getProducts({ 
        per_page: 50,
        status: 'publish',
        orderby: 'date',
        order: 'desc'
      });
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueCategories = () => {
    const categories = new Set();
    products.forEach(product => {
      product.categories?.forEach(cat => {
        categories.add(cat.name);
      });
    });
    return Array.from(categories);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.categories?.some(cat => cat.name === selectedCategory)
      );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(price);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    
    // Reset the "added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <Layout>
      <div className="store-page">
        <div className="store-header">
          <h1>Church Store</h1>
          <p>Browse our collection of books, resources, and more</p>
        </div>

        {/* Category Filter */}
        {!loading && products.length > 0 && (
          <div className="category-filter">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            {getUniqueCategories().map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={fetchProducts} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products available at the moment.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    {/* Product Image */}
                    <div className="product-image-container">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0].src} 
                          alt={product.name}
                          className="product-image"
                        />
                      ) : (
                        <div className="product-image-placeholder">
                          <span>No Image</span>
                        </div>
                      )}
                      {product.on_sale && (
                        <span className="sale-badge">Sale</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                      <h3 className="product-title">{product.name}</h3>
                      
                      {/* Product Categories */}
                      {product.categories && product.categories.length > 0 && (
                        <div className="product-categories">
                          {product.categories.map(cat => (
                            <span key={cat.id} className="category-tag">
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Product Description */}
                      <div 
                        className="product-description"
                        dangerouslySetInnerHTML={{ 
                          __html: product.short_description || product.description?.substring(0, 150) + '...' 
                        }}
                      />

                      {/* Product Price */}
                      <div className="product-price">
                        {product.on_sale ? (
                          <>
                            <span className="regular-price">{formatPrice(product.regular_price)}</span>
                            <span className="sale-price">{formatPrice(product.sale_price)}</span>
                          </>
                        ) : (
                          <span className="current-price">{formatPrice(product.price)}</span>
                        )}
                      </div>

                      {/* Stock Status */}
                      <div className={`stock-status ${product.stock_status}`}>
                        {product.stock_status === 'instock' ? 'In Stock' : 
                         product.stock_status === 'outofstock' ? 'Out of Stock' : 
                         'On Backorder'}
                      </div>

                      {/* Action Buttons */}
                      <div className="product-actions">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`btn-add-to-cart ${addedToCart[product.id] ? 'added' : ''}`}
                          disabled={product.stock_status === 'outofstock'}
                        >
                          {addedToCart[product.id] ? '✓ Added!' : 
                           product.stock_status === 'outofstock' ? 'Out of Stock' : 
                           '🛒 Add to Cart'}
                        </button>
                        
                        <a 
                          href={product.permalink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="view-product-link"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
