import React, { useEffect, useState } from 'react';
import { wordpressService } from '../services/wordpressApi';

/**
 * Example component showing how to fetch and display WordPress posts
 * You can use this as a reference to integrate WordPress content into your pages
 */
const WordPressPostsExample = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Fetch latest 10 posts
      const data = await wordpressService.getPosts({ 
        per_page: 10,
        _embed: true // This includes featured images and author info
      });
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts from WordPress');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wordpress-posts">
      <h2>Latest Church Updates</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            {/* Featured Image */}
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <img 
                src={post._embedded['wp:featuredmedia'][0].source_url} 
                alt={post.title.rendered}
                className="post-image"
              />
            )}
            
            {/* Post Title */}
            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            
            {/* Post Excerpt */}
            <div 
              className="post-excerpt" 
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
            />
            
            {/* Post Date */}
            <p className="post-date">
              {new Date(post.date).toLocaleDateString('en-ZA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            
            {/* Read More Link */}
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              Read More →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default WordPressPostsExample;
