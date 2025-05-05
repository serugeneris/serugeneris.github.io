// pages/posts/[id].js
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import Head from 'next/head';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description || "Contrasentido es un blog de temas variados."} />
        <meta property="og:image" content={postData.image || "https://contrasentido.ar/images/contrasentido.png"} />
        <meta property="og:url" content={`https://contrasentido.ar/posts/${postData.id}`} />
      </Head>
      
      <article className="post">
        <header className="post-header">
          <h1 className="post-title">{postData.title}</h1>
          <div className="post-date">{postData.date}</div>
        </header>
        
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
      
      <style jsx>{`
        .post {
          max-width: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .post-header {
          margin-bottom: 2.5rem;
          text-align: center;
          width: 100%;
        }
        
        .post-title {
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .post-date {
          font-style: italic;
          color: #666;
        }
        
        .post-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .post-content :global(h2),
        .post-content :global(h3),
        .post-content :global(h4) {
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-align: center;
          width: 100%;
        }
        
        .post-content :global(p) {
          margin-bottom: 1.5rem;
          text-align: center;
          width: 100%;
        }
        
        .post-content :global(ul),
        .post-content :global(ol) {
          margin-bottom: 1.5rem;
          width: 80%;
        }
        
        .post-content :global(li) {
          margin-bottom: 0.5rem;
        }
        
        .post-content :global(blockquote) {
          border-left: 3px solid #666;
          padding-left: 1rem;
          font-style: italic;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 1.5rem;
        }
        
        .post-content :global(img) {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto 1.5rem;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}