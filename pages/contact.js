import Head from 'next/head';
import { useState } from 'react';

// REPLACE THIS WITH YOUR WHATSAPP PHONE NUMBER (including country code, e.g., "919187338626")
const WHATSAPP_NUMBER = "919187338626";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Hiring',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate submission loading
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Format text message for WhatsApp
      const formattedMessage = `*New Inquiry via Portfolio*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Purpose:* ${formData.purpose}\n\n` +
        `*Message:* ${formData.message}`;
      
      const encodedText = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Work With Me | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="Get in touch with Mohankumar Markuli Chandrayigowda for full-time engineering roles, freelance project proposals, or collaborative opportunities." />
      </Head>

      <section style={{ maxWidth: '650px', margin: '0 auto', width: '100%', padding: '2rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Work <span className="gradient-text">With Me</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Have a project in mind, a job opportunity, or just want to collaborate? Use the unified form below to get in touch.
          </p>
        </div>

        {isSubmitted ? (
          <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💬</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
              Inquiry Prepared!
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              A new browser tab should have opened to send the message directly to my WhatsApp inbox. If it did not, please click the button below to initiate the chat manually.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const formattedMessage = `*New Inquiry via Portfolio*\n\n` +
                    `*Name:* ${formData.name}\n` +
                    `*Email:* ${formData.email}\n` +
                    `*Purpose:* ${formData.purpose}\n\n` +
                    `*Message:* ${formData.message}`;
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
                  setFormData({ name: '', email: '', purpose: 'Hiring', message: '' });
                }}
              >
                Send New Message
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
                Full Name
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
              <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
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
              <label htmlFor="purpose" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Purpose of Reach Out
              </label>
              <select 
                id="purpose" 
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
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
                <option value="Hiring">Hiring / Career Opportunities</option>
                <option value="Freelance">Freelance Projects / Consulting</option>
                <option value="Collaboration">Collaboration / Open Source</option>
                <option value="General Inquiry">General Reach Out</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Message
              </label>
              <textarea 
                id="message" 
                required 
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, role details, or inquiry..."
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
              {isLoading ? 'Processing...' : 'Submit Inquiry'}
            </button>
          </form>
        )}

        {/* Direct Link Options */}
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
