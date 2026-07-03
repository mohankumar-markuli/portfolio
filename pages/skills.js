import Head from 'next/head';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      color: 'var(--accent-cyan)',
      skills: [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'TypeScript', level: 'Advanced' },
        { name: 'Python', level: 'Expert' },
        { name: 'C', level: 'Intermediate' },
        { name: 'Bash & Shell', level: 'Advanced' }
      ]
    },
    {
      title: 'Backend Engineering',
      color: 'var(--accent-green)',
      skills: [
        { name: 'Node.js', level: 'Expert' },
        { name: 'Express.js', level: 'Expert' },
        { name: 'REST APIs', level: 'Expert' },
        { name: 'AI Chatbots (RAG)', level: 'Advanced' }
      ]
    },
    {
      title: 'Databases & Storage',
      color: 'var(--accent-cyan)',
      skills: [
        { name: 'MongoDB', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Vector DBs', level: 'Intermediate' }
      ]
    },
    {
      title: 'Analytics & Machine Learning',
      color: 'var(--accent-green)',
      skills: [
        { name: 'Scikit-learn', level: 'Advanced' },
        { name: 'Pandas & Numpy', level: 'Advanced' },
        { name: 'Data Visualization', level: 'Expert' },
        { name: 'Business Analytics', level: 'Expert' }
      ]
    },
    {
      title: 'Infrastructure & DevOps',
      color: 'var(--accent-cyan)',
      skills: [
        { name: 'Azure', level: 'Intermediate' },
        { name: 'Linux Servers', level: 'Advanced' },
        { name: 'Raspberry Pi / IoT', level: 'Intermediate' },
        { name: 'Git & GitHub Actions', level: 'Advanced' }
      ]
    },
    {
      title: 'Frontend & Tooling',
      color: 'var(--accent-green)',
      skills: [
        { name: 'HTML5 & CSS3', level: 'Expert' },
        { name: 'Bootstrap', level: 'Expert' },
        { name: 'VS Code & Postman', level: 'Expert' },
        { name: 'npm', level: 'Expert' }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Skills &amp; Technology Stack | Mohankumar MC</title>
        <meta name="description" content="View the comprehensive technical skills and stack of Mohankumar MC including backend engineering, AI, and business analytics." />
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
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ color: category.color, fontSize: '0.8rem', fontWeight: 600 }}>{skill.level}</span>
                    </div>
                    {/* Visual Meter */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
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
