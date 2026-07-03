import Head from 'next/head';

export default function Experience() {
  const jobExperience = [
    {
      company: 'ARC Hospitality Solutions Limited',
      location: 'Liverpool, United Kingdom',
      role: 'Business Analyst Consultant',
      period: 'Feb 2024 - Jan 2026',
      details: [
        'Developed Python-based data pipeline analyzing worker performance across 15+ hospitality and logistics roles, processing 500+ active freelance workers through exploratory data analysis and regression modeling to predict reliability metrics.',
        'Designed transparent per-shift compensation strategy system with base and holiday pay differentials, validated using Python data quality checks on existing schema, increasing freelancer platform adoption by 3x and reducing worker churn versus competing agencies pay rates.'
      ]
    },
    {
      company: 'Infosys Limited',
      location: 'Bengaluru, India',
      role: 'Systems Engineer',
      period: 'Dec 2020 - Jul 2022',
      details: [
        'Redesigned static web application to fully responsive design using Angular and Bootstrap MEAN stack product, expanding mobile accessibility for 500+ trainees during 3 month onboarding cycle for GenQ assessment platform.',
        'Analyzed learner performance data using pandas, and numPy across 23K to 27K daily active users, identifying top performers and reducing talent acquisition team screening time by 80% through automated candidate filtering for Springboard EdTech Product.',
        'Supported infrastructure for Zoe chatbot microservice integrated within Springboard, ensuring 0.999 uptime across enterprise services.',
        'Delivered 200+ plus training and sales sessions on AI, machine learning, big data, and Spark to senior executives, team leads and on-boarding engineers, accelerating team ramp-up.'
      ]
    },
    {
      company: 'Infosys Limited',
      location: 'Mysore, India',
      role: 'Software Engineering Internship – Spring Boot',
      period: 'Feb 2020 – Mar 2020',
      details: [
        'Built REST APIs in Java and Spring Boot handling 72+ product SKUs and orders, with MySQL queries optimized to sub-second retrieval times for Wintership ecommerce project.',
        'Structured layered architecture using controller-service-repository pattern, reducing code duplication by forty percent and enabling seamless API testing across 18 endpoints via Postman.'
      ]
    },
    {
      company: 'Adamos Technologies',
      location: 'Mysore, India',
      role: 'Internship – Web Technologies and IOT',
      period: 'Jul 2019 – Aug 2019',
      details: [
        'Completed hands-on web development and IoT training covering 8 embedded systems modules across Arduino and Raspberry Pi, mastering microcontroller programming through practical exercises that directly enabled capstone project delivery.',
        'Designed and built proof-of-concept advanced traffic management system using Raspberry Pi, IR sensors, and Python for a 3 way and 4 way junction model, dynamically adjusting traffic signal timing based on vehicle density detection with real-time data logging to Firebase cloud.'
      ]
    }
  ];

  const education = [
    {
      institution: 'University of Liverpool',
      location: 'Liverpool, United Kingdom',
      degree: 'Master of Science in Business Analytics and Big Data; CGPA: 6.7',
      period: 'Sep 2022 – Dec 2023'
    },
    {
      institution: 'Rajeev Institute of Technology',
      location: 'Hassan, India',
      degree: 'Bachelor of Engineering in Computer Science; CGPA: 7.41',
      period: 'Aug 2016 – Sep 2020'
    }
  ];

  return (
    <>
      <Head>
        <title>Experience &amp; Education | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="View the professional experience and educational background of Mohankumar Markuli Chandrayigowda." />
      </Head>

      <section style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Professional <span className="gradient-text">Journey</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A timeline of my systems engineering, analytics consulting, and computer science education.
          </p>
        </div>

        {/* Experience Timeline */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Work Experience
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-color)' }}>
            {jobExperience.map((job, index) => (
              <div key={index} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: 'calc(-1.5rem - 6px)', 
                    top: '6px', 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--accent-green)',
                    border: '2px solid var(--bg-primary)',
                    boxShadow: '0 0 8px var(--accent-green)'
                  }}
                ></div>
                
                <div className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--accent-green)' }}>
                        {job.role}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {job.company}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                        • {job.location}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600, backgroundColor: 'rgba(255, 204, 0, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255, 204, 0, 0.15)' }}>
                      {job.period}
                    </span>
                  </div>

                  <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {job.details.map((detail, dIndex) => (
                      <li key={dIndex} style={{ fontSize: '0.925rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Education
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-color)' }}>
            {education.map((edu, index) => (
              <div key={index} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: 'calc(-1.5rem - 6px)', 
                    top: '6px', 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--accent-cyan)',
                    border: '2px solid var(--bg-primary)',
                    boxShadow: '0 0 8px var(--accent-cyan)'
                  }}
                ></div>
                
                <div className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--accent-cyan)' }}>
                        {edu.institution}
                      </h3>
                      <p style={{ fontSize: '0.925rem', margin: '0.4rem 0 0', color: 'var(--text-primary)' }}>
                        {edu.degree}
                      </p>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {edu.location}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, backgroundColor: 'rgba(139, 92, 246, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                      {edu.period}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
