import Head from 'next/head';
import ProjectCard from '@/components/ProjectCard';

export default function Portfolio() {
  const projects = [
    {
      title: 'PDF Loader RAG Pipeline',
      description: 'An end-to-end Retrieval-Augmented Generation pipeline that loads PDF documents, chunks and embeds content into a vector store, and retrieves semantically relevant context to ground LLM responses, reducing hallucinations and enabling accurate document-based question answering.',
      tags: ['Python', 'LangChain', 'OpenAI API', 'Ollama', 'Vector Store'],
      githubUrl: 'https://github.com/mohankumar-markuli/pdf-loader-rag-pipeline'
    },
    {
      title: 'News Aggregator API',
      description: 'A personalized news aggregation backend API with JWT authentication, user preference management, in-memory caching with background refresh to reduce external API calls, and full unit and integration test coverage.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'GNews API', 'Unit Testing'],
      githubUrl: 'https://github.com/mohankumar-markuli/news-aggregator-api'
    },
    {
      title: 'FinEdge Personal Finance & Expense Tracker API',
      description: 'A personal finance API with transaction CRUD operations, advanced filtering across five parameters, and MongoDB aggregation pipelines delivering monthly and yearly analytics with pagination support.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Aggregation Pipelines'],
      githubUrl: 'https://github.com/mohankumar-markuli/finedge-finance-api'
    },
    {
      title: 'devTinder Developer Networking Platform Backend',
      description: 'A robust developer matchmaking platform backend featuring JWT authentication, profile management, and a bi-directional connection request system with four interaction states enabling dynamic user feed generation.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Relation States'],
      githubUrl: 'https://github.com/mohankumar-markuli/devtinder-backend'
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
