#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable not set');
  process.exit(1);
}

const OUTPUT_DIR = 'public/blog';

// Topic-specific style prompts
const TOPIC_STYLES = {
  ai: 'neural network visualization, glowing circuits, digital brain, futuristic AI interface',
  programming: 'code editor interface, terminal window, matrix-style code, developer workspace',
  aviation: 'aircraft cockpit instruments, flight deck, aerial view, aviation gauges',
  'jiu-jitsu': 'martial arts silhouette, grappling figure, movement flow, training concept',
  blockchain: 'connected blocks, distributed network, cryptographic chains, decentralized nodes',
};

// Base cyberpunk style for all images
const BASE_STYLE = 'Cyberpunk neon aesthetic, dark background (#0a0a0f), cyan (#00ffff) and magenta (#ff00ff) glow effects, high contrast, minimalist tech style, clean lines';

async function generateImage(prompt, filename) {
  return new Promise((resolve, reject) => {
    const fullPrompt = `Generate an image: ${BASE_STYLE}. ${prompt}`;

    const data = JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: { responseModalities: ['image', 'text'] }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.candidates?.[0]?.content?.parts) {
            for (const part of json.candidates[0].content.parts) {
              if (part.inlineData) {
                const outputPath = path.join(OUTPUT_DIR, filename);
                fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, 'base64'));
                resolve(outputPath);
                return;
              }
            }
          }
          reject(new Error('No image in response: ' + JSON.stringify(json).substring(0, 200)));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function processPost(postPath) {
  const content = fs.readFileSync(postPath, 'utf8');
  const slug = path.basename(postPath, '.mdx');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
  const topicsMatch = frontmatter.match(/topics:\s*\[([^\]]+)\]/);

  const title = titleMatch?.[1] || slug;
  const topics = topicsMatch?.[1]?.split(',').map(t => t.trim().replace(/"/g, '')) || ['programming'];
  const primaryTopic = topics[0];

  return { slug, title, topics, primaryTopic };
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const postsDir = 'content/posts';
  const posts = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(postsDir, f));

  console.log(`Found ${posts.length} posts\n`);

  for (const postPath of posts) {
    const post = await processPost(postPath);
    if (!post) continue;

    const imageFile = `${post.slug}-hero.png`;
    const imagePath = path.join(OUTPUT_DIR, imageFile);

    // Skip if image already exists
    if (fs.existsSync(imagePath)) {
      console.log(`[SKIP] ${post.slug} - image exists`);
      continue;
    }

    const topicStyle = TOPIC_STYLES[post.primaryTopic] || TOPIC_STYLES.programming;
    const prompt = `${topicStyle}. Theme: ${post.title}. Abstract representation, no text.`;

    console.log(`[GENERATING] ${post.slug}...`);

    try {
      await generateImage(prompt, imageFile);
      console.log(`[SUCCESS] ${post.slug} -> ${imageFile}`);
      // Rate limiting - wait between requests
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.log(`[ERROR] ${post.slug}: ${err.message}`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
