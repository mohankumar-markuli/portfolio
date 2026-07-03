import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isHome = router.pathname === '/';

  useEffect(() => {
    // If it's not the home page, the header should always be visible/scrolled style
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    // Reset scroll state on home page mount
    setIsScrolled(false);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger scroll check immediately in case page is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, router.pathname]);

  const navLinks = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Photography', path: '/photography' },
    { name: 'Skills', path: '/skills' },
    { name: 'Hire Me', path: '/contact' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Freelance', path: '/freelance' },
  ];

  // If we are on the landing page and not scrolled, do not show the navbar at all
  if (isHome && !isScrolled) {
    return null;
  }

  return (
    <header className="header-nav" style={{ opacity: isHome && !isScrolled ? 0 : 1, transition: 'opacity 0.5s ease, background-color 0.3s ease' }}>
      <div className="container nav-container">
        <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span className="gradient-text">Mohankumar MC</span>
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-nav-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Navigation links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => {
            const isActive = router.pathname === link.path || router.pathname.startsWith(`${link.path}/`);
            return (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
