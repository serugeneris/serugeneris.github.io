// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedPostsData } from '../../lib/posts';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>My Blog</title>
      </Head>
      
      <section className="intro">
        <h1>Welcome to My Blog</h1>
      </section>
      
      <section className="posts">
        <h2>Blog Posts</h2>
        <ul className="posts-list">
          {allPostsData.map(({ id, date, title }) => (
            <li className="post-item" key={id}>
              <Link href={`/posts/${id}`}>
                <h3 className="post-title">{title}</h3>
              </Link>
              <small className="post-date">{date}</small>
            </li>
          ))}
        </ul>
      </section>
      
      <style jsx>{`
        .intro {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .posts {
          text-align: center;
        }
        
        .posts h2 {
          margin-bottom: 2rem;
          font-weight: 500;
        }
        
        .posts-list {
          list-style: none;
          padding: 0;
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