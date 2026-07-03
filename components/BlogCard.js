import Link from 'next/link';

export default function BlogCard({ slug, title, date, category, tags = [], summary }) {
  return (
    <Link href={`/blog/${slug}`} style={{ display: 'block' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '1rem' }}>
          <span 
            style={{ 
              fontSize: '0.75rem', 
              color: 'var(--accent-green)', 
              fontWeight: 600, 
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {date}
          </span>
        </div>

        <h3 
          style={{ 
            fontSize: '1.25rem', 
            marginBottom: '0.75rem', 
            fontWeight: 600,
            transition: 'var(--transition-fast)'
          }}
          className="blog-card-title"
        >
          {title}
        </h3>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.25rem' }}>
          {summary}
        </p>

        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
            {tags.map((tag) => (
              <span 
                key={tag} 
                style={{ 
                  fontSize: '0.7rem', 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  color: 'var(--text-secondary)', 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: '4px',
                  border: '1px solid var(--border-color)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
