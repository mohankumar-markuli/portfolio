import Head from 'next/head';
import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '@/lib/mdParser';

// Import CSS for code syntax highlighting in this page specifically
import 'highlight.js/styles/github-dark.css';

export default function Post({ postData }) {
  if (!postData) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Post not found</h2>
        <Link href="/blog" className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{postData.title} | Mohankumar MC</title>
        <meta name="description" content={postData.summary || `Read ${postData.title} by Mohankumar MC`} />
        
        {/* Open Graph / LinkedIn metadata */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Mohankumar MC Portfolio" />
      </Head>

      <article style={{ maxWidth: '780px', margin: '0 auto', width: '100%' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }} className="footer-social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Articles
          </Link>
        </div>

        {/* Post Header */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {postData.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>•</span>
            <time style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {postData.date}
            </time>
          </div>

          <h1 
            style={{ 
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', 
              fontWeight: 700, 
              lineHeight: 1.25, 
              color: '#ffffff',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}
          >
            {postData.title}
          </h1>

          {/* Tags */}
          {postData.tags && postData.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {postData.tags.map((tag) => (
                <span 
                  key={tag} 
                  style={{ 
                    fontSize: '0.75rem', 
                    backgroundColor: 'rgba(255,255,255,0.03)', 
                    color: 'var(--text-secondary)', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>

      <style jsx global>{`
        /* Rich Text styling inside markdown rendered HTML */
        .blog-post-content {
          font-size: 1.05rem;
          line-height: 1.85;
          color: var(--text-secondary);
        }
        .blog-post-content h1,
        .blog-post-content h2,
        .blog-post-content h3,
        .blog-post-content h4 {
          color: #ffffff;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .blog-post-content h1 { font-size: 2rem; }
        .blog-post-content h2 { font-size: 1.6rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; }
        .blog-post-content h3 { font-size: 1.3rem; }
        
        .blog-post-content p {
          margin-bottom: 1.5rem;
        }
        .blog-post-content ul,
        .blog-post-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-post-content li {
          margin-bottom: 0.5rem;
        }
        .blog-post-content strong {
          color: #ffffff;
        }
        .blog-post-content blockquote {
          border-left: 4px solid var(--accent-cyan);
          background: rgba(6, 182, 212, 0.03);
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: var(--text-primary);
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false, // Return 404 for non-existent posts
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}
