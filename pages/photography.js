import { useState } from 'react';
import Head from 'next/head';

export default function Photography({ images = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Extract unique categories from images, excluding empty categories
  const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];

  const displayedImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      <Head>
        <title>Gallery | Mohankumar Markuli Chandrayigowda</title>
        <meta name="description" content="Explore photos of Mohankumar Markuli Chandrayigowda representing various memories and milestones." />
      </Head>

      <section style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Visual <span className="gradient-text">Gallery</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A visual timeline of milestones and memories.
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
          {categories.map(category => (
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
              <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden', backgroundColor: 'var(--bg-glass)' }}>
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
                
                {img.category && (
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
                )}
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
                <span style={{ fontSize: '0.9rem', color: '#ffcc00', fontWeight: 600 }}>
                  {img.dateFormatted}
                </span>
                <p 
                  style={{ 
                    fontSize: '0.9rem', 
                    lineHeight: '1.6', 
                    color: 'var(--text-secondary)',
                    margin: 0,
                    fontStyle: 'italic'
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
            No gallery images found for this category.
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
  
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  let imagesList = [];

  try {
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
      imagesList = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
      }).map(file => {
        const url = `/images/${file}`;
        const nameWithoutExt = path.basename(file, path.extname(file)); // e.g. "2014-02"
        
        let dateFormatted = nameWithoutExt;
        let sortValue = nameWithoutExt;
        
        // Try parsing YYYY-MM
        const parts = nameWithoutExt.split('-');
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          const year = parts[0];
          const monthIndex = parseInt(parts[1], 10) - 1;
          if (monthIndex >= 0 && monthIndex < 12) {
            dateFormatted = `${monthNames[monthIndex]} ${year}`;
          }
        }
        const photoDetails = {
          '2023-12': {
            category: 'University',
            description: 'Graduating with an MSc in Business Analytics and Big Data from the University of Liverpool.'
          },
          '2023-06': {
            category: 'Network',
            description: 'Presenting at the annual Sustainable Supply Chain research demonstration hosted by the University of Liverpool Management School.'
          },
          '2021-03': {
            category: 'Network',
            description: 'Participating in MEAN stack Foundation Program (FP) training at Infosys Limited.'
          },
          '2020-10': {
            category: 'University',
            description: 'Graduating with a Bachelor of Engineering in Computer Science and Engineering from Rajeev Institute of Technology.'
          },
          '2020-03': {
            category: 'Work',
            description: 'Joining the winter internship batch at Infosys Limited.'
          },
          '2020-02': {
            category: 'Work',
            description: 'Starting my professional journey as an intern at Infosys.'
          },
          '2019-11': {
            category: 'University',
            description: 'A memorable group photo with peers at Rajeev Institute of Technology.'
          },
          '2019-10': {
            category: 'Network',
            description: 'Competing in the National Level Hackathon 2019 at PEC College of Engineering, Mandya.'
          },
          '2019-09': {
            category: 'Network',
            description: 'Participating in a hackathon at Rajeev Institute of Technology, focusing on road safety technologies.'
          },
          '2016-06': {
            category: 'University',
            description: 'Pre-university college group photo capturing early academic days.'
          },
          '2014-02': {
            category: 'University',
            description: 'A nostalgic school group photo with friends and teachers.'
          }
        };

        const details = photoDetails[nameWithoutExt] || { category: '', description: 'Description pending...' };
        
        return {
          url,
          filename: file,
          sortValue,
          dateFormatted,
          category: details.category,
          description: details.description
        };
      });
      
      // Sort newest first (descending string sort on YYYY-MM)
      imagesList.sort((a, b) => b.sortValue.localeCompare(a.sortValue));
    }
  } catch (err) {
    console.error("Error reading images directory in getStaticProps:", err);
  }

  return {
    props: {
      images: imagesList
    }
  };
}
