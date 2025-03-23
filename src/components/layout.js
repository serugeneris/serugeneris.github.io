// components/layout.js
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children, home }) {
  return (
    <div className="kindle-container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <header className="kindle-header">
        {home ? (
          <h2 className="site-title">Serugeneris&apos; Blog</h2>
        ) : (
          <h2 className="site-title">
            <Link href="/">Serugeneris&apos; Blog</Link>
          </h2>
        )}
      </header>
      
      <main className="kindle-content">{children}</main>
      
      {!home && (
        <div className="pagination">
          <Link href="/" className="prev-page">← Back to library</Link>
        </div>
      )}
      
      <footer className="kindle-footer">
        <div className="progress-indicator">
          <div className="page-info">© {new Date().getFullYear()} Serugeneris&apos; Blog</div>
        </div>
      </footer>
      
      <style jsx>{`
        .kindle-container {
          position: relative;
          padding: 1.5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .kindle-header {
          display: flex;
          justify-content: center;
          padding: 1rem 0 2rem;
          margin-bottom: 2rem;
          text-align: center;
          border-bottom: 1px solid var(--border-color);
          width: 100%;
        }
        
        .site-title {
          margin: 0;
          font-weight: normal;
          letter-spacing: 0.5px;
          font-size: 1.3rem;
        }
        
        .kindle-content {
          min-height: 70vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          margin: 3rem 0 1.5rem;
          font-size: 0.9rem;
          color: #666;
        }
        
        .prev-page, .next-page {
          padding: 0.5rem 1rem;
        }
        
        .kindle-footer {
          margin-top: 2.5rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          text-align: center;
          font-size: 0.8rem;
          color: #777;
          width: 100%;
        }
        
        .progress-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .page-info {
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .kindle-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}