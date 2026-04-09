# WordPress CMS Integration

This project is now connected to your WordPress CMS at `cms.qsdachurch.co.za`.

## Environment Variables

The following environment variables are configured in `.env`:

- `VITE_WORDPRESS_URL` - Your WordPress site URL
- `VITE_WC_CONSUMER_KEY` - WooCommerce Consumer Key
- `VITE_WC_CONSUMER_SECRET` - WooCommerce Consumer Secret

**Note:** The `.env` file is git-ignored for security. Never commit API credentials to git.

## WordPress API Service

The WordPress API service is located at `src/services/wordpressApi.js` and provides two main services:

### 1. WordPress Service (`wordpressService`)

For accessing WordPress content (posts, pages, categories, media):

```javascript
import { wordpressService } from '../services/wordpressApi';

// Get all posts
const posts = await wordpressService.getPosts();

// Get posts with parameters
const recentPosts = await wordpressService.getPosts({ 
  per_page: 5,
  _embed: true 
});

// Get single post
const post = await wordpressService.getPost(123);

// Get all pages
const pages = await wordpressService.getPages();

// Get single page
const page = await wordpressService.getPage(456);

// Get categories
const categories = await wordpressService.getCategories();

// Get media
const media = await wordpressService.getMedia();

// Get custom post types (e.g., 'sermons', 'events')
const sermons = await wordpressService.getCustomPosts('sermons');
```

### 2. WooCommerce Service (`wooCommerceService`)

For accessing WooCommerce data (products, orders):

```javascript
import { wooCommerceService } from '../services/wordpressApi';

// Get all products
const products = await wooCommerceService.getProducts();

// Get products with parameters
const featuredProducts = await wooCommerceService.getProducts({ 
  featured: true,
  per_page: 10 
});

// Get single product
const product = await wooCommerceService.getProduct(789);

// Get orders
const orders = await wooCommerceService.getOrders();
```

## Usage Example

See `src/components/WordPressPostsExample.jsx` for a complete example of how to fetch and display WordPress posts in a React component.

### Basic Implementation

```javascript
import React, { useEffect, useState } from 'react';
import { wordpressService } from '../services/wordpressApi';

function MyComponent() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await wordpressService.getPosts({ 
          per_page: 10,
          _embed: true 
        });
        setPosts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      ))}
    </div>
  );
}
```

## Common Parameters

- `per_page` - Number of items to return (default: 10)
- `page` - Page number for pagination
- `_embed` - Include embedded resources (featured images, authors, etc.)
- `categories` - Filter by category IDs
- `search` - Search query string
- `orderby` - Order by field (date, title, etc.)
- `order` - ASC or DESC

## Integration Steps

1. **Import the service** in your component:
   ```javascript
   import { wordpressService } from '../services/wordpressApi';
   ```

2. **Fetch data** in useEffect:
   ```javascript
   useEffect(() => {
     fetchWordPressData();
   }, []);
   ```

3. **Display the content** using `dangerouslySetInnerHTML` for HTML content:
   ```javascript
   <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
   ```

## Testing the Connection

You can test the connection by importing and using `WordPressPostsExample` component in any of your pages:

```javascript
import WordPressPostsExample from '../components/WordPressPostsExample';

// Then in your component JSX:
<WordPressPostsExample />
```

## Security Notes

- API credentials are stored in `.env` file
- The `.env` file is excluded from git
- WooCommerce credentials use HTTP Basic Auth
- Always validate and sanitize data from external sources
- Use HTTPS for production
