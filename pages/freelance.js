import Head from 'next/head';
import { useState } from 'react';

export default function Freelance() {
  const [isLoading, setIsLoading] = useState(true);
  // Placeholder Google Form ID - to be replaced by the owner.
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScP-p1z7V1sH_mockFreelanceId/viewform?embedded=true";
  const externalFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScP-p1z7V1sH_mockFreelanceId/viewform";

  return (
    <>
      <Head>
        <title>Freelance Request | Mohankumar MC</title>
        <meta name="description" content="Request freelance development or consultation services from software engineer Mohankumar MC." />
      </Head>

      <section style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Freelance <span className="gradient-text">Intake</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '550px', margin: '0 auto' }}>
            Looking to build a custom API, integrate AI chatbot models, or analyze your business operations data? Outline your project requirements below.
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
                    border: '3px solid rgba(139,92,246,0.1)',
                    borderTop: '3px solid var(--accent-purple)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                  }}
                ></div>
                <p style={{ color: 'var(--text-secondary)' }}>Loading Intake Form...</p>
              </div>
            </div>
          )}

          <iframe 
            src={formUrl}
            className="form-iframe"
            onLoad={() => setIsLoading(false)}
            title="Freelance Intake Form"
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
              style={{ color: 'var(--accent-purple)', textDecoration: 'underline' }}
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
