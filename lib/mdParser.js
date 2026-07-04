import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Setup marked version-safe custom renderer for code blocks
const renderer = {
  code(codeOrObj, infostring, escaped) {
    let codeText = typeof codeOrObj === 'object' ? codeOrObj.text : codeOrObj;
    let lang = typeof codeOrObj === 'object' ? codeOrObj.lang : infostring;
    lang = lang || 'plaintext';
    
    let highlighted;
    try {
      if (hljs.getLanguage(lang)) {
        highlighted = hljs.highlight(codeText, { language: lang }).value;
      } else {
        highlighted = hljs.highlightAuto(codeText).value;
      }
    } catch (e) {
      highlighted = codeText;
    }
    return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
  },
  image(hrefOrObj, title, text) {
    let href = typeof hrefOrObj === 'object' ? hrefOrObj.href : hrefOrObj;
    let imgTitle = typeof hrefOrObj === 'object' ? hrefOrObj.title : title;
    let imgText = typeof hrefOrObj === 'object' ? hrefOrObj.text : text;
    
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/portfolio' : '';
    let finalHref = href;
    if (href && typeof href === 'string' && href.startsWith('/') && !href.startsWith('http')) {
      finalHref = `${basePath}${href}`;
    }
    return `<img src="${finalHref}" alt="${imgText || ''}" title="${imgTitle || ''}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 2rem auto; display: block; border: 1px solid var(--border-color);" />`;
  }
};

marked.use({ renderer });

const blogsDirectory = path.join(process.cwd(), 'public', 'blogs');

// Pre-populated high-quality articles in case public/blogs/ is empty
const MOCK_POSTS = [
  {
    slug: 'building-rag-chatbots-node-mongodb',
    title: 'Building Intelligent RAG Chatbots with Node.js & MongoDB Vector Search',
    date: '2026-06-15',
    category: 'AI Engineering',
    tags: ['Nodejs', 'MongoDB', 'RAG', 'AI', 'LLM'],
    summary: 'A step-by-step guide to engineering a Retrieval-Augmented Generation (RAG) chatbot using Node.js backend pipelines and MongoDB Vector Search.',
    content: `
# Building Intelligent RAG Chatbots with Node.js & MongoDB Vector Search

AI chatbots are changing how businesses interact with customers. In this article, we'll design a backend pipeline that implements **Retrieval-Augmented Generation (RAG)** using Node.js, Express, and MongoDB.

## Why RAG?
Large Language Models (LLMs) are powerful but have static knowledge. RAG allows us to fetch relevant context from our databases and inject it into the prompt at inference time, ensuring the answers are accurate, verified, and contextual.

### Sample Code Configuration
Here is how you initialize the MongoDB vector search client in Node.js:

\`\`\`javascript
const { MongoClient } = require('mongodb');

async function searchVectors(embedding, limit = 5) {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  
  const database = client.db("chatbot_hub");
  const collection = database.collection("knowledge_vectors");
  
  const results = await collection.aggregate([
    {
      "$vectorSearch": {
        "index": "vector_index",
        "path": "embedding",
        "queryVector": embedding,
        "numCandidates": 100,
        "limit": limit
      }
    }
  ]).toArray();
  
  return results;
}
\`\`\`

## Graceful Error Handling
When parsing input documents or embedding text, always catch runtime errors to avoid killing the process.
    `
  },
  {
    slug: 'predictive-forecasting-business-analytics',
    title: 'Predictive Sales Forecasting: A Machine Learning Approach',
    date: '2026-05-20',
    category: 'Business Analytics',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Predictive-Modeling'],
    summary: 'Using Python and Scikit-Learn to model regional sales trends, combining data analytics with software engineering to forecast demand.',
    content: `
# Predictive Sales Forecasting: A Machine Learning Approach

As part of my coursework in MSc Business Analytics at the University of Liverpool, I explored the intersection of machine learning and business operations.

## The Model
We train a Random Forest Regressor using engineered time-series features like rolling averages and lag values.

\`\`\`python
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load regional sales data
df = pd.read_csv('sales_data.csv')
X = df[['rolling_mean_7d', 'lag_1d', 'promo_active']]
y = df['units_sold']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

score = model.score(X_test, y_test)
print(f"Model R^2 Score: {score:.2f}")
\`\`\`

## Practical Applications
1. **Inventory Management**: Reduce warehouse overheads by matching stock to predicted sales curves.
2. **Dynamic Pricing**: Align pricing tiers based on forecasted demand spikes.
    `
  }
];

// Read markdown files dynamically
export function getSortedPostsData() {
  let posts = [];

  try {
    if (fs.existsSync(blogsDirectory)) {
      const categories = fs.readdirSync(blogsDirectory);
      
      for (const cat of categories) {
        const catPath = path.join(blogsDirectory, cat);
        const stat = fs.statSync(catPath);
        
        if (stat.isDirectory()) {
          const files = fs.readdirSync(catPath);
          
          for (const file of files) {
            if (path.extname(file).toLowerCase() === '.md') {
              const fullPath = path.join(catPath, file);
              const fileContents = fs.readFileSync(fullPath, 'utf8');
              const slug = path.basename(file, '.md');
              
              try {
                // Parse frontmatter
                const matterResult = matter(fileContents);
                
                posts.push({
                  slug,
                  category: cat,
                  title: matterResult.data.title || slug,
                  date: matterResult.data.date || '2026-07-03',
                  tags: matterResult.data.tags || [],
                  summary: matterResult.data.summary || matterResult.data.subtitle || '',
                  ...matterResult.data
                });
              } catch (err) {
                // Log and skip broken markdown files, satisfying edge case requirement
                console.error(`[Markdown Parser Error] Skipped corrupted file "${file}" under "${cat}":`, err.message);
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Error reading blogs directory:", err);
  }

  // If no local posts exist, return the pre-populated mocks
  if (posts.length === 0) {
    return MOCK_POSTS;
  }

  // Sort posts by date
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get all slugs for next static paths
export function getAllPostSlugs() {
  const posts = getSortedPostsData();
  return posts.map(post => ({
    params: {
      slug: post.slug
    }
  }));
}

// Get post data by slug
export function getPostData(slug) {
  // First look through local files
  try {
    if (fs.existsSync(blogsDirectory)) {
      const categories = fs.readdirSync(blogsDirectory);
      
      for (const cat of categories) {
        const catPath = path.join(blogsDirectory, cat);
        const stat = fs.statSync(catPath);
        
        if (stat.isDirectory()) {
          const fullPath = path.join(catPath, `${slug}.md`);
          if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);
            
            // Compile markdown to HTML
            const contentHtml = marked.parse(matterResult.content);
            
            return {
              slug,
              category: cat,
              contentHtml,
              title: matterResult.data.title || slug,
              date: matterResult.data.date || '2026-07-03',
              tags: matterResult.data.tags || [],
              summary: matterResult.data.summary || matterResult.data.subtitle || '',
              ...matterResult.data
            };
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error loading post file with slug "${slug}":`, err);
  }

  // If not found in local files, check mock posts
  const mockPost = MOCK_POSTS.find(post => post.slug === slug);
  if (mockPost) {
    const contentHtml = marked.parse(mockPost.content);
    return {
      ...mockPost,
      contentHtml
    };
  }

  return null;
}
