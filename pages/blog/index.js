import { useState } from 'react';
import Head from 'next/head';
import BlogCard from '@/components/BlogCard';
import { getSortedPostsData } from '@/lib/mdParser';

export default function BlogIndex({ allPostsData }) {
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract all unique tags
  const allTags = ['All', ...new Set(allPostsData.flatMap(post => post.tags || []))];

  // Filter posts based on tag
  const filteredPosts = selectedTag === 'All'
    ? allPostsData
    : allPostsData.filter(post => post.tags && post.tags.includes(selectedTag));

  return (
    <>
      <Head>
        <title>Tech Blog | Mohankumar MC</title>
        <meta name="description" content="Read articles on artificial intelligence, chatbot engineering, software systems, and data analytics by Mohankumar MC." />
      </Head>

      <section style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Technical <span className="gradient-text">Blog</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Sharing engineering experiences, tutorials, and insights about full-stack architectures, vector database search, and machine learning models.
          </p>
        </div>

        {/* Tag Filters */}
        {allTags.length > 1 && (
          <div 
            style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              marginBottom: '3rem'
            }}
          >
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '0.3rem 0.8rem',
                  fontSize: '0.8rem',
                  borderRadius: '16px',
                  backgroundColor: selectedTag === tag ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.02)',
                  color: selectedTag === tag ? '#000' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: selectedTag === tag ? 'var(--accent-cyan)' : 'var(--border-color)',
                  cursor: 'pointer',
                  fontWeight: selectedTag === tag ? 600 : 400,
                  transition: 'var(--transition-fast)'
                }}
              >
                {tag === 'All' ? 'All Tags' : `#${tag}`}
              </button>
            ))}
          </div>
        )}

        {/* Blog Post Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.75rem' 
          }}
        >
          {filteredPosts.map((post) => (
            <BlogCard 
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              category={post.category}
              tags={post.tags}
              summary={post.summary}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
            No posts found under this tag.
          </p>
        )}
      </section>
    </>
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
