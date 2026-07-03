import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  // Placeholder Google Form ID - to be replaced by the owner with their own form ID.
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdJt87w9Gz8dF5Mh-V8U53v27d4V_mockContactId/viewform?embedded=true";
  const externalFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdJt87w9Gz8dF5Mh-V8U53v27d4V_mockContactId/viewform";

  return (
    <>
      <Head>
        <title>Contact | Mohankumar MC</title>
        <meta name="description" content="Get in touch with Mohankumar MC for career opportunities, engineering collaborations, or consultations." />
      </Head>

      <section style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Contact <span className="gradient-text">Me</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>
            Have an open role, project discussion, or just want to say hi? Fill out the form below or reach out directly via email.
          </p>
        </div>

        {/* direct contact details */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <a href="mailto:mohankumarmarkuli@gmail.com" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            mohankumarmarkuli@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/mohankumar-mc/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn Profile
          </a>
        </div>

        <div className="form-iframe-container">
          {isLoading && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--bg-secondary)',
                zIndex: 5
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(6,182,212,0.1)',
                    borderTop: '3px solid var(--accent-cyan)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                  }}
                ></div>
                <p style={{ color: 'var(--text-secondary)' }}>Loading Contact Form...</p>
              </div>
            </div>
          )}

          <iframe 
            src={formUrl}
            className="form-iframe"
            onLoad={() => setIsLoading(false)}
            title="Contact Form"
          >
            Loading…
          </iframe>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <p>
            Having trouble viewing the form?{' '}
            <a 
              href={externalFormUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}
            >
              Click here to open it directly in a new tab
            </a>
          </p>
        </div>

        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </>
  );
}
