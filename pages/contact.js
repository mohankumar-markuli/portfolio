import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Contact() {
  const router = useRouter();
  const [isHireLoading, setIsHireLoading] = useState(true);
  const [isFreelanceLoading, setIsFreelanceLoading] = useState(true);

  // Form URLs
  const hireFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdJt87w9Gz8dF5Mh-V8U53v27d4V_mockContactId/viewform?embedded=true";
  const externalHireFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdJt87w9Gz8dF5Mh-V8U53v27d4V_mockContactId/viewform";

  const freelanceFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScP-p1z7V1sH_mockFreelanceId/viewform?embedded=true";
  const externalFreelanceFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScP-p1z7V1sH_mockFreelanceId/viewform";

  // Smooth scroll to anchors on hash mount
  useEffect(() => {
    if (router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Work With Me | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="Hire Mohankumar Markuli Chandrayigowda for full-time career roles or submit a freelance project proposal." />
      </Head>

      <section style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Work <span className="gradient-text">With Me</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Whether you are looking to hire me for a full-time engineering role or want to collaborate on a freelance project, you can find both intake channels below.
          </p>
        </div>

        {/* Side-by-side or stacked container */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '2rem', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            width: '100%'
          }}
          className="forms-wrapper"
        >
          {/* Hire Me (Careers) Column */}
          <div 
            id="hiring"
            style={{ 
              flex: '1 1 350px', 
              maxWidth: '550px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
                Hiring (Full-Time / Careers)
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                For open roles, recruitment, technical contracting, or direct corporate inquiries.
              </p>
            </div>

            <div className="form-iframe-container">
              {isHireLoading && (
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
                        borderTop: '3px solid var(--accent-cyan)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                      }}
                    ></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading Hiring Form...</p>
                  </div>
                </div>
              )}

              <iframe 
                src={hireFormUrl}
                className="form-iframe"
                onLoad={() => setIsHireLoading(false)}
                title="Hiring Form"
              >
                Loading…
              </iframe>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <p>
                Having trouble?{' '}
                <a 
                  href={externalHireFormUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}
                >
                  Open hiring form in new tab
                </a>
              </p>
            </div>
          </div>

          {/* Freelance Request Column */}
          <div 
            id="freelance"
            style={{ 
              flex: '1 1 350px', 
              maxWidth: '550px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-green)', marginBottom: '0.5rem' }}>
                Freelance Projects
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                For custom API builds, AI chatbot setups, data analytics projects, or consulting briefs.
              </p>
            </div>

            <div className="form-iframe-container">
              {isFreelanceLoading && (
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
                        border: '3px solid rgba(255,204,0,0.1)',
                        borderTop: '3px solid var(--accent-green)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                      }}
                    ></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading Freelance Form...</p>
                  </div>
                </div>
              )}

              <iframe 
                src={freelanceFormUrl}
                className="form-iframe"
                onLoad={() => setIsFreelanceLoading(false)}
                title="Freelance Form"
              >
                Loading…
              </iframe>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <p>
                Having trouble?{' '}
                <a 
                  href={externalFreelanceFormUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--accent-green)', textDecoration: 'underline' }}
                >
                  Open freelance form in new tab
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Direct Email outreach fallback */}
        <div style={{ textAlign: 'center', marginTop: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Prefer direct messaging? Send me a mail at:
          </p>
          <a href="mailto:mohankumarmarkuli@gmail.com" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            mohankumarmarkuli@gmail.com
          </a>
        </div>

        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .form-iframe-container {
            position: relative;
            width: 100%;
            height: 700px;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            background-color: var(--bg-secondary);
          }
          
          .form-iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
          
          /* Custom layout overrides for combined forms */
          @media (max-width: 900px) {
            .form-iframe-container {
              height: 600px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
