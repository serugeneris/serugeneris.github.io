// components/layout.js
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, home }) {
  return (
    <div className="container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <header className="header">
        <h2 className="site-title">
          <Link href="/">My Blog</Link>
        </h2>
      </header>
      
      <main>{children}</main>
      
      {!home && (
        <div className="back-link">
          <Link href="/">← Back to home</Link>
        </div>
      )}
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} My Blog</p>
      </footer>
      
      <style jsx>{`
        .header {
          display: flex;
          justify-content: center;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .site-title {
          margin: 0;
          letter-spacing: 1px;
        }
        
        .site-title a {
          text-decoration: none;
        }
        
        .back-link {
          margin: 3rem 0;
          text-align: center;
        }
        
        .footer {
          margin-top: 4rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}