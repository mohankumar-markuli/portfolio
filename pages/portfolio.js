import Head from 'next/head';
import ProjectCard from '@/components/ProjectCard';

export default function Portfolio() {
  const projects = [
    {
      title: 'GenAI & AgenticAI (RAG Pipeline)',
      description: 'Python and GenAI project focusing on building a Retrieval-Augmented Generation (RAG) Pipeline.',
      tags: ['Python', 'LangChain', 'OpenAI API', 'Vector Store'],
      githubUrl: 'https://github.com/mohankumar-markuli/GenAI-AgenticAI/tree/main/RAG'
    },
    {
      title: 'Virtual Event Management Platform',
      description: 'A scalable backend application for managing virtual events with secure authentication, role-based access control, event registrations, email notifications, and complete automated testing.',
      tags: ['Node.js', 'Express', 'Authentication', 'RBAC', 'Testing'],
      githubUrl: 'https://github.com/mohankumar-markuli/Virtual-Event-Management-Platform'
    },
    {
      title: 'FinEdge',
      description: 'A backend API for managing personal finances including authentication, transactions, filtering, and analytics.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Aggregation Pipelines'],
      githubUrl: 'https://github.com/mohankumar-markuli/FinEdge'
    },
    {
      title: 'devTinder Backend',
      description: 'Backend service for a developer matchmaking platform providing authentication, profile management, and a connection request system supporting interested/ignore interactions.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Relation States'],
      githubUrl: 'https://github.com/mohankumar-markuli/devTinder-Backend'
    },
    {
      title: 'devTinder Web',
      description: 'Frontend web application for DevTinder built using React, Vite, Tailwind CSS, Daisy UI, and React Router DOM.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Daisy UI'],
      githubUrl: 'https://github.com/mohankumar-markuli/devTinder-web'
    },
    {
      title: 'Task Manager API',
      description: 'A RESTful API built using Node.js and Express.js for managing tasks. Features include creating, retrieving, updating, deleting, filtering, sorting, and categorizing tasks.',
      tags: ['Node.js', 'Express.js', 'REST API'],
      githubUrl: 'https://github.com/mohankumar-markuli/task-manager-api'
    },
    {
      title: 'Advance Traffic Management System',
      description: 'An academic final project building an Advance Traffic Management System Using Google Cloud. It uses IoT and Infrared sensors to make traffic management systems work dynamically and efficiently.',
      tags: ['IoT', 'Google Cloud', 'Sensors', 'Python'],
      githubUrl: 'https://github.com/mohankumar-markuli/BE-Academic-Final-Project'
    }
  ];

  return (
    <>
      <Head>
        <title>Projects &amp; Portfolio | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="Explore software engineering projects, backend architectures, and AI integrations built by Mohankumar Markuli Chandrayigowda." />
      </Head>

      <section style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Technical <span className="gradient-text">Projects</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A catalog of my backend systems, AI workflows, databases, and analytical research.
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
            />
          ))}
        </div>
      </section>
    </>
  );
}
