export default function ProjectCard({ title, description, tags = [], githubUrl, demoUrl, reportUrl }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 600 }} className="gradient-text">
        {title}
      </h3>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.25rem' }}>
        {description}
      </p>

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {tags.map((tag) => (
            <span 
              key={tag} 
              style={{ 
                fontSize: '0.75rem', 
                backgroundColor: 'rgba(255,255,255,0.04)', 
                color: 'var(--accent-cyan)', 
                padding: '0.25rem 0.6rem', 
                borderRadius: '4px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                fontWeight: 500
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary" 
            style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', flexGrow: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            </svg>
            GitHub
          </a>
        )}
        
        {demoUrl && (
          <a 
            href={demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ padding: '0.5rem 0.8rem', fontSize: '0.85rem', flexGrow: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Demo
          </a>
        )}

        {reportUrl && (
          <a 
            href={reportUrl} 
            download
            className="btn btn-secondary" 
            style={{ 
              padding: '0.5rem 0.8rem', 
              fontSize: '0.85rem', 
              flexGrow: 1, 
              width: '100%',
              textAlign: 'center', 
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: 'var(--accent-green)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Report
          </a>
        )}
      </div>
    </div>
  );
}
