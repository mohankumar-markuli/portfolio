import Head from 'next/head';
import { useState } from 'react';

export default function Feedback() {
  const [isLoading, setIsLoading] = useState(true);
  // Placeholder Google Form ID - to be replaced by the owner.
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf4V8-j2B_3tX3yZ7e-mockFeedbackId/viewform?embedded=true";
  const externalFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf4V8-j2B_3tX3yZ7e-mockFeedbackId/viewform";

  return (
    <>
      <Head>
        <title>General Feedback | Mohankumar MC</title>
        <meta name="description" content="Provide feedback on the website, projects, or articles published by Mohankumar MC." />
      </Head>

      <section style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Website <span className="gradient-text">Feedback</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>
            Your opinions are highly valued. Please take a moment to share your experience, report bugs, or request features.
          </p>
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
                    border: '3px solid rgba(16,185,129,0.1)',
                    borderTop: '3px solid var(--accent-green)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                  }}
                ></div>
                <p style={{ color: 'var(--text-secondary)' }}>Loading Feedback Form...</p>
              </div>
            </div>
          )}

          <iframe 
            src={formUrl}
            className="form-iframe"
            onLoad={() => setIsLoading(false)}
            title="Feedback Form"
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
              style={{ color: 'var(--accent-green)', textDecoration: 'underline' }}
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
