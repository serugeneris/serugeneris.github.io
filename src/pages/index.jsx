// pages/index.js
import Head from 'next/head';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout';
import Search from '../components/search';
import { getSortedPostsData } from '../../lib/posts';

export default function Home({ allPostsData }) {
  const [filteredPosts, setFilteredPosts] = useState(allPostsData.slice(1)); // Initialize with all posts except the first one
  const [isSearching, setIsSearching] = useState(false);

  // The latest post is the first one in the array
  const latestPost = allPostsData[0];
  // All other posts - when searching, use filtered posts, otherwise use all posts except the first one
  const otherPosts = isSearching ? filteredPosts : allPostsData.slice(1);
  
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setFilteredPosts(allPostsData.slice(1));
      setIsSearching(false);
      return;
    }
    
    // Client-side filtering - only filter the posts after the first one
    const lowerCaseQuery = query.toLowerCase();
    const results = allPostsData.slice(1).filter(post => {
      return (
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
      );
    });
    
    setFilteredPosts(results);
    setIsSearching(true);
  }, [allPostsData]);

  return (
    <Layout home>
      <Head>
        <title>Contrasentido</title>
        <meta property="og:title" content="Contrasentido" />
        <meta property="og:description" content="Bienvenidos a Contrasentido, un blog de temas variados." />
        <meta property="og:image" content="/images/contrasentido.png" />
        <meta property="og:url" content="https://contrasentido.ar" />
      </Head>
      
      {latestPost && (
        <section className="featured-post">
          <h2 className="section-title featured-post-title-heading">Última entrada</h2>
          <div className="featured-post-container">
            {latestPost.image && (
              <div className="featured-post-image">
                <Image 
                  src={latestPost.image} 
                  alt={latestPost.title}
                  width={600}
                  height={300}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              </div>
            )}
            <div className="featured-post-content">
              <Link href={`/posts/${latestPost.id}`}>
                <h3 className="featured-post-title">{latestPost.title}</h3>
              </Link>
              <div className="featured-post-date">{latestPost.date}</div>
              <p className="featured-post-excerpt">{latestPost.description}</p>
              <Link href={`/posts/${latestPost.id}`} className="read-more">
                Leer mas &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
      
      <section className="content-section">
        <div className="posts-search-container">
          <div className="posts-container">
            <h2 className="section-title">{isSearching ? 'Resultados de búsqueda' : 'Todas las demás entradas'}</h2>
            {otherPosts.length > 0 ? (
              <ul className="posts-list">
                {otherPosts.map(({ id, date, title, description }) => (
                  <li className="post-item" key={id}>
                    <Link href={`/posts/${id}`}>
                      <h3 className="post-title">{title}</h3>
                    </Link>
                    <div className="post-date">{date}</div>
                    <p className="post-excerpt">{description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-posts">No se encontraron entradas que coincidan con los términos de búsqueda.</p>
            )}
          </div>
          
          <div className="search-sidebar">
            <div className="sticky-search">
              <h3>Buscar Entradas</h3>
              <Search onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .intro {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        
        .featured-post {
          margin-bottom: 3rem;
          width: 100%;
          position: relative;
          border-bottom: 1px solid var(--border-color, #eaeaea);
        }
        
        .featured-post-title-heading {
          position: relative;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        
        .featured-post-title-heading:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 25%;
          right: 25%;
          height: 1px;
          background-color: var(--border-color, #eaeaea);
        }
        
        .featured-post-container {
          display: flex;
          align-items: center;
          padding: 1.5rem;
        }
        
        .featured-post-image {
          width: 100%;
          margin-bottom: 1.5rem;
          text-align: center;
          margin-right: 1rem;
        }
        
        .featured-post-image img {
          max-width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .featured-post-content {
          width: 100%;
          text-align: center;
        }
        
        .featured-post-title {
          margin: 0.5rem 0;
          font-size: 1.5rem;
        }
        
        .featured-post-date {
          font-style: italic;
          color: #666;
          margin-bottom: 1rem;
        }
        
        .featured-post-excerpt {
          margin-bottom: 1rem;
        }
        
        .read-more {
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: #333;
          color: white;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .read-more:hover {
          background-color: #555;
        }
        
        .content-section {
          width: 100%;
        }
        
        .posts-search-container {
          display: flex;
          flex-direction: row;
          width: 100%;
          gap: 2rem;
          justify-content: space-evenly;
        }
        
        .sticky-search {
          position: sticky;
          top: 2rem;
        }
        
        .posts-list {
          list-style: none;
          padding: 0;
          text-align: left;
        }
        
        .post-item {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .post-item:last-child {
          border-bottom: none;
        }
        
        .post-title {
          margin: 0.5rem 0;
          font-weight: 500;
        }
        
        .post-date {
          font-style: italic;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .post-excerpt {
          margin-bottom: 0.5rem;
          color: #444;
        }
        
        .no-posts {
          text-align: center;
          color: #666;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .posts-search-container {
            flex-direction: column;
          }
          
          .search-sidebar {
            order: -1;
            margin-bottom: 2rem;
          }
          
          .featured-post-container {
            padding: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}