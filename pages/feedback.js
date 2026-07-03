import Head from 'next/head';
import { useState } from 'react';

const WHATSAPP_NUMBER = "919187338626";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    category: 'Tech Blog & Content',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate submission loading
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Format text message for WhatsApp
      const stars = "⭐".repeat(formData.rating);
      const formattedMessage = `*New Feedback via Portfolio*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Rating:* ${stars} (${formData.rating}/5)\n` +
        `*Category:* ${formData.category}\n\n` +
        `*Comments:* ${formData.comments}`;
      
      const encodedText = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Feedback | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="Provide feedback on the website, projects, or articles published by Mohankumar Markuli Chandrayigowda." />
      </Head>

      <section style={{ maxWidth: '650px', margin: '0 auto', width: '100%', padding: '2rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.25 }}>
            Your insights are <span className="gradient-text">highly valued</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Your insights are highly valued. Take a moment to rate your experience, suggest features, or report bugs.
          </p>
        </div>

        {isSubmitted ? (
          <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💬</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
              Feedback Prepared!
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              A new browser tab should have opened to send your feedback directly to my WhatsApp inbox. If it did not, please click the button below to initiate the chat manually.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const stars = "⭐".repeat(formData.rating);
                  const formattedMessage = `*New Feedback via Portfolio*\n\n` +
                    `*Name:* ${formData.name}\n` +
                    `*Rating:* ${stars} (${formData.rating}/5)\n` +
                    `*Category:* ${formData.category}\n\n` +
                    `*Comments:* ${formData.comments}`;
                  const encodedText = encodeURIComponent(formattedMessage);
                  window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`, '_blank', 'noopener,noreferrer');
                }}
              >
                Open WhatsApp Chat
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', rating: 5, category: 'Website Design', comments: '' });
                }}
              >
                Submit More Feedback
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="card animate-fade-in" 
            style={{ 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Your Name / Organization
              </label>
              <input 
                type="text" 
                id="name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'var(--transition-fast)'
                }}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Rate Your Experience
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', fontSize: '1.75rem', marginTop: '0.2rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: 'pointer',
                      color: star <= (hoverRating || formData.rating) ? 'var(--accent-cyan)' : 'var(--border-color)',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setFormData({ ...formData, rating: star })}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="category" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Feedback Category
              </label>
              <select 
                id="category" 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                className="form-input"
              >
                <option value="Tech Blog & Content">Tech Blog & Content</option>
                <option value="New Feature Request">New Feature Request</option>
                <option value="Interview Feedback">Interview Feedback</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="comments" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Comments / Feedback Details
              </label>
              <textarea 
                id="comments" 
                required 
                rows="6"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Write your suggestions, review comments, or glitch details..."
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'var(--transition-fast)'
                }}
                className="form-input"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
              style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', marginTop: '0.5rem', cursor: 'pointer' }}
            >
              {isLoading ? 'Processing...' : 'Submit Feedback'}
            </button>
          </form>
        )}

        {/* Direct Email outreach fallback */}
        <div style={{ textAlign: 'center', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Prefer email? Write to:
          </p>
          <a href="mailto:mohankumarmarkuli@gmail.com" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            mohankumarmarkuli@gmail.com
          </a>
        </div>

        <style jsx global>{`
          .form-input:focus {
            border-color: var(--accent-cyan) !important;
            box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.15) !important;
          }
          
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </>
  );
}
