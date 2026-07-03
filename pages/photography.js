import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Fallback images if the public folder is empty or not created yet
const FALLBACK_GALLERY = {
  Nature: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1472214222541-d510753a8707?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=80',
  ],
  Urban: [
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80',
  ],
  Travel: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
  ]
};

export default function Photography({ initialCategories = {} }) {
  // Use initialCategories if not empty, otherwise use fallback
  const hasLocalPhotos = Object.keys(initialCategories).length > 0;
  const categories = hasLocalPhotos ? initialCategories : FALLBACK_GALLERY;
  const categoryNames = Object.keys(categories);

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter images based on selected category
  const allImages = Object.entries(categories).reduce((acc, [category, imgs]) => {
    return [...acc, ...imgs.map(url => ({ url, category }))];
  }, []);

  const displayedImages = activeCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  return (
    <>
      <Head>
        <title>Photography | Mohankumar MC</title>
        <meta name="description" content="Browse the visual gallery and categories of self-hosted photography by Mohankumar MC." />
      </Head>

      <section style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Visual <span className="gradient-text">Gallery</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            A space dedicated to visual stories. Use the category filters to browse through captures of nature, urbanscapes, and travels.
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: '280px',
            gap: '1.5rem'
          }}
        >
          {displayedImages.map((img, index) => (
            <div 
              key={index} 
              className="card"
              style={{
                position: 'relative',
                padding: 0,
                overflow: 'hidden',
                borderRadius: '12px',
                height: '100%',
                width: '100%'
              }}
            >
              {/* Native lazy loading + absolute cover */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.url} 
                alt={`${img.category} photograph ${index + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'var(--transition-smooth)'
                }}
                className="gallery-image"
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  padding: '1rem',
                  opacity: 0,
                  transition: 'var(--transition-smooth)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  color: '#fff'
                }}
                className="gallery-image-overlay"
              >
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {displayedImages.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
            No photography uploads found in this category.
          </p>
        )}
      </section>

      <style jsx global>{`
        .card:hover .gallery-image {
          transform: scale(1.05);
        }
        .card:hover .gallery-image-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}

// Next.js server-side static props generator running at build-time
export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  const photographyDir = path.join(process.cwd(), 'public', 'images', 'photography');
  let initialCategories = {};

  try {
    if (fs.existsSync(photographyDir)) {
      const folders = fs.readdirSync(photographyDir);
      for (const folder of folders) {
        const folderPath = path.join(photographyDir, folder);
        const stat = fs.statSync(folderPath);
        if (stat.isDirectory()) {
          const files = fs.readdirSync(folderPath);
          // filter file types
          const images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].includes(ext);
          }).map(file => `/images/photography/${folder}/${file}`);
          
          if (images.length > 0) {
            initialCategories[folder] = images;
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading photography directory in getStaticProps:", err);
  }

  return {
    props: {
      initialCategories
    }
  };
}
