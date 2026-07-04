import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let stars = [];
    const numStars = 180; // Increased star density
    const mouse = { x: null, y: null };
    
    // Moon orbit states
    let moonAngle = 0;
    const moonSpeed = 0.004;
    const moonSize = 16;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize static star distribution
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 3 + 1.2,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.01
        });
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    const drawStar = (ctx, x, y, size, opacity, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.25, -size * 0.25);
      ctx.lineTo(size, 0);
      ctx.lineTo(size * 0.25, size * 0.25);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.25, size * 0.25);
      ctx.lineTo(-size, 0);
      ctx.lineTo(-size * 0.25, -size * 0.25);
      ctx.closePath();
      
      // Twinkling white lighting effect
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.restore();
    };

    const drawMoon = (ctx, x, y, size) => {
      ctx.save();
      // Glow effect matching yellow accent
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'var(--accent-green)';
      
      // Draw bright yellow base circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = 'var(--accent-green)';
      ctx.fill();
      
      // Draw overlapping black circle to clip into a crescent
      ctx.shadowBlur = 0; // Disable glow on the shade clip
      ctx.beginPath();
      ctx.arc(x + size * 0.45, y - size * 0.15, size * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      
      ctx.restore();
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Repulsion physics from cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 240;
          
          if (distance < repelRadius) {
            // Eased repelling force: stronger push when closer
            const force = (repelRadius - distance) / repelRadius;
            star.x -= (dx / distance) * force * 5.0;
            star.y -= (dy / distance) * force * 5.0;
          } else {
            // Drift back to baseline
            const dxBase = star.baseX - star.x;
            const dyBase = star.baseY - star.y;
            star.x += dxBase * 0.035;
            star.y += dyBase * 0.035;
          }
        } else {
          // Float back to baseline when cursor leaves
          const dxBase = star.baseX - star.x;
          const dyBase = star.baseY - star.y;
          star.x += dxBase * 0.035;
          star.y += dyBase * 0.035;
        }
        
        // Gentle baseline drifting
        star.baseX += (Math.random() - 0.5) * 0.15;
        star.baseY += (Math.random() - 0.5) * 0.15;
        
        // Keep baseline bound
        if (star.baseX < 0) star.baseX = canvas.width;
        if (star.baseX > canvas.width) star.baseX = 0;
        if (star.baseY < 0) star.baseY = canvas.height;
        if (star.baseY > canvas.height) star.baseY = 0;
        
        // Twinkling cycle
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.twinkleDir = -1;
        } else if (star.opacity <= 0.1) {
          star.opacity = 0.1;
          star.twinkleDir = 1;
        }
        
        star.rotation += star.rotationSpeed;
        
        drawStar(ctx, star.x, star.y, star.size, star.opacity, star.rotation);
      });

      // Update and draw revolving moon
      moonAngle += moonSpeed;
      // Orbit radii proportional to screen sizing
      const orbitX = Math.max(canvas.width * 0.22, 190);
      const orbitY = Math.max(canvas.height * 0.08, 60);
      
      const moonX = canvas.width / 2 + Math.cos(moonAngle) * orbitX;
      // Elliptical height multiplier creating a 3D orbit slant
      const moonY = canvas.height / 2 + Math.sin(moonAngle) * orbitY;
      
      drawMoon(ctx, moonX, moonY, moonSize);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Mohankumar Markuli Chandrayigowda | Personal Portfolio & Website</title>
        <meta name="description" content="Personal portfolio of Mohankumar Markuli Chandrayigowda - Backend Developer and AI Engineer specializing in scalable web applications and chatbot solutions." />
        <meta property="og:title" content="Mohankumar Markuli Chandrayigowda | Portfolio" />
        <meta property="og:description" content="Backend Developer and AI Engineer portfolio displaying projects, technical blog, photography gallery, and freelance intake." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Landing Hero Section */}
      <section 
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
          position: 'relative',
          padding: '2rem',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Interactive twinkling star canvas overlay */}
        <canvas 
          ref={canvasRef} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        <div style={{ maxWidth: '800px', zIndex: 2, position: 'relative' }}>
          <h1 
            className="gradient-text"
            style={{ 
              fontSize: 'clamp(2.25rem, 6.5vw, 4rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              lineHeight: 1.1,
              display: 'inline-block'
            }}
          >
            Mohankumar Markuli Chandrayigowda
          </h1>
          <p 
            style={{ 
              fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              fontWeight: 400
            }}
          >
            Software Engineer &amp; AI Developer building analytics-oriented backend systems, intelligent RAG pipelines, and conversational chatbot solutions.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
            <a 
              href="https://github.com/mohankumar-markuli" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--text-secondary)' }}
              className="footer-social-link"
              aria-label="GitHub"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/mohankumar-mc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--text-secondary)' }}
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a 
              href="https://instagram.com/rvishal.mohan" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--text-secondary)' }}
              className="footer-social-link"
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.snapchat.com/add/mohankumar.mc" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--text-secondary)' }}
              className="footer-social-link"
              aria-label="Snapchat"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a5 5 0 0 1 5 7v3c0 .8.2 1.4.8 2 .6.6.2 1.8-.8 1.8a2 2 0 0 0-2 2v1c0 1 1 2 2 2h.5c.8 0 1.5.7 1.5 1.5a1 1 0 0 1-1 1c-2 0-3-1.5-4.5-2.5a3 3 0 0 0-3 0c-1.5 1-2.5 2.5-4.5 2.5a1 1 0 0 1-1-1c0-.8.7-1.5 1.5-1.5h.5c1 0 2-1 2-2v-1a2 2 0 0 0-2-2c-1 0-1.4-1.2-.8-1.8.6-.6.8-1.2.8-2V7a5 5 0 0 1 5-5z" />
              </svg>
            </a>
            <a 
              href="mailto:mohankumarmarkuli@gmail.com" 
              style={{ color: 'var(--text-secondary)' }}
              className="footer-social-link"
              aria-label="Email"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}
        >
          <span>Scroll to explore</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              animation: 'bounce 2s infinite'
            }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
        
        <style jsx global>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-4px); }
          }
        `}</style>
      </section>

      {/* Main Overview Section (reveals header on scroll past first fold) */}
      <section 
        style={{
          padding: '6rem 1.5rem',
          backgroundColor: 'var(--bg-primary)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h2 
            style={{ 
              fontSize: '2.25rem', 
              fontWeight: 700, 
              marginBottom: '2rem', 
              textAlign: 'center'
            }}
          >
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              I am a software engineer based in India, specializing in building responsive web applications and AI-powered chatbot systems. 
              I hold an <strong>MSc in Business Analytics</strong> from the University of Liverpool, which equips me with a unique 
              analytical approach to backend engineering and scalable system design.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              I focus on creating high-performance architectures, developing API integrations, and continuous learning. 
              This portal acts as a central repository for my work, thoughts, and creative visual photography.
            </p>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', textAlign: 'center' }}>
            Explore my work
          </h3>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1.5rem',
              width: '100%',
              marginBottom: '2rem'
            }}
          >
            <Link href="/skills" className="card" style={{ textAlign: 'center', display: 'block' }}>
              <h4 style={{ color: 'var(--accent-green)', marginBottom: '0.5rem', fontWeight: 600 }}>Skills</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Browse stack by category</p>
            </Link>

            <Link href="/experience" className="card" style={{ textAlign: 'center', display: 'block' }}>
              <h4 style={{ color: 'var(--accent-green)', marginBottom: '0.5rem', fontWeight: 600 }}>Experience</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>View professional timeline &amp; career</p>
            </Link>
            
            <Link href="/blog" className="card" style={{ textAlign: 'center', display: 'block' }}>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem', fontWeight: 600 }}>Blogs</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Read articles on AI ethics, big data, EV tech, and database systems</p>
            </Link>

            <Link href="/projects" className="card" style={{ textAlign: 'center', display: 'block' }}>
              <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>Projects</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>View projects and tech reports</p>
            </Link>

            <Link href="/gallery" className="card" style={{ textAlign: 'center', display: 'block' }}>
              <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>Gallery</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Browse university, work, and network photos</p>
            </Link>

            <Link href="/feedback" className="card" style={{ textAlign: 'center', display: 'block' }}>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem', fontWeight: 600 }}>Feedback</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Read or write feedback and references</p>
            </Link>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Get in Touch / Hire Me
            </Link>
            <a 
              href={`${process.env.NODE_ENV === 'production' ? '/mohankumar-markuli' : ''}/resume.pdf`} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary" 
              style={{ 
                padding: '0.75rem 2rem', 
                fontSize: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                border: '1px solid var(--accent-green)', 
                color: 'var(--accent-green)', 
                borderRadius: '4px', 
                textDecoration: 'none', 
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 255, 128, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View Resume
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
