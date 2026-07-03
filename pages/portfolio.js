import Head from 'next/head';
import ProjectCard from '@/components/ProjectCard';

export default function Portfolio() {
  const projects = [
    {
      title: 'AI Chatbot Hub',
      description: 'An AI-powered chatbot assistant utilizing Retrieval-Augmented Generation (RAG) to answer customer support queries. Features semantic search using vector databases and seamless Node.js integration.',
      tags: ['Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Vector Search'],
      githubUrl: 'https://github.com/mohankumar-markuli/ai-chatbot-hub',
      demoUrl: 'https://github.com/mohankumar-markuli/ai-chatbot-hub', // Fallback or demo link
      reportUrl: '/reports/ai-chatbot-hub/report.pdf'
    },
    {
      title: 'Business Analytics Sales Forecaster',
      description: 'A predictive forecasting model designed as part of the MSc Business Analytics coursework at the University of Liverpool. Leverages Scikit-Learn to perform time-series analysis on regional sales datasets.',
      tags: ['Python', 'Scikit-learn', 'Anaconda', 'Pandas', 'Matplotlib'],
      githubUrl: 'https://github.com/mohankumar-markuli/sales-forecaster',
      demoUrl: null,
      reportUrl: '/reports/sales-forecaster/report.pdf'
    },
    {
      title: 'Smart Home IoT Gateway',
      description: 'An IoT gateway deployed on Raspberry Pi using C and shell scripting. Monitors environment telemetry (temperature, humidity) and exposes a lightweight API to control relays.',
      tags: ['C', 'Raspberry Pi', 'Linux', 'Bash', 'IoT'],
      githubUrl: 'https://github.com/mohankumar-markuli/iot-home-gateway',
      demoUrl: null,
      reportUrl: '/reports/iot-home-gateway/report.pdf'
    },
    {
      title: 'Scalable Microservices E-Commerce API',
      description: 'A production-grade backend service built with TypeScript and PostgreSQL, deployed on Microsoft Azure using Docker containers. Implements robust rate-limiting and authorization policies.',
      tags: ['TypeScript', 'Express', 'PostgreSQL', 'Docker', 'Azure'],
      githubUrl: 'https://github.com/mohankumar-markuli/ecommerce-api',
      demoUrl: 'https://github.com/mohankumar-markuli/ecommerce-api',
      reportUrl: '/reports/ecommerce-api/report.pdf'
    }
  ];

  return (
    <>
      <Head>
        <title>Portfolio | Mohankumar MC</title>
        <meta name="description" content="Explore software engineering projects, backend applications, and AI integrations built by Mohankumar MC." />
      </Head>

      <section style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Project <span className="gradient-text">Portfolio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A curated list of my backend architectures, analytics tools, and IoT integrations. Detailed technical reports can be downloaded directly from each project.
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              githubUrl={project.githubUrl}
              demoUrl={project.demoUrl}
              reportUrl={project.reportUrl}
            />
          ))}
        </div>
      </section>
    </>
  );
}
