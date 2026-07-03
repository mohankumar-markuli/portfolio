import { useState } from 'react';
import Head from 'next/head';

// Fallback high-quality Unsplash datasets for immediate professional preview
const FALLBACK_GALLERY = {
  University: [
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      description: 'Attending lecture sessions at the University of Liverpool campus during the business analytics autumn term.',
      date: 'October 2024'
    },
    {
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      description: 'Collaborating on final year team project metrics and systems layout design inside the university study bay.',
      date: 'February 2025'
    }
  ],
  Workplaces: [
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
      description: 'Developing high-performance financial aggregator scripts at the Infosys backend engineering facility.',
      date: 'July 2025'
    },
    {
      url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
      description: 'Refactoring API route logic and testing security authorization policies in the collaborative workspace.',
      date: 'September 2025'
    }
  ],
  Network: [
    {
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      description: 'Discussing AI chatbot RAG pipelines and vector database integrations with regional software developers.',
      date: 'April 2026'
    },
    {
      url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80',
      description: 'Sharing engineering concepts and backend structures during Airtribe cohort brainstorming meetings.',
      date: 'June 2026'
    }
  ]
};

export default function Photography({ initialCategories = {} }) {
  const hasLocalPhotos = Object.keys(initialCategories).length > 0;
  const categories = hasLocalPhotos ? initialCategories : FALLBACK_GALLERY;
  const categoryNames = Object.keys(categories);

  const [activeCategory, setActiveCategory] = useState('All');

  // Flatten the images and include their respective category labels
  const allImages = Object.entries(categories).reduce((acc, [category, imgs]) => {
    return [...acc, ...imgs.map(img => ({ ...img, category }))];
  }, []);

  const displayedImages = activeCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  return (
    <>
      <Head>
        <title>Gallery | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="Explore photos of Mohankumar Markuli Chandrayigowda representing university, workplaces, and network circles." />
      </Head>

      <section style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Visual <span className="gradient-text">Gallery</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A catalog of memories representing university milestones, collaborative workspaces, and professional circles.
          </p>
        </div>

        {/* Filters */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.75rem', 
            flexWrap: 'wrap', 
            marginBottom: '2.5rem' 
          }}
        >
          <button
            onClick={() => setActiveCategory('All')}
            className={`btn ${activeCategory === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            All
          </button>
          
          {categoryNames.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', textTransform: 'capitalize' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {displayedImages.map((img, index) => (
            <div 
              key={index} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden',
                borderRadius: '12px',
                height: '100%'
              }}
            >
              {/* Image Section */}
              <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.url} 
                  alt={img.description}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'var(--transition-smooth)'
                  }}
                  className="gallery-image"
                />
                
                {/* Category label absolute position tag */}
                <span 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {img.category}
                </span>
              </div>

              {/* Text Card details */}
              <div 
                style={{ 
                  padding: '1.25rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem', 
                  flexGrow: 1 
                }}
              >
                <span style={{ fontSize: '0.8rem', color: '#ffcc00', fontWeight: 600 }}>
                  {img.date}
                </span>
                <p 
                  style={{ 
                    fontSize: '0.9rem', 
                    lineHeight: '1.6', 
                    color: 'var(--text-secondary)',
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {displayedImages.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
            No gallery images found in this category.
          </p>
        )}
      </section>

      <style jsx global>{`
        .card:hover .gallery-image {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}

// Next.js static build server-side scanner
export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  const photographyDir = path.join(process.cwd(), 'public', 'images', 'photography');
  const metadataPath = path.join(photographyDir, 'metadata.json');
  
  let initialCategories = {};
  let metadata = { images: {} };

  try {
    if (fs.existsSync(metadataPath)) {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    }
  } catch (err) {
    console.error("Error reading photography metadata.json:", err);
  }

  try {
    if (fs.existsSync(photographyDir)) {
      const folders = fs.readdirSync(photographyDir);
      for (const folder of folders) {
        const folderPath = path.join(photographyDir, folder);
        
        // Scan folder only if it is a directory
        if (fs.statSync(folderPath).isDirectory()) {
          const files = fs.readdirSync(folderPath);
          const images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].includes(ext);
          }).map(file => {
            const url = `/images/photography/${folder}/${file}`;
            const fileMeta = metadata.images[url] || {};
            
            // Generate contextual fallback description based on folder name
            let defaultDesc = `Classrooms and research areas at the University of Liverpool.`;
            if (folder.toLowerCase() === 'workplaces') {
              defaultDesc = `Engineering scalable system architectures and APIs at the office.`;
            } else if (folder.toLowerCase() === 'network') {
              defaultDesc = `Collaborating with engineers and professionals at regional meetups.`;
            }
            
            return {
              url,
              description: fileMeta.description || defaultDesc,
              date: fileMeta.date || 'July 2026'
            };
          });
          
          if (images.length > 0) {
            initialCategories[folder] = images;
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading photography directories in getStaticProps:", err);
  }

  return {
    props: {
      initialCategories
    }
  };
}
