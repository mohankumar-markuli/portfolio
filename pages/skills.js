import Head from 'next/head';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      color: 'var(--accent-cyan)',
      skills: [
        { name: 'JavaScript', level: 'Expert', iconSlug: 'js' },
        { name: 'TypeScript', level: 'Advanced', iconSlug: 'ts' },
        { name: 'Python', level: 'Expert', iconSlug: 'py' },
        { name: 'C', level: 'Intermediate', iconSlug: 'c' },
        { name: 'Bash & Shell', level: 'Advanced', iconSlug: 'bash' }
      ]
    },
    {
      title: 'Backend Engineering',
      color: 'var(--accent-green)',
      skills: [
        { name: 'Node.js', level: 'Expert', iconSlug: 'nodejs' },
        { name: 'Express.js', level: 'Expert', iconSlug: 'express' },
        { name: 'REST APIs', level: 'Expert' }, // Uses custom API icon
        { name: 'AI Chatbots (RAG)', level: 'Advanced' }, // Uses custom AI icon
        { name: 'LangChain', level: 'Advanced' }
      ]
    },
    {
      title: 'Databases & Storage',
      color: 'var(--accent-cyan)',
      skills: [
        { name: 'MongoDB', level: 'Advanced', iconSlug: 'mongodb' },
        { name: 'PostgreSQL', level: 'Advanced', iconSlug: 'postgres' },
        { name: 'Vector DBs', level: 'Intermediate' } // Uses custom DB icon
      ]
    },
    {
      title: 'Analytics & Machine Learning',
      color: 'var(--accent-green)',
      skills: [
        { name: 'Scikit-learn', level: 'Advanced', iconSlug: 'sklearn' },
        { name: 'Pandas & Numpy', level: 'Advanced' },
        { name: 'Data Visualization', level: 'Expert' }, // Custom chart icon
        { name: 'Business Analytics', level: 'Expert' } // Custom telemetry icon
      ]
    },
    {
      title: 'Infrastructure & DevOps',
      color: 'var(--accent-cyan)',
      skills: [
        { name: 'Azure', level: 'Intermediate', iconSlug: 'azure' },
        { name: 'Linux Servers', level: 'Advanced', iconSlug: 'linux' },
        { name: 'Raspberry Pi / IoT', level: 'Intermediate', iconSlug: 'raspberrypi' },
        { name: 'Git & GitHub Actions', level: 'Advanced', iconSlug: 'githubactions' }
      ]
    },
    {
      title: 'Frontend & Tooling',
      color: 'var(--accent-green)',
      skills: [
        { name: 'HTML5 & CSS3', level: 'Expert', iconSlugs: ['html', 'css'] },
        { name: 'Bootstrap', level: 'Expert', iconSlug: 'bootstrap' },
        { name: 'VS Code & Postman', level: 'Expert', iconSlugs: ['vscode', 'postman'] },
        { name: 'npm', level: 'Expert', iconSlug: 'npm' }
      ]
    }
  ];

  const renderSkillIcon = (skill, color) => {
    if (skill.iconSlug) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={`https://skillicons.dev/icons?i=${skill.iconSlug}`} 
          alt={skill.name} 
          style={{ width: '20px', height: '20px', borderRadius: '4px', display: 'block' }} 
        />
      );
    }
    
    if (skill.iconSlugs) {
      return (
        <div style={{ display: 'flex', gap: '3px' }}>
          {skill.iconSlugs.map((slug, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              key={idx}
              src={`https://skillicons.dev/icons?i=${slug}`} 
              alt={slug} 
              style={{ width: '18px', height: '18px', borderRadius: '3px', display: 'block' }} 
            />
          ))}
        </div>
      );
    }

    // Dynamic Vector SVG Fallbacks
    if (skill.name.includes('LangChain')) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color, display: 'block' }}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    }
    if (skill.name.includes('AI') || skill.name.includes('Chatbots')) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color, display: 'block' }}>
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      );
    }
    if (skill.name.includes('API')) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color, display: 'block' }}>
          <rect width="8" height="8" x="3" y="3" rx="2" />
          <rect width="8" height="8" x="13" y="3" rx="2" />
          <rect width="8" height="8" x="3" y="13" rx="2" />
          <rect width="8" height="8" x="13" y="13" rx="2" />
        </svg>
      );
    }
    if (skill.name.includes('Vector DB')) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color, display: 'block' }}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    }
    // Analytics/Data Vis fallback
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color, display: 'block' }}>
        <line x1="18" x2="18" y1="20" y2="10" />
        <line x1="12" x2="12" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="14" />
      </svg>
    );
  };

  return (
    <>
      <Head>
        <title>Skills &amp; Technology Stack | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="View the comprehensive technical skills and stack of Mohankumar Markuli Chandrayigowda including backend engineering, AI, and business analytics." />
      </Head>

      <section style={{ maxWidth: '950px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Skills &amp; <span className="gradient-text">Competencies</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A structured view of my engineering stack and core technical focus, showing proficiency across multiple layers of development.
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}
        >
          {skillCategories.map((category, catIndex) => (
            <div 
              key={catIndex} 
              className="card"
              style={{
                borderTop: `3px solid ${category.color}`,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>
                {category.title}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flexGrow: 1 }}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    {/* Header: Logo, Name, and Level on top of bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {renderSkillIcon(skill, category.color)}
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{skill.name}</span>
                      </div>
                      <span style={{ color: category.color, fontSize: '0.8rem', fontWeight: 600 }}>{skill.level}</span>
                    </div>
                    {/* Visual Meter */}
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          background: category.color, 
                          width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '60%' : '40%',
                          borderRadius: '2px'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
